"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const titleGreenStyle = {
  fontFamily: "var(--font-bebas)",
  WebkitTextStroke: "clamp(2px, 0.5vw, 6px) #2B1B17",
  textShadow: "clamp(5px, 1vw, 12px) clamp(5px, 1vw, 12px) 0px #fc62fc",
} as React.CSSProperties;

const titleWhiteStyle = {
  fontFamily: "var(--font-bebas)",
  WebkitTextStroke: "clamp(1.5px, 0.4vw, 5px) #2B1B17",
  textShadow: "clamp(4px, 0.8vw, 10px) clamp(4px, 0.8vw, 10px) 0px #000",
} as React.CSSProperties;

const FRENZY_LETTERS = ["B", "E", "A", "U", "T", "Y"];
const PROTOCOL_LETTERS = ["S", "H", "O", "P"];

function TunnelLetter({ char, delay, color, style }: { char: string; delay: number; color: string; style: React.CSSProperties; }) {
  return (
    <motion.span
      className="inline-block"
      style={{ color, ...style }}
      animate={{
        scale: [0.3, 1.08, 1],
        opacity: [0, 1, 1],
        filter: ["blur(12px) brightness(3)", "blur(2px) brightness(1.5)", "blur(0px) brightness(1)"],
      }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: FRENZY_LETTERS.length * 0.08 + 2.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {char}
    </motion.span>
  );
}

export default function MarketingIntro() {
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.95) {
        setIsVisible(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const text1Opacity = useTransform(smoothScroll, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const text1Y = useTransform(smoothScroll, [0, 0.25], [50, -50]);

  const text2Opacity = useTransform(smoothScroll, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
  const text2Y = useTransform(smoothScroll, [0.25, 0.5], [50, -50]);

  const text3Opacity = useTransform(smoothScroll, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const text3Y = useTransform(smoothScroll, [0.5, 0.75], [50, -50]);

  const heroOpacity = useTransform(smoothScroll, [0.75, 0.85], [0, 1]);
  const heroScale = useTransform(smoothScroll, [0.75, 0.85], [0.8, 1]);
  const heroBlur = useTransform(smoothScroll, [0.75, 0.85], ["blur(10px)", "blur(0px)"]);

  const gridTranslateY = useTransform(smoothScroll, [0, 1], ["0%", "50%"]);

  // Animação do "role para baixo"
  const scrollHintOpacity = useTransform(smoothScroll, [0, 0.1, 0.2], [1, 1, 0]);
  const scrollHintY = useTransform(smoothScroll, [0, 0.2], [0, 20]);

  if (!isVisible) return null;

  return (
    <section ref={sectionRef} className="fixed inset-0 z-50 h-screen w-full overflow-hidden" style={{ backgroundColor: "var(--color-base)" }}>
      {/* FUNDO 3D: MALHA DE PERSPECTIVA */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-end justify-center">
        <motion.div
          className="w-[200vw] h-[100vh] opacity-30 md:opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(252, 98, 252, 0.4) 2px, transparent 2px),
              linear-gradient(90deg, rgba(252, 98, 252, 0.4) 2px, transparent 2px)
            `,
            backgroundSize: "60px 60px",
            transformOrigin: "top",
            transform: "perspective(500px) rotateX(60deg)",
            y: gridTranslateY,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[var(--color-base)] to-[var(--color-base)] z-10"></div>
      </div>

      {/* Blob de luz */}
      <div aria-hidden="true" className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <div
          className="h-[80vw] w-[80vw] md:h-[60vw] md:w-[60vw] max-h-[700px] max-w-[700px] rounded-full opacity-20 md:opacity-25 blur-[100px] md:blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-support) 0%, var(--color-identity) 60%, transparent 100%)" }}
        />
      </div>

      {/* IMAGENS DE PRODUTOS (4 cantos) - AGORA APARECE NO CELULAR TAMBÉM */}
      <div className="absolute top-[5%] left-[5%] w-[clamp(150px,35vw,500px)] z-[15] pointer-events-none select-none md:hidden block" style={{ rotate: "-10deg" }}>
        <Image src="/he1.png" alt="" width={600} height={600} className="w-full h-auto object-contain drop-shadow-2xl" priority sizes="35vw" />
      </div>
      <div className="absolute top-[5%] right-[5%] w-[clamp(150px,35vw,500px)] z-[15] pointer-events-none select-none md:hidden block" style={{ rotate: "10deg" }}>
        <Image src="/he2.png" alt="" width={600} height={600} className="w-full h-auto object-contain drop-shadow-2xl" priority sizes="35vw" />
      </div>
      <div className="absolute bottom-[5%] left-[5%] w-[clamp(150px,35vw,500px)] z-[15] pointer-events-none select-none md:hidden block" style={{ rotate: "10deg" }}>
        <Image src="/he3.png" alt="" width={600} height={600} className="w-full h-auto object-contain drop-shadow-2xl" priority sizes="35vw" />
      </div>
      <div className="absolute bottom-[5%] right-[5%] w-[clamp(150px,35vw,500px)] z-[15] pointer-events-none select-none md:hidden block" style={{ rotate: "-10deg" }}>
        <Image src="/he4.png" alt="" width={600} height={600} className="w-full h-auto object-contain drop-shadow-2xl" priority sizes="35vw" />
      </div>

      {/* IMAGENS DE PRODUTOS (4 cantos) - DESKTOP */}
      <div className="absolute top-[10%] left-[15%] w-[clamp(250px,40vw,600px)] z-[15] pointer-events-none select-none hidden md:block" style={{ rotate: "-10deg" }}>
        <Image src="/he1.png" alt="" width={700} height={700} className="w-full h-auto object-contain drop-shadow-2xl" priority sizes="40vw" />
      </div>
      <div className="absolute top-[10%] right-[15%] w-[clamp(250px,40vw,600px)] z-[15] pointer-events-none select-none hidden md:block" style={{ rotate: "10deg" }}>
        <Image src="/he2.png" alt="" width={700} height={700} className="w-full h-auto object-contain drop-shadow-2xl" priority sizes="40vw" />
      </div>
      <div className="absolute bottom-[10%] left-[15%] w-[clamp(250px,40vw,600px)] z-[15] pointer-events-none select-none hidden md:block" style={{ rotate: "10deg" }}>
        <Image src="/he3.png" alt="" width={700} height={700} className="w-full h-auto object-contain drop-shadow-2xl" priority sizes="40vw" />
      </div>
      <div className="absolute bottom-[10%] right-[15%] w-[clamp(250px,40vw,600px)] z-[15] pointer-events-none select-none hidden md:block" style={{ rotate: "-10deg" }}>
        <Image src="/he4.png" alt="" width={700} height={700} className="w-full h-auto object-contain drop-shadow-2xl" priority sizes="40vw" />
      </div>

      {/* TEXTO 1 */}
      <motion.div style={{ opacity: text1Opacity, y: text1Y }} className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <h2 className="text-[var(--color-text)] text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter text-center leading-[0.85]" style={{ fontFamily: "var(--font-bebas)" }}>
          (nomeloja)<br />
          <span style={{ color: "var(--color-support)" }}>PRODUTOS CONFIÁVEIS.</span>
        </h2>
      </motion.div>

      {/* TEXTO 2 */}
      <motion.div style={{ opacity: text2Opacity, y: text2Y }} className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <h2 className="text-[var(--color-text)] text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter text-center leading-[0.85]" style={{ fontFamily: "var(--font-bebas)" }}>
          LANÇAMENTOS DAS PRINCIPAIS<br />
          <span style={{ color: "var(--color-identity)" }}>PLATAFORMAS RECOMENDADAS.</span>
        </h2>
      </motion.div>

      {/* TEXTO 3 */}
      <motion.div style={{ opacity: text3Opacity, y: text3Y }} className="absolute inset-0 z-20 flex items-center justify-center px-4">
        <h2 className="text-[var(--color-text)] text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter text-center leading-[0.85]" style={{ fontFamily: "var(--font-bebas)" }}>
          DESCONTOS ACIMA DE 50%.<br />
          <span style={{ color: "var(--color-shock)" }}>TODO DIA CHEGA COISA NOVA.</span>
        </h2>
      </motion.div>

      {/* HERO PRINCIPAL */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }}
        className="absolute inset-0 z-[20] flex flex-col items-center justify-center px-4 pt-16 md:pt-8 text-center"
      >
        {/* FRENZY TITLE */}
        <div className="leading-[0.85] tracking-tighter overflow-visible" style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}>
          <div className="flex flex-row items-end justify-center overflow-visible">
            {FRENZY_LETTERS.map((char, i) => (
              <TunnelLetter key={i} char={char} delay={i * 0.08} color="var(--color-support)" style={{ ...titleGreenStyle, fontSize: "clamp(4.5rem, 18vw, 16rem)" }} />
            ))}
          </div>
        </div>

        {/* PROTOCOL TITLE */}
        <div className="mb-8 md:mb-6 leading-none tracking-tighter overflow-visible" style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}>
          <div className="flex flex-row items-end justify-center overflow-visible">
            {PROTOCOL_LETTERS.map((char, i) => (
              <TunnelLetter key={i} char={char} delay={FRENZY_LETTERS.length * 0.08 + 0.1 + i * 0.06} color="var(--color-text)" style={{ ...titleWhiteStyle, fontSize: "clamp(1.8rem, 7vw, 6.5rem)" }} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <p className="mt-8 font-sans text-lg md:text-xl font-bold max-w-2xl" style={{ color: "var(--color-text)" }}>
          Maquiagem, beleza, lingeries e achados selecionados com os melhores preços.
        </p>
      </motion.div>

            {/* AVISO "ROLE PARA BAIXO" - MOBILE */}
      <motion.div
        style={{ opacity: scrollHintOpacity, y: scrollHintY }}
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 md:hidden"
      >
        <p className="font-mono text-sm font-black uppercase tracking-wider" style={{ color: "var(--color-text)" }}>
          Role para baixo
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
          style={{ borderColor: "var(--color-support)" }}
        >
          <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: "var(--color-support)" }} />
        </motion.div>
      </motion.div>

      {/* AVISO "ROLE PARA BAIXO" - DESKTOP */}
      <motion.div
        style={{ opacity: scrollHintOpacity, y: scrollHintY }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 hidden md:block"
      >
        <p className="font-mono text-base font-black uppercase tracking-wider" style={{ color: "var(--color-text)" }}>
          Role para baixo
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
          style={{ borderColor: "var(--color-support)" }}
        >
          <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: "var(--color-support)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}