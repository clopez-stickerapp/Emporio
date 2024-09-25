<script lang="ts">
  import type { CardHeaderProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: CardHeaderProps = $props();
</script>

<div class={cn('px-4 py-5 sm:px-6', className)} {...rest}>
  {@render children?.()}
</div>
