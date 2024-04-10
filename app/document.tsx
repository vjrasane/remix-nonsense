import { withEmotionCache } from "@emotion/react";
import {
  Meta,
  Links,
  ScrollRestoration,
  Scripts,
  LiveReload,
} from "@remix-run/react";
import { PropsWithChildren, useContext, useEffect } from "react";
import { ServerStyleContext, ClientStyleContext } from "./context";

export const Document = withEmotionCache(
  (
    {
      children,
    }: PropsWithChildren<{
      locale: string;
      dir: string;
    }>,
    emotionCache
  ) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag); // eslint-disable-line @typescript-eslint/no-explicit-any
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);