<script lang="ts">
  import type { NavigationMenuListProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: NavigationMenuListProps = $props();
</script>

<ul class={cn('flex flex-1 flex-col gap-y-1', className)} {...rest}>
  {@render children()}
</ul>
