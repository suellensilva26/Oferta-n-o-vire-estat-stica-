# Oferta e Projeto — Kit Não Vire Estatística

Connect Mídia · Documento mestre da oferta, da nova estrutura de anúncios, dos prompts do HeyGen e de tudo o que falta · versão de 30/10/2026

> Como usar este documento: a Parte 1 explica a oferta. A Parte 2 é a nova estrutura de anúncios, refeita do zero. A Parte 3 traz os prompts prontos para colar no HeyGen. A Parte 4 lista as regras que não podem ser quebradas, e a Parte 5 diz o que falta para tudo ficar 100% no ar, em ordem e com responsável. As campanhas estão no documento "Guia de Campanhas Meta Ads".

---

## PARTE 1 — A OFERTA

### 1.1 O que é
**Kit Não Vire Estatística — Plano de Blindagem Empresarial 2027–2030** é um produto digital de baixo valor (low ticket) que ajuda o pequeno e médio empresário brasileiro a se preparar para três ameaças ao mesmo tempo:
1. **O juro alto e o crédito caro.** A Selic está em 13,75% ao ano desde 16/09/2026 (Banco Central).
2. **O calote recorde.** Em agosto de 2026 havia 9,3 milhões de empresas inadimplentes, o maior número da série (Serasa Experian). Em 2025 foram 2.466 pedidos de recuperação judicial, também recorde.
3. **A Reforma Tributária, que já é lei.** Em 01/01/2027 PIS e Cofins acabam e entra a CBS. O split payment começa de forma gradual no 2º semestre de 2027. Entre 2029 e 2032, ICMS e ISS são trocados pelo IBS, e em 2033 o modelo novo fica completo.

### 1.2 Público (avatar)
| Nicho | Quem é | Dor principal | O que ele pensa |
|---|---|---|---|
| **A · Comércio e alimentação** | Dono de loja, mercado, restaurante, lanchonete, e-commerce. Tem 30 a 60 anos e 1 a 30 funcionários | Caixa apertado, venda parcelada, estoque parado, maquininha cara | "Se a Casas Bahia pediu recuperação, o que vai ser de mim?" |
| **B · Serviços** | Clínica, salão, agência, escritório, escola, academia, prestador PJ | O ISS vai acabar, o preço por hora está errado, o cliente atrasa | "Vou acabar trabalhando de graça com o imposto novo?" |
| **C · Indústria, agro e B2B** | Pequena indústria, distribuidora, produtor rural, quem vende para empresas | Crédito de imposto, contratos, prazo de recebimento, split payment | "Meu cliente vai exigir crédito de CBS e eu não sei calcular." |

Em todos os nichos a pessoa não entende a reforma, não confia no "vai passar" e não tem diretor financeiro. Ela quer **um plano simples, uma tarefa por dia**.

### 1.3 Promessa
"Em 30 dias, saiba exatamente o que fazer no seu caixa, nos seus preços e nos seus impostos para atravessar 2027–2030 sem virar estatística, mesmo sem ser economista."

### 1.4 Mecanismo único: Método dos 3 Escudos
- **Escudo do Caixa:** fluxo de caixa de 13 semanas, régua de cobrança e regra para venda a prazo.
- **Escudo da Margem:** preço recalculado já simulando o imposto novo, mais o corte do estoque ou da hora parada.
- **Escudo Fiscal:** checklist da reforma por segmento e as 12 perguntas para levar ao contador.

### 1.5 Produtos, entregáveis e preços
A entrega acontece no app (PWA) **Painel de Blindagem**: https://painel-blindagem.vercel.app (os links de cada produto estão em `entregaveis/CAKTO-ENTREGA.md`).

| Etapa | Produto | Preço | O que tem |
|---|---|---|---|
| Front | Kit Não Vire Estatística (edição A, B ou C) | R$ 47 de lista · **R$ 37 com o cupom DIAGNOSTICO10** | Guia 2027–2030 por segmento, Diagnóstico de Sobrevivência (nota de 0 a 100), Plano de 30 Dias, Checklist da Reforma, roteiro de reunião com o contador e aula |
| Bump 1 | Calculadora de Impacto | R$ 19,90 | Simula o efeito da CBS/IBS no preço e na margem |
| Bump 2 | Pack Renegociação e Cobrança | R$ 27 | Modelos de renegociação com banco e fornecedor, régua de cobrança |
| Bump 3 | Fluxo de Caixa 13 semanas + DRE | R$ 17 | Planilha com o caixa projetado e o resultado |
| Upsell | Kit Implementação 2027 (inclui o Painel) | R$ 47 | Implementação guiada, aulas e painel |
| Downsell | Painel de Implementação | R$ 27 | Só o painel de acompanhamento |
| Garantia | 7 dias | — | Reembolso pela Cakto |

