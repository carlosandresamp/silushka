import { callEventHandler } from "@corvu/utils/dom";
import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { ComponentProps, JSX, splitProps, ValidComponent } from "solid-js";

import useStepperContext from "./context";

export type StepperBackwardRenderProps = {
  disabled?: boolean | undefined;
};

export type StepperBackwardProps<T extends ValidComponent = "button"> = ComponentProps<T> &
  JSX.CustomEventHandlersCamelCase<T> &
  StepperBackwardRenderProps;

export const StepperBackward = <T extends ValidComponent = "button">(
  props: PolymorphicProps<T, StepperBackwardProps<T>>,
) => {
  const context = useStepperContext();
  const [localProps, otherProps] = splitProps(props, ["disabled", "onClick"]);

  const onClick: JSX.EventHandlerUnion<T, MouseEvent> = (event) => {
    !callEventHandler(localProps.onClick, event) && context.moveBackward();
  };

  return (
    <Polymorphic
      as="button"
      onClick={onClick}
      disabled={!context.canMoveBackward || localProps.disabled}
      {...otherProps}
    />
  );
};

export default StepperBackward;
