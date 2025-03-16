import { PolymorphicProps } from "@kobalte/core/polymorphic";
import {
  SeparatorRootRenderProps as RenderProps,
  Root,
  SeparatorRootProps as RootProps,
} from "@kobalte/core/separator";
import { Component, ValidComponent, splitProps } from "solid-js";
import { VariantProps } from "tailwind-variants";

import styles from "./styles";

export type SeparatorRootVariantProps = VariantProps<typeof styles>;

export type SeparatorRootBaseProps = {};

export type SeparatorRootSharedElementProps<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends ValidComponent = "hr",
> = RenderProps & {
  class: string | undefined;
};

export type SeparatorRootElementProps = SeparatorRootSharedElementProps;

export type SeparatorRootProps<T extends ValidComponent = "hr"> = RootProps<T> &
  SeparatorRootVariantProps &
  SeparatorRootBaseProps &
  Partial<SeparatorRootSharedElementProps<T>>;

const SeparatorRoot = <T extends ValidComponent = "hr">(props: PolymorphicProps<T, SeparatorRootProps<T>>) => {
  const [localProps, variantProps, otherProps] = splitProps(props as SeparatorRootProps, ["class"], styles.variantKeys);

  return (
    <Root<Component<Omit<SeparatorRootElementProps, keyof RenderProps>>>
      as="hr"
      // === SharedElementProps ===
      class={styles({ ...variantProps, class: localProps.class })}
      orientation={variantProps.orientation}
      {...otherProps}
    />
  );
};

export default SeparatorRoot;
