<script lang="ts">
  import type { PageTitleProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: PageTitleProps = $props();
</script>

<h1 class={cn('sr-only', className)} {...rest}>
  {#if children}
    {@render children()}
  {/if}
</h1>
