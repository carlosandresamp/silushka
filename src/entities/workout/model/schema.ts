import * as v from "valibot";

import { WorkoutExerciseGoalType } from "@shared/db";

import {
  WORKOUT_EXERCISE_REPETITIONS_MAX_VALUE,
  WORKOUT_EXERCISE_REPETITIONS_MIN_VALUE,
  WORKOUT_EXERCISE_TIME_MAX_VALUE,
  WORKOUT_EXERCISE_TIME_MIN_VALUE,
  WORKOUT_EXERCISE_WEIGHT_MAX_VALUE,
  WORKOUT_EXERCISE_WEIGHT_MIN_VALUE,
  WORKOUT_EXERCISES_MAX_LENGTH,
  WORKOUT_EXERCISES_MIN_LENGTH,
  WORKOUT_NAME_MAX_LENGTH,
  WORKOUT_NAME_MIN_LENGTH,
  WORKOUT_PAUSE_MAX_VALUE,
  WORKOUT_PAUSE_MIN_VALUE,
} from "../config";

export const WorkoutNameSchema = v.pipe(
  v.string(),
  v.nonEmpty("Имя тренировки не должно быть пустым."),
  v.minLength(WORKOUT_NAME_MIN_LENGTH, "Указано слишком короткое имя тренировки."),
  v.maxLength(WORKOUT_NAME_MAX_LENGTH, "Указано слишком длинное имя тренировки."),
  v.trim(),
);

export const WorkoutPauseSchema = v.pipe(
  v.number(),
  v.minValue(WORKOUT_PAUSE_MIN_VALUE, "Указано слишком маленькое время для паузы."),
  v.maxValue(WORKOUT_PAUSE_MAX_VALUE, "Указано слишком большое время для паузы."),
);

export const WorkoutExerciseGoalNoteSchema = v.pipe(
  v.string(),
  v.nonEmpty("Заметка не должна быть пустой."),
  v.minLength(WORKOUT_NAME_MIN_LENGTH, "Указана слишком короткая заметка."),
  v.maxLength(WORKOUT_NAME_MAX_LENGTH, "Указана слишком длинная заметка."),
);

export const WorkoutExerciseGoalTimeSchema = v.pipe(
  v.number("Время выполнения упражнения не может быть пустым."),
  v.minValue(WORKOUT_EXERCISE_TIME_MIN_VALUE, "Указано слишком маленькое время выполнения."),
  v.maxValue(WORKOUT_EXERCISE_TIME_MAX_VALUE, "Указано слишком большое время выполнения."),
);

export const WorkoutExerciseGoalRepetitionsSchema = v.pipe(
  v.number("Число повторений не должно быть пустым."),
  v.minValue(WORKOUT_EXERCISE_REPETITIONS_MIN_VALUE, "Указано слишком маленькое число повторений."),
  v.maxValue(WORKOUT_EXERCISE_REPETITIONS_MAX_VALUE, "Указано слишком большое число повторений."),
);

export const WorkoutExerciseGoalWeightSchema = v.pipe(
  v.number("Вес не может быть пустым."),
  v.minValue(WORKOUT_EXERCISE_WEIGHT_MIN_VALUE, "Указан слишком маленький вес."),
  v.maxValue(WORKOUT_EXERCISE_WEIGHT_MAX_VALUE, "Указан слишком большой вес."),
);

export const WorkoutExerciseSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty("Упражнение не может быть пустым.")),
  goal: v.variant("type", [
    v.object({
      type: v.literal(WorkoutExerciseGoalType.NOTE),
      value: WorkoutExerciseGoalNoteSchema,
    }),
    v.object({
      type: v.literal(WorkoutExerciseGoalType.TIME),
      value: WorkoutExerciseGoalTimeSchema,
    }),
    v.object({
      type: v.literal(WorkoutExerciseGoalType.WEIGHT),
      value: WorkoutExerciseGoalWeightSchema,
    }),
    v.object({
      type: v.literal(WorkoutExerciseGoalType.REPETITIONS),
      value: WorkoutExerciseGoalRepetitionsSchema,
    }),
  ]),
});

export const WorkoutExercisesSchema = v.config(
  v.nonOptional(
    v.pipe(
      v.array(WorkoutExerciseSchema),
      v.minLength(WORKOUT_EXERCISES_MIN_LENGTH, "Указано слишком маленькое количество упражнений."),
      v.maxLength(WORKOUT_EXERCISES_MAX_LENGTH, "Указано слишком большое количество упражнений."),
    ),
  ),
  {
    message: "Добавьте как минимум одно упражнение.",
  },
);
