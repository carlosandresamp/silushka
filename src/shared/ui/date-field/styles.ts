import { tv } from "tailwind-variants";

import { styles as baseStyles } from "../text-field";

const styles = tv({
  extend: baseStyles,
  slots: {
    wrapper: "cursor-pointer outline-none",
    content: [
      "outline-none",
      "rounded-lg bg-bg-primary p-1 ring shadow-lg ring-bg-secondary",
      "data-closed:animate-fade-out-scale data-expanded:animate-fade-in-scale origin-(--kb-popover-content-transform-origin)",
    ],
  },
});

export default styles;
