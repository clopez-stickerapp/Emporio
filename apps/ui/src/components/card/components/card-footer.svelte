<script lang="ts">
  import type { CardFooterProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: CardFooterProps = $props();
</script>

<div class={cn('px-4 py-4 sm:px-6', className)} {...rest}>
  {@render children?.()}
</div>
