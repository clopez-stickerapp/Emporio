<script lang="ts">
  import type { CardContentProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: CardContentProps = $props();
</script>

<div class={cn('px-4 py-5 sm:p-6', className)} {...rest}>
  {@render children?.()}
</div>
