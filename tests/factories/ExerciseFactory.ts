import Exercise from "tests/types/Exercise";

export default class ExerciseFactory {
  public static create(overrides: Partial<Exercise> = {}): Exercise {
    const exercise: Exercise = {
      name: "Йога",
      description: "Йога помогает улучшить гибкость и расслабление.",
      resources: ["https://example.com/yoga", "https://example.com"],
      equipment: ["коврик", "одежда"],
      tags: ["гибкость", "релаксация"],
    };

    return { ...exercise, ...overrides };
  }
}
