import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { For } from "solid-js";

import { ExerciseCard } from "@entities/exercise";
import { Exercise } from "@shared/db";

export const ExerciseList = (props: { exercises: Exercise[] }) => {
  const [setListRef] = createAutoAnimate();

  return (
    <ul ref={setListRef} class="divide-y divide-bg-primary">
      <For each={props.exercises}>{(exercise) => <ExerciseCard as="li" exercise={exercise} />}</For>
    </ul>
  );
};
