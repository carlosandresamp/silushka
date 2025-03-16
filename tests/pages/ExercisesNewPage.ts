import ExercisesEditPage from "./ExercisesEditPage";

export default class ExercisesNewPage extends ExercisesEditPage {
  public async goto(): Promise<void> {
    await this.page.goto("/exercises/new", { waitUntil: "networkidle" });
  }
}
