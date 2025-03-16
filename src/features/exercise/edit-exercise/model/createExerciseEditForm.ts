import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";
import { useNavigate } from "@solidjs/router";

import { useCharacter } from "@entities/character";
import db, { ExerciseDifficulty } from "@shared/db";

import { ExerciseEditFormValues, ExerciseEditFormSchema } from "./ExerciseEditFormSchema";

const INITIAL_VALUES: Partial<ExerciseEditFormValues> = {
  name: "Новое упражнение",
  description: "",
  difficulty: ExerciseDifficulty.EASY,
};

export const createExerciseEditForm = (initialValues?: ExerciseEditFormValues, id?: number | undefined) => {
  const navigate = useNavigate();
  const character = useCharacter();

  const [form, { Form, Field, FieldArray }] = createForm<ExerciseEditFormValues>({
    validate: valiForm(ExerciseEditFormSchema),
    validateOn: "submit",
    revalidateOn: "input",
    initialValues: initialValues ?? INITIAL_VALUES,
  });

  const submit: SubmitHandler<ExerciseEditFormValues> = async (values) => {
    const resultId = await db.exercises.put({ id, ...values });

    if (resultId !== id) {
      character.setCharacter("exercisesCreated", (prev) => prev + 1);
    }

    navigate(`/exercises/${resultId}`);
  };

  return [form, submit, { Form, Field, FieldArray }] as const;
};
