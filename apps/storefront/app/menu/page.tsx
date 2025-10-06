import { api } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function MenuPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
    const page = Number(searchParams.page ?? 1);
    const q = (searchParams.q as string) ?? '';
    const category = (searchParams.category as string) ?? '';

    const [cats, data] = await Promise.all([
        api.categories(),
        api.products({ page, pageSize: 12, q, category })
    ]);

    const totalPages = Math.max(1, Math.ceil((data.total ?? 0) / (data.pageSize || 12)));

    return (
        <div className="container py-10 grid md:grid-cols-[240px_1fr] gap-8">
            {/* SIDEBAR */}
            <aside className="space-y-4">
                <form className="card p-4" action="/menu">
                    <input
                        name="q"
                        defaultValue={q}
                        placeholder="Tìm pizza..."
                        className="w-full border rounded-xl px-3 py-2"
                    />
                </form>
                <div className="card p-4">
                    <div className="font-semibold mb-2">Danh mục</div>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/menu" className={!category ? 'text-brand-600 font-medium' : ''}>Tất cả</Link>
                        </li>
                        {cats.map((c) => (
                            <li key={c._id}>
                                <Link
                                    href={`/menu?category=${c._id}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
                                    className={category === c._id ? 'text-brand-600 font-medium' : ''}
                                >
                                    {c.categoryName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* GRID */}
            <section>
                {q && (
                    <div className="mb-4 text-sm text-neutral-500">
                        Kết quả cho từ khóa <b className="text-neutral-700">“{q}”</b>
                    </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.items.map((p) => {
                        const img = p.galleries?.sort((a, b) => a.displayOrder - b.displayOrder)[0]?.imagePath || '/placeholder.png';
                        const price = p.discountPrice ?? p.regularPrice;
                        return (
                            <div key={p._id} className="card overflow-hidden">
                                <img src={img} className="aspect-square w-full object-cover" />
                                <div className="p-3">
                                    <div className="font-medium line-clamp-1">{p.productName}</div>
                                    <div className="font-display text-xl text-brand-600">
                                        {price.toLocaleString()}₫
                                        {p.discountPrice && (
                                            <span className="ml-2 text-sm line-through text-neutral-400">
                                                {p.regularPrice.toLocaleString()}₫
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-1 text-xs text-neutral-500 line-clamp-2">{p.shortDescription}</div>
                                    {!p.inStock && <div className="mt-1 text-xs text-red-600">Hết hàng</div>}
                                    {p.tags?.length ? (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {p.tags.slice(0, 2).map(t => (
                                                <span key={t} className="px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs">{t}</span>
                                            ))}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* PAGINATION */}
                <div className="mt-8 flex justify-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const n = i + 1;
                        const sp = new URLSearchParams();
                        if (q) sp.set('q', q);
                        if (category) sp.set('category', category);
                        sp.set('page', String(n));
                        return (
                            <Link
                                key={n}
                                href={`/menu?${sp.toString()}`}
                                className={`px-3 py-1 rounded-lg border ${n === page ? 'bg-brand-500 text-white border-brand-500' : 'hover:bg-white'}`}
                            >
                                {n}
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
