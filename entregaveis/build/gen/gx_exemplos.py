# -*- coding: utf-8 -*-
from gx_calc import *
from guias import preco
def pr(**a):
    r=preco(**a); p0=a["p0"]
    s=lambda v:("+" if v>=0 else "")+pct(v)
    return r, (f"<table style='margin:6pt 0'><tr><th>Cenário (por unidade vendida)</th><th class='n'>Preço para manter o lucro</th><th class='n'>Lucro se o preço não mudar</th></tr>"
      f"<tr><td>Hoje</td><td class='n'>{brl(p0)}</td><td class='n'>{brl(r['lucro0'])}</td></tr>"
      f"<tr><td>2027–2028</td><td class='n'><b>{brl(r['P27'])}</b> ({s(r['P27']/p0-1)})</td><td class='n'>{brl(r['l27'])}</td></tr>"
      f"<tr><td>2033</td><td class='n'><b>{brl(r['P33'])}</b> ({s(r['P33']/p0-1)})</td><td class='n'>{brl(r['l33'])}</td></tr></table>")

def ex_A():
    r3,t3=pr(p0=30,c=12,tx=.0965,ov=.035,pis=.0365,cr0=0,sr=.6,red=.4)
    return [
dict(titulo="Caso 1 · Lanchonete de bairro no Simples (≈ R$ 60 mil/mês)",
 quem="Dona com 4 funcionários, vende só para o consumidor final, metade no cartão e no app de entrega.",
 fat=60000,regime="Simples Nacional",cv=.52,cf=22000,caixa=8000,pmr=15,
 dividas=[("Cheque especial",6000,.08),("Capital de giro do banco",25000,.035)],
 reforma=lambda r:"<p style='margin:0'>Ficando no Simples \"por dentro\", o jeito de pagar não muda por causa da reforma: o DAS continua. O que pode mexer na margem é o <b>preço dos fornecedores</b> (IPI zero e Imposto Seletivo sobre bebidas açucaradas e alcoólicas a partir de 2027) e o <b>preço do concorrente</b> maior, que passa a ter crédito. Como vende ao consumidor final, o híbrido tende a não fazer sentido; confirme com o contador.</p>",
 acoes=["Trocar o cheque especial por uma linha mais barata ou quitá-lo com parte do caixa: é a dívida mais cara da lista.",
        lambda r:f"Separar {pct(r['sep'],1)} das vendas por dia até ter {f0(r['meta1'])} de reserva (1 mês de custo fixo).",
        "Rever o preço dos 10 pratos mais vendidos com a ficha técnica: prato com custo de insumos acima de 35% do preço pede ajuste (referência de mercado, não regra).",
        "Comparar a taxa do app de entrega com a do pedido direto por WhatsApp e oferecer um benefício para o cliente pedir direto."]),
dict(titulo="Caso 2 · Mercado de bairro no Simples (≈ R$ 250 mil/mês)",
 quem="Mercado com 12 funcionários, açougue e padaria próprios; 70% das vendas no cartão e no Pix.",
 fat=250000,regime="Simples Nacional",cv=.78,cf=42000,caixa=30000,pmr=12,
 dividas=[("Capital de giro do banco",120000,.029),("Rotativo do cartão empresarial",8000,.12)],
 reforma=lambda r:"<p style='margin:0'>A Cesta Básica Nacional tem alíquota zero de IBS/CBS e há uma lista de alimentos com redução de 60% (LC 214/2025). No Simples \"por dentro\", isso aparece de forma diferente do que no supermercado grande, mas <b>o cadastro (NCM) de cada produto continua decisivo</b>, inclusive para os produtos sujeitos ao Imposto Seletivo. O concorrente do Lucro Presumido/Real vai ter crédito nas compras e pode baixar preço em alguns itens: acompanhe os 50 itens mais sensíveis a preço.</p>",
 acoes=["Quitar primeiro o rotativo do cartão (≈ 290% ao ano): é o dinheiro mais caro da empresa.",
        "Fazer a curva ABC: os 20% de itens que dão 80% do faturamento recebem preço vigiado toda semana.",
        lambda r:f"Usar o giro: cada 10 dias a menos no prazo médio de recebimento libera {f0(r['libera10'])}. Prefira Pix e débito com um benefício pequeno ao cliente.",
        "Conferir com o contador o NCM dos 50 itens mais vendidos antes de dezembro."]),
dict(titulo="Caso 3 · Restaurante com 2 unidades no Lucro Presumido (≈ R$ 600 mil/mês)",
 quem="Dois salões, 45 funcionários, 30% das vendas por aplicativo; prato médio de R$ 30.",
 fat=600000,regime="Lucro Presumido",cv=.55,cf=230000,caixa=90000,pmr=20,
 dividas=[("Capital de giro do banco",400000,.025),("Antecipação de recebíveis do cartão (média mensal)",150000,.022)],
 reforma=lambda r:"<p>Bares, restaurantes e lanchonetes têm <b>regime específico</b> na LC 214/2025 (arts. 273 a 276): alíquotas de IBS e CBS <b>reduzidas em 40%</b>, gorjeta de até 15% fora da base e valores retidos pela plataforma de entrega fora da base. Bebida alcoólica e produto revendido sem preparo ficam fora do regime, e quem compra a refeição não aproveita crédito. Para um prato de R$ 30 (custo R$ 12, impostos hoje 9,65%, taxa 3,5%, 60% das compras com crédito):</p>"+t3+"<p class='small muted' style='margin:0'>Estimativa com alíquotas não oficiais (CBS 9,21% e IBS 18,7%, menos 40%), supondo que o fornecedor com crédito repassa o imposto no custo. Faça a sua conta no simulador do app e valide com o contador.</p>",
 acoes=["Conferir com o contador quais itens do cardápio entram no regime de bares e restaurantes e quais não (bebidas alcoólicas, produtos revendidos).",
        lambda r:f"Reduzir a antecipação de recebíveis: com {f0(r['giro'])} parados a receber, cada 10 dias a menos de prazo liberam {f0(r['libera10'])}.",
        "Renegociar o capital de giro mirando a taxa e o prazo (a meta é parcela que caiba na margem do pior mês do ano).",
        "Revisar a ficha técnica e o preço de cada prato em janeiro de 2027, com a alíquota oficial da CBS."]),
]

