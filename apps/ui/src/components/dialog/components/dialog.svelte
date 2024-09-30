<script lang="ts">
  import type { DialogRootProps } from '../types';
  import { setCtx } from '../ctx';

  const { children, ...rest }: DialogRootProps = $props();

  setCtx(rest);
</script>

{@render children()}
