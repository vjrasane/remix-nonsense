import {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import { localeCookie } from "./cookies";
import { Document } from "./components/document.component";
import { i18next } from "./i18next.server";
import { cssBundleHref } from "@remix-run/css-bundle";
// import radix from "@radix-ui/themes/styles.css?url";
// import "./theme.css";
import { Navbar } from "./components/navbar/navbar.component";
// import { Flex, Theme } from "@radix-ui/themes";
import global from "~/globals.css?url";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const locale = await i18next.getLocale(request);
  return json(
    { locale },
    {
      headers: { "Set-Cookie": await localeCookie.serialize(locale) },
    },
  );
};

export const meta: MetaFunction = () => [
  {
    charset: "utf-8",
    title: "Quikka",
    viewport: "width=device-width,initial-scale=1",
  },
];

export const links: LinksFunction = () => {
  return [
    { rel: "icon", href: "data:image/x-icon;base64,AA" },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
    // {
    //   rel: "stylesheet",
    //   href: radix,
    // },
    {
      rel: "stylesheet",
      href: global,
    },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.jade.min.css",
    },
  ];
};

export default function Root() {
  const { locale } = useLoaderData<typeof loader>();

  const { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <Document locale={locale} dir={i18n.dir()}>
      {/* <Theme accentColor="jade" className="h-dvh"> */}
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      {/* </Theme> */}
    </Document>
  );
}
