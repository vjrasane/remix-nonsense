import { FunctionComponent } from "react";
import { Exercise } from "~/model/v1/quiz";
import { SingleInputAnswerView } from "./single-input-answer.component";
import { MultiOptionSelectAnswerView } from "./milti-option-select-answer.component";

export const ExerciseView: FunctionComponent<{ exercise: Exercise }> = ({
  exercise,
}) => {
  switch (exercise.type) {
    case "single input answer":
      return <SingleInputAnswerView exercise={exercise} />;
    case "multi option select answer":
      return <MultiOptionSelectAnswerView exercise={exercise} />;
  }
};
