import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Root, TabsRootProps as RootProps } from "@kobalte/core/tabs";
import { splitProps, ValidComponent } from "solid-js";
import { tv, VariantProps } from "tailwind-variants";

export const styles = tv({
  base: "space-y-4",
});

export type TabsRootVariantProps = VariantProps<typeof styles>;

export type TabsRootProps<T extends ValidComponent = "div"> = RootProps<T> & TabsRootVariantProps;

export const TabsRoot = <T extends ValidComponent = "div">(props: PolymorphicProps<T, TabsRootProps<T>>) => {
  const [variantProps, otherProps] = splitProps(props as TabsRootProps, []);

  return <Root as="div" class={styles(variantProps)} {...otherProps} />;
};

export default TabsRoot;
