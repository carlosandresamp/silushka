import * as v from "valibot";

import { WORKOUT_EXERCISES_MAX_LENGTH, WORKOUT_EXERCISES_MIN_LENGTH } from "@entities/workout";

export const ExercisesAutocompleteFormTagsSchema = v.config(
  v.pipe(v.array(v.string()), v.excludes(""), v.minLength(1)),
  { message: "Выберите как минимум один тег." },
);

export const ExercisesAutocompleteFormNumberSchema = v.pipe(
  v.number(),
  v.minValue(WORKOUT_EXERCISES_MIN_LENGTH, "Указано слишком маленькое количество упражнений."),
  v.maxValue(WORKOUT_EXERCISES_MAX_LENGTH, "Указано слишком большое количество упражнений."),
);

export const ExercisesAutocompleteFormSchema = v.object({
  tags: ExercisesAutocompleteFormTagsSchema,
  count: ExercisesAutocompleteFormNumberSchema,
});

export type ExercisesAutocompleteFormSchemaValues = v.InferInput<typeof ExercisesAutocompleteFormSchema>;
