<script lang="ts">
    import { Page } from '@stickerapp-org/pallas/Shell';
    import type { IconTileProps } from '../../../../../packages/pallas/src/lib/IconTile/IconTile.svelte';
    import IconTiles from '../../../../../packages/pallas/src/lib/IconTile/IconTiles.svelte';

    let sizeFilters = [
        { text: 'Default', selected: true, value: 'default' },
        { text: 'Epoxy', value: 'epoxy' },
        { text: 'Wall', value: 'wall' },
        { text: 'Kiss-Cut Sheet', value: 'kiss-cut-sheet' },
        { text: 'Sheet', value: 'sheet' },
    ];

    let quantityLists = [
        { text: 'Default', selected: true, value: 'default' },
        { text: 'Epoxy', value: 'epoxy' },
    ];

    let shapeProps = [
        {
            text: 'Contour',
            imgSrc: '/favicon.png',
            selected: true,
            enabled: true,
        },
        {
            text: 'Square',
            imgSrc: '/favicon.png',
            selected: true,
            enabled: true,
        },
        {
            text: 'Round',
            imgSrc: '/favicon.png',
            selected: false,
            enabled: true,
        },
        {
            text: 'Rounded',
            imgSrc: '/favicon.png',
            selected: false,
            enabled: false,
        },
    ];

    let materialProps = [
        { text: 'Vinyl', imgSrc: '/favicon.png', selected: true },
        { text: 'Holographic', imgSrc: '/favicon.png' },
        { text: 'Glitter', imgSrc: '/favicon.png' },
        { text: 'Kraft paper', imgSrc: '/favicon.png', selected: true },
        { text: 'Prismatic', imgSrc: '/favicon.png' },
        { text: 'Glow in the Dark', imgSrc: '/favicon.png', selected: true },
        { text: 'Clear', imgSrc: '/favicon.png', enabled: false },
        { text: 'Pixie Dust', imgSrc: '/favicon.png', enabled: false },
    ];

    let laminateProps: IconTileProps[] = [
        { selected: true, text: 'Glossy' },
        { enabled: false, text: 'Matte' },
        { enabled: false, text: 'Cracked Ice' },
    ];

    let sizeProps = [
        { text: '1x1', selected: true },
        { text: '2x2', selected: true },
        { text: '3x3', selected: true },
        { text: '4x4', selected: true },
        { text: '5x5', selected: true },
        { text: '6x6', selected: true },
        { text: '7x7', selected: true },
        { text: '8x8', selected: true },
    ];

    let quantityProps = [
        { text: '100', selected: true },
        { text: '200', selected: true },
        { text: '300', selected: true },
        { text: '500', selected: true },
        { text: '750', selected: true },
        { text: '1000', selected: true },
        { text: '1500', selected: true },
        { text: '2000', selected: true },
    ];
</script>

<Page name="Products">
    <div>
        <label for="product-name">Product Name</label>
        <input id="product-name" type="text" />
    </div>
    <div>
        <label for="product-sku">Product SKU</label>
        <input id="product-sku" type="text" />
    </div>

    <IconTiles title="Shapes" iconTileProps={shapeProps} />
    <IconTiles title="Materials" iconTileProps={materialProps} />
    <IconTiles title="Laminates" iconTileProps={laminateProps} />
    <IconTiles title="Sizes" iconTileProps={sizeProps} />

    <div>
        <label for="custom-size">Custom size box</label>
        <input id="custom-size" type="checkbox" />
    </div>
    <div>
        <label for="min-width">Min width</label>
        <input id="min-width" type="number" />
        <label for="max-width">Max width</label>
        <input id="max-width" type="number" />
    </div>
    <div>
        <label for="min-height">Min height</label>
        <input id="min-height" type="number" />
        <label for="max-height">Max height</label>
        <input id="max-height" type="number" />
    </div>

    <IconTiles title="Quantities" iconTileProps={quantityProps} />

    <div>
        <label for="custom-quantity">Custom quantity box</label>
        <input id="custom-quantity" type="checkbox" />
    </div>
</Page>

<style>
    input {
        border: 1px solid #ccc;
        padding: 4px;
        border-radius: 4px;
    }
</style>
