CREATE TABLE IF NOT EXISTS "owners" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text,
	"org_id" text
);
--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "owner_id" integer;--> statement-breakpoint
ALTER TABLE "tags" ADD COLUMN "owner_id" integer;--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "owner_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tags" ADD CONSTRAINT "tags_owner_id_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todos" ADD CONSTRAINT "todos_owner_id_owners_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."owners"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
