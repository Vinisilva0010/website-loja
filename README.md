1. Regra principal do projeto
O site não será uma loja com checkout próprio. Ele será um site editorial de descoberta, curadoria e comparação de produtos femininos, com encaminhamento para marketplaces.

O usuário:

encontra o produto ou guia no seu site;

entende para quem o produto serve;

compara características e alternativas;

clica em um botão;

é levado à página oficial do produto na SHEIN, Mercado Livre ou TikTok Shop;

conclui a compra na plataforma externa.

A IA que modificar o código deve preservar:

estrutura de SEO existente;

URLs que já recebem tráfego, quando possível;

sitemap;

robots;

canonical;

schema;

FAQ;

blog;

performance;

responsividade;

acessibilidade;

componentes reutilizáveis.

A IA não deve apagar a estrutura antiga simplesmente porque o conteúdo mudou. Deve trocar a semântica, o texto, os dados e os links, mantendo o que tecnicamente já está funcionando.

O posicionamento do site deve ser:

Uma plataforma de curadoria que ajuda mulheres a encontrar, comparar e escolher maquiagem, bolsas, acessórios e produtos de beleza vendidos em marketplaces confiáveis.

Não use linguagem que dê a entender que o seu site processa o pagamento ou é o vendedor oficial.

O conteúdo precisa ser original e útil. O Google recomenda páginas feitas para pessoas, com conteúdo confiável e único, e considera problemáticas páginas criadas em escala apenas para gerar tráfego ou comissão.

2. Prompt global para enviar à outra IA
Use este texto no começo de cada solicitação:

text
Estou transformando este projeto existente em um site afiliado editorial de produtos femininos.

O projeto já possui domínio indexado, estrutura de SEO, sitemap, robots.txt, metadados, FAQ, blog, schema e componentes reutilizáveis. NÃO recrie o projeto do zero e NÃO remova funcionalidades existentes sem justificar.

O modelo comercial é:
- o site apresenta e analisa produtos;
- o usuário vê informações, comparação, vantagens e pontos de atenção;
- o usuário clica em um CTA;
- o CTA leva para a página oficial do produto em uma plataforma externa, como Mercado Livre, SHEIN ou TikTok Shop;
- a compra e o pagamento não acontecem no meu site.

Regras obrigatórias:
1. Preserve a arquitetura técnica e os recursos de SEO que já existem.
2. Substitua o conteúdo antigo pelo nicho de maquiagem, beleza, bolsas, acessórios e presentes femininos.
3. Não copie descrições de marketplaces.
4. Não invente testes, avaliações, descontos, preços, estoque ou experiência pessoal.
5. Diferencie claramente informação fornecida pelo vendedor, curadoria editorial e experiência própria.
6. Use português brasileiro natural.
7. Escreva para pessoas, não para preencher palavras-chave.
8. Use termos semânticos relacionados à intenção do usuário, sem keyword stuffing.
9. Os links de afiliado devem usar rel="sponsored" e podem incluir nofollow.
10. O botão deve informar que o usuário será levado para a plataforma externa.
11. Não apresente o site como responsável pelo pagamento, frete, troca ou entrega.
12. Preserve URLs importantes e evite criar páginas duplicadas.
13. O conteúdo visível deve ser compatível com os dados estruturados.
14. Toda alteração deve ser responsiva, acessível e compatível com SEO técnico.
15. Ao terminar, explique quais trechos foram alterados e se algum schema, metadata ou URL precisa de atenção.
O Google recomenda que links de afiliados sejam identificados com rel="sponsored"; nofollow continua sendo uma opção aceitável.

3. Hero da página inicial
A hero deve responder imediatamente:

o que o site oferece;

para quem é;

quais categorias existem;

por que o usuário deveria confiar;

qual ação deve realizar.

Texto recomendado
text
Eyebrow:
GUIAS, ACHADOS E OFERTAS FEMININAS

