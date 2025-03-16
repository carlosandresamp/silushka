import { Page } from "@playwright/test";

import { Workout, WorkoutExercise } from "tests/types/Workout";

export default abstract class WorkoutsEditPage {
  protected readonly page: Page;
  public readonly submitButtonSelector: string = 'button[type="submit"]';
  public readonly nameInputSelector: string = 'input[name="name"]';
  public readonly pauseInputSelector: string = 'input[name="pause"]';
  public readonly addExerciseButtonTestId: string = "add-exercise";

  public constructor(page: Page) {
    this.page = page;
  }

  public async fill(values: Partial<Workout>): Promise<void> {
    if (values.name) await this.fillName(values.name);
    if (values.pause) await this.fillPause(values.pause);
    if (values.exercises) await this.fillExercises(values.exercises);
  }

  public async fillName(name: string): Promise<void> {
    await this.page.fill(this.nameInputSelector, name);
  }

  public async fillPause(description: string): Promise<void> {
    await this.page.fill(this.pauseInputSelector, description);
  }

  public async fillExercises(exercises: WorkoutExercise[]): Promise<void> {
    const addButton = this.page.getByTestId(this.addExerciseButtonTestId);

    for (const [index, exercise] of exercises.entries()) {
      await addButton.click();

      await this.page.selectOption(`select[name="exercises.${index}.id"]`, exercise.name);
      await this.page.selectOption(`select[name="exercises.${index}.goal.type"]`, exercise.type);

      if (exercise.type) {
        await this.page.fill(`input[name="exercises.${index}.goal.value"]`, exercise.value);
      }
    }
  }

  public async submit(): Promise<void> {
    await this.page.click(this.submitButtonSelector);
  }
}
