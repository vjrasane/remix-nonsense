DO $$ BEGIN
 CREATE TYPE "quizStatus" AS ENUM('draft', 'enabled', 'disabled');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quiz" (
	"id" uuid PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" varchar(1024),
	"status" "quizStatus" DEFAULT 'draft',
	"createdAt" timestamp (0) DEFAULT now(),
	"updatedAt" timestamp (0) DEFAULT now(),
	"content" json DEFAULT '{"version":1,"exercises":[]}'::json
);
