<script lang="ts">
  import { Page } from '@stickerapp-org/pallas/Shell';
  import { IconTiles } from '@stickerapp-org/pallas/IconTile';

  const { data } = $props();

  const { shapeProps, materialProps, laminateProps, sizeProps, quantityProps } = data;
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
  input[type='text'],
  input[type='number'] {
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 4px;
  }
</style>
