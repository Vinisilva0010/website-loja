import type { Metadata } from "next";
import Footer from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso & Transparência de Afiliados | (nomeloja)",
  description:
    "Termos de Uso, transparência de links afiliados e condições gerais de navegação do portal editorial (nomeloja).",
  alternates: {
    canonical: "/termos-de-uso",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermosDeUsoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcddfc] text-black">
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* HEADER DA PÁGINA */}
          <header className="mb-16 border-b-[6px] border-[#970797] pb-10">
            <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-sm font-black text-white uppercase tracking-widest">
                [ REGULAÇÃO LEGAL // TERMOS & TRANSPARÊNCIA ]
              </span>
            </div>

            <h1
              className="font-title text-4xl sm:text-6xl md:text-7xl font-black uppercase text-black leading-none mb-6"
              style={{
                textShadow: "4px 4px 0px #59abf8",
              }}
            >
              Termos de
              <br />
              Uso
            </h1>

            <p className="font-sans text-base sm:text-xl font-black text-black uppercase leading-snug max-w-2xl">
              Condições de navegação, funcionamento da curadoria editorial, política de links de afiliados e limites de responsabilidade comercial.
            </p>
          </header>

          {/* CONTAINER DO CONTEÚDO */}
          <div className="rounded-3xl border-[4px] border-black bg-white p-8 sm:p-12 shadow-[10px_10px_0px_#000000] font-sans text-base font-black text-black leading-relaxed space-y-10">
            {/* SEÇÃO 1 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                1. Natureza Editorial da Plataforma
              </h2>
              <p>
                A <strong>(nomeloja)</strong> opera estritamente como um portal de curadoria, comparação e divulgação editorial de produtos femininos (maquiagem, beleza, bolsas, acessórios e itens de cuidados pessoais). A plataforma <strong>não é uma loja virtual</strong>, não processa transações financeiras, não cobra pagamentos de usuários e não realiza envio direto de mercadorias.
              </p>
            </section>

            {/* SEÇÃO 2 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                2. Divulgação de Links de Afiliados
              </h2>
              <p className="mb-3">
                Em cumprimento às diretrizes de transparência comercial e às normas de proteção ao consumidor:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Diversos links disponibilizados em botões e cards de recomendação são links de afiliados rastreados.
                </li>
                <li>
                  Ao clicar em um link e concluir uma compra no marketplace de destino (como Mercado Livre, SHEIN ou TikTok Shop), podemos receber uma comissão pela indicação.
                </li>
                <li>
                  Essa remuneração não gera nenhum acréscimo de custo, taxa ou alteração de valor no preço final pago pelo usuário.
                </li>
              </ul>
            </section>

            {/* SEÇÃO 3 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                3. Preços, Estoque e Disponibilidade
              </h2>
              <p>
                Os preços, cupons de desconto, custos de frete e níveis de estoque apresentados nas análises editoriais correspondem às informações coletadas no momento da verificação. Como as plataformas parceiras e seus respectivos lojistas alteram esses valores dinamicamente, o preço válido e definitivo é sempre aquele exibido no checkout oficial do marketplace no momento do pagamento.
              </p>
            </section>

            {/* SEÇÃO 4 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                4. Responsabilidade sobre Compras e Logística
              </h2>
              <p>
                O processamento de pagamento, faturamento, emissão de nota fiscal, separação de pedidos, prazos de frete, entrega e atendimento pós-venda são de responsabilidade exclusiva do marketplace oficial e do vendedor parceiro onde a transação foi realizada. A (nomeloja) não tem acesso a dados de pedidos nem gerencia códigos de rastreamento.
              </p>
            </section>

            {/* SEÇÃO 5 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                5. Trocas, Devoluções e Garantias (CDC)
              </h2>
              <p>
                Quaisquer solicitações de devolução por arrependimento (Art. 49 do Código de Defesa do Consumidor), troca por defeito de fábrica ou reembolso devem ser abertas diretamente nos canais de suporte da plataforma onde o item foi adquirido, obedecendo aos termos e prazos de cada serviço.
              </p>
            </section>

            {/* SEÇÃO 6 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                6. Conteúdo de Skincare e Cosméticos
              </h2>
              <p>
                As informações técnicas, análises de composição e sugestões de uso de cosméticos e produtos de cuidados pessoais possuem caráter estritamente informativo e não substituem consultas médicas ou dermatológicas. Recomenda-se a leitura atenta do rótulo e a realização de testes de contato antes da aplicação contínua de qualquer cosmético.
              </p>
            </section>

            {/* SEÇÃO 7 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                7. Propriedade Intelectual
              </h2>
              <p>
                Textos editoriais, análises comparativas, layout e identidade visual deste portal são de propriedade dos seus mantenedores. É proibida a reprodução integral não autorizada ou a extração automatizada de dados (scraping abusivo) para fins comerciais sem autorização prévia.
              </p>
            </section>

            {/* SEÇÃO 8 */}
            <section className="pt-6 border-t-[3px] border-black/15">
              <h2 className="font-title text-2xl font-black uppercase text-black mb-4">
                8. Contato e Legislação Aplicável
              </h2>
              <p className="mb-4">
                Estes Termos são regidos pelas leis da República Federativa do Brasil. Para dúvidas sobre nossa política editorial ou transparência de afiliados, entre em contato:
              </p>
              <div className="inline-block border-[3px] border-black bg-[#fcddfc] px-5 py-2.5 rounded-xl text-black font-black font-mono">
                zanvexistech@gmail.com
              </div>
            </section>

            <div className="pt-4 border-t-[2px] border-black/10 text-sm font-black text-black">
              Última atualização: Agosto de 2026.
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}