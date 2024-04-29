DO $$ BEGIN
 ALTER TYPE "quizStatus" RENAME TO "exerciseStatus";
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "quiz" RENAME TO "exercise";--> statement-breakpoint