import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { splitProps, ValidComponent } from "solid-js";
import { tv, VariantProps } from "tailwind-variants";

export const styles = tv({
  base: "relative my-3 ms-3 space-y-6 border-s border-bg-primary",
});

export type TimelineRootVariantProps = VariantProps<typeof styles>;

export type TimelineRootRenderProps = {
  class?: string | undefined;
};

export type TimelineRootProps = TimelineRootRenderProps & TimelineRootVariantProps;

export const TimelineRoot = <T extends ValidComponent = "ol">(props: PolymorphicProps<T, TimelineRootProps>) => {
  const [variantProps, otherProps] = splitProps(props as TimelineRootProps, ["class"]);

  return <Polymorphic<TimelineRootRenderProps> as="ol" class={styles(variantProps)} {...otherProps} />;
};

export default TimelineRoot;
