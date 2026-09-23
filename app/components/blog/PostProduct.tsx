import Image from "next/image";
import Link from "next/link";
import { getProductById, type Product } from "@/lib/products";

const PLATFORM_LABELS: Record<Product["platform"], string> = {
  shopee: "Shopee",
  amazon: "Amazon",
  "mercado-livre": "Mercado Livre",
  "tiktok-shop": "TikTok Shop",
};

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatSold(count: number) {
  if (count >= 1000) {
    const thousands = (count / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 });
    return `${thousands} mil vendidos`;
  }
  return `${count} vendidos`;
}

// Product card for use inside blog posts: <Produto id="product-id" />
// Renders nothing when the product is missing or inactive, so a post never shows a dead offer.
export default function PostProduct({ id }: { id: string }) {
  const product = getProductById(id);
  if (!product) return null;

  const platform = PLATFORM_LABELS[product.platform];
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;
  const percent = hasDiscount ? Math.round(100 - (product.price / product.originalPrice!) * 100) : 0;
  const hasRating = product.rating !== undefined;
  const hasSold = product.soldCount !== undefined;

  return (
    <div className="my-10 grid grid-cols-[96px_1fr] sm:grid-cols-[140px_1fr] gap-4 sm:gap-6 rounded-3xl border-4 border-black bg-white p-4 sm:p-6 shadow-[6px_6px_0px_#8e8ef7]">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border-2 border-black">
        <Image src={product.image} alt={product.name} fill sizes="140px" className="object-cover" />
        {hasDiscount && (
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black px-1.5 py-0.5 font-mono text-xs font-black text-white">
            -{percent}%
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-2">
        <div>
          <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-black">
            {platform}
            {product.shopName ? ` · ${product.shopName}` : ""}
          </span>
          <p className="font-title text-lg sm:text-xl font-black uppercase leading-snug text-black">
            {product.name}
          </p>
          {(hasRating || hasSold) && (
            <p className="font-mono text-sm sm:text-sm font-black text-black">
              {hasRating &&
                `★ ${product.rating!.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}`}
              {hasRating && product.reviewCount !== undefined && ` (${product.reviewCount.toLocaleString("pt-BR")})`}
              {hasRating && hasSold && " · "}
              {hasSold && formatSold(product.soldCount!)}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="font-title text-xl sm:text-2xl font-black text-black">{formatBRL(product.price)}</span>
          {hasDiscount && (
            <span className="font-mono text-sm font-bold text-black line-through">
              {formatBRL(product.originalPrice!)}
            </span>
          )}
          <Link
            href={`/go/${product.id}`}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            prefetch={false}
            className="sm:ml-auto inline-flex items-center gap-2 rounded-xl border-2 border-black bg-[#8e8ef7] px-4 py-2 font-mono text-sm font-black uppercase text-black shadow-[3px_3px_0px_#000000] transition-all hover:bg-black hover:text-[#f7f3f1] hover:shadow-none"
          >
            Ver oferta na {platform} →
          </Link>
        </div>
      </div>
    </div>
  );
}