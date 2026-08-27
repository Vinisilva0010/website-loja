// app/page.tsx
import MarketingIntro from "@/app/components/sections/MarketingIntro";
import HeroSection from "@/app/components/sections/HeroSection";

import FaqSection from "./components/sections/FaqSection";
import BlogPreview from "./components/sections/BlogPreview";
import Footer from "./components/sections/Footer";
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-base">
      <MarketingIntro />
      <HeroSection />
      
      <FaqSection />
      <BlogPreview />
     <Footer />
    </main>
  );
}