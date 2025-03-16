import { useBeforeLeave } from "@solidjs/router";
import { createContext, createEffect, createMemo, createSignal, JSX, onCleanup, onMount, useContext } from "solid-js";
import { toast } from "solid-sonner";

import { useCharacter } from "@entities/character";
import { getExerciseCost } from "@entities/shop";
import db, { Exercise, Workout, WorkoutExercise, WorkoutSession } from "@shared/db";
import SparklesText from "@shared/ui/sparkles-text";
import Stepper from "@shared/ui/stepper";

import StarIcon from "~icons/ic/round-star";

export type WorkoutStepperContextValue = {
  end: VoidFunction;
  skip: (exercise: Exercise) => void;
  complete: (exercise: Exercise) => void;
  workout: Workout;
  completed: number;
  skipped: number;
  coins: number;
  elapsed: number;
  plan: (WorkoutExercise | null)[];
};

export const WorkoutStepperContext = createContext<WorkoutStepperContextValue>();

export const useWorkoutStepperContext = (): WorkoutStepperContextValue => {
  const context = useContext(WorkoutStepperContext);

  if (context === undefined) {
    throw new Error("The 'useWorkoutStepperContext' primitive must be used within a <WorkoutStepper> component.");
  }

  return context;
};

export const createWorkoutStepperContextValue = (workout: Workout): WorkoutStepperContextValue => {
  const character = useCharacter();
  const stepper = Stepper.useContext();

  const [workoutSession, setWorkoutSession] = createSignal<WorkoutSession | null>(null);

  const completedCount = createMemo(() => workoutSession()?.exercises.filter((exercise) => exercise.coins).length ?? 0);
  const skippedCount = createMemo(() => workoutSession()?.exercises.filter((exercise) => !exercise.coins).length ?? 0);

  const coins = createMemo(
    () =>
      workoutSession()
        ?.exercises.map((exercises) => exercises.coins)
        .reduce((sum, coins) => sum + coins, 0) ?? 0,
  );

  const elapsed = createMemo(() => {
    const session = workoutSession();

    if (session === null || !session.endTimestamp || !session.startTimestamp) {
      return 0;
    }

    return session.endTimestamp - session.startTimestamp;
  });

  const plan = createMemo(() => {
    const plan: (WorkoutExercise | null)[] = [];

    workout.exercises.forEach((exercise) => {
      plan.push(exercise);
      plan.push(null);
    });

    return plan;
  });

  const skip = (exercise: Exercise) => {
    setWorkoutSession((prev) => ({
      ...prev!,
      exercises: [
        ...prev!.exercises,
        {
          id: exercise.id!,
          coins: 0,
        },
      ],
    }));

    stepper.moveForward();
  };

  const complete = (exercise: Exercise) => {
    const cost = getExerciseCost(exercise);

    setWorkoutSession((prev) => ({
      ...prev!,
      exercises: [
        ...prev!.exercises,
        {
          id: exercise.id!,
          coins: cost,
        },
      ],
    }));

    character.setCharacter("coins", (prev) => prev + cost);

    toast.custom(
      () =>
        (() => (
          <div class="relative flex w-full min-w-80 items-center gap-1 rounded-xl border border-bg-secondary bg-bg-primary p-4 text-fg-body shadow-xl">
            <StarIcon class="size-6 text-amber-600" />
            <SparklesText>Получено {cost} монеток!</SparklesText>
          </div>
        )) as unknown as JSX.Element,
    );

    stepper.moveForward();
  };

  const end = () => {
    const session = workoutSession();

    if (!session?.endTimestamp) {
      setWorkoutSession((prev) => ({ ...prev!, endTimestamp: Date.now() }));
      character.setCharacter("workoutsCompleted", (prev) => prev + 1);
    }
  };

  onMount(async () => {
    const session: WorkoutSession = {
      workoutId: workout.id,
      startTimestamp: Date.now(),
      exercises: [],
    };

    const id = await db.workoutSessions.add(session);

    session.id = id;

    setWorkoutSession(session);
  });

  onCleanup(() => {
    end();
  });

  useBeforeLeave(() => {
    end();
  });

  createEffect(async () => {
    const session = workoutSession();

    if (session === null) {
      return;
    }

    await db.workoutSessions.update(session.id!, session);
  });

  return {
    skip,
    complete,
    end,
    get workout() {
      return workout;
    },
    get completed() {
      return completedCount();
    },
    get skipped() {
      return skippedCount();
    },
    get coins() {
      return coins();
    },
    get elapsed() {
      return elapsed();
    },
    get plan() {
      return plan();
    },
  };
};

export default useWorkoutStepperContext;
