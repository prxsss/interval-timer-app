import type { InjectionKey, Ref } from 'vue';
import type { Interval } from './interval';

export const intervalsKey = Symbol() as InjectionKey<Ref<Interval[]>>;
export const updateIntervalKey = Symbol() as InjectionKey<
  (intervalData: Interval) => void
>;
export const removeIntervalKey = Symbol() as InjectionKey<(id: string) => void>;
