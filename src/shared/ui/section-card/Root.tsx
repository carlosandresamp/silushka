import { Dynamic, DynamicProps } from "@corvu/utils/dynamic";
import { JSX, ParentProps, splitProps, ValidComponent } from "solid-js";
import { VariantProps } from "tailwind-variants";

import NumberTicker from "../number-ticker";
import styles from "./styles";

export type SectionCardRootVariantProps = VariantProps<typeof styles>;

export type SectionCardRootBaseProps = {
  icon: JSX.Element;
  label: string;
  value: number;
};

export type SectionCardRootSharedElementProps<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends ValidComponent = "div",
> = ParentProps<{
  class: string | undefined;
}>;

export type SectionCardRootElementProps = SectionCardRootSharedElementProps;

export type SectionCardRootProps<T extends ValidComponent = "div"> = SectionCardRootVariantProps &
  SectionCardRootBaseProps &
  Partial<SectionCardRootSharedElementProps<T>>;

const SectionCardRoot = <T extends ValidComponent = "div">(props: DynamicProps<T, SectionCardRootProps<T>>) => {
  const [localProps, variantProps, otherProps] = splitProps(
    props as SectionCardRootProps,
    ["icon", "label", "value", "class", "children"],
    styles.variantKeys,
  );

  return (
    <Dynamic<SectionCardRootElementProps>
      as="div"
      // === SharedElementProps ===
      class={styles().root({ ...variantProps, class: localProps.class })}
      {...otherProps}
    >
      <div class={styles().group(variantProps)}>
        <span class={styles().icon(variantProps)}>{localProps.icon}</span>
        <NumberTicker class={styles().value(variantProps)} value={localProps.value} />
      </div>
      <span class={styles().label(variantProps)}>{localProps.label}</span>
    </Dynamic>
  );
};

export default SectionCardRoot;
