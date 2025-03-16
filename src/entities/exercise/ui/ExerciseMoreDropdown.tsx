import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { useNavigate } from "@solidjs/router";
import { splitProps, ValidComponent } from "solid-js";

import { Exercise } from "@shared/db";
import Button, { RootProps as ButtonRootProps } from "@shared/ui/button";
import Dropdown from "@shared/ui/dropdown";

import { deleteExercise } from "../model/db";

import DeleteIcon from "~icons/ic/round-delete-outline";
import EditIcon from "~icons/ic/round-mode-edit";
import MoreIcon from "~icons/ic/round-more-vert";

export type ExerciseMoreDropdownOptions = {
  exercise: Exercise;
  onDelete?: VoidFunction;
};

export type ExerciseMoreDropdownProps<T extends ValidComponent = "button"> = ButtonRootProps<T> &
  ExerciseMoreDropdownOptions;

export const ExerciseMoreDropdown = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, ExerciseMoreDropdownProps<T>>,
) => {
  const [localProps, otherProps] = splitProps(props as ExerciseMoreDropdownOptions, ["exercise"]);

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
        <Dropdown.Item onSelect={() => navigate(`/exercises/${props.exercise.id}/edit`)}>
          <EditIcon role="presentation" class="size-6" />
          <Dropdown.ItemLabel>Редактировать</Dropdown.ItemLabel>
        </Dropdown.Item>
        <Dropdown.Item
          class="text-fg-destructive"
          onSelect={() => {
            deleteExercise(localProps.exercise.id);
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
