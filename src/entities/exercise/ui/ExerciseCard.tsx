import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { A } from "@solidjs/router";
import { Show, splitProps, ValidComponent } from "solid-js";

import { Exercise } from "@shared/db";

import { ExerciseDifficultyIndicator } from "./ExerciseDifficultyIndicator";
import { ExerciseMoreDropdown } from "./ExerciseMoreDropdown";
import { ExerciseTags } from "./ExerciseTags";

import BarChartIcon from "~icons/ic/round-bar-chart";
import LinkIcon from "~icons/ic/round-link";

export type ExerciseCardOptions = {
  exercise: Exercise;
};

export type ExerciseCardProps = ExerciseCardOptions;

export const ExerciseCard = <T extends ValidComponent = "div">(props: PolymorphicProps<T, ExerciseCardProps>) => {
  const [localProps, otherProps] = splitProps(props as ExerciseCardProps, ["exercise"]);

  return (
    <Polymorphic as="div" class="py-2" {...otherProps}>
      <div class="relative flex w-full items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-bg-primary active:opacity-75 active:transition-none">
        <div class="flex flex-col space-y-1">
          <A
            href={`/exercises/${localProps.exercise.id}`}
            draggable={false}
            class="text-lg font-semibold flex items-center gap-1 before:inset-0 before:absolute"
          >
            <span>{localProps.exercise.name}</span>
            <ExerciseDifficultyIndicator difficulty={localProps.exercise.difficulty} />
          </A>
          <Show when={localProps.exercise.tags}>{(tags) => <ExerciseTags tags={tags()} />}</Show>

          <div class="flex gap-2">
            <Show when={localProps.exercise.equipment?.length}>
              {(count) => (
                <div class="flex items-center justify-center gap-0.5 text-fg-secondary self-start">
                  <BarChartIcon class="size-5" />
                  <span class="text-sm">{count()}</span>
                </div>
              )}
            </Show>
            <Show when={localProps.exercise.resources?.length}>
              {(count) => (
                <div class="flex items-center justify-center gap-0.5 text-fg-secondary self-start">
                  <LinkIcon class="size-5" />
                  <span class="text-sm">{count()}</span>
                </div>
              )}
            </Show>
          </div>
        </div>
        <ExerciseMoreDropdown exercise={localProps.exercise} class="z-1" />
      </div>
    </Polymorphic>
  );
};
