import { expect, Page, test } from "@playwright/test";

import ExerciseFactory from "tests/factories/ExerciseFactory";
import ExercisesNewPage from "tests/pages/ExercisesNewPage";
import OnboardingPage from "tests/pages/OnboardingPage";
import Exercise from "tests/types/Exercise";

const { describe, beforeEach } = test;

describe("/exercises/", () => {
  beforeEach(async ({ page }) => {
    const onboardingPage = new OnboardingPage(page);
    await onboardingPage.goto();
    await onboardingPage.create();
  });

  describe("/exercises/new/", () => {
    let exercise: Exercise;
    let exercisesNewPage: ExercisesNewPage;

    const createExerciseWithArray = async (page: Page, array: string[], key: keyof Exercise) => {
      await exercisesNewPage.fill({ [key]: array });
      await exercisesNewPage.submit();

      await page.waitForURL(/\/exercises\/\d+/);

      for (const item of array) {
        const newItemLocator = page.getByText(item, { exact: true });

        await expect(newItemLocator).toBeVisible();
      }
    };

    beforeEach(async ({ page }) => {
      exercise = ExerciseFactory.create();
      exercisesNewPage = new ExercisesNewPage(page);

      await exercisesNewPage.goto();
    });

    test("создание упражнения с названием и описанием", async ({ page }) => {
      const name = "Моё первое упражнение";
      const description = "Я научился создавать свои упражнения!";

      await exercisesNewPage.fill({ name, description });
      await exercisesNewPage.submit();

      await page.waitForURL(/\/exercises\/\d+/);

      const newExerciseNameSelector = page.getByText(name);
      const newExerciseDescriptionSelector = page.getByText(description, { exact: true });

      await expect(newExerciseNameSelector).toBeVisible();
      await expect(newExerciseDescriptionSelector).toBeVisible();
    });

    test("создание упражнения с тегами", async ({ page }) => {
      await createExerciseWithArray(page, exercise.tags!, "tags");
    });

    test("создание упражнения с оборудованием", async ({ page }) => {
      await createExerciseWithArray(page, exercise.equipment!, "equipment");
    });

    test("создание упражнения с ресурсами", async ({ page }) => {
      await createExerciseWithArray(page, exercise.resources!, "resources");
    });

    describe("нельзя создать упражнение используя неверные данные", () => {
      const cases: { title: string; overrides: Partial<Exercise> }[] = [
        { title: "создание упражнения без названия", overrides: { name: "" } },
        { title: "создание упражнения с пустым тегом", overrides: { tags: [""] } },
        { title: "создание упражнения с пустыми тегами", overrides: { tags: ["", ""] } },
        { title: "создание упражнения с пустым оборудованием", overrides: { equipment: [""] } },
        { title: "создание упражнения с пустыми оборудованиями", overrides: { equipment: ["", ""] } },
        { title: "создание упражнения с пустым ресурсом", overrides: { resources: [""] } },
        { title: "создание упражнения с пустыми ресурсами", overrides: { resources: ["", ""] } },
        { title: "создание упражнения с некорректной ссылкой на ресурс", overrides: { resources: ["не ссылка"] } },
        {
          title: "создание упражнения с некорректной ссылкой (без протокола)",
          overrides: { resources: ["example.com"] },
        },
        { title: "создание упражнения с некорректной ссылкой (неполный URL)", overrides: { resources: ["http://"] } },
      ];

      for (const { title, overrides } of cases) {
        test(title, async ({ page }) => {
          await exercisesNewPage.fill(overrides);
          await exercisesNewPage.submit();

          await expect(page.locator(exercisesNewPage.submitButtonSelector)).toBeDisabled();
        });
      }
    });
  });
});
