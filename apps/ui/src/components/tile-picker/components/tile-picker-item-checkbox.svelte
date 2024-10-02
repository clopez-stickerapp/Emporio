<script lang="ts">
  import { createCheckbox, melt } from '@melt-ui/svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { Label } from 'components/label';
  import type { TilePickerItemProps } from '../types';
  import { createValueUpdater } from '../ctx.svelte';
  import { cn } from '$lib/utils';

  const onchange = createValueUpdater();

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
  } = createCheckbox({
    onCheckedChange: ({ next }) => {
      onchange((prev) => (next ? [...prev, value] : prev.filter((item) => item !== value)));

      return next;
    },
  });

  const classes = cn(
    'flex appearance-none flex-col items-center justify-center bg-white p-2 text-st-gray-900 data-[state=checked]:ring-st-yellow-500',
    'ring-2',
    'ring-inset',
    'ring-gray-300',
    'focusin:ring-st-yellow-600',
    'hover:ring-st-yellow-600',
    'rounded-2xl',
    rest.disabled ? 'pointer-events-none' : '',
    className,
  );

  const labelClasses = cn('text-center', rest.disabled ? 'cursor-not-allowed' : '');

  const parentClasses = cn(
    'w-20',
    'overflow-hidden',
    'text-ellipsis',
    'whitespace-nowrap',
    'text-center',
    rest.disabled ? 'cursor-not-allowed opacity-50' : '',
  );
</script>

<div class={parentClasses}>
  <button
    use:melt={$root}
    class={classes}
    {id}
    {...rest as HTMLButtonAttributes}
    aria-labelledby={`${id}-label`}
  >
    <img src={img} aria-hidden="true" alt="" class="size-16" />
  </button>
  <Label id={`${id}-label`} class={labelClasses}>{label}</Label>
  <input use:melt={$input} type="hidden" {name} {value} />
</div>
