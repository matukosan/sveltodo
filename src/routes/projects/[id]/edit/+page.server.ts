import { db } from '$lib/server/db';
import { projectsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

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

export async function load({ params }: any) {
	const projects = await db.select().from(projectsTable).where(eq(projectsTable.id, params.id));

	return {
		todo: projects[0]
	};
}
