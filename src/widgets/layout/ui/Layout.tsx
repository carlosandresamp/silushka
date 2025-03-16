import { createMediaQuery } from "@solid-primitives/media";
import { useBeforeLeave } from "@solidjs/router";
import { ParentComponent, Show } from "solid-js";

import Button from "@shared/ui/button";
import Drawer from "@shared/ui/drawer";

import Logo from "./Logo";
import Nav from "./Nav";

import MenuIcon from "~icons/ic/round-menu";

export const Layout: ParentComponent = (props) => {
  const isMobile = createMediaQuery("(width < 64rem)");

  return (
    <div class="relative mx-auto flex min-h-dvh flex-col items-stretch max-lg:max-w-3xl lg:flex-row">
      <Show
        when={isMobile()}
        fallback={
          <aside class="sticky top-0 h-dvh w-2xs max-w-2xs border-e border-r border-bg-primary px-4 py-6 pe-4">
            <Nav />
          </aside>
        }
      >
        <Drawer>
          {(context) => {
            useBeforeLeave(() => {
              if (context.open) {
                context.setOpen(false);
              }
            });

            return (
              <>
                <header class="flex items-center justify-between w-full p-4">
                  <Logo />

                  <Drawer.Trigger
                    as={Button}
                    shape="circle"
                    spacing="sm"
                    variant="ghost"
                    appearance="tertiary"
                    aria-label="Открыть навигацию"
                  >
                    <MenuIcon class="size-6" />
                  </Drawer.Trigger>
                </header>

                <Drawer.Content>
                  <Nav />
                </Drawer.Content>
              </>
            );
          }}
        </Drawer>
      </Show>

      <main class="flex grow flex-col px-4 pb-4 lg:mx-auto lg:max-w-3xl lg:py-4">{props.children}</main>
    </div>
  );
};
