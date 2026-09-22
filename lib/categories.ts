   import type { Product } from "@/lib/products";


   
export interface CategoryDetail {
  key?: Product["category"]; // omitted for curated lists that use customFilter
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  metrics: { value: string; label: string }[];
  criteria: { title: string; items: string[] }[];
  steps: { step: number; title: string; description: string }[];
  useCases: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  customFilter?: (products: Product[]) => Product[];
}

// The selection process is the same for every category.
const SELECTION_STEPS: CategoryDetail["steps"] = [
  {
    step: 1,
    title: "Filtro pelos dados da plataforma",
    description:
      "Partimos da nota média, do volume de vendas e da reputação do vendedor informados pela própria plataforma.",
  },
  {
    step: 2,
    title: "Leitura de avaliações reais",
    description:
      "Conferimos comentários e fotos de compradoras para checar textura, acabamento e problemas que se repetem.",
  },
  {
    step: 3,
    title: "Link direto para o anúncio oficial",
    description:
      "O botão leva ao anúncio na Amazon, Shopee, Mercado Livre ou TikTok Shop, onde acontecem a compra, o pagamento e a entrega.",
  },
];

const DEFAULT_METRICS: CategoryDetail["metrics"] = [
  { value: "Oficial", label: "Compra na plataforma" },
  { value: "Nota + vendas", label: "Critério de seleção" },
  { value: "R$ 0", label: "Custo extra pra você" },
];

