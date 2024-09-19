<script lang="ts">
    import type { IconTilesProps } from '../IconTile/IconTiles.svelte';

    let { title = '', iconTileProps }: IconTilesProps = $props();
</script>

<ul>
    {#each iconTileProps as { text, selected, enabled, imgSrc }, i}
        <li>
            {text}
        </li>
    {/each}
</ul>
