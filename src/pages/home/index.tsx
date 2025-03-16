import { A } from "@solidjs/router";
import { Show } from "solid-js";

import { useCharacter } from "@entities/character";
import { getExercisesCount } from "@entities/exercise";
import { getFavoriteWorkouts, getWorkoutsCount } from "@entities/workout";
import { createSignalQuery, createStoreQuery } from "@shared/db";
import SectionCard from "@shared/ui/section-card";
import { Navigation } from "@widgets/navigation";
import { Progress } from "@widgets/stats";
import { WorkoutList } from "@widgets/workout";

import CheckIcon from "~icons/ic/round-check";
import PlusIcon from "~icons/ic/round-plus";
import ExercisesIcon from "~icons/ic/round-school";
import StarIcon from "~icons/ic/round-star";
import WorkoutsIcon from "~icons/ic/round-surfing";

export default () => {
  const character = useCharacter();

  const exercisesCount = createSignalQuery(() => getExercisesCount());
  const workoutsCount = createSignalQuery(() => getWorkoutsCount());
  const favoriteWorkouts = createStoreQuery(() => getFavoriteWorkouts());

  return (
    <div class="space-y-4">
      <Navigation label={`Привет, ${character.character.name}! 👋`} />

      <div class="space-y-8">
        <section class="grid grid-cols-2 gap-4">
          <SectionCard
            as={A}
            href="/exercises"
            icon={<ExercisesIcon class="size-6.5" />}
            value={exercisesCount() ?? 0}
            appearance="sky"
            label="Упражнения"
          />
          <SectionCard
            as={A}
            href="/workouts"
            icon={<WorkoutsIcon class="size-6.5" />}
            value={workoutsCount() ?? 0}
            appearance="pink"
            label="Тренировки"
          />
          <SectionCard
            as={A}
            href="/workouts"
            icon={<CheckIcon class="size-6.5" />}
            value={character.character.workoutsCompleted}
            appearance="green"
            label="Выполнено тренировок"
            class="col-span-full"
          />
          <SectionCard
            as={A}
            href="/exercises/new"
            icon={<PlusIcon class="size-6.5" />}
            label="Создано упражнений"
            value={character.character.exercisesCreated}
            appearance="sky"
          />
          <SectionCard
            as={A}
            href="/workouts/new"
            icon={<PlusIcon class="size-6.5" />}
            label="Создано тренировок"
            value={character.character.workoutsCreated}
            appearance="pink"
          />
          <SectionCard
            as={A}
            href="/shop"
            label="Всего монет"
            icon={<StarIcon class="size-6.5" />}
            value={character.character.coins}
            appearance="amber"
            class="col-span-full"
          />
        </section>

        <Progress />

        <Show when={favoriteWorkouts.length}>
          <section>
            <h2 class="font-semibold text-xl">Избранные тренировки</h2>

            <WorkoutList workouts={favoriteWorkouts} />
          </section>
        </Show>
      </div>
    </div>
  );
};
