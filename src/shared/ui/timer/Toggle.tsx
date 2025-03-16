import { callEventHandler, ElementOf } from "@corvu/utils/dom";
import {
  DynamicButton,
  DynamicButtonElementProps,
  DynamicButtonSharedElementProps,
  DynamicProps,
} from "@corvu/utils/dynamic";
import { Component, createMemo, JSX, splitProps, ValidComponent } from "solid-js";

import useTimerContext from "./context";

export type TimerToggleSharedElementProps<T extends ValidComponent = "button"> = {
  disabled: boolean;
  onClick: JSX.EventHandlerUnion<ElementOf<T>, MouseEvent>;
} & DynamicButtonSharedElementProps<T>;

export type TimerToggleElementProps = TimerToggleSharedElementProps & DynamicButtonElementProps;

export type TimerToggleProps<T extends ValidComponent = "button"> = Partial<TimerToggleSharedElementProps<T>>;

export const TimerToggle = <T extends ValidComponent = "button">(props: DynamicProps<T, TimerToggleProps<T>>) => {
  const [localProps, otherProps] = splitProps(props as TimerToggleProps, ["disabled", "onClick"]);

  const context = useTimerContext();

  const disabled = createMemo(() => context.ended || localProps.disabled || false);

  const onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (event) => {
    !callEventHandler(localProps.onClick, event) && context.toggle();
  };

  return (
    <DynamicButton<Component<Omit<TimerToggleElementProps, keyof DynamicButtonElementProps>>>
      as="button"
      disabled={disabled()}
      onClick={onClick}
      {...otherProps}
    />
  );
};

export default TimerToggle;
