<script lang="ts">
  import { createSwitch, melt } from '@melt-ui/svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import type { SwitchProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, id, name, ...rest }: SwitchProps = $props();

  const {
    elements: { root, input },
  } = createSwitch({});

  const classes = cn(
    'w-[2.75rem]',
    'relative',
    'h-6',
    'cursor-default',
    'rounded-full',
    'bg-gray-200',
    'transition-colors',
    'data-[state=checked]:bg-st-yellow-500',
    'ring-1',
    'ring-inset',
    'ring-gray-300',
    'focus:ring-2',
    'focus:ring-inset',
    'focus:ring-indigo-600',
    className,
  );
</script>

<!-- svelte-ignore a11y_consider_explicit_label -->
<button use:melt={$root} class={classes} {id} {...rest as HTMLButtonAttributes} type="button">
  <span class={cn('thumb', 'block', 'rounded-full', 'bg-white', 'transition')}></span>
</button>
<input use:melt={$input} type="hidden" {name} />

<style>
  button {
    --w: 2.75rem;
    --padding: 0.125rem;
    width: var(--w);
  }

  .thumb {
    --size: 1.25rem;
    width: var(--size);
    height: var(--size);
    /* Initially, place the thumb on the left */
    transform: translateX(var(--padding));
    transition: transform 0.1s ease-in-out;
  }

  [data-state='checked'] .thumb {
    /* When checked, move the thumb to the right */
    transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
  }
</style>
