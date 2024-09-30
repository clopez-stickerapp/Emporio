<script lang="ts">
  import { X } from 'components/icon';
  import type { DialogXProps } from '../types';
  import DialogClose from './dialog-close.svelte';
  import { cn } from '$lib/utils';

  const { class: className, ...rest }: DialogXProps = $props();
</script>

<DialogClose
  aria-label="Close"
  class={cn('absolute right-2 top-2 p-1 text-st-gray-500 hover:text-st-gray-900', className)}
  variant="ghost"
  size="icon"
  {...rest}
>
  <X class="size-5" />
</DialogClose>
