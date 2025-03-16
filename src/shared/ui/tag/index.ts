import Root, {
  TagRootBaseProps as RootBaseProps,
  TagRootElementProps as RootElementProps,
  TagRootProps as RootProps,
  TagRootSharedElementProps as RootSharedElementProps,
  TagRootVariantProps as RootVariantProps,
} from "./Root";
import styles from "./styles";

export type { RootBaseProps, RootElementProps, RootProps, RootSharedElementProps, RootVariantProps };

export { Root, styles };

export const Tag = Root;

export default Tag;
