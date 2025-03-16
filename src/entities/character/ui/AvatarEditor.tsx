import Tabs from "@shared/ui/tabs";

import { Avatar } from "./Avatar";
import { CustomizationToggleGroup } from "./CustomizationToggleGroup";
import accessories, { AccessoryKey } from "../config/accessories";
import hairs, { HairKey } from "../config/hairs";
import heads, { HeadKey } from "../config/heads";
import outfits, { OutfitKey } from "../config/outfits";
import { useCharacter } from "../model/context";

export const AvatarEditor = () => {
  const character = useCharacter();

  return (
    <div>
      <Avatar class="mx-auto mb-4" />

      <Tabs>
        <Tabs.List>
          <Tabs.Trigger value="outfit">Одежда</Tabs.Trigger>
          <Tabs.Trigger value="head">Голова</Tabs.Trigger>
          <Tabs.Trigger value="hair">Волосы</Tabs.Trigger>
          <Tabs.Trigger value="accessory">Аксессуары</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>

        <Tabs.Content value="outfit">
          <CustomizationToggleGroup<OutfitKey>
            value={character.character.outfit}
            onChange={(outfit) => character.setCharacter((c) => ({ ...c, outfit }))}
            items={outfits}
            onBuy={([key, item]) => {
              character.setCharacter((c) => ({
                ...c,
                coins: character.character.coins - item.price,
                outfits: [...c.outfits, key as OutfitKey],
              }));
            }}
            currentItems={character.character.outfits}
            disallowEmptySelection
          />
        </Tabs.Content>

        <Tabs.Content value="head">
          <CustomizationToggleGroup<HeadKey>
            value={character.character.head}
            onChange={(head) => character.setCharacter((c) => ({ ...c, head }))}
            items={heads}
            onBuy={([key, item]) => {
              character.setCharacter((c) => ({
                ...c,
                coins: character.character.coins - item.price,
                heads: [...c.heads, key as HeadKey],
              }));
            }}
            currentItems={character.character.heads}
            disallowEmptySelection
          />
        </Tabs.Content>

        <Tabs.Content value="hair">
          <CustomizationToggleGroup<HairKey>
            value={character.character.hair}
            onChange={(hair) => character.setCharacter((c) => ({ ...c, hair }))}
            items={hairs}
            onBuy={([key, item]) => {
              character.setCharacter((c) => ({
                ...c,
                coins: character.character.coins - item.price,
                hairs: [...c.hairs, key as HairKey],
              }));
            }}
            currentItems={character.character.hairs}
          />
        </Tabs.Content>

        <Tabs.Content value="accessory">
          <CustomizationToggleGroup<AccessoryKey>
            value={character.character.accessory}
            onChange={(accessory) => character.setCharacter((c) => ({ ...c, accessory }))}
            items={accessories}
            onBuy={([key, item]) => {
              character.setCharacter((c) => ({
                ...c,
                coins: character.character.coins - item.price,
                accessories: [...c.accessories, key as AccessoryKey],
              }));
            }}
            currentItems={character.character.accessories}
          />
        </Tabs.Content>
      </Tabs>
    </div>
  );
};
