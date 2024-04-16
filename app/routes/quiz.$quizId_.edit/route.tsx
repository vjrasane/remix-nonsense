import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { either, string } from "decoders";
import { getQuizById, updateQuiz } from "~/database/db-client";
import { EditQuiz } from "./edit-quiz.component";
import { UpdatePayload } from "./edit-quiz.model";

const Payload = either(UpdatePayload);

export const action = async ({ request }: ActionFunctionArgs) => {
  const values = Payload.verify(Object.fromEntries(await request.formData()));
  switch (values.intent) {
    case "update":
      const { intent, id, ...data } = values;
      const { quiz } = await updateQuiz(id, data);
      return quiz;
    default:
      throw new Error("unrecognized intent");
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const quizId = string.verify(params.quizId);

  const quiz = await getQuizById(quizId);
  if (!quiz) throw json({ error: "notFound" }, { status: 404 });
  return quiz;
};

export default function EditQuizPage() {
  const { quiz, content } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const onSubmit = (data: UpdatePayload) => {
    submit(
      {
        ...data,
        content: JSON.stringify(data.content),
      },
      { action: "/quiz/" + quiz.id + "/edit", method: "post" }
    );
  };

  return <EditQuiz quiz={quiz} content={content} onSubmit={onSubmit} />;
}
