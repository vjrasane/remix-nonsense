import React from "react";
export { type Jsonify } from "@remix-run/server-runtime/dist/jsonify";

export type StateUpdate<T> = React.Dispatch<React.SetStateAction<T>>;

export type NoInfer<T> = [T][T extends any ? 0 : never]; // eslint-disable-line
