import { createForm, setResponse, SubmitHandler, valiForm } from "@modular-forms/solid";

import { useCharacter } from "@entities/character";

import { EditCharacterFormValues, EditCharacterSchema } from "./schema";

export const createEditCharacterForm = (initialValues?: EditCharacterFormValues) => {
  const character = useCharacter();

  const [form, { Form, Field, FieldArray }] = createForm<EditCharacterFormValues>({
    validate: valiForm(EditCharacterSchema),
    validateOn: "submit",
    revalidateOn: "input",
    initialValues: initialValues ?? character.character,
  });

  const submit: SubmitHandler<EditCharacterFormValues> = (values) => {
    try {
      character.setCharacter({ ...character.character, ...values });
      if (character.character.name) {
        setResponse(form, { status: "success", message: "Персонаж успешно обновлён!" });
      }
    } catch {
      setResponse(form, { status: "error", message: "Ошибка при обновлении персонажа. Попробуйте почистить кеш." });
    }
  };

  return [form, submit, { Form, Field, FieldArray }] as const;
};
