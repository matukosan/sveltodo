import { db } from '@/server/db';
import { insertTagSchema, tagsTable } from '@/server/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

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
	insert: async (data: TagsInsertSchemaType) => {
		return (await db.insert(tagsTable).values(insertTagSchema.parse(data)).returning())[0];
	},

	update: async (data: TagsEditSchemaType) => {
		return (await db
			.update(tagsTable)
			.set(insertTagSchema.parse(data))
			.where(eq(tagsTable.id, data.id))
			.returning())[0];
	},

	findAll: () => {
		return db.query.tagsTable.findMany({orderBy: tagsTable.id});
	},

	findById: async (id: number) => {
		return db.query.tagsTable.findFirst({
			where: eq(tagsTable.id, id)
		});
	},

	delete: async (id: number) => {
		return db.delete(tagsTable).where(eq(tagsTable.id, id));
	}
};
