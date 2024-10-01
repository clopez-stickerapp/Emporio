<script lang="ts">
  import type { PageRootProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: PageRootProps = $props();
</script>

<main
  class={cn(
    'grid auto-rows-max grid-cols-12 gap-4 px-4 py-6 pb-12  sm:px-6 lg:gap-6 lg:px-8',
    className,
  )}
  {...rest}
>
  {@render children()}
</main>