H1:
Encontre produtos femininos que combinam com você

Subheadline:
Descubra maquiagem, bolsas, acessórios e produtos de beleza selecionados em grandes plataformas. Compare detalhes, veja para quem cada produto é indicado e acesse a oferta diretamente no marketplace.

CTA primário:
Explorar produtos

CTA secundário:
Ver achados da semana

Texto de confiança:
Curadoria independente • Informações organizadas • Compra realizada na plataforma oficial
Alternativa mais comercial
text
H1:
Maquiagem e acessórios femininos escolhidos para comprar melhor

Subheadline:
Encontre produtos bonitos, úteis e bem avaliados para o dia a dia, presentes e ocasiões especiais. Nós ajudamos você a decidir; a compra acontece diretamente no marketplace.

CTA:
Encontrar meu próximo produto
O que a IA deve implementar
text
- Usar apenas um H1 na hero.
- Incluir a expressão principal de forma natural.
- Não colocar uma lista enorme de palavras-chave escondidas.
- Adicionar links HTML reais para categorias.
- Usar imagem com alt descritivo.
- Não usar texto importante apenas dentro de uma imagem.
- Manter boa leitura no mobile.
- Garantir contraste acessível.
- Não usar “compre aqui” se o checkout não ocorrer no site.
O Google recomenda títulos e headings descritivos, texto acessível, links rastreáveis e conteúdo visual acompanhado por contexto textual.

Categorias abaixo da hero
text
Maquiagem
Bolsas femininas
Brincos e colares
Skincare
Cabelo e unhas
Presentes femininos
Achados até R$ 50
Mais bem avaliados
Cada categoria deve ser um link para uma página própria. Não faça cards apenas com imagem e texto visual; o nome da categoria deve estar em HTML e o link deve usar um <a href="..."> rastreável.

4. Navbar
Estrutura recomendada
text
Início
Maquiagem
Beleza
Acessórios
Bolsas
Presentes
Guias
Ofertas
Menu secundário ou rodapé:

text
Sobre nós
Como funciona
Transparência de afiliados
Contato
Política de privacidade
Termos de uso
Regras para a navbar
Não use “Loja” se o site não vender diretamente.

Prefira “Produtos”, “Achados” ou “Explorar”.

Não esconda categorias importantes atrás de JavaScript inacessível.

Use links <a> com href.

Os textos dos links devem ser específicos.

Evite vários links chamados apenas “Clique aqui”.

Mantenha a hierarquia curta.

Não crie links para páginas vazias ou sem conteúdo exclusivo.

Use o mesmo nome de categoria em navbar, breadcrumbs, H1 e links internos.

Exemplo correto:

xml
<a href="/maquiagem/batons">Batons</a>
Exemplo fraco:

xml
<a href="/categoria/123">Clique aqui</a>
O Google usa o texto do link para compreender a página de destino e recomenda que cada página importante seja alcançável por pelo menos um link rastreável.

5. Cards de produtos
O card é responsável por gerar o clique, mas não pode parecer um anúncio enganoso.

Estrutura de cada card
text
Imagem
Categoria
Nome do produto
Resumo de uma frase
Indicado para
Faixa de preço ou “ver preço atual”
Plataforma
Status de disponibilidade, se confirmado
Botão
Exemplo visual
text
BOLSA FEMININA

Bolsa transversal pequena com alça ajustável

Para: passeios, uso diário e looks casuais

A partir de R$ XX,XX*
Disponível no Mercado Livre

Ver oferta no Mercado Livre
Rodapé do card:

text
*O preço, frete, estoque e prazo podem mudar na plataforma.
Regras do card
Não use “menor preço” sem comparar fontes.

Não mostre preço antigo se ele não tiver sido verificado.

Não use “oferta imperdível” em todos os cards.

Não invente nota ou número de avaliações.

Não diga “produto testado” se você não testou.

Exiba a plataforma de destino.

O CTA deve indicar o redirecionamento.

