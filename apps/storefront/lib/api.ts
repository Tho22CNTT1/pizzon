import { Category, Product, Paged } from '../libtypes/types';

const API = process.env.NEXT_PUBLIC_API_URL!;
const qstr = (p: Record<string, any>) =>
    Object.entries(p)
        .filter(([, v]) => v !== undefined && v !== '' && v !== null)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
        .join('&');

export const api = {
    categories: async (): Promise<Category[]> => {
        const r = await fetch(`${API}/v1/categories`, { cache: 'no-store' });
        if (!r.ok) throw new Error('categories failed');
        return r.json();
    },
    products: async (p: any = {}): Promise<Paged<Product>> => {
        const r = await fetch(`${API}/v1/products?${qstr(p)}`, { cache: 'no-store' });
        if (!r.ok) throw new Error('products failed');
        return r.json();
    },
    product: async (id: string): Promise<Product> => {
        const r = await fetch(`${API}/v1/products/${id}`, { cache: 'no-store' });
        if (!r.ok) throw new Error('product failed');
        return r.json();
    },
};
