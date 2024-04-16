import { FunctionComponent, useState } from "react";
import { Quiz } from "~/model/v1/quiz";
import { ExerciseView } from "./exercise/exercise.component";
import { Container, Heading } from "@radix-ui/themes";

export const QuizView: FunctionComponent<{ quiz: Quiz }> = ({ quiz }) => {
  const [progress, setProgress] = useState([]);
  const currentSegment = quiz.segments[progress.length];
  return (
    <Container>
      <Heading>{quiz.name}</Heading>
      <Container>
        <ExerciseView exercise={currentSegment.exercise} />
      </Container>
    </Container>
  );
};
