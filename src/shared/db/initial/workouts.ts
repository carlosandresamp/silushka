import { Workout, WorkoutExerciseGoalType } from "../entities/Workout";

export default [
  {
    id: 1,
    name: "Дачная тренировка",
    pause: 10,
    favorite: true,
    exercises: [
      {
        id: 1,
        goal: {
          type: WorkoutExerciseGoalType.TIME,
          value: 15,
        },
      },
      {
        id: 2,
        goal: {
          type: WorkoutExerciseGoalType.REPETITIONS,
          value: 20,
        },
      },
      {
        id: 8,
        goal: {
          type: WorkoutExerciseGoalType.WEIGHT,
          value: 5,
        },
      },
      {
        id: 4,
        goal: {
          type: WorkoutExerciseGoalType.NOTE,
          value: "3 круга",
        },
      },
      {
        id: 6,
        goal: {
          type: WorkoutExerciseGoalType.NOTE,
          value: "Съездить на озеро",
        },
      },
    ],
  },
  {
    id: 2,
    name: "Силовая тренировка",
    pause: 15,
    favorite: false,
    exercises: [
      {
        id: 1,
        goal: {
          type: WorkoutExerciseGoalType.WEIGHT,
          value: 10,
        },
      },
      {
        id: 2,
        goal: {
          type: WorkoutExerciseGoalType.REPETITIONS,
          value: 15,
        },
      },
      {
        id: 3,
        goal: {
          type: WorkoutExerciseGoalType.REPETITIONS,
          value: 30,
        },
      },
      {
        id: 5,
        goal: {
          type: WorkoutExerciseGoalType.NOTE,
          value: "3 подхода",
        },
      },
      {
        id: 11,
        goal: {
          type: WorkoutExerciseGoalType.NOTE,
          value: "10 повторений",
        },
      },
    ],
  },
  {
    id: 3,
    name: "Кардио тренировка",
    pause: 5,
    favorite: false,
    exercises: [
      {
        id: 4,
        goal: {
          type: WorkoutExerciseGoalType.TIME,
          value: 1,
        },
      },
      {
        id: 10,
        goal: {
          type: WorkoutExerciseGoalType.REPETITIONS,
          value: 50,
        },
      },
      {
        id: 12,
        goal: {
          type: WorkoutExerciseGoalType.NOTE,
          value: "15 минут",
        },
      },
      {
        id: 14,
        goal: {
          type: WorkoutExerciseGoalType.NOTE,
          value: "5 подходов",
        },
      },
    ],
  },
] satisfies Workout[];
