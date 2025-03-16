import Item, {
  TimelineItemProps as ItemProps,
  TimelineItemRenderProps as ItemRenderProps,
  TimelineItemVariantProps as ItemVariantProps,
  styles as itemStyles,
} from "./Item";
import ItemIcon, {
  TimelineItemIconProps as ItemIconProps,
  TimelineItemIconRenderProps as ItemIconRenderProps,
  TimelineItemIconVariantProps as ItemIconVariantProps,
  styles as itemIconStyles,
} from "./ItemIcon";
import Root, {
  TimelineRootProps as RootProps,
  TimelineRootRenderProps as RootRenderProps,
  TimelineRootVariantProps as RootVariantProps,
  styles as rootStyles,
} from "./Root";

export type {
  ItemIconProps,
  ItemIconRenderProps,
  ItemIconVariantProps,
  ItemProps,
  ItemRenderProps,
  ItemVariantProps,
  RootProps,
  RootRenderProps,
  RootVariantProps,
};

export { Item, ItemIcon, Root, itemIconStyles, itemStyles, rootStyles };

export const Timeline = Object.assign(Root, {
  Item,
  ItemIcon,
});

export default Timeline;
