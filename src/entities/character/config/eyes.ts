import { CustomizationPart } from "./types";

export const eyesKeys = ["angry", "closed", "cynic", "normal", "sad", "thin"] as const;

export type EyesKey = (typeof eyesKeys)[number];

export const eyes: Record<EyesKey, CustomizationPart> = {
  angry: { price: 30, path: "/eyes/angry.svg" },
  closed: { price: 50, path: "/eyes/closed.svg" },
  cynic: { price: 70, path: "/eyes/cynic.svg" },
  normal: { price: 0, path: "/eyes/normal.svg" },
  sad: { price: 90, path: "/eyes/sad.svg" },
  thin: { price: 40, path: "/eyes/thin.svg" },
} as const;

export default eyes;
