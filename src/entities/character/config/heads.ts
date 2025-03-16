import { CustomizationPart } from "./types";

export const headKeys = ["head_1", "head_2", "head_3", "head_4", "head_5", "head_6", "head_7", "head_8"] as const;

export type HeadKey = (typeof headKeys)[number];

export const heads: Record<HeadKey, CustomizationPart> = {
  head_1: { price: 0, path: "/head/head_1.svg" },
  head_2: { price: 30, path: "/head/head_2.svg" },
  head_3: { price: 50, path: "/head/head_3.svg" },
  head_4: { price: 70, path: "/head/head_4.svg" },
  head_5: { price: 40, path: "/head/head_5.svg" },
  head_6: { price: 60, path: "/head/head_6.svg" },
  head_7: { price: 80, path: "/head/head_7.svg" },
  head_8: { price: 0, path: "/head/head_8.svg" },
} as const;

export default heads;
