import { PromiseExtended, liveQuery } from "dexie";
import { Accessor, MemoOptions, createEffect, createMemo, from, on, onCleanup } from "solid-js";
import { ReconcileOptions, createStore, reconcile } from "solid-js/store";

export function createSignalQuery<T>(
  querier: () => (T extends unknown[] ? never : T) | PromiseExtended<T extends unknown[] ? never : T>,
  options?: MemoOptions<T>,
): Accessor<T | undefined> {
  const get = createMemo(() => from<T>(liveQuery(querier)), options);
  return () => get()();
}

export function createStoreQuery<T>(querier: () => T[] | Promise<T[]>, options?: ReconcileOptions): T[] {
  const [store, setStore] = createStore<T[]>([]);

  createEffect(
    on(querier, () => {
      const subscription = liveQuery(querier).subscribe((value) => setStore(reconcile(value, options)));

      onCleanup(() => {
        subscription.unsubscribe();
      });
    }),
  );

  return store;
}
