import { createRadioGroup } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import type { Readable, Subscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';

const NAME = 'tile-picker';

export type TilePickerContext = {
  name: string;
  multiple: boolean;
  builder: ReturnType<typeof createRadioGroup>;
};
export type TilePickerStore = Writable<TilePickerContext>;

export function initCtx(props: Partial<TilePickerContext> = {}) {
  const builder = createRadioGroup();
  const ctx = writable({ ...props, builder } as TilePickerContext);
  setContext<TilePickerStore>(NAME, ctx);

  return builder;
}

export function setCtx(props: Partial<TilePickerContext>) {
  const ctx = getContext<TilePickerStore>(NAME);

  ctx.update((prev) => ({ ...prev, ...props }));
}

export function getCtx() {
  return getContext<Readable<TilePickerContext>>(NAME);
}

export function subscribe(run: Subscriber<TilePickerContext>) {
  const ctx = getContext<TilePickerStore>(NAME);

  return ctx.subscribe(run);
}
