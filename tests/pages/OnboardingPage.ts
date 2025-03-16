import CharacterPage from "./CharacterPage";

export default class OnboardingPage extends CharacterPage {
  public async goto(): Promise<void> {
    await this.page.goto("/", { waitUntil: "networkidle" });
  }
}
