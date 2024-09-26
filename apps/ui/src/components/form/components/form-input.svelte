<script lang="ts">
  import { Input } from 'components/input';
  import { Label } from 'components/label';
  import type { FormInputProps } from '../types';
  import { setCtx } from '../ctx';
  import Checkbox from './form-input-checkbox.svelte';
  import { cn } from '$lib/utils';

  const {
    class: className,
    label,
    id,
    type = 'text',
    description,
    hint,
    ...rest
  }: FormInputProps = $props();

  setCtx({ type: type! });

  const descriptionId = description ? `${id}-desc` : undefined;
</script>

{#if type === 'checkbox'}
  <Checkbox {id} {label} {description} class={className} {...rest} />
{:else}
  {#if hint}
    <Label class="flex justify-between" for={id}>
      <span>{label}</span>
      <span class="text-sm leading-6 text-gray-500">
        {hint}
      </span>
    </Label>
  {:else}
    <Label for={id}>{label}</Label>
  {/if}
  <Input class={cn(className)} {id} aria-describedby={descriptionId} {type} {...rest} />
  {#if description}
    <p id={descriptionId} class="text-sm text-gray-500">
      {description}
    </p>
  {/if}
{/if}
