/* @refresh reload */
import "./styles/index.css";

import { I18nProvider } from "@kobalte/core/i18n";
import { Route, Router } from "@solidjs/router";
import { lazy, Show, Suspense } from "solid-js";
import { render } from "solid-js/web";
import { Toaster } from "solid-sonner";

import { CharacterProvider, useCharacter } from "@entities/character";
import { ThemeProvider } from "@entities/theme";

// https://vite.dev/guide/build#load-error-handling
window.addEventListener("vite:preloadError", () => {
  window.location.reload();
});

const root = document.getElementById("root");

if (!(root instanceof HTMLElement)) {
  throw new Error("The root element is missing.");
}

render(
  () => (
    <I18nProvider locale="ru">
      <CharacterProvider>
        <ThemeProvider>
          <Router
            base={import.meta.env.BASE_URL}
            root={(props) => {
              const character = useCharacter();

              return (
                <Show when={character.character.name} fallback={lazy(() => import("@widgets/onboarding"))()}>
                  <Suspense>{props.children}</Suspense>
                </Show>
              );
            }}
          >
            <Route component={lazy(() => import("@widgets/layout"))}>
              <Route path="/" component={lazy(() => import("@pages/home"))} />
              <Route path="/exercises" component={lazy(() => import("@pages/exercises"))} />
              <Route path="/exercises/new" component={lazy(() => import("@pages/exercises/new"))} />
              <Route path="/exercises/:id" component={lazy(() => import("@pages/exercises/[id]"))} />
              <Route path="/exercises/:id/edit" component={lazy(() => import("@pages/exercises/[id]/edit"))} />
              <Route path="/workouts" component={lazy(() => import("@pages/workouts"))} />
              <Route path="/workouts/new" component={lazy(() => import("@pages/workouts/new"))} />
              <Route path="/workouts/:id" component={lazy(() => import("@pages/workouts/[id]"))} />
              <Route path="/workouts/:id/edit" component={lazy(() => import("@pages/workouts/[id]/edit"))} />
              <Route path="/workouts/:id/start" component={lazy(() => import("@pages/workouts/[id]/start"))} />
              <Route path="/character" component={lazy(() => import("@pages/character"))} />
              <Route path="/shop" component={lazy(() => import("@pages/shop"))} />
              <Route path="/achievements" component={lazy(() => import("@pages/achievements"))} />
              <Route path="/settings" component={lazy(() => import("@pages/settings"))} />
            </Route>
            <Route path="*404" component={lazy(() => import("@pages/404"))} />
          </Router>

          {/* @ts-expect-error use the theme from the document element instead of the toaster */}
          <Toaster theme="" />
        </ThemeProvider>
      </CharacterProvider>
    </I18nProvider>
  ),
  root,
);