**Cofre do Empresário (desconto honesto):** quem conclui o diagnóstico (quiz) desbloqueia um cupom real de R$ 47 por R$ 37. Não existe roleta viciada, timer falso nem escassez falsa, porque esse tipo de mecânica traz risco no Procon/CDC e na Meta.

### 1.6 Fluxo do funil
1. **Anúncio na Meta** (Reels, Stories e Feed) com UTMs → `https://planejamento2027.vercel.app/`
2. **Quiz / Diagnóstico gratuito de 1 minuto** (gera o Lead e define o nicho A, B ou C) → abre o Cofre com o cupom.
3. **VSL por nicho:** `/vsl-a.html` (comércio), `/vsl-b.html` (serviços), `/vsl-c.html` (indústria/agro/B2B). Acima do vídeo ficam só a pré-headline, a headline e a sub. O botão aparece no pitch (`ctaSegundos`: A=183, B=150, C=147).
4. **Checkout Cakto** (pré-preenchido com os dados do quiz, cupom aplicado) + 3 order bumps.
5. **Upsell** (`/upsell.html`, R$ 47) → se recusar, **Downsell** (`/downsell.html`, R$ 27) → `/obrigado.html`.
6. **Entrega:** e-mail da Cakto com o link do Painel.

### 1.7 Economia por venda (unit economics)
> **Atenção: tudo nesta tabela são HIPÓTESES de mercado para planejar.** Substitua pelos números reais depois das primeiras 50 vendas.

| Item | Hipótese | Receita média por comprador |
|---|---|---|
| Front | 80% compram com cupom (R$ 37) e 20% sem cupom (R$ 47) | R$ 39,00 |
| Bump Calculadora R$ 19,90 | 25% de adesão | R$ 4,98 |
| Bump Pack R$ 27 | 15% | R$ 4,05 |
| Bump Fluxo R$ 17 | 20% | R$ 3,40 |
| Upsell R$ 47 | 10% | R$ 4,70 |
| Downsell R$ 27 | 10% dos que recusaram o upsell (≈9%) | R$ 2,43 |
| **Ticket médio bruto (AOV)** | | **≈ R$ 58,56** |
| (−) Taxa da Cakto | ~5% + taxa fixa por transação (confira no seu plano) | −R$ 6,00 |
| (−) Imposto (Simples, ~6%) e reembolsos (~5%) | hipótese | −R$ 6,40 |
| **Receita líquida por comprador** | | **≈ R$ 46** |

- **CPA de equilíbrio (break-even): ≈ R$ 46.** Com adesões maiores nos bumps e no upsell chega a ≈ R$ 51,77, que foi a conta do plano anterior. Recalcule com os dados reais.
- **CPA-meta: R$ 35**, o que dá **ROAS-meta ≈ 1,67** (58,56 ÷ 35). O ROAS de equilíbrio fica em ≈ 1,27.
- **Meta de R$ 100 mil em vendas:** ≈ 1.710 pedidos. Com CPA de R$ 35, isso pede ≈ R$ 60 mil em anúncios e deixa um lucro estimado de ≈ R$ 19 mil. Com CPA de R$ 25, o investimento cai para ≈ R$ 43 mil e o lucro sobe para ≈ R$ 36 mil. **Quem decide o lucro é o CPA, e o CPA é decidido pelo criativo.**

---

## PARTE 2 — NOVA ESTRUTURA DE ANÚNCIOS (refeita do zero)

### 2.1 O princípio
Os criativos anteriores (slides com voz sintética) explicavam bem, mas **não paravam o scroll e não geravam confiança**. No low ticket brasileiro, o que mais vende é **gente real falando com a câmera**, com cara de conteúdo e não de anúncio, legenda grande, um dado chocante nos 3 primeiros segundos e uma CTA de baixo atrito ("faça o diagnóstico gratuito"). Vamos vender **o diagnóstico gratuito**, não o produto. O produto quem vende é a VSL.

