import WorkoutsEditPage from "./WorkoutsEditPage";

export default class WorkoutsNewPage extends WorkoutsEditPage {
  public async goto(): Promise<void> {
    await this.page.goto("/workouts/new", { waitUntil: "networkidle" });
  }
}
