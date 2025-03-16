import * as v from "valibot";

import {
  ExerciseDescriptionSchema,
  ExerciseDifficultySchema,
  ExerciseEquipmentsSchema,
  ExerciseNameSchema,
  ExerciseResourcesSchema,
  ExerciseTagsSchema,
} from "@entities/exercise";

export const ExerciseEditFormSchema = v.object({
  name: ExerciseNameSchema,
  difficulty: ExerciseDifficultySchema,
  description: ExerciseDescriptionSchema,
  tags: ExerciseTagsSchema,
  equipment: ExerciseEquipmentsSchema,
  resources: ExerciseResourcesSchema,
});

export type ExerciseEditFormValues = v.InferInput<typeof ExerciseEditFormSchema>;
