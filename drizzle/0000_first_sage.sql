CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todoTags" (
	"id" serial PRIMARY KEY NOT NULL,
	"todo_id" integer NOT NULL,
	"tag_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text,
	"project_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todoTags" ADD CONSTRAINT "todoTags_todo_id_todos_id_fk" FOREIGN KEY ("todo_id") REFERENCES "public"."todos"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todoTags" ADD CONSTRAINT "todoTags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
