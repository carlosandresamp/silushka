import { Dynamic, DynamicProps } from "@corvu/utils/dynamic";
import { createMemo, ParentProps, splitProps, ValidComponent } from "solid-js";
import { VariantProps } from "tailwind-variants";

import { hash } from "@shared/lib/hash";

import styles from "./styles";

import TagIcon from "~icons/ic/round-tag";

export type TagRootVariantProps = VariantProps<typeof styles>;

export type TagRootBaseProps = {
  value: string;
};

export type TagRootSharedElementProps<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends ValidComponent = "div",
> = ParentProps<{
  class: string | undefined;
}>;

export type TagRootElementProps = TagRootSharedElementProps;

export type TagRootProps<T extends ValidComponent = "div"> = TagRootVariantProps &
  TagRootBaseProps &
  Partial<TagRootSharedElementProps<T>>;

const APPEARANCES = Object.keys(styles.variants.appearance) as (keyof typeof styles.variants.appearance)[];

const TagRoot = <T extends ValidComponent = "div">(props: DynamicProps<T, TagRootProps<T>>) => {
  const [localProps, variantProps, otherProps] = splitProps(
    props as TagRootProps,
    ["value", "class"],
    styles.variantKeys,
  );

  const appearance = createMemo(() => APPEARANCES[Math.abs(hash(props.value)) % APPEARANCES.length]);

  return (
    <Dynamic<TagRootElementProps>
      as="div"
      // === SharedElementProps ===
      class={styles().root({ appearance: appearance(), ...variantProps, class: localProps.class })}
      {...otherProps}
    >
      <TagIcon role="presentation" class={styles().icon(variantProps)} />
      <span>{localProps.value}</span>
    </Dynamic>
  );
};

export default TagRoot;
