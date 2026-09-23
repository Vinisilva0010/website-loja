import Link from "next/link";
import { Metadata } from "next";
import { getPostsByCategory, type PostData } from "@/lib/blog";
import Footer from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: { absolute: "Guias de Beleza, Skincare e Cabelo | SheryPink" },
  description:
    "Guias práticos pra escolher maquiagem, skincare, produtos de cabelo e cuidados de reposição, com dicas de quem usa e links pras lojas oficiais.",
  alternates: { canonical: "https://sherypink.com/blog" },
};

const SECTION_LINKS = [
  { label: "Guias de Beleza", href: "#beleza" },
  { label: "Para Quem Vende Online", href: "#vendas" },
];

function formatDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}/.test(iso)) return iso;
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}

function PostCard({ post, label }: { post: PostData; label: string }) {
  return (
    <article className="rounded-3xl border-4 border-black bg-white shadow-[8px_8px_0px_#000000] hover:shadow-[8px_8px_0px_#8e8ef7] transition-all flex flex-col justify-between overflow-hidden group">
      <div>
        <div className="relative w-full h-48 bg-white border-b-4 border-black overflow-hidden flex items-center justify-center">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-[#8e8ef7] flex items-center justify-center p-6 text-center">
              <span className="font-title text-xl font-black uppercase text-black">{post.title}</span>
            </div>
          )}
          <span className="absolute top-3 left-3 font-mono text-xs font-black uppercase tracking-widest px-2.5 py-1 bg-black text-white border border-black rounded z-10">
            {label}
          </span>
        </div>

        <div className="p-6 sm:p-7">
          <span className="font-mono text-xs text-black uppercase block mb-2 font-black tracking-wider">
            PUBLICADO // {formatDate(post.date)}
          </span>

          <h3 className="font-title text-xl font-black uppercase text-black mb-3 leading-tight group-hover:underline transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          <p className="font-mono text-sm font-bold text-black leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-7 pt-0">
        <div className="font-mono text-sm font-black text-black uppercase flex items-center justify-between w-full border-t-2 border-black/10 pt-4 group-hover:underline transition-colors">
          <Link href={`/blog/${post.slug}`} className="inline-flex items-center justify-between w-full font-bold">
            <span>Ler Artigo Completo</span>
            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogIndexPage() {
  const beautyPosts = getPostsByCategory("beleza");
  const sellerPosts = getPostsByCategory("vendas");

  const heroFeatured = beautyPosts[0] || null;
  const secondaryFeatured = beautyPosts.slice(1, 4);
  const moreBeautyPosts = beautyPosts.slice(4);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f3f1] text-black">
      {/* 1. DARK HEADER WITH SECTION LINKS */}
      <header className="w-full bg-[#18191a] text-[#f7f3f1] pt-32 pb-12 px-4 sm:px-6 md:px-12 border-b-4 border-black relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <span className="font-mono text-sm font-black uppercase tracking-widest text-white block mb-2">
              [ GUIAS DE BELEZA // CURADORIA ]
            </span>
            <h1
              className="font-title text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight"
              style={{
                textShadow: "4px 4px 0px #8e8ef7, 8px 8px 0px rgba(0,0,0,0.5)",
              }}
            >
              GUIAS // BELEZA
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-4 border-t-2 border-black/60 font-mono text-sm font-bold uppercase">
            {SECTION_LINKS.map((item, idx) => (
              <div key={item.href} className="flex items-center gap-3">
                
                  < a href={item.href}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    idx === 0
                      ? "bg-[#8e8ef7] text-black border-2 border-black font-black shadow-[2px_2px_0px_#000000]"
                      : "text-white hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
                {idx < SECTION_LINKS.length - 1 && (
                  <span className="text-[#3a3d42] font-normal select-none">/</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* 2. MAIN AREA */}
      <main className="flex-grow py-16 sm:py-20 px-4 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="max-w-3xl">
            <p className="font-mono text-sm sm:text-[16px] font-bold text-black leading-relaxed">
              Guias práticos pra acertar na escolha de maquiagem, skincare, cabelo e cuidados de
              reposição: o que olhar no anúncio, como ler o rótulo e o que quem usa achou. A compra
              é sempre feita na loja oficial da plataforma.
            </p>
          </div>

          {/* 3. FEATURED BEAUTY GUIDES */}
          <section id="beleza" className="space-y-10 scroll-mt-28">
            <div className="flex items-center justify-between border-b-4 border-black pb-4">
              <h2 className="font-title text-3xl sm:text-4xl font-black uppercase text-black">
                Guias de Beleza em Destaque
              </h2>
              <span className="font-mono text-sm font-black uppercase text-white bg-black px-3 py-1 border border-black rounded hidden sm:inline-block">
                ESCOLHA CERTA
              </span>
            </div>

            {heroFeatured ? (
              <div className="space-y-8">
                <article className="rounded-3xl border-4 border-black bg-white shadow-[10px_10px_0px_#000000] hover:shadow-[10px_10px_0px_#8e8ef7] transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
                  <div className="lg:col-span-6 bg-white border-b-4 lg:border-b-0 lg:border-r-4 border-black relative min-h-[260px] sm:min-h-[340px] flex items-center justify-center overflow-hidden">
                    {heroFeatured.image ? (
                      <img
                        src={heroFeatured.image}
                        alt={heroFeatured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#8e8ef7] flex items-center justify-center p-8 text-center">
                        <span className="font-title text-3xl font-black uppercase text-black">
                          {heroFeatured.title}
                        </span>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 font-mono text-xs font-black uppercase tracking-widest px-3 py-1 bg-black text-white border border-black rounded z-10">
                      DESTAQUE PRINCIPAL
                    </span>
                  </div>

                  <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-sm font-black uppercase text-white bg-black px-2.5 py-0.5 rounded inline-block mb-4">
                        GUIA DE BELEZA
                      </span>

                      <h3 className="font-title text-2xl sm:text-3xl md:text-4xl font-black uppercase text-black mb-4 leading-tight group-hover:underline transition-colors">
                        <Link href={`/blog/${heroFeatured.slug}`}>{heroFeatured.title}</Link>
                      </h3>

                      <p className="font-mono text-sm sm:text-[16px] font-bold text-black leading-relaxed mb-6">
                        {heroFeatured.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t-2 border-black/10 font-mono text-sm font-black text-black uppercase">
                      <span>{formatDate(heroFeatured.date)}</span>
                      <Link
                        href={`/blog/${heroFeatured.slug}`}
                        className="inline-flex items-center gap-2 hover:underline transition-colors font-bold"
                      >
                        <span>Ler Artigo Completo</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </article>

                {secondaryFeatured.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {secondaryFeatured.map((post) => (
                      <PostCard key={post.slug} post={post} label="GUIA DE BELEZA" />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-3xl border-4 border-black bg-white p-10 text-center shadow-[6px_6px_0px_#000000]">
                <p className="font-mono text-sm sm:text-[16px] font-bold text-black uppercase">
                  [ OS PRIMEIROS GUIAS DE BELEZA ESTÃO A CAMINHO ]
                </p>
              </div>
            )}
          </section>

          {/* 4. MORE BEAUTY GUIDES */}
          {moreBeautyPosts.length > 0 && (
            <section className="space-y-10 pt-8 border-t-4 border-black">
              <div className="flex items-center justify-between">
                <h2 className="font-title text-3xl sm:text-4xl font-black uppercase text-black">
                  Mais Guias de Beleza
                </h2>
                <span className="font-mono text-sm font-black text-black uppercase">
                  {beautyPosts.length} {beautyPosts.length === 1 ? "GUIA" : "GUIAS"} NO TOTAL
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {moreBeautyPosts.map((post) => (
                  <PostCard key={post.slug} post={post} label="GUIA DE BELEZA" />
                ))}
              </div>
            </section>
          )}

          {/* 5. SELLER GUIDES (legacy content kept in a separate section) */}
          {sellerPosts.length > 0 && (
            <section id="vendas" className="space-y-10 pt-8 border-t-4 border-black scroll-mt-28">
              <div className="flex items-center justify-between">
                <h2 className="font-title text-3xl sm:text-4xl font-black uppercase text-black">
                  Para Quem Vende Online
                </h2>
                <span className="font-mono text-sm font-black text-black uppercase">
                  {sellerPosts.length} {sellerPosts.length === 1 ? "ARTIGO" : "ARTIGOS"}
                </span>
              </div>
              <p className="max-w-3xl font-mono text-sm sm:text-[16px] font-bold text-black leading-relaxed">
                Guias de operação pra quem vende em marketplaces: margem, frete, tributação, anúncios
                e logística.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sellerPosts.map((post) => (
                  <PostCard key={post.slug} post={post} label="VENDAS ONLINE" />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}