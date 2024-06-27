import { db } from '@/server/db';
import { insertProjectSchema, projectsTable } from '@/server/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const projectInsertSchema = z.object({
	title: z.string(),
});
export type ProjectInsertSchemaType = z.infer<typeof projectInsertSchema>;

export const projectEditSchema = z.object({
	id: z.number(),
	title: z.string(),
});
export type ProjectEditSchemaType = z.infer<typeof projectEditSchema>;

export const projectDeleteSchema = z.object({
	id: z.number(),
});
export type ProjectDeleteSchemaType = z.infer<typeof projectDeleteSchema>;

export const ProjectsService = {
	insert: async (data: ProjectInsertSchemaType) => {
		return (await db.insert(projectsTable).values(insertProjectSchema.parse(data)).returning())[0];
	},

	update: async (data: ProjectEditSchemaType) => {
		return (await db
			.update(projectsTable)
			.set(insertProjectSchema.parse(data))
			.where(eq(projectsTable.id, data.id))
			.returning())[0];
	},

	findAll: () => {
		return db.query.projectsTable.findMany({orderBy: projectsTable.id,  with: { todos: true }});
	},

	findById: async (id: number) => {
		return db.query.projectsTable.findFirst({
			where: eq(projectsTable.id, id)
		});
	},

	delete: async (id: number) => {
		return db.delete(projectsTable).where(eq(projectsTable.id, id));
	}
};
