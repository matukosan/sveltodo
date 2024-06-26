import { db } from '$lib/server/db';
import { projectsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }: any) {
	const project = await db.query.projectsTable.findFirst({
		where: eq(projectsTable.id, params.id),
		with: { todos: true }
	});

	return {
		project
	};
}

export const actions = {
	default: async ({ request }: any) => {
		const data = await request.formData();

		const stored = await db
			.update(projectsTable)
			.set({ title: data.get('title') })
			.where(eq(projectsTable.id, data.get('id')))
			.returning();

		return stored[0];
	}
};
