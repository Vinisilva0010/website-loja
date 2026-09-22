export interface Product {
  id: string; // unique slug/identifier
  name: string;
  description: string; // short editorial copy
  price: number;
  originalPrice?: number; // enables the discount badge when present
  image: string;
  category: "maquiagem" | "skincare" | "cabelo" | "corpo" | "unhas";
  platform: "shopee" | "amazon" | "mercado-livre" | "tiktok-shop";
  affiliateUrl: string;
  tags: string[]; // semantic search terms
  active: boolean;
  rating?: number; // average stars, 0 to 5
  reviewCount?: number; // number of ratings
  soldCount?: number; // units sold, shown as social proof
  shopName?: string; // seller name on the platform
  highlights?: string[]; // bullet points shown in the "Saiba mais" dialog
  badge?: string; // offer label, e.g. "RELÂMPAGO" — only when the offer really is one
  priceCheckedAt?: string; // ISO date (YYYY-MM-DD) of the last price check
}

// Populated by the Shopee feed once the Open API is connected.
export const products: Product[] = [
  
];

export function getByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category && p.active);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id && p.active);
}

export function getAllProducts(): Product[] {
  return products.filter((p) => p.active);
}