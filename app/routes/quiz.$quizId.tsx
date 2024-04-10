import { Button, Flex, Text } from "@radix-ui/themes";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { QuizView } from "~/components/quiz.component";
import { Exercise, Quiz } from "~/model/v1/quiz";
import { ClientOnly } from "remix-utils/client-only";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const quizId = params.quizId;
  const exercise: Exercise = {
    version: 1,
    type: "single input answer",
    prompt: "this is the question?",
    answers: ["answer"],
    caseSensitive: false,
    ignoreWhitespace: false,
  };
  const quiz: Quiz = {
    version: 1,
    name: "quiz",
    timestamp: new Date().toISOString(),
    segments: [
      {
        version: 1,
        exercise,
      },
    ],
  };
  return json({ quizId, quiz });
};

export default function QuizPage() {
  const { quiz } = useLoaderData<typeof loader>();

  return (
    <Flex direction="column" gap="2">
      <ClientOnly>{() => <QuizView quiz={quiz} />}</ClientOnly>
    </Flex>
  );
}
