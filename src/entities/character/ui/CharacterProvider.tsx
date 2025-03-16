import { ParentComponent } from "solid-js";

import { CharacterContext } from "../model/context";
import { createCharacter } from "../model/state";

export const CharacterProvider: ParentComponent = (props) => {
  const [character, setCharacter] = createCharacter();

  return (
    <CharacterContext.Provider
      value={{
        character,
        setCharacter,
      }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
};
