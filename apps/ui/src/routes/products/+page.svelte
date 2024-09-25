<script lang="ts">
  import { ProductTable } from '@stickerapp-org/pallas/ProductTable';
  import * as Page from 'components/page';

  const { data } = $props();

  const { products } = data;
</script>

<Page.Root>
  <Page.Title>Products</Page.Title>
  <div class="col-span-8 col-start-3"><ProductTable {products} /></div>
</Page.Root>
