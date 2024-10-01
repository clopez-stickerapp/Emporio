<script lang="ts">
  import type { BreadcrumbLinkProps } from '../types';
  import { cn } from '$lib/utils';

  const { children, class: className, current, ...rest }: BreadcrumbLinkProps = $props();
</script>

<a
  role="link"
  tabindex="0"
  aria-current={current ? 'page' : undefined}
  aria-disabled={current ? 'true' : undefined}
  onclick={(e) => {
    if (current) {
      e.preventDefault();
    }
  }}
  class={cn(
    'flex cursor-pointer items-center gap-2 py-2 text-sm font-medium text-st-gray-500 hover:text-st-gray-700',
    className,
  )}
  {...rest}
>
  {@render children?.()}
</a>
