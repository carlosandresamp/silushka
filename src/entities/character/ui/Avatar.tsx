import { Polymorphic, PolymorphicProps } from "@kobalte/core/polymorphic";
import { createMemo, Show, splitProps, ValidComponent } from "solid-js";
import { tv } from "tailwind-variants";

import { getCompletedWorkoutsCountForCurrentWeek } from "@entities/workout";
import { createSignalQuery } from "@shared/db";

import accessories from "../config/accessories";
import eyes, { EyesKey } from "../config/eyes";
import hairs from "../config/hairs";
import heads from "../config/heads";
import mouths, { MouthKey } from "../config/mouths";
import outfits from "../config/outfits";
import { useCharacter } from "../model/context";

export type AvatarProps = {
  class?: string | undefined;
};

export const styles = tv({
  slots: {
    root: "relative isolate aspect-square size-64 self-center overflow-hidden rounded-full bg-light ring ring-bg-tertiary",
    img: "absolute inset-0",
  },
});

export const Avatar = <T extends ValidComponent = "div">(props: PolymorphicProps<T, AvatarProps>) => {
  const [localProps, otherProps] = splitProps(props, ["class"]);
  const character = useCharacter();

  const count = createSignalQuery(() => getCompletedWorkoutsCountForCurrentWeek());
  const percentage = createMemo(() =>
    !count() ? 0 : Math.min(Math.round((count()! / character.character.goal) * 100), 100),
  );

  const eyesThresholds: { threshold: number; key: EyesKey }[] = [
    { threshold: 100, key: "thin" },
    { threshold: 75, key: "cynic" },
    { threshold: 50, key: "normal" },
    { threshold: 25, key: "sad" },
    { threshold: 0, key: "closed" },
  ];

  const mouthThresholds: { threshold: number; key: MouthKey }[] = [
    { threshold: 100, key: "open_mouth" },
    { threshold: 75, key: "normal_smile_1" },
    { threshold: 50, key: "nervous" },
    { threshold: 25, key: "sad" },
    { threshold: 0, key: "hate" },
  ];

  const eyesType = createMemo(() => {
    const currentPercentage = percentage();
    return (
      eyesThresholds.find((threshold) => currentPercentage >= threshold.threshold)?.key ||
      eyesThresholds[eyesThresholds.length - 1]!.key
    );
  });

  const mouthType = createMemo(() => {
    const currentPercentage = percentage();
    return (
      mouthThresholds.find((threshold) => currentPercentage >= threshold.threshold)?.key ||
      mouthThresholds[mouthThresholds.length - 1]!.key
    );
  });

  return (
    <Polymorphic as="div" class={styles().root({ class: localProps.class })} {...otherProps}>
      <Show when={character.character.outfit}>
        {(outfit) => <img src={outfits[outfit()].path} alt={outfit()} class={styles().img()} />}
      </Show>
      <Show when={character.character.head}>
        {(head) => <img src={heads[head()].path} alt={head()} class={styles().img()} />}
      </Show>
      <Show when={mouthType()}>
        {(mouth) => <img src={mouths[mouth()].path} alt={mouth()} class={styles().img()} />}
      </Show>
      <Show when={eyesType()}>{(eye) => <img src={eyes[eye()].path} alt={eye()} class={styles().img()} />}</Show>
      <Show when={character.character.hair}>
        {(hair) => <img src={hairs[hair()].path} alt={hair()} class={styles().img()} />}
      </Show>
      <Show when={character.character.accessory}>
        {(accessory) => <img src={accessories[accessory()].path} alt={accessory()} class={styles().img()} />}
      </Show>
    </Polymorphic>
  );
};
