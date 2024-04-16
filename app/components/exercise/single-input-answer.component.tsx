import { Button, Container, Heading } from "@radix-ui/themes";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { SingleInputAnswer } from "~/model/v1/quiz";

export const SingleInputAnswerView: FunctionComponent<{
  exercise: SingleInputAnswer;
}> = ({ exercise }) => {
  const [answer, setAnswer] = useState("");
  const { t } = useTranslation();
  return (
    <Container>
      <Heading >{exercise.prompt}</Heading>
      {answer}
      {/* <Input
        placeholder={t("inputAnswer")}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        variant="filled"
      /> */}
      <Button disabled={true}>
        {t("answer")}
      </Button>
    </Container>
  );
};
