<script lang="ts">
  import type { InputProps } from '../types';
  import Checkbox from './checkbox.svelte';
  import { cn } from '$lib/utils';

  const { class: className, type, ...rest }: InputProps = $props();

  const classes = cn(
    [
      'text-st-gray-900',
      'placeholder:text-st-gray-400',
      'block',
      'sm:text-sm',
      'sm:leading-6',
      'w-full',
      'rounded-md',
      'border-0',
      'py-1.5',
      'shadow-sm',
      'ring-1',
      'ring-inset',
      'ring-gray-300',
      'focus:ring-2',
      'focus:ring-inset',
      'focus:ring-indigo-600',
      'disabled:bg-st-gray-200',
      'disabled:cursor-not-allowed',
    ],
    className,
  );
</script>

{#if type === 'checkbox'}
  <Checkbox class={className} {...rest} />
{:else}
  <input class={classes} {type} {...rest} />
{/if}
