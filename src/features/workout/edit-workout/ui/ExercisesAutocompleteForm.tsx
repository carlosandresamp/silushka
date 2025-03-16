import { JSX } from "solid-js";

import { getExerciseUniqueTags } from "@entities/exercise";
import { createStoreQuery, Exercise } from "@shared/db";
import Button from "@shared/ui/button";
import Dialog from "@shared/ui/dialog";
import MultiSelect from "@shared/ui/multi-select";
import NumberField from "@shared/ui/number-field";

import { createExercisesAutocompleteForm } from "../model/forms/createExercisesAutocompleteForm";

import AutoModeIcon from "~icons/ic/round-auto-mode";

export type ExercisesAutocompleteFormProps = {
  onSubmit?: (exercises: Exercise[]) => void;
};

export const ExercisesAutocompleteForm = (props: ExercisesAutocompleteFormProps): JSX.Element => {
  const [form, submit, { Form, Field }] = createExercisesAutocompleteForm(props);

  const tags = createStoreQuery(() => getExerciseUniqueTags());

  return (
    <Dialog onInitialFocus={(e) => e.preventDefault()}>
      {(dialog) => (
        <>
          <Button as={Dialog.Trigger} spacing="sm" variant="gray" appearance="secondary" aria-label="Автоподбор">
            <AutoModeIcon class="size-5" />
          </Button>
          <Dialog.Content>
            <Form
              onSubmit={async (values, event) => {
                await submit(values, event);
                dialog.setOpen(false);
              }}
              class="space-y-4"
            >
              <Dialog.Label>Автоподбор</Dialog.Label>

              <Field name="tags" type="string[]">
                {(field, props) => (
                  <MultiSelect
                    {...props}
                    label="Теги"
                    placeholder="Выберите теги…"
                    options={tags.map((tag) => ({
                      label: tag,
                      value: tag,
                    }))}
                    value={field.value}
                    error={field.error}
                    clearable
                    required
                  />
                )}
              </Field>

              <Field name="count" type="number">
                {(field, props) => (
                  <NumberField
                    {...props}
                    label="Количество"
                    description="Укажите сколько упражнений нужно автоматически подобрать."
                    value={field.value}
                    error={field.error}
                    required
                  />
                )}
              </Field>

              <Dialog.Footer>
                <Button as={Dialog.Close} variant="gray" appearance="secondary" stretched>
                  Отмена
                </Button>
                <Button type="submit" disabled={form.invalid} loading={form.submitting} appearance="accent" stretched>
                  Готово
                </Button>
              </Dialog.Footer>
            </Form>
          </Dialog.Content>
        </>
      )}
    </Dialog>
  );
};
