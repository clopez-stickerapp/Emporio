<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { TilePickerItemProps } from '../types';
  import { subscribe } from '../ctx';
  import TilePickerItemCheckbox from './tile-picker-item-checkbox.svelte';
  import TilePickerItemRadio from './tile-picker-item-radio.svelte';

  const props: TilePickerItemProps = $props();

  let name = $state('');
  let multiple = $state(false);

  const unsubscribe = subscribe((ctx) => {
    name = ctx.name;
    multiple = ctx.multiple;
  });

  onDestroy(unsubscribe);
</script>

{#if multiple}
  <TilePickerItemCheckbox {...props} {name} />
{:else}
  <TilePickerItemRadio {...props} {name} />
{/if}
