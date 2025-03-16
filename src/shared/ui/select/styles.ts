import { tv } from "tailwind-variants";

import { styles as baseStyles } from "../text-field";

const styles = tv({
  extend: baseStyles,
  slots: {
    wrapper: "cursor-pointer",
    item: [
      "flex items-center justify-between gap-1 px-2 py-1.5 outline-none",
      "not-disabled:data-highlighted:bg-bg-secondary not-disabled:cursor-pointer",
      "data-disabled:cursor-not-allowed data-disabled:text-fg-tertiary",
    ],
    content: [
      "z-select overflow-clip outline-none",
      "rounded-lg bg-bg-primary ring shadow-lg ring-bg-secondary outline-none ring-inset",
      "data-closed:animate-fade-out-scale data-expanded:animate-fade-in-scale origin-(--kb-select-content-transform-origin)",
    ],
    listbox: "divide-y divide-bg-secondary outline-none max-h-56 overflow-clip overflow-y-auto",
  },
});

export default styles;
