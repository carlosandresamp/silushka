import { A } from "@solidjs/router";

import Button from "@shared/ui/button";

import LinkIcon from "~icons/ic/round-link";

export default () => {
  return (
    <main class="flex min-h-dvh flex-col items-center justify-center space-y-4">
      <LinkIcon class="size-24" />
      <hgroup class="space-y-2 text-center">
        <h1 class="text-2xl font-bold">Страница не найдена</h1>
        <p class="text-fg-tertiary">Этой страницы не существует</p>
      </hgroup>
      <Button as={A} href="/" appearance="accent">
        На главную
      </Button>
    </main>
  );
};
