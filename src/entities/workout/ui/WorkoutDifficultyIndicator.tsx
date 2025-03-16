import { createMemo } from "solid-js";
import { tv } from "tailwind-variants";

import { ExerciseDifficulty } from "@shared/db";

const styles = tv({
  slots: {
    difficulty: "",
  },
  variants: {
    difficulty: {
      easy: {
        difficulty: "text-fg-positive",
      },
      medium: {
        difficulty: "text-fg-accent",
      },
      hard: {
        difficulty: "text-fg-destructive",
      },
    },
  },
});

export const calculateAverageDifficulty = (difficulties: ExerciseDifficulty[]): ExerciseDifficulty => {
  if (difficulties.length === 0) {
    return ExerciseDifficulty.EASY;
  }

  const difficultyArray = Object.values(ExerciseDifficulty);

  const totalDifficulty = difficulties.reduce((sum, difficulty) => {
    return sum + (difficultyArray.indexOf(difficulty) + 1);
  }, 0);

  const average = Math.round(totalDifficulty / difficulties.length);

  return difficultyArray[Math.min(Math.max(average - 1, 0), difficultyArray.length - 1)] ?? ExerciseDifficulty.EASY;
};

export type WorkoutDifficultyIndicatorProps = {
  difficulties: ExerciseDifficulty[];
};

export const WorkoutDifficultyIndicator = (props: WorkoutDifficultyIndicatorProps) => {
  const difficulty = createMemo(() => calculateAverageDifficulty(props.difficulties));

  return (
    <span class={styles().difficulty({ difficulty: difficulty() })}>
      {"*".repeat(Object.values(ExerciseDifficulty).indexOf(difficulty()) + 1)}
    </span>
  );
};
