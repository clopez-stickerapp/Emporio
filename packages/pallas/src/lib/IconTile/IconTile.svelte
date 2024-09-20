<script lang="ts">
    import type { IconTileProps } from "./types";

    let {
        text = '',
        selected = false,
        enabled = true,
        imgSrc = '',
        forceDisabled = $bindable(false),
    }: IconTileProps & { forceDisabled: boolean } = $props();

    const borderColor = $derived(selected ? 'border-yellow-400' : 'border-gray-300');

    const active = $derived(enabled && forceDisabled);

    function onclick() {
        if (!active) {
            return;
        }

        selected = !selected;
    }
</script>

<div class="inline-block text-center">
    <button
        type="button"
        class="relative p-2 border-4 rounded-lg {borderColor}"
        class:opacity-50={!active}
        {onclick}
    >
        <input
            type="checkbox"
            class="absolute top-0.5 right-0.5 accent-yellow-300"
            disabled={!active}
            bind:checked={selected}
        />
        {#if imgSrc}
            <img class="size-12" src={imgSrc} alt="ChitChat Logo" />
        {:else}
            <div class="size-12 text-xs flex items-center justify-center">{text}</div>
        {/if}
    </button>
    {#if text && imgSrc}
        <div class="text-xs pl-2 max-w-16">{text}</div>
    {/if}
</div>
