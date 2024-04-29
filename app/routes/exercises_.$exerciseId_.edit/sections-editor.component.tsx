import { set } from "lodash/fp";
import { FunctionComponent, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { StateUpdate } from "~/lib/types";
import { cn, getSetStateActionResult } from "~/lib/utils";
import { Section } from "~/model";

const SectionPreview: FunctionComponent<{
  section: Section;
  onClick: () => void;
  selected: boolean;
}> = ({ section, onClick, selected }) => {
  return (
    <div
      className={cn(
        "h-32 w-48 max-w-48 flex-shrink-0 cursor-pointer rounded-md border border-gray-300 p-1 transition-all hover:border-2 hover:border-gray-400",
        { "border-primary": selected },
      )}
      onClick={onClick}
    >
      <article className="prose flex scale-50 flex-col justify-between">
        <h1>{section.prompt}</h1>
        <span>{section.answers[0]}</span>
      </article>
    </div>
  );
};

const SectionEditor: FunctionComponent<{
  section: Section;
  onChange: StateUpdate<Section>;
}> = ({ section, onChange }) => {
  const { t } = useTranslation();
  return (
    <div className="flex w-full flex-col gap-2 rounded-md border border-gray-300 p-2">
      <Input
        placeholder={t("promptInput")}
        value={section.prompt}
        onChange={(e) => onChange(set("prompt", e.target.value))}
      ></Input>
      <Input
        placeholder={t("answerInput")}
        value={section.answers[0] ?? ""}
        onChange={(e) => onChange(set(["answers", 0], e.target.value))}
      ></Input>
    </div>
  );
};

export const SectionsEditor: FunctionComponent<{
  sections: Section[];
  onChange: StateUpdate<Section[]>;
}> = ({ sections, onChange }) => {
  const { t } = useTranslation();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selected = sections[selectedIndex];

  const onChangeSection = (action: SetStateAction<Section>) => {
    onChange((exs) =>
      exs.map((ex, index) => {
        if (index !== selectedIndex) return ex;
        return getSetStateActionResult(action, ex);
      }),
    );
  };

  const onAdd = () => {
    onChange((exs) => {
      const added: Section = {
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
    <div id="editor" className="flex h-full w-full flex-grow-0 overflow-y-auto">
      <div
        id="sidebar"
        className="flex h-full min-w-48 flex-col justify-between gap-2 border-r border-gray-300 pr-2"
      >
        <div className="flex flex-col gap-2 overflow-y-auto">
          {sections.map((ex, index) => (
            <SectionPreview
              section={ex}
              onClick={() => setSelectedIndex(index)}
              selected={selectedIndex === index}
            />
          ))}
        </div>
        <Button onClick={onAdd}>{t("addExercise")}</Button>
      </div>
      <div className="flex-grow px-2">
        {selected ? (
          <SectionEditor section={selected} onChange={onChangeSection} />
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
