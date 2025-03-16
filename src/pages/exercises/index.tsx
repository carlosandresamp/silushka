import { ToggleButton } from "@kobalte/core/toggle-button";
import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

import {
  createFilterableExercisesList,
  getExerciseDifficultyDisplayName,
  getExerciseUniqueEquipment,
  getExerciseUniqueTags,
} from "@entities/exercise";
import { createStoreQuery, ExerciseDifficulty } from "@shared/db";
import Button from "@shared/ui/button";
import Collapse from "@shared/ui/collapse";
import MultiSelect from "@shared/ui/multi-select";
import TextField from "@shared/ui/text-field";
import { ExerciseList } from "@widgets/exercise";
import { Navigation } from "@widgets/navigation";

import BarChartIcon from "~icons/ic/round-bar-chart";
import FilterIcon from "~icons/ic/round-filter-list";
import PlusIcon from "~icons/ic/round-plus";
import ScaleIcon from "~icons/ic/round-scale";
import SearchIcon from "~icons/ic/round-search";
import TagIcon from "~icons/ic/round-tag";

export default () => {
  const [showFilters, setShowFilters] = createSignal<boolean>(false);

  const list = createFilterableExercisesList();
  const exerciseUniqueTags = createStoreQuery(() => getExerciseUniqueTags());
  const exerciseUniqueEquipment = createStoreQuery(() => getExerciseUniqueEquipment());

  return (
    <div class="space-y-2">
      <Navigation
        label="Упражнения"
        back="/"
        after={
          <>
            <Button
              as={ToggleButton}
              shape="circle"
              spacing="sm"
              variant="ghost"
              appearance="tertiary"
              aria-label={showFilters() ? "Скрыть фильтры" : "Показать фильтры"}
              pressed={showFilters()}
              onChange={setShowFilters}
            >
              <FilterIcon class="size-6" />
            </Button>
            <Button
              as={A}
              shape="circle"
              spacing="sm"
              variant="ghost"
              appearance="accent"
              aria-label="Добавить упражнение"
              href="/exercises/new"
            >
              <PlusIcon class="size-6" />
            </Button>
          </>
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

      <Collapse>
        <Show when={showFilters()}>
          <section class="space-y-2 p-px">
            <MultiSelect
              placeholder="Теги"
              value={list.tags()}
              onRawChange={list.setTags}
              options={exerciseUniqueTags.map((tag) => ({
                value: tag,
                label: tag,
              }))}
              clearable
              before={<TagIcon class="ms-1 -me-1.5 size-5 text-fg-tertiary" />}
            />
            <MultiSelect
              placeholder="Оборудование"
              value={list.equipment()}
              onRawChange={list.setEquipment}
              options={exerciseUniqueEquipment.map((equipment) => ({
                value: equipment,
                label: equipment,
              }))}
              clearable
              before={<BarChartIcon class="ms-1 -me-1.5 size-5 text-fg-tertiary" />}
            />
            <MultiSelect
              placeholder="Сложность"
              value={list.difficulty()}
              onRawChange={list.setDifficulty}
              options={Object.values(ExerciseDifficulty).map((difficulty) => ({
                value: difficulty,
                label: getExerciseDifficultyDisplayName(difficulty),
              }))}
              clearable
              before={<ScaleIcon class="ms-1 -me-1.5 size-5 text-fg-tertiary" />}
            />
          </section>
        </Show>
      </Collapse>

      <ExerciseList exercises={list.exercises} />
    </div>
  );
};
