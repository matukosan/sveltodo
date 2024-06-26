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
	delete: async ({ request }: {request: Request}) => {
		const data = await request.formData();

		if (!data.get('id')) {
			return;
		}

		const id = parseInt(<string>data.get('id'));

		await db.delete(todosTable).where(eq(todosTable.id, id));
	}
};
