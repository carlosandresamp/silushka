import { Exercise, WorkoutExerciseGoal, WorkoutExerciseGoalType } from "@shared/db";
import Button from "@shared/ui/button";
import Stepper from "@shared/ui/stepper";

import useWorkoutStepperContext from "../model/context";

import CheckIcon from "~icons/ic/round-check";
import XIcon from "~icons/ic/round-clear";
import NoteIcon from "~icons/ic/round-edit-note";

export type WorkoutStepperExerciseNoteStepProps = {
  value: Extract<WorkoutExerciseGoal, { type: WorkoutExerciseGoalType.NOTE }>["value"];
  exercise: Exercise;
};

export const WorkoutStepperExerciseNoteStep = (props: WorkoutStepperExerciseNoteStepProps) => {
  const context = useWorkoutStepperContext();

  return (
    <Stepper.Step class="flex grow flex-col items-stretch justify-center space-y-4 text-center">
      <NoteIcon class="size-24 self-center" />

      <p class="text-2xl font-semibold">{props.value}</p>

      <div class="flex mt-3 gap-2">
        <Button
          class="flex-col"
          spacing="lg"
          variant="gray"
          appearance="destructive"
          onClick={() => context.skip(props.exercise)}
          before={<XIcon class="size-8" />}
          data-testid="skip"
          stretched
        >
          Пропустить
        </Button>

        <Button
          class="flex-col"
          spacing="lg"
          variant="gray"
          appearance="positive"
          onClick={() => context.complete(props.exercise)}
          before={<CheckIcon class="size-8" />}
          data-testid="complete"
          stretched
        >
          Выполнено
        </Button>
      </div>
    </Stepper.Step>
  );
};