### 2.2 Estrutura de todo anúncio (25–45 s)
| Tempo | Bloco | Objetivo | Regras |
|---|---|---|---|
| 0–3 s | **GANCHO** | Parar o scroll | Fala + texto grande na tela ao mesmo tempo. Nome de marca conhecida, número ou chamada por profissão. Nada de logo ou "olá" |
| 3–15 s | **PROBLEMA + AGITAÇÃO** | Fazer a pessoa se ver no cenário | 1 ou 2 dados reais com a fonte na tela, traduzidos para o dia a dia dela ("seu empréstimo, sua maquininha") |
| 15–30 s | **MECANISMO / VIRADA** | Dar esperança e um caminho | "Não precisa ser economista: precisa de um plano." Citar os 3 Escudos ou "o que priorizar no caixa, no preço e no imposto" |
| 30–40 s | **CTA** | Clique | "Toque em Saiba mais e faça o diagnóstico gratuito de 1 minuto para o seu segmento." Repetir na tela |

### 2.3 Tipos de gancho (com exemplos prontos)
| Tipo | Por que funciona | Exemplo |
|---|---|---|
| Quebra de padrão | Visual ou frase inesperada | (Apontando para a manchete) "Isso aqui saiu ontem e quase ninguém percebeu." |
| Chamada direta (callout) | A pessoa se reconhece | "Dono de comércio, para 30 segundos e escuta isso." |
| Notícia / autoridade | "Saiu no jornal" dá credibilidade | "Saiu no g1: Casas Bahia, Habib's e Tok&Stok pediram recuperação judicial em 2026." |
| Medo de perder | Aversão à perda | "Em 2027 um imposto que você paga hoje deixa de existir, e quem não ajustar o preço vai trabalhar de graça." |
| Curiosidade | Lacuna aberta | "Tem uma data em 2027 que vai mudar o preço de tudo que você vende." |
| Contrário (contrarian) | Desafia uma crença | "Não é o calote que quebra empresa pequena. É isso aqui." |

### 2.4 Formatos (do mais forte ao complementar)
1. **UGC cabeça falante (talking head):** empresário ou empresária no celular, num ambiente real (loja, escritório, galpão). É o formato principal.
2. **Estilo jornal/notícia:** apresentador na bancada, com tarja "URGENTE / ECONOMIA" e a manchete recriada.
3. **Corte de podcast:** dois microfones, um "convidado especialista" respondendo uma pergunta, legenda tipo karaokê.
4. **Contador/especialista explicando:** consultor tributário (personagem fictício e identificado como tal, sem se dizer contador registrado), com quadro ou tela atrás.
5. **Green screen sobre manchete:** a pessoa na frente do print da notícia, apontando.
6. **Estilo entrevista de rua:** "Você sabe o que acontece com o PIS e a Cofins em 2027?" Deixe claro que é encenação ilustrativa e não use respostas como prova.
7. **Lista "3 erros que quebram empresas":** formato com números grandes na tela, 1, 2, 3.
8. **Estilo depoimento SEM depoimento falso:** "Se você é dono de restaurante, provavelmente está vivendo isso…" (narrado em 2ª pessoa, sem dizer "eu comprei e funcionou").

### 2.5 Matriz de ângulos por nicho
| Ângulo | A · Comércio/Alimentação | B · Serviços | C · Indústria/Agro/B2B |
|---|---|---|---|
| Marcas em crise | Casas Bahia, Habib's, Tok&Stok pediram RJ em 2026 | Oncoclínicas, Azul, 123milhas foram à Justiça renegociar dívidas | Raízen, Braskem e Ruiz Coffees foram à Justiça renegociar dívidas em 2026 |
| Calote recorde | 32% das 9,3 mi inadimplentes são do comércio | 56% são de serviços | Agro foi o setor com mais RJ em 2025 |
| Reforma | Preço e nota mudam com a CBS em 2027 | O ISS tem data para acabar (2029–2032 → IBS) | O cliente B2B vai exigir crédito de CBS; split payment em 2027 |
| Juro | Maquininha e crediário mais caros (Selic 13,75%) | Cliente parcelando e atrasando | Capital de giro e custeio da safra caros |
| Teste rápido | "Quantas semanas seu caixa aguenta se a venda cair 20%?" | "Quanto custa de verdade 1 hora do seu serviço?" | "Seu contrato já prevê o imposto novo?" |

