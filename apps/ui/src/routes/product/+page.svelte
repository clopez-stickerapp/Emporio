<script lang="ts">
  import * as Page from 'components/page';
  import * as Form from 'components/form';
  import * as Card from 'components/card';
  import { Button } from 'components/button';
  import * as TilePicker from 'components/tile-picker';

  // import { IconTiles } from '@stickerapp-org/pallas/IconTile';

  const { data } = $props();

  const { shapeProps, materialProps, laminateProps, sizeProps, quantityProps } = data;
</script>

<Page.Root>
  <Page.Title>Product</Page.Title>
  <Form.Root class="col-span-8 col-start-1">
    <div class="mb-4 flex justify-end gap-2">
      <Button>Copy</Button>
      <Button>Duplicate</Button>
      <Button variant="primary">Save</Button>
    </div>

    <Form.Group>
      <Card.Root>
        <Card.Content>
          <Form.GroupTitle>
            <h3 class="font-semibold leading-none tracking-tight">Information</h3>
          </Form.GroupTitle>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>
          <div class="mt-10 grid grid-cols-2 gap-x-4 gap-y-4">
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
                id="product-sku"
                name="product-sku"
                label="Product SKU"
                type="text"
                hint="Optional"
              />
            </Form.Item>
          </div>
        </Card.Content>
      </Card.Root>
    </Form.Group>

    <Form.Group>
      <Card.Root>
        <Card.Content>
          <Form.GroupTitle>
            <h3 class="font-semibold leading-none tracking-tight">Attributes</h3>
          </Form.GroupTitle>
          <p class="mt-1 text-sm leading-6 text-gray-600"></p>
          <div class="mt-10 grid grid-cols-2 gap-6">
            <Form.Group class="col-span-2 space-y-4">
              <Form.GroupTitle>
                <h4 class="font-semibold leading-none tracking-tight">Shapes</h4>
              </Form.GroupTitle>
              <TilePicker.Root name="shape" multiple>
                {#each shapeProps as shape}
                  <TilePicker.Item
                    id={shape.text}
                    value={shape.text}
                    label={shape.text}
                    img={shape.imgSrc}
                  />
                {/each}
              </TilePicker.Root>
            </Form.Group>

            <Form.Group class="col-span-2 space-y-4">
              <Form.GroupTitle>
                <h4 class="font-semibold leading-none tracking-tight">Materials</h4>
              </Form.GroupTitle>
              <TilePicker.Root name="material" multiple>
                {#each materialProps as shape}
                  <TilePicker.Item
                    id={shape.text}
                    value={shape.text}
                    label={shape.text}
                    img={shape.imgSrc}
                  />
                {/each}
              </TilePicker.Root>
            </Form.Group>

            <Form.Item>
              <Form.Select
                label="Laminates"
                id="laminates"
                name="laminates"
                hint="Required"
                placeholder="Choose laminate"
              >
                {#each laminateProps as shape}
                  <Form.SelectOption value={shape.text} label={shape.text} />
                {/each}
              </Form.Select>
            </Form.Item>
          </div>
        </Card.Content>
      </Card.Root>
    </Form.Group>

    <!-- <IconTiles title="Shapes" iconTileProps={shapeProps} /> -->
    <!-- <IconTiles title="Materials" iconTileProps={materialProps} /> -->
    <!-- <IconTiles title="Laminates" iconTileProps={laminateProps} /> -->
    <!-- <IconTiles title="Sizes" iconTileProps={sizeProps} /> -->
    <!-- <Form.Item> -->
    <!--   <Form.Switch -->
    <!--     id="custom-size" -->
    <!--     name="product-sku" -->
    <!--     label="Custom size box" -->
    <!--     description="This is a description" -->
    <!--   /> -->
    <!-- </Form.Item> -->
    <!---->
    <!-- <div> -->
    <!--   <label for="min-width">Min width</label> -->
    <!--   <input id="min-width" type="number" /> -->
    <!--   <label for="max-width">Max width</label> -->
    <!--   <input id="max-width" type="number" /> -->
    <!-- </div> -->
    <!-- <div> -->
    <!--   <label for="min-height">Min height</label> -->
    <!--   <input id="min-height" type="number" /> -->
    <!--   <label for="max-height">Max height</label> -->
    <!--   <input id="max-height" type="number" /> -->
    <!-- </div> -->
    <!---->
    <!-- <IconTiles title="Quantities" iconTileProps={quantityProps} /> -->
    <!---->
    <!-- <div> -->
    <!--   <label for="custom-quantity">Custom quantity box</label> -->
    <!--   <input id="custom-quantity" type="checkbox" /> -->
    <!-- </div> -->
  </Form.Root>
</Page.Root>
