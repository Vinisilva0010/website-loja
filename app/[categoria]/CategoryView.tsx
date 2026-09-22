"use client";


import Link from "next/link";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Footer from "@/app/components/sections/Footer";
import { getByCategory, getAllProducts, type Product } from "@/lib/products";
import { CATEGORY_MAP } from "@/lib/categories";
import {
  Sliders,
  ExternalLink,
} from "lucide-react";

























export default function CategoryView({ slug }: { slug: string }) {
  const catData = CATEGORY_MAP[slug];





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
             .filter(([k]) => k !== slug)
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