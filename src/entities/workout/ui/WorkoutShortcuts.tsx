import { A, useNavigate } from "@solidjs/router";

import { Workout } from "@shared/db";
import Button from "@shared/ui/button";

import { deleteWorkout } from "../model/db";

import DeleteIcon from "~icons/ic/round-delete";
import EditIcon from "~icons/ic/round-mode-edit";
import PlayIcon from "~icons/ic/round-play-circle";

export type WorkoutShortcutsProps = {
  workout: Workout;
};

export const WorkoutShortcuts = (props: WorkoutShortcutsProps) => {
  const navigate = useNavigate();

  return (
    <section class="grid grid-cols-3 gap-4">
      <Button
        before={<DeleteIcon class="size-8" />}
        class="flex-col"
        variant="gray"
        appearance="destructive"
        onClick={() => {
          deleteWorkout(props.workout.id);
          navigate("/workouts");
        }}
        stretched
      >
        Удалить
      </Button>
      <Button
        as={A}
        href={`/workouts/${props.workout.id}/edit`}
        class="flex-col"
        variant="gray"
        draggable={false}
        appearance="primary"
        before={<EditIcon class="size-8" />}
        stretched
      >
        Изменить
      </Button>
      <Button
        as={A}
        href={`/workouts/${props.workout.id}/start`}
        before={<PlayIcon class="size-8" />}
        class="flex-col"
        variant="gray"
        draggable={false}
        appearance="positive"
        data-testid="start-workout"
        stretched
        shimmer
      >
        Начать
      </Button>
    </section>
  );
};
