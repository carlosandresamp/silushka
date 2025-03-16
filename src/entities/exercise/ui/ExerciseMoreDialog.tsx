import { For, Show } from "solid-js";

import { ExerciseDifficultyIndicator, ExerciseTags } from "@entities/exercise";
import { Exercise } from "@shared/db";
import Button from "@shared/ui/button";
import Dialog from "@shared/ui/dialog";

import BarChartIcon from "~icons/ic/round-bar-chart";
import LinkIcon from "~icons/ic/round-link";
import NotesIcon from "~icons/ic/round-notes";

export type ExerciseMoreDialogProps = {
  exercise: Exercise;
};

export const ExerciseMoreDialog = (props: ExerciseMoreDialogProps) => {
  return (
    <Dialog>
      <Button
        as={Dialog.Trigger}
        shape="circle"
        class="ms-auto"
        spacing="sm"
        variant="ghost"
        appearance="tertiary"
        aria-label="Оборудование и заметки"
      >
        <NotesIcon class="size-6" />
      </Button>
      <Dialog.Content>
        <Dialog.Header>
          <div class="flex items-center gap-1 text-xl font-bold">
            <Dialog.Label>{props.exercise.name}</Dialog.Label>
            <ExerciseDifficultyIndicator difficulty={props.exercise.difficulty} />
          </div>

          <Dialog.Dismiss />
        </Dialog.Header>

        <Show when={props.exercise.description}>{(description) => <p>{description()}</p>}</Show>

        <Show when={props.exercise.tags}>
          {(tags) => (
            <section>
              <ExerciseTags tags={tags()} />
            </section>
          )}
        </Show>

        <Show when={props.exercise.equipment?.length}>
          <section class="space-y-2">
            <h2 class="font-semibold text-lg">Оборудование</h2>
            <ul>
              <For each={props.exercise.equipment!}>
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

        <Show when={props.exercise.resources?.length}>
          <section class="space-y-2">
            <h2 class="font-semibold text-lg">Ресурсы</h2>
            <ul>
              <For each={props.exercise.resources!}>
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
      </Dialog.Content>
    </Dialog>
  );
};
