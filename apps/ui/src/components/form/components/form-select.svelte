<script lang="ts">
  import * as Select from '../../select';
  import type { FormSelectProps } from '../types';
  import { cn } from '$lib/utils';

  const {
    class: className,
    label: localLabel,
    id,
    description,
    hint,
    name,
    children,
    placeholder,
  }: FormSelectProps = $props();

  const descriptionId = description ? `${id}-desc` : undefined;
</script>

<Select.Root
  class={cn(['[&_label]:flex', '[&_label]:justify-between'], className)}
  {name}
  {id}
  {placeholder}
  aria-describedby={descriptionId}
>
  {#snippet label()}
    {#if hint}
      <span>{localLabel}</span>
      <span class="text-sm leading-6 text-gray-500">
        {hint}
      </span>
    {:else}
      {localLabel}
    {/if}
  {/snippet}
  {@render children?.()}
</Select.Root>
{#if description}
  <p id={descriptionId} class="text-sm text-gray-500">
    {description}
  </p>
{/if}
