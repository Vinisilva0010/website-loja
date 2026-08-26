import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 6);

  return (
    <section className="relative w-full bg-[#fcddfc] border-b-[8px] border-[#970797] py-24 md:py-32 px-4 sm:px-6 md:px-12 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
                [ CONTEÚDO EDITORIAL // GUIAS & COMPARATIVOS ]
              </span>
            </div>
            <h2
              className="font-title text-4xl sm:text-6xl md:text-7xl font-black uppercase text-black leading-none"
              style={{
                textShadow: "4px 4px 0px #59abf8",
              }}
            >
              Guias & Dicas
            </h2>
            <p className="font-sans text-base sm:text-lg font-black text-black uppercase tracking-wide mt-3 max-w-2xl">
              Análises detalhadas, comparações de medidas, combinações e critérios práticos para escolher produtos de beleza e acessórios sem erro.
            </p>
          </div>

          <Link
            href="/blog"
            aria-label="Acessar todos os artigos e guias de compra"
            className="inline-flex items-center justify-center border-[3px] border-black bg-[#970797] text-white px-8 py-4 rounded-xl font-mono text-sm sm:text-base font-black uppercase tracking-wider transition-all shadow-[4px_4px_0px_#000000] hover:bg-[#59abf8] hover:text-black active:translate-y-1"
          >
            Ver Todos os Guias →
          </Link>
        </div>

        {/* LISTAGEM / CARROSSEL DE ARTIGOS */}
        {posts.length === 0 ? (
          <div className="rounded-3xl border-[4px] border-black bg-white p-12 text-center shadow-[8px_8px_0px_#000000]">
            <p className="font-mono text-sm font-black text-black uppercase">
              [ NENHUM ARTIGO DISPONÍVEL NO MOMENTO ]
            </p>
          </div>
        ) : (
          <div
            className="flex overflow-x-auto gap-6 sm:gap-8 pb-8 pt-2 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {posts.map((post) => (
              <article
                key={post.slug}
                className="w-[85vw] sm:w-[380px] md:w-[400px] shrink-0 snap-start rounded-3xl border-[4px] border-black bg-white shadow-[8px_8px_0px_#000000] hover:shadow-[8px_8px_0px_#970797] transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Container da Imagem de Capa */}
                  {post.image ? (
                    <div className="relative w-full h-48 sm:h-56 bg-neutral-100 border-b-[4px] border-black overflow-hidden flex items-center justify-center">
                      <img
                        src={post.image}
                        alt={`Capa do artigo: ${post.title}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 font-mono text-xs font-black uppercase tracking-wider px-3 py-1 bg-[#970797] text-white border-[2px] border-black rounded shadow-[2px_2px_0px_#000000] z-10">
                        GUIA EDITORIAL
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-48 sm:h-56 bg-[#59abf8] border-b-[4px] border-black flex items-center justify-center p-6 text-center">
                      <span className="font-title text-2xl font-black uppercase text-black">
                        {post.title}
                      </span>
                    </div>
                  )}

                  {/* Informações & Resumo */}
                  <div className="p-6 sm:p-7">
                    <span className="font-mono text-xs text-[#970797] uppercase block mb-2 font-black tracking-wider">
                      PUBLICADO EM // {post.date}
                    </span>

                    <h3 className="font-title text-xl sm:text-2xl uppercase text-black mb-3 leading-tight font-black">
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>

                    <p className="font-sans text-sm font-bold text-black leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Rodapé do Card */}
                <div className="p-6 sm:p-7 pt-0">
                  <div className="font-mono text-sm font-black text-black uppercase flex items-center justify-between w-full border-t-[3px] border-black/15 pt-4">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center justify-between w-full text-black hover:text-[#970797] transition-colors"
                    >
                      <span>Ler Guia Completo</span>
                      <span className="text-xl font-black group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          ::-webkit-scrollbar { display: none; }
        `,
        }}
      />
    </section>
  );
}