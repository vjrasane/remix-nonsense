import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { ExerciseContent } from "~/model";
import { emptyContent } from "~/model/v1";
import * as schema from "./schema";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const client = postgres(connectionString);
const db = drizzle(client, { schema });

export const getExerciseById = async (
  id: string,
): Promise<{ exercise: schema.Exercise; content: ExerciseContent } | null> => {
  const data = await db.query.exercise.findFirst({
    where: eq(schema.exercise.id, id),
  });
  if (!data) return null;
  return {
    exercise: data,
    content: ExerciseContent.verify(data.content),
  };
};
export const getExercises = async (): Promise<
  { exercise: schema.Exercise; content: ExerciseContent }[]
> => {
  const exercises = await db.query.exercise.findMany();
  return exercises.map((ex) => ({
    exercise: ex,
    content: ExerciseContent.verify(ex.content),
  }));
};

export const createExercise = async (
  input: Pick<schema.ExerciseInsert, "title" | "description">,
): Promise<string> => {
  const [{ id }] = await db
    .insert(schema.exercise)
    .values({
      ...input,
      content: emptyContent,
    })
    .returning({ id: schema.exercise.id });
  return id;
};

export const updateExercise = async (
  id: string,
  input: Partial<schema.ExerciseInsert>,
): Promise<{ quiz: schema.Exercise; content: ExerciseContent }> => {
  const [data] = await db
    .update(schema.exercise)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(schema.exercise.id, id))
    .returning();
  return {
    quiz: data,
    content: ExerciseContent.verify(data.content),
  };
};
