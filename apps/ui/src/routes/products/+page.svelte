<script lang="ts">
    import { Page } from '@stickerapp-org/pallas/Shell';
    import { ProductTable } from '@stickerapp-org/pallas/ProductTable';

    const { data } = $props();

    const { products } = data;
</script>

<Page name="Products">
    <ProductTable {products} />
</Page>
