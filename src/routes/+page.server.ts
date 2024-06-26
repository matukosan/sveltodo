import { db } from '$lib/server/db';
import { todosTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load() {
	const todos = await db.query.todosTable.findMany({
		with: { project: true, todoTags: { with: { tag: true } } }
	});

	return {
		todos
	};
}

export const actions = {
	delete: async ({ request }: any) => {
		const data = await request.formData();

		await db.delete(todosTable).where(eq(todosTable.id, data.get('id')));
	}
};
