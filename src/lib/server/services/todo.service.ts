import { z } from 'zod';
import { db } from '@/server/db';
import { insertTodoSchema, insertTodoTagsSchema, todosTable, todoTagsTable } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const todoInsertSchema = z.object({
	title: z.string(),
	projectId: z.number().optional(),
	tagIds: z.number().or(z.array(z.number())).optional()
});
export type TodoInsertSchemaType = z.infer<typeof todoInsertSchema>;

export const todoEditSchema = z.object({
	id: z.number(),
	title: z.string(),
	projectId: z.number().optional(),
	tagIds: z.number().or(z.array(z.number())).optional()
});
export type TodoEditSchemaType = z.infer<typeof todoEditSchema>;

export const todoDeleteSchema = z.object({
	id: z.number(),
});
export type TodoDeleteSchemaType = z.infer<typeof todoDeleteSchema>;

async function saveTodoTags(tagIds: number[] | number, todoId: number) {
	if (Array.isArray(tagIds)) {
		for (const tId of tagIds) {
			await db.insert(todoTagsTable).values(insertTodoTagsSchema.parse({ todoId: todoId, tagId: tId }));
		}
	} else {
		await db.insert(todoTagsTable).values(insertTodoTagsSchema.parse({ todoId: todoId, tagId: tagIds }));
	}
}

export const TodoService = {
	insert: async (data: TodoInsertSchemaType) => {
		const stored = (await db
			.insert(todosTable)
			.values(insertTodoSchema.parse(data))
			.returning())[0];

		if (data.tagIds) {
			await saveTodoTags(data.tagIds, stored.id);
		}

		return stored;
	},

	update: async (data: TodoEditSchemaType) => {
		const stored = (await db
			.update(todosTable)
			.set(insertTodoSchema.parse(data))
			.where(eq(todosTable.id, data.id))
			.returning())[0];

		await db.delete(todoTagsTable).where(eq(todoTagsTable.todoId, data.id));

		if (data.tagIds) {
			await saveTodoTags(data.tagIds, data.id);
		}

		return stored;
	},

	findAll: async () => {
		return db.query.todosTable.findMany({
			orderBy: todosTable.id,
			with: {
				project: true,
				todoTags: {
					with: {
						tag: true
					}
				}
			}
		});
	},

	findById: async (id: number) => {
		return db.query.todosTable.findFirst({
			where: eq(todosTable.id, id),
			with: { project: true, todoTags: { with: { tag: true } } }
		});
	},

	delete: async (id: number) => {
		return db.delete(todosTable).where(eq(todosTable.id, id));
	}
};
