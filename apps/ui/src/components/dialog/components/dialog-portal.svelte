<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { getCtx } from '../ctx';
  import type { DialogPortalProps } from '../types';

  const { children }: DialogPortalProps = $props();

  const {
    elements: { portalled },
    states: { open },
  } = getCtx();
</script>

{#if open}
  <div use:melt={$portalled}>{@render children()}</div>
{/if}
