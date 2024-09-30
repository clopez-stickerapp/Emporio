<script lang="ts">
  import type { CardRootProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: CardRootProps = $props();
</script>

<div
  class={cn('divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow', className)}
  {...rest}
>
  {@render children?.()}
</div>
