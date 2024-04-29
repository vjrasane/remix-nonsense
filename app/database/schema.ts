import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  json,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { QuizContent } from "~/model";
import { VERSION } from "~/model/v1";

export const exerciseStatusEnum = pgEnum("exerciseStatus", [
  "draft",
  "enabled",
  "disabled",
]);

export const exercise = pgTable("exercise", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),

  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 1024 }),

  imageUrl: varchar("imageUrl", { length: 1024 }),
  thumbnailUrl: varchar("thumbnailUrl", { length: 1024 }),

  status: exerciseStatusEnum("status").default("draft").notNull(),

  createdAt: timestamp("createdAt", {
    precision: 0,
    withTimezone: false,
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updatedAt", {
    precision: 0,
    withTimezone: false,
  })
    .defaultNow()
    .notNull(),
  content: json("content").default({
    version: VERSION,
    exercises: [],
  } satisfies QuizContent),
});

export type Exercise = InferSelectModel<typeof exercise>;
export type ExerciseInsert = InferInsertModel<typeof exercise>;
