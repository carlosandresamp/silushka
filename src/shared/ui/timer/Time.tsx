import { Dynamic, DynamicProps } from "@corvu/utils/dynamic";
import { createMemo, ValidComponent } from "solid-js";

import useTimerContext from "./context";

export type TimerTimeProps = {};

export const TimerTime = <T extends ValidComponent = "span">(
  props: Omit<DynamicProps<T, TimerTimeProps>, "children">,
) => {
  const context = useTimerContext();

  const time = createMemo(() => {
    const hours = String(Math.floor(context.seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((context.seconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(context.seconds % 60).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  });

  return (
    <Dynamic as="span" {...props}>
      {time()}
    </Dynamic>
  );
};

export default TimerTime;
