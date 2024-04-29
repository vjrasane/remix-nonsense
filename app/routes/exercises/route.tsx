import { ImageIcon } from "@radix-ui/react-icons";
import { Link, useLoaderData } from "@remix-run/react";
import { PenIcon, PlayIcon, PlusIcon } from "lucide-react";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { getExercises } from "~/database/db-client";
import { Exercise } from "~/database/schema";
import { Jsonify } from "~/lib/types";
import { ExerciseContent } from "~/model";

export const loader = async () => {
  const exercises = await getExercises();
  return exercises;
};

const ExerciseCard: FunctionComponent<{
  exercise: Jsonify<Exercise>;
  content: ExerciseContent;
}> = ({ exercise, content }) => {
  const { t } = useTranslation();
  return (
    <article>
      <header>
        <hgroup className="m-0">
          <h3>{exercise.title}</h3>
          <p>
            {content.sections.length} {t("sections")}
          </p>
          <p>{exercise.description}</p>
        </hgroup>
      </header>
      {exercise.imageUrl ? (
        <img
          src={exercise.imageUrl}
          alt={exercise.description ?? exercise.title}
        />
      ) : (
        <ImageIcon />
      )}
      <footer className="flex justify-end gap-2">
        <Link to={exercise.id + "/edit"}>
          <button className="secondary outline flex flex-row items-center gap-2">
            <PenIcon></PenIcon>
            {t("edit")}
          </button>
        </Link>
        <Link to={exercise.id}>
          <button className="flex flex-row items-center gap-2">
            <PlayIcon></PlayIcon>
            {t("start")}
          </button>
        </Link>
      </footer>
    </article>
  );
};

export default function ExerciseListPage() {
  const { t } = useTranslation();
  const exercises = useLoaderData<typeof loader>();

  return (
    <>
      <header className="flex w-full justify-end px-4">
        <Link to="new">
          <button className="flex gap-2">
            <PlusIcon></PlusIcon>
            {t("createNew")}
          </button>
        </Link>
      </header>
      <div className="flex flex-wrap gap-x-2">
        {exercises.map(({ exercise, content }) => (
          <>
            <ExerciseCard exercise={exercise} content={content} />
            <ExerciseCard exercise={exercise} content={content} />
            <ExerciseCard exercise={exercise} content={content} />
          </>
        ))}
      </div>
    </>
  );
}
