<script lang="ts">
    import IconTile from './IconTile.svelte';
    import type { IconTilesProps } from './types';

    let { title = '', iconTileProps }: IconTilesProps = $props();

    let forceDisabled = $state(false);
</script>

<div class="text-2xl font-bold pl-0.5">{title}</div>
<div class="flex items-center">
    <button class="btn btn-primary mr-2">Share with</button>
    <select class="form-select">
        <option value="option1">Default</option>
        <option value="option2">Epoxy</option>
        <option value="option3">Shiny</option>
    </select>
    <label class="flex items-center ml-2">
        <span class="pr-1">or use custom instead</span>
        <input type="checkbox" class="form-checkbox" bind:checked={forceDisabled} />
    </label>
</div>
<div class="flex flex-wrap">
    <div class="flex gap-x-2 sm:gap-x-1 gap-y-2 flex-wrap" class:pt-1={title}>
        {#each iconTileProps as iconTileProps, i}
            <IconTile bind:forceDisabled {...iconTileProps} />
        {/each}
    </div>
</div>

<style>
    select {
        border: 1px solid #ccc;
        padding: 4px;
        border-radius: 4px;
    }
</style>
