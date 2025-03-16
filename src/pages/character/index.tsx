import { Avatar, useCharacter } from "@entities/character";
import { EditCharacterForm } from "@features/character";
import NumberTicker from "@shared/ui/number-ticker";
import { Navigation } from "@widgets/navigation";

import StarIcon from "~icons/ic/round-star";

export default () => {
  const character = useCharacter();

  return (
    <div class="space-y-4">
      <Navigation label="Персонаж" back="/" />

      <div class="flex items-center justify-start gap-4">
        <Avatar class="size-24" />
        <div class="flex items-start justify-center flex-col">
          <h2 class="font-semibold text-3xl">{character.character.name}</h2>
          <div class="flex items-center text-xl">
            <StarIcon class="size-6 text-amber-600" />
            <NumberTicker value={character.character.coins} class="text-fg-primary" />
          </div>
        </div>
      </div>

      <EditCharacterForm />
    </div>
  );
};
