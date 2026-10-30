# Guia de Campanhas Meta Ads — Kit Não Vire Estatística

Connect Mídia · Passo a passo para subir, avaliar e escalar as campanhas · versão de 30/10/2026

> **Importante:** todos os números de referência (CPM, CTR, CPA etc.) são **estimativas de mercado** para infoproduto low ticket no Brasil. **Não são garantia.** Use-os como ponto de partida e ajuste pelos dados reais da sua conta depois de 7 a 14 dias.

**Números-chave desta oferta** (hipóteses do documento "Oferta e Projeto"):
- Ticket médio bruto ≈ **R$ 58,56**, com front, bumps, upsell e downsell.
- CPA de equilíbrio ≈ **R$ 46**. Esse valor pode chegar a R$ 51,77 se as adesões forem maiores.
- **CPA-meta R$ 35**, o que dá **ROAS-meta ≥ 1,67**. O ROAS de equilíbrio é ≈ 1,27.

---

## 1. Preparação da conta (antes de gastar R$ 1)
1. **Business Manager (Portfólio empresarial)** em business.facebook.com com os dados reais da Connect Mídia (CNPJ). Ative a autenticação em 2 fatores.
2. **Página do Facebook + Instagram** da marca, ligados ao BM. Publique pelo menos 6 a 9 posts antes do primeiro anúncio (`criativos/instagram/`).
3. **Conta de anúncios** em BRL, fuso de São Paulo, com o pagamento em cartão ou Pix pré-pago. Coloque um limite de gastos da conta como trava de segurança.
4. **Pixel (conjunto de dados)**: crie no Gerenciador de Eventos e cole o ID em `funil/config.js` → `meta.pixelId`.
5. **API de Conversões na Cakto**: em cada produto (principal, bumps, upsell, downsell), cole o mesmo Pixel e o **token da API de Conversões**. Sem isso, a venda por Pix paga depois não é contada.
6. **Verificação de domínio**: no BM → Segurança da marca → Domínios, de preferência por DNS TXT, num domínio próprio. O `vercel.app` funciona para testar, mas o domínio próprio dá mais estabilidade e confiança.
7. **Priorização de eventos:** se a Meta pedir, deixe Purchase como o evento nº 1.
8. **Teste** em Gerenciador de Eventos → Testar eventos, e faça uma compra de teste real.

## 2. Eventos do funil
| Evento | Onde dispara | Quem envia | Uso |
|---|---|---|---|
| PageView | Todas as páginas | Site (Pixel) | Públicos de remarketing |
| Lead | Conclusão do quiz (diagnóstico) | Site (Pixel + CAPI opcional) | Métrica de custo por lead; plano B de otimização |
| ViewContent | Abertura da VSL (A, B ou C) | Site | Remarketing de quem viu a VSL |
| CliqueCheckout (personalizado) | Clique no botão da VSL | Site | Diagnóstico do funil, sem duplicar o IC |
| InitiateCheckout | Abertura do checkout | Cakto | Plano B de otimização |
| Purchase | Compra aprovada (cartão e Pix) | Cakto (Pixel + CAPI) | **Evento de otimização principal** |

Use nos anúncios os **parâmetros de URL** de `criativos/COPY_ANUNCIOS.md` (`utm_source=meta&utm_campaign={{campaign.name}}...`).

## 3. Estrutura das campanhas
**Objetivo:** Vendas → evento de conversão **Purchase**, local da conversão Site.

**Plano B:** se depois de 3 dias e cerca de R$ 300 investidos houver menos de 3 compras, mas os cliques e leads estiverem bons, crie uma campanha otimizada para **InitiateCheckout** (ou Lead) com os mesmos criativos por 3 a 5 dias, para alimentar o Pixel, e depois volte para Purchase.

### Nomenclatura
- Campanha: `NVE_F1_TESTE_ABO_Purchase`
- Conjunto: `NVE_F1_CJ01_Amplo_25-65_BR`
- Anúncio: `H01_jornal_A_9x16`

### FASE 1 · Teste de criativos (dias 1 a 7)
- **Tipo:** ABO (orçamento no conjunto), para cada conjunto receber a sua verba.
- **Conjuntos:** 4, com **R$ 40/dia cada** = **R$ 160/dia**. Com verba curta, use a versão mínima: 2 conjuntos × R$ 30 = R$ 60/dia.