const DELIVERY_FAQ = {
  question: "O site vende ou entrega os produtos?",
  answer:
    "Não. A compra, o pagamento e a entrega acontecem na plataforma do anúncio (Amazon, Shopee, Mercado Livre ou TikTok Shop), com as regras de troca e devolução dela.",
};


   export const CATEGORY_MAP: Record<string, CategoryDetail> = {
  maquiagem: {
    key: "maquiagem",
    title: "Maquiagem",
    subtitle: "BASE, CORRETIVO, BATOM E OLHOS DE REPOSIÇÃO",
    description:
      "Bases, corretivos, pós, batons e rímeis que acabam e voltam pro carrinho, escolhidos por nota, volume de vendas e comentários de quem já usou.",
    badge: "MAKEUP // CURADORIA 2026",
    metrics: DEFAULT_METRICS,
    criteria: [
      {
        title: "Cobertura e acabamento",
        items: [
          "Cobertura descrita bate com as fotos das compradoras",
          "Acabamento (matte, natural, glow) informado com clareza",
          "Variedade de tons, incluindo peles negras",
        ],
      },
      {
        title: "Duração no dia a dia",
        items: [
          "Relatos de fixação ao longo do dia",
          "Comportamento em calor e pele oleosa",
          "Sem reclamações frequentes de craquelar",
        ],
      },
      {
        title: "Custo por reposição",
        items: [
          "Rendimento por ml ou grama",
          "Preço que cabe numa recompra mensal",
          "Vendedor com boa reputação e envio regular",
        ],
      },
    ],
    steps: SELECTION_STEPS,
    useCases: [
      { title: "Maquiagem do dia a dia", description: "Itens de acabamento natural pra trabalho e faculdade, sem retoque toda hora." },
      { title: "Pele oleosa e calor", description: "Bases e pós de acabamento matte que seguram melhor a oleosidade." },
      { title: "Reposição mensal", description: "Os itens que mais acabam na bancada, com preço de recompra." },
    ],
    faqs: [
      {
        question: "Como acertar o tom da base comprando online?",
        answer:
          "Compare as fotos de compradoras com tom de pele parecido com o seu nos comentários do anúncio. A foto de catálogo costuma ter luz que muda a cor.",
      },
      DELIVERY_FAQ,
    ],
  },
  skincare: {
    key: "skincare",
    title: "Skincare",
    subtitle: "LIMPEZA, SÉRUM, HIDRATAÇÃO E PROTEÇÃO SOLAR",
    description:
      "Os produtos da rotina de cuidados com a pele que você repõe com frequência, escolhidos por nota, vendas e relatos de uso.",
    badge: "SKIN // CURADORIA 2026",
    metrics: DEFAULT_METRICS,
    criteria: [
      {
        title: "Ativos e textura",
        items: [
          "Ativos informados no rótulo (vitamina C, niacinamida, ácido hialurônico)",
          "Absorção rápida, sem sensação pegajosa",
          "FPS e tipo de toque declarados no anúncio do protetor",
        ],
      },
      {
        title: "Tipo de pele",
        items: [
          "Indicação clara pra pele oleosa, seca, mista ou sensível",
          "Relatos de compradoras com o mesmo tipo de pele",
          "Sem reclamações frequentes de irritação",
        ],
      },
      {
        title: "Rendimento",
        items: [
          "Duração do frasco na rotina diária",
          "Embalagem com pump ou conta-gotas",
          "Comparação de preço entre unidade e kit",
        ],
      },
    ],
    steps: SELECTION_STEPS,
    useCases: [
      { title: "Rotina básica", description: "Limpar, hidratar e proteger: o trio que sustenta qualquer rotina." },
      { title: "Pele oleosa e poros", description: "Géis de limpeza e hidratantes leves que não pesam." },
      { title: "Manchas e viço", description: "Séruns com ativos iluminadores pra usar junto com protetor solar." },
    ],
    faqs: [
      {
        question: "Qual a ordem de aplicação dos produtos?",
        answer:
          "Do mais leve pro mais denso: limpeza, tônico, sérum, hidratante e, de manhã, protetor solar por último.",
      },
      DELIVERY_FAQ,
    ],
  },
  cabelo: {
    key: "cabelo",
    title: "Cabelo",
    subtitle: "SHAMPOO, MÁSCARA, ÓLEO E FINALIZADOR",
    description:
      "Produtos de cuidado capilar que acabam e voltam pra lista de compras, escolhidos por tipo de fio, nota e relatos de uso.",
    badge: "HAIR // CURADORIA 2026",
    metrics: DEFAULT_METRICS,
    criteria: [
      {
        title: "Indicação por tipo de fio",
        items: [
          "Indicação clara: liso, ondulado, cacheado ou crespo",
          "Função descrita: hidratação, nutrição ou reconstrução",
          "Relatos de compradoras com o mesmo tipo de cabelo",
        ],
      },
      {
        title: "Resultado relatado",
        items: [
          "Maciez e brilho citados nas avaliações",
          "Controle de frizz e volume",
          "Sem reclamações frequentes de ressecamento",
        ],
      },
      {
        title: "Rendimento",
        items: [
          "Tamanho da embalagem versus frequência de uso",
          "Preço por ml comparado a similares",
          "Vendedor com boa reputação e envio regular",
        ],
      },
    ],
    steps: SELECTION_STEPS,
    useCases: [
      { title: "Cronograma capilar", description: "Máscaras de hidratação, nutrição e reconstrução pra alternar na semana." },
      { title: "Frizz e volume", description: "Óleos e finalizadores que alinham sem pesar." },
      { title: "Cachos e crespos", description: "Cremes e géis com definição relatada por quem tem o mesmo tipo de fio." },
    ],
    faqs: [
      {
        question: "Qual a diferença entre hidratação, nutrição e reconstrução?",
        answer:
          "Hidratação repõe água, nutrição repõe óleos e reconstrução repõe proteína. Muita gente alterna os três num cronograma capilar.",
      },
      DELIVERY_FAQ,
    ],
  },
  "corpo-e-banho": {
    key: "corpo",
    title: "Corpo & Banho",
    subtitle: "HIDRATANTE, ESFOLIANTE, DESODORANTE E BODY SPLASH",
    description:
      "Cuidados com o corpo que fazem parte da rotina e acabam rápido, escolhidos por nota, vendas e relatos de uso.",
    badge: "BODY // CURADORIA 2026",
    metrics: DEFAULT_METRICS,
    criteria: [
      {
        title: "Textura e absorção",
        items: [
          "Absorção rápida, sem deixar a pele grudando",
          "Hidratação que dura, segundo as avaliações",
          "Indicação pra pele seca ou normal",
        ],
      },
      {
        title: "Fragrância",
        items: [
          "Fixação relatada pelas compradoras",
          "Descrição clara das notas do perfume",
          "Sem reclamações frequentes de cheiro enjoativo",
        ],
      },
      {
        title: "Custo",
        items: [
          "Preço por ml comparado a similares",
          "Tamanho da embalagem versus frequência de uso",
          "Vendedor com boa reputação e envio regular",
        ],
      },
    ],
    steps: SELECTION_STEPS,
    useCases: [
      { title: "Pele seca", description: "Hidratantes corporais densos pra cotovelos, joelhos e pernas." },
      { title: "Renovação da pele", description: "Esfoliantes corporais pra usar uma ou duas vezes por semana." },
      { title: "Perfume do dia a dia", description: "Body splashes leves pra usar e reaplicar ao longo do dia." },
    ],
    faqs: [
      {
        question: "Body splash fixa como perfume?",
        answer:
          "Não. O body splash tem menos concentração de fragrância e dura menos, então vale reaplicar ao longo do dia.",
      },
      DELIVERY_FAQ,
    ],
  },
  unhas: {
    key: "unhas",
    title: "Unhas",
    subtitle: "ESMALTES, BASES E CUIDADOS",
    description:
      "Esmaltes e cuidados com as unhas que você repõe sempre, escolhidos por nota, vendas e relatos de uso.",
    badge: "NAILS // CURADORIA 2026",
    metrics: DEFAULT_METRICS,
    criteria: [
      {
        title: "Cobertura e secagem",
        items: [
          "Cobertura em uma ou duas camadas",
          "Tempo de secagem relatado nas avaliações",
          "Cor real parecida com a foto do anúncio",
        ],
      },
      {
        title: "Durabilidade",
        items: [
          "Dias sem descascar, segundo as compradoras",
          "Brilho que se mantém",
          "Pincel que facilita a aplicação",
        ],
      },
      {
        title: "Cuidados",
        items: [
          "Bases fortalecedoras com função descrita",
          "Removedores que não ressecam a cutícula",
          "Kits com preço melhor que itens avulsos",
        ],
      },
    ],
    steps: SELECTION_STEPS,
    useCases: [
      { title: "Unha feita em casa", description: "Esmaltes de secagem rápida e bom pincel pra quem faz sozinha." },
      { title: "Unhas fracas", description: "Bases fortalecedoras pra usar sozinhas ou por baixo da cor." },
      { title: "Reposição de cores", description: "Os tons que mais saem, com preço de recompra." },
    ],
    faqs: [
      {
        question: "Por que o esmalte descasca rápido?",
        answer:
          "Os motivos mais comuns são aplicar sem base, fazer camadas grossas e molhar as mãos em água quente logo depois. Base, camadas finas e extra brilho ajudam.",
      },
      DELIVERY_FAQ,
    ],
  },
  "achados-ate-50": {
    title: "Achados até R$ 50",
    subtitle: "OS MELHORES ITENS DE REPOSIÇÃO QUE CABEM NO BOLSO",
    description:
      "Maquiagem, skincare, cabelo, corpo e unhas com preço de até R$ 50 no momento da atualização.",
    badge: "ATÉ R$ 50 // CURADORIA 2026",
    metrics: [
      { value: "Até R$ 50", label: "Teto de preço" },
      { value: "Nota + vendas", label: "Critério de seleção" },
      { value: "R$ 0", label: "Custo extra pra você" },
    ],
    criteria: [
      {
        title: "Preço real",
        items: [
          "Preço de até R$ 50 no anúncio",
          "Atenção ao frete antes de fechar a compra",
          "Cupons da plataforma podem baixar ainda mais",
        ],
      },
      {
        title: "Qualidade mínima",
        items: [
          "Nota média alta e muitas avaliações",
          "Fotos de compradoras parecidas com o anúncio",
          "Sem reclamações frequentes de produto falso",
        ],
      },
      {
        title: "Vendedor",
        items: [
          "Boa reputação na plataforma",
          "Envio regular e dentro do prazo",
          "Política de troca da própria plataforma",
        ],
      },
    ],
    steps: SELECTION_STEPS,
    useCases: [
      { title: "Completar o frete grátis", description: "Itens úteis pra fechar o valor mínimo do frete grátis." },
      { title: "Reposição sem pesar", description: "Os itens que mais acabam, dentro do orçamento do mês." },
      { title: "Lembrancinhas", description: "Produtos de beleza baratos pra presentear." },
    ],
    faqs: [
      {
        question: "Por que um item pode passar de R$ 50?",
        answer:
          "O preço é do vendedor e muda quando uma promoção acaba. O valor que vale é sempre o que aparece no anúncio na hora da compra.",
      },
      DELIVERY_FAQ,
    ],
    customFilter: (allProds) => allProds.filter((p) => p.price <= 50),
  },
  "mais-bem-avaliados": {
    title: "Mais Bem Avaliados",
    subtitle: "NOTA 4,7 OU MAIS, ORDENADOS POR NOTA E VENDAS",
    description:
      "Os produtos com as notas mais altas e mais vendas nas plataformas, pra quem quer ir no que já foi aprovado.",
    badge: "TOP RATED // CURADORIA 2026",
    metrics: [
      { value: "4,7+", label: "Nota mínima" },
      { value: "Vendas", label: "Critério de desempate" },
      { value: "R$ 0", label: "Custo extra pra você" },
    ],
    criteria: [
      {
        title: "Nota consistente",
        items: [
          "Média de 4,7 estrelas ou mais",
          "Volume grande de avaliações, não só meia dúzia",
          "Fotos de compradoras parecidas com o anúncio",
        ],
      },
      {
        title: "Vendedor",
        items: [
          "Boa reputação na plataforma",
          "Envio regular e dentro do prazo",
          "Respostas às dúvidas no anúncio",
        ],
      },
      {
        title: "Recompra",
        items: [
          "Relatos de quem comprou de novo",
          "Produto de uso contínuo",
          "Preço estável ao longo do tempo",
        ],
      },
    ],
    steps: SELECTION_STEPS,
    useCases: [
      { title: "Comprar sem pesquisar", description: "Pra quem quer ir direto no que a maioria aprovou." },
      { title: "Presente seguro", description: "Produtos com aprovação alta, com menos risco de errar." },
      { title: "Trocar de produto", description: "Alternativas bem avaliadas pro que você já usa." },
    ],
    faqs: [
      {
        question: "A seleção é paga pelas lojas?",
        answer:
          "Não. Lojista não paga pra aparecer aqui. Recebemos comissão da plataforma quando alguém compra pelo link, sem custo extra pra quem compra.",
      },
      DELIVERY_FAQ,
    ],
    customFilter: (allProds) =>
      allProds
        .filter((p) => (p.rating ?? 0) >= 4.7)
        .sort(
          (a, b) =>
            (b.rating ?? 0) - (a.rating ?? 0) || (b.soldCount ?? 0) - (a.soldCount ?? 0)
        ),
  },


};


// Resolves a URL slug (including synonyms and legacy slugs) to a canonical category slug.
export function resolveCategorySlug(rawSlug: string): string | null {
  const slug = rawSlug.toLowerCase();
  // hasOwnProperty avoids treating inherited keys like "constructor" as categories
  if (Object.prototype.hasOwnProperty.call(CATEGORY_MAP, slug)) return slug;
  if (slug.includes("batom") || slug.includes("base") || slug.includes("labio")) return "maquiagem";
  if (slug.includes("pele") || slug.includes("creme") || slug.includes("serum")) return "skincare";
  if (slug.includes("cabelo") || slug.includes("shampoo")) return "cabelo";
  if (slug.includes("corpo") || slug.includes("banho")) return "corpo-e-banho";
  if (slug.includes("unha") || slug.includes("esmalte")) return "unhas";
  if (slug.includes("50")) return "achados-ate-50";
  if (slug.includes("avaliad")) return "mais-bem-avaliados";
  return null;
}
