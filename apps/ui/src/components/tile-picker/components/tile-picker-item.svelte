<script lang="ts">
  import type { TilePickerItemProps } from '../types';
  import { getCtx } from '../ctx.svelte';
  import TilePickerItemCheckbox from './tile-picker-item-checkbox.svelte';
  import TilePickerItemRadio from './tile-picker-item-radio.svelte';

  const props: TilePickerItemProps = $props();

  const { name, multiple } = getCtx();
</script>

{#if multiple}
  <TilePickerItemCheckbox {...props} {name} />
{:else}
  <TilePickerItemRadio {...props} {name} />
{/if}
