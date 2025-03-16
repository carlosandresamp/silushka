import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    root: "inline-flex h-fit items-center gap-0.5 rounded-md bg-bg-secondary p-0.5 ring ring-bg-tertiary",
    value: "text-sm",
    remove: "rounded-sm",
  },
});

export default styles;
