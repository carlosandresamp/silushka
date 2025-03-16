import { A, useNavigate } from "@solidjs/router";

import { Exercise } from "@shared/db";
import Button from "@shared/ui/button";

import { deleteExercise } from "../model/db";

import DeleteIcon from "~icons/ic/round-delete";
import EditIcon from "~icons/ic/round-mode-edit";

export type ExerciseShortcutsProps = {
  exercise: Exercise;
};

export const ExerciseShortcuts = (props: ExerciseShortcutsProps) => {
  const navigate = useNavigate();

  return (
    <section class="my-3 grid grid-cols-2 gap-4">
      <Button
        before={<DeleteIcon class="size-8" />}
        class="flex-col"
        variant="gray"
        appearance="destructive"
        onClick={() => {
          deleteExercise(props.exercise.id);
          navigate("/exercises");
        }}
        stretched
      >
        Удалить
      </Button>
      <Button
        as={A}
        href={`/exercises/${props.exercise.id}/edit`}
        class="flex-col"
        variant="gray"
        draggable={false}
        appearance="primary"
        before={<EditIcon class="size-8" />}
        stretched
      >
        Изменить
      </Button>
    </section>
  );
};
