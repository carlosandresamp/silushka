export type Achievement = {
  id: string;
  image: string;
  prize: number;
  title: string;
  description: string;
  requirements?: AchievementRequirement;
};

export type AchievementRequirement = {
  exercisesCreated?: number;
  workoutsCreated?: number;
  workoutsCompleted?: number;
};

export const achievements: Achievement[] = [
  {
    id: "novice",
    title: "Новичок",
    description: "Вы сделали первый шаг в нашем приложении!",
    image: "/achievements/billed-cap.svg",
    prize: 0,
  },
  {
    id: "first_exercise",
    title: "Первое упражнение",
    description: "Вы создали свое первое упражнение.",
    image: "/achievements/medallist.svg",
    prize: 10,
    requirements: {
      exercisesCreated: 1,
    },
  },
  {
    id: "first_workout",
    title: "Первая тренировка",
    description: "Вы создали свою первую тренировку.",
    image: "/achievements/bullseye.svg",
    prize: 10,
    requirements: {
      workoutsCreated: 1,
    },
  },
  {
    id: "first_steps",
    title: "Первые шаги",
    description: "Вы завершили свою первую тренировку.",
    image: "/achievements/checkered-flag.svg",
    prize: 10,
    requirements: {
      workoutsCompleted: 1,
    },
  },
  {
    id: "machine",
    title: "Машина",
    description: "Вы создали 5 упражнений.",
    image: "/achievements/muscle-up.svg",
    prize: 20,
    requirements: {
      exercisesCreated: 5,
    },
  },
  {
    id: "trainer",
    title: "Тренер",
    description: "Вы создали 10 тренировок.",
    image: "/achievements/stopwatch.svg",
    prize: 30,
    requirements: {
      workoutsCreated: 10,
    },
  },
  {
    id: "consistency",
    title: "Постоянство",
    description: "Вы завершили 20 тренировок.",
    image: "/achievements/circular-sawblade.svg",
    prize: 40,
    requirements: {
      workoutsCompleted: 20,
    },
  },
  {
    id: "master",
    title: "Мастер",
    description: "Вы создали 15 упражнений и 15 тренировок.",
    image: "/achievements/kimono.svg",
    prize: 50,
    requirements: {
      exercisesCreated: 15,
      workoutsCreated: 15,
    },
  },
  {
    id: "super_trainer",
    title: "Супер тренер",
    description: "Вы создали 30 тренировок.",
    image: "/achievements/weight-lifting-up.svg",
    prize: 60,
    requirements: {
      workoutsCreated: 30,
    },
  },
  {
    id: "fitness_guru",
    title: "Фитнес-гуру",
    description: "Вы завершили 50 тренировок.",
    image: "/achievements/sword-in-stone.svg",
    prize: 70,
    requirements: {
      workoutsCompleted: 50,
    },
  },
  {
    id: "creator",
    title: "Создатель",
    description: "Вы создали 10 уникальных упражнений.",
    image: "/achievements/diploma.svg",
    prize: 40,
    requirements: {
      exercisesCreated: 10,
    },
  },
  {
    id: "marathoner",
    title: "Тренировочный марафонец",
    description: "Вы завершили 100 тренировок.",
    image: "/achievements/biceps.svg",
    prize: 80,
    requirements: {
      workoutsCompleted: 100,
    },
  },
  {
    id: "legend",
    title: "Легенда",
    description: "Вы создали и завершили 100 тренировок.",
    image: "/achievements/laurels-trophy.svg",
    prize: 100,
    requirements: {
      workoutsCreated: 100,
      workoutsCompleted: 100,
    },
  },
];
