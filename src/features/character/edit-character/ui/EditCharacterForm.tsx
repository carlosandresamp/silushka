import { Show } from "solid-js";

import {
  CHARACTER_GOAL_MAX_VALUE,
  CHARACTER_GOAL_MIN_VALUE,
  CHARACTER_HEIGHT_MAX_VALUE,
  CHARACTER_HEIGHT_MIN_VALUE,
  CHARACTER_WEIGHT_MAX_VALUE,
  CHARACTER_WEIGHT_MIN_VALUE,
  useCharacter,
} from "@entities/character";
import Button from "@shared/ui/button";
import DateField from "@shared/ui/date-field";
import FormResponse from "@shared/ui/form-response";
import NumberField from "@shared/ui/number-field";
import TextField from "@shared/ui/text-field";

import { createEditCharacterForm } from "../model/form";

export const EditCharacterForm = () => {
  const now = new Date();

  const character = useCharacter();

  const [form, submit, { Form, Field }] = createEditCharacterForm();

  return (
    <Form onSubmit={submit} class="flex flex-col space-y-2">
      <Field name="name">
        {(field, props) => (
          <TextField
            {...props}
            type="text"
            label="Имя"
            placeholder="Введите своё имя…"
            autocomplete="given-name"
            value={field.value}
            error={field.error}
            required
            clearable
          />
        )}
      </Field>

      <Field name="weight">
        {(field, props) => (
          <NumberField
            {...props}
            label="Вес"
            placeholder="Введите свой вес…"
            value={field.value}
            error={field.error}
            formatOptions={{
              style: "unit",
              unit: "kilogram",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }}
            minValue={CHARACTER_WEIGHT_MIN_VALUE}
            maxValue={CHARACTER_WEIGHT_MAX_VALUE}
            required
          />
        )}
      </Field>

      <Field name="height">
        {(field, props) => (
          <NumberField
            {...props}
            label="Рост"
            placeholder="Введите свой рост…"
            value={field.value}
            error={field.error}
            formatOptions={{
              style: "unit",
              unit: "centimeter",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }}
            minValue={CHARACTER_HEIGHT_MIN_VALUE}
            maxValue={CHARACTER_HEIGHT_MAX_VALUE}
            required
          />
        )}
      </Field>

      <Field name="birthday">
        {(field, props) => (
          <DateField
            {...props}
            label="Дата рождения"
            placeholder="Введите свою дату рождения…"
            value={field.value}
            error={field.error}
            options={{ disabled: (date) => now.valueOf() < date.valueOf() }}
            autocomplete="bday"
            clearable
            required
          />
        )}
      </Field>

      <Field name="goal" type="number">
        {(field, props) => (
          <NumberField
            {...props}
            label="Цель тренировок"
            placeholder="Введите цель тренировок…"
            description="Укажите количество тренировок в неделю."
            value={field.value}
            error={field.error}
            minValue={CHARACTER_GOAL_MIN_VALUE}
            maxValue={CHARACTER_GOAL_MAX_VALUE}
            required
          />
        )}
      </Field>

      <FormResponse of={form} />

      <Show
        when={character.character.name}
        fallback={
          <Button
            type="submit"
            appearance="feature"
            loading={form.submitting}
            disabled={form.invalid}
            class="mt-2"
            stretched
            shimmer
          >
            Начать
          </Button>
        }
      >
        <Button
          type="submit"
          spacing="lg"
          appearance="accent"
          loading={form.submitting}
          disabled={form.invalid}
          class="self-end mt-2"
        >
          Сохранить
        </Button>
      </Show>
    </Form>
  );
};