### 2.6 Banco de 18 ganchos (usar como primeira frase)
1. "Casas Bahia, Habib's e Tok&Stok. As três pediram recuperação judicial em 2026."
2. "Dono de comércio, se a sua venda cair 20% no mês que vem, quantas semanas o seu caixa aguenta?"
3. "Em 1º de janeiro de 2027, dois impostos que você paga hoje deixam de existir."
4. "9,3 milhões de empresas estão com contas atrasadas no Brasil. É recorde."
5. "Quem presta serviço: o ISS tem data para acabar. E quase ninguém está falando disso."
6. "Não é o calote que quebra empresa pequena. É não saber quanto tempo o caixa aguenta."
7. "Saiu no jornal e quase ninguém prestou atenção: recorde de recuperação judicial no Brasil."
8. "Dono de restaurante, o dono do Habib's citou dois motivos para pedir socorro na Justiça. Você tem os dois."
9. "Se você vende para outras empresas, em 2027 o seu cliente vai te fazer uma pergunta que você não sabe responder."
10. "Raízen e Braskem foram à Justiça renegociar mais de 100 bilhões em dívidas. E o pequeno produtor?"
11. "Esse é o erro número 1 de quem parcela sem juros no cartão."
12. "Você está sendo o banco do seu cliente e nem percebeu."
13. "Para de achar que a Reforma Tributária é problema do seu contador."
14. "Três perguntas. Se você responder 'não' a duas, a sua empresa está em risco."
15. "Selic a 13,75%. Traduzindo para o seu caixa: isso aqui."
16. "Tem uma coisa que as grandes redes têm e o pequeno empresário não tem. E dá para resolver em 30 dias."
17. "O 'vai passar' é a frase mais cara que um empresário pode dizer em 2026."
18. "Clínica, salão, agência, escritório: mais da metade das empresas com conta atrasada são de serviços."

---

## PARTE 3 — PROMPTS PARA O HEYGEN

### 3.1 Boas práticas para parecer real
- **Avatar:** use o **Avatar IV** (ou um Photo Avatar gerado a partir de uma foto realista) para ter movimento de cabeça, mãos e expressão natural. Evite os avatares de estúdio com fundo branco, porque têm cara de anúncio.
- **Perfil:** empresário ou empresária brasileira de 35 a 55 anos, roupa casual-profissional (camisa polo, camisa social sem gravata, avental no caso de restaurante). Varie gênero, idade e tom de pele entre os criativos.
- **Cenário:** um ambiente real e um pouco "imperfeito" (balcão de loja, cozinha, escritório pequeno, galpão, carro estacionado). Câmera na altura dos olhos, estilo selfie ou tripé de celular.
- **Voz:** use uma voz nativa em pt-BR, natural, com sotaque neutro ou paulista/carioca leve. Não use a mesma voz das VSLs. Velocidade 1,0–1,1x. Se puder, **clone a sua própria voz** ou grave o áudio no celular e use o *audio upload*, que é o que mais aumenta o realismo.
- **Pausas:** marque `...` ou quebras de linha antes do dado principal e antes da CTA. Escreva números por extenso quando a voz errar ("nove vírgula três milhões").
- **Gestos:** em "Avatar IV / Motion", peça "gestos de mão moderados, acenos de cabeça, expressão séria no dado e leve sorriso na CTA".
- **Legendas queimadas** (burned-in): fonte grossa (Montserrat ExtraBold ou similar), branca com contorno preto, 2 a 4 palavras por vez, a palavra-chave em amarelo e posição no terço central. 85% assistem sem som.
- **Texto do gancho na tela** nos primeiros 3 s, grande, no topo, com no máximo 7 palavras.
- **Fonte na tela:** sempre que houver número, legenda pequena "Fonte: Serasa Experian, ago/2026".
- **Cortes:** troque o enquadramento (zoom de 110%) a cada 3–5 s e inclua 1 ou 2 b-rolls (fotos de `criativos/broll/` ou banco de imagens).
- **Formatos:** exporte em **9:16 (1080×1920)** para Reels e Stories e em **4:5 (1080×1350)** para o Feed. Mantenha os textos dentro da área segura (sem nada nos 250 px de cima e de baixo no 9:16).
- **Pós-produção:** se precisar, finalize no CapCut (legenda automática, zoom, som ambiente baixo e música de fundo a 5–8%).

