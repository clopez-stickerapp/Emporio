import { createRadioGroup } from '@melt-ui/svelte';
import { getContext, setContext } from 'svelte';
import type { ChangeFn } from '@melt-ui/svelte/internal/helpers';
import type { OnChange } from './types';

const NAME = Symbol('tile-picker');

export type TilePickerContext<Multiple extends boolean> = {
  name: string;
  multiple: Multiple;
  builder: ReturnType<typeof createRadioGroup>;
  onchange?: OnChange<Multiple>;
  value: string[];
};

export function initCtx<Multiple extends boolean>(
  props: Partial<TilePickerContext<Multiple>> = {},
) {
  const onValueChange: ChangeFn<string> = ({ next }) => {
    if (!props.multiple) {
      (props.onchange as OnChange<false>)?.(next);
    }
    return next;
  };

  const builder = createRadioGroup({
    onValueChange: !props.multiple ? onValueChange : undefined,
    orientation: 'horizontal',
  });

  const contextState = $state({
    ...props,
    value: [],
    builder,
  } as TilePickerContext<Multiple>);

  setContext(NAME, contextState);

  return builder;
}

export function setCtx<Multiple extends boolean>(props: Partial<TilePickerContext<Multiple>>) {
  const ctx = getContext<TilePickerContext<Multiple>>(NAME);
  Object.assign(ctx, props);
}

export const createValueUpdater = <Multiple extends boolean>() => {
  const ctx = getContext<TilePickerContext<Multiple>>(NAME);

  return (fn: (prev: string[]) => string[]) => {
    const updatedValue = fn(ctx.value);

    if (ctx.multiple) {
      (ctx.onchange as OnChange<true>)?.(updatedValue);
    } else {
      (ctx.onchange as OnChange<false>)?.(updatedValue[0]);
    }

    ctx.value = updatedValue;
  };
};

export function getCtx<Multiple extends boolean>() {
  return getContext<TilePickerContext<Multiple>>(NAME);
}
