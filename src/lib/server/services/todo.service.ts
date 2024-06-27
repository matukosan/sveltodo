import { z } from 'zod';
import { db } from '@/server/db';
import { insertTodoSchema, todosTable, todoTagsTable } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const todoEditSchema = z.object({
	id: z.number(),
	title: z.string(),
	projectId: z.number(),
	tagIds: z.number().or(z.array(z.number()))
});
export type TodoEditSchemaType = z.infer<typeof todoEditSchema>;

export const TodoService = {
	update: async (data: TodoEditSchemaType) => {
		const stored = await db
			.update(todosTable)
			.set(insertTodoSchema.parse(data))
			.where(eq(todosTable.id, data.id))
			.returning();

		await db.delete(todoTagsTable).where(eq(todoTagsTable.todoId, data.id));

		if (Array.isArray(data.tagIds)){
			for (const tId of data.tagIds) {
				await db.insert(todoTagsTable).values({ todoId: data.id, tagId: tId });
			}
		} else {
			await db.insert(todoTagsTable).values({ todoId: data.id, tagId: data.tagIds });
		}

		return stored[0];
	},

	findById: async (id: number) => {
		const todo = await db.query.todosTable.findFirst({
			where: eq(todosTable.id, id),
			with: { project: true, todoTags: { with: { tag: true } } }
		});

		const projects = await db.query.projectsTable.findMany();
		const tags = await db.query.tagsTable.findMany();

		return {
			todo,
			projects,
			tags
		};
	}
};
