export interface Product {
  id: string; // slug/identificador único
  name: string;
  description: string; // texto editorial curto e direto
  price: number;
  originalPrice?: number; // ativa o selo de desconto quando presente
  image: string;
  category: "batom" | "base" | "chapinha" | "lingerie" | "skincare";
  platform: "tiktok-shop" | "shein" | "mercado-livre";
  affiliateUrl: string;
  tags: string[]; // termos semânticos para busca
  active: boolean;
  rating?: number;
  reviewCount?: number;
}

export const products: Product[] = [
  {
    id: "mock-skincare-kit-1",
    name: "Kit Skin Care Limpeza de Pele Rosa Mosqueta",
    description: "Conjunto completo para higienização e hidratação facial diária.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/skin.png",
    category: "skincare",
    platform: "shein",
    affiliateUrl: "https://br.shein.com",
    tags: ["skincare", "limpeza de pele", "rosa mosqueta", "hidratante"],
    active: true,
  },
  {
    id: "mock-skincare-kit-1",
    name: "Kit Skin Care Limpeza de Pele Rosa Mosqueta",
    description: "Conjunto completo para higienização e hidratação facial diária.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/skin.png",
    category: "skincare",
    platform: "shein",
    affiliateUrl: "https://br.shein.com",
    tags: ["skincare", "limpeza de pele", "rosa mosqueta", "hidratante"],
    active: true,
  },
  {
    id: "mock-skincare-kit-1",
    name: "Kit Skin Care Limpeza de Pele Rosa Mosqueta",
    description: "Conjunto completo para higienização e hidratação facial diária.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/skin.png",
    category: "skincare",
    platform: "shein",
    affiliateUrl: "https://br.shein.com",
    tags: ["skincare", "limpeza de pele", "rosa mosqueta", "hidratante"],
    active: true,
  },
  {
    id: "mock-esfoliante-poran-2",
    name: "Porán Esfoliante Corporal 240g",
    description: "Renovação celular e maciez com textura cremosa de fácil espalhabilidade.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/creme.png",
    category: "skincare",
    platform: "shein",
    affiliateUrl: "https://br.shein.com",
    tags: ["esfoliante corporal", "poran", "cuidados corpo", "skincare"],
    active: true,
  },
  {
    id: "mock-cilios-clusters-3",
    name: "Cílios para Iniciantes 200 Clusters",
    description: "Curvatura C leve com tamanhos mistos de 8mm a 16mm para aplicação prática.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/cili.png",
    category: "base",
    platform: "shein",
    affiliateUrl: "https://br.shein.com",
    tags: ["cilios", "clusters", "olhos", "maquiagem"],
    active: true,
  },
  {
    id: "mock-rimel-4d-4",
    name: "Rímel 4D à Prova D'água",
    description: "Efeito volumoso e alongamento resistente à água para uso prolongado.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/cili2.png",
    category: "base",
    platform: "shein",
    affiliateUrl: "https://br.shein.com",
    tags: ["rimel", "mascara cilios", "prova dagua", "olhos"],
    active: true,
  },
  {
    id: "mock-batom-matte-5",
    name: "Batom Matte Longa Duração",
    description: "Alta pigmentação com acabamento aveludado e secagem sem ressecar.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/baton.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "https://br.shein.com",
    tags: ["batom matte", "reposição mensal", "labios", "longa duracao"],
    active: true,
  },
  {
    id: "mock-prancha-bivolt-6",
    name: "Prancha Chapinha de Cabelo Bivolt",
    description: "Aquecimento uniforme e placas de cerâmica para alinhamento rápido do fio.",
    price: 32.9,
    image: "/images/mock/chapa.png",
    category: "chapinha",
    platform: "tiktok-shop",
    affiliateUrl: "https://www.tiktok.com",
    tags: ["prancha cabelo", "chapinha", "bivolt", "ferramentas"],
    active: true,
  },
  {
    id: "mock-escova-secadora-7",
    name: "Escova Secadora e Alisadora 3 em 1",
    description: "Seca, alisa e modela com controle de temperatura e cerdas flexíveis.",
    price: 43.9,
    image: "/images/mock/he5.png",
    category: "chapinha",
    platform: "tiktok-shop",
    affiliateUrl: "https://www.tiktok.com",
    tags: ["escova secadora", "alisador", "cabelo", "styler"],
    active: true,
  },
  {
    id: "mock-escova-secadora-7",
    name: "Escova Secadora e Alisadora 3 em 1",
    description: "Seca, alisa e modela com controle de temperatura e cerdas flexíveis.",
    price: 43.9,
    image: "/images/mock/he5.png",
    category: "chapinha",
    platform: "tiktok-shop",
    affiliateUrl: "https://www.tiktok.com",
    tags: ["escova secadora", "alisador", "cabelo", "styler"],
    active: true,
  },
  {
    id: "mock-escova-secadora-7",
    name: "Escova Secadora e Alisadora 3 em 1",
    description: "Seca, alisa e modela com controle de temperatura e cerdas flexíveis.",
    price: 43.9,
    image: "/images/mock/he5.png",
    category: "chapinha",
    platform: "tiktok-shop",
    affiliateUrl: "https://www.tiktok.com",
    tags: ["escova secadora", "alisador", "cabelo", "styler"],
    active: true,
  },
  {
    id: "mock-removedor-cravos-8",
    name: "Removedor de Cravos e Espinhas a Vácuo",
    description: "Sucção facial recarregável via USB para limpeza de poros.",
    price: 23.9,
    image: "/images/mock/remo.png",
    category: "skincare",
    platform: "tiktok-shop",
    affiliateUrl: "https://www.tiktok.com",
    tags: ["removedor cravos", "limpeza facial", "skincare", "poros"],
    active: true,
  },
  {
    id: "mock-removedor-cravos-8",
    name: "Removedor de Cravos e Espinhas a Vácuo",
    description: "Sucção facial recarregável via USB para limpeza de poros.",
    price: 23.9,
    image: "/images/mock/remo.png",
    category: "skincare",
    platform: "tiktok-shop",
    affiliateUrl: "https://www.tiktok.com",
    tags: ["removedor cravos", "limpeza facial", "skincare", "poros"],
    active: true,
  },
  {
    id: "mock-removedor-cravos-8",
    name: "Removedor de Cravos e Espinhas a Vácuo",
    description: "Sucção facial recarregável via USB para limpeza de poros.",
    price: 23.9,
    image: "/images/mock/remo.png",
    category: "skincare",
    platform: "tiktok-shop",
    affiliateUrl: "https://www.tiktok.com",
    tags: ["removedor cravos", "limpeza facial", "skincare", "poros"],
    active: true,
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