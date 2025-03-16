import { Component, ComponentProps, createMemo, mergeProps, Show, splitProps } from "solid-js";
import { tv } from "tailwind-variants";

export type ProgressCircleSize = "xs" | "sm" | "md" | "lg" | "xl";

const sizes: Record<ProgressCircleSize, { radius: number; strokeWidth: number }> = {
  xs: { radius: 16, strokeWidth: 3 },
  sm: { radius: 20, strokeWidth: 4 },
  md: { radius: 32, strokeWidth: 6 },
  lg: { radius: 52, strokeWidth: 12 },
  xl: { radius: 80, strokeWidth: 16 },
};

export type ProgressCircleProps = ComponentProps<"div"> & {
  value?: number;
  size?: ProgressCircleSize;
  radius?: number;
  strokeWidth?: number;
};

const styles = tv({
  slots: {
    root: "flex flex-col items-center justify-center",
    track: "stroke-bg-primary transition-colors ease-linear",
    fill: "stroke-bg-accent transition-all duration-500 ease-in-out",
    content: "absolute flex flex-col items-center justify-center",
  },
});

const ProgressCircle: Component<ProgressCircleProps> = (props) => {
  const defaultedProps = mergeProps(
    {
      size: "md",
    } satisfies Partial<ProgressCircleProps>,
    props,
  );

  const [localProps, otherProps] = splitProps(defaultedProps, [
    "class",
    "children",
    "value",
    "size",
    "radius",
    "strokeWidth",
  ]);

  const value = createMemo(() =>
    localProps.value === undefined ? 0 : localProps.value > 100 ? 100 : localProps.value,
  );

  const radius = createMemo(() => localProps.radius ?? sizes[localProps.size].radius);
  const strokeWidth = createMemo(() => localProps.strokeWidth ?? sizes[localProps.size].strokeWidth);
  const normalizedRadius = createMemo(() => radius() - strokeWidth() / 2);
  const circumference = createMemo(() => normalizedRadius() * 2 * Math.PI);
  const strokeDashoffset = createMemo(() => (value() / 100) * circumference());
  const offset = createMemo(() => circumference() - strokeDashoffset());

  return (
    <div class={styles().root({ class: localProps.class })} {...otherProps}>
      <svg
        width={radius() * 2}
        height={radius() * 2}
        viewBox={`0 0 ${radius() * 2} ${radius() * 2}`}
        class="-rotate-90"
      >
        <circle
          r={normalizedRadius()}
          cx={radius()}
          cy={radius()}
          stroke-width={strokeWidth()}
          fill="transparent"
          stroke=""
          stroke-linecap="round"
          class={styles().track()}
        />
        <Show when={value() >= 0}>
          <circle
            r={normalizedRadius()}
            cx={radius()}
            cy={radius()}
            stroke-width={strokeWidth()}
            stroke-dasharray={circumference() + " " + circumference()}
            stroke-dashoffset={offset()}
            fill="transparent"
            stroke=""
            stroke-linecap="round"
            class={styles().fill()}
          />
        </Show>
      </svg>
      <div class={styles().content()}>{localProps.children}</div>
    </div>
  );
};

export default ProgressCircle;
