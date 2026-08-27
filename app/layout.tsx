import Script from "next/script";
import Header from "./components/sections/Header";
import type { Metadata } from "next";
import { Inter, Fira_Code, Anton } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["400", "500", "700"],
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zanvendas.zanvexis.com/"),
  title: {
    default: "(nomeloja) | Curadoria & Guias de Produtos Femininos",
    template: "%s | (nomeloja)",
  },
  description:
    "Curadoria independente e comparação de maquiagem, beleza, bolsas e acessórios femininos. Encontre detalhes, prós, contras e ofertas diretamente nas plataformas oficiais.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "(nomeloja) | Curadoria & Guias de Produtos Femininos",
    description:
      "Curadoria independente e comparação de maquiagem, beleza, bolsas e acessórios femininos. Encontre detalhes, prós, contras e ofertas diretamente nas plataformas oficiais.",
    url: "https://zanvendas.zanvexis.com/",
    siteName: "(nomeloja)",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "(nomeloja) | Curadoria & Guias de Produtos Femininos",
    description:
      "Curadoria independente e comparação de maquiagem, beleza, bolsas e acessórios femininos. Encontre detalhes, prós, contras e ofertas diretamente nas plataformas oficiais.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${firaCode.variable} ${anton.variable}`}
    >
      <body className="min-h-screen bg-[#fcddfc] font-body text-[#2B1B17] antialiased selection:bg-[#970797] selection:text-white">
        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MMEVPGHPK3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MMEVPGHPK3');
          `}
        </Script>

        <Header />
        {children}

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1429963021988092"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}