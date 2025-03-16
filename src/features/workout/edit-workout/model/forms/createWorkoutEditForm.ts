import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";

import { useCharacter } from "@entities/character";
import db from "@shared/db";

import { WorkoutEditFormSchema, WorkoutEditFormSchemaValues } from "../schemas/WorkoutEditFormSchema";

const INITIAL_VALUES: Partial<WorkoutEditFormSchemaValues> = {
  name: "Новая тренировка",
  pause: 5,
};

export const createWorkoutEditForm = (initialValues?: WorkoutEditFormSchemaValues, id?: number | undefined) => {
  const navigate = useNavigate();
  const character = useCharacter();

  const [form, { Form, Field, FieldArray }] = createForm<WorkoutEditFormSchemaValues>({
    validate: valiForm(WorkoutEditFormSchema),
    validateOn: "input",
    revalidateOn: "input",
    initialValues: initialValues ?? INITIAL_VALUES,
  });

  const submit: SubmitHandler<WorkoutEditFormSchemaValues> = async (values) => {
    const resultId = await db.workouts.put({
      id,
      name: values.name,
      pause: values.pause,
      favorite: false,
      exercises: values.exercises.map((exercise) => ({
        id: Number(exercise.id),
        goal: exercise.goal,
      })),
    });

    if (resultId !== id) {
      character.setCharacter("workoutsCreated", (prev) => prev + 1);
    }

    navigate(`/workouts/${resultId}`);
  };

  return [form, submit, { Form, Field, FieldArray }] as const;
};