O link deve ter rel="sponsored nofollow".

O card deve apontar para uma página editorial sua ou diretamente para a plataforma, conforme o objetivo.

A imagem deve ter alt específico.

Código de link
tsx
<a
  href={affiliateUrl}
  target="_blank"
  rel="sponsored nofollow noopener noreferrer"
  aria-label={`Ver oferta de ${product.name} no ${product.marketplace}`}
>
  Ver oferta no {product.marketplace}
</a>
noopener e noreferrer são boas práticas de segurança para links que abrem nova aba; sponsored identifica a relação de afiliado.

Alt das imagens
text
Alt ruim:
"produto feminino"

Alt melhor:
"Bolsa transversal feminina preta com alça ajustável"

Alt para maquiagem:
"Batom matte rosa queimado em embalagem preta"
Não repita palavras-chave artificialmente no alt. O alt deve descrever a imagem para acessibilidade.

6. Página de categoria
As páginas de categoria devem ter conteúdo próprio, não apenas uma grade de cards.

Estrutura
text
Breadcrumb:
Início > Acessórios > Bolsas femininas

H1:
Bolsas femininas para diferentes estilos e ocasiões

Introdução:
Encontre bolsas femininas selecionadas para uso diário, trabalho, faculdade, passeios e eventos. Organizamos os modelos por tamanho, material, formato e ocasião para facilitar a sua escolha.

Bloco de filtros:
Tipo, tamanho, cor, ocasião, faixa de preço

Grade de produtos

Seção:
Como escolher uma bolsa feminina

Seção:
Melhores bolsas para cada ocasião

Seção:
Perguntas frequentes

Links internos:
Guias relacionados e categorias próximas
Texto de categoria recomendado
text
Antes de escolher uma bolsa feminina, observe o tamanho, o material, o tipo de alça, a quantidade de compartimentos e a ocasião de uso. Uma bolsa pequena pode ser prática para passeios, enquanto modelos maiores costumam atender melhor ao trabalho ou à faculdade. Confira sempre as medidas informadas no anúncio.
SEO da categoria
text
Title:
Bolsas femininas: modelos para todos os estilos e ocasiões

Meta description:
Veja bolsas femininas selecionadas para uso diário, trabalho, faculdade e passeios. Compare tamanhos, estilos e ofertas em marketplaces.

H1:
Bolsas femininas para diferentes estilos e ocasiões

URL:
/acessorios/bolsas-femininas
A categoria deve ter texto suficiente para explicar o assunto, mas sem criar um bloco artificial de palavras-chave. O Google recomenda conteúdo exclusivo, títulos descritivos, URLs compreensíveis e contexto textual para listas de produtos.

7. Página individual do produto
A página individual deve ser uma página editorial de decisão de compra.

Estrutura obrigatória
text
Breadcrumb
H1 com nome específico do produto
Resumo rápido
Imagem principal
Galeria, se houver autorização de uso
Plataforma
Preço ou indicação de verificação
Botão para a plataforma
Para quem é indicado
Pontos positivos
Pontos de atenção
Características
Como usar ou combinar
Comparação com alternativas
Perguntas frequentes
Aviso de afiliado
Botão final
Produtos relacionados
Exemplo de conteúdo
text
H1:
Bolsa transversal feminina pequena: análise, medidas e onde encontrar

Resumo:
Esta bolsa transversal feminina é indicada para quem quer carregar itens essenciais em passeios e no dia a dia. Antes de comprar, confira as medidas, o material e o comprimento da alça no anúncio.

Pontos positivos:
- Modelo compacto para itens essenciais.
- Alça transversal que deixa as mãos livres.
- Pode combinar com looks casuais.

Pontos de atenção:
- O tamanho pode não comportar cadernos ou notebooks.
- A capacidade depende das medidas reais do modelo.
- A cor visual pode variar conforme a tela.

Indicado para:
- Passeios.
- Uso casual.
- Pessoas que preferem bolsas leves e compactas.

