'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '@/hooks/useCartStore';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const count = useCartStore((s) => s.count());

    return (
        <header className="sticky top-0 z-40 bg-[var(--bg)]/80 backdrop-blur border-b">
            <div className="container h-16 flex items-center justify-between">
                <Link href="/" className="font-display text-2xl text-brand-600">Pizzon</Link>
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/menu">Menu</Link>
                    <Link href="/track">Track</Link>
                    <Link href="/contact">Contact</Link>
                </nav>
                <button onClick={() => setOpen(true)} className="relative btn-outline">
                    Cart
                    {count > 0 && (
                        <span className="absolute -top-2 -right-2 bg-brand-500 text-white text-xs rounded-full w-5 h-5 grid place-items-center">
                            {count}
                        </span>
                    )}
                </button>
            </div>
            {open && <CartDrawer onClose={() => setOpen(false)} />}
        </header>
    );
}

function CartDrawer({ onClose }: { onClose: () => void }) {
    const { lines, total } = useCartStore();
    return (
        <div className="fixed inset-0 bg-black/30" onClick={onClose}>
            <div
                className="absolute right-0 top-0 h-full w-[360px] bg-white p-4 card rounded-none"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Giỏ hàng</h3>
                    <button onClick={onClose} className="text-neutral-500 hover:text-black">✕</button>
                </div>
                <div className="mt-4 space-y-3 overflow-auto max-h-[70vh]">
                    {lines.length === 0 && <div className="text-sm text-neutral-500">Chưa có sản phẩm</div>}
                    {lines.map((l) => (
                        <div key={l._id} className="flex gap-3">
                            <img src={l.img || '/placeholder.png'} className="w-14 h-14 rounded-lg object-cover" />
                            <div className="text-sm">
                                <div className="font-medium">{l.name}</div>
                                <div className="text-neutral-500">{l.qty} × {l.price.toLocaleString()}₫</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex justify-between">
                    <div>Tổng</div><div className="font-semibold">{total().toLocaleString()}₫</div>
                </div>
                <a href="/cart" className="mt-3 block text-center btn-primary">Xem giỏ</a>
            </div>
        </div>
    );
}
