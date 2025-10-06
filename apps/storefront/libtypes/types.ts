// ---- Category ----
export type Category = {
    _id: string;
    categoryName: string;
    slug: string;
    description?: string;
    parentId?: string;
    image?: string;
};

// ---- Brand ----
export type Brand = {
    _id: string;
    name: string;
    slug: string;
    logo?: string;
    description?: string;
};

// ---- Product ----
export type Product = {
    _id: string;
    productName: string;
    slug: string;
    sku?: string;
    barcode?: string;

    shortDescription?: string;
    description?: string;

    regularPrice: number;
    discountPrice?: number;
    currency?: string;

    stockQuantity: number;
    inStock: boolean;
    unit?: string;

    weight?: number;
    dimensions?: { width?: number; height?: number; depth?: number };

    isFeatured?: boolean;
    isPublished: boolean;

    categories: string[];
    brand?: string;

    galleries?: { imagePath: string; displayOrder: number; alt?: string }[];

    options?: { name: string; values: string[] }[];

    tags?: string[];

    createdAt: string;
    updatedAt: string;
};

// Lấy type phần tử gallery để tái dùng
export type Gallery = NonNullable<Product["galleries"]>[number];

export type Paged<T> = {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
};
