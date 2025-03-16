import { A } from "@solidjs/router";
import { ConfettiExplosion } from "solid-confetti-explosion";

import { useCharacter } from "@entities/character";
import Button from "@shared/ui/button";
import SectionCard from "@shared/ui/section-card";
import Stepper from "@shared/ui/stepper";

import useWorkoutStepperContext from "../model/context";

import CheckIcon from "~icons/ic/round-check";
import SkipIcon from "~icons/ic/round-skip-next";
import StarIcon from "~icons/ic/round-star";
import TimerIcon from "~icons/ic/round-timer";

export const WorkoutStepperFinishStep = () => {
  const context = useWorkoutStepperContext();
  const character = useCharacter();

  return (
    <Stepper.Step class="flex grow flex-col items-center justify-center text-center" onEnter={context.end}>
      <ConfettiExplosion />

      <div class="flex flex-col items-stretch w-full justify-center text-center space-y-4">
        <hgroup>
          <h2 class="font-semibold text-fg-primary text-2xl">Тренировка завершена!</h2>
          <p class="text-lg mt-1">Молодец, {character.character.name}!</p>
        </hgroup>

        <div class="grid w-full grid-cols-2 gap-2">
          <SectionCard
            label="Выполнено"
            icon={<CheckIcon class="size-6.5" />}
            value={context.completed}
            data-testid="completed"
            appearance="green"
          />
          <SectionCard
            label="Пропущено"
            icon={<SkipIcon class="size-6.5" />}
            value={context.skipped}
            data-testid="skipped"
            appearance="gray"
          />
          <SectionCard
            label="Заработано"
            icon={<StarIcon class="size-6.5" />}
            value={context.coins}
            appearance="amber"
          />
          <SectionCard
            label="Прошло минут"
            icon={<TimerIcon class="size-6.5" />}
            value={Math.floor(context.elapsed / 1000 / 60)}
            appearance="sky"
          />
        </div>

        <Button
          as={A}
          href={context.workout.id ? `/workouts/${context.workout.id}` : "/workouts"}
          draggable={false}
          spacing="lg"
          appearance="feature"
          stretched
          shimmer
        >
          Готово
        </Button>
      </div>
    </Stepper.Step>
  );
};
