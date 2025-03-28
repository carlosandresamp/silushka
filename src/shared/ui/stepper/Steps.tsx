import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { children, Accessor, ParentProps, ValidComponent } from "solid-js";
import { Transition } from "solid-transition-group";

import { StepperStepReturn } from "./Step";
import useStepperContext from "./context";
import { createStepperTransition } from "./transition";

export type StepperStepsProps = ParentProps;

export const StepperSteps = <T extends ValidComponent = "div">(props: PolymorphicProps<T, StepperStepsProps>) => {
  const context = useStepperContext();

  const steps = children(() => props.children) as unknown as Accessor<Array<StepperStepReturn>>;

  return (
    <Polymorphic as="div" {...props}>
      <Transition {...createStepperTransition()}>{steps()[context.currentIndex]?.ref()()}</Transition>
    </Polymorphic>
  );
};

export default StepperSteps;
