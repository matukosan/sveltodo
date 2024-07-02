import { db } from '@/server/db';
import { insertProjectSchema, projectsTable } from '@/server/db/schema';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';

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
	insert: async (data: ProjectInsertSchemaType, {userId}) => {
		return (await db.insert(projectsTable).values(insertProjectSchema.parse({...data, ownerId: userId})).returning())[0];
	},

	update: async (data: ProjectEditSchemaType, {userId}) => {
		return (await db
			.update(projectsTable)
			.set(insertProjectSchema.parse({...data, ownerId: userId}))
			.where(eq(projectsTable.id, data.id))
			.returning())[0];
	},

	findAll: ({userId}) => {
		return db.query.projectsTable.findMany({
			where: eq(projectsTable.ownerId, userId),
			orderBy: projectsTable.id,  with: { todos: true }
		});
	},

	findById: async (id: number, {userId}) => {
		return db.query.projectsTable.findFirst({
			where: and(
				eq(projectsTable.ownerId, userId),
				eq(projectsTable.id, id)
			)
		});
	},

	delete: async (id: number, {userId}) => {
		return db.delete(projectsTable).where(
			and(
				eq(projectsTable.ownerId, userId),
				eq(projectsTable.id, id)
			)
		);
	}
};
