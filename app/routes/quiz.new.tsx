import * as Label from "@radix-ui/react-label";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { constant, either, object, string } from "decoders";
import { useTranslation } from "react-i18next";
import { createQuiz } from "~/database/db-client";

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
      const { quiz } = await createQuiz(data);
      return redirect("/quiz/" + quiz.id);

    // create
    default:
      throw new Error("unrecognized intent");
  }
};

export default function NewQuizPage() {
  const { t } = useTranslation();
  return null;
  // <Flex direction="column" gap="2">
  //   <Form action="/quiz/new" method="post">
  //     <Label.Root htmlFor="title">{t("title")}</Label.Root>
  //     <TextField.Root id="title" name="title" placeholder={t("title")} />
  //     <Label.Root htmlFor="description">{t("description")}</Label.Root>
  //     <TextArea
  //       id="description"
  //       name="description"
  //       placeholder={t("description")}
  //     />
  //     <Button name="intent" value="create">
  //       {t("create")}
  //     </Button>
  //   </Form>
  // </Flex>
}
