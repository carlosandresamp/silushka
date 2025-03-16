import { Show } from "solid-js";

import { Exercise, WorkoutExerciseGoal, WorkoutExerciseGoalType } from "@shared/db";
import Button from "@shared/ui/button";
import Collapse from "@shared/ui/collapse";
import Stepper from "@shared/ui/stepper";
import Timer from "@shared/ui/timer";

import useWorkoutStepperContext from "../model/context";

import PauseIcon from "~icons/ic/round-pause";
import PlayIcon from "~icons/ic/round-play-arrow";

export type WorkoutStepperExerciseTimeStepProps = {
  value: Extract<WorkoutExerciseGoal, { type: WorkoutExerciseGoalType.TIME }>["value"];
  exercise: Exercise;
};

export const WorkoutStepperExerciseTimeStep = (props: WorkoutStepperExerciseTimeStepProps) => {
  const context = useWorkoutStepperContext();

  return (
    <Stepper.Step class="flex grow flex-col items-center justify-center space-y-4 text-center">
      <Timer seconds={props.value * 60}>
        {(timer) => (
          <>
            <Timer.Time class="text-6xl font-semibold" />

            <Timer.Toggle
              as={Button}
              size="lg"
              shape="circle"
              spacing="xs"
              variant="gray"
              appearance="positive"
              class="mb-4"
              shimmer={timer.paused}
              aria-label={timer.paused ? "Продолжить" : "Приостановить"}
            >
              <Show when={timer.paused} fallback={<PauseIcon class="size-14" />}>
                <PlayIcon class="size-14" />
              </Show>
            </Timer.Toggle>

            <Collapse>
              <Show when={timer.paused || timer.ended}>
                <Button
                  spacing="lg"
                  class="self-center"
                  appearance={timer.ended ? "accent" : "tertiary"}
                  variant={timer.ended ? "fill" : "ghost"}
                  shimmer={timer.ended}
                  data-testid={timer.ended ? "complete" : "skip"}
                  onClick={() => (timer.ended ? context.complete(props.exercise) : context.skip(props.exercise))}
                >
                  {timer.ended ? "Продолжить" : "Пропустить"}
                </Button>
              </Show>
            </Collapse>
          </>
        )}
      </Timer>
    </Stepper.Step>
  );
};
