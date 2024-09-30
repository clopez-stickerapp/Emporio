import { createRadioGroup } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import type { Readable, Subscriber, Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
import type { OnChange } from './types';

const NAME = 'tile-picker';

export type TilePickerContext<Multiple extends boolean = false> = {
  name: string;
  multiple: Multiple;
  builder: ReturnType<typeof createRadioGroup>;
  onchange?: OnChange<Multiple>;
  value: string[];
};
export type TilePickerStore = Writable<TilePickerContext>;

export function initCtx<Multiple extends boolean>(
  props: Partial<TilePickerContext<Multiple>> = {},
) {
  const onValueChange: ChangeFn<string> = ({ next }) => {
    (props.onchange as OnChange<false>)?.(next);
    return next;
  };

  const builder = createRadioGroup({
    onValueChange: !props.multiple ? onValueChange : undefined,
    orientation: 'horizontal',
  });
  const ctx = writable({ ...props, value: [], builder } as TilePickerContext);
  setContext<TilePickerStore>(NAME, ctx);

  return builder;
}

export function setCtx(props: Partial<TilePickerContext>) {
  const ctx = getContext<TilePickerStore>(NAME);

  ctx.update((prev) => ({ ...prev, ...props }));
}

export const createValueUpdater = () => {
  const ctx = getContext<TilePickerStore>(NAME);

  return (fn: (prev: string[]) => string[]) => {
    ctx.update((prev) => {
      const value = fn(prev.value);

      if (prev.onchange && prev.multiple) {
        (prev.onchange as unknown as OnChange<true>)(value);
      }

      return { ...prev, value };
    });
  };
};

export function getCtx() {
  return getContext<Readable<TilePickerContext>>(NAME);
}

export function subscribe(run: Subscriber<TilePickerContext>) {
  const ctx = getContext<TilePickerStore>(NAME);

  return ctx.subscribe(run);
}
