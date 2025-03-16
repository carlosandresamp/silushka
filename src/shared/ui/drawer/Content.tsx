import Drawer, { ContentSharedElementProps, DynamicProps } from "@corvu/drawer";
import { Component, ParentProps, splitProps, ValidComponent } from "solid-js";

import styles from "./styles";

const OVERLAY_DARKEN_PERCENTAGE = 0.5;

export type DrawerContentBaseProps = {};

export type DrawerContentSharedElementProps<T extends ValidComponent = "div"> = ContentSharedElementProps<T> &
  ParentProps<{
    class: string | undefined;
  }>;

export type DrawerContentElementProps = DrawerContentSharedElementProps;

export type DrawerContentProps<T extends ValidComponent = "div"> = DrawerContentBaseProps &
  Partial<DrawerContentSharedElementProps<T>>;

const DrawerContent = <T extends ValidComponent = "div">(props: DynamicProps<T, DrawerContentProps>) => {
  const context = Drawer.useContext();

  const [localProps, otherProps] = splitProps(props as DrawerContentProps, ["class"]);

  return (
    <Drawer.Portal>
      <Drawer.Overlay
        class={styles().overlay()}
        style={{
          "background-color": `rgb(0 0 0 / ${context.openPercentage() * OVERLAY_DARKEN_PERCENTAGE})`,
        }}
      />
      <Drawer.Content<Component<Omit<DrawerContentElementProps, keyof ContentSharedElementProps>>>
        as="div"
        // === SharedElementProps ===
        class={styles().content({ class: localProps.class })}
        {...otherProps}
      >
        {props.children}
      </Drawer.Content>
    </Drawer.Portal>
  );
};

export default DrawerContent;
