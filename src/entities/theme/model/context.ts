import { createContext, useContext } from "solid-js";

import { ThemeState } from "./state";

export const ThemeContext = createContext<ThemeState>();

export const useTheme = (): ThemeState => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("The 'useTheme' primitive must be used within a <ThemeProvider> component.");
  }

  return context;
};
