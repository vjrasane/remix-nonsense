import { Quiz } from "@prisma/client";
import { set, update } from "lodash/fp";
import { FunctionComponent, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Exercise, QuizContent } from "~/model";
import { UpdatePayload } from "./edit-quiz.model";
import { ExercisesEditor } from "./exercises-editor.component";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { getSetStateActionResult } from "~/lib/utils";

export const EditQuiz: FunctionComponent<{
  quiz: Pick<Quiz, "title" | "description" | "id">;
  content: QuizContent;
  onSubmit: (data: UpdatePayload) => void;
}> = ({ quiz, content, onSubmit }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<UpdatePayload>({
    intent: "update",
    id: quiz.id,
    title: quiz.title,
    description: quiz.description ?? "",
    content,
  });
  const setExercises = (action: SetStateAction<Exercise[]>) => {
    setData(
      update(["content", "exercises"], (exs) =>
        getSetStateActionResult(action, exs)
      )
    );
  };
  return (
    <div
      id="view"
      className="h-content p-2 flex flex-col gap-y-2 overflow-y-hidden"
    >
      <article className="prose">
        <h2>{t("editExercise")}</h2>
      </article>
      <Input
        placeholder={t("title")}
        value={data.title}
        onChange={(e) => setData(set("title", e.target.value))}
      ></Input>
      <Textarea
        placeholder={t("description")}
        value={data.description}
        onChange={(e) => setData(set("description", e.target.value))}
      ></Textarea>
      <ExercisesEditor
        exercises={data.content.exercises}
        onChange={setExercises}
      />
      {/* <Button
        onClick={() =>
          setExercises((exs) => [
            ...exs,
            {
              type: "single input answer",
              prompt: "",
              answers: [],
              caseSensitive: false,
              ignoreWhitespace: false,
            },
          ])
        }
      >
        {t("addSegment")}
      </Button> */}
      {/* <Button name="intent" value="update">
        {t("save")}
      </Button> */}
      {/* <Button onClick={() => onSubmit(data)}>{t("save")}</Button> */}
      {/* <code>{JSON.stringify(data, null, 2)}</code> */}
      {/* </Form> */}
    </div>
  );
};
