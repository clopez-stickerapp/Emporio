<script lang="ts">
  import * as Page from 'components/page';
  import * as Form from 'components/form';
  import { IconTiles } from '@stickerapp-org/pallas/IconTile';

  const { data } = $props();

  const { shapeProps, materialProps, laminateProps, sizeProps, quantityProps } = data;
</script>

<Page.Root>
  <Page.Title>Product</Page.Title>
  <Form.Root class="col-span-8 col-start-3">
    <Form.Item>
      <Form.Select
        label="Delivery"
        id="delivery"
        name="delivery"
        description="This is a description"
        hint="Required"
        placeholder="Choose delivery"
      >
        <Form.SelectOption label="Die cut" value="die-cut" />
        <Form.SelectOption label="Sticker sheet" value="sheet" />
      </Form.Select>
    </Form.Item>
    <Form.Item>
      <Form.Input
        id="product-name"
        name="product-name"
        label="Product Name"
        type="text"
        description="This is a description"
        hint="Required"
      />
    </Form.Item>
    <Form.Item>
      <Form.Input
        id="product-sku"
        name="product-sku"
        label="Product SKU"
        type="text"
        hint="Optional"
      />
    </Form.Item>

    <IconTiles title="Shapes" iconTileProps={shapeProps} />
    <IconTiles title="Materials" iconTileProps={materialProps} />
    <IconTiles title="Laminates" iconTileProps={laminateProps} />
    <IconTiles title="Sizes" iconTileProps={sizeProps} />
    <Form.Item>
      <Form.Switch
        id="custom-size"
        name="product-sku"
        label="Custom size box"
        description="This is a description"
      />
    </Form.Item>

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
  </Form.Root>
</Page.Root>

<style>
  input[type='number'] {
    border: 1px solid #ccc;
    padding: 4px;
    border-radius: 4px;
  }
</style>
