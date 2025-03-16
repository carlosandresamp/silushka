import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Trigger, TabsTriggerProps as TriggerProps } from "@kobalte/core/tabs";
import { JSX, ParentProps, Show, splitProps, ValidComponent } from "solid-js";
import { tv, VariantProps } from "tailwind-variants";

export const styles = tv({
  base: [
    "flex w-full cursor-pointer items-center justify-center gap-1 outline-none",
    "px-4 py-1.5 font-semibold text-fg-tertiary",
    "transition",
    "hover:opacity-75",
    "active:opacity-50 active:transition-none",
    "data-selected:text-fg-accent",
  ],
});

export type TabsTriggerVariantProps = VariantProps<typeof styles>;

export type TabsTriggerBaseProps = {
  before?: JSX.Element;
  after?: JSX.Element;
};

export type TabsTriggerProps<T extends ValidComponent = "button"> = ParentProps<
  TriggerProps<T> & TabsTriggerVariantProps & TabsTriggerBaseProps
>;

export const TabsTrigger = <T extends ValidComponent = "button">(props: PolymorphicProps<T, TabsTriggerProps<T>>) => {
  const [variantProps, localProps, otherProps] = splitProps(
    props as TabsTriggerProps,
    [],
    ["children", "before", "after"],
  );

  return (
    <Trigger as="button" class={styles(variantProps)} {...otherProps}>
      <Show when={localProps.before}>{(before) => <div>{before()}</div>}</Show>
      <div>{props.children}</div>
      <Show when={localProps.after}>{(after) => <div>{after()}</div>}</Show>
    </Trigger>
  );
};

export default TabsTrigger;
