import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient, Quiz } from "@prisma/client";
import pg from "pg";
import { QuizContent, emtpyContent } from "~/model";

const connectionString = `${process.env.DATABASE_URL}`;

const { Pool } = pg;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const getQuizById = async (
  id: string
): Promise<{ quiz: Quiz; content: QuizContent } | null> => {
  const data = await prisma.quiz.findUnique({ where: { id } });
  if (!data) return null;
  return {
    quiz: data,
    content: QuizContent.verify(data.content),
  };
};

export const createQuiz = async (
  input: Pick<Quiz, "title" | "description">
): Promise<{ quiz: Quiz; content: QuizContent }> => {
  const data = await prisma.quiz.create({
    data: {
      ...input,
      content: emtpyContent,
    },
  });
  return {
    quiz: data,
    content: QuizContent.verify(data.content),
  };
};
type UpdateQuizInput = Prisma.Args<typeof prisma.quiz, "update">["data"];

export const updateQuiz = async (
  id: string,
  input: UpdateQuizInput
): Promise<{ quiz: Quiz; content: QuizContent }> => {
  const data = await prisma.quiz.update({
    where: { id },
    data: input,
  });
  return {
    quiz: data,
    content: QuizContent.verify(data.content),
  };
};
