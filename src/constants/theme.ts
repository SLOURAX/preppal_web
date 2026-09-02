export const THEME = {
  light: "light",
  dark: "dark",
  system: "system",
} as const;
export type ThemeName = (typeof THEME)[keyof typeof THEME];
