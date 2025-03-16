import { Component } from "solid-js";

import Logo from "./Logo";
import NavLink from "./NavLink";

import HomeIcon from "~icons/ic/round-home";
import AchievementsIcon from "~icons/ic/round-military-tech";
import PersonIcon from "~icons/ic/round-person";
import ExercisesIcon from "~icons/ic/round-school";
import SettingsIcon from "~icons/ic/round-settings";
import ShopIcon from "~icons/ic/round-shopping-cart";
import WorkoutsIcon from "~icons/ic/round-surfing";

const Nav: Component = () => {
  return (
    <nav class="flex size-full flex-col items-start gap-6">
      <Logo as="header" class="px-3" />

      <div class="scrollbar-thin w-full grow space-y-1 overflow-x-clip overflow-y-auto">
        <NavLink href="/" before={<HomeIcon class="size-6" />}>
          Главная
        </NavLink>
        <NavLink href="/exercises" before={<ExercisesIcon class="size-6" />}>
          Упражнения
        </NavLink>
        <NavLink href="/workouts" before={<WorkoutsIcon class="size-6" />}>
          Тренировки
        </NavLink>
        <NavLink href="/character" before={<PersonIcon class="size-6" />}>
          Персонаж
        </NavLink>
        <NavLink href="/shop" before={<ShopIcon class="size-6" />}>
          Магазин
        </NavLink>
        <NavLink href="/achievements" before={<AchievementsIcon class="size-6" />}>
          Достижения
        </NavLink>
      </div>

      <div class="w-full space-y-1">
        <NavLink href="/settings" before={<SettingsIcon class="size-6" />}>
          Настройки
        </NavLink>
      </div>

      <footer class="flex w-full flex-col gap-1 text-sm text-fg-tertiary">
        <span class="font-medium">{import.meta.env.APP_NAME}</span>
        <span>Версия {import.meta.env.APP_VERSION}</span>
      </footer>
    </nav>
  );
};

export default Nav;
