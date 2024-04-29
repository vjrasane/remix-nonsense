import { deburr } from "lodash/fp";
import { Section } from "~/model";

const applyInputAnswerCriteria = (value: string, section: Section): string => {
  let applied = value;
  applied = section.caseSensitive ? applied : applied.toLowerCase();
  applied = !section.ignoreWhitespace ? applied : applied.replaceAll(/\s/, "");
  applied = !section.ignoreSpecialChars
    ? applied
    : deburr(applied).replaceAll(/[^?.,_-:;^*$€$£@!§<>()[]{}]/, "");
  return applied;
};

export const isCorrectAnswer = (answer: string, section: Section): boolean => {
  const comparedAnswer = applyInputAnswerCriteria(answer, section);
  return section.answers.some((correct) => {
    const comparedCorrect = applyInputAnswerCriteria(correct, section);
    return comparedAnswer === comparedCorrect;
  });
};
