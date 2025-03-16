import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { A } from "@solidjs/router";
import { createMemo, Show, splitProps, ValidComponent } from "solid-js";

import { getExercisesCost } from "@entities/shop/model";
import { createStoreQuery, Workout } from "@shared/db";
import Button from "@shared/ui/button";
import Number from "@shared/ui/number";

import { WorkoutDifficultyIndicator } from "./WorkoutDifficultyIndicator";
import { getWorkoutExercises } from "../model/db";

import PauseIcon from "~icons/ic/round-motion-photos-pause";
import PlayIcon from "~icons/ic/round-play-arrow";
import ExercisesIcon from "~icons/ic/round-school";
import StarIcon from "~icons/ic/round-star";

export type WorkoutCardOptions = {
  workout: Workout;
};

export type WorkoutCardProps = WorkoutCardOptions;

export const WorkoutCard = <T extends ValidComponent = "div">(props: PolymorphicProps<T, WorkoutCardProps>) => {
  const [localProps, otherProps] = splitProps(props as WorkoutCardProps, ["workout"]);
  const exercises = createStoreQuery(() => getWorkoutExercises(props.workout));
  const cost = createMemo(() => getExercisesCost(exercises.filter((exercise) => exercise !== undefined)));

  return (
    <Polymorphic as="div" class="py-2" {...otherProps}>
      <div class="relative flex gap-2 w-full items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-bg-primary active:opacity-75 active:transition-none">
        <div class="space-y-1.5 grow">
          <A
            href={`/workouts/${localProps.workout.id}`}
            draggable={false}
            class="text-lg font-semibold flex items-center gap-1 before:inset-0 before:absolute"
          >
            {localProps.workout.name}
            <Show when={exercises.filter((exercise) => exercise !== undefined)}>
              {(exercises) => (
                <WorkoutDifficultyIndicator difficulties={exercises().map((exercise) => exercise.difficulty)} />
              )}
            </Show>
          </A>
          <div class="flex gap-2">
            <div class="flex items-center justify-center gap-0.5 text-fg-secondary self-start">
              <PauseIcon class="size-5" />
              <Number
                options={{
                  style: "unit",
                  unit: "minute",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }}
                class="text-sm"
              >
                {localProps.workout.pause}
              </Number>
            </div>
            <Show when={localProps.workout.exercises}>
              <div class="flex items-center justify-center gap-0.5 text-fg-secondary self-start">
                <ExercisesIcon class="size-5" />
                <span class="text-sm">{localProps.workout.exercises.length}</span>
              </div>
              <div class="flex items-center justify-center gap-0.5 text-fg-secondary self-start">
                <StarIcon class="size-5 text-amber-600" />
                <span class="text-sm">{cost()}</span>
              </div>
            </Show>
          </div>
        </div>
        <Button
          as={A}
          href={`/workouts/${localProps.workout.id}/start`}
          size="lg"
          shape="circle"
          spacing="xs"
          variant="gray"
          draggable={false}
          appearance="positive"
          aria-label="Начать тренировку"
          class="flex z-1"
        >
          <PlayIcon class="size-10" />
        </Button>
      </div>
    </Polymorphic>
  );
};
