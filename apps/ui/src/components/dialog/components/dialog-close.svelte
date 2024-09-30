<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { btn } from 'components/button/variants';
  import { getCtx } from '../ctx';
  import type { DialogCloseProps } from '../types';
  import { cn } from '$lib/utils';

  const { class: className, children, ...rest }: DialogCloseProps = $props();

  const {
    elements: { close },
  } = getCtx();
</script>

<button class={cn(btn(rest), className)} use:melt={$close} {...rest}>{@render children?.()}</button>
