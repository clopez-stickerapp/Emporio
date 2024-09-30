<script lang="ts">
  import { melt } from '@melt-ui/svelte';
  import { getCtx } from '../ctx';
  import type { DialogDescriptionProps } from '../types';
  import { cn } from '$lib/utils';

  const { class: className, children, ...rest }: DialogDescriptionProps = $props();

  const {
    elements: { description },
  } = getCtx();
</script>

<p
  class={cn('mb-5 mt-2 text-sm leading-normal text-st-gray-600', className)}
  use:melt={$description}
  {...rest}
>
  {@render children?.()}
</p>
