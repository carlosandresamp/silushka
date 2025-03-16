import { createForm, SubmitHandler, valiForm } from "@modular-forms/solid";

import { getExercisesByTags } from "@entities/exercise";
import { Exercise } from "@shared/db";

import {
  ExercisesAutocompleteFormSchema,
  ExercisesAutocompleteFormSchemaValues,
} from "../schemas/ExercisesAutocompleteFormSchema";

export type CreateExercisesAutocompleteFormProps = {
  onSubmit?: (exercises: Exercise[]) => void;
};

export const INITIAL_VALUES: Partial<ExercisesAutocompleteFormSchemaValues> = {
  tags: [],
  count: 5,
};

export const createExercisesAutocompleteForm = (props: CreateExercisesAutocompleteFormProps) => {
  const [form, { Form, Field }] = createForm<ExercisesAutocompleteFormSchemaValues>({
    validate: valiForm(ExercisesAutocompleteFormSchema),
    validateOn: "input",
    revalidateOn: "input",
    initialValues: INITIAL_VALUES,
  });

  const submit: SubmitHandler<ExercisesAutocompleteFormSchemaValues> = async (values) => {
    const exercises = await getExercisesByTags(values.tags, values.count);

    props.onSubmit?.(exercises);
  };

  return [form, submit, { Form, Field }] as const;
};