def ex_B():
    r3,t3=pr(p0=10000,c=1500,tx=.0865,ov=0,pis=.0365,cr0=0,sr=.8,red=.3)
    return [
dict(titulo="Caso 1 · Salão de beleza e estética no Simples (≈ R$ 35 mil/mês)",
 quem="Dona e 5 profissionais comissionadas; clientes pessoas físicas; 60% no cartão.",
 fat=35000,regime="Simples Nacional",cv=.45,cf=14000,caixa=4000,pmr=10,
 dividas=[("Cheque especial",5000,.08),("Financiamento de equipamento",30000,.022)],
 reforma=lambda r:"<p style='margin:0'>Atendendo pessoa física e ficando no Simples \"por dentro\", o DAS continua e a reforma, por si, não muda o jeito de pagar. O ISS segue até 2028 e passa a ser trocado pelo IBS de 2029 a 2032, dentro do DAS. O ponto de atenção aqui é outro: <b>custo da hora e comissão</b>. Com 45% de custo variável, um desconto de 10% derruba a margem de contribuição de 55% para 50% e exige 10% a mais de atendimentos para pagar o mesmo custo fixo.</p>",
 acoes=["Zerar o cheque especial com um acordo de parcelas mais baratas.",
        lambda r:f"Chegar à reserva de {f0(r['meta1'])} separando {pct(r['sep'],1)} do faturamento por dia.",
        "Cobrar sinal para pacotes e procedimentos longos e ter política de cancelamento por escrito.",
        "Rever a tabela: serviços com margem de contribuição abaixo de 40% sobem de preço ou saem do cardápio."]),
dict(titulo="Caso 2 · Agência de marketing no Simples que vende para empresas (≈ R$ 120 mil/mês)",
 quem="10 pessoas na equipe; 14 clientes empresas com contrato mensal; boleto com 30 dias.",
 fat=120000,regime="Simples Nacional",cv=.20,cf=80000,caixa=40000,pmr=35,
 dividas=[("Capital de giro do banco",60000,.028)],
 reforma=lambda r:simples_b2b(120000),
 acoes=["Incluir em todos os contratos a cláusula de reajuste por mudança de tributo (modelo na biblioteca do app) antes das renovações de 2027.",
        "Perguntar aos 5 maiores clientes se eles estão no Lucro Presumido ou Real e se o crédito de fornecedor pesa na escolha deles.",
        lambda r:f"Encurtar o prazo de 35 para 25 dias nas renovações: libera {f0(r['libera10'])} uma vez.",
        "Levar a simulação por dentro x híbrido ao contador até fevereiro, para decidir com calma na janela de março de 2027."]),
dict(titulo="Caso 3 · Escritório de engenharia no Lucro Presumido (≈ R$ 400 mil/mês)",
 quem="Projetos para construtoras e indústrias; 25 profissionais; contratos de 6 a 24 meses.",
 fat=400000,regime="Lucro Presumido",cv=.16,cf=260000,caixa=150000,pmr=40,
 dividas=[("Capital de giro do banco",200000,.022)],
 reforma=lambda r:"<p>Algumas profissões intelectuais regulamentadas (como engenharia, arquitetura, advocacia e contabilidade) têm <b>redução de 30%</b> no IBS e na CBS, se cumprirem os requisitos da LC 214/2025. Para um projeto de R$ 10.000 (R$ 1.500 de compras com crédito, impostos sobre a venda hoje de 8,65%), com a redução de 30%:</p>"+t3+"<p class='small muted' style='margin:0'>Estimativa com alíquotas não oficiais. Sem a redução, o preço para manter o lucro em 2033 seria bem maior: confirme com o contador se a sua sociedade se enquadra. Como o cliente é empresa, ele passa a aproveitar o crédito do imposto destacado na sua nota, o que reduz o custo real dele.</p>",
 acoes=["Confirmar com o contador se o escritório cumpre os requisitos da redução de 30%.",
        "Colocar a cláusula tributária em todos os contratos que passam de dezembro de 2026.",
        lambda r:f"Medir o prazo real de recebimento: {f0(r['giro'])} estão parados em contas a receber. Faturar por etapa entregue, e não no fim do projeto.",
        "Montar a proposta de 2027 já mostrando o imposto por fora, separado do preço."]),
]

