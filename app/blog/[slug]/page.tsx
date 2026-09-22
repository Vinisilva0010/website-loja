import { getAllPosts, extractFaqFromContent, type PostData } from "@/lib/blog";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Metadata } from "next";
import Footer from "@/app/components/sections/Footer";
import PostProduct from "@/app/components/blog/PostProduct";

const SITE_URL = "https://sherypink.com";
const SITE_NAME = "SheryPink";

type RouteParams = { slug: string };
type PageProps = { params: Promise<RouteParams> | RouteParams };

// Components available inside .mdx posts, e.g. <Produto id="product-id" />
const mdxComponents = { Produto: PostProduct };

function formatDate(iso?: string) {
  if (!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return iso ?? "";
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}

// Returns undefined for empty or invalid dates instead of crashing the build
function toIsoDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

// Escapes "<" so post text can never close the JSON-LD script tag
function toJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function findPost(slug: string): PostData | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);

  if (!post) {
    return { title: { absolute: `Artigo não encontrado | ${SITE_NAME}` } };
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const images = post.image ? [`${SITE_URL}${post.image}`] : [];

  return {
    title: { absolute: `${post.title} | ${SITE_NAME}` },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const allPosts = getAllPosts();
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const isBeauty = post.category === "beleza";

  // Related posts stay within the same category so beauty readers never land on seller guides
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    image: post.image ? [`${SITE_URL}${post.image}`] : [],
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.updated || post.date),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/sobre`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    description: post.description,
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  const faqItems = extractFaqFromContent(post.content);

  const faqJsonLd =
    faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f3f1] text-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }} />

      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(faqJsonLd) }} />
      )}

      <main className="relative z-20 flex-grow px-4 pb-24 pt-32 sm:px-6 md:px-12">
        <article className="mx-auto max-w-4xl">
          {/* NAVIGATION & BREADCRUMBS */}
          <div className="mb-12">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs uppercase font-bold text-[#56585a]"
            >
              <Link href="/" className="hover:text-black transition-colors">
                Início
              </Link>
              <span className="text-[#8e8ef7] font-black">/</span>
              <Link href="/blog" className="hover:text-black transition-colors">
                Guias
              </Link>
              <span className="text-[#8e8ef7] font-black">/</span>
              <span className="max-w-[280px] truncate text-black font-black">{post.title}</span>
            </nav>

            <Link
              href={isBeauty ? "/blog" : "/blog#vendas"}
              className="group inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 rounded-xl font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000000] hover:bg-[#8e8ef7] transition-all active:translate-y-0.5"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              Voltar aos Guias
            </Link>
          </div>

          {/* ARTICLE HEADER */}
          <header className="mb-12 border-b-4 border-black pb-12">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="border-2 border-black bg-[#8e8ef7] px-3 py-1 font-mono text-xs font-black uppercase text-black rounded shadow-[2px_2px_0px_#000000]">
                {isBeauty ? "GUIA DE BELEZA" : "GUIA PRÁTICO"}
              </span>

              <span className="font-mono text-xs font-bold uppercase text-[#56585a]">
                PUBLICADO EM: {formatDate(post.date)}
              </span>

              {post.updated && (
                <span className="font-mono text-xs font-bold uppercase text-[#56585a]">
                  • ATUALIZADO EM: {formatDate(post.updated)}
                </span>
              )}
            </div>

            <h1
              className="mb-6 font-title text-4xl font-black uppercase leading-tight text-black sm:text-5xl md:text-6xl"
              style={{
                WebkitTextStroke: "2px #000000",
                textShadow: "4px 4px 0px #8e8ef7, 8px 8px 0px rgba(0,0,0,0.15)",
              }}
            >
              {post.title}
            </h1>

            <p className="max-w-3xl font-mono text-sm sm:text-base font-bold leading-relaxed text-[#56585a]">
              {post.description}
            </p>
          </header>

          {/* AFFILIATE DISCLOSURE (beauty guides contain affiliate links) */}
          {isBeauty && (
            <p className="mb-12 rounded-2xl border-2 border-black bg-white p-4 font-mono text-xs font-bold leading-relaxed text-[#454749] shadow-[3px_3px_0px_#000000]">
              Este guia tem links de afiliado: se você comprar por eles, podemos receber uma comissão da
              plataforma, sem custo extra pra você. A compra, o pagamento e a entrega são feitos na loja oficial.
            </p>
          )}

          {/* COVER IMAGE */}
          {post.image && (
            <div className="mb-16 aspect-video w-full overflow-hidden rounded-3xl border-4 border-black bg-white shadow-[10px_10px_0px_#000000]">
              <img src={post.image} alt={`Imagem de capa: ${post.title}`} className="h-full w-full object-cover" />
            </div>
          )}

          {/* BODY (MDX) */}
          <div
            className="
              font-mono text-black
              [&>p]:mb-6 [&>p]:text-sm [&>p]:sm:text-base [&>p]:font-bold [&>p]:leading-relaxed [&>p]:text-[#454749]
              [&>h2]:mb-6 [&>h2]:mt-16 [&>h2]:font-title [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-black [&>h2]:uppercase [&>h2]:text-black [&>h2]:border-b-2 [&>h2]:border-black [&>h2]:pb-2
              [&>h3]:mb-4 [&>h3]:mt-10 [&>h3]:font-title [&>h3]:text-xl [&>h3]:font-black [&>h3]:uppercase [&>h3]:text-black
              [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>ul>li]:text-sm [&>ul>li]:sm:text-base [&>ul>li]:font-bold [&>ul>li]:text-[#454749]
              [&>ol]:mb-6 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2 [&>ol>li]:text-sm [&>ol>li]:sm:text-base [&>ol>li]:font-bold [&>ol>li]:text-[#454749]
              [&>strong]:font-black [&>strong]:text-black
              [&>blockquote]:my-8 [&>blockquote]:rounded-2xl [&>blockquote]:border-4 [&>blockquote]:border-black [&>blockquote]:bg-white [&>blockquote]:p-6 [&>blockquote]:shadow-[6px_6px_0px_#8e8ef7]
              [&>blockquote>p]:mb-0 [&>blockquote>p]:font-black [&>blockquote>p]:text-black
              [&>pre]:my-8 [&>pre]:overflow-x-auto [&>pre]:rounded-2xl [&>pre]:border-4 [&>pre]:border-black [&>pre]:bg-[#18191a] [&>pre]:p-6 [&>pre]:shadow-[6px_6px_0px_#000000]
              [&>pre>code]:font-mono [&>pre>code]:text-xs [&>pre>code]:sm:text-sm [&>pre>code]:text-[#f7f3f1]
              [&>code]:rounded [&>code]:border [&>code]:border-black [&>code]:bg-[#8e8ef7]/20 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:font-mono [&>code]:text-xs [&>code]:font-black [&>code]:text-black
            "
          >
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          {/* CALL TO ACTION (depends on the post category) */}
          <section className="mt-16 rounded-3xl border-4 border-black bg-white p-8 sm:p-12 shadow-[10px_10px_0px_#8e8ef7]">
            <div className="mb-4 inline-block border-2 border-black bg-black px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-[#8e8ef7] rounded">
              {isBeauty ? "[ CURADORIA SHERYPINK ]" : "[ PARA QUEM VENDE ONLINE ]"}
            </div>

            <h2 className="mb-4 font-title text-3xl font-black uppercase leading-tight text-black sm:text-4xl">
              {isBeauty ? "Quer ir direto nos mais bem avaliados?" : "Mais guias pra sua operação de vendas"}
            </h2>

            <p className="mb-8 max-w-2xl font-mono text-xs sm:text-sm font-bold leading-relaxed text-[#454749]">
              {isBeauty
                ? "Veja a seleção de maquiagem, skincare, cabelo e cuidados com nota alta, com o link direto pra loja oficial."
                : "Margem, frete, tributação, anúncios e logística pra quem vende em marketplaces."}
            </p>

            <Link
              href={isBeauty ? "/mais-bem-avaliados" : "/blog#vendas"}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-black bg-[#8e8ef7] px-6 py-4 font-mono text-xs sm:text-sm font-black uppercase text-black shadow-[4px_4px_0px_#000000] transition-all hover:bg-black hover:text-[#f7f3f1] hover:shadow-none active:translate-y-1"
            >
              <span>{isBeauty ? "Ver Mais Bem Avaliados" : "Ver Guias de Vendas"}</span>
              <span>→</span>
            </Link>
          </section>

          {/* RELATED POSTS (same category only) */}
          {relatedPosts.length > 0 && (
            <section className="relative mt-20 border-t-4 border-black pt-12">
              <div className="mb-8 flex items-end justify-between gap-6">
                <div>
                  <span className="font-mono text-xs font-black uppercase tracking-widest text-[#8e8ef7] bg-black px-2.5 py-0.5 rounded inline-block mb-2">
                    CONTINUE LENDO
                  </span>
                  <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black">Artigos Relacionados</h2>
                </div>

                <span className="hidden font-mono text-xs font-black uppercase text-[#56585a] md:block">
                  [ 0{relatedPosts.length} {relatedPosts.length === 1 ? "SUGESTÃO" : "SUGESTÕES"} ]
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost, index) => (
                  <article
                    key={relatedPost.slug}
                    className="group rounded-3xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000000] hover:shadow-[6px_6px_0px_#8e8ef7] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between font-mono text-xs font-black text-[#56585a]">
                        <span className="text-[#8e8ef7] bg-black px-2 py-0.5 rounded text-[10px]">0{index + 1}</span>
                        <span>{formatDate(relatedPost.date)}</span>
                      </div>

                      <h3 className="font-title text-lg font-black uppercase leading-snug text-black group-hover:text-[#8e8ef7] transition-colors mb-3">
                        <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </h3>

                      <p className="line-clamp-3 font-mono text-xs font-bold leading-relaxed text-[#56585a]">
                        {relatedPost.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t-2 border-black/10 pt-4 font-mono text-xs font-black uppercase text-black">
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center justify-between w-full group-hover:text-[#8e8ef7] transition-colors"
                      >
                        <span>Ler Artigo</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
}