export type Workout = {
  name: string;
  pause: string;
  favorite: boolean;
  exercises: WorkoutExercise[];
};

export type WorkoutExercise = {
  name: string;
  type: string;
  value: string;
};
