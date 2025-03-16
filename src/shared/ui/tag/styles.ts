import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    root: [
      "flex items-center justify-center rounded-xl p-2 text-sm leading-none font-medium text-fg-primary",
      "ring ring-inset",
      "bg-gradient-to-t",
    ],
    icon: "size-4",
  },
  variants: {
    appearance: {
      red: {
        root: " text-red-600 bg-red-600/10 ring-red-600/50",
      },
      orange: {
        root: "text-orange-600 bg-orange-600/10 ring-orange-600/50",
      },
      amber: {
        root: "text-amber-600 bg-amber-600/10 ring-amber-600/50",
      },
      yellow: {
        root: "text-yellow-600 bg-yellow-600/10 ring-yellow-600/50",
      },
      lime: {
        root: "text-lime-600 bg-lime-600/10 ring-lime-600/50",
      },
      green: {
        root: "text-green-600 bg-green-600/10 ring-green-600/50",
      },
      emerald: {
        root: "text-emerald-600 bg-emerald-600/10 ring-emerald-600/50",
      },
      teal: {
        root: "text-teal-600 bg-teal-600/10 ring-teal-600/50",
      },
      cyan: {
        root: "text-cyan-600 bg-cyan-600/10 ring-cyan-600/50",
      },
      sky: {
        root: "text-sky-600 bg-sky-600/10 ring-sky-600/50",
      },
      blue: {
        root: "text-blue-600 bg-blue-600/10 ring-blue-600/50",
      },
      indigo: {
        root: "text-indigo-600 bg-indigo-600/10 ring-indigo-600/50",
      },
      violet: {
        root: "text-violet-600 bg-violet-600/10 ring-violet-600/50",
      },
      purple: {
        root: "text-purple-600 bg-purple-600/10 ring-purple-600/50",
      },
      fuchsia: {
        root: "text-fuchsia-600 bg-fuchsia-600/10 ring-fuchsia-600/50",
      },
      pink: {
        root: "text-pink-600 bg-pink-600/10 ring-pink-600/50",
      },
      rose: {
        root: "text-rose-600 bg-rose-600/10 ring-rose-600/50",
      },
    },
  },
  defaultVariants: {
    appearance: "blue",
  },
});

export default styles;
