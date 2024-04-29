import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { either, string } from "decoders";
import { getExerciseById } from "~/database/db-client";
import { EditExercise } from "./edit-exercise.component";
import { UpdatePayload } from "./edit-exercise.model";
import { updateExerciseAction } from "./edit-exercise.utils";

const Payload = either(UpdatePayload);

export const action = async ({ request }: ActionFunctionArgs) => {
  const values = Payload.verify(Object.fromEntries(await request.formData()));
  switch (values.intent) {
    case "update":
      const exercise = await updateExerciseAction(values);
      return exercise;
    default:
      throw new Error("unrecognized intent");
  }
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const exerciseId = string.verify(params.exerciseId);

  const exercise = await getExerciseById(exerciseId);
  if (!exercise) throw json({ error: "notFound" }, { status: 404 });
  return exercise;
};

export default function EditQuizPage() {
  const { exercise, content } = useLoaderData<typeof loader>();
  const submit = useSubmit();

  const onSubmit = (data: UpdatePayload) => {
    const { content, imageUrl, ...rest } = data;
    submit(
      {
        ...rest,
        content: JSON.stringify(content),
        ...(imageUrl ? { imageUrl: imageUrl.toString() } : {}),
      },
      { action: "/quiz/" + exercise.id + "/edit", method: "post" },
    );
  };

  return (
    <EditExercise exercise={exercise} content={content} onSubmit={onSubmit} />
  );
}