### 3.2 Prompt mestre (cole antes de cada roteiro)
```
Crie um vídeo vertical realista estilo UGC para anúncio no Instagram, em português do Brasil.
Avatar: [DESCRIÇÃO DO AVATAR], usando Avatar IV com movimento natural de cabeça, mãos e olhar direto para a câmera, como se gravasse com o próprio celular.
Cenário: [CENÁRIO], iluminação natural, leve profundidade de campo, nada de fundo de estúdio.
Tom: conversa séria e próxima, de empresário para empresário; urgência real, sem sensacionalismo. Expressão séria nos números, leve sorriso na chamada final.
Voz: pt-BR nativa, natural, velocidade 1.05x, pausas curtas onde houver "...".
Câmera: plano médio-fechado na altura dos olhos; zoom suave de 100% para 110% a cada frase importante.
Texto na tela: gancho em letras grandes brancas com contorno preto no topo durante os 3 primeiros segundos; depois legendas queimadas de 2 a 4 palavras, palavra-chave em amarelo; fontes dos dados em letra pequena no rodapé.
B-roll/sobreposições: [INSTRUÇÕES].
Formato: 9:16 1080x1920 (versão extra 4:5 1080x1350). Duração 25 a 45 segundos.
Roteiro (falar exatamente):
[ROTEIRO]
```

### 3.3 Os 10 criativos prontos
> Nome do anúncio = código (ex.: `H01_jornal_A_9x16`). Em todos: CTA do botão "Saiba mais"; destino `https://planejamento2027.vercel.app/` com as UTMs de `criativos/COPY_ANUNCIOS.md`.

#### H01 · Jornal/notícia · Nicho A · gancho "saiu no jornal"
- **Avatar:** apresentadora de 40 anos, blazer azul-marinho, cabelo preso, postura de telejornal.
- **Cenário:** bancada de jornal simples, com uma tela atrás mostrando gráfico em queda.
- **Overlay:** tarja vermelha "ECONOMIA • 2026" nos 0–3 s; manchetes recriadas (sem logotipo oficial) "Casas Bahia pede recuperação judicial", "Dono do Habib's pede recuperação judicial", "Dono da Tok&Stok pede recuperação judicial"; rodapé "Fontes: g1 e CNN Brasil, 2026".
- **Roteiro (≈35 s):**
"Casas Bahia, Habib's e Tok&Stok... As três pediram recuperação judicial em 2026.
E os motivos que elas mesmas deram foram juro alto, crédito caro e cliente comprando menos.
Agora pensa comigo: se uma rede com diretoria financeira e banco do lado precisou pedir socorro na Justiça... o que acontece com a loja ou o restaurante que vive só do caixa do mês?
A boa notícia é que dá para se preparar. Existe um diagnóstico gratuito, de um minuto, que mostra o que priorizar no caixa, no preço e no imposto até 2030.
Toca em Saiba mais e faz o seu agora."

#### H02 · UGC callout · Nicho A · restaurante
- **Avatar:** homem de 48 anos, avental preto sobre camiseta, barba grisalha.
- **Cenário:** cozinha de restaurante pequeno, panelas ao fundo, luz quente.
- **Overlay:** gancho "DONO DE RESTAURANTE, ESCUTA ISSO"; b-roll `restaurante.jpg` em 12–16 s; texto "Selic 13,75% (Banco Central)".
- **Roteiro (≈38 s):**
"Dono de restaurante, para trinta segundos e escuta isso.
O dono do Habib's foi à Justiça pedir recuperação judicial em 2026. E citou dois motivos: juro alto e menos gente nas lojas.
Você provavelmente tem os dois. A Selic está em 13,75%. A maquininha antecipando custa caro, o fornecedor quer à vista e o cliente quer parcelar.
E em 2027 ainda muda o imposto, e o preço do seu prato precisa ser recalculado.
Não precisa ser economista. Precisa de um plano.
Toca em Saiba mais e faz o diagnóstico gratuito para restaurante. Leva um minuto."

#### H03 · Especialista explicando · Nicho B · fim do ISS
- **Avatar:** mulher de 38 anos, camisa social branca, óculos, tom didático (consultora fictícia, sem se apresentar como contadora registrada).
- **Cenário:** escritório pequeno com estante e um quadro branco onde está escrito "ISS → IBS".
- **Overlay:** gancho "O ISS TEM DATA PARA ACABAR"; linha do tempo animada "2027 CBS • 2029–2032 IBS • 2033 completo"; rodapé "Fonte: Receita Federal".
- **Roteiro (≈40 s):**
"Se você presta serviço, o seu imposto principal tem data para acabar. E quase ninguém está falando disso.
Já é lei: em 2027 entram a CBS no lugar do PIS e da Cofins. E de 2029 a 2032, o ISS vai sendo trocado pelo IBS.
Na prática, o preço da sua hora muda. Quem não recalcular vai acabar trabalhando de graça sem perceber.
E tem mais: mais da metade das empresas com conta atrasada no Brasil hoje são de serviços.
Clínica, salão, agência, escritório... o primeiro passo é saber onde você está.
Toca em Saiba mais e faz o diagnóstico gratuito para serviços. É um minuto."

