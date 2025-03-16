import { WorkoutExerciseGoalType } from "@shared/db";

const translations: Record<WorkoutExerciseGoalType, string> = {
  note: "Заметка",
  time: "Время",
  weight: "Вес",
  repetitions: "Повторения",
};

export const getWorkoutExerciseTypeDisplayName = (type: WorkoutExerciseGoalType) => {
  return translations[type];
};

export const formatRepetitionsString = (locale: string, value: number) => {
  const rules = new Intl.PluralRules(locale);
  const rule = rules.select(value);

  switch (rule) {
    case "one":
      return `${value} раз`;
    case "few":
      return `${value} раза`;
    case "many":
    case "other":
      return `${value} раз`;
    default:
      return `${value} раз`;
  }
};
