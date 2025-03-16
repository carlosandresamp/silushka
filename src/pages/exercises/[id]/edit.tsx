import { RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";

import { ExerciseEditForm } from "@features/exercise";
import db, { createSignalQuery } from "@shared/db";
import { Navigation } from "@widgets/navigation";

export default (props: RouteSectionProps) => {
  const exercise = createSignalQuery(() => db.exercises.get(Number(props.params.id)));

  return (
    <Show when={exercise()}>
      {(exercise) => (
        <div class="space-y-6">
          <Navigation label="Редактирование упражнения" back={`/exercises/${exercise().id}`} />

          <ExerciseEditForm initialValues={exercise()} id={exercise().id} />
        </div>
      )}
    </Show>
  );
};
