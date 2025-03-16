import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    overlay: ["fixed inset-0 z-dialog", "bg-black/50", "data-closed:animate-fade-out data-open:animate-fade-in"],
    content: [
      "fixed left-1/2 top-1/2 z-dialog -translate-x-1/2 -translate-y-1/2",
      "flex max-h-dvh w-full max-w-sm flex-col gap-4 overflow-x-hidden overflow-y-auto",
      "ring ring-inset ring-bg-primary bg-bg-body p-6 shadow-2xl rounded-2xl",
      "data-closed:animate-fade-out-scale data-open:animate-fade-in-scale",
    ],
    header: ["flex items-center justify-between !mt-0"],
    label: ["text-xl font-semibold leading-none tracking-tight"],
    description: ["text-fg-body"],
    footer: ["flex gap-2 flex-row justify-end !mb-0"],
  },
});

export default styles;
