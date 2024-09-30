<script lang="ts">
  import type { NavigationMenuRootProps } from '../types';
  import { cn } from '$lib/utils';

  let {
    class: className,
    children,
    orientation = 'horizontal',
    ...rest
  }: NavigationMenuRootProps = $props();
</script>

<nav
  class={cn('flex flex-1', { 'flex-col': orientation === 'vertical' }, className)}
  {...rest}
  data-orientation={orientation}
>
  {@render children()}
</nav>
