import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { string } from "decoders";
import { useTranslation } from "react-i18next";
import { getQuizById } from "~/database/db-client";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const quizId = string.verify(params.quizId);

  const quiz = await getQuizById(quizId);
  if (!quiz) throw json({ error: "notFound" }, { status: 404 });
  return json(quiz);
};

export default function QuizPage() {
  const { t } = useTranslation();
  const { quiz, content } = useLoaderData<typeof loader>();

  return null;
  // <Flex direction="column" gap="2">
  //   <Heading>{quiz.title}</Heading>
  //   {quiz.description && <Heading size="2">{quiz.description}</Heading>}
  //   <Link to="edit">
  //     <Button>{t("edit")}</Button>
  //   </Link>
  // </Flex>
}
