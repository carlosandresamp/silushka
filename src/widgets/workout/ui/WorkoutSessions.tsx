import { For } from "solid-js";

import { WorkoutSession } from "@shared/db";
import DateTime from "@shared/ui/date-time";
import Number from "@shared/ui/number";

import StarIcon from "~icons/ic/round-star";

export type WorkoutSessionsProps = {
  sessions: WorkoutSession[];
};

export const WorkoutSessions = (props: WorkoutSessionsProps) => {
  return (
    <ul class="divide-y divide-bg-primary">
      <For
        each={Object.entries(
          props.sessions
            .filter((session) => session.endTimestamp !== undefined)
            .sort((a, b) => b.endTimestamp!.valueOf() - a.endTimestamp!.valueOf())
            .reduce((acc: { [date: string]: WorkoutSession[] }, session) => {
              const endDate = new Date(session.endTimestamp!);
              const dateString = endDate.toLocaleDateString();

              if (!acc[dateString]) {
                acc[dateString] = [];
              }

              acc[dateString].push(session);
              return acc;
            }, {}),
        )}
      >
        {([date, sessions]) => (
          <li class="py-4">
            <h3 class="font-semibold text-lg">{date}</h3>
            <ul>
              <For each={sessions}>
                {(session) => {
                  const durationMinutes = Math.floor((session.endTimestamp! - session.startTimestamp) / 60000);
                  const totalCoins = session.exercises.reduce((sum, exercise) => sum + exercise.coins, 0);
                  const endDate = new Date(session.endTimestamp!);

                  return (
                    <li class="flex justify-between items-center py-2">
                      <div class="flex flex-col">
                        <DateTime
                          class="font-medium"
                          options={{
                            timeStyle: "short",
                          }}
                        >
                          {endDate}
                        </DateTime>
                        <div class="flex items-center text-sm">
                          <StarIcon class="size-6 text-amber-600" />
                          <p class="text-fg-primary leading-none">
                            +<span class="font-semibold">{totalCoins}</span> монет
                          </p>
                        </div>
                      </div>
                      <Number
                        class="text-fg-tertiary"
                        options={{
                          unit: "minute",
                          style: "unit",
                        }}
                      >
                        {durationMinutes}
                      </Number>
                    </li>
                  );
                }}
              </For>
            </ul>
          </li>
        )}
      </For>
    </ul>
  );
};
