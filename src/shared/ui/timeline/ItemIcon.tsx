import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { splitProps, ValidComponent } from "solid-js";
import { tv, VariantProps } from "tailwind-variants";

export type TimelineItemIconVariantProps = VariantProps<typeof styles>;

export type TimelineItemIconRenderProps = {
  class?: string | undefined;
};

export type TimelineItemIconProps = TimelineItemIconRenderProps & TimelineItemIconVariantProps;

export const styles = tv({
  base: "absolute -start-3 flex size-6 items-center justify-center rounded-full bg-gradient-to-t text-light ring-8 ring-bg-body",
  variants: {
    appearance: {
      red: "from-red-600 to-red-400",
      orange: "from-orange-600 to-orange-400",
      amber: "from-amber-600 to-amber-400",
      yellow: "from-yellow-600 to-yellow-400",
      lime: "from-lime-600 to-lime-400",
      green: "from-green-600 to-green-400",
      emerald: "from-emerald-600 to-emerald-400",
      teal: "from-teal-600 to-teal-400",
      cyan: "from-cyan-600 to-cyan-400",
      sky: "from-sky-600 to-sky-400",
      blue: "from-blue-600 to-blue-400",
      indigo: "from-indigo-600 to-indigo-400",
      violet: "from-violet-600 to-violet-400",
      purple: "from-purple-600 to-purple-400",
      fuchsia: "from-fuchsia-600 to-fuchsia-400",
      pink: "from-pink-600 to-pink-400",
      rose: "from-rose-600 to-rose-400",
      slate: "from-slate-600 to-slate-400",
      gray: "from-gray-600 to-gray-400",
      zinc: "from-zinc-600 to-zinc-400",
      neutral: "from-neutral-600 to-neutral-400",
      stone: "from-stone-600 to-stone-400",
    },
  },
  defaultVariants: {
    appearance: "sky",
  },
});

export const TimelineItemIcon = <T extends ValidComponent = "span">(
  props: PolymorphicProps<T, TimelineItemIconProps>,
) => {
  const [variantProps, otherProps] = splitProps(props as TimelineItemIconProps, ["class", "appearance"]);

  return <Polymorphic as="span" class={styles(variantProps)} {...otherProps} />;
};

export default TimelineItemIcon;
