<script lang="ts">
  import type { SidebarContentProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: SidebarContentProps = $props();
</script>

<div
  class={cn(
    'flex h-full grow flex-col gap-y-5 overflow-y-auto bg-st-gray-800 px-6 pb-4 ring-1 ring-white/10',
    className,
  )}
  {...rest}
>
  {@render children()}
</div>
