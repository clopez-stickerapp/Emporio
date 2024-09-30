<script lang="ts">
  import type { NavigationMenuLinkProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, isActive, ...rest }: NavigationMenuLinkProps = $props();
</script>

<a
  class={cn(
    'group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-st-gray-300 hover:bg-st-gray-900 hover:text-white',
    { 'bg-st-gray-900 text-white': isActive },
    className,
  )}
  {...rest}
  aria-current={isActive ? 'page' : undefined}
>
  {#if children}
    {@render children()}
  {/if}
</a>
