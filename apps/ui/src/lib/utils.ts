import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Writable } from 'svelte/store';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOptionUpdater<Options extends Record<string, Writable<unknown>>>(
  options: Options,
) {
  return <Key extends keyof Options>(
    key: Key,
    value: Options[Key] extends Writable<infer Value> ? Value : never | undefined,
  ) => {
    if (value !== undefined) {
      options[key].set(value);
    }
  };
}
