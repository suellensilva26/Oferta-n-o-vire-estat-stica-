# Entrega na Cakto · Kit Não Vire Estatística

App (PWA): https://painel-blindagem.vercel.app  ·  projeto Vercel "painel-blindagem" (separado, noindex, sem proteção de acesso)

## Como o acesso funciona
- Cada produto tem um **link secreto**. Ao abrir o link, o app libera o produto naquele aparelho e remove o código da barra de endereço.
- O cliente pode abrir o mesmo link no celular e no computador (o progresso fica salvo em cada aparelho; em Biblioteca → "Seus dados" → "Baixar cópia" e "Restaurar cópia" ele leva os dados de um para o outro).
- Quem compra bump/upsell recebe outro link: ao abrir, o item novo aparece desbloqueado junto com o Kit. Se abrir em outro aparelho, basta colar o link ou código em Biblioteca → "Comprou outro item?" → "Liberar".
- `&ed=A|B|C` só pré-seleciona a edição (A Comércio/Alimentação, B Serviços, C Indústria/Agro/B2B). O cliente confirma ou troca no 1º acesso.

## Links por produto
| Produto (Cakto) | Preço | Link de entrega |
|---|---|---|
| Kit Não Vire Estatística (principal) | R$ 37 | https://painel-blindagem.vercel.app/?k=kit-3c5b4384f6 |
| ↳ se tiver checkout por nicho: Comércio | | https://painel-blindagem.vercel.app/?k=kit-3c5b4384f6&ed=A |
| ↳ Serviços | | https://painel-blindagem.vercel.app/?k=kit-3c5b4384f6&ed=B |
| ↳ Indústria/Agro/B2B | | https://painel-blindagem.vercel.app/?k=kit-3c5b4384f6&ed=C |
| Bump: Calculadora de Impacto | R$ 19,90 | https://painel-blindagem.vercel.app/?k=calc-971f2c0109 |
| Bump: Pack Renegociação e Cobrança | R$ 27 | https://painel-blindagem.vercel.app/?k=pack-ac1bdec7c8 |
| Bump: Fluxo de Caixa 13 semanas + DRE | R$ 17 | https://painel-blindagem.vercel.app/?k=caixa-e11e7d32b4 |
| Upsell: Kit Implementação 2027 (inclui o Painel) | R$ 47 | https://painel-blindagem.vercel.app/?k=impl-2bc5fb7a83 |
| Downsell: Painel de Implementação | R$ 27 | https://painel-blindagem.vercel.app/?k=painel-134f0aeaff |

Link "tudo liberado" para teste interno/suporte (não divulgar):
https://painel-blindagem.vercel.app/?k=kit-3c5b4384f6,calc-971f2c0109,pack-ac1bdec7c8,caixa-e11e7d32b4,impl-2bc5fb7a83

## Passo a passo na Cakto (para cada produto acima)
> Confira os nomes exatos dos menus no painel da Cakto; a interface pode variar.
1. Produtos → abrir o produto → aba/área de **Entrega de conteúdo** (Configurações do produto).
2. Escolher entrega por **link/e-mail de acesso** (área de membros externa) e colar o link da tabela.
3. Na mensagem do e-mail de compra aprovada, usar o texto abaixo.
4. Order bumps: criar cada bump como **produto próprio** na Cakto, com o seu link de entrega, e vinculá-lo como bump no checkout do Kit. Assim só quem pagou o bump recebe o link dele.
5. Upsell/downsell: configurar o funil pós-compra (one-click) apontando para os produtos Implementação (R$ 47) e Painel (R$ 27), cada um com o seu link; ativar o envio do e-mail de acesso logo após a aprovação.
6. **Página de obrigado** (opcional, recomendado): botão "Abrir meu Painel agora" com o link do Kit.
7. Alternativa: se preferir usar a **Cakto Members**, criar 1 módulo "Comece aqui" com 1 aula contendo o botão/link do produto. Funciona igual; o app continua sendo a entrega.
8. Teste: fazer 1 compra de teste (ou pedido aprovado manualmente) de cada produto e abrir o link no celular.

## Texto do e-mail de acesso (Kit)
Assunto: Seu Painel de Blindagem está liberado ✅

Olá, {nome}! Seu Kit Não Vire Estatística já está liberado.

👉 Abra o seu Painel: https://painel-blindagem.vercel.app/?k=kit-3c5b4384f6

Comece assim (10 minutos):
1. Abra o link no celular e toque em "Adicionar à tela inicial" (vira um app).
2. Escolha o seu segmento e faça o Diagnóstico de Sobrevivência.
3. Siga a tarefa do Dia 1 do Plano de 30 dias.

Os guias em PDF, checklists e modelos em Word ficam na aba Biblioteca.
Guarde este e-mail: o link é o seu acesso. Ele é pessoal, não compartilhe.

Dúvidas: responda este e-mail.

## Texto do e-mail (bumps/upsell/downsell)
Assunto: {produto} liberado no seu Painel ✅

Olá, {nome}! O {produto} já está liberado. Abra este link no MESMO celular/computador em que você usa o Painel:
{link do produto}
Ele aparece na aba Biblioteca (e, no Kit Implementação, também em Aulas). Se abrir em outro aparelho, cole este link em Biblioteca → "Comprou outro item?" → "Liberar".

## Garantia, suporte e limites
- O link pode ser repassado (risco aceito do modelo sem login, comum em low ticket). Para trocar um link vazado: gerar novo código, publicar nova versão e atualizar a Cakto (os clientes antigos continuam com acesso no aparelho já liberado).
- Reembolso: o acesso já liberado no aparelho não é revogado automaticamente.
