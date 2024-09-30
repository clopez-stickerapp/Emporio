<script lang="ts">
  import type { NavigationMenuItemProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: NavigationMenuItemProps = $props();
</script>

<li class={cn(className)} {...rest}>
  {@render children()}
</li>
