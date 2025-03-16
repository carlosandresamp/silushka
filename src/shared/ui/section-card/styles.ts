import { tv } from "tailwind-variants";

const styles = tv({
  slots: {
    root: [
      "group inline-flex flex-col items-start justify-center gap-3",
      "rounded-xl bg-bg-primary p-4 transition hover:bg-bg-secondary active:opacity-75 active:transition-none",
    ],
    group: "flex w-full items-start justify-between",
    icon: "flex size-9 items-center justify-center rounded-full bg-gradient-to-t text-light",
    value: "text-3xl font-semibold",
    label: "text-lg leading-none font-semibold text-fg-tertiary",
  },
  variants: {
    appearance: {
      red: {
        icon: "from-red-600 to-red-400",
      },
      orange: {
        icon: "from-orange-600 to-orange-400",
      },
      amber: {
        icon: "from-amber-600 to-amber-400",
      },
      yellow: {
        icon: "from-yellow-600 to-yellow-400",
      },
      lime: {
        icon: "from-lime-600 to-lime-400",
      },
      green: {
        icon: "from-green-600 to-green-400",
      },
      emerald: {
        icon: "from-emerald-600 to-emerald-400",
      },
      teal: {
        icon: "from-teal-600 to-teal-400",
      },
      cyan: {
        icon: "from-cyan-600 to-cyan-400",
      },
      sky: {
        icon: "from-sky-600 to-sky-400",
      },
      blue: {
        icon: "from-blue-600 to-blue-400",
      },
      indigo: {
        icon: "from-indigo-600 to-indigo-400",
      },
      violet: {
        icon: "from-violet-600 to-violet-400",
      },
      purple: {
        icon: "from-purple-600 to-purple-400",
      },
      fuchsia: {
        icon: "from-fuchsia-600 to-fuchsia-400",
      },
      pink: {
        icon: "from-pink-600 to-pink-400",
      },
      rose: {
        icon: "from-rose-600 to-rose-400",
      },
      slate: {
        icon: "from-slate-600 to-slate-400",
      },
      gray: {
        icon: "from-gray-600 to-gray-400",
      },
      zinc: {
        icon: "from-zinc-600 to-zinc-400",
      },
      neutral: {
        icon: "from-neutral-600 to-neutral-400",
      },
      stone: {
        icon: "from-stone-600 to-stone-400",
      },
    },
  },
  defaultVariants: {
    appearance: "sky",
  },
});

export default styles;
