export interface Product {
  id: string; // unique slug/identifier
  name: string;
  description: string; // short editorial copy
  price: number;
  originalPrice?: number; // enables the discount badge when present
  image: string;
  category: "batom" | "base" | "chapinha" | "lingerie" | "skincare";
  platform: "shopee" | "amazon" | "mercado-livre" | "tiktok-shop";
  affiliateUrl: string;
  tags: string[]; // semantic search terms
  active: boolean;
  rating?: number;
  reviewCount?: number;
}

// Populated by the Shopee feed once the Open API is connected.
export const products: Product[] = [];

export function getByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category && p.active);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id && p.active);
}

export function getAllProducts(): Product[] {
  return products.filter((p) => p.active);
}