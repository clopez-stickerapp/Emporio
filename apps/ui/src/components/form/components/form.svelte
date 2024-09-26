<script lang="ts">
  import type { FormRootProps } from '../types';
  import { cn } from '$lib/utils';

  const { class: className, children, ...rest }: FormRootProps = $props();
</script>

<form class={cn('space-y-4', className)} {...rest}>
  {@render children?.()}
</form>
