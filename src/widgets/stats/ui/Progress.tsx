import { createMemo } from "solid-js";

import { useCharacter } from "@entities/character";
import { getCompletedWorkoutsCountForCurrentWeek } from "@entities/workout";
import { createSignalQuery } from "@shared/db";
import ProgressCircle from "@shared/ui/progress-circle";

const messages = [
  { threshold: 100, message: "Вы достигли своей цели! Отличная работа!" },
  { threshold: 75, message: "Вы на верном пути! Продолжайте в том же духе!" },
  { threshold: 50, message: "Вы можете сделать больше! Постарайтесь увеличить количество тренировок." },
  { threshold: 25, message: "Не забывайте о своих целях! Начните тренироваться чаще." },
  { threshold: 0, message: "Пора активизироваться! Найдите время для тренировок." },
];

export const getMessageByWorkoutsCompletionPercentage = (percentage: number) => {
  return messages.find((message) => percentage >= message.threshold)?.message;
};

export const Progress = () => {
  const character = useCharacter();

  const count = createSignalQuery(() => getCompletedWorkoutsCountForCurrentWeek());
  const percentage = createMemo(() =>
    !count() ? 0 : Math.min(Math.round((count()! / character.character.goal) * 100), 100),
  );
  const message = createMemo(() => getMessageByWorkoutsCompletionPercentage(percentage()));

  return (
    <section class="flex gap-4 max-md:flex-col max-md:items-center max-md:justify-center max-md:text-center">
      <ProgressCircle value={percentage()} size="lg">
        <span class="text-3xl leading-none font-semibold">{count()}</span>
        <div class="flex items-center justify-center gap-1">
          <span class="text-sm leading-none text-fg-tertiary">из</span>
          <span class="leading-none font-medium text-fg-primary">{character.character.goal}</span>
        </div>
      </ProgressCircle>
      <div class="flex grow flex-col justify-center gap-2 max-md:items-center">
        <h2 class="text-xl leading-none font-semibold">Цель тренировок на неделю</h2>
        <p class="leading-tight text-fg-primary">{message()}</p>
      </div>
    </section>
  );
};
