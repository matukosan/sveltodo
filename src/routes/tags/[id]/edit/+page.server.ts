import { db } from '$lib/server/db';
import { projectsTable, tagsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }: any) {
	const tags = await db.select().from(tagsTable).where(eq(tagsTable.id, params.id));

	return {
		tag: tags[0]
	};
}

export const actions = {
	default: async ({ request }: any) => {
		const data = await request.formData();

		const stored = await db
			.update(tagsTable)
			.set({ title: data.get('title') })
			.where(eq(tagsTable.id, data.get('id')))
			.returning();

		return stored[0];
	}
};
