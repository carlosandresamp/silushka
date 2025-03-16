import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { useNavigate } from "@solidjs/router";
import { Match, splitProps, Switch, ValidComponent } from "solid-js";

import { Workout } from "@shared/db";
import Button, { RootProps as ButtonRootProps } from "@shared/ui/button";
import Dropdown from "@shared/ui/dropdown";

import { addWorkoutToFavorites, deleteWorkout, removeWorkoutFromFavorites } from "../model/db";

import BookmarkAddIcon from "~icons/ic/round-bookmark-add";
import BookmarkRemoveIcon from "~icons/ic/round-bookmark-remove";
import DeleteIcon from "~icons/ic/round-delete-outline";
import EditIcon from "~icons/ic/round-mode-edit";
import MoreIcon from "~icons/ic/round-more-vert";

export type WorkoutMoreDropdownOptions = {
  workout: Workout;
  onDelete?: VoidFunction;
};

export type WorkoutMoreDropdownProps<T extends ValidComponent = "button"> = ButtonRootProps<T> &
  WorkoutMoreDropdownOptions;

export const WorkoutMoreDropdown = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, WorkoutMoreDropdownProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as WorkoutMoreDropdownOptions, ["workout"]);

  const navigate = useNavigate();

  return (
    <Dropdown gutter={4} placement="bottom-end">
      <Button
        as={Dropdown.Trigger}
        shape="circle"
        spacing="sm"
        variant="ghost"
        appearance="tertiary"
        aria-label="Ещё"
        {...otherProps}
      >
        <MoreIcon class="size-6" />
      </Button>
      <Dropdown.Content>
        <Dropdown.Item onSelect={() => navigate(`/workouts/${props.workout.id}/edit`)}>
          <EditIcon role="presentation" class="size-6" />
          <Dropdown.ItemLabel>Редактировать</Dropdown.ItemLabel>
        </Dropdown.Item>
        <Switch>
          <Match when={localProps.workout.favorite === true}>
            <Dropdown.Item onSelect={() => removeWorkoutFromFavorites(localProps.workout.id!)}>
              <BookmarkRemoveIcon role="presentation" class="size-6" />
              <Dropdown.ItemLabel>Удалить из избранного</Dropdown.ItemLabel>
            </Dropdown.Item>
          </Match>
          <Match when={localProps.workout.favorite === false}>
            <Dropdown.Item onSelect={() => addWorkoutToFavorites(localProps.workout.id!)}>
              <BookmarkAddIcon role="presentation" class="size-6" />
              <Dropdown.ItemLabel>Добавить в избранное</Dropdown.ItemLabel>
            </Dropdown.Item>
          </Match>
        </Switch>
        <Dropdown.Item
          class="text-fg-destructive"
          onSelect={() => {
            deleteWorkout(localProps.workout.id);
            props.onDelete?.();
          }}
        >
          <DeleteIcon role="presentation" class="size-6" />
          <Dropdown.ItemLabel>Удалить</Dropdown.ItemLabel>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
};
