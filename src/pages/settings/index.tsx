import { ThemeSwitcher } from "@features/theme";
import { Navigation } from "@widgets/navigation";

export default () => {
  return (
    <div class="space-y-6">
      <Navigation label="Настройки" back="/" />

      <ThemeSwitcher />
    </div>
  );
};
