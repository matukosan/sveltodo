import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';

export const todosTable = pgTable('todos', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	category: text('category'),
	projectId: integer('project_id').references(() => projectsTable.id)
});
export type InsertTodo = typeof todosTable.$inferInsert;

export const todosRelations = relations(todosTable, ({ one, many }) => ({
	project: one(projectsTable, {
		fields: [todosTable.projectId],
		references: [projectsTable.id]
	}),
	todoTags: many(todoTagsTable)
}));

export const projectsTable = pgTable('projects', {
	id: serial('id').primaryKey(),
	title: text('title').notNull()
});
export type InsertProject = typeof projectsTable.$inferInsert;
export const projectsRelations = relations(projectsTable, ({ many }) => ({
	todos: many(todosTable)
}));

export const tagsTable = pgTable('tags', {
	id: serial('id').primaryKey(),
	title: text('title').notNull()
});
export type InsertTag = typeof tagsTable.$inferInsert;
export const tagsRelations = relations(tagsTable, ({ many }) => ({
	todoTags: many(todoTagsTable)
}));

export const todoTagsTable = pgTable('todoTags', {
	id: serial('id').primaryKey(),
	todoId: integer('todo_id')
		.notNull()
		.references(() => todosTable.id, { onDelete: 'cascade' }),
	tagId: integer('tag_id')
		.notNull()
		.references(() => tagsTable.id, { onDelete: 'cascade' })
});
export const tagsToTodosRelations = relations(todoTagsTable, ({ one }) => ({
	todo: one(todosTable, {
		fields: [todoTagsTable.todoId],
		references: [todosTable.id]
	}),
	tag: one(tagsTable, {
		fields: [todoTagsTable.tagId],
		references: [tagsTable.id]
	})
}));
