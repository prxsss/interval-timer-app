import type { InjectionKey } from 'vue';

export const removeIntervalKey = Symbol() as InjectionKey<(id: string) => void>;
