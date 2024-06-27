import { db } from '$lib/server/db';
import { projectsTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { formBody } from '@/form-helpers';

export async function load() {
	const projects = await db.query.projectsTable.findMany({ with: { todos: true } });
	return {
		projects
	};
}

const projectsDeleteSchema = z.object({
	id: z.number(),
});

export const actions = {
	delete: async ({ request }: RequestEvent) => {
		const formData = formBody(await request.formData());
		const parseResult = projectsDeleteSchema.safeParse(formData);
		if (!parseResult.data) return;
		const data = parseResult.data;

		await db.delete(projectsTable).where(eq(projectsTable.id, data.id));
	}
};
