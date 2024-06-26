import { db } from '$lib/server/db';
import { projectsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }: any) {
	const projects = await db.query.projectsTable.findMany({ with: { todos: true } });
	return {
		projects
	};
}

export const actions = {
	delete: async ({ request }: any) => {
		const data = await request.formData();

		await db.delete(projectsTable).where(eq(projectsTable.id, data.get('id')));
	}
};
