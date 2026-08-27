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
    name: "Kit skin care limpeza de pele rosa mosqueta",
    description: "Cobertura intensa sem ressecar, ideal pra quem repõe o batom preferido todo mês.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/skin.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-batom-1",
    name: "Poran Esfoliantes Corporal 240g",
    description: "Cobertura intensa sem ressecar, ideal pra quem repõe o batom preferido todo mês.",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/creme.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-batom-1",
    name: "Cílios Adequados Para Iniciantes 200 Clusters ",
    description: "Ondulação C Leve , Fácil De Aplicar , 8-16 Mm Mistos",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/cili.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-batom-1",
    name: "Rímel 4D À Prova D'água ",
    description: "Denso Encaracolado Lon g Duradouro Ey e Makeup She doe Mascara",
    price: 34.9,
    originalPrice: 59.9,
    image: "/images/mock/cili2.png",
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
    image: "/images/mock/baton.png",
    category: "batom",
    platform: "shein",
    affiliateUrl: "#",
    tags: ["batom matte", "reposição mensal", "longa duração"],
    active: true,
  },
  {
    id: "mock-chapinha-1",
    name: "Prancha Chapinha de Cabelo Bivolt 110V/220V",
    description: "Chega em temperatura uniforme, boa pra quem usa toda semana sem danificar o fio.",
    price: 32.9,
    image: "/images/mock/chapa.png",
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