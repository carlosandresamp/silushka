import { createContext, useContext } from "solid-js";

import { CharacterState } from "./state";

export const CharacterContext = createContext<CharacterState>();

export const useCharacter = (): CharacterState => {
  const context = useContext(CharacterContext);

  if (context === undefined) {
    throw new Error("The 'useCharacter' primitive must be used within a <CharacterProvider> component.");
  }

  return context;
};
