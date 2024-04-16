import { createGlobalTheme } from "@vanilla-extract/css";
import { globalStyle } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  font: '-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  constants: {
    navBarHeight: "48px",
  },
  fontSize: {
    top: "32px",
    general: "16px",
  },
  color: {
    primary: "hsl(231, 90%, 61%)",
    primaryLighter: "hsl(231, 90%, 91%)",
    primaryDarker: "hsl(231, 90%, 41%)",
    primaryText: "#fff",
    white: "#fff",
    danger: "HSL(3, 82%, 60.8%)",
    dangerDarker: "HSL(3, 82%, 40.8%)",
    divider: "hsl(0, 0%, 86%)",
  },
  space: {
    tiny: "4px",
    small: "8px",
    medium: "12px",
    large: "16px",
    huge: "24px",
  },
});

export default globalStyle("html, body", {
  margin: 0,
  fontFamily: vars.font,
  fontSize: vars.fontSize.general,
});
