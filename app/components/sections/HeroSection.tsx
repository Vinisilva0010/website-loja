"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { getByCategory, type Product } from "@/lib/products";

const CATEGORIES: { key: Product["category"]; label: string; description: string }[] = [
  { key: "batom", label: "Batons & Lábios", description: "Cores e texturas para reposição diária sem complicação." },
  { key: "base", label: "Bases & Rosto", description: "Base, corretivo e pó essenciais para a sua rotina." },
  { key: "chapinha", label: "Cabelo & Ferramentas", description: "Pranchas e modeladores para manter o styling alinhado." },
  { key: "lingerie", label: "Lingerie & Conforto", description: "Peças práticas e estruturadas para o dia a dia." },
  { key: "skincare", label: "Skincare", description: "Hidratantes, protetor solar e séruns de reposição regular." },
];

const QUICK_SUGGESTIONS = [
  "Batom Matte",
  "Base Líquida",
  "Chapinha Titanium",
  "Lingerie Conforto",
  "Protetor Solar",
  "Sérum Vitamina C",
  "Mercado Livre",
  "SHEIN",
  "TikTok Shop",
];

const BENEFITS = [
  "CURADORIA INDEPENDENTE — SELEÇÃO MANUAL DE PRODUTOS",
  "COMPRA FINALIZADA DIRETO NA PLATAFORMA OFICIAL",
  "ACHADOS E ITENS DE REPOSIÇÃO ATUALIZADOS",
  "COMPARAÇÃO DE ESPECIFICAÇÕES, MEDIDAS E CUIDADOS",
];

function platformLabel(platform: Product["platform"]) {
  if (platform === "tiktok-shop") return "TikTok Shop";
  if (platform === "shein") return "SHEIN";
  return "Mercado Livre";
}

