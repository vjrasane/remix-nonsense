import { type ClassValue, clsx } from "clsx";
import { SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

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
