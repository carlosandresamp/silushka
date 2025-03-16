import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { splitProps, ValidComponent } from "solid-js";
import { tv, VariantProps } from "tailwind-variants";

export type TimelineItemVariantProps = VariantProps<typeof styles>;

export type TimelineItemRenderProps = {
  class?: string | undefined;
};

export type TimelineItemProps = TimelineItemRenderProps & TimelineItemVariantProps;

export const styles = tv({
  base: "ms-6",
});

export const TimelineItem = <T extends ValidComponent = "li">(props: PolymorphicProps<T, TimelineItemProps>) => {
  const [variantProps, otherProps] = splitProps(props as TimelineItemProps, ["class"]);

  return <Polymorphic as="li" class={styles(variantProps)} {...otherProps} />;
};

export default TimelineItem;
