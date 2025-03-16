import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { Accessor, createEffect, createMemo, JSX, onCleanup, onMount, splitProps, ValidComponent } from "solid-js";
import createPersistent from "solid-persistent";
import { tv } from "tailwind-variants";

import { createChildrenProps } from "@shared/lib/children";

import useStepperContext from "./context";

export type StepperStepChildrenReturn = {
  current: boolean;
};

export type StepperStepProps = {
  class?: string;
  index?: number;
  children: JSX.Element | ((context: StepperStepChildrenReturn) => JSX.Element);
  onEnter?: VoidFunction;
  onLeave?: VoidFunction;
};

export type StepperStepReturn = { ref: () => Accessor<JSX.Element> };

const styles = tv({
  base: "flex items-center justify-center",
});

export const StepperStep = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, StepperStepProps>,
): JSX.Element => {
  const context = useStepperContext();

  const [scopedProps, otherProps] = splitProps(props, ["class", "children", "onEnter", "onLeave"]);

  const ref = () => getPersistentRef() ?? createPersistentRef();

  const getPersistentRef = () => context.steps.get(context.currentIndex);

  const createPersistentRef = () => {
    props.index = context.currentIndex;

    const ref = createPersistent(() => {
      const current = createMemo(() => props.index === context.currentIndex);

      createEffect(() => {
        if (current()) {
          scopedProps.onEnter?.();
        } else {
          scopedProps.onLeave?.();
        }
      });

      const value: StepperStepChildrenReturn = {
        get current() {
          return current();
        },
      };

      const children = () => createChildrenProps(scopedProps.children, value);

      return (
        <Polymorphic as="div" aria-current="step" class={styles({ class: scopedProps.class })} {...otherProps}>
          {children()}
        </Polymorphic>
      );
    });

    context.steps.set(context.currentIndex, ref);

    return ref;
  };

  onMount(() => {
    context.register();
  });

  onCleanup(() => {
    context.unregister();
  });

  return { ref: ref } satisfies StepperStepReturn as unknown as JSX.Element;
};

export default StepperStep;
