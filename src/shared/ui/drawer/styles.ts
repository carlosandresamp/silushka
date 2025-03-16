import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    overlay: [
      "fixed inset-0 z-dialog",
      "data-transitioning:transition-colors data-transitioning:duration-500 data-transitioning:ease-wave",
    ],
    content: [
      "fixed inset-y-0 left-0 z-dialog flex w-2xs flex-col items-start gap-6",
      "border-e border-bg-primary bg-bg-body px-4 py-6",
      "after:absolute after:inset-y-0 after:right-[calc(100%-1px)] after:w-1/2 after:bg-inherit",
      "data-transitioning:transition-transform data-transitioning:duration-500 data-transitioning:ease-wave",
    ],
  },
});

export default styles;
