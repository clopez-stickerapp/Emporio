<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import type { DialogContentProps } from '../types';
  import { getCtx } from '../ctx';
  import { cn } from '$lib/utils';

  const { class: className, children, ...rest }: DialogContentProps = $props();

  const {
    elements: { content },
  } = getCtx();
</script>

<div
  class={cn(
    'fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg',
    className,
  )}
  use:melt={$content}
  {...rest}
>
  {@render children?.()}
</div>
