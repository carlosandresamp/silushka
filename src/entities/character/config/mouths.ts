import { CustomizationPart } from "./types";

export const mouthKeys = [
  "angry",
  "eat",
  "hate",
  "mouth11",
  "nervous",
  "normal_smile_1",
  "normal_smile_2",
  "open_mouth",
  "open_tooth",
  "sad",
  "whistle",
] as const;

export type MouthKey = (typeof mouthKeys)[number];

export const mouths: Record<MouthKey, CustomizationPart> = {
  angry: { price: 30, path: "/mouth/angry.svg" },
  eat: { price: 50, path: "/mouth/eat.svg" },
  hate: { price: 70, path: "/mouth/hate.svg" },
  mouth11: { price: 40, path: "/mouth/mouth11.svg" },
  nervous: { price: 60, path: "/mouth/nervous.svg" },
  normal_smile_1: { price: 0, path: "/mouth/normal_smile_1.svg" },
  normal_smile_2: { price: 80, path: "/mouth/normal_smile_2.svg" },
  open_mouth: { price: 90, path: "/mouth/open_mouth.svg" },
  open_tooth: { price: 10, path: "/mouth/open_tooth.svg" },
  sad: { price: 20, path: "/mouth/sad.svg" },
  whistle: { price: 100, path: "/mouth/whistle.svg" },
} as const;

export default mouths;