| Conjunto | Público | Criativos |
|---|---|---|
| CJ01 | Amplo, Brasil, 25–65 anos, todos os gêneros, sem interesses | H01, H05, H06, H08 |
| CJ02 | Amplo, foco nicho A (comércio/alimentação) | H02, H10, H01 |
| CJ03 | Amplo, foco nicho B (serviços) | H03, H07, H09 |
| CJ04 | Interesses empresariais (pequenas empresas, empreendedorismo, MEI, contabilidade, varejo, agronegócio), 28–60 | H04, H05, H08 |

- **3 a 5 anúncios por conjunto**, sempre com o mesmo destino e as mesmas UTMs.
- **Posicionamentos:** Advantage+ (automático). Se o CPM ficar acima de R$ 45, teste só Reels + Stories + Feed do Instagram e do Facebook.
- **Não mexa** nos conjuntos por 72 h, a não ser pelas regras de corte do item 5.
- **Não use** público semelhante (lookalike) nem remarketing na fase 1. Ainda não há dados.

### Quanto tempo deixar ligado antes de decidir
- **Mínimo de 3 dias completos** por conjunto **E** gasto de **2 a 3 × o CPA-meta** (R$ 70 a R$ 105) por conjunto antes de julgar.
- Os anúncios individuais podem ser julgados antes pelas métricas de topo (gancho e CTR), conforme o item 5.
- A decisão final da fase 1 vem no **dia 7**, quando você escolhe os 2 a 4 criativos vencedores.

### FASE 2 · Validação e escala (dias 8 a 21)
1. Crie a campanha **CBO** (orçamento na campanha) `NVE_F2_ESCALA_CBO` com 1 conjunto amplo e os **criativos vencedores** (IDs de post, para manter a prova social). Comece com **R$ 200–300/dia**.
2. Em paralelo, crie **Advantage+ Sales (campanha de vendas Advantage+)** com os mesmos vencedores, a R$ 150/dia.
3. Mantenha o ABO de teste com **R$ 80–120/dia** para testar 3 a 5 criativos novos por semana (novos ganchos para os vencedores).
4. **Escala vertical:** aumente **20–30% a cada 48–72 h** quando o CPA estiver ≤ R$ 35 nos últimos 3 dias.
5. **Escala horizontal:** duplique o conjunto ou campanha vencedora com um orçamento 2× maior e deixe o original rodando.

### FASE 3 · Remarketing (a partir do dia 3 a 5, quando houver 1.000+ visitantes)
- Campanha `NVE_RMK` com **R$ 20–40/dia** (≈10–15% do total).
- **Públicos:** visitou a VSL há 7–14 dias e não comprou; fez o quiz (Lead) há 14 dias e não comprou; IC há 7 dias e não comprou. Exclua os compradores dos últimos 180 dias.
- **Criativos:** H03 ou H07 (explicação e autoridade), uma lembrança do cupom do Cofre ("seu diagnóstico liberou um cupom") e a garantia de 7 dias. Nunca use contagem falsa.
- A frequência pode ir até 4–5 em 7 dias.

## 4. Plano de orçamento diário até R$ 100 mil
| Período | Orçamento/dia | Gasto no período | Vendas esperadas (CPA R$ 35) | Faturamento estimado |
|---|---|---|---|---|
| Dias 1–7 (teste) | R$ 160 | ≈ R$ 1.120 | ≈ 25–32 (CPA de teste costuma ser mais alto) | ≈ R$ 1.600 |
| Dias 8–14 (validação) | R$ 350–450 | ≈ R$ 2.800 | ≈ 80 | ≈ R$ 4.700 |
| Dias 15–28 (escala 1) | R$ 600–1.000 | ≈ R$ 11.000 | ≈ 315 | ≈ R$ 18.400 |
| Dias 29–45 (escala 2) | R$ 1.200–2.000 | ≈ R$ 27.000 | ≈ 770 | ≈ R$ 45.000 |
| Dias 46–55 (escala 3) | R$ 2.000+ | ≈ R$ 18.000 | ≈ 515 | ≈ R$ 30.000 |
| **Total ≈ 55 dias** | | **≈ R$ 60.000** | **≈ 1.710** | **≈ R$ 100.000** |

