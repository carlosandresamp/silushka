import { Show } from "solid-js";

import Button from "@shared/ui/button";
import Collapse from "@shared/ui/collapse";
import Stepper from "@shared/ui/stepper";
import Timer from "@shared/ui/timer";

import MinusIcon from "~icons/ic/round-minus";
import PauseIcon from "~icons/ic/round-pause";
import PlayIcon from "~icons/ic/round-play-arrow";
import PlusIcon from "~icons/ic/round-plus";

export type WorkoutStepperPauseStepProps = {
  pause: number;
};

export const WorkoutStepperPauseStep = (props: WorkoutStepperPauseStepProps) => {
  return (
    <Stepper.Step class="flex grow flex-col items-stretch justify-center space-y-2 text-center">
      {(step) => (
        <Timer seconds={props.pause * 60} paused={!step.current}>
          {(timer) => (
            <>
              <h2 class="font-semibold text-fg-tertiary">Отдых</h2>

              <Timer.Time class="text-6xl font-semibold" />

              <div class="flex items-center justify-center gap-2">
                <Timer.Trigger
                  as={Button}
                  action="sub"
                  seconds={10}
                  size="lg"
                  shape="circle"
                  spacing="xs"
                  variant="gray"
                  appearance="secondary"
                  aria-label="Минус 10 секунд"
                >
                  <MinusIcon class="size-10" />
                </Timer.Trigger>

                <Timer.Toggle
                  as={Button}
                  size="lg"
                  shape="circle"
                  spacing="xs"
                  variant="gray"
                  appearance="positive"
                  aria-label={timer.paused ? "Продолжить" : "Приостановить"}
                  data-testid="toggle-timer"
                >
                  <Show when={timer.paused} fallback={<PauseIcon class="size-14" />}>
                    <PlayIcon class="size-14" />
                  </Show>
                </Timer.Toggle>

                <Timer.Trigger
                  as={Button}
                  action="add"
                  seconds={10}
                  size="lg"
                  shape="circle"
                  spacing="xs"
                  variant="gray"
                  appearance="secondary"
                  aria-label="Плюс 10 секунд"
                >
                  <PlusIcon class="size-10" />
                </Timer.Trigger>
              </div>

              <Collapse>
                <Show when={timer.paused || timer.ended}>
                  <Stepper.Forward
                    as={Button}
                    spacing="lg"
                    class="mt-4 self-center"
                    appearance={timer.ended ? "accent" : "tertiary"}
                    variant={timer.ended ? "fill" : "ghost"}
                    shimmer={timer.ended}
                    data-testid="skip"
                  >
                    {timer.ended ? "Продолжить" : "Пропустить"}
                  </Stepper.Forward>
                </Show>
              </Collapse>
            </>
          )}
        </Timer>
      )}
    </Stepper.Step>
  );
};
