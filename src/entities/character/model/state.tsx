import { makePersisted } from "@solid-primitives/storage";
import { createEffect, JSX } from "solid-js";
import { createStore, SetStoreFunction } from "solid-js/store";
import { toast } from "solid-sonner";

import SparklesText from "@shared/ui/sparkles-text";

import { CHARACTER_LOCAL_STORAGE_KEY } from "../config";
import { AccessoryKey } from "../config/accessories";
import { achievements } from "../config/achievements";
import { EyesKey } from "../config/eyes";
import { HairKey } from "../config/hairs";
import { HeadKey } from "../config/heads";
import { MouthKey } from "../config/mouths";
import { OutfitKey } from "../config/outfits";

import AchievementsIcon from "~icons/ic/round-military-tech";

export type Character = {
  name: string;
  weight: string;
  height: string;
  birthday: string;
  goal: number;
  coins: number;
  exercisesCreated: number;
  workoutsCreated: number;
  workoutsCompleted: number;
  outfit: OutfitKey | null;
  outfits: OutfitKey[];
  head: HeadKey | null;
  heads: HeadKey[];
  mouth: MouthKey | null;
  mouths: MouthKey[];
  eye: EyesKey | null;
  eyes: EyesKey[];
  hair: HairKey | null;
  hairs: HairKey[];
  accessory: AccessoryKey | null;
  accessories: AccessoryKey[];
  achievements: string[];
};

export type CharacterState = {
  character: Character;
  setCharacter: SetStoreFunction<Character>;
};

export const INITIAL_CHARACTER = {
  outfit: "1",
  outfits: ["1", "4"],
  head: "head_1",
  heads: ["head_1", "head_8"],
  mouth: "normal_smile_1",
  mouths: ["normal_smile_1"],
  eye: "normal",
  eyes: ["normal"],
  hair: "1",
  hairs: ["1", "27"],
  accessory: null,
  accessories: ["cap"],
  coins: 0,
  exercisesCreated: 0,
  workoutsCreated: 0,
  workoutsCompleted: 0,
  achievements: ["novice"],
} as Character;

export const createCharacter = () => {
  const [character, setCharacter] = makePersisted(createStore<Character>(INITIAL_CHARACTER), {
    name: CHARACTER_LOCAL_STORAGE_KEY,
    deserialize: (data) => {
      try {
        return { ...INITIAL_CHARACTER, ...(JSON.parse(data) as Character) };
      } catch {
        return INITIAL_CHARACTER;
      }
    },
  });

  createEffect(() => {
    achievements.forEach((achievement) => {
      const { id, requirements } = achievement;

      if (!character.achievements.includes(id)) {
        const requirementsMet = Object.entries(requirements || {}).every(([key, value]) => {
          const characterValue = character[key as keyof Character] ?? 0;

          return typeof characterValue === "number" && characterValue >= (value || 0);
        });

        if (requirementsMet) {
          setCharacter("achievements", (prev) => [...prev, id]);
          setCharacter("coins", (prev) => prev + achievement.prize);

          toast.custom(
            () =>
              (() => (
                <div class="relative flex w-full min-w-80 items-center gap-1 rounded-xl border border-bg-secondary bg-bg-primary p-4 text-fg-body shadow-xl">
                  <AchievementsIcon class="size-6 text-fg-accent shrink-0" />
                  <SparklesText>Получено достижение "{achievement.title}"!</SparklesText>
                </div>
              )) as unknown as JSX.Element,
          );
        }
      }
    });
  });

  return [character, setCharacter] as const;
};
