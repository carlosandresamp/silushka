import { EditCharacterForm } from "@features/character";
import SparklesText from "@shared/ui/sparkles-text";

export const Onboarding = () => {
  return (
    <main class="mx-auto flex min-h-dvh max-w-lg flex-col items-stretch justify-center px-4 py-8">
      <header class="flex flex-col items-center space-y-4">
        <img src="/favicon.svg" class="size-24 animate-bounce" alt="Логотип" />
        <hgroup class="text-center space-y-4">
          <SparklesText class="text-4xl font-bold">Силушка!</SparklesText>
          <p>
            Добро пожаловать! Это приложение посвящено упражнениям и тренировкам. Перед началом заполните данные о себе:
          </p>
        </hgroup>
      </header>
      <EditCharacterForm />
    </main>
  );
};
