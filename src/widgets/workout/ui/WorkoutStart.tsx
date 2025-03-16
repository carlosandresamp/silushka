import { createSignal, Show } from "solid-js";

import { ExerciseDifficultyIndicator, ExerciseMoreDialog } from "@entities/exercise";
import { WorkoutStepper } from "@features/workout";
import { Exercise, Workout } from "@shared/db";
import { Navigation } from "@widgets/navigation";

export const WorkoutStart = (props: { workout: Workout }) => {
  const [exercise, setExercise] = createSignal<Exercise | null>(null);

  return (
    <div class="flex size-full grow flex-col space-y-4 overflow-x-visible overflow-y-clip">
      <Navigation
        back={props.workout.id !== undefined ? `/workouts/${props.workout.id}` : undefined}
        label={
          <Show when={exercise()} fallback={props.workout.name}>
            {(exercise) => (
              <>
                <span>{exercise().name}</span>
                <ExerciseDifficultyIndicator difficulty={exercise().difficulty} />
              </>
            )}
          </Show>
        }
        after={<Show when={exercise()}>{(exercise) => <ExerciseMoreDialog exercise={exercise()} />}</Show>}
      />

      <WorkoutStepper workout={props.workout} onExerciseChange={setExercise} />
    </div>
  );
};
