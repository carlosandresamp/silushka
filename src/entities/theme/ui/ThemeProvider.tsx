import { createEffect, ParentComponent } from "solid-js";

import { ThemeContext } from "../model/context";
import { createThemeState } from "../model/state";

export const ThemeProvider: ParentComponent = (props) => {
  const state = createThemeState();

  createEffect(() => {
    document.documentElement.dataset.theme = state.preferredTheme;
  });

  return <ThemeContext.Provider value={state}>{props.children}</ThemeContext.Provider>;
};
