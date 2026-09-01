"use client";

import { useState, useEffect } from "react";

export default function CalculadoraPrecificacao() {
  const [precoFornecedor, setPrecoFornecedor] = useState<string>("");
  const [precoVendaMercado, setPrecoVendaMercado] = useState<string>("");
  const [plataforma, setPlataforma] = useState<"shopee" | "mercadolivre" | "tiktok">("shopee");
  
  // Transporte
  const [transporteValor, setTransporteValor] = useState<string>("0");
  const [transporteQtdPecas, setTransporteQtdPecas] = useState<string>("1");
  
  // Impressora
  const [impressoraPreco, setImpressoraPreco] = useState<string>("900");
  const [impressoraVendas, setImpressoraVendas] = useState<string>("300");
  
  const [lucro, setLucro] = useState<number | null>(null);
  const [margem, setMargem] = useState<number | null>(null);

  const EMBALAGEM = 3.0;
  const MEI_RATEIO = 0.82;

  const TAXAS = {
    shopee: { nome: "Shopee", comissao: 20, taxaFixa: 4 },
    mercadolivre: { nome: "Mercado Livre", comissao: 14, taxaFixa: 6 },
    tiktok: { nome: "TikTok Shop", comissao: 10, taxaFixa: 4 },
  };

  useEffect(() => {
    calcular();
  }, [precoFornecedor, precoVendaMercado, plataforma, impressoraPreco, impressoraVendas, transporteValor, transporteQtdPecas]);

  const calcular = () => {
    const fornecedor = parseFloat(precoFornecedor.replace(",", ".")) || 0;
    const venda = parseFloat(precoVendaMercado.replace(",", ".")) || 0;
    const impressora = parseFloat(impressoraPreco.replace(",", ".")) || 900;
    const vendasImpressora = parseFloat(impressoraVendas.replace(",", ".")) || 300;
    const transporte = parseFloat(transporteValor.replace(",", ".")) || 0;
    const qtdPecas = parseFloat(transporteQtdPecas.replace(",", ".")) || 1;

    if (fornecedor <= 0 || venda <= 0) {
      setLucro(null);
      setMargem(null);
      return;
    }

    let comissao = TAXAS[plataforma].comissao;
    let taxaFixa = TAXAS[plataforma].taxaFixa;

    if (plataforma === "tiktok" && venda >= 50) {
      comissao = 6;
      taxaFixa = 6;
    }
    if (plataforma === "shopee" && venda >= 80) {
      comissao = 14;
      taxaFixa = 16;
    }

    // Rateio da impressora
    const impressoraRateio = impressora / vendasImpressora;

    // Rateio do transporte (valor total ÷ quantidade de peças)
    const transporteRateio = qtdPecas > 0 ? transporte / qtdPecas : 0;

    // GASTOS TOTAIS
    const gastosFixos = EMBALAGEM + MEI_RATEIO + taxaFixa + impressoraRateio + transporteRateio;
    const comissaoValor = venda * (comissao / 100);
    const gastosTotais = fornecedor + gastosFixos + comissaoValor;

    const lucroLiquido = venda - gastosTotais;
    const margemPercentual = (lucroLiquido / venda) * 100;

    setLucro(lucroLiquido);
    setMargem(margemPercentual);
  };

  const formatar = (valor: number) => {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const getTaxasAtuais = () => {
    const venda = parseFloat(precoVendaMercado.replace(",", ".")) || 0;
    let comissao = TAXAS[plataforma].comissao;
    let taxaFixa = TAXAS[plataforma].taxaFixa;

    if (plataforma === "tiktok" && venda >= 50) {
      comissao = 6;
      taxaFixa = 6;
    }
    if (plataforma === "shopee" && venda >= 80) {
      comissao = 14;
      taxaFixa = 16;
    }

    return { comissao, taxaFixa };
  };

  const taxasAtuais = getTaxasAtuais();
  const impressora = parseFloat(impressoraPreco.replace(",", ".")) || 900;
  const vendasImpressora = parseFloat(impressoraVendas.replace(",", ".")) || 300;
  const impressoraRateio = impressora / vendasImpressora;
  const transporte = parseFloat(transporteValor.replace(",", ".")) || 0;
  const qtdPecas = parseFloat(transporteQtdPecas.replace(",", ".")) || 1;
  const transporteRateio = qtdPecas > 0 ? transporte / qtdPecas : 0;

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: "var(--color-base)", color: "var(--color-text)" }}>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
          Calculadora de Lucro
        </h1>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--color-text)" }}>
              Preço do fornecedor
            </label>
            <input
              type="number"
              value={precoFornecedor}
              onChange={(e) => setPrecoFornecedor(e.target.value)}
              className="w-full px-4 py-3 rounded border-2 text-lg font-bold"
              style={{ 
                backgroundColor: "var(--color-base)", 
                borderColor: "var(--color-identity)",
                color: "var(--color-text)",
              }}
              placeholder="Ex: 25.90"
              step="0.01"
            />
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--color-text)" }}>
              Preço de venda (mercado)
            </label>
            <input
              type="number"
              value={precoVendaMercado}
              onChange={(e) => setPrecoVendaMercado(e.target.value)}
              className="w-full px-4 py-3 rounded border-2 text-lg font-bold"
              style={{ 
                backgroundColor: "var(--color-base)", 
                borderColor: "var(--color-shock)",
                color: "var(--color-text)",
              }}
              placeholder="Ex: 59.90"
              step="0.01"
            />
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--color-text)" }}>
              Transporte pra buscar produto
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="number"
                value={transporteValor}
                onChange={(e) => setTransporteValor(e.target.value)}
                className="w-1/2 px-4 py-3 rounded border-2"
                style={{ 
                  backgroundColor: "var(--color-base)", 
                  borderColor: "var(--color-text)",
                  color: "var(--color-text)",
                }}
                placeholder="R$ 12"
                step="0.01"
              />
              <input
                type="number"
                value={transporteQtdPecas}
                onChange={(e) => setTransporteQtdPecas(e.target.value)}
                className="w-1/2 px-4 py-3 rounded border-2"
                style={{ 
                  backgroundColor: "var(--color-base)", 
                  borderColor: "var(--color-text)",
                  color: "var(--color-text)",
                }}
                placeholder="Qtd peças"
                step="1"
              />
            </div>
            <p className="text-xs" style={{ color: "var(--color-text)", opacity: 0.7 }}>
              Ex: R$ 12 ÷ 20 peças = R$ 0,60 por peça
            </p>
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--color-text)" }}>
              Preço da impressora de etiquetas
            </label>
            <input
              type="number"
              value={impressoraPreco}
              onChange={(e) => setImpressoraPreco(e.target.value)}
              className="w-full px-4 py-3 rounded border-2"
              style={{ 
                backgroundColor: "var(--color-base)", 
                borderColor: "var(--color-text)",
                color: "var(--color-text)",
              }}
              placeholder="Ex: 900"
              step="0.01"
            />
          </div>

          <div>
            <label className="block font-bold mb-1" style={{ color: "var(--color-text)" }}>
              Em quantas vendas quer pagar a impressora?
            </label>
            <input
              type="number"
              value={impressoraVendas}
              onChange={(e) => setImpressoraVendas(e.target.value)}
              className="w-full px-4 py-3 rounded border-2"
              style={{ 
                backgroundColor: "var(--color-base)", 
                borderColor: "var(--color-text)",
                color: "var(--color-text)",
              }}
              placeholder="Ex: 300"
              step="1"
            />
            <p className="text-xs mt-1" style={{ color: "var(--color-text)", opacity: 0.7 }}>
              Ex: R$ 900 ÷ 300 vendas = R$ 3 por peça
            </p>
          </div>

          <div>
            <label className="block font-bold mb-2" style={{ color: "var(--color-text)" }}>
              Plataforma
            </label>
            <div className="flex gap-2">
              {(["shopee", "mercadolivre", "tiktok"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setPlataforma(p)}
                  className="px-4 py-2 rounded font-bold border-2"
                  style={{
                    backgroundColor: plataforma === p ? "var(--color-identity)" : "var(--color-base)",
                    color: "var(--color-text)",
                    borderColor: "var(--color-text)",
                  }}
                >
                  {TAXAS[p].nome}
                </button>
              ))}
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--color-text)", opacity: 0.7 }}>
              {plataforma === "shopee" && `Shopee: ${taxasAtuais.comissao}% + R$ ${taxasAtuais.taxaFixa} [35][36]`}
              {plataforma === "mercadolivre" && `Mercado Livre: ${taxasAtuais.comissao}% + R$ ${taxasAtuais.taxaFixa} [34]`}
              {plataforma === "tiktok" && `TikTok Shop: ${taxasAtuais.comissao}% + R$ ${taxasAtuais.taxaFixa} [31][37]`}
            </p>
          </div>
        </div>

        {lucro !== null && (
          <div 
            className="rounded-lg p-6 mb-6"
            style={{ 
              backgroundColor: lucro >= 0 ? "var(--color-support)" : "#ff6b6b",
              color: "var(--color-text)",
            }}
          >
            <h2 className="text-2xl font-bold mb-4">
              {lucro >= 0 ? "✅ TEM LUCRO" : "❌ PREJUÍZO"}
            </h2>
            
            <div className="text-4xl font-bold mb-2">
              {formatar(lucro)}
            </div>
            <div className="text-lg opacity-90">
              Margem: {margem?.toFixed(1)}%
            </div>

            <div className="mt-4 p-4 rounded text-sm" style={{ backgroundColor: "var(--color-base)" }}>
              <h3 className="font-bold mb-2" style={{ color: "var(--color-text)" }}>
                Conta completa:
              </h3>
              <div className="space-y-1" style={{ color: "var(--color-text)" }}>
                <div className="flex justify-between">
                  <span>Venda:</span>
                  <span>{formatar(parseFloat(precoVendaMercado.replace(",", ".")) || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Produto:</span>
                  <span>- {formatar(parseFloat(precoFornecedor.replace(",", ".")) || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Embalagem:</span>
                  <span>- {formatar(EMBALAGEM)}</span>
                </div>
                <div className="flex justify-between">
                  <span>MEI:</span>
                  <span>- {formatar(MEI_RATEIO)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa fixa:</span>
                  <span>- {formatar(taxasAtuais.taxaFixa)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impressora (rateio):</span>
                  <span>- {formatar(impressoraRateio)}</span>
                </div>
                {transporteRateio > 0 && (
                  <div className="flex justify-between">
                    <span>Transporte (R$ {transporte} ÷ {qtdPecas} peças):</span>
                    <span>- {formatar(transporteRateio)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Comissão ({taxasAtuais.comissao}%):</span>
                  <span>- {formatar((parseFloat(precoVendaMercado.replace(",", ".")) || 0) * (taxasAtuais.comissao / 100))}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>LUCRO:</span>
                  <span>{formatar(lucro)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div 
          className="rounded p-4 text-sm"
          style={{ backgroundColor: "var(--color-shock)", color: "var(--color-text)" }}
        >
          <h3 className="font-bold mb-2">Custos fixos:</h3>
          <ul className="space-y-1 opacity-90">
            <li>• Embalagem: R$ 3,00</li>
            <li>• MEI: R$ 0,82/peça</li>
            <li>• Impressora: {formatar(impressoraRateio)} (R$ {impressora} ÷ {vendasImpressora} vendas)</li>
            {transporteRateio > 0 && <li>• Transporte: {formatar(transporteRateio)} (R$ {transporte} ÷ {qtdPecas} peças)</li>}
            <li>• Taxas da plataforma (atualizadas 2026)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}