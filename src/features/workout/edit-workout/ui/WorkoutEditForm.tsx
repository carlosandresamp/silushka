import { createAutoAnimate } from "@formkit/auto-animate/solid";
import {
  clearError,
  focus,
  getValue,
  getValues,
  insert,
  move,
  remove,
  reset,
  setValue,
  setValues,
  validate,
} from "@modular-forms/solid";
import { createEffect, createMemo, For, Match, on, Show, Switch } from "solid-js";

import { useCharacter } from "@entities/character";
import { getWorkoutExerciseTypeDisplayName } from "@entities/workout";
import db, { createStoreQuery, WorkoutExerciseGoalType } from "@shared/db";
import easing from "@shared/lib/easing";
import Button from "@shared/ui/button";
import Collapse from "@shared/ui/collapse";
import FormResponse from "@shared/ui/form-response";
import NumberField from "@shared/ui/number-field";
import Select from "@shared/ui/select";
import Separator from "@shared/ui/separator";
import TextField, { styles } from "@shared/ui/text-field";

import { ExercisesAutocompleteForm } from "./ExercisesAutocompleteForm";
import { getComputedGoalByGoalType, getRandomGoalType } from "../lib/autocomplete";
import { createWorkoutEditForm } from "../model/forms/createWorkoutEditForm";
import { WorkoutEditFormSchemaValues } from "../model/schemas/WorkoutEditFormSchema";

import ArrowDownwardIcon from "~icons/ic/round-arrow-downward";
import ArrowUpwardIcon from "~icons/ic/round-arrow-upward";
import DeleteIcon from "~icons/ic/round-delete-outline";
import PlusIcon from "~icons/ic/round-plus";

export type EditWorkoutFormProps = {
  initialValues?: WorkoutEditFormSchemaValues;
  id?: number | undefined;
  onStart?: (values: WorkoutEditFormSchemaValues) => void;
};

