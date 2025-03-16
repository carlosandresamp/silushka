import { CustomizationPart } from "./types";

export const accessoryKeys = [
  "beard_1",
  "beard_2",
  "beard_3",
  "beard_4",
  "blush",
  "cap",
  "earphone",
  "futuristic_glasses",
  "glasses",
  "mask",
  "mask_google",
  "mousthace_1",
  "mousthace_2",
  "mousthace_3",
  "mousthace_4",
  "rounded_glasses",
  "stylish_glasses",
  "waitress_tie",
] as const;

export type AccessoryKey = (typeof accessoryKeys)[number];

export const accessories: Record<AccessoryKey, CustomizationPart> = {
  beard_1: { price: 30, path: "/accessories/beard_1.svg" },
  beard_2: { price: 50, path: "/accessories/beard_2.svg" },
  beard_3: { price: 20, path: "/accessories/beard_3.svg" },
  beard_4: { price: 40, path: "/accessories/beard_4.svg" },
  blush: { price: 10, path: "/accessories/blush.svg" },
  cap: { price: 0, path: "/accessories/cap.svg" },
  earphone: { price: 60, path: "/accessories/earphone.svg" },
  futuristic_glasses: { price: 70, path: "/accessories/futuristic_glasses.svg" },
  glasses: { price: 80, path: "/accessories/glasses.svg" },
  mask: { price: 90, path: "/accessories/mask.svg" },
  mask_google: { price: 100, path: "/accessories/mask_google.svg" },
  mousthace_1: { price: 30, path: "/accessories/mousthace_1.svg" },
  mousthace_2: { price: 20, path: "/accessories/mousthace_2.svg" },
  mousthace_3: { price: 50, path: "/accessories/mousthace_3.svg" },
  mousthace_4: { price: 40, path: "/accessories/mousthace_4.svg" },
  rounded_glasses: { price: 60, path: "/accessories/rounded_glasses.svg" },
  stylish_glasses: { price: 70, path: "/accessories/stylish_glasses.svg" },
  waitress_tie: { price: 10, path: "/accessories/waitress_tie.svg" },
} as const;

export default accessories;
