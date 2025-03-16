import { createTimer } from "@solid-primitives/timer";
import { createEffect, createMemo, createSignal, mergeProps, Setter, untrack } from "solid-js";

export type CreateCountdownTimerProps = {
  min?: number;
  max?: number;
  delay?: number;
  paused?: boolean;
  seconds?: number;
};

export type CreateCountdownTimerReturn = {
  min: number;
  max: number;
  delay: number;
  setDelay: Setter<number>;
  paused: boolean;
  setPaused: Setter<boolean>;
  seconds: number;
  setSeconds: Setter<number>;
  ended: boolean;
  active: boolean;
  interval: number | false;
  toggle: VoidFunction;
};

export const CREATE_COUNTDOWN_TIMER_PROPS_KEYS = [
  "min",
  "max",
  "delay",
  "paused",
  "seconds",
] as const satisfies (keyof CreateCountdownTimerProps)[];

export const DEFAULT_CREATE_COUNTDOWN_TIMER_PROPS = {
  min: 0,
  max: 60 * 60 * 24,
  delay: 1000,
  seconds: 0,
  paused: true,
} as const satisfies Partial<CreateCountdownTimerProps>;

const createCountdownTimer = (props: CreateCountdownTimerProps): CreateCountdownTimerReturn => {
  const defaultedProps = mergeProps(DEFAULT_CREATE_COUNTDOWN_TIMER_PROPS, props);

  const min = createMemo<number>(() => defaultedProps.min);
  const max = createMemo<number>(() => defaultedProps.max);
  const [delay, setDelay] = createSignal<number>(defaultedProps.delay);
  const [paused, setPaused] = createSignal<boolean>(defaultedProps.paused);
  const [_seconds, setSeconds] = createSignal<number>(defaultedProps.seconds);
  const seconds = createMemo<number>(() => Math.max(min(), Math.min(_seconds(), max())));
  const ended = createMemo<boolean>(() => seconds() <= 0);
  const active = createMemo<boolean>(() => !paused() && !ended());
  const interval = createMemo<number | false>(() => active() && delay());
  const toggle = () => setPaused((prev) => !prev);

  const tick = () => {
    setSeconds((prev) => prev - 1);
  };

  createTimer(tick, interval, setInterval);

  createEffect(() => {
    if (ended()) {
      setPaused(true);
    }
  });

  createEffect(() => {
    if (!untrack(ended)) {
      setPaused(defaultedProps.paused);
    }
  });

  createEffect(() => {
    if (!untrack(ended)) {
      setSeconds(defaultedProps.seconds);
    }
  });

  createEffect(() => {
    setDelay(defaultedProps.delay);
  });

  return {
    get min() {
      return min();
    },
    get max() {
      return max();
    },
    get delay() {
      return delay();
    },
    setDelay,
    get paused() {
      return paused();
    },
    setPaused,
    get seconds() {
      return seconds();
    },
    setSeconds,
    get ended() {
      return ended();
    },
    get active() {
      return active();
    },
    get interval() {
      return interval();
    },
    toggle,
  };
};

export default createCountdownTimer;
