<script lang="ts">
  import type { PageRootProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: PageRootProps = $props();
</script>

<main class={cn('grid grid-cols-12 px-4 py-12 pb-12 sm:px-6 lg:px-8', className)} {...rest}>
  {@render children()}
</main>
