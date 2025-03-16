import { Workout } from "tests/types/Workout";

export default class WorkoutFactory {
  public static create(overrides: Partial<Workout> = {}): Workout {
    const character: Workout = {
      name: "Тренировка",
      pause: "1",
      favorite: false,
      exercises: [
        {
          name: "Приседания",
          type: "Заметка",
          value: "Научиться выполнять упражнение",
        },
        {
          name: "Йога",
          type: "Время",
          value: "1",
        },
        {
          name: "Атжуманья",
          type: "Вес",
          value: "4",
        },
        {
          name: "Махи ногами",
          type: "Повторения",
          value: "10",
        },
      ],
    };

    return { ...character, ...overrides };
  }
}
