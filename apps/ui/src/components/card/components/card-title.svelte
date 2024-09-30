<script lang="ts">
  import type { CardTitleProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, as = 'h3', ...rest }: CardTitleProps = $props();
</script>

<svelte:element
  this={as}
  class={cn('font-semibold leading-none tracking-tight', className)}
  {...rest}
>
  {@render children?.()}
</svelte:element>
