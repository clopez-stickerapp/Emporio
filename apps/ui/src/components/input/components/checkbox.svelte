<script lang="ts">
  import { createCheckbox, melt } from '@melt-ui/svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { Check } from 'components/icon';
  import type { InputProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, id, name, onchange, ...rest }: InputProps = $props();

  const {
    elements: { root, input },
    helpers: { isChecked },
  } = createCheckbox({});

  const classes = cn(
    'flex size-4 appearance-none items-center justify-center rounded bg-white text-st-gray-900 hover:opacity-75 data-[state=checked]:bg-st-yellow-200',
    'ring-1',
    'ring-inset',
    'ring-gray-300',
    'focus:ring-2',
    'focus:ring-inset',
    'focus:ring-indigo-600',
    className,
  );
</script>

<button use:melt={$root} class={classes} {id} {...rest as HTMLButtonAttributes}>
  {#if $isChecked}
    <Check class="size-3" />
  {/if}
  <input use:melt={$input} type="hidden" {name} {onchange} />
</button>