Não é a melhor opção para:
- Quem precisa carregar muitos objetos.
- Uso com notebook.
- Quem prefere bolsas grandes.
O que não fazer
Não copie:

título do marketplace;

descrição do vendedor;

avaliações de compradores;

fotos protegidas sem permissão;

frases como “produto premium” sem base;

nota média sem informar a origem;

“testamos e aprovamos” sem teste real.

O Google recomenda reviews com critérios claros, comparação, benefícios, limitações, evidências e experiência verdadeira.

Se você ainda não testou o produto, use um formato honesto:

text
Esta é uma análise editorial baseada nas informações disponíveis no anúncio, nas especificações declaradas e na comparação com produtos semelhantes. Não realizamos teste físico deste item.
Isso é melhor do que fingir experiência.

8. Dados do produto e preço
Como o seu site não é o vendedor, trate preço e estoque como dados externos e temporários.

Interface recomendada
text
Preço verificado em 25 de agosto de 2026

Ver preço atual no Mercado Livre
ou:

text
Confira o preço e a disponibilidade atuais na SHEIN
Campos recomendados
ts
type Product = {
  name: string
  slug: string
  description: string
  editorialSummary: string
  category: string
  marketplace: string
  affiliateUrl: string
  imageUrl: string
  price?: number
  currency?: "BRL"
  priceCheckedAt?: string
  availability?: "in_stock" | "out_of_stock" | "unknown"
  sellerName?: string
  brand?: string
  specifications: Record<string, string>
  pros: string[]
  cons: string[]
  idealFor: string[]
  notIdealFor: string[]
  faq: Array<{
    question: string
    answer: string
  }>
}
Se o preço ou estoque estiver desatualizado:

não apresente como atual;

altere para “ver preço atual”;

marque como “informação não confirmada”;

atualize o dado;

encaminhe o usuário para conferir na plataforma.

Informações visíveis e dados estruturados não devem contradizer o estado real do produto.

9. Schema e SEO estruturado
Preserve os schemas que já existem, mas revise o conteúdo para não manter entidades do nicho antigo.

Home
Use:

text
Organization
WebSite
BreadcrumbList, se houver breadcrumb visível
O Organization deve representar a sua marca e conter dados reais, como nome, logo, URL, redes sociais e contato. O Google explica que esse schema ajuda a desambiguar a organização.

Artigos do blog
Use:

text
Article
BreadcrumbList
Organization ou Person como autor, com dados reais
Não use autor inventado ou especialista fictício.

Categorias
Use:

text
CollectionPage
BreadcrumbList
ItemList, quando a lista de produtos estiver realmente visível
Páginas de produto editorial
Use Product somente quando a página realmente descreve um produto específico.

Não coloque preço, avaliação e disponibilidade falsos. Se não houver dados confiáveis, é preferível um Product mais simples do que um schema completo com informações incorretas.

Review e AggregateRating
Só use:

text
Review
AggregateRating
quando:

a avaliação estiver visível na página;

você souber a origem;

os números forem reais;

o conteúdo não for simplesmente copiado;

a nota representar corretamente o que está sendo mostrado.

Não coloque 5 estrelas apenas para tentar ganhar rich result.

FAQ
O FAQ deve aparecer visivelmente na página. Não use FAQ escondido apenas no JSON-LD.

Exemplos para uma página de bolsa:

text
A bolsa cabe celular e carteira?
Depende das medidas informadas no anúncio. Confira largura, altura e profundidade antes de comprar.

A cor recebida será exatamente igual à foto?
Pode haver variação por iluminação, edição da imagem e configuração da tela. Consulte as fotos e as opções disponíveis na plataforma.

Onde a compra é finalizada?
A compra é finalizada na plataforma indicada no botão, como Mercado Livre, SHEIN ou TikTok Shop.

