import { ToggleGroup } from "@kobalte/core/toggle-group";
import { createMemo, createSignal, For, Show } from "solid-js";

import Button from "@shared/ui/button";
import Dialog from "@shared/ui/dialog";

import { CustomizationPart } from "../config/types";
import { useCharacter } from "../model/context";

import LockIcon from "~icons/ic/round-lock";
import StarIcon from "~icons/ic/round-star";

export type CustomizationToggleGroupProps<T extends string> = {
  value: T | null;
  onChange: (newValue: T) => void;
  onBuy: (item: [string, CustomizationPart]) => void;
  items: Record<string, CustomizationPart>;
  currentItems: T[];
  disallowEmptySelection?: boolean;
};

export const CustomizationToggleGroup = <T extends string>(props: CustomizationToggleGroupProps<T>) => {
  const character = useCharacter();
  const [selectedItem, setSelectedItem] = createSignal<[string, CustomizationPart] | null>(null);

  const hasEnoughCoins = createMemo(() =>
    selectedItem() ? character.character.coins >= selectedItem()![1].price : false,
  );

  const buySelectedItem = () => {
    const item = selectedItem();

    if (item) {
      props.onBuy(item);
    }
  };

  const onChange = (newValue: string | null): void => {
    const hasItem = props.currentItems.includes(newValue as T);
    if (!hasItem && newValue !== null) {
      requestAnimationFrame(() => {
        setSelectedItem(Object.entries(props.items).find(([key]) => key === newValue)!);
      });
    } else if (!(props.disallowEmptySelection && newValue === null)) {
      props.onChange(newValue as T);
    }
  };
  return (
    <>
      <ToggleGroup class="items-center justify-center flex flex-wrap gap-2" value={props.value} onChange={onChange}>
        <For each={Object.entries(props.items)}>
          {([key, item]) => (
            <ToggleGroup.Item value={key} class="flex flex-col items-center justify-center gap-1 group" title={key}>
              <div class="relative rounded-lg size-16 ring bg-bg-primary ring-bg-tertiary group-data-pressed:ring-bg-accent group-data-pressed:ring-2 ring-inset">
                <img src={item.path} class="rounded-lg size-16" draggable={false} alt={key} />
                <div class="absolute bottom-1 right-1">
                  <Show when={!props.currentItems.includes(key as T)}>
                    <div class="size-5 rounded-full bg-gradient-to-t flex items-center justify-center bg-bg-tertiary/50 backdrop-blur-3xl backdrop-saturate-200">
                      <LockIcon class="size-4 text-fg-tertiary" />
                    </div>
                  </Show>
                </div>
              </div>
              <div class="flex items-center justify-center size-full">
                <StarIcon class="size-4 text-amber-600" />
                <span class="font-medium text-sm">{item.price}</span>
              </div>
            </ToggleGroup.Item>
          )}
        </For>
      </ToggleGroup>

      <Dialog
        open={selectedItem() !== null}
        onOpenChange={(open) => !open && setSelectedItem(null)}
        closeOnOutsidePointerStrategy="pointerdown"
      >
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Label class="leading-normal text-center">Вы действительно хотите купить этот предмет?</Dialog.Label>
          </Dialog.Header>
          <Dialog.Footer>
            <Button as={Dialog.Close} spacing="lg" stretched>
              Нет
            </Button>
            <Button
              as={Dialog.Close}
              spacing="lg"
              appearance="accent"
              onClick={buySelectedItem}
              disabled={!hasEnoughCoins()}
              stretched
            >
              Да
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog>
    </>
  );
};
