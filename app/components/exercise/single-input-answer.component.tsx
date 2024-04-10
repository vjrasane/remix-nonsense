import { Button, Container, HStack, Heading, Input } from "@chakra-ui/react";
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
      <Heading size="md">{exercise.prompt}</Heading>
      {answer}
      <HStack>
        <Input
          placeholder={t("inputAnswer")}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          variant="filled"
        />
        <Button disabled={true} size="md" colorScheme="teal">
          {t("answer")}
        </Button>
      </HStack>
    </Container>
  );
};
