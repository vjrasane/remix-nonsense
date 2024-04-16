import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { PropsWithChildren } from "react";

export const Document = ({
  children,
  locale,
  dir,
}: PropsWithChildren<{
  locale: string;
  dir: string;
}>) => {
  return (
    <html lang={locale} dir={dir}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};
