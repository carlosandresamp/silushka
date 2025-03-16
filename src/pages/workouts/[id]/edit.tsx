import { RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";

import { WorkoutEditForm } from "@features/workout";
import db, { createSignalQuery } from "@shared/db";
import { Navigation } from "@widgets/navigation";

export default (props: RouteSectionProps) => {
  const exercise = createSignalQuery(() => db.workouts.get(Number(props.params.id)));

  return (
    <Show when={exercise()}>
      {(workout) => (
        <div class="space-y-6">
          <Navigation label="Редактирование тренировки" back={`/workouts/${props.params.id}`} />

          <WorkoutEditForm
            initialValues={{
              name: workout().name,
              pause: workout().pause,
              exercises: workout().exercises.map((exercise) => ({
                id: String(exercise.id),
                goal: exercise.goal,
              })),
            }}
            id={workout().id}
          />
        </div>
      )}
    </Show>
  );
};
