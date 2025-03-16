import { useFormControlContext } from "@kobalte/core";
import { createEffect, createSignal, JSX } from "solid-js";

import Button from "../button";

import ClearIcon from "~icons/ic/round-clear";

export type ClearInputValueButtonProps = {
  class?: string | undefined;
  onClear?: VoidFunction | undefined;
};

export const ClearInputValueButton = (props: ClearInputValueButtonProps) => {
  const context = useFormControlContext();

  const [inputRef, setInputRef] = createSignal<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const clearInputValue: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const input = inputRef();

    if (input === null || input.value === "") {
      return;
    }

    input.value = "";

    props.onClear?.();

    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
  };

  createEffect(() => {
    const fieldId = context.fieldId();

    if (fieldId === undefined) {
      return;
    }

    const input = document.getElementById(fieldId) as HTMLInputElement | HTMLTextAreaElement | null;

    setInputRef(input);
  });

  return (
    <Button
      spacing="xs"
      variant="gray"
      tabIndex={-1}
      appearance="tertiary"
      aria-label="Очистить"
      aria-controls={context.fieldId()}
      disabled={context.isDisabled() || context.isReadOnly()}
      onClick={clearInputValue}
      class={props.class}
    >
      <ClearIcon class="size-5" />
    </Button>
  );
};

export default ClearInputValueButton;
