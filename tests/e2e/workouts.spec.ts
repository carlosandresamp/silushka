import { expect, test } from "@playwright/test";

import WorkoutFactory from "tests/factories/WorkoutFactory";
import OnboardingPage from "tests/pages/OnboardingPage";
import WorkoutsNewPage from "tests/pages/WorkoutsNewPage";
import { Workout } from "tests/types/Workout";

const { describe, beforeEach } = test;

describe("/workouts/", () => {
  beforeEach(async ({ page }) => {
    const onboardingPage = new OnboardingPage(page);
    await onboardingPage.goto();
    await onboardingPage.create();
  });

  describe("/workouts/new/", () => {
    let workout: Workout;
    let workoutsNewPage: WorkoutsNewPage;

    beforeEach(async ({ page }) => {
      workout = WorkoutFactory.create();
      workoutsNewPage = new WorkoutsNewPage(page);

      await workoutsNewPage.goto();
    });

    test("создание тренировки", async ({ page }) => {
      await workoutsNewPage.fill({ ...workout });
      await workoutsNewPage.submit();

      await page.waitForURL(/\/workouts\/\d+/);

      const name = page.getByText(workout.name, { exact: true });
      await expect(name).toBeVisible();

      for (const exercise of workout.exercises) {
        const exerciseNameLocator = page.getByText(exercise.name, { exact: false });
        await expect(exerciseNameLocator).toBeVisible();
      }
    });

    describe("нельзя создать тренировку используя неверные данные", () => {
      const cases: { title: string; overrides: Partial<Workout>; submit: boolean }[] = [
        {
          title: "создание тренировки без названия",
          overrides: { name: "" },
          submit: true,
        },
        {
          title: "создание тренировки без упражнений",
          overrides: { exercises: [] },
          submit: true,
        },
        {
          title: "создание тренировки с пустым упражнением",
          overrides: { exercises: [{ name: "", type: "", value: "" }] },
          submit: false,
        },
        {
          title: "создание тренировки с пустым типом",
          overrides: { exercises: [{ name: "Приседания", type: "", value: "" }] },
          submit: false,
        },
        {
          title: "создание тренировки с пустым значением для заметки",
          overrides: { exercises: [{ name: "Приседания", type: "Заметка", value: "" }] },
          submit: false,
        },
        {
          title: "создание тренировки с пустым значением для веса",
          overrides: { exercises: [{ name: "Приседания", type: "Вес", value: "" }] },
          submit: false,
        },
        {
          title: "создание тренировки с пустым значением для времени",
          overrides: { exercises: [{ name: "Приседания", type: "Время", value: "" }] },
          submit: false,
        },
        {
          title: "создание тренировки с пустым значением для повторений",
          overrides: { exercises: [{ name: "Приседания", type: "Повторения", value: "" }] },
          submit: false,
        },
      ];

      for (const { title, overrides, submit } of cases) {
        test(title, async ({ page }) => {
          await workoutsNewPage.fill(overrides);

          if (submit) {
            await workoutsNewPage.submit();
          }

          await expect(page.locator(workoutsNewPage.submitButtonSelector)).toBeDisabled();
        });
      }
    });
  });

  describe("/workouts/:id/start", () => {
    let workout: Workout;
    let workoutsNewPage: WorkoutsNewPage;

    beforeEach(async ({ page }) => {
      workout = WorkoutFactory.create();
      workoutsNewPage = new WorkoutsNewPage(page);

      await workoutsNewPage.goto();
      await workoutsNewPage.fill(workout);
      await workoutsNewPage.submit();
    });

    test("режим тренировки", async ({ page }) => {
      const startButton = page.getByTestId("start-workout");
      await startButton.click();

      await page.waitForURL(/\/workouts\/\d+\/start/);

      let skippedCount: number = 0;
      let completedCount: number = 0;

      for (const [index, exercise] of workout.exercises.entries()) {
        await expect(page.getByText(exercise.name, { exact: false })).toBeVisible();

        if (exercise.type === "Время") {
          const skipButton = page.getByTestId("skip");
          await skipButton.click();

          skippedCount++;
        } else {
          const completeButton = page.getByTestId("complete");
          await completeButton.click();

          completedCount++;
        }

        if (index !== workout.exercises.length - 1) {
          const toggleTimerButton = page.getByTestId("toggle-timer");
          await toggleTimerButton.click();
          const skipButton = page.getByTestId("skip");
          await skipButton.click();
        } else {
          const completed = page.getByTestId("completed");
          const skipped = page.getByTestId("skipped");

          await expect(completed).toContainText(completedCount.toString());
          await expect(skipped).toContainText(skippedCount.toString());
        }
      }
    });
  });
});
