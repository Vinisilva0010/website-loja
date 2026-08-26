export interface Product {
  id: string;                 // slug único, ex: "batom-matte-vermelho"
  name: string;
  description: string;        // texto curatorial seu, nunca copia da plataforma
  price: number;
  originalPrice?: number;     // se tiver, ativa o selo de oferta
  image: string;
  category: "batom" | "base" | "chapinha" | "lingerie" | "skincare";
  platform: "tiktok-shop" | "shein" | "mercado-livre";
  affiliateUrl: string;
  tags: string[];              // termos de busca/semânticos: uso, ocasião, tipo de pele/cabelo
  active: boolean;
  rating?: number;
  reviewCount?: number;
}

// MOCK — apaga essas linhas quando entrar produto de verdade.
// Ficam aqui só pra você visualizar o layout enquanto não afilia nada.
export const products: Product[] = [
  {
    id: "mock-batom-1",
    name: "Batom Matte Longa Duração",
    description: "Cobertura intensa sem ressecar, ideal pra quem repõe o batom preferido todo mês.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/hero-poster.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-batom-1",
    name: "Batom Matte Longa Duração",
    description: "Cobertura intensa sem ressecar, ideal pra quem repõe o batom preferido todo mês.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/hero-poster.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-batom-1",
    name: "Batom Matte Longa Duração",
    description: "Cobertura intensa sem ressecar, ideal pra quem repõe o batom preferido todo mês.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/hero-poster.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-batom-1",
    name: "Batom Matte Longa Duração",
    description: "Cobertura intensa sem ressecar, ideal pra quem repõe o batom preferido todo mês.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/hero-poster.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-batom-1",
    name: "Batom Matte Longa Duração",
    description: "Cobertura intensa sem ressecar, ideal pra quem repõe o batom preferido todo mês.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/hero-poster.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-chapinha-1",
    name: "Prancha Modeladora Profissional",
    description: "Chega em temperatura uniforme, boa pra quem usa toda semana sem danificar o fio.",
    price: 89.9,
    image: "/images/mock/hero-poster.png",
    category: "chapinha",
    platform: "tiktok-shop",
    affiliateUrl: "#",
    tags: ["prancha cabelo", "chapinha profissional"],
    active: true,
  },
  {
    id: "mock-chapinha-1",
    name: "Prancha Modeladora Profissional",
    description: "Chega em temperatura uniforme, boa pra quem usa toda semana sem danificar o fio.",
    price: 89.9,
    image: "/images/mock/hero-poster.png",
    category: "chapinha",
    platform: "tiktok-shop",
    affiliateUrl: "#",
    tags: ["prancha cabelo", "chapinha profissional"],
    active: true,
  },
  {
    id: "mock-chapinha-1",
    name: "Prancha Modeladora Profissional",
    description: "Chega em temperatura uniforme, boa pra quem usa toda semana sem danificar o fio.",
    price: 89.9,
    image: "/images/mock/hero-poster.png",
    category: "chapinha",
    platform: "tiktok-shop",
    affiliateUrl: "#",
    tags: ["prancha cabelo", "chapinha profissional"],
    active: true,
  },
  
  
];

export function getByCategory(category: Product["category"]) {
  return products.filter((p) => p.category === category && p.active);
}