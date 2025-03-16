import { PolymorphicProps } from "@kobalte/core";
import {
  Content,
  Description,
  ErrorMessage,
  HiddenSelect,
  Icon,
  Item,
  ItemIndicator,
  ItemLabel,
  Label,
  Listbox,
  Portal,
  Root,
  SelectRootProps,
  Trigger,
  Value,
} from "@kobalte/core/select";
import { createEffect, createMemo, createSignal, For, JSX, Show, splitProps, ValidComponent } from "solid-js";
import { VariantProps } from "tailwind-variants";

import Button from "../button";
import Chip from "../chip";
import Collapse from "../collapse";
import { RootOption as SelectRootOption, styles } from "../select";
import { styles as baseStyles } from "../text-field";

import CheckIcon from "~icons/ic/round-check";
import ClearIcon from "~icons/ic/round-clear";
import ChevronDownIcon from "~icons/ic/round-keyboard-arrow-down";

export type MultiSelectRootBaseProps = {
  name?: string;
  label?: JSX.Element;
  placeholder?: JSX.Element;
  description?: JSX.Element;
  value?: string[] | undefined;
  error?: JSX.Element;
  options: SelectRootOption[];
  ref?: (element: HTMLSelectElement) => void;
  onRawChange?: (value: string[] | undefined) => void;
  onInput?: JSX.EventHandler<HTMLSelectElement, InputEvent>;
  onChange?: JSX.EventHandler<HTMLSelectElement, Event>;
  onBlur?: JSX.EventHandler<HTMLSelectElement, FocusEvent>;
  class?: string | undefined;
  required?: boolean | undefined;
  disabled?: boolean | undefined;
  clearable?: boolean | undefined;
  before?: JSX.Element;
  after?: JSX.Element;
};

export type MultiSelectRootVariantProps = VariantProps<typeof baseStyles>;

export type MultiSelectRootProps<T extends ValidComponent = "div"> = MultiSelectRootVariantProps &
  MultiSelectRootBaseProps &
  Omit<
    SelectRootProps<T>,
    "ref" | "onInput" | "onBlur" | "multiple" | "value" | "onChange" | "options" | "optionValue" | "optionTextValue"
  >;

const MultiSelectRoot = <T extends ValidComponent = "div">(props: PolymorphicProps<T, MultiSelectRootProps>) => {
  const [variantBaseProps, localProps, inputProps, otherProps] = splitProps(
    props,
    ["plain"],
    ["class", "before", "after", "value", "onRawChange"],
    ["onChange", "onBlur", "onInput", "ref"],
  );

  const variantProps = {
    ...variantBaseProps,
    required: otherProps.required,
  } satisfies MultiSelectRootVariantProps;

  const [value, setValue] = createSignal<SelectRootOption[]>([]);
  const validationState = createMemo<"valid" | "invalid" | undefined>(() => (props.error ? "invalid" : undefined));

  const onChange = (options: SelectRootOption[]): void => {
    setValue(options);
    localProps.onRawChange?.(options.map((option) => option.value));
  };

  createEffect(() => {
    setValue(props.options.filter((option) => props.value?.includes(option.value) ?? false));
  });

  return (
    <Root<SelectRootOption>
      modal
      multiple
      gutter={4}
      value={value()}
      onChange={onChange}
      class={styles().root({ ...variantProps, class: localProps.class })}
      optionValue="value"
      optionTextValue="label"
      validationState={validationState()}
      itemComponent={(props) => (
        <Item class={styles().item(variantProps)} item={props.item}>
          <Show when={props.item.rawValue.before}>{(before) => <div class="me-1">{before()}</div>}</Show>
          <ItemLabel class="grow">{props.item.textValue}</ItemLabel>
          <Show when={props.item.rawValue.after}>{(after) => <div class="ms-1">{after()}</div>}</Show>
          <ItemIndicator as={CheckIcon} class="text-fg-accent size-5" />
        </Item>
      )}
      aria-label={
        typeof otherProps.label === "string"
          ? otherProps.label
          : typeof otherProps.placeholder === "string"
            ? otherProps.placeholder
            : undefined
      }
      {...otherProps}
    >
      <Show when={props.label}>{(label) => <Label class={styles().label(variantProps)}>{label()}</Label>}</Show>

      <HiddenSelect {...inputProps} />

      <Trigger class={styles().wrapper(variantProps)}>
        <Show when={localProps.before}>{(before) => <div class={styles().before(variantProps)}>{before()}</div>}</Show>

        <Value<SelectRootOption> class={styles().input(variantProps)}>
          {(state) => (
            <>
              <ul class="flex grow gap-1.5 h-fit flex-wrap">
                <For each={state.selectedOptions()}>
                  {(option) => (
                    <Chip
                      as="li"
                      onRemove={() => state.remove(option)}
                      onPointerDown={(e) => e.stopPropagation()}
                      clearable
                    >
                      {option.label}
                    </Chip>
                  )}
                </For>
              </ul>
              <Show when={props.clearable}>
                <div class="flex items-center pe-0.5 -m-1.5">
                  <Button
                    aria-label="Очистить"
                    spacing="xs"
                    appearance="tertiary"
                    variant="gray"
                    tabIndex={-1}
                    onClick={state.clear}
                    onPointerDown={(e) => e.stopPropagation()}
                  >
                    <ClearIcon class="size-5" />
                  </Button>
                </div>
              </Show>
            </>
          )}
        </Value>

        <Show when={localProps.after}>{(after) => <div class={styles().after(variantProps)}>{after()}</div>}</Show>

        <div class={styles().after({ ...variantProps, class: !variantProps.plain && "me-2" })}>
          <Icon as={ChevronDownIcon} class="size-5 text-fg-tertiary data-expanded:rotate-180" />
        </div>
      </Trigger>

      <Show when={props.description}>
        {(description) => <Description class={styles().description(variantProps)}>{description()}</Description>}
      </Show>

      <Collapse>
        <ErrorMessage class={styles().error(variantProps)}>{props.error}</ErrorMessage>
      </Collapse>

      <Portal>
        <Content class={styles().content(variantProps)}>
          <Listbox class={styles().listbox(variantProps)} />
        </Content>
      </Portal>
    </Root>
  );
};

export default MultiSelectRoot;
