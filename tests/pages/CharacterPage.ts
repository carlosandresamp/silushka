import { Page } from "@playwright/test";

import CharacterFactory from "tests/factories/CharacterFactory";
import Character from "tests/types/Character";

export default class CharacterPage {
  protected readonly page: Page;
  public readonly nameInputSelector: string = 'input[name="name"]';
  public readonly weightInputSelector: string = 'input[name="weight"]';
  public readonly heightInputSelector: string = 'input[name="height"]';
  public readonly birthdayInputSelector: string = 'input[name="birthday"]';
  public readonly goalInputSelector: string = 'input[name="goal"]';
  public readonly submitButtonSelector: string = 'button[type="submit"]';

  public constructor(page: Page) {
    this.page = page;
  }

  public async goto(): Promise<void> {
    await this.page.goto("/", { waitUntil: "networkidle" });
  }

  public async fill(values: Character): Promise<void> {
    await this.page.fill(this.nameInputSelector, values.name);
    await this.page.fill(this.weightInputSelector, values.weight);
    await this.page.fill(this.heightInputSelector, values.height);
    await this.page.fill(this.birthdayInputSelector, values.birthday);
    await this.page.fill(this.goalInputSelector, values.goal);
  }

  public async submit(): Promise<void> {
    await this.page.click(this.submitButtonSelector);
  }

  public async create(overrides?: Partial<Character>): Promise<Character> {
    const character = CharacterFactory.create(overrides);

    await this.fill(character);
    await this.submit();

    return character;
  }
}
