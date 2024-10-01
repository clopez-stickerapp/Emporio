<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { getCtx } from '../ctx';
  import type { DropdownMenuContentProps } from '../types';
  import { cn } from '$lib/utils';

  const { children, class: className, ...rest }: DropdownMenuContentProps = $props();

  const {
    elements: { menu },
  } = getCtx();
</script>

<div
  use:melt={$menu}
  class={cn('min-w-48 divide-y divide-gray-100 rounded-md bg-white shadow', className)}
  {...rest}
>
  {@render children?.()}
</div>
