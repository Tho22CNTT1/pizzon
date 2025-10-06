import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { api } from '@/lib/api';

export default async function Home() {
    const [cats, best] = await Promise.all([
        api.categories(),
        api.products({ pages: 1, packageSize: 8, sortBy: 'sold', sortOrder: 'desc' }),

    ])

    return (
        <>
            <section>
                <div className="container grid md:grid-cols-2 items-center gap-12 py-16">
                    <div>
                        <span className="badge bg-accent-500/30 text-brand-700">Hot & Fresh</span>
                        <h1 className="mt-4 font-display text-5xl leading-tight">
                            Pizza ngon nóng hổi, <span className="text-brand-600">giao nhanh</span> tận nơi
                        </h1>
                        <p className="mt-4 text-neutral-600">Chọn combo yêu thích, thêm topping và đặt ngay.</p>
                        <div className="mt-6 flex gap-3">
                            <Link href="/menu" className="btn-primary">Xem Menu</Link>
                            <Link href="/track" className="btn-outline">Tra cứu đơn</Link>
                        </div>
                    </div>
                    <img src="/hero-pizza.png" alt="" className="w-full rounded-3xl shadow-card" />
                </div>
            </section>

            {/* CATEGORIES */}
            <section className="container py-12">
                <h2 className="font-display text-3xl mb-6">Danh mục</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {cats.map((c) => (
                        <Link key={c._id} href={`/menu?category=${c._id}`} className="card p-6 hover:-translate-y-1 transition">
                            <div className="font-semibold">{c.categoryName}</div>
                            <div className="text-sm text-neutral-500">Khám phá ngay →</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* BEST SELLERS */}
            <section className="container pb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-3xl">Bán chạy</h2>
                    <Link href="/menu" className="text-brand-600 hover:underline">Xem tất cả</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {best.items.map((p) => <ProductCard key={p._id} product={p} />)}
                </div>
            </section>
        </>
    );
}