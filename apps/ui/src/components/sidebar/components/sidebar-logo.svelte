<script lang="ts">
  import type { SidebarLogoProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, ...rest }: SidebarLogoProps = $props();
</script>

<img class={cn('h-8 w-auto', className)} {...rest} />
