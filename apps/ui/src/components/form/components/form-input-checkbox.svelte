<script lang="ts">
  import { Input } from 'components/input';
  import { Label } from 'components/label';
  import type { FormInputProps } from '../types';
  import { setCtx } from '../ctx';
  import { cn } from '$lib/utils';

  const type = 'checkbox';

  const {
    class: className,
    label,
    id,
    description,
    ...rest
  }: Exclude<FormInputProps, 'type'> = $props();

  setCtx({ type: type! });

  const descriptionId = description ? `${id}-desc` : undefined;
</script>

<div class={cn('flex h-6 items-center', className)}>
  <Input {id} {type} aria-describedby={descriptionId} {...rest} />
</div>
<div class="ml-3 text-sm leading-6">
  <Label for={id}>{label}</Label>
  {#if description}
    <p id={descriptionId} class="text-gray-500">{description}</p>
  {/if}
</div>
