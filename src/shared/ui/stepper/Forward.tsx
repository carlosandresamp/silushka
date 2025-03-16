import { callEventHandler } from "@corvu/utils/dom";
import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { ComponentProps, JSX, splitProps, ValidComponent } from "solid-js";

import useStepperContext from "./context";

export type StepperForwardRenderProps = {
  disabled?: boolean | undefined;
};

export type StepperForwardProps<T extends ValidComponent = "button"> = ComponentProps<T> &
  JSX.CustomEventHandlersCamelCase<T> &
  StepperForwardRenderProps;

export const StepperForward = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, StepperForwardProps<T>>,
) => {
  const context = useStepperContext();
  const [localProps, otherProps] = splitProps(props, ["disabled", "onClick"]);

  const onClick: JSX.EventHandlerUnion<T, MouseEvent> = (event) => {
    !callEventHandler(localProps.onClick, event) && context.moveForward();
  };

  return (
    <Polymorphic
      as="button"
      onClick={onClick}
      disabled={!context.canMoveForward || localProps.disabled}
      {...otherProps}
    />
  );
};

export default StepperForward;
