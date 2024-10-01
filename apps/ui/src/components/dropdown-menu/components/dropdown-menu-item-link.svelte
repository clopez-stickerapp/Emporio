<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { getCtx } from '../ctx';
  import type { DropdownMenuItemLinkProps } from '../types';
  import { cn } from '$lib/utils';

  const { children, class: className, ...rest }: DropdownMenuItemLinkProps = $props();

  const {
    elements: { item },
  } = getCtx();
</script>

<a
  use:melt={$item}
  class={cn(
    'block cursor-pointer px-4 py-2 text-sm text-st-gray-700 hover:bg-st-gray-100',
    className,
  )}
  {...rest}
>
  {@render children?.()}
</a>