- Só passe de uma fase para a outra se o CPA da semana estiver ≤ R$ 40. Se estiver acima, fique na fase atual e teste criativos novos.
- O lucro estimado com CPA de R$ 35 é ≈ R$ 19 mil, e com CPA de R$ 25 é ≈ R$ 36 mil. Hipóteses.
- **Reinvista o faturamento:** a Cakto libera os valores conforme o prazo do seu plano. Planeje o caixa para pagar os anúncios antes de receber.

## 5. Referências de métricas (estimativas de mercado, low ticket no Brasil)
| Métrica | Como calcular | 🟢 Bom | 🟡 Atenção | 🔴 Ruim |
|---|---|---|---|---|
| CPM | Custo por 1.000 impressões | < R$ 25 | R$ 25–45 | > R$ 45 |
| CTR (link) | Cliques no link ÷ impressões | > 1,5% | 0,8–1,5% | < 0,8% |
| CPC (link) | Custo ÷ cliques no link | < R$ 1,00 | R$ 1,00–2,00 | > R$ 2,00 |
| Hook rate (gancho) | Visualizações de 3 s ÷ impressões | > 30% | 20–30% | < 20% |
| Hold rate (retenção) | ThruPlays ÷ visualizações de 3 s | > 25% | 12–25% | < 12% |
| Taxa de LP view | Visualizações da página ÷ cliques no link | > 75% | 60–75% | < 60% |
| Conclusão do quiz | Leads ÷ visualizações da página | > 40% | 25–40% | < 25% |
| Custo por lead (quiz) | Gasto ÷ leads | < R$ 4 | R$ 4–8 | > R$ 8 |
| Retenção da VSL até o pitch | % que chega ao `ctaSegundos` (Panda/Vimeo) | > 25% | 12–25% | < 12% |
| Taxa de IC | InitiateCheckout ÷ ViewContent (VSL) | > 8% | 4–8% | < 4% |
| Conversão do checkout | Purchase ÷ InitiateCheckout | > 35% | 20–35% | < 20% |
| Adesão aos bumps (pelo menos 1) | Pedidos com bump ÷ pedidos | > 35% | 20–35% | < 20% |
| Upsell | Upsells ÷ compradores | > 12% | 6–12% | < 6% |
| CPA (Purchase) | Gasto ÷ compras | ≤ R$ 35 | R$ 35–46 | > R$ 46 (> R$ 52 = prejuízo certo) |
| ROAS (bruto) | Faturamento ÷ gasto | ≥ 1,7 | 1,27–1,7 | < 1,27 |
| Frequência (7 dias, prospecção) | Impressões ÷ alcance | < 2,0 | 2,0–3,5 | > 3,5 |

## 6. Regras de corte (desligar)
| Nível | Condição | Ação |
|---|---|---|
| Anúncio | Gastou ≥ R$ 20 com hook rate < 20% **e** CTR < 0,7% | Desligar |
| Anúncio | Gastou ≥ R$ 35 (1× CPA) sem nenhum lead | Desligar |
| Anúncio | Gastou ≥ R$ 70 (2× CPA) sem InitiateCheckout | Desligar |
| Anúncio | Gastou ≥ R$ 105 (3× CPA) sem compra | Desligar |
| Conjunto | 3 dias e ≥ R$ 105 gastos sem compra | Desligar e substituir os criativos |
| Conjunto/anúncio | CPA > R$ 52 com 3+ compras ao longo de 3 dias | Desligar |
| Campanha de escala | CPA > R$ 46 por 2 dias seguidos | Voltar o orçamento ao último patamar bom (−20 a −30%). Não desligue de primeira |
| Criativo vencedor | Frequência > 3,5 e CTR caindo 30% em relação à 1ª semana | Trocar o gancho ou fazer uma nova versão (fadiga) |

## 7. Regras de escala (aumentar)
| Condição (últimos 3 dias) | Ação |
|---|---|
| CPA ≤ R$ 35 com ≥ 3 compras | +20% no orçamento a cada 48 h |
| CPA ≤ R$ 28 com ≥ 5 compras | +30% a cada 48 h e duplicar para CBO/Advantage+ |
| CPA ≤ R$ 25 com ≥ 10 compras | Duplicar com orçamento 2× e criar 3 variações de gancho do anúncio |
| CPA entre R$ 35 e R$ 46 | Manter o orçamento e testar ganchos novos |

