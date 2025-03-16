import Character from "tests/types/Character";

export default class CharacterFactory {
  public static create(overrides: Partial<Character> = {}): Character {
    const character: Character = {
      name: "Вася",
      weight: "55.15",
      height: "175.2",
      birthday: "2008-07-27",
      goal: "3",
    };

    return { ...character, ...overrides };
  }
}
