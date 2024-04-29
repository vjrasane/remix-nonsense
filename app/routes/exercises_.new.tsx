import * as Label from "@radix-ui/react-label";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { constant, either, object, string } from "decoders";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { createExercise } from "~/database/db-client";

const CreatePayload = object({
  intent: constant("create"),
  title: string,
  description: string,
});

const Payload = either(CreatePayload);

export const action = async ({ request }: ActionFunctionArgs) => {
  const values = Payload.verify(Object.fromEntries(await request.formData()));
  switch (values.intent) {
    case "create":
      const { intent, ...data } = values;
      const quizId = await createExercise(data);
      return redirect("/exercises/" + quizId);

    // create
    default:
      throw new Error("unrecognized intent");
  }
};

export default function NewQuizPage() {
  const { t } = useTranslation();
  // return null;
  return (
    <div className="flex flex-col gap-2 px-4">
      <Form method="post">
        <Label.Root htmlFor="title">{t("title")}</Label.Root>
        <Input id="title" name="title" placeholder={t("title")} />
        <Label.Root htmlFor="description">{t("description")}</Label.Root>
        <Textarea
          id="description"
          name="description"
          placeholder={t("description")}
        />
        <Button name="intent" value="create">
          {t("create")}
        </Button>
      </Form>
    </div>
  );
}
