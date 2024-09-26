<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { Check } from 'components/icon';
  import type { SelectOptionProps } from '../types';
  import { getCtx } from '../ctx';
  import { cn } from '$lib/utils';

  const { label, value }: SelectOptionProps = $props();

  const {
    elements: { option },
    helpers: { isSelected },
  } = getCtx();
</script>

<div
  class={cn([
    'relative',
    'cursor-pointer',
    'rounded-lg',
    'py-1',
    'pl-4',
    'pr-4',
    'text-neutral-800',
    'hover:bg-st-yellow-100',
    'focus:z-10',
    'focus:text-st-yellow-700',
    'data-[selected]:text-st-gray-900',
    'data-[highlighted]:bg-st-yellow-100',
    'data-[selected]:bg-st-yellow-200',
    'data-[highlighted]:text-st-gray-900',
    'data-[disabled]:opacity-50',
  ])}
  use:melt={$option({ value, label })}
>
  <div
    class={cn(
      [
        'absolute',
        'inset-y-0',
        'right-0',
        'pr-4',
        'top-1/2',
        'z-20',
        'translate-x-0',
        'translate-y-[calc(-50%_+_1px)]',
      ],
      {
        hidden: !$isSelected(value),
        block: $isSelected(value),
      },
    )}
  >
    <Check class="size-4" />
  </div>
  {label}
</div>
