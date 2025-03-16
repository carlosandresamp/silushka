import { Page } from "@playwright/test";

import Exercise from "tests/types/Exercise";

export default abstract class ExercisesEditPage {
  protected readonly page: Page;
  public readonly submitButtonSelector: string = 'button[type="submit"]';
  public readonly nameInputSelector: string = 'input[name="name"]';
  public readonly descriptionInputSelector: string = 'textarea[name="description"]';
  public readonly addTagButtonTestId: string = "add-tag";
  public readonly addEquipmentButtonTestId: string = "add-equipment";
  public readonly addResourceButtonTestId: string = "add-resource";

  public constructor(page: Page) {
    this.page = page;
  }

  public async fill(values: Partial<Exercise>): Promise<void> {
    if (values.name !== undefined) await this.fillName(values.name);
    if (values.description !== undefined) await this.fillDescription(values.description);
    if (values.tags?.length) await this.fillTags(values.tags);
    if (values.equipment?.length) await this.fillEquipment(values.equipment);
    if (values.resources?.length) await this.fillResources(values.resources);
  }

  public async fillName(name: string): Promise<void> {
    await this.page.fill(this.nameInputSelector, name);
  }

  public async fillDescription(description: string): Promise<void> {
    await this.page.fill(this.descriptionInputSelector, description);
  }

  public async fillTags(tags: string[]): Promise<void> {
    await this.fillArray(tags, this.addTagButtonTestId, "tags");
  }

  public async fillEquipment(equipment: string[]): Promise<void> {
    await this.fillArray(equipment, this.addEquipmentButtonTestId, "equipment");
  }

  public async fillResources(resources: string[]): Promise<void> {
    await this.fillArray(resources, this.addResourceButtonTestId, "resources");
  }

  public async fillArray(array: string[], addButtonTestId: string, inputName: string): Promise<void> {
    const addButton = this.page.getByTestId(addButtonTestId);

    for (const [index, item] of array.entries()) {
      await addButton.click();
      await this.page.fill(`input[name="${inputName}.${index}"]`, item);
    }
  }

  public async submit(): Promise<void> {
    await this.page.click(this.submitButtonSelector);
  }
}
