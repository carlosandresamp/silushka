import { Exercise, WorkoutExerciseGoal, WorkoutExerciseGoalType } from "@shared/db";
import Button from "@shared/ui/button";
import Number from "@shared/ui/number";
import Stepper from "@shared/ui/stepper";

import useWorkoutStepperContext from "../model/context";

import CheckIcon from "~icons/ic/round-check";
import XIcon from "~icons/ic/round-clear";
import FitnessCenterIcon from "~icons/ic/round-fitness-center";

export type WorkoutStepperExerciseWeightStepProps = {
  value: Extract<WorkoutExerciseGoal, { type: WorkoutExerciseGoalType.WEIGHT }>["value"];
  exercise: Exercise;
};

export const WorkoutStepperExerciseWeightStep = (props: WorkoutStepperExerciseWeightStepProps) => {
  const context = useWorkoutStepperContext();

  return (
    <Stepper.Step class="flex grow flex-col items-stretch justify-center space-y-4 text-center">
      <FitnessCenterIcon class="size-24 self-center" />

      <Number
        class="text-2xl font-semibold"
        options={{
          style: "unit",
          unit: "kilogram",
        }}
      >
        {props.value}
      </Number>

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