function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % BENEFITS.length), 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full py-3" style={{ backgroundColor: "var(--color-support)" }}>
      <p
        className="text-center font-title text-sm sm:text-base font-black uppercase tracking-wider px-4"
        style={{ color: "var(--color-base)" }}
      >
        {BENEFITS[index]}
      </p>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.price / product.originalPrice!) * 100)
    : 0;

  return (
    <a
      href={`/go/${product.id}`}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      aria-label={`Ver oferta de ${product.name} na ${platformLabel(product.platform)}`}
      className="group flex flex-col gap-2 sm:gap-4 w-full h-full justify-between select-none p-2 sm:p-3 rounded-2xl border-[3px] sm:border-[4px]"
      style={{
        backgroundColor: "var(--color-base)",
        borderColor: "var(--color-identity)",
        boxShadow: `0 4px 16px var(--color-identity)33`,
      }}
    >
      {/* IMAGEM + TAGS DE MARKETING */}
      <div
        className="relative w-full aspect-square rounded-xl overflow-hidden border-[2px] sm:border-[4px] group-hover:-translate-y-0.5 transition-transform duration-200"
        style={{
          borderColor: "var(--color-identity)",
          backgroundColor: "var(--color-base)",
        }}
      >
        <Image
          src={product.image}
          alt={`${product.name} — ${product.description}`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
        />

        {/* SELO FIXO DE OFERTA RELÂMPAGO */}
        <span
          className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded font-mono text-[9px] sm:text-xs font-black uppercase tracking-wider shadow-md"
          style={{
            backgroundColor: "#ffe600",
            color: "#000000",
            border: "1.5px solid #000000",
          }}
        >
          ⚡ RELÂMPAGO
        </span>

        {/* SELO DE PORCENTAGEM DE DESCONTO */}
        {hasDiscount && (
          <span
            className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded font-mono text-[9px] sm:text-xs font-black"
            style={{
              backgroundColor: "var(--color-support)",
              color: "var(--color-base)",
            }}
          >
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* DETALHES DO PRODUTO */}
      <div className="flex flex-col gap-1.5 flex-grow justify-between">
        <div className="flex flex-col gap-0.5">
          <span
            className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider"
            style={{ color: "var(--color-support)" }}
          >
            {platformLabel(product.platform)}
          </span>

          <h3
            className="font-title text-sm sm:text-xl font-black uppercase leading-snug line-clamp-2"
            style={{ color: "var(--color-text)" }}
          >
            {product.name}
          </h3>

          <p
            className="font-sans text-xs sm:text-sm font-bold leading-tight line-clamp-1 opacity-80"
            style={{ color: "var(--color-text)" }}
          >
            {product.description}
          </p>
        </div>

        {/* PREÇO E BOTÃO COMPACTO */}
        <div className="pt-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
            {hasDiscount && (
              <span
                className="font-sans text-[11px] sm:text-sm font-bold line-through opacity-50"
                style={{ color: "var(--color-text)" }}
              >
                R$ {product.originalPrice!.toFixed(2)}
              </span>
            )}
            <span
              className="font-title text-base sm:text-2xl font-black leading-none"
              style={{ color: "var(--color-support)" }}
            >
              R$ {product.price.toFixed(2)}
            </span>
          </div>

          <span
            className="mt-2 inline-block w-full text-center font-title text-xs sm:text-sm font-black uppercase tracking-wide rounded-lg py-2 sm:py-2.5 group-hover:brightness-110 transition-all border-[2px]"
            style={{
              backgroundColor: "var(--color-support)",
              color: "var(--color-base)",
              borderColor: "var(--color-support)",
            }}
          >
            VER OFERTA [›]
          </span>
        </div>
      </div>
    </a>
  );
}

function ThreeCardSlider({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(2);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = products.length;

  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(2); // 2 cards lado a lado no celular
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(4);
      }
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  useEffect(() => {
    if (total <= cardsPerView || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.max(0, total - cardsPerView);
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [total, isPaused, cardsPerView]);

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, total - cardsPerView);
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, total - cardsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full overflow-hidden px-2 sm:px-12 py-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* BOTÕES DE NAVEGAÇÃO */}
      <button
        onClick={handlePrev}
        className="absolute left-0 sm:left-4 top-[45%] -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-[2px] sm:border-[3px] flex items-center justify-center font-mono text-lg sm:text-2xl font-black shadow-lg transition-transform active:scale-90"
        style={{
          backgroundColor: "var(--color-support)",
          color: "var(--color-base)",
          borderColor: "var(--color-base)",
        }}
        aria-label="Anterior"
      >
        ‹
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 sm:right-4 top-[45%] -translate-y-1/2 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full border-[2px] sm:border-[3px] flex items-center justify-center font-mono text-lg sm:text-2xl font-black shadow-lg transition-transform active:scale-90"
        style={{
          backgroundColor: "var(--color-support)",
          color: "var(--color-base)",
          borderColor: "var(--color-base)",
        }}
        aria-label="Próximo"
      >
        ›
      </button>

      {/* TRACK COM 2 COLUNAS NO MOBILE */}
      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out gap-2.5 sm:gap-6"
          style={{
            transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[calc(50%-5px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 flex-grow-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




      

function CategorySection({
  category,
  label,
  description,
  searchTerm,
}: {
  category: Product["category"];
  label: string;
  description: string;
  searchTerm: string;
}) {
  const items = getByCategory(category);

  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.platform.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  if (filteredItems.length === 0) return null;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full px-4 sm:px-12 flex flex-col gap-1 border-b-[3px] pb-3" style={{ borderColor: "var(--color-support)" }}>
        <h2
          className="font-title text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none"
          style={{ color: "var(--color-text)" }}
        >
          {label}
        </h2>
        <p className="font-sans text-base sm:text-xl font-bold" style={{ color: "var(--color-text)" }}>
          {description}
        </p>
      </div>

      <ThreeCardSlider products={filteredItems} />
    </div>
  );
}

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundColor: "var(--color-base)", color: "var(--color-text)" }}>
      <div className="pt-24">
        <AnnouncementBar />

        {/* VÍDEO HERO */}
        <div
          className="relative w-full h-[55vh] min-h-[420px] overflow-hidden border-b-[6px]"
          style={{ borderColor: "var(--color-support)" }}
        >
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/hero-loop1.mp4"
            
            autoPlay
            muted
            loop
            playsInline
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, var(--color-support)F2 0%, var(--color-support)70 40%, transparent 80%)`,
            }}
          />

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12 w-full flex flex-col gap-3">
            <h1
              className="font-title text-[clamp(2.5rem,8vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight"
              style={{ color: "var(--color-base)" }}
            >
              (nomeloja)
            </h1>

            <p
              className="font-sans text-lg sm:text-2xl font-black max-w-3xl leading-snug"
              style={{ color: "var(--color-base)" }}
            >
              Maquiagem, beleza, lingeries e achados selecionados. Compare detalhes e acesse a oferta diretamente na plataforma oficial.
            </p>
          </div>
        </div>
      </div>



      {/* CARROSSEL INFINITO - TIRA DE IMAGENS */}
<div className="w-full overflow-hidden mb-8">
  <div className="flex animate-carousel gap-4">
    {/* Primeira sequência de imagens */}
    {[1, 2, 3, 4, 5].map((i) => (
      <div 
        key={i} 
        className="w-64 h-32 sm:w-80 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
      >
        <img 
          src={`/images/banner${i}.jpg`} 
          alt={`Banner ${i}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
    {/* Segunda sequência (para efeito infinito) */}
    {[1, 2, 3, 4, 5].map((i) => (
      <div 
        key={`dup-${i}`} 
        className="w-64 h-32 sm:w-80 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden"
        style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
      >
        <img 
          src={`/images/banner${i}.jpg`} 
          alt={`Banner ${i}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>

     {/* BARRA DE PESQUISA COM SUGESTÕES */}
<div className="w-full px-4 sm:px-12 pt-10 flex flex-col gap-6">
  {/* INPUT DE BUSCA */}
  <div className="relative w-full">
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar produto, marca, batom, base, plataforma..."
      className="w-full font-sans text-base sm:text-xl font-black py-5 px-6 rounded-2xl outline-none transition-all"
      style={{
        backgroundColor: "var(--color-base)",
        color: "var(--color-text)",
        border: "3px solid var(--color-support)",
        boxShadow: "0 8px 24px rgba(252, 98, 252, 0.3)",
      }}
    />
    {searchTerm && (
      <button
        onClick={() => setSearchTerm("")}
        className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-2xl font-black px-3 py-1 rounded-full transition-transform hover:scale-110"
        style={{ 
          color: "var(--color-support)",
          backgroundColor: "var(--color-base)",
        }}
        aria-label="Limpar busca"
      >
        ✕
      </button>
    )}
  </div>

  {/* SUGESTÕES RÁPIDAS */}
  <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
    <span 
      className="font-mono text-sm sm:text-base font-black uppercase shrink-0" 
      style={{ color: "var(--color-text)" }}
    >
      Sugestões:
    </span>
    {QUICK_SUGGESTIONS.map((tag) => {
      const isActive = searchTerm.toLowerCase() === tag.toLowerCase();
      return (
        <button
          key={tag}
          onClick={() => setSearchTerm(isActive ? "" : tag)}
          className="px-5 py-2.5 rounded-full font-mono text-sm sm:text-base font-black uppercase transition-all shrink-0"
          style={{
            backgroundColor: isActive ? "var(--color-support)" : "var(--color-base)",
            color: isActive ? "var(--color-base)" : "var(--color-text)",
            border: isActive ? "none" : "3px solid var(--color-support)",
            boxShadow: isActive 
              ? "0 8px 20px rgba(252, 98, 252, 0.5)" 
              : "0 4px 12px rgba(252, 98, 252, 0.2)",
          }}
        >
          {tag}
        </button>
      );
    })}
  </div>
</div>

{/* LISTAGEM DE CATEGORIAS */}
<div className="w-full py-12 flex flex-col gap-14">
  {CATEGORIES.map((cat) => (
    <CategorySection
      key={cat.key}
      category={cat.key}
      label={cat.label}
      description={cat.description}
      searchTerm={searchTerm}
    />
  ))}
</div>
    </section>
  );
}