import {
  object,
  constant,
  string,
  nonEmptyArray,
  nullish,
  boolean,
  either,
  DecoderType,
  nonEmptyString,
  positiveInteger,
  iso8601,
} from "decoders";

const version = constant(1);

export const SelectAnswerOption = object({
  label: string,
  correct: nullish(boolean, false),
});

export const MultiOptionSelectAnswer = object({
  version,
  type: constant("multi option select answer"),
  prompt: string,
  options: nonEmptyArray(SelectAnswerOption),
  requireCorrect: nullish(positiveInteger, 1),
});

export type MultiOptionSelectAnswer = DecoderType<
  typeof MultiOptionSelectAnswer
>;

export const SingleInputAnswer = object({
  version,
  type: constant("single input answer"),
  prompt: nonEmptyString,
  answers: nonEmptyArray(string),
  caseSensitive: nullish(boolean, false),
  ignoreWhitespace: nullish(boolean, false),
});

export type SingleInputAnswer = DecoderType<typeof SingleInputAnswer>;

export const Exercise = either(SingleInputAnswer, MultiOptionSelectAnswer);

export type Exercise = DecoderType<typeof Exercise>;

export const Segment = object({
  version,
  exercise: Exercise,
});

export const Quiz = object({
  version,
  timestamp: iso8601.transform((d) => d.toISOString()),
  name: nonEmptyString,
  segments: nonEmptyArray(Segment),
});

export type Quiz = DecoderType<typeof Quiz>;
