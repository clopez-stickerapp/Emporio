<script lang="ts">
  import { ProductTable } from '@stickerapp-org/pallas/ProductTable';
  import * as Page from 'components/page';
  import * as Card from 'components/card';

  const { data } = $props();

  const { products } = data;
</script>

<Page.Root>
  <Page.Title>Products</Page.Title>
  <Card.Root class="col-span-8 col-start-3">
    <Card.Content><ProductTable {products} /></Card.Content>
  </Card.Root>
</Page.Root>
