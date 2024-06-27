import { db } from '$lib/server/db';
import { type InsertProject, tagsTable } from '$lib/server/db/schema';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { formBody } from '@/form-helpers';

const tagsCreateSchema = z.object({
	title: z.string(),
});
export const actions = {
	default: async ({ request }: RequestEvent) => {
		const formData = formBody(await request.formData());
		const parseResult = tagsCreateSchema.safeParse(formData);
		if (!parseResult.data) return;
		const data = parseResult.data;

		const insertData: InsertProject = { title: data.title };
		const stored = await db.insert(tagsTable).values(insertData).returning();

		return stored[0];
	}
};