#### H04 · Green screen sobre manchete · Nicho C · B2B/agro
- **Avatar:** homem de 52 anos, camisa xadrez, boné na mão, tom firme.
- **Cenário:** green screen com o print recriado da manchete "Raízen, Braskem e Ruiz Coffees vão à Justiça renegociar dívidas"; depois b-roll `agro.jpg` e `galpao.jpg`.
- **Overlay:** gancho "MAIS DE R$ 100 BILHÕES EM DÍVIDAS"; rodapé "Fontes: g1, Globo Rural, 2026".
- **Roteiro (≈38 s):**
"Raízen, Braskem e Ruiz Coffees. Em 2026, as três foram à Justiça renegociar dívidas. Só a Raízen e a Braskem somam mais de cem bilhões de reais.
E em 2025 o agro foi o setor com mais empresas em recuperação judicial no Brasil.
Se você produz ou vende para outras empresas, presta atenção: em 2027 o seu cliente vai começar a perguntar sobre crédito de CBS. E o split payment vai separar o imposto na hora do pagamento.
Quem usa esse dinheiro como capital de giro vai sentir.
Toca em Saiba mais e faz o diagnóstico gratuito para indústria e agro."

#### H05 · Lista "3 erros" · Amplo
- **Avatar:** mulher de 45 anos, blusa social, tom de mentora.
- **Cenário:** sala de reunião pequena, com notebook aberto.
- **Overlay:** números gigantes "1", "2", "3" entrando com cada erro; gancho "3 ERROS QUE QUEBRAM EMPRESA PEQUENA".
- **Roteiro (≈40 s):**
"Três erros que estão levando empresas pequenas para a lista do calote. Que hoje já tem 9,3 milhões de empresas.
Erro um: não saber quantas semanas o caixa aguenta se a venda cair.
Erro dois: parcelar sem juros e pagar o fornecedor à vista. Você vira o banco do seu cliente.
Erro três: achar que a Reforma Tributária é problema só do contador. Em 2027 o preço, a nota e o contrato mudam.
Se você cometeu pelo menos um... faz o diagnóstico gratuito de um minuto. Toca em Saiba mais."

#### H06 · Contrário (contrarian) · Amplo
- **Avatar:** homem de 40 anos, camisa social dobrada no braço, dentro do carro estacionado (estilo vlog).
- **Cenário:** interior do carro, luz do dia.
- **Overlay:** gancho "NÃO É O CALOTE QUE QUEBRA SUA EMPRESA".
- **Roteiro (≈32 s):**
"Não é o calote que quebra a empresa pequena. É não ter um plano para ele.
As grandes redes que pediram recuperação judicial em 2026 tinham diretor financeiro, banco e advogado. Mesmo assim, não aguentaram o juro alto.
O pequeno empresário não tem nada disso. Mas pode ter uma coisa: um plano de trinta dias, uma tarefa por dia, para o caixa, o preço e o imposto.
Começa pelo diagnóstico gratuito. Um minuto. Toca em Saiba mais."

#### H07 · Corte de podcast · Nicho A/B
- **Avatar:** dois planos do mesmo avatar ou dois avatares: "apresentador" faz a pergunta (texto na tela) e o "convidado", homem de 50 anos de camisa social, responde.
- **Cenário:** estúdio de podcast com microfones e luz neon suave.
- **Overlay:** pergunta na tela "O que o pequeno empresário precisa fazer antes de 2027?"; legenda karaokê.
- **Roteiro (≈42 s):**
(Texto na tela: "O que o pequeno empresário precisa fazer antes de 2027?")
"Olha... a primeira coisa é parar de achar que vai passar.
O juro está em 13,75%. Tem recorde de empresa com conta atrasada. E em primeiro de janeiro de 2027 o PIS e a Cofins acabam e entra a CBS.
Então são três coisas: projetar o caixa para as próximas treze semanas, recalcular o preço já com o imposto novo e sentar com o contador com as perguntas certas.
Quem fizer isso agora atravessa. Quem deixar para depois vira estatística."
(Texto final: "Faça o diagnóstico gratuito → Saiba mais")

