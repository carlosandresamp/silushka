import { expect, test } from "@playwright/test";

import OnboardingPage from "tests/pages/OnboardingPage";
import Character from "tests/types/Character";

const { describe, beforeEach } = test;

describe("Онбординг", () => {
  let onboardingPage: OnboardingPage;

  beforeEach(async ({ page }) => {
    onboardingPage = new OnboardingPage(page);

    await onboardingPage.goto();
  });

  test("создание персонажа", async ({ page }) => {
    const character = await onboardingPage.create();

    const characterNameLocator = page.getByText(character.name);

    await expect(characterNameLocator).toBeVisible();
  });

  describe("нельзя создать персонажа используя неверные данные", () => {
    const cases: { title: string; overrides: Partial<Character> }[] = [
      { title: "создание персонажа без имени", overrides: { name: "" } },
      { title: "создание персонажа без веса", overrides: { weight: "" } },
      { title: "создание персонажа без роста", overrides: { height: "" } },
      { title: "создание персонажа без даты рождения", overrides: { birthday: "" } },
      { title: "создание персонажа без цели", overrides: { goal: "" } },
    ];

    for (const { title, overrides } of cases) {
      test(title, async ({ page }) => {
        await onboardingPage.create(overrides);

        await expect(page.locator(onboardingPage.submitButtonSelector)).toBeDisabled();
      });
    }
  });
});
