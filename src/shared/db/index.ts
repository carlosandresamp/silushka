import { Exercise, ExerciseDifficulty } from "./entities/Exercise";
import {
  Workout,
  WorkoutExercise,
  WorkoutExerciseGoal,
  WorkoutExerciseGoalType,
  WorkoutSession,
  WorkoutSessionExercise,
} from "./entities/Workout";
import { createSignalQuery, createStoreQuery } from "./lib/query";
import Storage from "./storage";

export type { Exercise, Workout, WorkoutExercise, WorkoutExerciseGoal, WorkoutSession, WorkoutSessionExercise };

export { createSignalQuery, createStoreQuery, ExerciseDifficulty, WorkoutExerciseGoalType };

export default new Storage();
