import { WorkoutExerciseGoal, WorkoutExerciseGoalType } from "@shared/db";

export const getRandomGoalType = () => {
  const goalTypes = Object.values(WorkoutExerciseGoalType);
  const randomIndex = Math.floor(Math.random() * goalTypes.length);
  return goalTypes[randomIndex] as WorkoutExerciseGoalType;
};

export const getComputedGoalByGoalType = (
  type: WorkoutExerciseGoalType,
  options: { weight: string; height: string; birthday: string },
): WorkoutExerciseGoal => {
  const weight = parseFloat(options.weight);
  const height = parseFloat(options.height);
  const birthday = new Date(options.birthday);
  const ageInMilliseconds = new Date().valueOf() - birthday.valueOf();
  const age = new Date(ageInMilliseconds).getUTCFullYear() - 1970;

  switch (type) {
    case WorkoutExerciseGoalType.NOTE:
      return {
        type: WorkoutExerciseGoalType.NOTE,
        value: "",
      };

    case WorkoutExerciseGoalType.TIME:
      return {
        type: WorkoutExerciseGoalType.TIME,
        value: Math.ceil(Math.max(15, (weight + height) / 10)),
      };

    case WorkoutExerciseGoalType.REPETITIONS:
      return {
        type: WorkoutExerciseGoalType.REPETITIONS,
        value: Math.ceil(Math.max(10, age / 2)),
      };

    case WorkoutExerciseGoalType.WEIGHT:
      return {
        type: WorkoutExerciseGoalType.WEIGHT,
        value: Math.ceil(Math.max(1, weight * 0.125)),
      };
  }
};
