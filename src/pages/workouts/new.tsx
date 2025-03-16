import { createSignal, Show } from "solid-js";

import { WorkoutEditForm } from "@features/workout";
import { Workout } from "@shared/db";
import { Navigation } from "@widgets/navigation";
import { WorkoutStart } from "@widgets/workout";

export default () => {
  const [values, setValues] = createSignal<Workout | null>(null);

  return (
    <Show when={values() === null} fallback={<WorkoutStart workout={values()!} />}>
      <div class="space-y-6">
        <Navigation label="Новая тренировка" back="/workouts" />

        <WorkoutEditForm onStart={setValues} />
      </div>
    </Show>
  );
};
