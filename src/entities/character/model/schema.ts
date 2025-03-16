import * as v from "valibot";

import {
  CHARACTER_GOAL_MAX_VALUE,
  CHARACTER_GOAL_MIN_VALUE,
  CHARACTER_NAME_MAX_LENGTH,
  CHARACTER_NAME_MIN_LENGTH,
} from "../config";

export const CharacterNameSchema = v.pipe(
  v.string(),
  v.nonEmpty("Имя не должно быть пустым."),
  v.minLength(CHARACTER_NAME_MIN_LENGTH, "Имя персонажа слишком короткое."),
  v.maxLength(CHARACTER_NAME_MAX_LENGTH, "Имя персонажа слишком длинное."),
  v.trim(),
);

export const CharacterWeightSchema = v.pipe(v.string(), v.nonEmpty("Введите вес персонажа."), v.decimal());

export const CharacterHeightSchema = v.pipe(v.string(), v.nonEmpty("Введите рост персонажа."), v.decimal());

export const CharacterBirthdaySchema = v.pipe(v.string(), v.nonEmpty("Введите дату рождения персонажа."));

export const CharacterGoalSchema = v.pipe(
  v.number("Цель тренировок не может быть пустой."),
  v.minValue(CHARACTER_GOAL_MIN_VALUE, "Указана слишком маленькая цель тренировок."),
  v.maxValue(CHARACTER_GOAL_MAX_VALUE, "Указана слишком большая цель тренировок."),
);