export const WorkoutEditForm = (props: EditWorkoutFormProps) => {
  const [form, submit, { Form, Field, FieldArray }] = createWorkoutEditForm(props.initialValues, props.id);
  const exercies = createStoreQuery(() => db.exercises.toArray());
  const character = useCharacter();

  const start = async () => {
    const valid = await validate(form);

    if (!valid) {
      return;
    }

    const values = getValues(form);

    props.onStart?.(values as WorkoutEditFormSchemaValues);
  };

  return (
    <Form onSubmit={submit} class="flex flex-col space-y-4">
      <Field name="name">
        {(field, props) => (
          <TextField
            {...props}
            type="text"
            label="Название"
            placeholder="Введите название тренировки…"
            value={field.value}
            error={field.error}
            autocomplete="name"
            required
            clearable
          />
        )}
      </Field>

      <Field name="pause" type="number">
        {(field, props) => (
          <NumberField
            {...props}
            label="Пауза"
            placeholder="Введите паузу между упражнениями…"
            value={field.value}
            error={field.error}
            formatOptions={{
              style: "unit",
              unit: "minute",
            }}
            required
          />
        )}
      </Field>

      <FieldArray name="exercises">
        {(array) => {
          const [setListRef] = createAutoAnimate({ duration: 150, easing: easing.easeInOutSine });

          return (
            <fieldset class="space-y-1">
              <legend class={styles().label({ required: true })}>Упражнения</legend>
              <ul ref={setListRef} class="space-y-4">
                <For each={array.items}>
                  {(_, index) => {
                    const type = createMemo(() => getValue(form, `${array.name}.${index()}.goal.type`));

                    return (
                      <li class="flex gap-2">
                        <div class="space-y-2 grow">
                          <Field name={`${array.name}.${index()}.id`}>
                            {(field, props) => (
                              <Select
                                {...props}
                                placeholder="Выберите упражнение…"
                                options={exercies.map((exercie) => ({
                                  value: String(exercie.id),
                                  label: exercie.name,
                                }))}
                                value={field.value}
                                error={field.error}
                                disallowEmptySelection
                                after={
                                  <Button
                                    spacing="xs"
                                    variant="gray"
                                    appearance="tertiary"
                                    aria-label="Удалить упражнение"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={() => remove(form, array.name, { at: index() })}
                                  >
                                    <DeleteIcon class="size-5" />
                                  </Button>
                                }
                                required
                              />
                            )}
                          </Field>

                          <div class="grid grid-cols-2 gap-2">
                            <Field name={`${array.name}.${index()}.goal.type`}>
                              {(field, props) => {
                                createEffect(
                                  on(
                                    () => type(),
                                    () => {
                                      if (field.touched) {
                                        const selectedType = type();

                                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                        if (selectedType === undefined || !field) {
                                          return;
                                        }

                                        const goal = getComputedGoalByGoalType(selectedType, {
                                          birthday: character.character.birthday,
                                          height: character.character.height,
                                          weight: character.character.weight,
                                        });

                                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                                        if (!goal) {
                                          return;
                                        }

                                        requestAnimationFrame(() => {
                                          setValue(form, `${array.name}.${index()}.goal.value`, goal.value);
                                        });
                                      }
                                    },
                                  ),
                                );

                                return (
                                  <Select
                                    {...props}
                                    placeholder="Выберите тип упражнения…"
                                    options={Object.values(WorkoutExerciseGoalType).map((type) => ({
                                      value: type,
                                      label: getWorkoutExerciseTypeDisplayName(type),
                                    }))}
                                    value={field.value}
                                    error={field.error}
                                    disallowEmptySelection
                                    required
                                  />
                                );
                              }}
                            </Field>

                            <Switch>
                              <Match when={type() === WorkoutExerciseGoalType.NOTE}>
                                <Field name={`${array.name}.${index()}.goal.value`} type="string">
                                  {(field, props) => (
                                    <TextField
                                      {...props}
                                      placeholder="Введите цель…"
                                      value={field.value as string}
                                      error={field.error}
                                      required
                                    />
                                  )}
                                </Field>
                              </Match>
                              <Match when={type() === WorkoutExerciseGoalType.TIME}>
                                <Field name={`${array.name}.${index()}.goal.value`} type="number">
                                  {(field, props) => (
                                    <NumberField
                                      {...props}
                                      placeholder="Введите время выполнения упражнения…"
                                      value={field.value}
                                      error={field.error}
                                      formatOptions={{
                                        style: "unit",
                                        unit: "minute",
                                      }}
                                      required
                                    />
                                  )}
                                </Field>
                              </Match>
                              <Match when={type() === WorkoutExerciseGoalType.WEIGHT}>
                                <Field name={`${array.name}.${index()}.goal.value`} type="number">
                                  {(field, props) => (
                                    <NumberField
                                      {...props}
                                      placeholder="Введите вес выполнения упражнения…"
                                      value={field.value}
                                      error={field.error}
                                      formatOptions={{
                                        style: "unit",
                                        unit: "kilogram",
                                      }}
                                      required
                                    />
                                  )}
                                </Field>
                              </Match>
                              <Match when={type() === WorkoutExerciseGoalType.REPETITIONS}>
                                <Field name={`${array.name}.${index()}.goal.value`} type="number">
                                  {(field, props) => (
                                    <NumberField
                                      {...props}
                                      placeholder="Введите число повторений упражнения…"
                                      value={field.value}
                                      error={field.error}
                                      required
                                    />
                                  )}
                                </Field>
                              </Match>
                            </Switch>
                          </div>
                        </div>
                        <div class="flex flex-col gap-2">
                          <Button
                            spacing="xs"
                            variant="ghost"
                            appearance="tertiary"
                            aria-label="Переместить упражнение вверх"
                            onClick={() => move(form, array.name, { from: index(), to: index() - 1 })}
                            disabled={index() === 0}
                          >
                            <ArrowUpwardIcon class="size-6" />
                          </Button>

                          <Button
                            spacing="xs"
                            variant="ghost"
                            appearance="tertiary"
                            aria-label="Переместить упражнение вниз"
                            onClick={() => move(form, array.name, { from: index(), to: index() + 1 })}
                            disabled={index() === array.items.length - 1}
                          >
                            <ArrowDownwardIcon class="size-6" />
                          </Button>
                        </div>
                      </li>
                    );
                  }}
                </For>
              </ul>

              <p class={styles().description()}>Создайте план тренировки.</p>

              <Collapse>
                <Show when={array.error}>{(error) => <p class={styles().error()}>{error()}</p>}</Show>
              </Collapse>

              <div class="mt-2 flex items-center justify-between">
                <Button
                  variant="gray"
                  appearance="accent"
                  onClick={() => {
                    const type = getRandomGoalType();
                    const goal = getComputedGoalByGoalType(type, {
                      birthday: character.character.birthday,
                      height: character.character.height,
                      weight: character.character.weight,
                    });

                    insert(form, array.name, {
                      value: {
                        id: "",
                        goal: goal,
                      },
                    });
                    focus(form, `${array.name}.${array.items.length - 1}.goal.value`);
                  }}
                  before={<PlusIcon class="size-5" />}
                  data-testid="add-exercise"
                >
                  Добавить упражнение
                </Button>

                <ExercisesAutocompleteForm
                  onSubmit={(exercises) => {
                    setValues(
                      form,
                      "exercises",
                      exercises.map((exercise) => {
                        const type = getRandomGoalType();
                        const goal = getComputedGoalByGoalType(type, {
                          birthday: character.character.birthday,
                          height: character.character.height,
                          weight: character.character.weight,
                        });

                        return {
                          id: String(exercise.id!),
                          goal: goal,
                        };
                      }),
                    );

                    requestAnimationFrame(() => {
                      clearError(form, "exercises");
                    });
                  }}
                />
              </div>
            </fieldset>
          );
        }}
      </FieldArray>

      <FormResponse of={form} />

      <Separator />

      <div class="flex justify-between gap-2">
        <Button
          spacing="lg"
          variant="ghost"
          appearance="secondary"
          loading={form.submitting}
          onClick={() => reset(form)}
        >
          Сбросить
        </Button>
        <Show when={props.id === undefined}>
          <Button
            class="ms-auto"
            spacing="lg"
            variant="gray"
            appearance="positive"
            onClick={start}
            loading={form.submitting}
            disabled={form.invalid}
          >
            Старт
          </Button>
        </Show>
        <Button type="submit" spacing="lg" appearance="accent" loading={form.submitting} disabled={form.invalid}>
          Сохранить
        </Button>
      </div>
    </Form>
  );
};
