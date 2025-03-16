import { PolymorphicProps } from "@kobalte/core/polymorphic";
import { List, TabsListProps as ListProps } from "@kobalte/core/tabs";
import { splitProps, ValidComponent } from "solid-js";
import { tv, VariantProps } from "tailwind-variants";

export const styles = tv({
  base: ["relative flex items-stretch", "overflow-x-auto overflow-y-visible", "border-b border-bg-primary "],
});

export type TabsListVariantProps = VariantProps<typeof styles>;

export type TabsListProps<T extends ValidComponent = "div"> = ListProps<T> & TabsListVariantProps;

export const TabsList = <T extends ValidComponent = "div">(props: PolymorphicProps<T, TabsListProps<T>>) => {
  const [variantProps, otherProps] = splitProps(props as TabsListProps, []);

  return <List as="div" class={styles(variantProps)} {...otherProps} />;
};

export default TabsList;