#### H08 · Quiz / 3 perguntas · Amplo
- **Avatar:** mulher de 35 anos, camiseta lisa e cardigã, tom leve e direto.
- **Cenário:** loja de bairro, balcão e prateleiras ao fundo (`loja.jpg`).
- **Overlay:** cada pergunta aparece com "SIM / NÃO" na tela; gancho "RESPONDE RÁPIDO: SIM OU NÃO?".
- **Roteiro (≈30 s):**
"Três perguntas, responde rápido.
Um: você sabe quantas semanas o seu caixa aguenta se a venda cair vinte por cento?
Dois: o seu preço já considera o imposto novo que entra em 2027?
Três: você tem uma regra para venda a prazo e cobrança?
Se você respondeu 'não' a duas ou mais... faz o diagnóstico gratuito. Em um minuto ele mostra o que priorizar. Toca em Saiba mais."

#### H09 · Estilo entrevista de rua (encenação) · Amplo
- **Avatar:** repórter de 30 anos com microfone de mão, em uma calçada comercial.
- **Cenário:** rua com lojas e movimento ao fundo.
- **Overlay:** etiqueta "ENCENAÇÃO ILUSTRATIVA" pequena no canto; gancho "VOCÊ SABE O QUE ACABA EM 2027?".
- **Roteiro (≈35 s):**
"Pergunta para qualquer dono de loja nesta rua: o que acaba em primeiro de janeiro de 2027? Quase ninguém sabe.
A resposta: o PIS e a Cofins. Entra a CBS. E depois, até 2032, o ICMS e o ISS viram IBS.
Isso muda preço, nota fiscal e contrato de todo mundo que vende alguma coisa.
Se você é dono de empresa e também não sabia... tudo bem. Mas não dá para ficar sem saber.
Toca em Saiba mais e faz o diagnóstico gratuito de um minuto."

#### H10 · "Depoimento" sem depoimento (2ª pessoa) · Nicho A
- **Avatar:** empresária de 50 anos, camisa jeans, em uma loja de roupas fechando à noite (luz baixa, clima de reflexão).
- **Cenário:** loja com as luzes meio apagadas, a mão no balcão.
- **Overlay:** gancho "SE VOCÊ É DONO DE COMÉRCIO, VOCÊ CONHECE ESSA NOITE".
- **Roteiro (≈40 s):**
"Se você é dono de comércio, você conhece essa noite.
A loja fecha, você faz as contas... e o dinheiro do mês não fecha. Fornecedor, aluguel, folha, a maquininha descontando.
E aí você vê que até a Casas Bahia pediu recuperação judicial. E pensa: se nem eles aguentaram...
Respira. A diferença entre quem atravessa e quem fecha não é sorte. É ter um plano para o caixa, o preço e o imposto.
Começa pelo diagnóstico gratuito. Um minuto. Toca em Saiba mais."

### 3.4 Variações para testar (depois de achar o vencedor)
- **Gancho:** troque só os 3 primeiros segundos do vencedor por 3 ganchos do banco 2.6. É o teste que mais derruba o CPA.
- **Avatar:** o mesmo roteiro com homem e com mulher, e com 35 e 50 anos.
- **Cenário:** loja × escritório × carro.
- **Duração:** versão de 20 s (gancho + 1 dado + CTA) contra a de 40 s.
- **CTA:** "diagnóstico gratuito" × "descubra sua nota de 0 a 100".
- **Formato:** 9:16 × 4:5, com e sem música.
- **Texto do anúncio (copy primária):** curta (2 linhas) × longa (a de `COPY_ANUNCIOS.md`).

---

