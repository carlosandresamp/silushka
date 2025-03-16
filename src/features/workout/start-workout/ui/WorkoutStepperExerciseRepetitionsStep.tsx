import { useLocale } from "@kobalte/core/i18n";

import { formatRepetitionsString } from "@entities/workout";
import { Exercise, WorkoutExerciseGoal, WorkoutExerciseGoalType } from "@shared/db";
import Button from "@shared/ui/button";
import Stepper from "@shared/ui/stepper";

import useWorkoutStepperContext from "../model/context";

import CheckIcon from "~icons/ic/round-check";
import XIcon from "~icons/ic/round-clear";
import RepeatIcon from "~icons/ic/round-repeat";

export type WorkoutStepperExerciseRepetitionsStepProps = {
  value: Extract<WorkoutExerciseGoal, { type: WorkoutExerciseGoalType.REPETITIONS }>["value"];
  exercise: Exercise;
};

export const WorkoutStepperExerciseRepetitionsStep = (props: WorkoutStepperExerciseRepetitionsStepProps) => {
  const locale = useLocale();
  const context = useWorkoutStepperContext();

  return (
    <Stepper.Step class="flex grow flex-col items-stretch justify-center space-y-4 text-center">
      <RepeatIcon class="size-24 self-center" />

      <p class="text-2xl font-semibold">{formatRepetitionsString(locale.locale(), props.value)}</p>

      <div class="flex gap-2">
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
