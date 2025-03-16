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

export type ExerciseDifficultyIndicatorProps = {
  difficulty: ExerciseDifficulty;
};

export const ExerciseDifficultyIndicator = (props: ExerciseDifficultyIndicatorProps) => {
  return (
    <span class={styles().difficulty({ difficulty: props.difficulty })}>
      {"*".repeat(Object.values(ExerciseDifficulty).indexOf(props.difficulty) + 1)}
    </span>
  );
};
