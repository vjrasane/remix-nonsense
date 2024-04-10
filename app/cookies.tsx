import { createCookie } from "@remix-run/node";

export const localeCookie = createCookie("quikka_v0_locale", {
  path: "/",
  httpOnly: true,
  sameSite: "strict",
  secure: process.env.NODE_ENV === "production",
  expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
  maxAge: 365 * 24 * 60 * 60,
});
