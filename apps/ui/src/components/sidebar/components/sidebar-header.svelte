<script lang="ts">
  import type { SidebarHeaderProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: SidebarHeaderProps = $props();
</script>

<div class={cn('flex h-16 shrink-0 items-center', className)} {...rest}>
  {@render children()}
</div>
