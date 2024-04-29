import {
  object,
  constant,
  string,
  nullish,
  boolean,
  either,
  DecoderType,
  positiveInteger,
  array,
} from "decoders";
export const VERSION = 1;
const version = constant(VERSION);

export const SelectAnswerOption = object({
  label: string,
  correct: nullish(boolean, false),
});

export const MultiOptionSelectAnswer = object({
  type: constant("multi option select answer"),
  prompt: string,
  options: array(SelectAnswerOption),
  requireCorrect: nullish(positiveInteger, 1),
});

export type MultiOptionSelectAnswer = DecoderType<
  typeof MultiOptionSelectAnswer
>;

export const SingleInputAnswer = object({
  type: constant("single input answer"),
  prompt: string,
  answers: array(string),
  caseSensitive: nullish(boolean, false),
  ignoreWhitespace: nullish(boolean, false),
  ignoreSpecialChars: nullish(boolean, false),
});

export type SingleInputAnswer = DecoderType<typeof SingleInputAnswer>;

export const Section = either(SingleInputAnswer);

export type Section = DecoderType<typeof Section>;

export const ExerciseContent = object({
  version,
  sections: array(Section),
});

export type ExerciseContent = DecoderType<typeof ExerciseContent>;

export const emptyContent: ExerciseContent = {
  version: 1,
  sections: [],
};
