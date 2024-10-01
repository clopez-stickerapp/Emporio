<script lang="ts">
  import { ProductTable } from '@stickerapp-org/pallas/ProductTable';
  import * as Page from 'components/page';
  import * as Card from 'components/card';
  import * as DropdownMenu from 'components/dropdown-menu';
  import { ChevronDown } from 'components/icon';

  const { data } = $props();

  const { products } = data;
</script>

<Page.Root>
  <Page.Title>Products</Page.Title>
  <div class="col-span-full flex justify-end">
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        Add new product <ChevronDown class="size-4" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.ItemLink
          class="flex flex-col gap-2 font-medium leading-6 text-st-gray-900"
          href="products/new?pl=laser"
        >
          Laser
          <span class="text-xs text-st-gray-700">Add a new product with production line laser</span>
        </DropdownMenu.ItemLink>
        <DropdownMenu.ItemLink
          class="flex flex-col gap-2 font-medium leading-6 text-st-gray-900"
          href="products/new?pl=digital"
        >
          Digital
          <span class="text-xs text-st-gray-700">
            Add a new product with production line digital
          </span>
        </DropdownMenu.ItemLink>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <Card.Root class="col-span-full">
    <Card.Content>
      <ProductTable {products} />
    </Card.Content>
  </Card.Root>
</Page.Root>
