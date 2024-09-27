<script lang="ts">
  import type { ButtonProps } from '../types';
  import { btn } from '../variants';
  import { cn } from '$lib/utils';

  const {
    class: className,
    children,
    size,
    variant,
    disabled,
    type = 'button',
    ...rest
  }: ButtonProps = $props();
</script>

<button class={cn(btn({ size, variant, disabled }), className)} {disabled} {type} {...rest}>
  {@render children?.()}
</button>
