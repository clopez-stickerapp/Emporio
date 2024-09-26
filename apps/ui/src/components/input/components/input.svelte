<script lang="ts">
  import type { VariantProps } from 'class-variance-authority';
  import { cva } from 'class-variance-authority';
  import type { InputProps } from '../types';
  import { cn } from '$lib/utils';

  let { class: className, type, ...rest }: InputProps = $props();

  const inputStyles = cva(
    ['text-st-gray-900', 'placeholder:text-st-gray-400', 'block', 'sm:text-sm', 'sm:leading-6'],
    {
      variants: {
        type: {
          text: [
            'w-full',
            'rounded-md',
            'border-0',
            'py-1.5',
            'shadow-sm',
            'ring-1',
            'ring-inset',
            'ring-gray-300',
            'focus:ring-2',
            'focus:ring-inset',
            'focus:ring-indigo-600',
          ],
          checkbox: [
            'h-4',
            'w-4',
            'rounded',
            'border-gray-300',
            'text-indigo-600',
            'focus:ring-indigo-600',
          ],
        },
      },
      defaultVariants: {
        type: 'text',
      },
    },
  );

  const classes = cn(
    inputStyles({ type: type as VariantProps<typeof inputStyles>['type'] }),
    className,
  );
</script>

<input class={classes} {type} {...rest} />
