export type Workout = {
  id?: number;
  name: string;
  pause: number;
  favorite: boolean;
  exercises: WorkoutExercise[];
};

export type WorkoutExercise = {
  id: number;
  goal: WorkoutExerciseGoal;
};

export type WorkoutExerciseGoal =
  | { type: WorkoutExerciseGoalType.NOTE; value: string }
  | { type: WorkoutExerciseGoalType.TIME; value: number }
  | { type: WorkoutExerciseGoalType.WEIGHT; value: number }
  | { type: WorkoutExerciseGoalType.REPETITIONS; value: number };

export enum WorkoutExerciseGoalType {
  NOTE = "note",
  TIME = "time",
  WEIGHT = "weight",
  REPETITIONS = "repetitions",
}

export type WorkoutSession = {
  id?: number;
  workoutId?: number;
  exercises: WorkoutSessionExercise[];
  startTimestamp: number;
  endTimestamp?: number;
};

export type WorkoutSessionExercise = {
  id: number;
  coins: number;
};
