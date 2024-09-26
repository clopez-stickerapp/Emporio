import { getContext, setContext } from 'svelte';
import type { HTMLInputTypeAttribute } from 'svelte/elements';
import type { Readable, Subscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';

const NAME = 'form-item';

export type FormInputContext = { type: HTMLInputTypeAttribute };
export type FormInputStore = Writable<FormInputContext>;

export function initCtx(props: Partial<FormInputContext> = {}) {
  const ctx = writable(props as FormInputContext);
  setContext<FormInputStore>(NAME, ctx);
}

export function setCtx(props: Partial<FormInputContext>) {
  const ctx = getContext<FormInputStore>(NAME);

  ctx.update((prev) => ({ ...prev, ...props }));
}

export function getCtx() {
  return getContext<Readable<FormInputContext>>(NAME);
}

export function subscribe(run: Subscriber<FormInputContext>) {
  const ctx = getContext<FormInputStore>(NAME);

  return ctx.subscribe(run);
}
