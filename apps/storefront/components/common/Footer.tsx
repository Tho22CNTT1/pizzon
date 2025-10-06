export default function Footer() {
    return (
        <footer className="bg-[var(--bg)] border-t mt-8">
            <div className="container py-10 grid md:grid-cols-3 gap-6 text-sm text-neutral-600">
                <div>
                    <div className="font-display text-2xl text-brand-600 mb-2">Pizzon</div>
                    <p className="mt-2 text-sm text-neutral-500">Pizza ngon nóng hổi</p>
                </div>
                <div>
                    <div className="font-semibold mb-2">Liên hệ</div>
                    <div className="text-sm text-neutral-600 space-y-1">
                        <div>Hotline: 1900-xxxx</div>
                        <div>Địa chỉ: 123 Pizza Street</div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold mb-2">Giờ mở cửa</div>
                    <div className="text-sm text-neutral-600">09:00 - 22:00 (T2 - CN)</div>
                </div>
            </div>
            <div className="text-center text-xs text-neutral-500 pb-6">© {new Date().getFullYear()} Pizzon</div>
        </footer>
    );
}