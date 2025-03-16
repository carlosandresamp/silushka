import {
  Content,
  TabsContentCommonProps as ContentCommonProps,
  TabsContentOptions as ContentOptions,
  TabsContentProps as ContentProps,
  TabsContentRenderProps as ContentRenderProps,
} from "@kobalte/core/tabs";

import Indicator, {
  TabsIndicatorProps as IndicatorProps,
  TabsIndicatorVariantProps as IndicatorVariantProps,
} from "./Indicator";
import List, { TabsListProps as ListProps, TabsListVariantProps as ListVariantProps } from "./List";
import Root, { TabsRootProps as RootProps, TabsRootVariantProps as RootVariantProps } from "./Root";
import Trigger, {
  TabsTriggerBaseProps as TriggerBaseProps,
  TabsTriggerProps as TriggerProps,
  TabsTriggerVariantProps as TriggerVariantProps,
} from "./Trigger";

export type {
  ContentCommonProps,
  ContentOptions,
  ContentProps,
  ContentRenderProps,
  IndicatorProps,
  IndicatorVariantProps,
  ListProps,
  ListVariantProps,
  RootProps,
  RootVariantProps,
  TriggerBaseProps,
  TriggerProps,
  TriggerVariantProps,
};

export { Content, Indicator, List, Root, Trigger };

export const Tabs = Object.assign(Root, {
  Indicator,
  Content,
  List,
  Trigger,
});

export default Tabs;
