import { db } from '@/server/db';
import { insertTagSchema, tagsTable } from '@/server/db/schema';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';

export const tagsInsertSchema = z.object({
	title: z.string(),
});
export type TagsInsertSchemaType = z.infer<typeof tagsInsertSchema>;

export const tagsEditSchema = z.object({
	id: z.number(),
	title: z.string(),
});
export type TagsEditSchemaType = z.infer<typeof tagsEditSchema>;

export const tagsDeleteSchema = z.object({
	id: z.number(),
});
export type TagsDeleteSchemaType = z.infer<typeof tagsDeleteSchema>;

export const TagsService = {
	insert: async (data: TagsInsertSchemaType, {userId}) => {
		return (await db.insert(tagsTable).values(insertTagSchema.parse({...data, ownerId: userId})).returning())[0];
	},

	update: async (data: TagsEditSchemaType, {userId}) => {
		return (await db
			.update(tagsTable)
			.set(insertTagSchema.parse({...data, ownerId: userId}))
			.where(eq(tagsTable.id, data.id))
			.returning())[0];
	},

	findAll: async ({userId}) => {
		return db.query.tagsTable.findMany({
			where: eq(tagsTable.ownerId, userId),
			orderBy: tagsTable.id
		});
	},

	findById: async (id: number, {userId}) => {
		return db.query.tagsTable.findFirst({
			where: and(
				eq(tagsTable.id, id),
				eq(tagsTable.ownerId, userId)
			)
		});
	},

	delete: async (id: number, {userId}) => {
		return db.delete(tagsTable).where(
			and(
				eq(tagsTable.id, id),
				eq(tagsTable.ownerId, userId)
			)
		);
	}
};
