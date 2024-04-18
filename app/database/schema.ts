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

export const quizStatusEnum = pgEnum("quizStatus", [
  "draft",
  "enabled",
  "disabled",
]);

export const quiz = pgTable("quiz", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 256 }),
  description: varchar("description", { length: 1024 }),

  status: quizStatusEnum("status").default("draft"),

  createdAt: timestamp("createdAt", {
    precision: 0,
    withTimezone: false,
  }).defaultNow(),
  updatedAt: timestamp("updatedAt", {
    precision: 0,
    withTimezone: false,
  }).defaultNow(),
  content: json("content").default({
    version: VERSION,
    exercises: [],
  } satisfies QuizContent),
});

export type Quiz = InferSelectModel<typeof quiz>
export type InsertQuiz = InferInsertModel<typeof quiz>