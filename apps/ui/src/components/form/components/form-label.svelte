<script lang="ts">
  import { Label } from 'components/label';
  import type { FormLabelProps } from '../types';
  import { cn } from '$lib/utils';

  const { class: className, ...rest }: FormLabelProps = $props();
</script>

<Label class={cn(className)} {...rest} />
