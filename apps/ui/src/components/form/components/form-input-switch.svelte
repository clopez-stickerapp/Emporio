<script lang="ts">
  import { Label } from 'components/label';
  import Switch from 'components/switch/components/switch.svelte';
  import type { FormSwitchProps } from '../types';
  import { setCtx } from '../ctx';
  import { cn } from '$lib/utils';

  const type = 'checkbox';

  const {
    class: className,
    label,
    id,
    description,
    ...rest
  }: Exclude<FormSwitchProps, 'type'> = $props();

  setCtx({ type: type! });

  const descriptionId = description ? `${id}-desc` : undefined;
</script>

<Switch
  {id}
  {type}
  aria-describedby={descriptionId}
  aria-labelledby={`${id}-label`}
  class={cn('self-center', className)}
  {...rest}
/>
<div class="ml-3 text-sm leading-6">
  <Label for={id} id={`${id}-label`}>{label}</Label>
  {#if description}
    <p id={descriptionId} class="text-gray-500">{description}</p>
  {/if}
</div>
