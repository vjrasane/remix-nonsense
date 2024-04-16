import { object, constant, string, DecoderType } from "decoders";
import { QuizContent } from "~/model";

export const UpdatePayload = object({
  intent: constant("update"),
  id: string,
  title: string,
  description: string,
  content: string.transform((str) => JSON.parse(str)).then(QuizContent.decode),
});
export type UpdatePayload = DecoderType<typeof UpdatePayload>;
