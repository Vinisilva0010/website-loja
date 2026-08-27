import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

interface RouteContext {
  params: Promise<{ id: string }> | { id: string };
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await Promise.resolve(context.params);

  const product = getProductById(id);

  // Se o produto não existir ou não tiver link configurado, joga para a Home
  if (!product || !product.affiliateUrl) {
    return NextResponse.redirect(new URL("/", request.url), {
      status: 307,
      headers: {
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  // Redirecionamento 307 (Temporário) para o link de afiliado ou plataforma oficial
  return NextResponse.redirect(product.affiliateUrl, {
    status: 307,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}