"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const categoriasLinks = [
    { name: "MAQUIAGEM & BELEZA", href: "/maquiagem" },
    { name: "BOLSAS FEMININAS", href: "/acessorios/bolsas-femininas" },
    { name: "BRINCOS & COLARES", href: "/acessorios/brincos-colares" },
    { name: "SKINCARE & CUIDADOS", href: "/skincare" },
    { name: "CABELO & UNHAS", href: "/cabelo-unhas" },
    { name: "PRESENTES FEMININOS", href: "/presentes" },
  ];

  const curadoriaLinks = [
    { name: "ACHADOS ATÉ R$ 50", href: "/achados-ate-50" },
    { name: "MAIS BEM AVALIADOS", href: "/mais-bem-avaliados" },
    { name: "COMPARATIVOS & GUIAS", href: "/blog" },
    { name: "COMO SELECIONAMOS", href: "/sobre" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-base border-b-[4px] border-[#970797] z-[100] h-24 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-12 flex justify-between items-center">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <span
              className="font-title text-4xl md:text-5xl uppercase font-black text-[#970797] leading-none tracking-tight"
              style={{ textShadow: "3px 3px 0px #000000" }}
            >
              (nomeloja)
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              href="/"
              className={`font-mono text-lg font-black uppercase tracking-wider text-[#970797] ${
                pathname === "/" ? "underline underline-offset-8 decoration-[4px]" : ""
              }`}
            >
              INÍCIO
            </Link>

            {/* DROPDOWN CATEGORIAS */}
            <div className="relative group py-6">
              <button className="flex items-center gap-2 font-mono text-lg font-black uppercase tracking-wider text-[#970797]">
                CATEGORIAS
                <span className="text-sm font-black transition-transform duration-200 group-hover:rotate-180">▼</span>
              </button>

              <div className="absolute top-full left-0 w-80 bg-base border-[4px] border-[#970797] shadow-[6px_6px_0px_#970797] p-4 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                {categoriasLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{ color: "#970797" }}
                    className="font-mono text-base font-black p-2.5 border-b-2 border-[#970797]/30 last:border-none uppercase block hover:bg-[#970797] hover:!text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* DROPDOWN CURADORIA */}
            <div className="relative group py-6">
              <button className="flex items-center gap-2 font-mono text-lg font-black uppercase tracking-wider text-[#970797]">
                CURADORIA
                <span className="text-sm font-black transition-transform duration-200 group-hover:rotate-180">▼</span>
              </button>

              <div className="absolute top-full left-0 w-80 bg-base border-[4px] border-[#970797] shadow-[6px_6px_0px_#970797] p-4 flex flex-col gap-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                {curadoriaLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{ color: "#970797" }}
                    className="font-mono text-base font-black p-2.5 border-b-2 border-[#970797]/30 last:border-none uppercase block hover:bg-[#970797] hover:!text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/blog"
              className={`font-mono text-lg font-black uppercase tracking-wider text-[#970797] ${
                pathname === "/blog" ? "underline underline-offset-8 decoration-[4px]" : ""
              }`}
            >
              GUIAS & BLOG
            </Link>

            {/* CTA BUTTON */}
            <Link
              href="/blog"
              className="border-[4px] border-[#970797] bg-shock text-[#970797] px-6 py-3 font-mono text-base font-black uppercase shadow-[4px_4px_0px_#970797] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all"
            >
              VER ACHADOS [›]
            </Link>

            {/* BOTÃO 3 BARRAS */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="border-[4px] border-[#970797] p-2.5 bg-identity text-[#970797] shadow-[4px_4px_0px_#970797]"
              aria-label="Abrir Menu Completo"
            >
              <div className="w-7 h-1.5 bg-[#970797] mb-1"></div>
              <div className="w-7 h-1.5 bg-[#970797] mb-1"></div>
              <div className="w-7 h-1.5 bg-[#970797]"></div>
            </button>
          </div>

          {/* MOBILE 3 BARRAS */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden border-[4px] border-[#970797] p-3 bg-shock text-[#970797] shadow-[4px_4px_0px_#970797]"
            aria-label="Abrir Menu"
          >
            <div className="w-8 h-1.5 bg-[#970797] mb-1.5"></div>
            <div className="w-8 h-1.5 bg-[#970797] mb-1.5"></div>
            <div className="w-6 h-1.5 bg-[#970797]"></div>
          </button>
        </div>
      </nav>

      {/* MENU CORTINA EM TELA CHEIA */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-base z-[150] overflow-y-auto border-b-[8px] border-[#970797] p-6 md:p-12 flex flex-col justify-between">
          <div className="max-w-7xl mx-auto w-full flex justify-between items-center border-b-[6px] border-[#970797] pb-8 mb-10">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <span
                className="font-title text-4xl md:text-6xl uppercase font-black text-[#970797]"
                style={{ textShadow: "4px 4px 0px #000000" }}
              >
                (nomeloja)
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <Link
                href="/contato"
                onClick={() => setIsMenuOpen(false)}
                className="hidden sm:inline-block border-[4px] border-[#970797] bg-shock text-[#970797] px-8 py-3.5 font-mono text-base font-black uppercase shadow-[4px_4px_0px_#970797]"
              >
                CONTATO
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-14 h-14 border-[4px] border-[#970797] rounded-full bg-base text-[#970797] flex items-center justify-center shadow-[4px_4px_0px_#970797]"
                aria-label="Fechar Menu"
              >
                <span className="font-mono text-3xl font-black">✕</span>
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-14 flex-grow py-6">
            {/* COLUNA 1 */}
            <div className="flex flex-col gap-6">
              <h3 className="font-title text-3xl uppercase font-black text-[#970797] border-b-[4px] border-[#970797] pb-3">
                PRODUTOS
              </h3>
              <ul className="flex flex-col gap-4 font-mono text-lg font-black">
                {categoriasLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[#970797] block py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUNA 2 */}
            <div className="flex flex-col gap-6">
              <h3 className="font-title text-3xl uppercase font-black text-[#970797] border-b-[4px] border-[#970797] pb-3">
                CURADORIA
              </h3>
              <ul className="flex flex-col gap-4 font-mono text-lg font-black">
                {curadoriaLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[#970797] block py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUNA 3 */}
            <div className="flex flex-col gap-6">
              <h3 className="font-title text-3xl uppercase font-black text-[#970797] border-b-[4px] border-[#970797] pb-3">
                INSTITUCIONAL
              </h3>
              <ul className="flex flex-col gap-4 font-mono text-lg font-black">
                <li>
                  <Link
                    href="/blog"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#970797] block py-1"
                  >
                    BLOG & COMPARATIVOS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sobre"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#970797] block py-1"
                  >
                    SOBRE A (nomeloja)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#970797] block py-1"
                  >
                    CONTATO & DÚVIDAS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/politica-de-privacidade"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#970797] block py-1"
                  >
                    POLÍTICA DE PRIVACIDADE
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termos-de-uso"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#970797] block py-1"
                  >
                    TERMOS DE USO & AFILIADOS
                  </Link>
                </li>
              </ul>
            </div>

            {/* COLUNA 4 */}
            <div className="flex flex-col gap-8 font-mono">
              <div className="flex flex-col gap-2">
                <span className="font-black text-[#970797] text-xl uppercase">[ AVISO DE AFILIADO ]</span>
                <p className="text-[#970797] text-sm font-black leading-relaxed">
                  Curadoria independente. A compra e o pagamento são concluídos nas plataformas oficiais (SHEIN, Mercado Livre, TikTok Shop).
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-black text-[#970797] text-xl uppercase">[ CONTATO ]</span>
                <Link
                  href="mailto:contato@exemplo.com"
                  className="text-[#970797] text-lg font-black underline underline-offset-4"
                >
                  contato@exemplo.com
                </Link>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full pt-8 border-t-[4px] border-[#970797] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-sm font-black text-[#970797]">
            <span>© 2026 (nomeloja) // CURADORIA INDEPENDENTE</span>
            <span>PRODUTOS FEMININOS // MARKETPLACES OFICIAIS</span>
          </div>
        </div>
      )}
    </>
  );
}