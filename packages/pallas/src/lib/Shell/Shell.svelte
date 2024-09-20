<script lang="ts">
    import clsx from 'clsx';
    import type { MenuItem, ShellProps } from './types';
    import { onNavigate } from '$app/navigation';

    const { menuItems = [], currentUrl, appName, children }: ShellProps = $props();
    let mobileMenuOpen = $state(false);

    onNavigate(() => {
        mobileMenuOpen = false;
    });

    const currentMenuItem = $derived(() => {
        let menuItem: MenuItem | undefined = undefined;
        for (const item of menuItems) {
            if (item.url === '/' && currentUrl.pathname === item.url) {
                menuItem = item;
            } else if (
                currentUrl.pathname.startsWith(item.url) &&
                (!menuItem || menuItem.url.length < item.url.length)
            ) {
                menuItem = item;
            }
        }
        return menuItem;
    });
</script>

<div class="min-h-full">
    <div class="bg-st-dark-grey pb-32">
        <nav class="bg-st-dark-grey">
            <div class="mx-auto max-w-9xl sm:px-6 lg:px-8">
                <div class="border-b border-st-black">
                    <div class="flex h-16 items-center justify-between px-4 sm:px-0">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <img
                                    class="h-8 w-8"
                                    src="data:image/png;base64,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"
                                    alt="StickerApp"
                                />
                            </div>
                            <div class="text-white pl-4 pr-8 relative top-[-2px] text-2xl">
                                {appName}
                            </div>
                            <div class="hidden md:block">
                                <div class="ml-10 flex items-baseline space-x-4">
                                    {#each menuItems as menuItem}
                                        <a
                                            href={menuItem.url}
                                            class={clsx(
                                                'text-sm font-medium px-3 py-2',
                                                currentMenuItem()?.url === menuItem.url
                                                    ? 'bg-st-black text-white rounded-md'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md',
                                            )}
                                        >
                                            {menuItem.name}
                                        </a>
                                    {/each}
                                </div>
                            </div>
                        </div>
                        <div class="hidden md:block">
                            <!--
              Context menu goes here
              -->
                        </div>
                        <div class="-mr-2 flex md:hidden">
                            <!-- Mobile menu button -->
                            <button
                                type="button"
                                class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
                            >
                                <span class="absolute -inset-0.5"></span>
                                <span class="sr-only">Open main menu</span>
                                <svg
                                    class={clsx(mobileMenuOpen ? 'hidden' : 'block', 'h-6 w-6')}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                                <svg
                                    class={clsx(mobileMenuOpen ? 'block' : 'hidden', 'h-6 w-6')}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mobile menu, show/hide based on menu state. -->
            <div
                class={clsx(
                    mobileMenuOpen ? 'block' : 'hidden',
                    'border-b border-st-black md:hidden',
                )}
                id="mobile-menu"
            >
                <div class="space-y-1 px-2 py-3 sm:px-3">
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    {#each menuItems as menuItem}
                        <a
                            href={menuItem.url}
                            class={clsx(
                                'px-3 py-2 text-base font-medium rounded-md ',
                                currentUrl.pathname === menuItem.url
                                    ? 'bg-st-black text-white block '
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white block',
                            )}
                        >
                            {menuItem.name}
                        </a>
                    {/each}
                </div>
                <div class="border-t border-st-black pb-3 pt-4">
                    <div class="flex items-center px-5">
                        <!--
            Mobile context menu goes here
            -->
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <main class="-mt-32">
        {@render children()}
    </main>
</div>
