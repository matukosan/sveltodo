import { db } from '$lib/server/db';
import { tagsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load() {
	const tags = await db.query.tagsTable.findMany();
	return {
		tags
	};
}

export const actions = {
	delete: async ({ request }: any) => {
		const data = await request.formData();

		await db.delete(tagsTable).where(eq(tagsTable.id, data.get('id')));
	}
};
