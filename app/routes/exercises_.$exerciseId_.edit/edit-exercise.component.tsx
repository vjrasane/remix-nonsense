import { ImageIcon, SectionIcon } from "@radix-ui/react-icons";
import { isEqual, set, update } from "lodash/fp";
import {
  FunctionComponent,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { getSetStateActionResult } from "~/lib/utils";
import { UpdatePayload } from "./edit-exercise.model";
import { url } from "decoders";
import { ExerciseContent, Section } from "~/model";
import { Exercise } from "~/database/schema";
import { Jsonify } from "~/lib/types";
import { SectionsEditor } from "./sections-editor.component";

type EditFormValues = Omit<UpdatePayload, "imageUrl" | "content"> & {
  imageUrl?: string;
  content: ExerciseContent;
};

const InputImageUrlDialog: FunctionComponent<{
  imageUrl: string | undefined;
  setImageUrl: (url: URL | undefined) => void;
  onClose: () => void;
}> = ({ imageUrl, setImageUrl, onClose }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLImageElement>(null);
  const [value, setValue] = useState(imageUrl ?? "");
  const [state, setState] = useState<"loading" | "loaded" | "failure">(
    "loading",
  );

  useEffect(() => {
    setState("loading");
  }, [value]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const result = useMemo(() => {
    return url.decode(value);
  }, [value]);

  const error = useMemo(() => {
    return;
  }, [t, result, value]);

  // useEffect(() => {
  //   if (!ref.current) return;
  //   const onLoaded = () => console.log("loaded listener");
  //   const onLoadStart = () => console.log("start listener");
  //   ref.current.addEventListener("loadstart", onLoadStart);
  //   ref.current.addEventListener("load", onLoaded);
  //   return () => {
  //     ref.current?.removeEventListener("load", onLoaded);
  //     ref.current?.removeEventListener("image", onLoadStart);
  //   };
  // }, [ref]);

  return (
    <dialog open>
      <article>
        <header className="">
          <p>
            <strong>{t("inputImageUrl")}</strong>
          </p>
        </header>
        <section>
          {result.ok ? (
            <img
              ref={ref}
              // identify by url to force remount on change
              key={result.value.toString()}
              src={result.value.toString()}
              onLoad={() => setState("loaded")}
              onError={() => setState("failure")}
              // onLoad={() => console.log("loaded")}
              // onLoadStart={() => console.log("started")}
              // onReset={() => console.log("reset")}
              // onError={() => console.log("error")}
            ></img>
          ) : (
            <article className="container mx-auto">
              <ImageIcon />
            </article>
          )}
        </section>
        <fieldset role="group">
          <input
            placeholder={t("imageUrl")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-invalid={!result.ok}
            aria-describedby="image-url-error"
          />
          <button className="secondary" onClick={() => setValue("")}>
            {t("clear")}
          </button>
        </fieldset>
        {result.ok ? null : (
          <small id="image-url-error">{t("invalidUrl")}</small>
        )}
        <footer>
          <button disabled={state !== "loaded"}>{t("save")}</button>
          <button className="outline" onClick={onClose}>
            {t("close")}
          </button>
        </footer>
      </article>
    </dialog>
  );
};

export const EditExercise: FunctionComponent<{
  exercise: Jsonify<Exercise>;
  content: ExerciseContent;
  onSubmit: (data: UpdatePayload) => void;
}> = ({ exercise, content, onSubmit }) => {
  const { t } = useTranslation();
  const initialData: EditFormValues = useMemo(
    () => ({
      intent: "update",
      id: exercise.id,
      title: exercise.title,
      description: exercise.description ?? "",
      imageUrl: exercise.imageUrl ?? undefined,
      content,
    }),
    [exercise, content],
  );
  const [data, setData] = useState<EditFormValues>(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const validated = useMemo(() => UpdatePayload.decode(data), [data]);
  const setSections = (action: SetStateAction<Section[]>) => {
    setData(
      update(["content", "exercises"], (exs) =>
        getSetStateActionResult(action, exs),
      ),
    );
  };
  const hasChanges = useMemo(
    () => !isEqual(data, initialData),
    [data, initialData],
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      {/* <Dialog
        isOpen={dialogOpen}
        footer={
          <Button onClick={() => setDialogOpen(false)}>{t("close")}</Button>
        }
      > */}
      {/* </Dialog> */}
      {dialogOpen ? (
        <InputImageUrlDialog
          imageUrl={data.imageUrl}
          setImageUrl={(url) => setData(set("imageUrl", url?.toString()))}
          onClose={() => setDialogOpen(false)}
        />
      ) : null}
      <div className="flex h-content flex-col gap-y-2 overflow-y-hidden p-2">
        <div id="header" className="flex justify-between align-middle">
          <h2>{t("editExercise")}</h2>
          <div id="actions" className="flex gap-2">
            <Button
              disabled={!hasChanges || !validated.ok}
              onClick={() => validated.ok && onSubmit(validated.value)}
            >
              {t("saveChanges")}
            </Button>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <article
            className="flex h-36 w-36 cursor-pointer justify-center p-2 align-middle"
            onClick={() => setDialogOpen(true)}
          >
            {data.imageUrl ? (
              <img
                src={data.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <ImageIcon />
            )}
          </article>
          <div className="flex flex-grow flex-col">
            <Input
              placeholder={t("title")}
              value={data.title}
              onChange={(e) => setData(set("title", e.target.value))}
            ></Input>
            <Textarea
              className="flex-grow resize-none"
              placeholder={t("description")}
              value={data.description}
              onChange={(e) => setData(set("description", e.target.value))}
            ></Textarea>
          </div>
        </div>
        <Separator />
        <SectionsEditor
          sections={data.content.sections}
          onChange={setSections}
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
    </>
  );
};
