import { db } from '$lib/server/db';
import { type InsertTodo, todosTable, todoTagsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load() {
	const projects = await db.query.projectsTable.findMany();

	const tags = await db.query.tagsTable.findMany();

	return {
		projects,
		tags
	};
}

export const actions = {
	default: async ({ request }: any) => {
		const data = await request.formData();

		const insertData: InsertTodo = { title: data.get('title')};
		if (data.get('projectId') && data.get('projectId') !== 'undefined') {
			insertData.projectId = data.get('projectId');
		}

		const stored = await db.insert(todosTable).values(insertData).returning();

		await db.delete(todoTagsTable).where(eq(todoTagsTable.todoId, stored[0].id));
		for (const tId of data.get('tagsIds').split(',')) {
			if (tId === '') return;
			await db.insert(todoTagsTable).values({ todoId: stored[0].id, tagId: tId });
		}

		return stored[0];
	}
};
