<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { fade } from 'svelte/transition';
  import { melt } from '@melt-ui/svelte';
  import { ChevronDown } from 'components/icon';
  import type { SelectRootProps } from '../types';
  import { setCtx } from '../ctx';
  import { cn } from '$lib/utils';

  const {
    class: className,
    children,
    required = false,
    disabled = false,
    name,
    open: localOpen,
    label: labelText,
    placeholder,
    ...rest
  }: SelectRootProps = $props();

  const {
    elements: { label, trigger, menu, hiddenInput },
    states: { selectedLabel, open },
    updateOption,
  } = setCtx({
    required: required!,
    disabled: disabled!,
    name,
    multiple: false,
    positioning: {
      placement: 'bottom',
      fitViewport: true,
      sameWidth: true,
    },
  });

  $effect(() => {
    if (localOpen !== undefined) {
      open.set(localOpen);
    }

    updateOption('required', required!);
    updateOption('disabled', disabled!);
    updateOption('name', name);
  });
</script>

<div class={cn('flex flex-col gap-y-2', className)}>
  <input use:melt={$hiddenInput} type="hidden" />
  <label class="text-st-gray-90 block text-sm font-medium leading-6" use:melt={$label}>
    {#if typeof labelText === 'string'}
      {labelText}
    {:else}
      {@render labelText()}
    {/if}
  </label>
  <button
    class={cn([
      'flex',
      'items-center',
      'justify-between',
      'text-st-gray-900',
      'sm:text-sm',
      'sm:leading-6',
      'h-10',
      'min-w-[220px]',
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
      'bg-white',
      'py-1.5',
      'px-3',
      'group',
    ])}
    use:melt={$trigger}
    {...rest as HTMLAttributes<HTMLElement>}
  >
    {$selectedLabel || placeholder}
    <ChevronDown class={cn(['group-data-[state=open]:rotate-180'])} />
  </button>
  {#if open}
    <div
      class="z-10 flex max-h-[300px] flex-col
    overflow-y-auto rounded-lg bg-white p-1
    shadow focus:!ring-0"
      use:melt={$menu}
      transition:fade={{ duration: 150 }}
    >
      {@render children?.()}
    </div>
  {/if}
</div>
