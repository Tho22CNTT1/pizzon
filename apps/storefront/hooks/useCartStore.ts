'use client';
import { get } from 'http';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Line = { _id: string; name: string; price: number; qty: number; img?: string }
type CartState = {
    lines: Line[];
    add: (l: Line) => void;
    remove: (id: string) => void;
    clear: () => void;
    count: () => number;
    total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
    lines: [],
    add: (l) =>
        set((s) => {
            const i = s.lines.findIndex((x) => x._id === l._id);
            if (i >= 0) {
                const a = [...s.lines];
                a[i] = { ...a[i], qty: a[i].qty + l.qty };
                return { lines: a };
            }
            return { lines: [...s.lines, l] };
        }),
    remove: (id) => set((s) => ({ lines: s.lines.filter((x) => x._id !== id) })),
    clear: () => set({ lines: [] }),
    count: () => get().lines.reduce((n, l) => n + l.qty, 0),
    total: () => get().lines.reduce((n, l) => n + l.price * l.qty, 0),
}));