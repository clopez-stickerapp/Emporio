import { type MenuItem, type ShellProps } from '@stickerapp-org/pallas/Shell';

import type { LoadEvent } from '@sveltejs/kit';

export function load({ url }: LoadEvent) {
  const menuItems: MenuItem[] = [
    {
      name: 'Start',
      url: '/',
    },
    {
      name: 'Product',
      url: '/product',
    },
    {
      name: 'Products',
      url: '/products',
    },
  ];

  return {
    menuItems,
    currentUrl: {
      pathname: url.pathname,
    },
  } as ShellProps;
}
