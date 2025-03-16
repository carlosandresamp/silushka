import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { For } from "solid-js";

import { WorkoutCard } from "@entities/workout";
import { Workout } from "@shared/db";

export type WorkoutListProps = {
  workouts: Workout[];
};

export const WorkoutList = (props: WorkoutListProps) => {
  const [setListRef] = createAutoAnimate();

  return (
    <ul ref={setListRef} class="divide-y divide-bg-primary">
      <For each={props.workouts}>{(workout) => <WorkoutCard as="li" workout={workout} />}</For>
    </ul>
  );
};
