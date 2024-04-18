import { T, noop, set } from "lodash/fp";
import { FunctionComponent, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn, getSetStateActionResult } from "~/lib/utils";
import { Exercise } from "~/model";
import { StateUpdate } from "~/utils/types";

const ExercisePreview: FunctionComponent<{
  exercise: Exercise;
  onClick: () => void;
  selected: boolean;
}> = ({ exercise, onClick, selected }) => {
  return (
    <div
      className={cn(
        "h-32 w-48 max-w-48 p-1 border rounded-md border-gray-300 flex-shrink-0 cursor-pointer transition-all hover:border-gray-400 hover:border-2",
        { "border-primary": selected }
      )}
      onClick={onClick}
    >
      <article className="prose flex flex-col justify-between scale-50">
        <h1>{exercise.prompt}</h1>
        <span>{exercise.answers[0]}</span>
      </article>
    </div>
  );
};

const ExerciseEditor: FunctionComponent<{
  exercise: Exercise;
  onChange: StateUpdate<Exercise>;
}> = ({ exercise, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full p-2 flex flex-col gap-2 border rounded-md border-gray-300">
      <Input
        placeholder={t("promptInput")}
        value={exercise.prompt}
        onChange={(e) => onChange(set("prompt", e.target.value))}
      ></Input>
      <Input
        placeholder={t("answerInput")}
        value={exercise.answers[0] ?? ""}
        onChange={(e) => onChange(set(["answers", 0], e.target.value))}
      ></Input>
    </div>
  );
};

export const ExercisesEditor: FunctionComponent<{
  exercises: Exercise[];
  onChange: StateUpdate<Exercise[]>;
}> = ({ exercises, onChange }) => {
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selected = exercises[selectedIndex];

  const onChangeExercise = (action: SetStateAction<Exercise>) => {
    onChange((exs) =>
      exs.map((ex, index) => {
        if (index !== selectedIndex) return ex;
        return getSetStateActionResult(action, ex);
      })
    );
  };

  const onAdd = () => {
    onChange((exs) => {
      const added: Exercise = {
        type: "single input answer",
        prompt: "",
        answers: [],
        caseSensitive: false,
        ignoreWhitespace: false,
      };
      setSelectedIndex(exs.length);
      return [...exs, added];
    });
  };
  return (
    <div id="editor" className="h-full w-full flex flex-grow-0 overflow-y-auto">
      <div
        id="sidebar"
        className="h-full min-w-48 pr-2 flex flex-col justify-between gap-2 border-r border-gray-300"
      >
        <div className="flex flex-col gap-2 overflow-y-auto">
          {exercises.map((ex, index) => (
            <ExercisePreview
              exercise={ex}
              onClick={() => setSelectedIndex(index)}
              selected={selectedIndex === index}
            />
          ))}
        </div>
        <Button onClick={onAdd}>{t("addExercise")}</Button>
      </div>
      <div className="flex-grow px-2">
        {selected ? (
          <ExerciseEditor exercise={selected} onChange={onChangeExercise} />
        ) : (
          <div>{t("selectOrCreateExercise")}</div>
        )}
      </div>
    </div>
  );
};
//   exercises.map((ex, index) => (
//     <div>
//       <span>{t("exercise") + " " + ex.prompt}</span>
//       <Button
//         variant="danger"
//         onClick={() => onChange((exs) => exs.filter((_, i) => i !== index))}
//       >
//         {t("remove")}
//       </Button>
//     </>
//   ));
// };
