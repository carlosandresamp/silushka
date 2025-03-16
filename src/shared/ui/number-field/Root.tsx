import { mergeRefs } from "@corvu/utils/reactivity";
import {
  DecrementTrigger,
  Description,
  ErrorMessage,
  HiddenInput,
  IncrementTrigger,
  Input,
  Label,
  Root,
} from "@kobalte/core/number-field";
import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { createEffect, createMemo, createSignal, JSX, mergeProps, Show, splitProps, ValidComponent } from "solid-js";
import { VariantProps } from "tailwind-variants";

import Button from "../button";
import Collapse from "../collapse";
import styles from "./styles";

import MinusIcon from "~icons/ic/round-minus";
import PlusIcon from "~icons/ic/round-plus";

export type NumberFieldRootBaseProps = {
  value?: string | number | undefined;
  label?: JSX.Element;
  description?: JSX.Element;
  error?: JSX.Element;
  before?: JSX.Element;
  after?: JSX.Element;
  minValue?: number;
  maxValue?: number;
  step?: number;
  largeStep?: number;
  changeOnWheel?: boolean;
  format?: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  allowedInput?: RegExp;
};

export type NumberFieldRootVariantProps = VariantProps<typeof styles>;

export type NumberFieldRootProps = JSX.InputHTMLAttributes<HTMLInputElement> &
  NumberFieldRootVariantProps &
  NumberFieldRootBaseProps;

const NumberFieldRoot = <T extends ValidComponent = "div">(props: PolymorphicProps<T, NumberFieldRootProps>) => {
  const defaultedProps = mergeProps(
    {
      value: "",
    } satisfies Partial<NumberFieldRootProps>,
    props,
  );

  const [variantBaseProps, localProps, rootProps, inputProps] = splitProps(
    defaultedProps as NumberFieldRootProps,
    ["plain"],
    ["ref", "class", "value", "label", "description", "error", "before", "after"],
    ["minValue", "maxValue", "step", "largeStep", "changeOnWheel", "format", "formatOptions", "allowedInput"],
  );

  const variantProps = {
    ...variantBaseProps,
    required: inputProps.required,
  } satisfies NumberFieldRootVariantProps;

  const [value, setValue] = createSignal<string | number | undefined>(props.value ?? undefined);
  const [inputRef, setInputRef] = createSignal<HTMLInputElement | null>(null);
  const validationState = createMemo<"valid" | "invalid" | undefined>(() => (localProps.error ? "invalid" : undefined));

  createEffect(() => {
    if (props.value !== "" && !Number.isNaN(props.value)) {
      setValue(props.value);
    }
  });

  const onRawValueChange = (newValue: number): void => {
    setValue(newValue);

    const input = inputRef();

    if (input === null || input.value === "") {
      return;
    }

    input.value = newValue.toString();

    input.dispatchEvent(new Event("input", { bubbles: true }));
  };

  return (
    <Root
      id={inputProps.id}
      name={inputProps.name}
      rawValue={Number(value())}
      onRawValueChange={onRawValueChange}
      required={inputProps.required}
      disabled={inputProps.disabled}
      readOnly={inputProps.readOnly}
      validationState={validationState()}
      translations={{ empty: "Пусто" }}
      class={styles().root({ ...variantProps, class: localProps.class })}
      aria-label={typeof localProps.label === "string" ? localProps.label : inputProps.placeholder}
      {...rootProps}
    >
      <Show when={localProps.label}>{(label) => <Label class={styles().label(variantProps)}>{label()}</Label>}</Show>

      <HiddenInput type="number" ref={mergeRefs(localProps.ref, setInputRef)} {...inputProps} />

      <div class={styles().wrapper(variantProps)}>
        <Show when={localProps.before}>{(before) => <div class={styles().before(variantProps)}>{before()}</div>}</Show>

        <Input class={styles().input(variantProps)} placeholder={inputProps.placeholder} />

        <Show when={localProps.after}>{(after) => <div class={styles().after(variantProps)}>{after()}</div>}</Show>

        <div class={styles().after(variantProps)}>
          <Button as={DecrementTrigger} spacing="xs" variant="gray" appearance="tertiary" aria-label="Уменьшить">
            <MinusIcon class="size-5" />
          </Button>
          <Button as={IncrementTrigger} spacing="xs" variant="gray" appearance="tertiary" aria-label="Увеличить">
            <PlusIcon class="size-5" />
          </Button>
        </div>
      </div>

      <Show when={localProps.description}>
        {(description) => <Description class={styles().description(variantProps)}>{description()}</Description>}
      </Show>

      <Collapse>
        <ErrorMessage class={styles().error(variantProps)}>{localProps.error}</ErrorMessage>
      </Collapse>
    </Root>
  );
};

export default NumberFieldRoot;
