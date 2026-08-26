"use client";

import { useState } from "react";

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "01",
    category: "Compra & Pagamento",
    question: "O site faz a venda direta ou processa o pagamento?",
    answer:
      "Não. Este portal atua exclusivamente como curadoria editorial e guia de comparação. Não recebemos pagamentos, não solicitamos dados de cartão e não emitimos boletos. Ao clicar no botão de acesso, você é direcionada para a página oficial do produto na plataforma correspondente (Mercado Livre, SHEIN ou TikTok Shop), onde a compra é concluída com total segurança.",
  },
  {
    id: "02",
    category: "Preços & Variações",
    question: "Por que o preço no marketplace pode mudar em relação ao site?",
    answer:
      "Os preços, cupons de desconto, taxas de frete e estoques são controlados diretamente pelas marcas e lojistas em cada plataforma, variando em tempo real. Nós realizamos checagens periódicas, mas o valor final e as condições vigentes são sempre aqueles exibidos diretamente no marketplace de destino.",
  },
  {
    id: "03",
    category: "Transparência de Afiliados",
    question: "Como o site se mantém? Eu pago algo a mais ao clicar nos links?",
    answer:
      "Você não paga nenhum centavo a mais. Nosso portal é mantido por meio de programas de afiliados. Quando você clica em um link de recomendação e conclui uma compra na plataforma oficial, podemos receber uma comissão paga pelo próprio marketplace, sem alterar em nada o valor final do seu produto.",
  },
  {
    id: "04",
    category: "Critérios de Curadoria",
    question: "Como são feitas as escolhas de maquiagem, bolsas e acessórios?",
    answer:
      "Nossa seleção prioriza especificações técnicas declaradas pelo fabricante, qualidade dos materiais (como tipos de couro sintético ou tecidos), reputação do vendedor, índice de reclamações e o volume de avaliações reais deixadas por outras compradoras nos marketplaces.",
  },
  {
    id: "05",
    category: "Testes & Avaliações",
    question: "Todos os produtos mostrados passam por testes físicos?",
    answer:
      "Trabalhamos com honestidade editorial: a maior parte das análises é baseada na consolidação de dados públicos, ficha técnica, composição química ou material e comparação direta entre concorrentes de mesma categoria. Não inventamos notas nem simulamos testes físicos que não tenham sido realizados em laboratório ou em mãos.",
  },
  {
    id: "06",
    category: "Envio & Frete",
    question: "Quem cuida do frete, prazo e envio da mercadoria?",
    answer:
      "Todo o processo logístico — emissão de nota fiscal, separação do pacote, postagem, prazos de frete e código de rastreamento — é de responsabilidade exclusiva do marketplace de origem e do lojista parceiro. Dúvidas sobre entrega devem ser acompanhadas pelo painel de pedidos da própria plataforma.",
  },
  {
    id: "07",
    category: "Trocas & CDC",
    question: "Como solicitar devolução ou troca caso o produto não sirva?",
    answer:
      "Todas as compras em plataformas confiáveis contam com a proteção do Código de Defesa do Consumidor (Art. 49), garantindo o direito de arrependimento em até 7 dias após o recebimento, além das políticas de garantia legal de cada canal. A solicitação deve ser feita diretamente no app ou site onde você concluiu a compra.",
  },
  {
    id: "08",
    category: "Segurança do Link",
    question: "Os botões me levam para páginas oficiais e seguras?",
    answer:
      "Sim. Todos os links passam por checagem técnica e redirecionam unicamente para domínios oficiais e certificados de marketplaces reconhecidos nacional e internacionalmente, impedindo redirecionamentos para sites clonados ou sem suporte a compras protegidas.",
  },
  {
    id: "09",
    category: "Cores & Fotos",
    question: "A cor real do produto será exatamente idêntica à imagem?",
    answer:
      "Imagens digitais podem sofrer pequenas alterações de tonalidade em razão da calibração de cada tela, brilho do monitor e iluminação de estúdio das fotos do catálogo. Sempre recomendamos conferir as fotos postadas por compradores nas avaliações do anúncio oficial antes de fechar a compra.",
  },
  {
    id: "10",
    category: "Frequência de Atualização",
    question: "Com que frequência as listas e achados são atualizados?",
    answer:
      "Realizamos revisões semanais na nossa base de dados para garantir que links quebrados, produtos esgotados ou ofertas expiradas sejam ajustados ou substituídos por alternativas ativas com bom custo-benefício.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="relative w-full bg-[#fcddfc] py-24 md:py-32 px-4 sm:px-6 md:px-12 border-b-[8px] border-[#970797] z-20">
      {/* Schema Markup JSON-LD sincronizado para SEO e IA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* LADO ESQUERDO: HEADER FIXO DE ALTO CONTRASTE */}
        <div className="w-full lg:w-5/12 lg:sticky lg:top-32">
          <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-2 mb-4 shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-sm font-black text-white uppercase tracking-widest">
              [ FAQ & TRANSPARÊNCIA ]
            </span>
          </div>

          <h2
            className="font-title text-4xl sm:text-6xl lg:text-7xl font-black uppercase text-black leading-none mb-6"
            style={{
              textShadow: "4px 4px 0px #59abf8",
            }}
          >
            Dúvidas
            <br />
            Frequentes
          </h2>

          <p className="font-sans text-lg sm:text-xl font-black text-black leading-snug max-w-md mb-8">
            Respostas diretas sobre nossa curadoria editorial, links de afiliados, atualização de preços e redirecionamento para lojas oficiais.
          </p>

          <div className="p-6 rounded-2xl border-[4px] border-black bg-white shadow-[6px_6px_0px_#000000] hidden sm:block">
            <span className="font-mono text-xs font-black uppercase text-white bg-[#970797] px-3 py-1 rounded border-2 border-black">
              PRECISA DE AJUDA?
            </span>
            <p className="font-sans text-sm font-black text-black mt-3 leading-relaxed">
              Caso sua dúvida seja sobre uma recomendação específica ou queira sugerir produtos para curadoria, envie uma mensagem através da nossa página de contato.
            </p>
          </div>
        </div>

        {/* LADO DIREITO: LISTA DOS 10 ACORDEÕES */}
        <div className="w-full lg:w-7/12 flex flex-col gap-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border-[4px] border-black transition-all duration-150 overflow-hidden ${
                  isOpen
                    ? "bg-white shadow-[8px_8px_0px_#000000]"
                    : "bg-white/80 hover:bg-white shadow-[4px_4px_0px_#000000]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left outline-none cursor-pointer gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <span
                      className={`font-mono text-xs font-black px-2.5 py-1.5 rounded-lg border-2 border-black shrink-0 transition-colors ${
                        isOpen ? "bg-[#970797] text-white" : "bg-black text-white"
                      }`}
                    >
                      {faq.id}
                    </span>

                    <div>
                      <span className="font-mono text-xs font-black uppercase tracking-wider text-[#970797] block mb-0.5">
                        {faq.category}
                      </span>
                      <h3 className="font-title text-lg sm:text-xl font-black uppercase text-black m-0 tracking-tight leading-tight">
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* Ícone de Estado (+ / −) */}
                  <div
                    className={`w-10 h-10 rounded-xl border-[3px] border-black flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "bg-[#970797] text-white rotate-45 shadow-none"
                        : "bg-[#59abf8] text-black shadow-[2px_2px_0px_#000000]"
                    }`}
                  >
                    <span className="font-mono text-2xl font-black leading-none select-none">
                      +
                    </span>
                  </div>
                </button>

                {/* Conteúdo Expansível */}
                <div
                  className={`transition-all duration-200 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="p-6 pt-0 font-sans text-base font-black text-black leading-relaxed border-t-[3px] border-black/10 mt-2 bg-white">
                    <p className="pt-4 pl-4 border-l-[6px] border-[#970797]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}