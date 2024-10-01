<script lang="ts">
  import * as Form from 'components/form';
  import { Button } from 'components/button';
  import * as Card from 'components/card';
  import * as TilePicker from 'components/tile-picker';
</script>

<Form.Root class="col-span-10">
  <div class="mb-4 flex justify-end gap-2">
    <Button variant="primary">Save</Button>
  </div>

  <Form.Group>
    <Card.Root>
      <Card.Content>
        <Form.GroupTitle>
          <h2 class="font-semibold leading-none tracking-tight">Information</h2>
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
              description="SKU will be generated automatically based on the attributes on the product"
              disabled
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
          <h2 class="font-semibold leading-none tracking-tight">Attributes</h2>
        </Form.GroupTitle>

        <TilePicker.Root name="production-line"></TilePicker.Root>
      </Card.Content>
    </Card.Root>
  </Form.Group>
</Form.Root>
