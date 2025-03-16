import { callEventHandler, ElementOf } from "@corvu/utils/dom";
import {
  DynamicButton,
  DynamicButtonElementProps,
  DynamicButtonSharedElementProps,
  DynamicProps,
} from "@corvu/utils/dynamic";
import { Component, createMemo, JSX, splitProps, ValidComponent } from "solid-js";

import useTimerContext from "./context";

export type TimerTriggerAction = "add" | "sub";

export type TimerTriggerBaseProps = {
  seconds: number;
  action: TimerTriggerAction;
};

export type TimerTriggerSharedElementProps<T extends ValidComponent = "button"> = {
  disabled: boolean;
  onClick: JSX.EventHandlerUnion<ElementOf<T>, MouseEvent>;
} & DynamicButtonSharedElementProps<T>;

export type TimerTriggerElementProps = TimerTriggerSharedElementProps & DynamicButtonElementProps;

export type TimerTriggerProps<T extends ValidComponent = "button"> = TimerTriggerBaseProps &
  Partial<TimerTriggerSharedElementProps<T>>;

export const TimerTrigger = <T extends ValidComponent = "button">(props: DynamicProps<T, TimerTriggerProps<T>>) => {
  const [localProps, otherProps] = splitProps(props as TimerTriggerProps, ["action", "seconds", "disabled", "onClick"]);

  const context = useTimerContext();

  const disabledMap: Record<TimerTriggerAction, () => boolean> = {
    add: () => context.ended || context.seconds <= context.min,
    sub: () => context.ended || context.seconds >= context.max,
  };

  const onClickMap: Record<TimerTriggerAction, VoidFunction> = {
    add: () => context.setSeconds((prev) => Math.max(prev + localProps.seconds, context.min)),
    sub: () => context.setSeconds((prev) => Math.min(prev - localProps.seconds, context.max)),
  };

  const disabled = createMemo(() => disabledMap[localProps.action]());

  const onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent> = (event) => {
    !callEventHandler(localProps.onClick, event) && onClickMap[localProps.action]();
  };

  return (
    <DynamicButton<Component<Omit<TimerTriggerElementProps, keyof DynamicButtonElementProps>>>
      as="button"
      disabled={disabled()}
      onClick={onClick}
      {...otherProps}
    />
  );
};

export default TimerTrigger;
