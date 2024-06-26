import { db } from '$lib/server/db';
import { type InsertProject, projectsTable } from '$lib/server/db/schema';

export const actions = {
	default: async ({ request }: any) => {
		const data = await request.formData();

		const insertData: InsertProject = { title: data.get('title') };
		const stored = await db.insert(projectsTable).values(insertData).returning();

		return stored[0];
	}
};
