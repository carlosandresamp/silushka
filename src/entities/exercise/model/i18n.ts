import { ExerciseDifficulty } from "@shared/db";

const translations: Record<ExerciseDifficulty, string> = {
  easy: "Простое",
  medium: "Среднее",
  hard: "Сложное",
};

export const getExerciseDifficultyDisplayName = (difficulty: ExerciseDifficulty) => {
  return translations[difficulty];
};
