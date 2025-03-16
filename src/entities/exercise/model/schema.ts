import * as v from "valibot";

import { ExerciseDifficulty } from "@shared/db";

import {
  EXERCISE_DESCRIPTION_MAX_LENGTH,
  EXERCISE_EQUIPMENT_MAX_LENGTH,
  EXERCISE_EQUIPMENT_MIN_LENGTH,
  EXERCISE_NAME_MAX_LENGTH,
  EXERCISE_NAME_MIN_LENGTH,
  EXERCISE_TAG_MAX_LENGTH,
  EXERCISE_TAG_MIN_LENGTH,
} from "../config";

export const ExerciseNameSchema = v.pipe(
  v.string(),
  v.nonEmpty("Название упражнения не должно быть пустым."),
  v.minLength(EXERCISE_NAME_MIN_LENGTH, "Указано слишком короткое название упражнения."),
  v.maxLength(EXERCISE_NAME_MAX_LENGTH, "Указано слишком длинное название упражнения"),
  v.trim(),
);

export const ExerciseDifficultySchema = v.pipe(v.enum(ExerciseDifficulty, "Сложность не должна быть пустой."));

export const ExerciseDescriptionSchema = v.optional(
  v.pipe(v.string(), v.maxLength(EXERCISE_DESCRIPTION_MAX_LENGTH, "Указано слишком длинное описание упражнения.")),
);

export const ExerciseTagSchema = v.pipe(
  v.string(),
  v.nonEmpty("Название тега не должно быть пустым."),
  v.minLength(EXERCISE_TAG_MIN_LENGTH, "Указано слишком короткое название тега."),
  v.maxLength(EXERCISE_TAG_MAX_LENGTH, "Указано слишком длинное название тега."),
  v.trim(),
);

export const ExerciseTagsSchema = v.optional(v.pipe(v.array(ExerciseTagSchema)));

export const ExerciseEquipmentSchema = v.pipe(
  v.string(),
  v.nonEmpty("Название оборудования не должно быть пустым."),
  v.minLength(EXERCISE_EQUIPMENT_MIN_LENGTH, "Указано слишком короткое название оборудования."),
  v.maxLength(EXERCISE_EQUIPMENT_MAX_LENGTH, "Указано слишком длинное название оборудования."),
  v.trim(),
);

export const ExerciseEquipmentsSchema = v.optional(v.pipe(v.array(ExerciseEquipmentSchema)));

export const ExerciseResourceSchema = v.pipe(
  v.string(),
  v.nonEmpty("Ресурс не должен быть пустым."),
  v.url("Ресурс должен быть ссылкой"),
  v.minLength(EXERCISE_EQUIPMENT_MIN_LENGTH, "Указана слишком короткая ссылка для ресурса."),
  v.maxLength(EXERCISE_EQUIPMENT_MAX_LENGTH, "Указана слишком длинная ссылка для ресурса."),
  v.trim(),
);

export const ExerciseResourcesSchema = v.optional(v.pipe(v.array(ExerciseResourceSchema)));
