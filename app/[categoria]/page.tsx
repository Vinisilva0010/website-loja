import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { CATEGORY_MAP, resolveCategorySlug } from "@/lib/categories";
import CategoryView from "./CategoryView";

const SITE_URL = "https://sherypink.com";
const SITE_NAME = "SheryPink";

type RouteParams = { categoria: string };
type PageProps = { params: Promise<RouteParams> | RouteParams };

// Pre-render every canonical category at build time
export function generateStaticParams(): RouteParams[] {
  return Object.keys(CATEGORY_MAP).map((categoria) => ({ categoria }));
}

function toSentenceCase(text: string) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { categoria } = await params;
  const slug = resolveCategorySlug(categoria);
  if (!slug) return {};

  const category = CATEGORY_MAP[slug];
  const url = `${SITE_URL}/${slug}`;
  const title = `${category.title}: ${toSentenceCase(category.subtitle)} | ${SITE_NAME}`;

  return {
    title: { absolute: title },
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: category.description,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { categoria } = await params;
  const rawSlug = categoria.toLowerCase();
  const slug = resolveCategorySlug(rawSlug);

  if (!slug) notFound();

  // Legacy and synonym slugs get a permanent redirect so search engines index only the canonical URL
  if (slug !== rawSlug) permanentRedirect(`/${slug}`);

  return <CategoryView slug={slug} />;
}