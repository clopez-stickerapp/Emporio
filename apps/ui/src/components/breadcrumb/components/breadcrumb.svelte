<script lang="ts">
  import type { BreadcrumbRootProps } from '../types';
  import { cn } from '$lib/utils';

  const { children, class: className, ...rest }: BreadcrumbRootProps = $props();
</script>

<nav class={cn('flex', className)} {...rest}>
  <ol role="list" class="flex space-x-4 rounded-md bg-white px-6 shadow">
    {@render children?.()}
  </ol>
</nav>
