import Root, { TimerRootBaseProps as RootBaseProps, TimerRootProps as RootProps } from "./Root";
import Time, { TimerTimeProps as TimeProps } from "./Time";
import Toggle, {
  TimerToggleElementProps as ToggleElementProps,
  TimerToggleProps as ToggleProps,
  TimerToggleSharedElementProps as ToggleSharedElementProps,
} from "./Toggle";
import Trigger, {
  TimerTriggerAction as TriggerAction,
  TimerTriggerBaseProps as TriggerBaseProps,
  TimerTriggerElementProps as TriggerElementProps,
  TimerTriggerProps as TriggerProps,
  TimerTriggerSharedElementProps as TriggerSharedElementProps,
} from "./Trigger";
import useContext, { TimerContextValue as ContextValue } from "./context";

export type {
  ContextValue,
  RootBaseProps,
  RootProps,
  TimeProps,
  ToggleElementProps,
  ToggleProps,
  ToggleSharedElementProps,
  TriggerAction,
  TriggerBaseProps,
  TriggerElementProps,
  TriggerProps,
  TriggerSharedElementProps,
};

export { Root, Time, Toggle, Trigger, useContext };

export const Timer = Object.assign(Root, {
  Time,
  Toggle,
  Trigger,
  useContext,
});

export default Timer;
