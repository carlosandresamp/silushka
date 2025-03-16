import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { focus, insert, remove, reset } from "@modular-forms/solid";
import { For } from "solid-js";

import { getExerciseDifficultyDisplayName } from "@entities/exercise";
import { ExerciseDifficulty } from "@shared/db";
import easing from "@shared/lib/easing";
import Button from "@shared/ui/button";
import FormResponse from "@shared/ui/form-response";
import Select from "@shared/ui/select";
import Separator from "@shared/ui/separator";
import TextField, { styles } from "@shared/ui/text-field";

import { ExerciseEditFormValues } from "../model/ExerciseEditFormSchema";
import { createExerciseEditForm } from "../model/createExerciseEditForm";

import AddLinkIcon from "~icons/ic/round-add-link";
import BarChartIcon from "~icons/ic/round-bar-chart";
import DeleteIcon from "~icons/ic/round-delete-outline";
import LinkIcon from "~icons/ic/round-link";
import PlusIcon from "~icons/ic/round-plus";
import ScaleIcon from "~icons/ic/round-scale";
import TagIcon from "~icons/ic/round-tag";

export type ExerciseEditFormProps = {
  initialValues?: ExerciseEditFormValues;
  id?: number | undefined;
};

export const ExerciseEditForm = (props: ExerciseEditFormProps) => {
  const [form, submit, { Form, Field, FieldArray }] = createExerciseEditForm(props.initialValues, props.id);

  return (
    <Form onSubmit={submit} class="flex flex-col space-y-4">
      <Field name="name">
        {(field, props) => (
          <TextField
            {...props}
            type="text"
            label="Название"
            placeholder="Введите название упражнения…"
            value={field.value}
            error={field.error}
            autocomplete="name"
            required
            clearable
          />
        )}
      </Field>

      <Field name="difficulty">
        {(field, props) => (
          <Select
            {...props}
            label="Сложность"
            placeholder="Выберите сложность упражнения…"
            before={<ScaleIcon class="ms-1 -me-1.5 size-5 text-fg-tertiary" />}
            options={Object.values(ExerciseDifficulty).map((difficulty) => ({
              value: difficulty,
              label: getExerciseDifficultyDisplayName(difficulty),
            }))}
            value={field.value}
            error={field.error}
            disallowEmptySelection
            required
          />
        )}
      </Field>

      <Field name="description">
        {(field, props) => (
          <TextField
            {...props}
            type="text"
            label="Описание"
            placeholder="Введите описание упражнения…"
            description="Вы можете добавить инструкцию в виде текста."
            value={field.value}
            error={field.error}
            multiline
          />
        )}
      </Field>

      <FieldArray name="tags">
        {(array) => {
          const [setListRef] = createAutoAnimate({ duration: 150, easing: easing.easeInOutSine });

          return (
            <fieldset class="space-y-1">
              <legend class={styles().label()}>Теги</legend>
              <ul ref={setListRef} class="space-y-2">
                <For each={array.items}>
                  {(_, index) => (
                    <li>
                      <Field name={`${array.name}.${index()}`}>
                        {(field, props) => (
                          <TextField
                            {...props}
                            type="text"
                            placeholder={`Тег ${index() + 1}`}
                            value={field.value}
                            error={field.error}
                            required
                            before={<TagIcon class="ms-1 -me-1.5 size-5 text-fg-tertiary" />}
                            after={
                              <Button
                                spacing="xs"
                                variant="gray"
                                tabIndex={-1}
                                appearance="tertiary"
                                aria-label="Удалить тег"
                                onClick={() => remove(form, array.name, { at: index() })}
                              >
                                <DeleteIcon class="size-5" />
                              </Button>
                            }
                          />
                        )}
                      </Field>
                    </li>
                  )}
                </For>
              </ul>
              <p class={styles().description()}>Теги можно использовать для фильтрации.</p>

              <Button
                class="mt-2"
                variant="gray"
                appearance="accent"
                onClick={() => {
                  insert(form, array.name, { value: "" });
                  focus(form, `${array.name}.${array.items.length - 1}`);
                }}
                before={<PlusIcon class="size-5" />}
                data-testid="add-tag"
              >
                Добавить тег
              </Button>
            </fieldset>
          );
        }}
      </FieldArray>

      <FieldArray name="equipment">
        {(array) => {
          const [setListRef] = createAutoAnimate({ duration: 150, easing: easing.easeInOutSine });

          return (
            <fieldset class="space-y-1">
              <legend class={styles().label()}>Оборудование</legend>
              <ul ref={setListRef} class="space-y-2">
                <For each={array.items}>
                  {(_, index) => (
                    <li>
                      <Field name={`${array.name}.${index()}`}>
                        {(field, props) => (
                          <TextField
                            {...props}
                            type="text"
                            placeholder={`Оборудование ${index() + 1}`}
                            value={field.value}
                            error={field.error}
                            required
                            before={<BarChartIcon class="ms-1 -me-1.5 size-5 text-fg-tertiary" />}
                            after={
                              <Button
                                spacing="xs"
                                variant="gray"
                                tabIndex={-1}
                                appearance="tertiary"
                                aria-label="Удалить оборудование"
                                onClick={() => remove(form, array.name, { at: index() })}
                              >
                                <DeleteIcon class="size-5" />
                              </Button>
                            }
                          />
                        )}
                      </Field>
                    </li>
                  )}
                </For>
              </ul>
              <p class={styles().description()}>Добавьте необходимое для этого упражнения оборудование.</p>

              <Button
                class="mt-2 self-end"
                variant="gray"
                appearance="accent"
                onClick={() => {
                  insert(form, array.name, { value: "" });
                  focus(form, `${array.name}.${array.items.length - 1}`);
                }}
                before={<PlusIcon class="size-5" />}
                data-testid="add-equipment"
              >
                Добавить оборудование
              </Button>
            </fieldset>
          );
        }}
      </FieldArray>
      <FieldArray name="resources">
        {(array) => {
          const [setListRef] = createAutoAnimate({ duration: 150, easing: easing.easeInOutSine });

          return (
            <fieldset class="space-y-1">
              <legend class={styles().label()}>Ресурсы</legend>
              <ul ref={setListRef} class="space-y-2">
                <For each={array.items}>
                  {(_, index) => (
                    <li>
                      <Field name={`${array.name}.${index()}`}>
                        {(field, props) => (
                          <TextField
                            {...props}
                            type="text"
                            placeholder={`Ресурс ${index() + 1}`}
                            value={field.value}
                            error={field.error}
                            autocomplete="url"
                            required
                            before={<LinkIcon class="ms-1 -me-1.5 size-5 text-fg-tertiary" />}
                            after={
                              <Button
                                spacing="xs"
                                variant="gray"
                                tabIndex={-1}
                                appearance="tertiary"
                                aria-label="Удалить ресурс"
                                onClick={() => remove(form, array.name, { at: index() })}
                              >
                                <DeleteIcon class="size-5" />
                              </Button>
                            }
                          />
                        )}
                      </Field>
                    </li>
                  )}
                </For>
              </ul>
              <p class={styles().description()}>
                Вы можете добавить дополнительную информацию к упражнению в виде ссылок.
              </p>

              <Button
                class="mt-2 self-end"
                variant="gray"
                appearance="accent"
                onClick={() => {
                  insert(form, array.name, { value: "" });
                  focus(form, `${array.name}.${array.items.length - 1}`);
                }}
                before={<AddLinkIcon class="size-5" />}
                data-testid="add-resource"
              >
                Добавить ресурс
              </Button>
            </fieldset>
          );
        }}
      </FieldArray>

      <FormResponse of={form} />

      <Separator />

      <div class="flex justify-between">
        <Button
          spacing="lg"
          variant="ghost"
          appearance="secondary"
          loading={form.submitting}
          onClick={() => reset(form)}
          class="self-end"
        >
          Сбросить
        </Button>
        <Button
          type="submit"
          spacing="lg"
          appearance="accent"
          loading={form.submitting}
          disabled={form.invalid}
          class="self-end"
        >
          {props.id ? "Сохранить упражнение" : "Создать упражнение"}
        </Button>
      </div>
    </Form>
  );
};
