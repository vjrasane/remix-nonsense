import { redirect } from "@remix-run/node";
import { i18next } from "~/i18next.server";

export const redirectLocale = async (request: Request) => {
  const locale = await i18next.getLocale(request);
  const url = new URL(request.url);
  const redir = url.pathname ? `/${locale}${url.pathname}` : locale;
  return redirect(redir, 302);
};
