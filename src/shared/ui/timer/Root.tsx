import { Component, JSX, splitProps } from "solid-js";

import { createChildrenProps } from "@shared/lib/children";

import { TimerContext } from "./context";
import createCountdownTimer, {
  CREATE_COUNTDOWN_TIMER_PROPS_KEYS,
  CreateCountdownTimerProps,
  CreateCountdownTimerReturn,
} from "./create";

export type TimerRootChildrenProps = CreateCountdownTimerReturn;

export type TimerRootBaseProps = {
  children: JSX.Element | ((props: TimerRootChildrenProps) => JSX.Element);
};

export type TimerRootProps = CreateCountdownTimerProps & TimerRootBaseProps;

export const TimerRoot: Component<TimerRootProps> = (props) => {
  const [localProps, timerProps] = splitProps(props, ["children"], CREATE_COUNTDOWN_TIMER_PROPS_KEYS);

  const value = createCountdownTimer(timerProps);
  const children = () => createChildrenProps(localProps.children, value);

  return <TimerContext.Provider value={value}>{children()}</TimerContext.Provider>;
};

export default TimerRoot;
