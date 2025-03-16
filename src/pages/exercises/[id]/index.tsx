import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { For, Show } from "solid-js";

import { ExerciseDifficultyIndicator, ExerciseMoreDropdown, ExerciseShortcuts, ExerciseTags } from "@entities/exercise";
import db, { createSignalQuery } from "@shared/db";
import { Navigation } from "@widgets/navigation";

import BarChartIcon from "~icons/ic/round-bar-chart";
import LinkIcon from "~icons/ic/round-link";

export default (props: RouteSectionProps) => {
  const navigate = useNavigate();

  const exercise = createSignalQuery(() => db.exercises.get(Number(props.params.id)));

  return (
    <Show when={exercise()}>
      {(exercise) => (
        <div>
          <Navigation
            back="/exercises"
            label={
              <>
                <span>{exercise().name}</span>
                <ExerciseDifficultyIndicator difficulty={exercise().difficulty} />
              </>
            }
            after={
              <ExerciseMoreDropdown exercise={exercise()} class="ms-auto" onDelete={() => navigate("/exercises")} />
            }
          />

          <ExerciseShortcuts exercise={exercise()} />

          <p class="my-4">{exercise().description}</p>

          <div class="space-y-4">
            <Show when={exercise().tags}>
              {(tags) => (
                <section>
                  <ExerciseTags tags={tags()} />
                </section>
              )}
            </Show>

            <Show when={exercise().equipment?.length}>
              <section class="space-y-2">
                <h2 class="font-semibold text-xl">Оборудование</h2>
                <ul>
                  <For each={exercise().equipment!}>
                    {(equipment) => (
                      <li class="flex items-center gap-1">
                        <BarChartIcon class="size-6" />
                        <span>{equipment}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </section>
            </Show>

            <Show when={exercise().resources?.length}>
              <section class="space-y-2">
                <h2 class="font-semibold text-xl">Ресурсы</h2>
                <ul>
                  <For each={exercise().resources!}>
                    {(resource) => (
                      <li>
                        <a
                          href={resource}
                          rel="noopener noreferrer"
                          target="_blank"
                          class="flex items-center text-fg-accent gap-1 hover:opacity-75 active:opacity-50 active:transition-none transition"
                        >
                          <LinkIcon class="size-6" />
                          <span>{resource}</span>
                        </a>
                      </li>
                    )}
                  </For>
                </ul>
              </section>
            </Show>
          </div>
        </div>
      )}
    </Show>
  );
};
