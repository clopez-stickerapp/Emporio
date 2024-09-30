<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { btn } from 'components/button/variants';
  import { getCtx } from '../ctx';
  import type { DialogTriggerProps } from '../types';
  import { cn } from '$lib/utils';

  const { children, class: className, ...rest }: DialogTriggerProps = $props();

  const {
    elements: { trigger },
  } = getCtx();
</script>

<button use:melt={$trigger} class={cn(btn(rest), className)} {...rest}>
  {@render children?.()}
</button>
