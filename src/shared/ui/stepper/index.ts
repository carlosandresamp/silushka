import Backward, { StepperBackwardProps as BackwardProps } from "./Backward";
import Forward, { StepperForwardProps as ForwardProps } from "./Forward";
import Previous, { StepperPreviousProps as PreviousProps } from "./Previous";
import Root, { StepperRootProps as RootProps } from "./Root";
import Step, { StepperStepProps as StepProps, type StepperStepReturn as StepReturn } from "./Step";
import Steps, { StepperStepsProps as StepsProps } from "./Steps";
import useContext, { StepperContextValue as ContextValue } from "./context";

export type { BackwardProps, ContextValue, ForwardProps, PreviousProps, RootProps, StepProps, StepReturn, StepsProps };

export { Backward, Forward, Previous, Root, Step, Steps, useContext };

export const Stepper = Object.assign(Root, {
  Steps,
  Step,
  Forward,
  Backward,
  Previous,
  useContext,
});

export default Stepper;
