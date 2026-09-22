"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Footer from "@/app/components/sections/Footer";
import { getByCategory, getAllProducts, type Product } from "@/lib/products";
import {
  Sliders,
  ExternalLink,
} from "lucide-react";

interface CategoryDetail {
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

const CATEGORY_MAP: Record<string, CategoryDetail> = {
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









export default function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }> | { categoria: string };
}) {
  const resolvedParams = "then" in params ? use(params) : params;
  const rawSlug = resolvedParams.categoria.toLowerCase();






  // Map synonyms and legacy slugs to the canonical category slug
  const categoryKey = useMemo(() => {
    if (CATEGORY_MAP[rawSlug]) return rawSlug;
    if (rawSlug.includes("batom") || rawSlug.includes("base") || rawSlug.includes("labio")) return "maquiagem";
    if (rawSlug.includes("pele") || rawSlug.includes("creme") || rawSlug.includes("serum")) return "skincare";
    if (rawSlug.includes("cabelo") || rawSlug.includes("shampoo")) return "cabelo";
    if (rawSlug.includes("corpo") || rawSlug.includes("banho")) return "corpo-e-banho";
    if (rawSlug.includes("unha") || rawSlug.includes("esmalte")) return "unhas";
    if (rawSlug.includes("50")) return "achados-ate-50";
    if (rawSlug.includes("avaliad")) return "mais-bem-avaliados";
    return null;
  }, [rawSlug]);

  if (!categoryKey) {
    notFound();
  }

  // Legacy and synonym slugs redirect to the canonical URL to avoid duplicate pages
  if (categoryKey !== rawSlug) {
    redirect(`/${categoryKey}`);
  }

  const catData = CATEGORY_MAP[categoryKey];

  // Curated lists use their own filter; categories show only their own products
  const allProducts = getAllProducts();
  const products = catData.customFilter
    ? catData.customFilter(allProducts)
    : catData.key
    ? getByCategory(catData.key)
    : [];

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.02]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);

  return (
    <main ref={containerRef} className="w-full bg-[#fcddfc] text-black overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-36 pb-20 overflow-hidden border-b-[8px] border-[#970797]">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#970797_1.5px,transparent_1.5px)] bg-[size:32px_32px]" />
        </div>

        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-8"
        >
          <div className="inline-block border-[4px] border-black bg-[#970797] px-5 py-2 shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
              [ {catData.badge} ]
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-title text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-none tracking-tight text-black"
            style={{
              textShadow: "5px 5px 0px #59abf8",
            }}
          >
            {catData.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-lg sm:text-2xl font-black max-w-3xl text-black leading-snug"
          >
            {catData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 w-full max-w-3xl"
          >
            {catData.metrics.map((metric, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border-[4px] border-black shadow-[6px_6px_0px_#000000]"
              >
                <span className="font-title text-3xl sm:text-4xl font-black text-black">
                  {metric.value}
                </span>
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[#970797] mt-1 text-center">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>

          <div className="pt-4">
            <a
              href="#produtos"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#970797] text-white font-mono text-sm sm:text-base font-black uppercase rounded-xl border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#59abf8] hover:text-black transition-all active:translate-y-1"
            >
              <span>Ver Produtos Selecionados</span>
              <span>↓</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. GRADE DE PRODUTOS REAIS */}
      <section id="produtos" className="relative w-full py-24 px-4 sm:px-6 md:px-12 bg-white border-b-[8px] border-[#970797]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-block border-[3px] border-black bg-[#59abf8] px-4 py-1 mb-3 shadow-[3px_3px_0px_#000000]">
                <span className="font-mono text-xs font-black text-black uppercase tracking-widest">
                  [ PRODUTOS ATIVOS // OFERTAS VERIFICADAS ]
                </span>
              </div>
              <h2 className="font-title text-4xl sm:text-6xl font-black uppercase text-black leading-none">
                Seleção de {catData.title}
              </h2>
            </div>
            <span className="font-mono text-xs sm:text-sm font-black text-black uppercase bg-[#fcddfc] px-4 py-2 rounded-lg border-[2px] border-black">
              Total: {products.length} itens listados
            </span>
          </div>

          {products.length === 0 ? (
            <div className="rounded-3xl border-[4px] border-black bg-[#fcddfc] p-12 text-center shadow-[8px_8px_0px_#000000]">
              <p className="font-mono text-base font-black text-black uppercase">
                [ NENHUM PRODUTO ATIVO NESTA CATEGORIA NO MOMENTO ]
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;
                const discountPercent = hasDiscount
                  ? Math.round(100 - (product.price / product.originalPrice!) * 100)
                  : 0;

                                const platformName =
                  product.platform === "shopee"
                    ? "Shopee"
                    : product.platform === "amazon"
                    ? "Amazon"
                    : product.platform === "tiktok-shop"
                    ? "TikTok Shop"
                    : "Mercado Livre";

                return (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-3xl border-[4px] border-black bg-white p-6 shadow-[8px_8px_0px_#000000] hover:shadow-[8px_8px_0px_#970797] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b-[2px] border-black/10">
                        <span className="font-mono text-xs font-black uppercase text-[#970797]">
                          {platformName}
                        </span>
                        {hasDiscount && (
                          <span className="font-mono text-xs font-black uppercase bg-[#970797] text-white px-2.5 py-0.5 rounded border border-black">
                            -{discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <h3 className="font-title text-2xl font-black uppercase text-black mb-3 leading-tight">
                        {product.name}
                      </h3>

                      <p className="font-sans text-sm font-bold text-black leading-relaxed mb-6">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {product.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[10px] font-black uppercase bg-[#fcddfc] text-black px-2 py-0.5 rounded border border-black"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t-[3px] border-black/15">
                      <div className="flex items-baseline gap-2 mb-3">
                        {hasDiscount && (
                          <span className="font-sans text-sm font-bold line-through text-black/60">
                            R$ {product.originalPrice!.toFixed(2)}
                          </span>
                        )}
                        <span className="font-title text-3xl font-black text-[#970797]">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>

                      <a
                        href={`/go/${product.id}`}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-mono text-sm font-black uppercase bg-[#970797] text-white border-[3px] border-black shadow-[3px_3px_0px_#000000] hover:bg-[#59abf8] hover:text-black transition-all active:translate-y-0.5 text-center"
                      >
                        <span>Ver Oferta na {platformName}</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. CRITÉRIOS DE ESCOLHA */}
      <section className="relative w-full py-28 px-4 sm:px-6 bg-[#fcddfc] overflow-hidden border-b-[8px] border-[#970797]">
        <div className="relative z-10 max-w-6xl mx-auto mb-16 text-center">
          <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
              [ CRITÉRIOS DE CURADORIA // O QUE AVALIAMOS ]
            </span>
          </div>
          <h2 className="font-title text-4xl sm:text-6xl md:text-7xl font-black uppercase text-black leading-none">
            Critérios de Escolha
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {catData.criteria.map((crit, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white text-black border-[4px] border-black shadow-[8px_8px_0px_#000000] flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#970797] text-white border-[3px] border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000000]">
                  <Sliders size={26} />
                </div>
                <h3 className="font-title text-2xl font-black uppercase text-black mb-4">
                  {crit.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {crit.items.map((item, j) => (
                    <li key={j} className="font-sans text-sm font-bold text-black flex items-start gap-2.5">
                      <span className="text-[#970797] font-black text-base mt-[-2px]">■</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. METODOLOGIA DE SELEÇÃO */}
      <section className="relative w-full py-28 px-4 sm:px-6 md:px-12 bg-white border-b-[8px] border-[#970797]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block border-[4px] border-black bg-[#59abf8] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs sm:text-sm font-black text-black uppercase tracking-widest">
                [ METODOLOGIA EDITORIAL // PROCESSO DE SELEÇÃO ]
              </span>
            </div>
            <h2 className="font-title text-4xl sm:text-6xl md:text-7xl font-black uppercase text-black leading-none">
              Como Selecionamos
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {catData.steps.map((step) => (
              <div
                key={step.step}
                className="flex flex-col md:flex-row gap-6 md:gap-10 items-start p-8 rounded-3xl bg-[#fcddfc] border-[4px] border-black shadow-[8px_8px_0px_#000000]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#970797] text-white border-[3px] border-black flex items-center justify-center font-title text-3xl font-black shrink-0 shadow-[3px_3px_0px_#000000]">
                  0{step.step}
                </div>
                <div>
                  <h3 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-base sm:text-lg font-bold text-black leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CENÁRIOS DE USO */}
      <section className="relative w-full py-28 px-4 sm:px-6 bg-[#fcddfc] border-b-[8px] border-[#970797]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
                [ INDICAÇÃO PRÁTICA // OCASIÕES DE USO ]
              </span>
            </div>
            <h2 className="font-title text-4xl sm:text-6xl font-black uppercase text-black leading-none">
              Qual Escolher?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {catData.useCases.map((uc, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white border-[4px] border-black shadow-[8px_8px_0px_#000000] flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3 py-1 bg-[#59abf8] text-black font-mono text-xs font-black uppercase rounded-lg border-2 border-black mb-4">
                    OCASIÃO // 0{i + 1}
                  </div>
                  <h3 className="font-title text-2xl font-black uppercase text-black mb-3">
                    {uc.title}
                  </h3>
                  <p className="font-sans text-base font-bold text-black leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ ESPECÍFICO (COM SCHEMA JSON-LD) */}
      <section className="relative w-full py-28 px-4 sm:px-6 md:px-12 bg-white border-b-[8px] border-[#970797]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: catData.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            }),
          }}
        />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
                [ TIRE SUAS DÚVIDAS // FAQ DA CATEGORIA ]
              </span>
            </div>
            <h2 className="font-title text-4xl sm:text-6xl font-black uppercase text-black leading-none">
              Dúvidas Frequentes
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {catData.faqs.map((f, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#fcddfc] border-[4px] border-black shadow-[6px_6px_0px_#000000]"
              >
                <h3 className="font-title text-xl sm:text-2xl font-black uppercase text-black mb-3 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#970797] text-white border-2 border-black flex items-center justify-center font-mono text-sm font-black shrink-0">
                    Q
                  </span>
                  <span>{f.question}</span>
                </h3>
                <p className="font-sans text-base font-bold text-black leading-relaxed pl-11">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NAVEGAÇÃO DE OUTRAS CATEGORIAS */}
      <section className="relative w-full py-24 px-4 sm:px-6 bg-[#fcddfc]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-title text-3xl sm:text-5xl font-black uppercase text-black mb-10">
            Explorar Outras Categorias
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(CATEGORY_MAP)
              .filter(([k]) => k !== rawSlug && k !== categoryKey)
              .map(([key, item]) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  className="px-6 py-3.5 rounded-xl bg-white text-black font-mono text-sm font-black uppercase border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#970797] hover:text-white transition-all active:translate-y-0.5"
                >
                  {item.title} →
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}