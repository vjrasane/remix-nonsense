import { Decoder, DecoderType, string } from "decoders";
import { useEffect, useState } from "react";
import { StateUpdate } from "./types";

export const useLocalState = <D extends Decoder<any>>( // eslint-disable-line @typescript-eslint/no-explicit-any
  key: string,
  _default: DecoderType<D>,
  decoder: D
): [DecoderType<D>, StateUpdate<DecoderType<D>>] => {
  type T = DecoderType<D>;
  const [value, setValue] = useState<T>(() => {
    const value: T | undefined = string
      .transform((str) => JSON.parse(str))
      .then(decoder.decode)
      .value(window.localStorage.getItem(key));
    return value ?? _default;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
