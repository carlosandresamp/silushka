import { Exercise, ExerciseDifficulty } from "@shared/db";

export const EXERCISE_DIFFICULTY_COSTS: Record<ExerciseDifficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export const getExerciseCost = (exercise: Exercise) => {
  return EXERCISE_DIFFICULTY_COSTS[exercise.difficulty];
};

export const getExercisesCost = (exercises: Exercise[]) => {
  return exercises.reduce((sum, exercise) => sum + getExerciseCost(exercise), 0);
};
