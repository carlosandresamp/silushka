import { PolymorphicProps } from "@kobalte/core";
import { ValidComponent } from "solid-js";

import Button, { RootProps as ButtonRootProps } from "../button";

import BackIcon from "~icons/ic/round-arrow-back";

export const BackButton = <T extends ValidComponent = "button">(props: PolymorphicProps<T, ButtonRootProps>) => {
  return (
    <Button
      shape="circle"
      spacing="sm"
      variant="ghost"
      aria-label="Назад"
      appearance="secondary"
      {...(props as ButtonRootProps)}
    >
      <BackIcon class="size-6" />
    </Button>
  );
};

export default BackButton;
