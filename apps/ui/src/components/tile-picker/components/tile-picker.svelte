<script lang="ts" generics="Multiple extends boolean">
  import { melt } from '@melt-ui/svelte';
  import type { TilePickerRootProps } from '../types';
  import { initCtx } from '../ctx.svelte';
  import { cn } from '$lib/utils';

  const {
    children,
    class: className,
    name,
    multiple = false,
    onchange,
    ...rest
  }: TilePickerRootProps<Multiple> = $props();

  const {
    elements: { root },
  } = initCtx({ name, multiple, onchange });

  const classes = cn('flex flex-wrap gap-4', className);
</script>

{#if multiple}
  <div class={classes} {...rest}>
    {@render children?.()}
  </div>
{:else}
  <div class={classes} {...rest} use:melt={$root}>
    {@render children?.()}
  </div>
{/if}
