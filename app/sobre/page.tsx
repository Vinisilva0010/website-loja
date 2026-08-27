import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/sections/Footer";
import { Search, ShieldCheck, Scale, Sparkles, Github, Linkedin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nós | Metodologia Editorial e Curadoria Independente",
  description:
    "Conheça a metodologia de seleção, os critérios de comparação e o compromisso de transparência editorial da (nomeloja) na indicação de produtos femininos em marketplaces oficiais.",
};

export default function SobrePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcddfc] text-black">
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER PRINCIPAL */}
          <header className="mb-16 border-b-[6px] border-[#970797] pb-12">
            <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-sm font-black text-white uppercase tracking-widest">
                [ METODOLOGIA EDITORIAL // CURADORIA INDEPENDENTE ]
              </span>
            </div>

            <h1
              className="font-title text-5xl sm:text-7xl md:text-8xl font-black uppercase text-black leading-none mb-6"
              style={{
                textShadow: "5px 5px 0px #59abf8",
              }}
            >
              Sobre a
              <br />
              (nomeloja)
            </h1>

            <p className="font-sans text-lg sm:text-2xl uppercase tracking-wider font-black text-black max-w-4xl leading-tight">
              Pesquisa detalhada, comparação honesta de produtos femininos e encaminhamento seguro para marketplaces oficiais.
            </p>
          </header>

          {/* PROPÓSITO & MODELO */}
          <section className="mb-16 rounded-3xl border-[4px] border-black bg-white p-8 sm:p-12 shadow-[10px_10px_0px_#000000]">
            <h2 className="font-title text-3xl sm:text-5xl font-black uppercase text-black mb-8 flex items-center gap-3">
              <span className="w-5 h-5 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
              Quem Somos e Nosso Modelo de Trabalho
            </h2>

            <div className="space-y-6 font-sans text-base sm:text-xl font-black text-black leading-relaxed">
              <p>
                A (nomeloja) é uma plataforma editorial independente de descoberta, comparação e curadoria de produtos femininos — abrangendo maquiagem, cosméticos, bolsas, acessórios e itens de cuidados pessoais.
              </p>

              <p>
                Nosso portal não funciona como uma loja virtual tradicional com checkout próprio: não cobramos pagamentos, não processamos fretes e não intermediamos faturamento. Nossa missão é filtrar o excesso de anúncios da internet, organizar fichas técnicas, destacar prós e contras reais e guiar sua decisão antes do clique.
              </p>

              <p>
                Ao escolher um item em nossas seleções, você é direcionada de forma transparente para a página oficial do produto em grandes plataformas (como Mercado Livre, SHEIN ou TikTok Shop), onde a compra, o pagamento protegido e a entrega são concluídos diretamente com os vendedores oficiais.
              </p>
            </div>
          </section>

          {/* 4 PILARES DE CURADORIA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* PILAR 1: ESPECIFICAÇÕES */}
            <div className="rounded-3xl border-[4px] border-black bg-white p-8 sm:p-10 shadow-[8px_8px_0px_#970797] flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#970797] text-white border-[3px] border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000000]">
                  <Search size={32} />
                </div>
                <h3 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4">
                  Análise Técnica de Especificações
                </h3>
                <p className="font-sans text-base sm:text-lg font-black text-black leading-relaxed">
                  Avaliamos dimensões reais, medidas de compartimentos de bolsas, tipos de fecho, composição de tecidos e fórmulas declaradas pelos fabricantes para evitar surpresas na entrega.
                </p>
              </div>
            </div>

            {/* PILAR 2: REPUTAÇÃO */}
            <div className="rounded-3xl border-[4px] border-black bg-white p-8 sm:p-10 shadow-[8px_8px_0px_#970797] flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#59abf8] text-black border-[3px] border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000000]">
                  <Scale size={32} />
                </div>
                <h3 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4">
                  Reputação & Avaliações Reais
                </h3>
                <p className="font-sans text-base sm:text-lg font-black text-black leading-relaxed">
                  Cruzamos o histórico dos lojistas parceiros, volume de reclamações e comentários verificados de compradores para recomendar apenas itens com consistência comprovada de envio e qualidade.
                </p>
              </div>
            </div>

            {/* PILAR 3: TRANSPARÊNCIA */}
            <div className="rounded-3xl border-[4px] border-black bg-white p-8 sm:p-10 shadow-[8px_8px_0px_#970797] flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#970797] text-white border-[3px] border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000000]">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4">
                  Transparência de Afiliados
                </h3>
                <p className="font-sans text-base sm:text-lg font-black text-black leading-relaxed">
                  Somos remunerados por comissões de afiliados quando uma compra é finalizada através dos nossos links recomendados, sem nenhum acréscimo de valor ou cobrança extra para o usuário final.
                </p>
              </div>
            </div>

            {/* PILAR 4: HONESTIDADE EDITORIAL */}
            <div className="rounded-3xl border-[4px] border-black bg-white p-8 sm:p-10 shadow-[8px_8px_0px_#970797] flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#59abf8] text-black border-[3px] border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000000]">
                  <Sparkles size={32} />
                </div>
                <h3 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4">
                  Honestidade Editorial
                </h3>
                <p className="font-sans text-base sm:text-lg font-black text-black leading-relaxed">
                  Não inventamos notas falsas nem alegamos testes laboratoriais físicos quando a análise é puramente documental e comparativa. Toda limitação do produto é apontada com clareza nos pontos de atenção.
                </p>
              </div>
            </div>
          </div>

          {/* RESPONSÁVEL TÉCNICO & INFRAESTRUTURA */}
          <section className="mb-12">
            <div className="rounded-3xl border-[4px] border-black bg-white flex flex-col lg:flex-row shadow-[12px_12px_0px_#000000] overflow-hidden">
              {/* IMAGEM */}
              <div className="lg:w-1/3 border-b-[4px] lg:border-b-0 lg:border-r-[4px] border-black bg-[#59abf8] flex items-center justify-center overflow-hidden min-h-[320px]">
                <img
                  src="/images/foto.png"
                  alt="Responsável Técnico e Editorial"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* CONTEÚDO */}
              <div className="lg:w-2/3 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-block border-[2px] border-black bg-[#970797] px-3 py-1 mb-3 shadow-[2px_2px_0px_#000000]">
                    <span className="font-mono text-xs font-black text-white uppercase tracking-wider">
                      ENGENHARIA DE DADOS & CURADORIA
                    </span>
                  </div>
                  <h3 className="font-title text-3xl sm:text-5xl font-black uppercase text-black mb-6">
                    Estrutura & Tecnologia
                  </h3>
                  <p className="font-sans text-base sm:text-xl font-black text-black leading-relaxed mb-8">
                    Mantido e arquitetado pela Zanvexis Tecnologia, o portal foi construído com foco em alta velocidade de carregamento, semântica para motores de busca e crawlers de IA, e uma infraestrutura transparente para navegação limpa e direta.
                  </p>
                </div>

                {/* LINKS EXTERNOS */}
                <div className="flex flex-wrap gap-4 pt-6 border-t-[3px] border-black/20">
                  <Link
                    href="https://github.com/vinisilva0010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-[3px] border-black bg-[#fcddfc] px-6 py-3 rounded-xl font-mono text-sm font-black uppercase text-black hover:bg-[#970797] hover:text-white transition-all shadow-[3px_3px_0px_#000000] active:translate-y-0.5"
                  >
                    <Github size={18} /> GITHUB
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/vinicius-pontual-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border-[3px] border-black bg-[#fcddfc] px-6 py-3 rounded-xl font-mono text-sm font-black uppercase text-black hover:bg-[#970797] hover:text-white transition-all shadow-[3px_3px_0px_#000000] active:translate-y-0.5"
                  >
                    <Linkedin size={18} /> LINKEDIN
                  </Link>
                  <Link
                    href="/contato"
                    className="flex items-center gap-2 border-[3px] border-black bg-[#970797] text-white px-6 py-3 rounded-xl font-mono text-sm font-black uppercase hover:bg-[#59abf8] hover:text-black transition-all shadow-[3px_3px_0px_#000000] active:translate-y-0.5"
                  >
                    FALE CONOSCO <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}