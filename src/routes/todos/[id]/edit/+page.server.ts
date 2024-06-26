import { db } from '$lib/server/db';
import { todosTable, todoTagsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }: any) {
	const todo = await db.query.todosTable.findFirst({
		where: eq(todosTable.id, params.id),
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

export const actions = {
	default: async ({ request }: any) => {
		const data = await request.formData();
		const todoId = data.get('id');

		const stored = await db
			.update(todosTable)
			.set({ title: data.get('title'), projectId: data.get('projectId') })
			.where(eq(todosTable.id, data.get('id')))
			.returning();

		await db.delete(todoTagsTable).where(eq(todoTagsTable.todoId, todoId));
		for (const tId of data.get('tagsIds').split(',')) {
			await db.insert(todoTagsTable).values({ todoId, tagId: tId });
		}

		return stored[0];
	}
};
