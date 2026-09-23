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

// Affiliate links expire: re-check priceCheckedAt and the links periodically
// until the Shopee Open API feed replaces this manual list.
export const products: Product[] = [
  {
    id: "hidrabene-clareador-70",
    name: "Hidrabene Protetor Solar Clareador Facial 70 FPS",
    description: "Protetor solar facial com ação clareadora e FPS 70 para a rotina diária.",
    price: 36.9,
    image: "/produtos/hidrabene-clareador-70.jpg",
    category: "skincare",
    platform: "shopee",
    affiliateUrl: "https://s.shopee.com.br/2VrxEfRhh6",
    tags: ["protetor solar", "clareador", "fps 70", "skincare", "rosto"],
    active: true,
    rating: 4.9,
    reviewCount: 37500,
    soldCount: 80000,
    shopName: "Hidrabene",
    highlights: [
      "FPS 70 de proteção solar facial",
      "Ação clareadora na mesma aplicação",
      "Loja oficial Hidrabene na Shopee",
    ],
    priceCheckedAt: "2026-09-23",
  },
  {
    id: "hidrabene-kit-clareador",
    name: "Kit Clareador Facial Hidrabene - Sabonete + Protetor Solar 70 FPS + Sérum",
    description: "Rotina clareadora completa: sabonete líquido, protetor solar FPS 70 e sérum multicorretivo.",
    price: 79.9,
    image: "/produtos/hidrabene-kit-clareador.jpg",
    category: "skincare",
    platform: "shopee",
    affiliateUrl: "https://s.shopee.com.br/6AlFcESGxs",
    tags: ["kit skincare", "clareador", "protetor solar", "serum", "sabonete facial"],
    active: true,
    rating: 4.9,
    reviewCount: 9300,
    soldCount: 20000,
    shopName: "Hidrabene",
    highlights: [
      "Três passos da rotina clareadora em um kit",
      "Sabonete líquido facial, protetor solar FPS 70 e sérum multicorretivo",
      "Loja oficial Hidrabene na Shopee",
    ],
    priceCheckedAt: "2026-09-23",
  },
  {
    id: "principia-kit-limpa-hidrata",
    name: "Principia Kit Limpa, Hidrata e Protege - Gel de Limpeza + Hidratante + Protetor com Cor FPS 70",
    description: "Rotina facial em três passos: gel de limpeza, creme hidratante e protetor solar com cor FPS 70.",
    price: 79.99,
    image: "/produtos/principia-kit-limpa-hidrata.jpg",
    category: "skincare",
    platform: "shopee",
    affiliateUrl: "https://s.shopee.com.br/3LR4F2uFqv",
    tags: ["kit skincare", "gel de limpeza", "hidratante facial", "protetor solar com cor", "principia"],
    active: true,
    rating: 4.9,
    reviewCount: 6500,
    soldCount: 10000,
    shopName: "Principia Skincare",
    highlights: [
      "Gel de limpeza GL-01, creme hidratante CH-01 e protetor com cor PS-05",
      "Protetor com cor FPS 70 que uniformiza o tom da pele",
      "Loja oficial Principia Skincare na Shopee",
    ],
    priceCheckedAt: "2026-09-23",
  },
  {
    id: "salon-line-matizadora-vermelha",
    name: "Máscara de Hidratação Matizadora Vermelha #todecacho Salon Line 500g",
    description: "Matiza e hidrata cabelos vermelhos, avivando a cor entre uma coloração e outra.",
    price: 31.5,
    image: "/produtos/salon-line-matizadora-vermelha.jpg",
    category: "cabelo",
    platform: "shopee",
    affiliateUrl: "https://s.shopee.com.br/1BMZktSKrc",
    tags: ["mascara capilar", "matizadora", "cabelo vermelho", "hidratacao", "salon line"],
    active: true,
    rating: 4.9,
    reviewCount: 21100,
    soldCount: 30000,
    shopName: "Salon Line",
    highlights: [
      "Aviva o vermelho entre uma coloração e outra",
      "Hidrata no mesmo passo da matização",
      "Pote de 500g, loja oficial Salon Line",
    ],
    priceCheckedAt: "2026-09-23",
  },
  {
    id: "karsselly-kit-capilar-completo",
    name: "Kit Capilar Completo Karsselly - Shampoo e Condicionador 1L + Máscara Colágeno 500g + Óleo Reparador",
    description: "Kit completo de lavagem e tratamento: shampoo, condicionador, máscara de colágeno e óleo reparador.",
    price: 49.99,
    image: "/produtos/karsselly-kit-capilar.jpg",
    category: "cabelo",
    platform: "shopee",
    affiliateUrl: "https://s.shopee.com.br/4qFs7YGBsX",
    tags: ["kit capilar", "shampoo", "condicionador", "mascara colageno", "oleo reparador"],
    active: true,
    rating: 4.8,
    reviewCount: 628,
    soldCount: 1000,
    shopName: "Vitrine360",
    highlights: [
      "Shampoo e condicionador de 1L cada",
      "Máscara de hidratação com colágeno de 500g",
      "Óleo reparador para finalizar",
    ],
    priceCheckedAt: "2026-09-23",
  },
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