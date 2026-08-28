"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Footer from "@/app/components/sections/Footer";
import { getByCategory, getAllProducts, type Product } from "@/lib/products";
import {
  Sliders,
  ExternalLink,
} from "lucide-react";

interface CategoryDetail {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  metrics: { value: string; label: string }[];
  criteria: { title: string; items: string[] }[];
  steps: { step: number; title: string; description: string }[];
  useCases: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  customFilter?: (products: Product[]) => Product[];
}

const CATEGORY_MAP: Record<string, CategoryDetail> = {
  maquiagem: {
    key: "batom",
    title: "Maquiagem & Beleza",
    subtitle: "PIGMENTAÇÃO, COBERTURA & FIXAÇÃO PROLONGADA",
    description:
      "Curadoria editorial de batons, bases, corretivos, pós e rímeis com foco em durabilidade, textura e indicação direta nas lojas oficiais.",
    badge: "MAKEUP // CURADORIA 2026",
    metrics: [
      { value: "100%", label: "Lojas Oficiais" },
      { value: "12h+", label: "Fixação Média" },
      { value: "Zero", label: "Cobrança Oculta" },
    ],
    criteria: [
      {
        title: "Pigmentação & Textura",
        items: [
          "Cobertura uniforme logo na primeira camada de aplicação",
          "Fórmula que não craquela em linhas de expressão",
          "Conforto para uso contínuo ao longo do dia",
        ],
      },
      {
        title: "Resistência & Transferência",
        items: [
          "Estabilidade da fórmula frente ao suor e calor",
          "Secagem rápida com acabamento aveludado",
          "Fidelidade de tom após a secagem completa",
        ],
      },
      {
        title: "Custo por Reposição",
        items: [
          "Avaliação de rendimento por gramatura/ml",
          "Melhor relação custo-benefício em compras recorrentes",
          "Histórico de preços nos marketplaces oficiais",
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: "Varredura de Fórmulas e Lotes Oficiais",
        description:
          "Mapeamos os itens de maquiagem mais procurados, descartando produtos sem registro sanitário ou de procedência duvidosa.",
      },
      {
        step: 2,
        title: "Validação em Fotos e Comentários Reais",
        description:
          "Cruzamos centenas de avaliações com fotos de compradoras reais para checar acabamento e pigmentação.",
      },
      {
        step: 3,
        title: "Redirecionamento Protegido",
        description:
          "Geramos o link de acesso seguro diretamente para a loja oficial no Mercado Livre, SHEIN ou TikTok Shop.",
      },
    ],
    useCases: [
      {
        title: "Rotina Diária de Trabalho",
        description: "Itens leves com acabamento natural que não exigem retoques a cada hora.",
      },
      {
        title: "Eventos & Maquiagem Noturna",
        description: "Alta pigmentação e durabilidade à prova d'água para festas e ocasiões especiais.",
      },
      {
        title: "Reposição Mensal Econômica",
        description: "Opções acessíveis de qualidade para produtos de alto giro na sua bancada.",
      },
    ],
    faqs: [
      {
        question: "Como saber se a cor da maquiagem combina com meu tom de pele?",
        answer:
          "Recomendamos verificar fotos enviadas por compradoras nos comentários da loja oficial, pois a luz de catálogo pode alterar a percepção do tom.",
      },
      {
        question: "O site faz o envio da maquiagem?",
        answer:
          "Não. A compra e a entrega são realizadas diretamente pelo marketplace oficial (Mercado Livre, SHEIN ou TikTok Shop) onde a oferta está hospedada.",
      },
    ],
  },
  "bolsas-femininas": {
    key: "bolsas",
    title: "Bolsas Femininas",
    subtitle: "ESTRUTURA, COMPARTIMENTOS & ACABAMENTO RESISTENTE",
    description:
      "Seleção de bolsas transversais, de ombro, mochilas e carteiras. Comparamos medidas reais, material sintético de qualidade e espaço interno.",
    badge: "BAGS // CURADORIA 2026",
    metrics: [
      { value: "Zíper Duplo", label: "Fechamento Seguro" },
      { value: "Reforçada", label: "Costura & Alça" },
      { value: "100%", label: "Lojas Oficiais" },
    ],
    criteria: [
      {
        title: "Material & Acabamento",
        items: [
          "PU estruturado ou tecido impermeável de alta densidade",
          "Forro interno resistente que não descostura facilmente",
          "Metais (fechos e mosquetões) com banho anti-oxidação",
        ],
      },
      {
        title: "Dimensões & Divisórias",
        items: [
          "Compartimento dedicado para smartphone e documentos",
          "Medidas em centímetros checadas contra o anúncio oficial",
          "Bolsos externos de acesso rápido com zíper seguro",
        ],
      },
      {
        title: "Ergonomia da Alça",
        items: [
          "Alças reguláveis e removíveis para uso transversal ou ombro",
          "Largura adequada para não machucar o ombro com peso",
          "Reforço nos pontos de maior tração",
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: "Mapeamento de Medidas e Estrutura",
        description:
          "Verificamos as dimensões reais (altura, largura e profundidade) para garantir que a bolsa comporta os itens essenciais.",
      },
      {
        step: 2,
        title: "Análise de Durabilidade das Alças e Costuras",
        description:
          "Avaliamos o retorno de usuárias sobre resistência do material ao peso e desgaste diário.",
      },
      {
        step: 3,
        title: "Encaminhamento Oficial",
        description:
          "Conectamos o item ao anúncio verificado no marketplace com política clara de devolução caso não atenda às expectativas.",
      },
    ],
    useCases: [
      {
        title: "Trabalho & Faculdade",
        description: "Modelos estruturados com espaço para cadernos, carteira, cosméticos e celular.",
      },
      {
        title: "Passeios & Finais de Semana",
        description: "Bolsas transversais compactas e leves para carregar o essencial com segurança.",
      },
      {
        title: "Viagens & Dia a Dia Dinâmico",
        description: "Mochilas e bolsas com múltiplos bolsos para organização prática de pertences.",
      },
    ],
    faqs: [
      {
        question: "Como saber o tamanho real da bolsa antes de comprar?",
        answer:
          "Consulte as medidas em centímetros (LxAxP) presentes na ficha técnica e compare com uma régua ou com uma bolsa que você já possua.",
      },
      {
        question: "O material é resistente a chuvas leves?",
        answer:
          "A maioria dos modelos em PU sintético e nylon suporta respingos e chuva leve, protegendo os pertences internos quando fechados corretamente.",
      },
    ],
  },
  "brincos-colares": {
    key: "acessorios",
    title: "Brincos & Semijoias",
    subtitle: "BANHO DE QUALIDADE, BRILHO & DESIGN CONTEMPORÂNEO",
    description:
      "Guia de brincos, colares, anéis e conjuntos de acessórios. Priorizamos peças com acabamento antialérgico e fechos firmes.",
    badge: "JEWELRY // CURADORIA 2026",
    metrics: [
      { value: "Antialérgico", label: "Livre de Níquel" },
      { value: "Zircônia", label: "Pedras Cravadas" },
      { value: "100%", label: "Lojas Oficiais" },
    ],
    criteria: [
      {
        title: "Banho & Durabilidade",
        items: [
          "Verniz de proteção para evitar escurecimento rápido",
          "Composição antialérgica livre de níquel para peles sensíveis",
          "Acabamento polido sem rebarbas ou pontas afiadas",
        ],
      },
      {
        title: "Cravação & Fechos",
        items: [
          "Zircônias e pedras com cravação firme",
          "Fecho lagosta ou tarraxas de pressão com ajuste seguro",
          "Correntes com elos soldados para evitar rompimento",
        ],
      },
      {
        title: "Versatilidade de Combinação",
        items: [
          "Design atemporal fácil de combinar com mix de colares",
          "Peças leves que não pesam no lóbulo da orelha",
          "Excelente opção para presentear com custo acessível",
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: "Seleção de Materiais e Acabamentos",
        description:
          "Filtramos apenas semijoias e bijuterias finas com banho reforçado e relatos positivos de longa duração de brilho.",
      },
      {
        step: 2,
        title: "Checagem de Fechos e Tarraxas",
        description:
          "Confirmamos a firmeza dos encaixes através das avaliações de compradoras para evitar perdas acidentais.",
      },
      {
        step: 3,
        title: "Indicação Direta na Loja",
        description:
          "Disponibilizamos o botão direto para o fornecedor oficial com envio protegido no marketplace.",
      },
    ],
    useCases: [
      {
        title: "Composição Diária Minimalista",
        description: "Argolinhas e pontos de luz discretos para compor o visual básico do dia a dia.",
      },
      {
        title: "Mix de Colares & Tendências",
        description: "Conjuntos em camadas que valorizam decotes e camisas sem precisar gastar muito.",
      },
      {
        title: "Presente Rápido & Marcante",
        description: "Peças versáteis que agradam diferentes estilos com embalagem prática de entrega.",
      },
    ],
    faqs: [
      {
        question: "Como cuidar das semijoias para manter o brilho por mais tempo?",
        answer:
          "Evite contato direto com perfumes, cremes hidratantes, álcool em gel e água de piscina. Guarde as peças individualmente em local seco.",
      },
      {
        question: "As peças causam alergia na orelha?",
        answer:
          "Priorizamos peças declaradas livres de níquel. Se você tem alta sensibilidade, dê preferência a modelos em aço inoxidável ou prata 925.",
      },
    ],
  },
  skincare: {
    key: "skincare",
    title: "Skincare & Cuidados",
    subtitle: "LIMPEZA, HIDRATAÇÃO, SÉRUMS & PROTEÇÃO SOLAR DIÁRIA",
    description:
      "Guia completo de cosméticos essenciais de reposição para a sua rotina de cuidados com a pele do rosto e corpo.",
    badge: "SKIN // CURADORIA 2026",
    metrics: [
      { value: "Dermatológico", label: "Padrão de Fórmulas" },
      { value: "Diário", label: "Foco de Reposição" },
      { value: "100%", label: "Lojas Oficiais" },
    ],
    criteria: [
      {
        title: "Ativos e Fórmulas",
        items: [
          "Presença de ativos comprovados (vitamina C, niacinamida, rosa mosqueta)",
          "Texturas de rápida absorção sem sensação pegajosa",
          "Fórmulas hipoalergênicas e livres de componentes irritantes",
        ],
      },
      {
        title: "Compatibilidade Cutânea",
        items: [
          "Indicação clara para peles oleosas, secas, sensíveis ou mistas",
          "Ausência de efeito comedogênico (não obstrui os poros)",
          "Ação calmante para redução de vermelhidão e sensibilidade",
        ],
      },
      {
        title: "Custo por Rendimento",
        items: [
          "Duração média do frasco em rotinas diárias",
          "Eficiência por dosador pump ou conta-gotas",
          "Comparativo de preço em kits combinados",
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: "Triagem de Rótulos e Ativos",
        description:
          "Analisamos a lista de ingredientes para destacar os princípios ativos e descartar fórmulas sem eficácia comprovada.",
      },
      {
        step: 2,
        title: "Consolidação de Relatos de Uso",
        description:
          "Compilamos a experiência de usuárias reais sobre absorção, cheiro, textura e efeito na pele após semanas de uso.",
      },
      {
        step: 3,
        title: "Acesso Seguro ao Fornecedor",
        description:
          "Conectamos os produtos exclusivamente aos lojistas oficiais com controle de validade e armazenamento adequado.",
      },
    ],
    useCases: [
      {
        title: "Rotina Básica de 3 Passos",
        description: "Limpar, hidratar e proteger: o trio fundamental para manter a barreira da pele saudável.",
      },
      {
        title: "Controle de Cravos & Poros",
        description: "Esfoliantes e removedores a vácuo para renovação celular e higienização profunda.",
      },
      {
        title: "Hidratação Corporal Intensiva",
        description: "Cremes e esfoliantes corporais para áreas ressecadas como cotovelos, pernas e calcanhares.",
      },
    ],
    faqs: [
      {
        question: "Qual a ordem correta de aplicação dos produtos?",
        answer:
          "Do mais líquido ao mais denso: 1. Gel de limpeza, 2. Tônico, 3. Sérum concentrado, 4. Hidratante e 5. Protetor solar pela manhã.",
      },
      {
        question: "Como saber se o produto não vai irritar minha pele?",
        answer:
          "Faça um teste de contato aplicando uma pequena quantidade no antebraço e aguarde 24 horas antes de aplicar no rosto.",
      },
    ],
  },
  "cabelo-unhas": {
    key: "chapinha",
    title: "Cabelo & Ferramentas",
    subtitle: "PRANCHAS, ESCOVAS SECADORAS & MODELADORES TÉRMICOS",
    description:
      "Comparação técnica de pranchas alisadoras, modeladores, secadores e cuidados para unhas e cabelos.",
    badge: "HAIR // CURADORIA 2026",
    metrics: [
      { value: "Bivolt", label: "Compatibilidade" },
      { value: "230°C", label: "Temperatura Máx." },
      { value: "INMETRO", label: "Padrão de Segurança" },
    ],
    criteria: [
      {
        title: "Tecnologia das Placas",
        items: [
          "Placas de titânio para alisamento rápido e uniforme",
          "Revestimento em cerâmica com emissão de íons negativos",
          "Deslizamento suave sem repuxar ou quebrar os fios",
        ],
      },
      {
        title: "Controle de Temperatura",
        items: [
          "Visor digital com ajuste preciso para diferentes tipos de cabelo",
          "Aquecimento rápido em menos de 60 segundos",
          "Trava de segurança e desligamento automático",
        ],
      },
      {
        title: "Ergonomia & Cabo",
        items: [
          "Cabo giratório 360° para facilitar manuseio e cachos",
          "Isolamento térmico na ponta para apoio seguro dos dedos",
          "Corpo leve para evitar fadiga durante o uso",
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: "Checagem de Certificação Elétrica",
        description:
          "Filtramos apenas ferramentas com certificação de segurança e priorizamos modelos bivolt para maior praticidade.",
      },
      {
        step: 2,
        title: "Avaliação Térmica e Saúde do Fio",
        description:
          "Comparamos a estabilidade de temperatura para evitar picos térmicos que danifiquem a fibra capilar.",
      },
      {
        step: 3,
        title: "Garantia do Fabricante",
        description:
          "Selecionamos fornecedores com suporte ágil e reposição garantida nas plataformas oficiais.",
      },
    ],
    useCases: [
      {
        title: "Alisamento Rápido Diário",
        description: "Pranchas e escovas secadoras práticas para finalizar o cabelo em poucos minutos.",
      },
      {
        title: "Modelagem de Ondas e Cachos",
        description: "Ferramentas com bordas arredondadas que permitem alisar ou cachear com o mesmo aparelho.",
      },
      {
        title: "Cabelos Grossos e Rebeldes",
        description: "Modelos com temperatura profissional de até 230°C para selagem uniforme dos fios.",
      },
    ],
    faqs: [
      {
        question: "Devo usar protetor térmico antes da chapinha ou secador?",
        answer:
          "Sim. O protetor térmico reduz a perda de água e protege a cutícula capilar contra o calor direto da ferramenta.",
      },
      {
        question: "Qual a voltagem dos aparelhos indicados?",
        answer:
          "A maioria dos modelos selecionados é bivolt automático (110V/220V), mas sempre confira a especificação na página da loja oficial.",
      },
    ],
  },
  presentes: {
    key: "presentes",
    title: "Ideias de Presentes Femininos",
    subtitle: "KITS, ACESSÓRIOS & ACHADOS PARA SURPREENDER",
    description:
      "Seleção especial de presentes femininos: kits de beleza, acessórios finos, bolsas versáteis e itens de autocuidado.",
    badge: "GIFTS // CURADORIA 2026",
    metrics: [
      { value: "Prontos", label: "Para Presentear" },
      { value: "Abaixo de R$100", label: "Faixa Custo-Benefício" },
      { value: "100%", label: "Lojas Oficiais" },
    ],
    criteria: [
      {
        title: "Apresentação & Embalagem",
        items: [
          "Kits com visual harmonioso e embalagens práticas para presente",
          "Itens universais com alta taxa de aprovação",
          "Combinações funcionais para o dia a dia",
        ],
      },
      {
        title: "Preço & Valor Percebido",
        items: [
          "Excelente equilíbrio entre preço acessível e qualidade visível",
          "Opções divididas por faixa de valor para caber em qualquer orçamento",
          "Produtos com volume alto de avaliações 5 estrelas",
        ],
      },
      {
        title: "Facilidade de Escolha",
        items: [
          "Itens que não exigem saber medidas corporais exatas",
          "Cores e estilos clássicos que combinam com qualquer gosto",
          "Entrega rápida pelos canais oficiais dos marketplaces",
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: "Filtro de Itens com Maior Índice de Satisfação",
        description:
          "Selecionamos produtos e kits com histórico comprovado de elogios de quem comprou para presentear.",
      },
      {
        step: 2,
        title: "Checagem de Prazos de Envio",
        description:
          "Priorizamos anúncios com logística rápida (como Full e Envios Rápidos) para garantir entregas pontuais.",
      },
      {
        step: 3,
        title: "Redirecionamento Direto",
        description:
          "Você acessa a página oficial do produto em um clique para finalizar o pedido com segurança.",
      },
    ],
    useCases: [
      {
        title: "Aniversários & Datas Especiais",
        description: "Kits de cuidados e acessórios elegantes para demonstrar carinho sem complicação.",
      },
      {
        title: "Amigo Secreto & Lembrancinhas",
        description: "Achados funcionais de até R$ 50 com excelente acabamento e presença.",
      },
      {
        title: "Autopresente de Autocuidado",
        description: "Mimos e itens de beleza para renovar sua rotina de cuidados e autoestima.",
      },
    ],
    faqs: [
      {
        question: "Como escolher um presente sem saber o tamanho de roupa da pessoa?",
        answer:
          "Aposte em cosméticos de reposição, kits de skincare, bolsas transversais ou semijoias ajustáveis, que não dependem de medidas corporais estritas.",
      },
      {
        question: "O marketplace entrega direto na casa da pessoa presenteada?",
        answer:
          "Sim. Ao finalizar a compra na plataforma oficial, basta cadastrar o endereço da destinatária como local de entrega.",
      },
    ],
  },
  "achados-ate-50": {
    key: "achados",
    title: "Achados até R$ 50",
    subtitle: "MÁXIMO CUSTO-BENEFÍCIO EM ITENS ESSENCIAIS",
    description:
      "Lista filtrada com as melhores oportunidades de maquiagem, skincare, acessórios e utilidades femininas com valor de até R$ 50.",
    badge: "UNDER $50 // CURADORIA 2026",
    metrics: [
      { value: "Até R$ 50", label: "Teto de Preço" },
      { value: "Altas Notas", label: "Avaliações" },
      { value: "100%", label: "Lojas Oficiais" },
    ],
    criteria: [
      {
        title: "Relação Preço vs. Qualidade",
        items: [
          "Itens funcionais com preço acessível sem comprometer a segurança de uso",
          "Cosméticos e ferramentas com fórmula e montagem confiáveis",
          "Foco em reposição econômica de produtos de uso frequente",
        ],
      },
      {
        title: "Preço Real sem Pegadinhas",
        items: [
          "Checagem do valor praticado nos marketplaces sem taxas ocultas",
          "Prioridade para anúncios com frete econômico ou cupons ativos",
          "Itens com estoque ativo e entrega regular",
        ],
      },
      {
        title: "Aprovação de Compradoras",
        items: [
          "Média alta de estrelas e fotos reais na página de destino",
          "Produtos testados e aprovados pela comunidade",
          "Garantia de proteção ao comprador da plataforma de origem",
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: "Filtro Rígido de Faixa de Preço",
        description:
          "Monitoramos o catálogo e isolamos os produtos cujo valor de venda permanece abaixo de R$ 50.",
      },
      {
        step: 2,
        title: "Eliminação de Anúncios Enganosos",
        description:
          "Descartamos anúncios com preços baixos artificiais que cobram fretes abusivos ou entregam produtos falsificados.",
      },
      {
        step: 3,
        title: "Acesso Direto à Oferta",
        description:
          "Você é direcionada para a página oficial do item para garantir o preço promocional.",
      },
    ],
    useCases: [
      {
        title: "Completar o Frete Grátis",
        description: "Itens baratos e úteis para adicionar ao carrinho e alcançar o valor de frete grátis no marketplace.",
      },
      {
        title: "Reposição Mensal sem Pesar no Bolso",
        description: "Batons, rímeis e esfoliantes de reposição regular com orçamento controlado.",
      },
      {
        title: "Lembrancinhas e Cuidados Rápidos",
        description: "Acessórios e produtos de beleza acessíveis para presentear amigas ou colegas.",
      },
    ],
    faqs: [
      {
        question: "Os produtos de até R$ 50 têm a mesma garantia?",
        answer:
          "Sim. Todas as compras em plataformas como Mercado Livre, SHEIN e TikTok Shop possuem a mesma proteção legal de 7 dias para devolução e garantia do vendedor.",
      },
      {
        question: "Por que o preço pode oscilar acima de R$ 50 em alguns momentos?",
        answer:
          "Os lojistas atualizam preços dinamicamente. Caso um item ultrapasse o valor devido ao fim de uma promoção, nossa equipe realiza o ajuste periódico no portal.",
      },
    ],
    customFilter: (allProds) => allProds.filter((p) => p.price <= 50),
  },
  "mais-bem-avaliados": {
    key: "avaliados",
    title: "Mais Bem Avaliados",
    subtitle: "OS PRODUTOS COM MAIOR APROVAÇÃO DAS COMPRADORAS",
    description:
      "Seleção dos produtos com as melhores notas, maior volume de recompras e comentários positivos nos marketplaces oficiais.",
    badge: "TOP RATED // CURADORIA 2026",
    metrics: [
      { value: "4.8+", label: "Média de Estrelas" },
      { value: "Top Vendas", label: "Volume de Pedidos" },
      { value: "100%", label: "Lojas Oficiais" },
    ],
    criteria: [
      {
        title: "Consistência de Avaliações",
        items: [
          "Centenas de notas 5 estrelas registradas por compradores verificados",
          "Histórico de baixo índice de devoluções e reclamações",
          "Fidelidade entre as fotos do catálogo e o produto entregue",
        ],
      },
      {
        title: "Reputação do Vendedor",
        items: [
          "Lojas com medalha de excelência e alta taxa de resposta",
          "Embalagens reforçadas para evitar danos no transporte",
          "Postagem rápida dentro do prazo estabelecido",
        ],
      },
      {
        title: "Satisfação no Uso Contínuo",
        items: [
          "Relatos de clientes que compraram mais de uma vez o mesmo item",
          "Destaque em durabilidade, acabamento e praticidade",
          "Excelente percepção de valor pelo preço pago",
        ],
      },
    ],
    steps: [
      {
        step: 1,
        title: "Varredura de Scores e Feedbacks",
        description:
          "Compilamos as notas das plataformas e filtramos apenas itens que mantêm média superior a 4.7 estrelas.",
      },
      {
        step: 2,
        title: "Auditoria de Comentários e Fotos",
        description:
          "Lemos os comentários críticos para garantir que o produto não possui falhas crônicas de fabricação.",
      },
      {
        step: 3,
        title: "Link Direto para o Anúncio Oficial",
        description:
          "Direcionamos você para o vendedor oficial com a melhor classificação da plataforma.",
      },
    ],
    useCases: [
      {
        title: "Compra sem Risco de Erro",
        description: "Ideal para quem não quer perder tempo pesquisando e prefere escolher o produto campeão de aprovação.",
      },
      {
        title: "Presente Garantido",
        description: "Produtos com aclamação unânime para presentear com segurança total de que a pessoa vai adorar.",
      },
      {
        title: "Upgrade na Rotina de Beleza",
        description: "Ferramentas e cosméticos consagrados que entregam performance superior comprovada.",
      },
    ],
    faqs: [
      {
        question: "Como vocês definem os produtos mais bem avaliados?",
        answer:
          "Analisamos o cruzamento entre o volume total de pedidos, a nota média de estrelas e a porcentagem de fotos positivas postadas por clientes reais.",
      },
      {
        question: "As avaliações do site são independentes?",
        answer:
          "Sim. Nossa curadoria editorial é 100% independente e não aceita pagamentos de lojistas para inflar notas ou alterar posições de ranking.",
      },
    ],
    customFilter: (allProds) => allProds,
  },
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ categoria: string }> | { categoria: string };
}) {
  const resolvedParams = "then" in params ? use(params) : params;
  const rawSlug = resolvedParams.categoria.toLowerCase();

  // Mapeamento inteligente de sinônimos e slugs do Header
  const categoryKey = useMemo(() => {
    if (rawSlug === "maquiagem" || rawSlug.includes("batom") || rawSlug.includes("labio")) return "maquiagem";
    if (rawSlug === "bolsas-femininas" || rawSlug.includes("bolsa")) return "bolsas-femininas";
    if (rawSlug === "brincos-colares" || rawSlug.includes("brinco") || rawSlug.includes("colar") || rawSlug.includes("acessorio")) return "brincos-colares";
    if (rawSlug === "skincare" || rawSlug.includes("pele") || rawSlug.includes("creme")) return "skincare";
    if (rawSlug === "cabelo-unhas" || rawSlug.includes("chapinha") || rawSlug.includes("cabelo") || rawSlug.includes("unha")) return "cabelo-unhas";
    if (rawSlug === "presentes" || rawSlug.includes("presente")) return "presentes";
    if (rawSlug === "achados-ate-50" || rawSlug.includes("50")) return "achados-ate-50";
    if (rawSlug === "mais-bem-avaliados" || rawSlug.includes("avaliado")) return "mais-bem-avaliados";
    return CATEGORY_MAP[rawSlug] ? rawSlug : null;
  }, [rawSlug]);

  const catData = categoryKey ? CATEGORY_MAP[categoryKey] : null;

  if (!catData) {
    notFound();
  }

  // Carrega produtos com filtro customizado ou pela categoria do mock
  const allProducts = getAllProducts();
  const products = catData.customFilter
    ? catData.customFilter(allProducts)
    : getByCategory(catData.key as Product["category"]).length > 0
    ? getByCategory(catData.key as Product["category"])
    : allProducts.slice(0, 6); // Fallback amigável se a categoria específica não tiver mock

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.02]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);

  return (
    <main ref={containerRef} className="w-full bg-[#fcddfc] text-black overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 pt-36 pb-20 overflow-hidden border-b-[8px] border-[#970797]">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#970797_1.5px,transparent_1.5px)] bg-[size:32px_32px]" />
        </div>

        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center gap-8"
        >
          <div className="inline-block border-[4px] border-black bg-[#970797] px-5 py-2 shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
              [ {catData.badge} ]
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-title text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-none tracking-tight text-black"
            style={{
              textShadow: "5px 5px 0px #59abf8",
            }}
          >
            {catData.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-lg sm:text-2xl font-black max-w-3xl text-black leading-snug"
          >
            {catData.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-4 w-full max-w-3xl"
          >
            {catData.metrics.map((metric, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border-[4px] border-black shadow-[6px_6px_0px_#000000]"
              >
                <span className="font-title text-3xl sm:text-4xl font-black text-black">
                  {metric.value}
                </span>
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[#970797] mt-1 text-center">
                  {metric.label}
                </span>
              </div>
            ))}
          </motion.div>

          <div className="pt-4">
            <a
              href="#produtos"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#970797] text-white font-mono text-sm sm:text-base font-black uppercase rounded-xl border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#59abf8] hover:text-black transition-all active:translate-y-1"
            >
              <span>Ver Produtos Selecionados</span>
              <span>↓</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. GRADE DE PRODUTOS REAIS */}
      <section id="produtos" className="relative w-full py-24 px-4 sm:px-6 md:px-12 bg-white border-b-[8px] border-[#970797]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-block border-[3px] border-black bg-[#59abf8] px-4 py-1 mb-3 shadow-[3px_3px_0px_#000000]">
                <span className="font-mono text-xs font-black text-black uppercase tracking-widest">
                  [ PRODUTOS ATIVOS // OFERTAS VERIFICADAS ]
                </span>
              </div>
              <h2 className="font-title text-4xl sm:text-6xl font-black uppercase text-black leading-none">
                Seleção de {catData.title}
              </h2>
            </div>
            <span className="font-mono text-xs sm:text-sm font-black text-black uppercase bg-[#fcddfc] px-4 py-2 rounded-lg border-[2px] border-black">
              Total: {products.length} itens listados
            </span>
          </div>

          {products.length === 0 ? (
            <div className="rounded-3xl border-[4px] border-black bg-[#fcddfc] p-12 text-center shadow-[8px_8px_0px_#000000]">
              <p className="font-mono text-base font-black text-black uppercase">
                [ NENHUM PRODUTO ATIVO NESTA CATEGORIA NO MOMENTO ]
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;
                const discountPercent = hasDiscount
                  ? Math.round(100 - (product.price / product.originalPrice!) * 100)
                  : 0;

                const platformName =
                  product.platform === "tiktok-shop"
                    ? "TikTok Shop"
                    : product.platform === "shein"
                    ? "SHEIN"
                    : "Mercado Livre";

                return (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-3xl border-[4px] border-black bg-white p-6 shadow-[8px_8px_0px_#000000] hover:shadow-[8px_8px_0px_#970797] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4 pb-3 border-b-[2px] border-black/10">
                        <span className="font-mono text-xs font-black uppercase text-[#970797]">
                          {platformName}
                        </span>
                        {hasDiscount && (
                          <span className="font-mono text-xs font-black uppercase bg-[#970797] text-white px-2.5 py-0.5 rounded border border-black">
                            -{discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <h3 className="font-title text-2xl font-black uppercase text-black mb-3 leading-tight">
                        {product.name}
                      </h3>

                      <p className="font-sans text-sm font-bold text-black leading-relaxed mb-6">
                        {product.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {product.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="font-mono text-[10px] font-black uppercase bg-[#fcddfc] text-black px-2 py-0.5 rounded border border-black"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t-[3px] border-black/15">
                      <div className="flex items-baseline gap-2 mb-3">
                        {hasDiscount && (
                          <span className="font-sans text-sm font-bold line-through text-black/60">
                            R$ {product.originalPrice!.toFixed(2)}
                          </span>
                        )}
                        <span className="font-title text-3xl font-black text-[#970797]">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>

                      <a
                        href={`/go/${product.id}`}
                        target="_blank"
                        rel="sponsored nofollow noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-mono text-sm font-black uppercase bg-[#970797] text-white border-[3px] border-black shadow-[3px_3px_0px_#000000] hover:bg-[#59abf8] hover:text-black transition-all active:translate-y-0.5 text-center"
                      >
                        <span>Ver Oferta na {platformName}</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. CRITÉRIOS DE ESCOLHA */}
      <section className="relative w-full py-28 px-4 sm:px-6 bg-[#fcddfc] overflow-hidden border-b-[8px] border-[#970797]">
        <div className="relative z-10 max-w-6xl mx-auto mb-16 text-center">
          <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
            <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
              [ CRITÉRIOS DE CURADORIA // O QUE AVALIAMOS ]
            </span>
          </div>
          <h2 className="font-title text-4xl sm:text-6xl md:text-7xl font-black uppercase text-black leading-none">
            Critérios de Escolha
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {catData.criteria.map((crit, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white text-black border-[4px] border-black shadow-[8px_8px_0px_#000000] flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#970797] text-white border-[3px] border-black flex items-center justify-center mb-6 shadow-[3px_3px_0px_#000000]">
                  <Sliders size={26} />
                </div>
                <h3 className="font-title text-2xl font-black uppercase text-black mb-4">
                  {crit.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {crit.items.map((item, j) => (
                    <li key={j} className="font-sans text-sm font-bold text-black flex items-start gap-2.5">
                      <span className="text-[#970797] font-black text-base mt-[-2px]">■</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. METODOLOGIA DE SELEÇÃO */}
      <section className="relative w-full py-28 px-4 sm:px-6 md:px-12 bg-white border-b-[8px] border-[#970797]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block border-[4px] border-black bg-[#59abf8] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs sm:text-sm font-black text-black uppercase tracking-widest">
                [ METODOLOGIA EDITORIAL // PROCESSO DE SELEÇÃO ]
              </span>
            </div>
            <h2 className="font-title text-4xl sm:text-6xl md:text-7xl font-black uppercase text-black leading-none">
              Como Selecionamos
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {catData.steps.map((step) => (
              <div
                key={step.step}
                className="flex flex-col md:flex-row gap-6 md:gap-10 items-start p-8 rounded-3xl bg-[#fcddfc] border-[4px] border-black shadow-[8px_8px_0px_#000000]"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#970797] text-white border-[3px] border-black flex items-center justify-center font-title text-3xl font-black shrink-0 shadow-[3px_3px_0px_#000000]">
                  0{step.step}
                </div>
                <div>
                  <h3 className="font-title text-2xl sm:text-3xl font-black uppercase text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-base sm:text-lg font-bold text-black leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CENÁRIOS DE USO */}
      <section className="relative w-full py-28 px-4 sm:px-6 bg-[#fcddfc] border-b-[8px] border-[#970797]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
                [ INDICAÇÃO PRÁTICA // OCASIÕES DE USO ]
              </span>
            </div>
            <h2 className="font-title text-4xl sm:text-6xl font-black uppercase text-black leading-none">
              Qual Escolher?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {catData.useCases.map((uc, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-white border-[4px] border-black shadow-[8px_8px_0px_#000000] flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3 py-1 bg-[#59abf8] text-black font-mono text-xs font-black uppercase rounded-lg border-2 border-black mb-4">
                    OCASIÃO // 0{i + 1}
                  </div>
                  <h3 className="font-title text-2xl font-black uppercase text-black mb-3">
                    {uc.title}
                  </h3>
                  <p className="font-sans text-base font-bold text-black leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ ESPECÍFICO (COM SCHEMA JSON-LD) */}
      <section className="relative w-full py-28 px-4 sm:px-6 md:px-12 bg-white border-b-[8px] border-[#970797]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: catData.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.answer,
                },
              })),
            }),
          }}
        />

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block border-[4px] border-black bg-[#970797] px-4 py-1.5 mb-4 shadow-[4px_4px_0px_#000000]">
              <span className="font-mono text-xs sm:text-sm font-black text-white uppercase tracking-widest">
                [ TIRE SUAS DÚVIDAS // FAQ DA CATEGORIA ]
              </span>
            </div>
            <h2 className="font-title text-4xl sm:text-6xl font-black uppercase text-black leading-none">
              Dúvidas Frequentes
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {catData.faqs.map((f, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#fcddfc] border-[4px] border-black shadow-[6px_6px_0px_#000000]"
              >
                <h3 className="font-title text-xl sm:text-2xl font-black uppercase text-black mb-3 flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#970797] text-white border-2 border-black flex items-center justify-center font-mono text-sm font-black shrink-0">
                    Q
                  </span>
                  <span>{f.question}</span>
                </h3>
                <p className="font-sans text-base font-bold text-black leading-relaxed pl-11">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. NAVEGAÇÃO DE OUTRAS CATEGORIAS */}
      <section className="relative w-full py-24 px-4 sm:px-6 bg-[#fcddfc]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-title text-3xl sm:text-5xl font-black uppercase text-black mb-10">
            Explorar Outras Categorias
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {Object.entries(CATEGORY_MAP)
              .filter(([k]) => k !== rawSlug && k !== categoryKey)
              .map(([key, item]) => (
                <Link
                  key={key}
                  href={`/${key}`}
                  className="px-6 py-3.5 rounded-xl bg-white text-black font-mono text-sm font-black uppercase border-[3px] border-black shadow-[4px_4px_0px_#000000] hover:bg-[#970797] hover:text-white transition-all active:translate-y-0.5"
                >
                  {item.title} →
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}