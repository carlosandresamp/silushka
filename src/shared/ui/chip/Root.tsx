import { Dynamic, DynamicProps } from "@corvu/utils/dynamic";
import { JSX, ParentProps, Show, splitProps, ValidComponent } from "solid-js";
import { VariantProps } from "tailwind-variants";

import Button from "../button";
import styles from "./styles";

import ClearIcon from "~icons/ic/round-clear";

export type ChipRootVariantProps = VariantProps<typeof styles>;

export type ChipRootBaseProps = {
  onRemove?: JSX.EventHandler<HTMLButtonElement, MouseEvent>;
  clearable?: boolean;
};

export type ChipRootSharedElementProps<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends ValidComponent = "div",
> = ParentProps<{
  class: string | undefined;
}>;

export type ChipRootElementProps = ChipRootSharedElementProps;

export type ChipRootProps<T extends ValidComponent = "div"> = ChipRootVariantProps &
  ChipRootBaseProps &
  Partial<ChipRootSharedElementProps<T>>;

const ChipRoot = <T extends ValidComponent = "div">(props: DynamicProps<T, ChipRootProps>): JSX.Element => {
  const [localProps, otherProps] = splitProps(props as ChipRootProps, ["onRemove", "clearable", "class"]);

  return (
    <Dynamic
      as="div"
      // === SharedElementProps ===
      class={styles().root({ class: localProps.class })}
      {...otherProps}
    >
      <span class={styles().value()}>{props.children}</span>
      <Show when={localProps.clearable}>
        <Button
          class={styles().remove()}
          spacing={0}
          variant="ghost"
          appearance="tertiary"
          aria-label="Удалить"
          onClick={localProps.onRemove}
        >
          <ClearIcon class="size-5" />
        </Button>
      </Show>
    </Dynamic>
  );
};

export default ChipRoot;
