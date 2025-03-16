import { useLocale } from "@kobalte/core/i18n";
import { A } from "@solidjs/router";
import { For, JSX, Match, Show, Switch } from "solid-js";

import { ExerciseDifficultyIndicator } from "@entities/exercise";
import { getExerciseCost } from "@entities/shop";
import { formatRepetitionsString } from "@entities/workout";
import { Exercise, WorkoutExerciseGoal, WorkoutExerciseGoalType } from "@shared/db";
import NumberComponent from "@shared/ui/number";
import SparklesText from "@shared/ui/sparkles-text";
import Timeline from "@shared/ui/timeline";

import PauseIcon from "~icons/ic/round-pause";
import ExerciseIcon from "~icons/ic/round-school";
import StarIcon from "~icons/ic/round-star";

export type WorkoutTimelineProps = {
  exercises: (Exercise & { goal: WorkoutExerciseGoal })[];
  pause: number;
};

export const WorkoutTimeline = (props: WorkoutTimelineProps): JSX.Element => {
  const locale = useLocale();

  return (
    <Timeline>
      <For each={props.exercises}>
        {(exercise, index) => (
          <>
            <Timeline.Item>
              <Timeline.ItemIcon appearance="sky">
                <ExerciseIcon class="size-4" />
              </Timeline.ItemIcon>
              <hgroup class="flex flex-col">
                <A href={`/exercises/${exercise.id}`} class="font-medium w-full flex gap-1">
                  {exercise.name}
                  <ExerciseDifficultyIndicator difficulty={exercise.difficulty} />
                </A>
                <Switch>
                  <Match when={exercise.goal.type === WorkoutExerciseGoalType.NOTE}>
                    <span class="text-sm text-fg-tertiary">{exercise.goal.value}</span>
                  </Match>
                  <Match when={exercise.goal.type === WorkoutExerciseGoalType.TIME}>
                    <NumberComponent
                      options={{
                        style: "unit",
                        unit: "minute",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      class="text-sm text-fg-tertiary"
                    >
                      {exercise.goal.value as number}
                    </NumberComponent>
                  </Match>
                  <Match when={exercise.goal.type === WorkoutExerciseGoalType.REPETITIONS}>
                    <span class="text-sm text-fg-tertiary">
                      {formatRepetitionsString(locale.locale(), exercise.goal.value as number)}
                    </span>
                  </Match>
                  <Match when={exercise.goal.type === WorkoutExerciseGoalType.WEIGHT}>
                    <NumberComponent
                      options={{
                        style: "unit",
                        unit: "kilogram",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }}
                      class="text-sm text-fg-tertiary"
                    >
                      {exercise.goal.value as number}
                    </NumberComponent>
                  </Match>
                </Switch>
              </hgroup>
            </Timeline.Item>
            <Timeline.Item>
              <Timeline.ItemIcon appearance="amber">
                <StarIcon class="size-4" />
              </Timeline.ItemIcon>
              <SparklesText>
                <span class="font-semibold">{getExerciseCost(exercise)}</span>{" "}
                <span class="text-fg-secondary">монет</span>
              </SparklesText>
            </Timeline.Item>
            <Show when={index() < props.exercises.length - 1}>
              <Timeline.Item>
                <Timeline.ItemIcon appearance="gray">
                  <PauseIcon class="size-4" />
                </Timeline.ItemIcon>

                <NumberComponent
                  options={{
                    style: "unit",
                    unit: "minute",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }}
                  class="text-fg-secondary"
                >
                  {props.pause}
                </NumberComponent>
              </Timeline.Item>
            </Show>
          </>
        )}
      </For>
    </Timeline>
  );
};
