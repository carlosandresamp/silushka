import { createContext, useContext } from "solid-js";

import { CreateCountdownTimerReturn } from "./create";

export type TimerContextValue = CreateCountdownTimerReturn;

export const TimerContext = createContext<CreateCountdownTimerReturn>();

export const useTimerContext = (): CreateCountdownTimerReturn => {
  const context = useContext(TimerContext);

  if (context === undefined) {
    throw new Error("The 'useTimerContext' primitive must be used within a <TimerRoot> component.");
  }

  return context;
};

export default useTimerContext;
