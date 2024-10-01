<script lang="ts">
  import * as Page from 'components/page';
  import * as Form from 'components/form';
  import * as Card from 'components/card';
  import { Button } from 'components/button';
  import * as TilePicker from 'components/tile-picker';
  import { getAttributeMap } from '$lib/api';
  import {
    ProductAttrComputer,
    ProductItem,
    type AttributesMap,
    type AttributeValueMulti,
    type AttributeValueSingle,
  } from '@stickerapp-org/nomisma';

  type AttributeProps = {
    label: string;
    value: AttributeValueSingle;
    imgSrc: string;
    disabled: boolean;
    selected: boolean;
  };

  const { data } = $props();

  const computer = new ProductAttrComputer();

  let productItem: ProductItem = new ProductItem('', '');

  let laminates: AttributeProps[] = $state([]);
  let materials: AttributeProps[] = $state([]);
  let shapes: AttributeProps[] = $state([]);

  async function changeFamily(family: string): Promise<void> {
    productItem = new ProductItem(family, '', productItem.getAttributes());
    const attrMap: AttributesMap = await getAttributeMap(family);
    evaluate(attrMap);
  }

  function evaluate(attrMap?: AttributesMap): void {
    computer.evaluate(productItem, attrMap);
    materials = toAttributeProps('material', computer.getAllValues('material'));
    shapes = toAttributeProps('sheet_name', computer.getFilteredValues('sheet_name'));
    laminates = toAttributeProps('laminate', computer.getAllValues('laminate'));
  }

  function findPropsByAttrName(attrName: string): AttributeProps[] {
    switch (attrName) {
      case 'material':
        return materials;
      case 'sheet_name':
        return shapes;
      case 'laminate':
        return laminates;
      default:
        return [];
    }
  }

  function toAttributeProps(attrName: string, attrValues: AttributeValueMulti): AttributeProps[] {
    return attrValues.map((attrValue) => ({
      label: translate(String(attrValue)),
      value: attrValue,
      imgSrc:
        computer.getIcons(attrName)[String(attrValue)] ??
        'https://d6ce0no7ktiq.cloudfront.net/images/web/wizard/ic_wiz-placeholder.png',
      disabled: computer.isConstrained(attrName, attrValue),
      selected:
        findPropsByAttrName(attrName).find((prop) => prop.value === attrValue)?.selected ?? false,
    }));
  }

  function translate(value: string): string {
    return value
      .toString()
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function handleAttributeChange(attrName: string, attribute: AttributeProps): void {
    if (attribute.disabled || computer.isConstrained(attrName, attribute.value)) {
      return;
    }
    attribute.selected = !attribute.selected;
    if (attribute.selected) {
      productItem.setAttribute(attrName, attribute.value);
    } else {
      productItem.removeAttribute(attrName);
    }
    evaluate();
  }
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
                onchange={(family) => changeFamily(family)}
              >
                {#each data.families as family}
                  <Form.SelectOption label={translate(family)} value={family} />
                {/each}
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

    {#if materials.length || shapes.length || laminates.length}
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
                  {#each shapes as shape}
                    <TilePicker.Item
                      id={shape.value.toString()}
                      value={shape.value}
                      label={shape.label}
                      img={shape.imgSrc}
                      disabled={shape.disabled}
                      onclick={() => handleAttributeChange('sheet_name', shape)}
                    />
                  {/each}
                </TilePicker.Root>
              </Form.Group>

              <Form.Group class="col-span-2 space-y-4">
                <Form.GroupTitle>
                  <h4 class="font-semibold leading-none tracking-tight">Materials</h4>
                </Form.GroupTitle>
                <TilePicker.Root name="material" multiple>
                  {#each materials as material}
                    <TilePicker.Item
                      id={material.value.toString()}
                      value={material.value}
                      label={material.label}
                      img={material.imgSrc}
                      disabled={material.disabled}
                      onclick={() => handleAttributeChange('material', material)}
                    />
                  {/each}
                </TilePicker.Root>
              </Form.Group>

              <Form.Group class="col-span-2 space-y-4">
                <Form.GroupTitle>
                  <h4 class="font-semibold leading-none tracking-tight">Laminates</h4>
                </Form.GroupTitle>
                <TilePicker.Root name="laminate" multiple>
                  {#each laminates as laminate}
                    <TilePicker.Item
                      id={laminate.value.toString()}
                      value={laminate.value}
                      label={laminate.label}
                      img={laminate.imgSrc}
                      disabled={laminate.disabled}
                      onclick={() => handleAttributeChange('laminate', laminate)}
                    />
                  {/each}
                </TilePicker.Root>
              </Form.Group>

              <!-- <Form.Item>
					<Form.Select
						label="Laminates"
						id="laminates"
						name="laminates"
						hint="Required"
						placeholder="Choose laminate"
					>
						{#each laminates as laminate}
						<Form.SelectOption value={laminate.value} label={laminate.label} />
						{/each}
					</Form.Select>
				</Form.Item> -->
            </div>
          </Card.Content>
        </Card.Root>
      </Form.Group>
    {/if}

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
