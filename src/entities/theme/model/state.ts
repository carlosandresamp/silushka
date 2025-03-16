import { usePrefersDark } from "@solid-primitives/media";
import { makePersisted } from "@solid-primitives/storage";
import { createMemo, createSignal, Setter } from "solid-js";

import { DEFAULT_THEME, THEME_LOCAL_STORAGE_KEY, THEMES } from "../config";
import { Theme } from "./types";

export type ThemeState = {
  theme: Theme;
  setTheme: Setter<Theme>;
  preferredTheme: Theme;
};

export const createThemeState = (): ThemeState => {
  const prefersDark = usePrefersDark();

  const [theme, setTheme] = makePersisted(createSignal<Theme>(DEFAULT_THEME), {
    name: THEME_LOCAL_STORAGE_KEY,
    deserialize: (data) => {
      const theme = JSON.parse(data) as Theme;
      return THEMES.includes(theme) ? theme : DEFAULT_THEME;
    },
  });

  const preferredTheme = createMemo(() => (theme() === "auto" ? (prefersDark() ? "dark" : "light") : theme()));

  return {
    get theme() {
      return theme();
    },
    setTheme,
    get preferredTheme() {
      return preferredTheme();
    },
  };
};
