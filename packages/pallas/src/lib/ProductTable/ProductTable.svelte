<script lang="ts">
    import type { Product } from "./types";

    let { products }: { products: Product[] } = $props();
</script>

<table class="min-w-full divide-y divide-gray-200 border-2">
    <thead class="bg-gray-50">
        <tr>
            <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
                Name
            </th>
            <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
                SKU
            </th>
            <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
                Active
            </th>
            <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
            >
                Message
            </th>
            <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
            >
                Minimum Price
            </th>
        </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
        {#each products as product}
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td class="px-6 py-4 whitespace-nowrap">{product.sku}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="status-circle {product.active.toLowerCase()}"></span>
                    {product.active}
                </td>
                <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">{product.message}</td>
                <td class="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    ${product.minPrice.toFixed(2)}
                </td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    .status-circle {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
    }
    .active {
        background-color: rgb(73, 197, 73);
    }
    .inactive {
        background-color: rgb(255, 60, 60);
    }
    .draft {
        background-color: rgb(176, 176, 176);
    }
</style>
