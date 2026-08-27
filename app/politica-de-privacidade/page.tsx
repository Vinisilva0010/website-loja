import type { Metadata } from "next";
import Footer from "@/app/components/sections/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidade & LGPD | (nomeloja)",
  description:
    "Política de Privacidade e Proteção de Dados (LGPD) referente à navegação, cookies, links de afiliados e formulários de contato no portal editorial (nomeloja).",
  alternates: {
    canonical: "/politica-de-privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PoliticaPrivacidadePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fcddfc] text-black">
      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* HEADER DA PÁGINA */}
          <header className="mb-16 border-b-[6px] border-[#970797] pb-10">
            <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-sm font-black text-white uppercase tracking-widest">
                [ CONFORMIDADE LGPD // SEGURANÇA E DADOS ]
              </span>
            </div>

            <h1
              className="font-title text-4xl sm:text-6xl md:text-7xl font-black uppercase text-black leading-none mb-6"
              style={{
                textShadow: "4px 4px 0px #59abf8",
              }}
            >
              Política de
              <br />
              Privacidade
            </h1>

            <p className="font-sans text-base sm:text-xl font-black text-black uppercase leading-snug max-w-2xl">
              Diretrizes de transparência, uso de cookies de afiliados, dados técnicos de navegação e direitos do usuário sob a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).
            </p>
          </header>

          {/* CONTAINER DO CONTEÚDO */}
          <div className="rounded-3xl border-[4px] border-black bg-white p-8 sm:p-12 shadow-[10px_10px_0px_#000000] font-sans text-base font-black text-black leading-relaxed space-y-10">
            {/* SEÇÃO 1 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                1. Identificação e Natureza do Site
              </h2>
              <p>
                A <strong>(nomeloja)</strong> é um ambiente de pesquisa editorial, comparativos e curadoria independente de produtos femininos. O portal <strong>não comercializa produtos diretamente</strong>, não possui carrinho de compras integrado e não coleta dados de pagamento, senhas bancárias ou números de cartão de crédito.
              </p>
            </section>

            {/* SEÇÃO 2 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                2. Dados Coletados e Forma de Coleta
              </h2>
              <p className="mb-3">
                Tratamos apenas os dados estritamente necessários para a navegação segura e o atendimento:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Dados de contato fornecidos pelo usuário:</strong> Nome, e-mail e mensagem enviados voluntariamente via formulário de contato para suporte ou sugestões.
                </li>
                <li>
                  <strong>Dados técnicos de navegação:</strong> Endereço IP anonimizado, tipo de navegador, sistema operacional e páginas visualizadas para fins de diagnóstico e segurança da aplicação.
                </li>
                <li>
                  <strong>Cookies de desempenho e métricas:</strong> Informações agregadas de tráfego gerenciadas pelo Google Analytics (GA4) para entender o comportamento de navegação e melhorar a experiência do usuário.
                </li>
              </ul>
            </section>

            {/* SEÇÃO 3 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                3. Cookies, Publicidade e Links de Afiliados
              </h2>
              <p className="mb-3">
                Nosso portal utiliza links rastreados de programas de afiliados (Mercado Livre, SHEIN, TikTok Shop) e redes de anúncios autorizadas (Google AdSense):
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Ao clicar em um botão de recomendação, um cookie de afiliado temporário pode ser gravado pela plataforma de destino para registrar a origem da indicação.
                </li>
                <li>
                  O Google e parceiros terceiros utilizam cookies para exibir anúncios relevantes baseados em visitas anteriores realizadas neste ou em outros sites da web.
                </li>
                <li>
                  O usuário pode desativar o uso de cookies a qualquer momento diretamente nas configurações de privacidade do seu navegador.
                </li>
              </ul>
            </section>

            {/* SEÇÃO 4 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                4. Links para Plataformas de Terceiros
              </h2>
              <p>
                Ao clicar em &quot;Ver oferta&quot; ou nos links dos produtos recomendados, você será redirecionada para lojas e marketplaces externos. Uma vez fora do nosso domínio, a coleta e o tratamento de dados pessoais passam a ser regidos exclusivamente pelas políticas de privacidade de cada plataforma correspondente.
              </p>
            </section>

            {/* SEÇÃO 5 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                5. Compartilhamento e Segurança de Dados
              </h2>
              <p>
                Não comercializamos, alugamos ou repassamos informações pessoais para listas de spam ou terceiros para fins de marketing. O compartilhamento ocorre apenas quando exigido por lei ou determinação judicial, ou para serviços essenciais de infraestrutura e hospedagem em servidores seguros.
              </p>
            </section>

            {/* SEÇÃO 6 */}
            <section>
              <h2 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-4 flex items-center gap-3">
                <span className="w-4 h-4 bg-[#970797] border-2 border-black rotate-45 shrink-0" />
                6. Seus Direitos (LGPD - Art. 18)
              </h2>
              <p className="mb-3">
                Conforme estabelecido pela legislação brasileira, você possui o direito de solicitar a qualquer momento:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>A confirmação e o acesso aos dados pessoais que possam ter sido fornecidos via contato;</li>
                <li>A correção de dados incompletos, inexatos ou desatualizados;</li>
                <li>A eliminação definitiva de mensagens e registros de contato da nossa base;</li>
                <li>A revogação do consentimento para tratamento de dados.</li>
              </ul>
            </section>

            {/* SEÇÃO 7 */}
            <section className="pt-6 border-t-[3px] border-black/15">
              <h2 className="font-title text-2xl font-black uppercase text-black mb-4">
                7. Canal de Atendimento e Encarregado (DPO)
              </h2>
              <p className="mb-4">
                Para esclarecer dúvidas sobre esta Política de Privacidade ou solicitar a remoção de dados enviados por formulário, entre em contato através do nosso canal oficial:
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