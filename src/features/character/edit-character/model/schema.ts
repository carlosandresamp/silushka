import * as v from "valibot";

import {
  CharacterBirthdaySchema,
  CharacterGoalSchema,
  CharacterHeightSchema,
  CharacterNameSchema,
  CharacterWeightSchema,
} from "@entities/character";

export const EditCharacterSchema = v.object({
  name: CharacterNameSchema,
  weight: CharacterWeightSchema,
  height: CharacterHeightSchema,
  birthday: CharacterBirthdaySchema,
  goal: CharacterGoalSchema,
});

export type EditCharacterFormValues = v.InferInput<typeof EditCharacterSchema>;
