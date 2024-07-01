import { z } from 'zod';
import { db } from '@/server/db';
import { insertOwnerDbSchema, ownersTable, projectsTable } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const insertOwnerActionSchema = z.object({
	id: z.string(),
});
export type InsertOwnerAction = z.infer<typeof insertOwnerActionSchema>;

export const OwnerService = {
	insertUser: async (data: InsertOwnerAction) => {
		console.log('insertUser', data.id );
		return (await db
			.insert(ownersTable)
			.values(insertOwnerDbSchema.parse({ userId: data.id }))
			.returning())[0];
	},

	insertOrg: async (data: InsertOwnerAction) => {
		return (await db
			.insert(ownersTable)
			.values(insertOwnerDbSchema.parse({ orgId: data.id }))
			.returning())[0];
	},

	findUserById: async (id: string) => {
		return db.query.ownersTable.findFirst({
			where: eq(ownersTable.userId, id)
		});
	},

	findOwnerById: async (id: string) => {
		return db.query.ownersTable.findFirst({
			where: eq(ownersTable.orgId, id)
		});
	},

	deleteUser: async (id: string) => {
		return db.delete(ownersTable).where(eq(ownersTable.userId, id));
	},

	deleteOrg: async (id: string) => {
		return db.delete(ownersTable).where(eq(ownersTable.orgId, id));
	}
};
