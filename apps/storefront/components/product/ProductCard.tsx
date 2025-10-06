import Link from "next/link";
import { Product, Gallery } from "@/libtypes/types";

const vnd = new Intl.NumberFormat("vi-VN");

function firstImage(galleries?: Gallery[]): string {
    if (!galleries?.length) return "/placeholder.png";
    const sorted = [...galleries].sort((a: Gallery, b: Gallery) => a.displayOrder - b.displayOrder);
    return sorted[0]?.imagePath || "/placeholder.png";
}

export default function ProductCard({ product }: { product: Product }) {
    const img = firstImage(product.galleries);
    const price = product.discountPrice ?? product.regularPrice;

    return (
        <Link href={`/product/${product._id}`} className="card overflow-hidden hover:-translate-y-1 transition">
            <img src={img} alt={product.productName} className="aspect-square w-full object-cover" />
            <div className="p-3 text-center">
                <div className="font-medium line-clamp-1">{product.productName}</div>

                <div className="font-display text-xl text-brand-600">
                    {vnd.format(price)}₫
                    {product.discountPrice && (
                        <span className="ml-2 text-sm line-through text-neutral-400">
                            {vnd.format(product.regularPrice)}₫
                        </span>
                    )}
                </div>

                {!product.inStock && <div className="mt-1 text-xs text-red-600">Hết hàng</div>}
                {product.isFeatured && <div className="mt-1 text-xs text-brand-600">Nổi bật</div>}
            </div>
        </Link>
    );
}