Nunca aumente mais de 30% de uma vez nem mexa duas vezes no mesmo dia, porque o conjunto volta para a fase de aprendizado.

## 8. Rotina diária (15 minutos)
- [ ] **Manhã (9h, horário de Brasília):** veja o gasto, as compras, o CPA e o ROAS de ontem por campanha, na Cakto ou Utmify e na Meta. Confira se os números da Meta e da Cakto batem (diferença de até 20% é normal).
- [ ] Aplique as **regras de corte** (item 6) em anúncios e conjuntos.
- [ ] Aplique as **regras de escala** (item 7), lembrando de esperar 48–72 h desde a última mudança.
- [ ] Confira a **frequência** e os comentários: responda as dúvidas e oculte spam ou ofensas.
- [ ] Na Cakto, veja os Pix pendentes, os reembolsos (meta < 5%) e a adesão aos bumps e ao upsell.
- [ ] Pela **Panda/Vimeo**, veja a retenção da VSL até o pitch.
- [ ] **1× por semana:** suba 3 a 5 criativos novos (variações de gancho do vencedor) e recalcule o CPA de equilíbrio com o ticket médio real.
- [ ] Anote tudo numa planilha: data, gasto, leads, IC, compras, CPA, ROAS e o criativo campeão.

## 9. Diagnóstico de problemas
| Sintoma | Causa provável | O que fazer |
|---|---|---|
| CPM alto (> R$ 45) | Público pequeno, criativo com baixa qualidade, época cara (Black Friday, dezembro) | Abra o público (amplo), use posicionamentos Advantage+, troque o criativo. No fim de novembro, espere um CPM mais alto |
| Hook rate baixo (< 20%) | Os 3 primeiros segundos não param o scroll | Novo gancho do banco (marca, número, callout) e texto grande na tela no 1º segundo |
| Hook bom, mas hold baixo | O meio do vídeo está lento ou genérico | Corte para 20–30 s, troque o plano a cada 3 s e coloque o dado mais forte logo depois do gancho |
| CTR baixo (< 0,8%) | A CTA está fraca ou a promessa não está clara | CTA explícita "faça o diagnóstico gratuito de 1 minuto" falada e escrita; teste a copy curta |
| CTR bom, mas LP view < 60% | O site está lento ou o clique é acidental | Teste a velocidade da página no celular, tire os Audience Network |
| Muitos cliques e poucos leads | O quiz não conecta com o anúncio | Alinhe a primeira tela do quiz com o gancho do anúncio |
| Leads bons e pouca VSL vista até o pitch | A VSL é longa ou o começo está fraco | Encurte a abertura e reforce o gancho nos 30 s iniciais. Avalie reduzir o `ctaSegundos` |
| Muito IC e pouca compra | Problema no checkout, Pix não concluído, preço, desconfiança | Teste o checkout, ative a recuperação de Pix e de carrinho na Cakto, mostre a garantia e o CNPJ |
| Compras na Cakto, mas não na Meta | O CAPI não está configurado | Coloque o token do CAPI em cada produto e confira em Testar eventos |
| CPA subiu de repente | Fadiga ou escalou rápido demais | Volte o orçamento, suba variações novas do vencedor e confira a frequência |
| Anúncio reprovado | Atributo pessoal, promessa financeira, "faliu" | Revise pelas regras de compliance do documento 1 e peça revisão |
| Conta restrita | Pagamento, domínio novo, muitas reprovações | Verifique o domínio e o BM, use o cartão da empresa e não suba anúncios reprovados de novo sem alterar |

## 10. Checklist de lançamento (dia 0)
- [ ] Pixel no `config.js` e na Cakto, com o token do CAPI em todos os produtos
- [ ] Compra de teste no cartão e no Pix chegando como Purchase
- [ ] VSLs com vídeo e o botão aparecendo no segundo certo
- [ ] Links de checkout A, B e C e o cupom DIAGNOSTICO10 funcionando
- [ ] Páginas legais com CNPJ, e-mail e endereço
- [ ] Domínio verificado no BM
- [ ] 10 criativos HeyGen exportados em 9:16 e 4:5, nomeados H01 a H10
- [ ] UTMs em todos os anúncios
- [ ] Limite de gastos da conta definido
