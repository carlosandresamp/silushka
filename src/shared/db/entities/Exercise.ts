export type Exercise = {
  id?: number;
  name: string;
  description?: string;
  difficulty: ExerciseDifficulty;
  resources?: string[];
  equipment?: string[];
  tags?: string[];
};

export enum ExerciseDifficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
