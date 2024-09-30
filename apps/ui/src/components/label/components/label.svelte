<script lang="ts">
  import type { LabelProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: LabelProps = $props();
</script>

<label class={cn('text-st-gray-90 text-sm font-medium leading-6', className)} {...rest}>
  {@render children?.()}
</label>
