import React from "react";
import { MultiOptionSelectAnswer } from "~/components/exercises/milti-option-select-answer.component";
import { SingleInputAnswer } from "~/components/exercises/single-input-answer.component";

export type StateUpdate<T> = React.Dispatch<React.SetStateAction<T>>;

export type NoInfer<T> = [T][T extends any ? 0 : never]; // eslint-disable-line

export type Exercise = SingleInputAnswer | MultiOptionSelectAnswer;
