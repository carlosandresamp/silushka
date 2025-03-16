import { tv } from "tailwind-variants";

const styles = tv({
  base: "shrink-0 transition-colors",
  variants: {
    appearance: {
      inverse: "border-bg-inverse",
      primary: "border-bg-primary",
      secondary: "border-bg-secondary",
      tertiary: "border-bg-tertiary",
      accent: "border-bg-accent",
      positive: "border-bg-positive",
      destructive: "border-bg-destructive",
    },
    orientation: {
      vertical: "h-full w-px",
      horizontal: "h-px w-full",
    },
  },
  defaultVariants: {
    appearance: "primary",
    orientation: "horizontal",
  },
});

export default styles;
