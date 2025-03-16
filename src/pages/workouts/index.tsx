import { A } from "@solidjs/router";

import { createFilterableWorkoutsList } from "@entities/workout";
import Button from "@shared/ui/button";
import TextField from "@shared/ui/text-field";
import { Navigation } from "@widgets/navigation";
import { WorkoutList } from "@widgets/workout";

import PlusIcon from "~icons/ic/round-plus";
import SearchIcon from "~icons/ic/round-search";

export default () => {
  const list = createFilterableWorkoutsList();

  return (
    <div class="space-y-2">
      <Navigation
        label="Тренировки"
        back="/"
        after={
          <Button
            as={A}
            shape="circle"
            spacing="sm"
            variant="ghost"
            appearance="accent"
            aria-label="Добавить упражнение"
            href="/workouts/new"
          >
            <PlusIcon class="size-6" />
          </Button>
        }
      />

      <TextField
        type="search"
        placeholder="Поиск"
        value={list.search()}
        onInput={(event) => list.setSearch(event.currentTarget.value)}
        before={<SearchIcon class="ms-1 -me-1.5 size-5 text-fg-tertiary" />}
        clearable
      />

      <WorkoutList workouts={list.workouts} />
    </div>
  );
};
