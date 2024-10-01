<script lang="ts">
  import * as Page from 'components/page';
  import * as Breadcrumb from 'components/breadcrumb';
  import { Home } from 'components/icon';
  import NewProduct from '$lib/forms/new-product.svelte';
</script>

<Page.Root>
  <Page.Title>Create a new product</Page.Title>
  <div class="col-span-full">
    <Breadcrumb.Root>
      <Breadcrumb.Item skipIndicator>
        <Breadcrumb.Link href="/">
          <Home class="h-5 w-5 flex-shrink-0" />
          <span class="sr-only">Home</span>
        </Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link href="/products">Products</Breadcrumb.Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Breadcrumb.Link current href="#">New product</Breadcrumb.Link>
      </Breadcrumb.Item>
    </Breadcrumb.Root>
  </div>
  <NewProduct />
</Page.Root>
