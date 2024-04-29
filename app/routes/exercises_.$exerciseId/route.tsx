import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { string } from "decoders";
import { ImageIcon, PlayIcon } from "lucide-react";
import { FunctionComponent, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { getExerciseById } from "~/database/db-client";
import { Exercise } from "~/database/schema";
import { Jsonify } from "~/lib/types";
import { ExerciseContent, Section } from "~/model";
import { isCorrectAnswer } from "./exercise-utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const exerciseId = string.verify(params.exerciseId);

  const exercise = await getExerciseById(exerciseId);
  if (!exercise) throw json({ error: "notFound" }, { status: 404 });
  return json(exercise);
};

const IntroScreen: FunctionComponent<{
  exercise: Jsonify<Exercise>;
  content: ExerciseContent;
  onNext: () => void;
}> = ({ exercise, content, onNext }) => {
  const { t } = useTranslation();
  return (
    <Card className="w-full">
      <CardTitle>{exercise.title}</CardTitle>
      <CardContent>{exercise.description}</CardContent>
      <CardFooter className="flex justify-between">
        <div>
          {content.sections.length} {t("sections")}
        </div>
        <button className="flex gap-2" onClick={onNext}>
          <PlayIcon></PlayIcon>
          {t("start")}
        </button>
      </CardFooter>
    </Card>
  );
};

const SectionScreen: FunctionComponent<{
  section: Section;
}> = ({ section }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  const onReady = (value: string) => {
    console.log(isCorrectAnswer(value, section));
  };

  return (
    <Card className="w-full">
      <CardTitle>{section.prompt}</CardTitle>
      <CardContent className="flex w-full items-center justify-center">
        <ImageIcon></ImageIcon>
      </CardContent>
      <CardFooter className="flex justify-between">
        <fieldset role="group">
          <input
            placeholder={t("answer")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button
            disabled={!value.length}
            className="flex gap-2"
            onClick={() => onReady(value)}
          >
            <PlayIcon></PlayIcon>
            {t("ready")}
          </button>
        </fieldset>
      </CardFooter>
    </Card>
  );
};

export default function QuizPage() {
  const { t } = useTranslation();
  const { exercise, content } = useLoaderData<typeof loader>();

  const [currentSectionIndex, setCurrentSectionIndex] = useState<
    "intro" | number | "results"
  >("intro");
  const currentSection = useMemo(() => {
    if (typeof currentSectionIndex !== "number") return;
    return content.sections[currentSectionIndex];
  }, [currentSectionIndex]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        <article className="flex h-36 w-36 cursor-pointer items-center justify-center p-2">
          {exercise.imageUrl ? (
            <img
              src={exercise.imageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon />
          )}
        </article>
        <hgroup className="flex flex-grow flex-col">
          <h2>{exercise.title}</h2>
        </hgroup>
      </div>
      <div className="container mx-auto">
        {(() => {
          switch (currentSectionIndex) {
            case "intro":
              return (
                <IntroScreen
                  exercise={exercise}
                  content={content}
                  onNext={() => setCurrentSectionIndex(0)}
                ></IntroScreen>
              );
            case "results":
              return "results";
            default:
              return currentSectionIndex;
          }
        })()}
      </div>
    </div>
  );
}
