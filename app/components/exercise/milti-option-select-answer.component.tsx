import { FunctionComponent } from "react";
import { MultiOptionSelectAnswer } from "~/model/v1/quiz";

export const MultiOptionSelectAnswerView: FunctionComponent<{
  exercise: MultiOptionSelectAnswer;
}> = ({ exercise }) => {
  return <div>{exercise.prompt}</div>;
};