O site aceita pagamento?
Não. O pagamento, frete, entrega, troca e atendimento do pedido são responsabilidade da plataforma e do vendedor informado no destino.
O Google recomenda validar dados estruturados com o Rich Results Test e verificar as URLs no Search Console.

10. Footer
O footer precisa fortalecer confiança e explicar o modelo.

Estrutura
text
Sobre a marca
Produtos
Maquiagem
Beleza
Acessórios
Bolsas
Presentes

Conteúdo
Guias de compra
Comparativos
Blog
Achados da semana

Transparência
Como funcionam os links
Aviso de afiliados
Política de privacidade
Termos de uso
Contato
Texto de afiliado
text
Este site pode utilizar links de afiliados. Se você realizar uma compra por meio de um desses links, podemos receber uma comissão, sem custo adicional para você. Os preços, formas de pagamento, frete, estoque, entrega, trocas e atendimento são definidos pela plataforma e pelo vendedor responsável.
Texto “como funciona”
text
Nós selecionamos e organizamos produtos encontrados em plataformas de venda. Nosso objetivo é facilitar a pesquisa, explicar diferenças e ajudar você a decidir. Ao clicar em “Ver oferta”, você será encaminhada para a plataforma indicada, onde poderá conferir o preço atual e concluir a compra com segurança.
Não use “compra segura” como garantia absoluta. Prefira:

text
A compra é concluída diretamente na plataforma de destino, conforme as regras e proteções oferecidas por ela.
11. Blog
O blog deve trazer usuários que ainda estão pesquisando, não somente pessoas prontas para comprar.

Clusters de conteúdo
Maquiagem
text
Como montar uma nécessaire básica
Maquiagem para iniciantes: o que comprar primeiro
Batom matte ou gloss: diferenças e usos
Como escolher base para pele oleosa
Produtos de maquiagem para o dia a dia
Acessórios
text
Como escolher brincos para cada ocasião
Acessórios dourados ou prateados
Como combinar bolsa com roupa
Como limpar bijuterias
Acessórios femininos para presentear
Compra
text
O que observar antes de comprar em marketplace
Como conferir medidas de uma bolsa online
Como avaliar fotos e descrições de produtos
Como comparar ofertas em diferentes plataformas
Modelo de artigo
text
Title
Meta description
H1
Resposta curta inicial
Índice
Introdução
Critérios de escolha
Comparação
Recomendações
Pontos de atenção
FAQ
Links para produtos
Links para categorias
Data de publicação
Data de atualização
Autor real
Aviso de afiliado, quando houver
Exemplo de início
text
Escolher uma bolsa feminina online fica mais fácil quando você compara três pontos: medidas, material e ocasião de uso. Para passeios, modelos compactos podem ser suficientes; para trabalho ou faculdade, é importante verificar se o tamanho comporta os objetos que você costuma carregar.
O artigo deve responder a intenção principal logo no começo e depois aprofundar.

Não publique artigos genéricos como:

text
10 produtos incríveis que você precisa comprar agora
Prefira:

text
Como escolher uma bolsa transversal feminina: medidas, materiais e ocasiões
12. Páginas institucionais e confiança
Crie ou adapte:

Sobre nós
Explique:

quem mantém o site;

qual é o objetivo;

como os produtos são selecionados;

se existe teste físico;

como os preços são atualizados;

como funciona a comissão.

Metodologia de seleção
text
Consideramos:
- utilidade para uma situação específica;
- clareza das informações;
- medidas e características;
- avaliações disponíveis, quando verificáveis;
- relação entre preço e proposta;
- variedade de alternativas;
- disponibilidade na plataforma;
- facilidade de comparação.
Contato
Use um canal verdadeiro. Não invente endereço físico, empresa, equipe ou certificação.

Política editorial
Explique a diferença entre:

descrição do fabricante;

informação do vendedor;

análise editorial;

teste próprio;

opinião baseada em comparação.

Essa transparência ajuda a evitar que o site pareça uma coleção automática de páginas.

