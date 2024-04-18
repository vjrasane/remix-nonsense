import { type ClassValue, clsx } from "clsx";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSetStateActionResult = <T>(
  action: SetStateAction<T>,
  prev: T
): T => {
  if (typeof action === "function") return (action as (prev: T) => T)(prev);
  return action;
};

export const download = async (url: string): Promise<ReadableStream<any>> => {
  const response = await axios.get(url, { responseType: "stream" });
  const stream: ReadableStream = response.data;
  return stream;
};
