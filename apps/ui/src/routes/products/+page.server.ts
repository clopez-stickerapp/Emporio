import { type Product } from '@stickerapp-org/pallas/ProductTable';

export function load() {
  const products: Product[] = [
    { name: 'Die cut', sku: 'SKU001', active: 'Active', message: 'New', minPrice: 10.99 },
    {
      name: 'Sticker sheet',
      sku: 'SKU002',
      active: 'Inactive',
      message: '',
      minPrice: 15.49,
    },
    {
      name: '3D Dome sticker',
      sku: 'SKU003',
      active: 'Draft',
      message: 'Limited availability',
      minPrice: 7.99,
    },
  ];

  return {
    products,
  };
}
