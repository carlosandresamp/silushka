import { Match, Switch } from "solid-js";

import { Exercise, WorkoutExercise, WorkoutExerciseGoalType } from "@shared/db";

import { WorkoutStepperExerciseNoteStep } from "./WorkoutStepperExerciseNoteStep";
import { WorkoutStepperExerciseRepetitionsStep } from "./WorkoutStepperExerciseRepetitionsStep";
import { WorkoutStepperExerciseTimeStep } from "./WorkoutStepperExerciseTimeStep";
import { WorkoutStepperExerciseWeightStep } from "./WorkoutStepperExerciseWeightStep";

export type WorkoutStepperExerciseStepProps = {
  exercise: Exercise;
  goal: WorkoutExercise["goal"];
};

export const WorkoutStepperExerciseStep = (props: WorkoutStepperExerciseStepProps) => {
  return (
    <Switch>
      <Match when={props.goal.type === WorkoutExerciseGoalType.NOTE}>
        <WorkoutStepperExerciseNoteStep exercise={props.exercise} value={props.goal.value as string} />
      </Match>
      <Match when={props.goal.type === WorkoutExerciseGoalType.TIME}>
        <WorkoutStepperExerciseTimeStep exercise={props.exercise} value={props.goal.value as number} />
      </Match>
      <Match when={props.goal.type === WorkoutExerciseGoalType.REPETITIONS}>
        <WorkoutStepperExerciseRepetitionsStep exercise={props.exercise} value={props.goal.value as number} />
      </Match>
      <Match when={props.goal.type === WorkoutExerciseGoalType.WEIGHT}>
        <WorkoutStepperExerciseWeightStep exercise={props.exercise} value={props.goal.value as number} />
      </Match>
    </Switch>
  );
};
