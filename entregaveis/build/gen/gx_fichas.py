# -*- coding: utf-8 -*-
from base import pct
def blank(cols,n,first=None,h=19):
    th="".join(f"<th>{c}</th>" for c in cols)
    rows="".join("<tr>"+"".join(f"<td style='height:{h}pt'>{(first[i] if first and i<len(first) and j==0 else '')}</td>" for j in range(len(cols)))+"</tr>" for i in range(n))
    return f"<table>{'<tr>'+th+'</tr>'}{rows}</table>"
def kv(items):
    return "<table>"+"".join(f"<tr><td style='width:62%'>{a}</td><td style='height:19pt'>{b}</td></tr>" for a,b in items)+"</table>"
CONV="".join(f"<tr><td class='n'>{pct(m,0)} ao mês</td><td class='n'><b>{pct((1+m)**12-1,0)}</b> ao ano</td></tr>" for m in [.01,.015,.02,.025,.03,.04,.05,.08,.12])
def fichas(n):
    item={"A":"Produto ou prato","B":"Serviço ou contrato","C":"Produto"}[n]
    h=f"""<p>As fichas abaixo são para preencher à mão (imprima estas páginas) ou copiar para as planilhas do kit. Cada ficha leva de 15 a 40 minutos. Os números que saírem daqui alimentam o app e a reunião com o contador.</p>
<h2 class="pb">Escudo 1 · Caixa</h2>
<h3>Ficha 1 · Raio-X do caixa (Dia 1)</h3>
{blank(["Onde está o dinheiro (banco, maquininha, app, conta digital)","Saldo hoje (R$)"],6)}
{kv([("(A) Total em caixa hoje","R$"),("(B) A receber nos próximos 30 dias (cartão, boletos, Pix agendado)","R$"),("(C) A pagar nos próximos 30 dias (fornecedores, folha, aluguel, impostos, parcelas)","R$"),("<b>Fôlego de 30 dias = A + B − C</b>","<b>R$</b>"),("Custo fixo por mês (o que você paga mesmo sem vender nada)","R$"),("Reserva mínima (1 × custo fixo) / ideal (3 × custo fixo)","R$ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; / R$"),("Quanto falta para a reserva mínima","R$"),("% das vendas para separar por dia = falta ÷ (vendas do mês × 6)","%"),("Pró-labore fixo definido para o dono","R$")])}
<p class="small muted">Exemplo: falta R$ 12.000 de reserva e você vende R$ 50.000 por mês → 12.000 ÷ (50.000 × 6) = 4% das vendas por dia, durante 6 meses.</p>
<h3 class="pb">Ficha 2 · Fluxo de caixa de 13 semanas (Dia 2)</h3>
<p class="small">Saldo final = saldo inicial + entradas − saídas. O saldo final de uma semana é o saldo inicial da seguinte. Marque em vermelho a primeira semana negativa e escreva a ação na última coluna.</p>
{blank(["Semana (de __/__)","Saldo inicial","Entradas","Saídas","Saldo final","Ação se ficar negativo"],13,[str(i+1) for i in range(13)],20)}
<h3 class="pb">Ficha 3 · Mapa das dívidas (Dia 3)</h3>
{blank(["Credor / tipo","Saldo (R$)","Taxa ao mês","Taxa ao ano","Parcela","Garantia","Ação (quitar / trocar / renegociar)"],9)}
<div class="two"><div><h3>Tabela de conversão</h3><table><tr><th class="n">Taxa ao mês</th><th class="n">Equivale a</th></tr>{CONV}</table></div>
<div><h3>Como decidir</h3><ol class="small"><li>Ordene da maior taxa anual para a menor.</li><li>Tudo acima da Selic + 6% (19,75% ao ano) é candidato a troca por linha mais barata, se você conseguir aprovação.</li><li>Nunca pegue dívida nova para cobrir prejuízo que se repete todo mês: primeiro conserte a margem (Escudo 2).</li><li>Renegociação boa cabe na margem do pior mês do ano.</li></ol></div></div>
<h2 class="pb">Escudo 2 · Margem</h2>
<h3>Ficha 4 · Margem dos principais itens (Dia 4)</h3>
<p class="small">Margem de contribuição (R$) = preço − custo direto − impostos sobre a venda − taxas e comissões. Margem % = margem R$ ÷ preço.</p>
{blank([item,"Preço","Custo direto","Impostos","Taxas/comissão","Margem R$","Margem %","Vendas/mês"],15)}
"""
    if n=="A":
        h+=f"""<h3 class="pb">Ficha 5 · Ficha técnica de um prato ou produto</h3>
<p><b>Item:</b> ______________________ &nbsp; <b>Rende:</b> ____ porções/unidades</p>
{blank(["Ingrediente / componente","Quantidade usada","Preço de compra (R$ por kg, L ou un.)","Custo na receita (R$)"],10)}
{kv([("Custo total da receita","R$"),("Custo por porção/unidade = total ÷ rendimento","R$"),("Embalagem por unidade (delivery)","R$"),("Preço de venda atual","R$"),("Custo de insumos ÷ preço (referência de mercado para prato pronto: até 30–35%)","%"),("Taxa de cartão/app sobre este item","R$"),("Margem de contribuição por unidade","R$")])}"""
    elif n=="B":
        h+=f"""<h3 class="pb">Ficha 5 · Custo real da sua hora</h3>
{kv([("(1) Custos fixos do mês (aluguel, sistemas, contador, pró-labore, folha administrativa)","R$"),("(2) Folha + encargos de quem atende o cliente","R$"),("(3) Pessoas que atendem × horas por mês de cada uma","h"),("(4) % das horas que vira atendimento cobrado (realista: 60% a 75%)","%"),("(5) Horas faturáveis = (3) × (4)","h"),("(6) Custo da hora = [(1) + (2)] ÷ (5)","R$"),("(7) Impostos sobre a venda + taxas (em % do preço)","%"),("(8) Margem de lucro desejada (em % do preço)","%"),("<b>(9) Preço mínimo da hora = (6) ÷ [1 − (7) − (8)]</b>","<b>R$</b>"),("Preço que você cobra hoje por hora (valor do serviço ÷ horas gastas)","R$")])}
<p class="small muted">Exemplo: custos fixos de R$ 20.000 + folha de R$ 40.000; 6 pessoas × 160 h × 65% = 624 horas faturáveis → custo da hora de R$ 96,15. Com 12% de impostos e taxas e 15% de lucro: 96,15 ÷ (1 − 0,12 − 0,15) = R$ 131,71 por hora.</p>"""
    else:
        h+=f"""<h3 class="pb">Ficha 5 · Comparação de fornecedores (preço líquido)</h3>
<p class="small">A partir de 2027, o preço que importa para quem está no regime regular é o <b>preço líquido</b>: o valor pago menos o crédito de IBS/CBS que a nota permite aproveitar. Fornecedor do Simples \"por dentro\", MEI ou produtor rural não contribuinte geram crédito menor ou presumido; confirme cada caso com o contador.</p>
{blank(["Insumo","Fornecedor","Regime do fornecedor","Preço com nota","Crédito estimado","Preço líquido","Prazo de pagamento"],12)}"""
    h+=f"""<h3>Ficha 6 · Ponto de equilíbrio e meta diária</h3>
{kv([("(A) Custos fixos do mês","R$"),("(B) Margem de contribuição média (em %)","%"),("(C) Ponto de equilíbrio = A ÷ B","R$ por mês"),("(D) Dias de venda ou atendimento no mês","dias"),("(E) Meta mínima por dia = C ÷ D","R$ por dia"),("(F) Lucro desejado no mês","R$"),("(G) Meta com lucro = (A + F) ÷ B","R$ por mês")])}
<h3>Plano de reajuste</h3>
{blank([item,"Preço atual","Preço novo","% de reajuste","Data do aviso ao cliente","Data de vigência"],8)}
<h2 class="pb">Escudo 3 · Fiscal</h2>
<h3>Ficha 7 · Raio-X fiscal (Dia 6)</h3>
{kv([("Regime hoje (MEI, Simples, Presumido, Real)",""),("Se Simples: anexo e faixa atuais",""),("Faturamento dos últimos 12 meses","R$"),("Total de impostos pagos nos últimos 12 meses","R$"),("Alíquota efetiva = impostos ÷ faturamento","%"),("Se Simples: a empresa fez opção pelo regime regular de IBS/CBS na 1ª janela (até 30/10/2026)?","( ) Sim ( ) Não ( ) Não sei"),("Se fez e quer desistir: cancelamento de 03/11 a 20/12/2026 (irretratável)","( ) Vou cancelar ( ) Vou manter"),("Simulação por dentro x híbrido para a janela de março de 2027 pedida ao contador em","____/____/______"),("Atividade com redução de alíquota? (confirmar com o contador)","( ) Sim, qual: ________ ( ) Não"),("Sistema de nota fiscal pronto para destacar CBS e IBS?","( ) Sim ( ) Não ( ) Não sei")])}
<h3 class="pb">Ficha 8 · {'Cadastro dos produtos (NCM)' if n=='A' else ('Código do serviço e contratos' if n=='B' else 'Fornecedores, créditos e contratos')}</h3>
"""
    if n=="A":
        h+=blank(["Produto","NCM no sistema","NCM conferido pelo contador","Alíquota: cheia / reduzida 60% / zero / Imposto Seletivo"],14)
    else:
        h+=blank(["Fornecedor (10 maiores)","Regime","Valor comprado/mês","Gera crédito? (cheio / parcial / presumido / não)"],10)
    h+=f"""<h3>Contratos que atravessam 2027</h3>
{blank(["Cliente / contrato","Valor mensal","Vencimento","Tem cláusula tributária?","Ação e data"],8)}
<h3>Calendário de decisões</h3>
<table><tr><th>Data</th><th>Decisão</th><th>Feito</th></tr>
<tr><td>03/11 a 20/12/2026</td><td>Se a empresa do Simples optou pelo híbrido e quer desistir: pedir o cancelamento (irretratável)</td><td>( )</td></tr>
<tr><td>Até 15/12/2026</td><td>Acompanhar a alíquota oficial da CBS e refazer a conta de preço</td><td>( )</td></tr>
<tr><td>Dezembro/2026</td><td>Tabela de preços e propostas de 2027 revisadas; sistema de nota testado</td><td>( )</td></tr>
<tr><td>01/01/2027</td><td>CBS no lugar de PIS/Cofins; IPI zero (com exceções); Imposto Seletivo</td><td>( )</td></tr>
<tr><td>Março/2027</td><td>Janela do Simples: por dentro x híbrido, com efeito a partir de 01/07/2027</td><td>( )</td></tr>
<tr><td>2º semestre/2027</td><td>Caixa preparado para o split payment (início gradual, começando pelas vendas entre empresas)</td><td>( )</td></tr>
<tr><td>Janeiro/2029</td><td>Início da troca de ICMS e ISS pelo IBS: rever preços e contratos</td><td>( )</td></tr></table>"""
    return h
