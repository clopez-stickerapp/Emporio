<script lang="ts">
  import type { SidebarRootProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: SidebarRootProps = $props();
</script>

<aside class={cn('h-full w-72', className)} {...rest}>
  {@render children()}
</aside>
