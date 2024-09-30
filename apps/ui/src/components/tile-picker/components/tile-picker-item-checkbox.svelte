<script lang="ts">
  import { createCheckbox, melt } from '@melt-ui/svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { Label } from 'components/label';
  import type { TilePickerItemProps } from '../types';
  import { cn } from '$lib/utils';

  const {
    class: className,
    id,
    name,
    label,
    value,
    img,
    ...rest
  }: TilePickerItemProps & { name: string } = $props();

  const {
    elements: { root, input },
  } = createCheckbox({});

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

<div class="w-20 overflow-hidden text-ellipsis whitespace-nowrap text-center">
  <button
    use:melt={$root}
    class={classes}
    {id}
    {...rest as HTMLButtonAttributes}
    aria-labelledby={`${id}-label`}
  >
    <img src={img} aria-hidden="true" alt="" class="size-16" />
  </button>
  <Label id={`${id}-label`} class="text-center">{label}</Label>
  <input use:melt={$input} type="hidden" {name} {value} />
</div>
