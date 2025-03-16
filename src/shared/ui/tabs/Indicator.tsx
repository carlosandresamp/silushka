import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Indicator, TabsIndicatorProps as IndicatorProps } from "@kobalte/core/tabs";
import { splitProps, ValidComponent } from "solid-js";
import { tv, VariantProps } from "tailwind-variants";

export const styles = tv({
  base: "absolute bottom-0 h-0.5 rounded-full bg-bg-accent transition-transform",
});

export type TabsIndicatorVariantProps = VariantProps<typeof styles>;

export type TabsIndicatorProps<T extends ValidComponent = "div"> = IndicatorProps<T> & TabsIndicatorVariantProps;

export const TabsIndicator = <T extends ValidComponent = "div">(props: PolymorphicProps<T, TabsIndicatorProps<T>>) => {
  const [variantProps, otherProps] = splitProps(props as TabsIndicatorProps, []);

  return <Indicator as="div" class={styles(variantProps)} {...otherProps} />;
};

export default TabsIndicator;
