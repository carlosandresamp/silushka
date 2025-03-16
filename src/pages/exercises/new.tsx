import { ExerciseEditForm } from "@features/exercise";
import { Navigation } from "@widgets/navigation";

export default () => {
  return (
    <div class="space-y-6">
      <Navigation label="Новое упражнение" back="/exercises" />

      <ExerciseEditForm />
    </div>
  );
};
