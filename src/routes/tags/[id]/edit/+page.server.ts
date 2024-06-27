import { db } from '$lib/server/db';
import { tagsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { formBody } from '@/form-helpers';
import type { RequestEvent } from '@sveltejs/kit';

export async function load({ params }: any) {
	const tags = await db.select().from(tagsTable).where(eq(tagsTable.id, params.id));

	return {
		tag: tags[0]
	};
}


const tagsUpdateSchema = z.object({
	id: z.number(),
	title: z.string()
});
export const actions = {
	default: async ({ request }: RequestEvent) => {
		const formData = formBody(await request.formData());
		const parseResult = tagsUpdateSchema.safeParse(formData);
		if (!parseResult.data) return;
		const data = parseResult.data;

		const stored = await db
			.update(tagsTable)
			.set({ title: data.title })
			.where(eq(tagsTable.id, data.id))
			.returning();

		return stored[0];
	}
};
