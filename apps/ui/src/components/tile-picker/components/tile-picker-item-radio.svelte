<script lang="ts">
  import { createRadioGroup, melt } from '@melt-ui/svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { onDestroy } from 'svelte';
  import { Label } from 'components/label';
  import type { TilePickerItemProps } from '../types';
  import { subscribe } from '../ctx';
  import { cn } from '$lib/utils';

  const {
    class: className,
    id,
    name,
    value,
    label,
    img,
    ...rest
  }: TilePickerItemProps & { name: string } = $props();

  let item = $state<ReturnType<typeof createRadioGroup>['elements']['item']>();
  let hiddenInput = $state<ReturnType<typeof createRadioGroup>['elements']['hiddenInput']>();

  const unsubscribe = subscribe((ctx) => {
    item = ctx.builder.elements.item;
    hiddenInput = ctx.builder.elements.hiddenInput;
  });

  onDestroy(unsubscribe);

  const classes = cn(
    'flex appearance-none flex-col items-center justify-center bg-white p-2 text-st-gray-900 data-[state=checked]:ring-st-yellow-500',
    'ring-2',
    'ring-inset',
    'ring-gray-300',
    'focus:ring-st-yellow-600',
    'hover:ring-st-yellow-600',
    'rounded-2xl',
    className,
  );
</script>

<div class="flex max-w-20 flex-col items-center">
  <button
    use:melt={$item!(value)}
    class={classes}
    {id}
    {...rest as HTMLButtonAttributes}
    aria-labelledby={`${id}-label`}
  >
    <img src={img} aria-hidden="true" alt="" class="size-16" />
  </button>
  <Label id={`${id}-label`} class="text-center">{label}</Label>
  <input use:melt={$hiddenInput!} {name} />
</div>
