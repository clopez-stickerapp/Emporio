<script lang="ts">
  import { cva } from 'class-variance-authority';
  import type { VariantProps } from 'class-variance-authority';

  import { onDestroy } from 'svelte';
  import type { FormItemProps } from '../types';
  import { initCtx, subscribe } from '../ctx';
  import { cn } from '$lib/utils';

  const formItem = cva([], {
    variants: {
      type: {
        text: ['space-y-2'],
        checkbox: ['relative', 'flex', 'items-start'],
      },
    },
    defaultVariants: {
      type: 'text',
    },
  });

  type FormItemStyleType = VariantProps<typeof formItem>['type'];

  let inputType = $state<FormItemStyleType>('text');

  initCtx();

  const unsubscribe = subscribe((ctx) => {
    inputType = ctx.type as FormItemStyleType;
  });

  onDestroy(unsubscribe);

  const { class: className, children, ...rest }: FormItemProps = $props();
</script>

<div class={cn(formItem({ type: inputType }), className)} {...rest}>
  {@render children?.()}
</div>
