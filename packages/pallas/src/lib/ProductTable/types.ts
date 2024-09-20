export type Product = {
    name: string;
    sku: string;
    active: ProductStatus;
    message: string;
    minPrice: number;
};

export type ProductStatus = 'Active' | 'Inactive' | 'Draft';
