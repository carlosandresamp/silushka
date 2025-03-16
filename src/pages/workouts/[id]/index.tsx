import { RouteSectionProps, useNavigate } from "@solidjs/router";
import { Show } from "solid-js";

import {
  getWorkoutExercisesWithGoal,
  getWorkoutSessions,
  WorkoutDifficultyIndicator,
  WorkoutMoreDropdown,
  WorkoutShortcuts,
} from "@entities/workout";
import db, { createSignalQuery, createStoreQuery } from "@shared/db";
import SectionCard from "@shared/ui/section-card";
import { Navigation } from "@widgets/navigation";
import { WorkoutSessions, WorkoutTimeline } from "@widgets/workout";

import RepeatIcon from "~icons/ic/round-repeat";

export default (props: RouteSectionProps) => {
  const navigate = useNavigate();

  const workout = createSignalQuery(() => db.workouts.get(Number(props.params.id)));

  return (
    <Show when={workout()}>
      {(workout) => {
        const exercises = createStoreQuery(() => getWorkoutExercisesWithGoal(workout()));
        const sessions = createStoreQuery(() => getWorkoutSessions(workout()));

        return (
          <div class="space-y-4">
            <Navigation
              label={
                <>
                  <span>{workout().name}</span>
                  <WorkoutDifficultyIndicator difficulties={exercises.map((exercise) => exercise.difficulty)} />
                </>
              }
              back="/workouts"
              after={<WorkoutMoreDropdown workout={workout()} class="ms-auto" onDelete={() => navigate("/workouts")} />}
            />

            <SectionCard
              label="Выполнений"
              icon={<RepeatIcon class="size-6.5" />}
              value={sessions.length}
              appearance="sky"
              class="w-full"
            />

            <WorkoutShortcuts workout={workout()} />

            <div class="space-y-12">
              <Show when={workout().exercises.length}>
                <section>
                  <h2 class="font-semibold text-xl">План тренировки</h2>
                  <WorkoutTimeline exercises={exercises} pause={workout().pause} />
                </section>
              </Show>

              <Show when={sessions.length}>
                <section>
                  <h2 class="font-semibold text-xl">История выполнения</h2>
                  <WorkoutSessions sessions={sessions} />
                </section>
              </Show>
            </div>
          </div>
        );
      }}
    </Show>
  );
};
