import { RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";

import db, { createSignalQuery } from "@shared/db";
import { WorkoutStart } from "@widgets/workout";

export default (props: RouteSectionProps) => {
  const workout = createSignalQuery(() => db.workouts.get(Number(props.params.id)));

  return <Show when={workout()}>{(workout) => <WorkoutStart workout={workout()} />}</Show>;
};
