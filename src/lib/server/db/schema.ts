import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm/relations';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const todosTable = pgTable('todos', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	description: text('description'),
	category: text('category'),
	projectId: integer('project_id').references(() => projectsTable.id)
});
export type InsertTodo = typeof todosTable.$inferInsert;
export const insertTodoSchema = createInsertSchema(todosTable);
export type InsertTodoSchemaType = z.infer<typeof insertTodoSchema>;
export const selectTodosSchema = createSelectSchema(todosTable);
export type SelectTodoSchemaType = z.infer<typeof selectTodosSchema>;

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
export const insertTodoTagsSchema = createInsertSchema(todoTagsTable);
export type InsertTodoTagsSchemaType = z.infer<typeof insertTodoTagsSchema>;
export const selectTodoTagsSchema = createSelectSchema(todoTagsTable);
export type SelectTodoTagsSchemaType = z.infer<typeof selectTodoTagsSchema>;
