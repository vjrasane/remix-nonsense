import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { QuizContent } from "~/model";
import { emptyContent } from "~/model/v1";
import * as schema from "./schema";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const client = postgres(connectionString);
const db = drizzle(client, { schema });

export const getQuizById = async (
  id: string
): Promise<{ quiz: schema.Quiz; content: QuizContent } | null> => {
  const data = await db.query.quiz.findFirst({
    where: eq(schema.quiz.id, id),
  });
  if (!data) return null;
  return {
    quiz: data,
    content: QuizContent.verify(data.content),
  };
};

export const createQuiz = async (
  input: Pick<schema.InsertQuiz, "title" | "description">
): Promise<string | null> => {
  const [{ id }] = await db
    .insert(schema.quiz)
    .values({
      ...input,
      content: emptyContent,
    })
    .returning({ id: schema.quiz.id });
  return id;
};

export const updateQuiz = async (
  id: string,
  input: Partial<schema.InsertQuiz>
): Promise<{ quiz: schema.Quiz; content: QuizContent }> => {
  const [data] = await db
    .update(schema.quiz)
    .set({
      ...input,
    })
    .where(eq(schema.quiz.id, id))
    .returning();
  return {
    quiz: data,
    content: QuizContent.verify(data.content),
  };
};
