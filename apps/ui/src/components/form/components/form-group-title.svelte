<script lang="ts">
  import type { FormGroupTitleProps } from '../types';
  import { cn } from '$lib/utils';

  const { children, class: className, ...rest }: FormGroupTitleProps = $props();
</script>

<legend class={cn('text-base font-semibold leading-7 text-gray-900', className)} {...rest}>
  {@render children?.()}
</legend>