def ex_C():
    r2,t2=pr(p0=100,c=72,tx=.2165,ov=.03,pis=.0365,cr0=0,cri=.18,sr=.9,red=0)
    r3,t3=pr(p0=200,c=110,tx=.2725,ov=.02,pis=.0925,cr0=.0925,cri=.18,sr=.9,red=0)
    l2,f2=split_float(800000/1.0931,800000*.72*.9)
    l3,f3=split_float(2000000/1.0931,2000000*.55*.9)
    return [
dict(titulo="Caso 1 · Confecção no Simples que vende para lojas (≈ R$ 150 mil/mês)",
 quem="18 costureiras, vende para 60 lojas multimarcas com boleto em 30/60/90 dias.",
 fat=150000,regime="Simples Nacional",cv=.64,cf=40000,caixa=20000,pmr=45,
 dividas=[("Capital de giro do banco",80000,.03),("Desconto de duplicatas (média do mês)",60000,.025)],
 reforma=lambda r:simples_b2b(150000),
 acoes=[lambda r:f"Prazo de 45 dias prende {f0(r['giro'])}. Oferecer 2% de desconto para pagamento à vista costuma sair mais barato do que descontar duplicata a 2,5% ao mês.",
        "Limitar o crédito por loja (valor máximo em aberto) e suspender novos pedidos a partir de 15 dias de atraso.",
        "Perguntar às 10 maiores lojas se são do Simples ou do Presumido/Real: só as do regime regular dão peso ao crédito.",
        "Levar a simulação por dentro x híbrido ao contador para decidir na janela de março de 2027."]),
dict(titulo="Caso 2 · Distribuidora no Lucro Presumido (≈ R$ 800 mil/mês)",
 quem="Distribui alimentos e limpeza para 400 mercados; frota própria; prazo de 28 a 42 dias.",
 fat=800000,regime="Lucro Presumido",cv=.86,cf=85000,caixa=120000,pmr=35,
 dividas=[("Capital de giro do banco",350000,.024)],
 reforma=lambda r:"<p>Hoje, no Presumido, o PIS/Cofins de 3,65% não dá crédito. Com a CBS, quase toda compra com nota de fornecedor do regime regular gera crédito. Para um item vendido a R$ 100 (custo R$ 72, ICMS de 18% com crédito, 3% de frete/comissão, 90% das compras com crédito cheio):</p>"+t2+
   f"<p><b>Split payment:</b> quando chegar às vendas entre empresas (previsão de início gradual no 2º semestre de 2027), a CBS sai na hora do pagamento. Estimativa da CBS líquida deste caso: <b>{f0(l2)}</b> por mês. Hoje esse dinheiro fica no caixa até o vencimento do tributo; com o split, deixa de ficar. Capital de giro a repor (estimativa, cerca de 35 dias): <b>{f0(f2)}</b>.</p><p class='small muted' style='margin:0'>Estimativas com alíquota não oficial da CBS (9,21%) e prazos hipotéticos. O desenho final do split ainda depende de regulamentação.</p>",
 acoes=["Classificar os fornecedores por regime: comprar de fornecedor que não dá crédito só se o preço líquido compensar.",
        lambda r:f"Margem de contribuição de {pct(r['mc'],0)} é curta: 1 ponto de margem vale {f0(800000*.01)} por mês. Revisar a tabela dos 100 itens mais vendidos.",
        "Começar a simular no fluxo de 13 semanas o recebimento sem o imposto.",
        "Encurtar o prazo dos clientes com mais atraso e exigir garantia acima do limite."]),
dict(titulo="Caso 3 · Pequena indústria no Lucro Real (≈ R$ 2 milhões/mês)",
 quem="Fabrica componentes para outras indústrias; 70 funcionários; 3 clientes respondem por 45% das vendas.",
 fat=2000000,regime="Lucro Real",cv=.70,cf=450000,caixa=300000,pmr=50,
 dividas=[("Capital de giro do banco",1200000,.019),("Financiamento de máquina (linha BNDES)",800000,.013)],
 reforma=lambda r:"<p>No Lucro Real já existe crédito de PIS/Cofins; com a CBS, o crédito fica mais amplo (energia, frete, serviços, máquinas). O IPI vai a zero em 2027, exceto produtos com industrialização incentivada na Zona Franca de Manaus. Para um produto vendido a R$ 200 (custo R$ 110, ICMS de 18% e PIS/Cofins de 9,25% com crédito, 2% de comissão):</p>"+t3+
   f"<p><b>Split payment:</b> CBS líquida estimada deste caso: <b>{f0(l3)}</b> por mês; capital de giro a repor quando o split valer para as suas vendas: cerca de <b>{f0(f3)}</b>. Saldos credores de ICMS existentes no fim de 2032 poderão ser usados contra o IBS em 240 parcelas mensais após homologação pelo estado (LC 227/2026, arts. 132 e seguintes): não deixe crédito acumular sem plano.</p><p class='small muted' style='margin:0'>Estimativas com alíquota não oficial e prazos hipotéticos.</p>",
 acoes=["Reduzir a concentração: 3 clientes com 45% das vendas é risco. Meta de nenhum cliente acima de 20% em 24 meses.",
        "Revisar os contratos com os 3 maiores clientes e incluir a cláusula tributária e o índice de reajuste.",
        lambda r:f"Prazo de 50 dias prende {f0(r['giro'])}; cada 10 dias a menos liberam {f0(r['libera10'])}.",
        "Pedir ao contador o mapa de créditos de 2027 (o que vai gerar crédito de CBS que hoje não gera de PIS/Cofins)."]),
]
EX={"A":ex_A,"B":ex_B,"C":ex_C}
def exemplos(n):
    out="".join(bloco(x) for x in EX[n]())
    return out
