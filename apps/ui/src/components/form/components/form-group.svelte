<script lang="ts">
  import type { FormGroupProps } from '../types';

  const { children, ...rest }: FormGroupProps = $props();
</script>

<fieldset {...rest}>
  {@render children?.()}
</fieldset>
