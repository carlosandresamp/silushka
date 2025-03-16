import * as v from "valibot";

import { WorkoutExercisesSchema, WorkoutNameSchema, WorkoutPauseSchema } from "@entities/workout";

export const WorkoutEditFormSchema = v.object(
  {
    name: WorkoutNameSchema,
    pause: WorkoutPauseSchema,
    exercises: WorkoutExercisesSchema,
  },
  "Добавьте как минимум одно упражнение.",
);

export type WorkoutEditFormSchemaValues = v.InferInput<typeof WorkoutEditFormSchema>;
