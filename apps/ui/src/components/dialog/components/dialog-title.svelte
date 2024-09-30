<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { getCtx } from '../ctx';
  import type { DialogTitleProps } from '../types';
  import { cn } from '$lib/utils';

  const { class: className, children, ...rest }: DialogTitleProps = $props();

  const {
    elements: { title },
  } = getCtx();
</script>

<h2
  class={cn('text-lg font-semibold leading-6 text-st-gray-900', className)}
  use:melt={$title}
  {...rest}
>
  {@render children?.()}
</h2>