## PARTE 4 — REGRAS DE COMPLIANCE (obrigatórias)
1. **Sem atributos pessoais:** nunca dizer "você está quebrado", "você está endividado" ou "sua empresa vai falir". Use chamada por profissão ("dono de comércio") e dados em 3ª pessoa.
2. **"Pediu recuperação judicial"** ou "foi à Justiça renegociar dívidas", **nunca "faliu"**. Para Raízen e Braskem é recuperação extrajudicial; para a Azul, Chapter 11 nos EUA.
3. **Todo número com fonte** na tela ou na legenda (Banco Central, Serasa Experian, Receita Federal, g1, CNN Brasil, Sebrae).
4. **Sem políticos, partidos ou governo** como personagem ou opinião. Lei aprovada pode ser citada como fato.
5. **Sem timer falso, escassez falsa ou roleta viciada.** O Cofre dá um cupom real e igual para todos que fazem o diagnóstico.
6. **Sem depoimentos falsos** nem "resultados" inventados. Pessoas e cenas são fictícias e não podem afirmar que compraram ou lucraram.
7. **Avatar de IA:** não pode se passar por contador, advogado ou jornalista real. Use logotipo de jornal só em manchete recriada, sem a marca oficial.
8. **Sem promessa de resultado financeiro** ("vai lucrar X", "nunca vai quebrar").
9. **Páginas legais** com CNPJ, e-mail e endereço reais (exigência da Meta e do CDC), e garantia de 7 dias visível.

---

## PARTE 5 — CHECKLIST DO QUE FALTA PARA FICAR 100% NO AR
| # | Tarefa | Responsável | Detalhe |
|---|---|---|---|
| 1 | Conectar a Vercel ao repositório GitHub (Root Directory = `funil`) e publicar a versão com o Cofre | Suellen (com o Grok Bot) | Vercel → projeto `planejamento2027` → Settings → Git → Connect |
| 2 | Subir as 3 VSLs no Vimeo ou Panda Video e colar o link em `vsl.A/B/C.embedUrl` no `funil/config.js` | Suellen | Conferir se o `ctaSegundos` bate com o segundo do pitch |
| 3 | Na Cakto: criar o produto principal (R$ 47) e o cupom `DIAGNOSTICO10` (R$ 47 → R$ 37) | Suellen | Um checkout por edição A, B e C, ou um só com `&ed=` |
| 4 | Na Cakto: criar os 3 bumps (R$ 19,90, R$ 27, R$ 17) como produtos próprios e vinculá-los | Suellen | Links de entrega em `CAKTO-ENTREGA.md` |
| 5 | Na Cakto: upsell R$ 47 e downsell R$ 27 one-click, colando o HTML em `config.js` (`caktoHtml`) | Suellen + Grok Bot | Páginas `upsell.html` e `downsell.html` |
| 6 | Colar os links de checkout em `config.js` (`checkout.A/B/C`) | Grok Bot (depois de receber os links) | Commit e push automáticos |
| 7 | Criar o Business Manager, a conta de anúncios e o Pixel; colar o `pixelId` em `config.js` | Suellen | Ver o Guia de Campanhas |
| 8 | Pixel + token da API de Conversões em CADA produto da Cakto | Suellen | Sem o token, o Pix pago depois não vira Purchase |
| 9 | Verificar o domínio no BM (DNS TXT ou metatag) | Suellen + Grok Bot | Domínio próprio recomendado (item 12) |
| 10 | CNPJ, e-mail e endereço reais em `config.js` (rodapé, Privacidade e Termos) | Suellen envia, Grok Bot aplica | — |
| 11 | Compra de teste completa (cartão e Pix): checkout → bump → upsell → e-mail → Painel abre | Suellen | Conferir o Purchase no Gerenciador de Eventos |
| 12 | Domínio próprio (ex.: connectmidia.com ou um novo .com.br) apontado para a Vercel | Suellen | Recuperar o acesso à Hostinger ou comprar outro |
| 13 | Criar o Instagram da marca (bio, 9 posts e destaques de `criativos/instagram/`) e ligá-lo ao BM | Suellen | Postar antes de anunciar |
| 14 | Produzir os 10 criativos no HeyGen (Parte 3) | Suellen | Começar por H01, H02, H05, H08 e H03 |
| 15 | (Opcional) Utmify para o ROAS real por anúncio | Suellen | Integração nativa da Cakto |
| 16 | (Opcional) Webhook dos leads (Apps Script) e WhatsApp de boas-vindas | Grok Bot | `config.js` → `webhook.url`, `whatsappBoasVindas` |
| 17 | (Opcional) Atualizar a alíquota da CBS quando for publicada (até 15/12/2026) | Grok Bot | Guias e calculadora |
| 18 | (Opcional) Guias com mais de 40 páginas, videoaulas gravadas e revisão jurídica dos modelos de contrato | Suellen / advogado | Melhora a percepção de valor e reduz reembolso |

**Ordem recomendada:** 1 → 10 → 2 → 3/4/5 → 6 → 7/8/9 → 11 → 13 → 14 → lançar as campanhas.
