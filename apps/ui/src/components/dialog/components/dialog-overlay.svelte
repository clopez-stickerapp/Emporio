<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { getCtx } from '../ctx';
  import type { DialogOverlayProps } from '../types';
  import { cn } from '$lib/utils';

  const { class: className, ...rest }: DialogOverlayProps = $props();

  const {
    elements: { overlay },
  } = getCtx();
</script>

<div class={cn('fixed inset-0 z-50 bg-black/50', className)} use:melt={$overlay} {...rest}></div>