13. Configurações técnicas que a IA deve revisar
Envie esta lista junto com o código de configuração:

text
Revise sem destruir a implementação atual:

- title padrão da aplicação;
- template de title por página;
- meta description;
- canonical;
- Open Graph;
- Twitter/X metadata;
- favicon;
- robots;
- sitemap;
- URLs de categorias;
- URLs de produtos;
- breadcrumbs;
- JSON-LD;
- idioma pt-BR;
- lang="pt-BR";
- headings;
- alt das imagens;
- links internos;
- noindex para páginas sem valor;
- tratamento de parâmetros de filtros;
- páginas 404;
- redirects;
- status 301;
- páginas fora de estoque;
- renderização no servidor;
- performance mobile;
- carregamento de imagens;
- acessibilidade;
- Search Console;
- Rich Results Test.
A estrutura técnica existente só ajuda se o conteúdo novo também estiver acessível para o rastreador. O Google recomenda HTML acessível, links rastreáveis, sitemap, títulos descritivos e conteúdo textual para elementos visuais.

14. Regras para URLs e conteúdo antigo
Como o domínio já está indexado, não troque tudo sem planejamento.

Se a URL antiga tem tráfego ou backlinks
mantenha a URL quando o assunto puder ser adaptado;

altere title, H1, conteúdo e schema;

preserve a intenção de busca, se possível.

Se a URL antiga não tem relação nenhuma
faça redirect 301 para uma página realmente relacionada;

não redirecione tudo para a home;

se não existir destino relevante, avalie 410 ou remoção;

atualize o sitemap;

remova links internos antigos.

O canonical ajuda a indicar a versão principal de conteúdo duplicado, mas não transforma automaticamente uma página diferente na URL correta.

Exemplo
text
Antiga:
/produto/caneca-personalizada

Nova intenção:
/acessorios/bolsas/bolsa-transversal-feminina
Não faça redirect apenas porque a página antiga tem autoridade. O destino deve fazer sentido para o usuário.

15. Checklist de cada página
A outra IA deve verificar isto antes de entregar cada página:

text
[ ] Existe apenas um H1.
[ ] O H1 descreve claramente a intenção da página.
[ ] O title é único.
[ ] A meta description é única.
[ ] A URL é curta e coerente.
[ ] A página tem conteúdo original.
[ ] O texto não foi copiado do marketplace.
[ ] Há links internos relevantes.
[ ] Os links externos de afiliado usam rel="sponsored".
[ ] O CTA informa a plataforma de destino.
[ ] O preço tem data de verificação ou não é apresentado como atual.
[ ] O estoque não é inventado.
[ ] A imagem tem alt descritivo.
[ ] O conteúdo funciona sem depender apenas de JavaScript.
[ ] O schema corresponde ao conteúdo visível.
[ ] O FAQ aparece na tela.
[ ] A página possui breadcrumb quando aplicável.
[ ] A página é útil mesmo sem o clique no link de afiliado.
[ ] Existe aviso de afiliado.
[ ] A página funciona no mobile.
[ ] A acessibilidade básica foi preservada.
[ ] A canonical aponta para a URL correta.
[ ] A URL está incluída no sitemap se for indexável.
16. Prompt específico para a hero
Quando você mandar o código da hero, use:

text
Vamos adaptar esta Hero para um site editorial afiliado de produtos femininos.

Mantenha a estrutura visual, os componentes, as animações, a responsividade e o estilo do projeto atual, mas substitua completamente a mensagem antiga.

Objetivos:
- deixar claro que o site reúne maquiagem, beleza, bolsas e acessórios;
- mostrar que o site ajuda a pesquisar e comparar;
- deixar claro que a compra acontece em marketplaces externos;
- usar um H1 único;
- incluir uma promessa concreta;
- criar CTA para explorar produtos;
- criar CTA secundário para guias ou achados;
- inserir links rastreáveis para categorias;
- não prometer desconto, menor preço ou segurança que não possa ser comprovada;
- não usar keyword stuffing;
- preservar acessibilidade, contraste, alt e performance.

