import { AvatarEditor, useCharacter } from "@entities/character";
import { Navigation } from "@widgets/navigation";

import StarIcon from "~icons/ic/round-star";

export default () => {
  const character = useCharacter();

  return (
    <div class="space-y-4">
      <Navigation
        label="Магазин"
        back="/"
        after={
          <>
            <StarIcon class="size-6 text-amber-600" />
            <span class="text-xl leading-none font-semibold">{character.character.coins}</span>
          </>
        }
      />

      <AvatarEditor />
    </div>
  );
};
