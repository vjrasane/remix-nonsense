import {
  object,
  constant,
  string,
  DecoderType,
  url,
  optional,
  jsonObject,
  either,
} from "decoders";
import { ExerciseContent } from "~/model";

export const UpdatePayload = object({
  intent: constant("update"),
  id: string,
  imageUrl: optional(url),
  title: string,
  description: string,
  content: either(
    string.transform((str) => JSON.parse(str)),
    jsonObject,
  ).then(ExerciseContent.decode),
});
export type UpdatePayload = DecoderType<typeof UpdatePayload>;