Use este conteúdo como base:
Eyebrow: GUIAS, ACHADOS E OFERTAS FEMININAS
H1: Encontre produtos femininos que combinam com você
Subheadline: Descubra maquiagem, bolsas, acessórios e produtos de beleza selecionados em grandes plataformas. Compare detalhes, veja para quem cada produto é indicado e acesse a oferta diretamente no marketplace.
CTA primário: Explorar produtos
CTA secundário: Ver guias de compra

Depois:
1. entregue o código atualizado;
2. explique cada alteração;
3. informe qual é o H1;
4. informe os links internos criados;
5. confirme que nenhum SEO técnico existente foi removido.
17. Prompt específico para cards
text
Vamos adaptar estes cards para produtos afiliados de maquiagem, beleza e acessórios femininos.

Preserve o componente e o design atual, mas revise:
- nome do produto;
- categoria;
- resumo editorial;
- imagem e alt;
- marketplace;
- preço, sem inventar;
- data de verificação;
- disponibilidade;
- CTA;
- aria-label;
- rel="sponsored nofollow noopener noreferrer";
- texto indicando que o usuário será levado para a plataforma externa.

O card não pode:
- copiar descrição do marketplace;
- inventar nota;
- inventar avaliação;
- chamar algo de “melhor” sem critério;
- apresentar o site como vendedor;
- prometer preço fixo;
- esconder o destino do link.

O card deve continuar útil, acessível, responsivo e rastreável.
18. Prompt específico para produto
text
Adapte esta página de produto para uma página editorial de afiliado.

Preserve a estrutura técnica, mas implemente:
- breadcrumb;
- H1 específico;
- resumo rápido;
- para quem é;
- para quem não é;
- pontos positivos;
- pontos de atenção;
- especificações;
- comparação com alternativas;
- FAQ visível;
- aviso de afiliado;
- CTA com marketplace explícito;
- data de verificação do preço;
- disponibilidade somente quando confirmada;
- links internos para categoria e guias relacionados.

Não invente experiência de uso. Se não houver teste físico, diga que a análise foi feita com base nas informações disponíveis e na comparação editorial.

Revise o JSON-LD para que ele corresponda ao conteúdo visível. Não inclua review, AggregateRating, preço ou estoque sem dados reais. Mantenha canonical, metadata e sitemap.
19. Prompt específico para blog
text
Adapte este artigo para o nicho de produtos femininos afiliados.

Mantenha o sistema de blog, autor, data, schema, sitemap e URLs quando forem aproveitáveis.

O artigo deve:
- responder a uma intenção específica;
- começar com uma resposta direta;
- usar subtítulos claros;
- incluir critérios de escolha;
- apresentar vantagens e limitações;
- ter exemplos práticos;
- linkar para categorias e produtos relacionados;
- indicar quando uma informação vem do vendedor;
- não copiar conteúdo de marketplace;
- não inventar testes;
- incluir FAQ visível;
- usar Article e BreadcrumbList se forem compatíveis;
- conter aviso de afiliado quando houver links comerciais.

Crie title, meta description, H1, slug e links internos coerentes com o tema.
20. O que você deve trocar primeiro
Como você está fazendo a migração página por página, siga esta ordem:

identidade global e nome da marca;

layout global;

navbar;

hero;

categorias da home;

cards de produtos;

página de categoria;

página individual do produto;

footer;

textos de transparência;

blog;

FAQ;

schema;

metadata dinâmica;

sitemap e redirects;

analytics e eventos de clique;

revisão final de URLs antigas.

Não comece pelos textos aleatórios. Primeiro defina a promessa da marca, a arquitetura de categorias e o modelo de dados dos produtos. Depois todos os componentes poderão receber os mesmos campos sem inconsistência.