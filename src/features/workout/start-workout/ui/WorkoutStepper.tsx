import { createEffect, For, Show } from "solid-js";

import db, { createSignalQuery, Exercise, Workout } from "@shared/db";
import Stepper from "@shared/ui/stepper";

import { WorkoutStepperExerciseStep } from "./WorkoutStepperExerciseStep";
import { WorkoutStepperFinishStep } from "./WorkoutStepperFinishStep";
import { WorkoutStepperPauseStep } from "./WorkoutStepperPauseStep";
import { createWorkoutStepperContextValue, WorkoutStepperContext } from "../model/context";

export type WorkoutStepperProps = {
  workout: Workout;
  onExerciseChange?: (exercise: Exercise | null) => void;
};

export const WorkoutStepper = (props: WorkoutStepperProps) => {
  return (
    <Stepper>
      {(stepper) => {
        const context = createWorkoutStepperContextValue(props.workout);

        return (
          <WorkoutStepperContext.Provider value={context}>
            <Stepper.Steps class="mx-auto flex size-full max-w-sm grow items-stretch justify-center">
              <For each={props.workout.exercises}>
                {({ id, goal }, index) => {
                  const exercise = createSignalQuery(() => db.exercises.get(Number(id)));

                  return (
                    <Show when={exercise()}>
                      {(exercise) => {
                        createEffect(() => {
                          const item = context.plan[stepper.currentIndex];

                          if (item?.id === id) {
                            props.onExerciseChange?.(exercise());
                          } else if (item === null) {
                            props.onExerciseChange?.(null);
                          }
                        });

                        return (
                          <>
                            <WorkoutStepperExerciseStep exercise={exercise()} goal={goal} />
                            <Show
                              when={index() < props.workout.exercises.length - 1}
                              fallback={<WorkoutStepperFinishStep />}
                            >
                              <WorkoutStepperPauseStep pause={props.workout.pause} />
                            </Show>
                          </>
                        );
                      }}
                    </Show>
                  );
                }}
              </For>
            </Stepper.Steps>
          </WorkoutStepperContext.Provider>
        );
      }}
    </Stepper>
  );
};
