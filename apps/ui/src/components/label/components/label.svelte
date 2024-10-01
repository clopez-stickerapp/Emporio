<script lang="ts">
  import type { LabelProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, children, ...rest }: LabelProps = $props();
</script>

<label class={cn('block text-sm font-medium leading-6 text-st-gray-900', className)} {...rest}>
  {@render children?.()}
</label>
