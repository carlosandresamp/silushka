import { tv } from "tailwind-variants";

import { hash } from "@shared/lib/hash";

import { Achievement } from "../config/achievements";
import { useCharacter } from "../model/context";

import StarIcon from "~icons/ic/round-star";

export const styles = tv({
  slots: {
    img: "size-16",
    icon: "size-24 rounded-full flex items-center justify-center shrink-0",
  },
  variants: {
    unlocked: {
      true: {
        icon: "",
      },
      false: {
        icon: "opacity-25",
      },
    },
    appearance: {
      red: {
        icon: "bg-gradient-to-t from-red-600 to-red-400 text-light",
      },
      orange: {
        icon: "bg-gradient-to-t from-orange-600 to-orange-400 text-light",
      },
      amber: {
        icon: "bg-gradient-to-t from-amber-600 to-amber-400 text-light",
      },
      yellow: {
        icon: "bg-gradient-to-t from-yellow-600 to-yellow-400 text-light",
      },
      lime: {
        icon: "bg-gradient-to-t from-lime-600 to-lime-400 text-light",
      },
      green: {
        icon: "bg-gradient-to-t from-green-600 to-green-400 text-light",
      },
      emerald: {
        icon: "bg-gradient-to-t from-emerald-600 to-emerald-400 text-light",
      },
      teal: {
        icon: "bg-gradient-to-t from-teal-600 to-teal-400 text-light",
      },
      cyan: {
        icon: "bg-gradient-to-t from-cyan-600 to-cyan-400 text-light",
      },
      sky: {
        icon: "bg-gradient-to-t from-sky-600 to-sky-400 text-light",
      },
      blue: {
        icon: "bg-gradient-to-t from-blue-600 to-blue-400 text-light",
      },
      indigo: {
        icon: "bg-gradient-to-t from-indigo-600 to-indigo-400 text-light",
      },
      violet: {
        icon: "bg-gradient-to-t from-violet-600 to-violet-400 text-light",
      },
      purple: {
        icon: "bg-gradient-to-t from-purple-600 to-purple-400 text-light",
      },
      fuchsia: {
        icon: "bg-gradient-to-t from-fuchsia-600 to-fuchsia-400 text-light",
      },
      pink: {
        icon: "bg-gradient-to-t from-pink-600 to-pink-400 text-light",
      },
      rose: {
        icon: "bg-gradient-to-t from-rose-600 to-rose-400 text-light",
      },
      slate: {
        icon: "bg-gradient-to-t from-slate-600 to-slate-400 text-light",
      },
      gray: {
        icon: "bg-gradient-to-t from-gray-600 to-gray-400 text-light",
      },
      zinc: {
        icon: "bg-gradient-to-t from-zinc-600 to-zinc-400 text-light",
      },
      neutral: {
        icon: "bg-gradient-to-t from-neutral-600 to-neutral-400 text-light",
      },
      stone: {
        icon: "bg-gradient-to-t from-stone-600 to-stone-400 text-light",
      },
    },
  },
});

export const appearances = Object.keys(styles.variants.appearance) as (keyof typeof styles.variants.appearance)[];

export const AchievementCard = (props: { achievement: Achievement }) => {
  const character = useCharacter();

  const variantProps = {
    unlocked: character.character.achievements.includes(props.achievement.id),
    appearance: appearances[Math.abs(hash(props.achievement.id)) % appearances.length],
  };

  return (
    <li class="flex items-center gap-4 py-4">
      <div class={styles().icon(variantProps)}>
        <img
          src={props.achievement.image}
          alt={props.achievement.title}
          class={styles().img(variantProps)}
          draggable={false}
        />
      </div>
      <div>
        <h2 class="font-semibold text-xl">{props.achievement.title}</h2>
        <p class="text-fg-secondary">{props.achievement.description}</p>
        <div class="flex items-center text-sm">
          <StarIcon class="size-6 text-amber-600" />
          <p class="text-fg-primary leading-none">
            +<span class="font-semibold">{props.achievement.prize}</span> монет
          </p>
        </div>
      </div>
    </li>
  );
};
