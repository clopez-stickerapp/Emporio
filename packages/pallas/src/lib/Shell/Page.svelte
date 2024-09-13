<script lang="ts">
  import { type PageProps } from './types';

  const { children, name } = $props<PageProps>();
</script>

<header class="py-4">
  <div class="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-white">
      {name}
    </h1>
  </div>
</header>

<div class="mx-auto px-4 max-w-9xl pb-12 sm:px-6 lg:px-8">
  <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
    {@render children()}
  </div>
</div>
