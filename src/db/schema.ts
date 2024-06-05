import { text, sqliteTable, integer } from 'drizzle-orm/sqlite-core';

export const domainTable = sqliteTable('domain', {
	id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	name: text('name').notNull()
});

export type InsertDomain = typeof domainTable.$inferInsert;
export type SelectDomain = typeof domainTable.$inferSelect;
