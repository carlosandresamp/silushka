import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    item: [
      "min-w-56",
      "flex items-center gap-2 px-2 py-1.5 outline-none",
      "not-disabled:data-highlighted:bg-bg-secondary not-disabled:cursor-pointer",
      "data-disabled:cursor-not-allowed data-disabled:text-fg-tertiary",
    ],
    content: [
      "outline-none z-dropdown",
      "rounded-lg bg-bg-primary ring shadow-lg ring-bg-secondary outline-none ring-inset",
      "overflow-clip",
      "divide-y divide-bg-secondary",
      "data-closed:animate-fade-out-scale data-expanded:animate-fade-in-scale origin-(--kb-menu-content-transform-origin)",
    ],
  },
});

export default styles;
