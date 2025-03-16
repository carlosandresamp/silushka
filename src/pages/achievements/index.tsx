import { For } from "solid-js";

import { AchievementCard, achievements } from "@entities/character";
import { Navigation } from "@widgets/navigation";

export default () => {
  return (
    <div class="space-y-4">
      <Navigation label="Достижения" back="/" />

      <ul class="divide-y divide-bg-primary">
        <For each={achievements}>{(achievement) => <AchievementCard achievement={achievement} />}</For>
      </ul>
    </div>
  );
};
