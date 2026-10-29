# -*- coding: utf-8 -*-
from base import *
AULAS={a["id"]:a for a in NVE["aulas"]}
AULA_CSS=".aulabox h3{font-size:12pt}.aulabox table{font-size:9pt}"
def aula_block(a):
    h=a["html"].replace('class="faca"','class="faca"').replace('class="nota"','class="nota"')
    return f'<div class="kick">{a["min"]} min · {E(a["sub"])}</div><h1>{E(a["titulo"])}</h1><div class="aulabox">{h}</div>'

def apostila():
    body=cover("Kit Implementação 2027","Apostila das <em>4 aulas</em> de implementação","Simples por dentro x híbrido · Preço para 2027 · Cobrança e renegociação · Split payment no fluxo de caixa","Também no app, com leitura em voz")
    body+='<h1>Como estudar</h1><p>Uma aula por dia, de 15 a 20 minutos. Cada aula termina com um <b>"Faça agora"</b>: a tarefa prática que transforma a aula em resultado. No app (aba Aulas) você pode ouvir a aula pelo celular enquanto faz outra coisa.</p><ol><li>Aula 1 · Simples por dentro x híbrido</li><li>Aula 2 · Preço para 2027</li><li>Aula 3 · Cobrança e renegociação na prática</li><li>Aula 4 · Split payment no fluxo de caixa</li></ol><p class="nota">As aulas em vídeo serão adicionadas na mesma área de acesso. O conteúdo desta apostila é o mesmo das aulas.</p>'
    for k in ["u1","u2","u3","u4"]: body+='<div class="pb"></div>'+aula_block(AULAS[k])
    body+='<h2 class="pb">Fontes</h2>'+fontes_html()
    return write("Aulas-Kit-Implementacao-2027","Aulas do Kit Implementação 2027","<style>"+AULA_CSS+"</style>"+body)

def uso():
    body=cover("Painel de Implementação","Aula: como usar o <em>Painel de Implementação</em>","10 minutos para deixar a planilha pronta e criar a rotina que mantém a empresa blindada.","Planilha + rotina semanal")
    a=AULAS["uso"]; body+=aula_block(a)
    body+="""<h2>As 7 abas da planilha</h2><table><tr><th>Aba</th><th>Para que serve</th><th>Quando usar</th></tr>
<tr><td><b>Início</b></td><td>Dados da empresa, data de início e o resumo do seu progresso</td><td>Uma vez, e para acompanhar</td></tr>
<tr><td><b>Plano 30 dias</b></td><td>As 30 tarefas com data calculada e status</td><td>Todo dia</td></tr>
<tr><td><b>Caixa semanal</b></td><td>13 semanas de entradas e saídas com alerta de saldo negativo</td><td>Toda segunda-feira</td></tr>
<tr><td><b>Nota mês a mês</b></td><td>Histórico da nota do diagnóstico e dos 3 escudos, com gráfico</td><td>Uma vez por mês</td></tr>
<tr><td><b>Calendário</b></td><td>Datas oficiais da reforma com contagem regressiva</td><td>Sempre que precisar</td></tr>
<tr><td><b>Simples x Híbrido</b></td><td>Comparação do custo e do crédito para o cliente nas duas opções</td><td>Antes das janelas de março e setembro</td></tr>
<tr><td><b>Preço 2027</b></td><td>Preço necessário para manter o lucro em 2027 e em 2033, item a item</td><td>Até 31/12/2026 e quando sair a alíquota oficial</td></tr></table>
<div class="box green"><h3>Rotina de 15 minutos toda segunda</h3><ol style="margin:0"><li>Atualize a semana no Caixa semanal com o extrato.</li><li>Veja se alguma semana ficou vermelha e decida a ação (cobrar, adiar, negociar).</li><li>Marque as tarefas feitas no Plano.</li><li>Olhe o Calendário: o que vence nos próximos 30 dias?</li></ol></div>
<div class="box"><h3>Dúvidas comuns</h3><p><b>As fórmulas sumiram no Google Planilhas?</b> Abra o arquivo com "Abrir com → Planilhas Google" (não pela visualização do Drive).</p><p><b>Posso apagar linhas?</b> Prefira limpar o conteúdo. Apagar linhas pode quebrar os totais.</p><p style="margin:0"><b>A alíquota oficial saiu. E agora?</b> Na aba Preço 2027, troque a célula da CBS. Tudo recalcula sozinho.</p></div>"""
    return write("Aula-Como-Usar-o-Painel","Como usar o Painel de Implementação",body)

def modelos_decisao():
    body=cover("Kit Implementação 2027","Modelos de decisão com o <em>contador</em>","Uma folha de decisão por segmento, para sair de cada reunião com a escolha feita, o número que a justifica e o prazo.","Comércio · Serviços · Indústria/Agro/B2B")
    body+="""<h1>Como usar</h1><p>Cada modelo tem: (1) os números que você leva, (2) a pergunta que o contador responde, (3) a decisão e (4) o prazo. Preencha a lápis durante a reunião e guarde junto com o Roteiro do Contador.</p>
<h2>Modelo 0 · Simples por dentro x híbrido (todos os segmentos)</h2>
<table><tr><th>Item</th><th class="n">Por dentro</th><th class="n">Híbrido</th></tr>
<tr><td>Faturamento médio por mês</td><td>R$</td><td>R$</td></tr>
<tr><td>% das vendas para empresas do regime regular</td><td>%</td><td>%</td></tr>
<tr><td>DAS total do mês (com IBS/CBS no caso por dentro)</td><td>R$</td><td>R$</td></tr>
<tr><td>IBS/CBS a pagar fora do DAS</td><td>—</td><td>R$</td></tr>
<tr><td>(−) créditos das compras</td><td>—</td><td>R$</td></tr>
<tr><td>Custo extra de contabilidade/sistema</td><td>—</td><td>R$</td></tr>
<tr><td><b>Custo total de impostos</b></td><td><b>R$</b></td><td><b>R$</b></td></tr>
<tr><td>Crédito que o cliente PJ aproveita a cada R$ 1.000</td><td>R$</td><td>R$</td></tr>
<tr><td>Risco de perder cliente PJ se não gerar crédito cheio</td><td>baixo / médio / alto</td><td>—</td></tr></table>
<div class="box gold"><h3>Matriz de decisão</h3><table style="margin:0"><tr><th></th><th>Vende pouco para PJ</th><th>Vende muito para PJ</th></tr>
<tr><td><b>Compra pouco com nota de fornecedor do regime regular</b></td><td>Por dentro (tendência forte)</td><td>Fazer a conta: o crédito do cliente pode compensar</td></tr>
<tr><td><b>Compra muito com nota de fornecedor do regime regular</b></td><td>Fazer a conta: os créditos podem compensar</td><td>Híbrido (tendência forte)</td></tr></table></div>
<p><b>Decisão:</b> ( ) Por dentro &nbsp; ( ) Híbrido a partir de ____/____ &nbsp;&nbsp; <b>Revisar em:</b> ( ) março ( ) setembro de ______</p>
<p class="small muted">Prazos: a 1ª janela (efeito em jan/2027) encerrou em 30/10/2026; quem optou pode cancelar de 03/11 a 20/12/2026. Próximas janelas: março (efeito em 1º de julho) e setembro (efeito em janeiro do ano seguinte).</p>"""
    seg={
     "A":("Comércio e Alimentação",[("Classificação dos produtos","Lista dos 50 itens mais vendidos com NCM","Quais têm alíquota zero (cesta básica) ou redução de 60%? Algum NCM está errado?","Corrigir cadastro até 31/12/2026"),
        ("Tabela de preços 2027","Margem atual dos 20 itens principais (simulador do app)","Qual o efeito estimado da CBS e do fim do IPI no meu preço e no custo dos fornecedores?","Nova tabela até a 1ª semana de janeiro"),
        ("Bebidas e Imposto Seletivo","Lista de bebidas e itens afetados que você revende","Quanto o fornecedor deve repassar a partir de 2027?","Renegociar ou ajustar preço até janeiro"),
        ("Maquininha e split payment","Taxas atuais e volume no cartão/Pix","Como a credenciadora vai tratar o split e o que muda no valor líquido?","Pedir posição por escrito até jun/2027")]),
     "B":("Serviços",[("Redução de alíquota","Descrição exata dos serviços e registro profissional","A atividade tem redução de 30% (profissão regulamentada) ou 60% (saúde/educação)?","Confirmar por escrito até 31/12/2026"),
        ("Preço da hora","Folha + encargos + pró-labore + horas faturáveis","Qual o preço mínimo por hora em 2027 e com o IBS em 2029+?","Nova tabela até janeiro"),
        ("Contratos","Lista de contratos com prazo, valor e cláusula de reajuste","Quais precisam de aditivo com cláusula tributária?","Aditivos assinados até mar/2027"),
        ("Regime com folha alta","Folha ÷ faturamento","Com poucos créditos, qual regime é melhor de 2027 em diante?","Decidir antes da janela de março")]),
     "C":("Indústria, Agro e B2B",[("Mapa de créditos","Compras por tipo: insumos, energia, frete, máquinas, serviços","Quanto vira crédito de IBS/CBS no modelo novo? Algo deixa de gerar?","Mapa pronto até 31/12/2026"),
        ("Fornecedores","Lista dos 10 maiores com regime de cada um","Vale trocar fornecedor do Simples/MEI por um do regime regular? Qual o preço líquido de crédito?","Revisar cotações até mar/2027"),
        ("Benefícios de ICMS e IPI","Benefícios atuais e produtos com IPI","Qual o efeito do IPI zero em 2027 e da redução dos benefícios de 2029 a 2032?","Simulação até jun/2027"),
        ("Split payment e capital de giro","Prazo médio de recebimento e de pagamento","Quanto de caixa deixo de ter entre vender e recolher? Preciso de capital de giro extra?","Plano de caixa até o 2º sem/2027"),
        ("Produtor rural e cooperativas","Compras de produtor rural PF e cooperativas","Como funciona o crédito presumido nessas compras?","Confirmar até mar/2027")]),
    }
    for n,(nome,rows) in seg.items():
        body+=f'<h2 class="pb">Modelo {"ABC".index(n)+1} · {nome}</h2>'
        for i,(t,leva,perg,prazo) in enumerate(rows):
            body+=f'<div class="box avoid"><h3>{i+1}. {E(t)}</h3><p class="small"><b>Leve:</b> {E(leva)}<br><b>Pergunte:</b> {E(perg)}</p><p class="small"><b>Resposta / número:</b></p><div class="line"></div><div class="line"></div><p class="small" style="margin-top:6pt"><b>Decisão:</b> ______________________________________ &nbsp; <b>Prazo sugerido:</b> {E(prazo)}</p></div>'
    body+='<p class="footer-note">Modelos de apoio à conversa com o contador. As decisões tributárias devem ser validadas por profissional habilitado.</p>'
    return write("Modelos-de-Decisao-com-o-Contador","Modelos de decisão com o contador",body)

def pack():
    R=NVE["regua"]
    regua="".join(f'<h3>{E(m["quando"])} · {E(m["titulo"])}</h3><div class="script">{E(m["msg"])}</div>' for m in R)
    body=cover("Pack Renegociação e Cobrança","Os roteiros para <em>receber, renegociar e respirar</em>","Mensagens e falas prontas para clientes, fornecedores e bancos, com o passo a passo de cada conversa.","+ modelos editáveis em Word")
    body+="""<h1>Como usar este pack</h1><p>Cada roteiro tem: <b>quando usar</b>, <b>o que preparar</b>, <b>o que falar</b> e <b>o que não fazer</b>. Troque o que está entre colchetes pelos seus dados. Os mesmos textos estão no arquivo Word editável e a régua de cobrança está no app, com o nome do cliente e a sua chave Pix preenchidos.</p>
<div class="box gold"><h3>Os 4 princípios</h3><ol style="margin:0"><li><b>Cobrar cedo é cobrar melhor:</b> quanto mais tempo passa, menor a chance de receber.</li><li><b>Proposta concreta:</b> sempre leve números (valor, prazo, parcela).</li><li><b>Por escrito:</b> todo acordo vira mensagem ou documento assinado.</li><li><b>Respeito sempre:</b> o Código de Defesa do Consumidor (art. 42) proíbe expor o cliente ao ridículo, constranger ou ameaçar. A inclusão em cadastro de inadimplentes exige comunicação prévia ao consumidor (art. 43, §2º).</li></ol></div>
<h2 class="pb">Parte 1 · Clientes: régua de cobrança (6 mensagens)</h2><p class="small">Para WhatsApp ou e-mail. Placeholders: {nome}, {valor}, {venc}, {pix}, {prazo}, {empresa}.</p>"""+regua+"""
<h2 class="pb">Parte 1 · Clientes: ligação de cobrança</h2>
<div class="script">1. Abertura: "Oi, [nome], aqui é [seu nome] da [empresa]. Tudo bem? Estou ligando sobre o pagamento de [valor] que venceu em [data]. Você tem 2 minutinhos?"
2. Escuta: "Aconteceu alguma coisa?" (deixe o cliente falar; anote o motivo)
3. Proposta: "Para facilitar, consigo duas opções: [A] pagar hoje pelo Pix sem juros, ou [B] dividir em [2] vezes de [valor], a primeira até [data]. Qual fica melhor?"
4. Fechamento: "Combinado então: [repetir o acordo]. Vou te mandar por mensagem para ficar registrado, tudo bem?"
5. Registro: envie o acordo por escrito em até 1 hora.</div>
<div class="box red"><h3>Não faça</h3><ul style="margin:0"><li>Ligar antes das 8h, depois das 20h, nem no trabalho do cliente expondo a dívida a colegas.</li><li>Falar com vizinhos, parentes ou postar em redes sociais.</li><li>Ameaçar com medidas que você não vai tomar.</li></ul></div>
<h3>Mensagem de acordo fechado</h3><div class="script">Olá, [nome]! Conforme combinamos hoje, o débito de [valor total] será pago em [n] parcelas de [valor], com vencimentos em [datas], pelo Pix [chave]. Se alguma parcela atrasar mais de [5] dias, o acordo é cancelado e o saldo volta a valer com multa e juros previstos. Pode me confirmar com um "de acordo"? Obrigado! [empresa]</div>
<h3>Cliente empresa (B2B): e-mail formal</h3><div class="script">Assunto: Pendência financeira – NF [número] – [sua empresa]

Prezados, identificamos em aberto a nota fiscal [número], no valor de [valor], vencida em [data]. Solicitamos a regularização até [data] ou o contato para alinharmos uma proposta. Seguem os dados para pagamento: [dados]. Caso o pagamento já tenha sido feito, pedimos a gentileza de enviar o comprovante.

Atenciosamente, [nome] – [cargo] – [telefone]</div>

<h2 class="pb">Parte 2 · Fornecedores: ganhar prazo sem perder parceiro</h2>
<h3>Antes de ligar, prepare</h3><ul><li>Quanto você compra por mês com esse fornecedor e há quanto tempo.</li><li>O que você precisa: mais prazo, parcelar um atraso ou desconto à vista.</li><li>Uma proposta que caiba no seu fluxo de 13 semanas.</li></ul>
<h3>Pedir mais prazo</h3><div class="script">"[Nome], somos clientes há [tempo] e compramos em média [valor] por mês com vocês. Estamos reorganizando o caixa para 2027 e queria propor passar o prazo de [28] para [42] dias nas próximas compras. Em troca, consigo concentrar mais pedidos com vocês / manter o volume / fazer pedido programado. Isso é possível?"</div>
<h3>Parcelar uma conta atrasada</h3><div class="script">"[Nome], quero ser transparente: tenho [valor] em aberto com vocês e não quero deixar isso crescer. Consigo pagar [entrada] agora e o restante em [n] parcelas de [valor], a partir de [data]. Mantenho as compras novas à vista enquanto isso. Podemos formalizar assim?"</div>
<h3>Desconto para pagamento à vista</h3><div class="script">"Se eu antecipar o pagamento desta compra para o Pix hoje, qual desconto vocês conseguem? Pela minha conta, [3%] faz sentido para os dois lados."</div>
<p class="small muted">Use a calculadora "pagar à vista ou parcelar" do app para saber se o desconto compensa.</p>

<h2 class="pb">Parte 3 · Bancos: renegociar e trocar dívida cara</h2>
<h3>Prepare o dossiê (1 página)</h3><ul><li>Lista de dívidas com saldo, taxa ao mês e parcela (ferramenta Dívidas x Selic).</li><li>Faturamento dos últimos 12 meses e fluxo de 13 semanas.</li><li>O que você pede: menor taxa, mais prazo, carência ou troca de dívida.</li></ul>
<h3>Roteiro com o gerente</h3><div class="script">"[Nome], sou cliente há [tempo] e quero resolver as minhas dívidas antes que virem atraso. Hoje tenho [cheque especial / capital de giro] de [valor] a [x]% ao mês, o que dá mais de [y]% ao ano. Quero trocar esse saldo por uma linha mais barata e mais longa, de preferência com garantia do FGO/Pronampe, se eu tiver direito. Com uma parcela de até [valor], eu pago em dia. Quais opções você consegue me apresentar até [data]? Preciso do CET por escrito para comparar."</div>
<div class="box"><h3>Perguntas obrigatórias</h3><ul style="margin:0"><li>Qual é o CET (custo efetivo total) ao mês e ao ano?</li><li>Tem tarifa, seguro ou título de capitalização embutido? (Você pode recusar venda casada.)</li><li>Posso amortizar antes com desconto dos juros?</li><li>Tem carência? Os juros correm na carência?</li></ul></div>
<h3>Comparar propostas</h3><table><tr><th>Banco/linha</th><th class="n">Valor</th><th class="n">CET a.m.</th><th class="n">Prazo</th><th class="n">Parcela</th><th class="n">Total pago</th></tr>"""+"<tr><td style='height:20pt'></td><td></td><td></td><td></td><td></td><td></td></tr>"*4+"""</table>
<p class="small muted">Referência: Selic em 13,75% ao ano (desde 16/09/2026). O Pronampe tem teto de Selic + 6% ao ano. Qualquer linha muito acima disso precisa de um motivo forte.</p>
<h3>Se o banco disser não</h3><div class="script">"Entendo. Pode registrar o meu pedido e me dizer o que precisaria mudar para aprovar? Vou cotar em outras instituições (cooperativas de crédito, bancos digitais e agências de fomento) e volto a falar com você."</div>

<h2 class="pb">Parte 4 · Modelos de documento</h2>
<p>O arquivo <b>Pack-Modelos-Editaveis.docx</b> traz, prontos para editar:</p><ul><li>Termo de acordo e parcelamento de débito (cliente).</li><li>Proposta de renegociação para fornecedor.</li><li>Carta de proposta de renegociação ao banco.</li><li>Todas as mensagens deste pack.</li></ul>
<p class="footer-note">Modelos de referência. Para dívidas altas, protesto ou cobrança judicial, consulte um advogado.</p>"""
    return write("Pack-Renegociacao-e-Cobranca","Pack Renegociação e Cobrança",body)

def comousar_calc():
    body=cover("Calculadora de Impacto da Reforma","Como usar a <em>Calculadora de Impacto</em>","Em 15 minutos você descobre quanto a reforma mexe no imposto, na margem e no preço do seu negócio.","Planilha Excel / Google Planilhas")
    body+="""<h1>Passo a passo</h1>
<h3>1. Abra a planilha</h3><p>Excel: abra o arquivo direto. Google Planilhas: drive.google.com → Novo → Upload de arquivo → clique no arquivo → "Abrir com Planilhas Google". No celular, use o app Google Planilhas.</p>
<h3>2. Aba "1. Seus dados"</h3><p>Preencha só as células amarelas: faturamento por mês, compras com nota, quanto das compras vem de fornecedores do regime regular, folha, outras despesas, regime atual, impostos sobre a venda hoje e quanto disso é PIS/Cofins, créditos que você já aproveita e % das vendas para empresas.</p>
<h3>3. Aba "2. Alíquotas" (editável)</h3><p>Traz as estimativas não oficiais (CBS 9,21% e IBS 18,7%) e o cronograma de transição. <b>Quando o Senado publicar a alíquota oficial da CBS (até 15/12/2026), troque a célula.</b> Tudo recalcula. Se o seu item tem redução de 30% ou 60%, ou alíquota zero, ajuste o campo "Redução".</p>
<h3>4. Aba "3. Resultado"</h3><p>Mostra, ano a ano (2026 a 2033): imposto sobre consumo estimado, créditos, imposto líquido, carga sobre o faturamento e a variação em relação a hoje, além do <b>reajuste de preço necessário para manter o lucro</b>.</p>
<h3>5. Aba "4. Simples: por dentro x híbrido"</h3><p>Só para o Simples. Compara o crédito que o seu cliente empresa aproveita e o custo estimado das duas opções.</p>
<div class="box gold"><h3>Como interpretar</h3><ul style="margin:0"><li><b>Variação positiva</b> na carga: a reforma tende a pesar mais. Revise preço, custos e créditos.</li><li><b>Variação negativa</b>: a reforma tende a aliviar. Ótimo, mas não baixe o preço antes de confirmar com o contador.</li><li>Tudo é <b>estimativa</b>: o resultado ajuda a decidir e a fazer as perguntas certas ao contador.</li></ul></div>
<h2>Limites da calculadora</h2><ul><li>Não considera regimes específicos (combustíveis, financeiro, imóveis, cooperativas, Zona Franca).</li><li>Assume que os fornecedores do regime regular repassam o IBS/CBS no preço.</li><li>Benefícios de ICMS e substituição tributária não são simulados.</li><li>Alíquotas de 2027 em diante ainda não são oficiais.</li></ul>
<div class="faca">Preencha a aba 1 com os números do último mês e anote: carga hoje ____% · carga em 2027 ____% · em 2033 ____% · reajuste necessário ____%. Leve ao contador.</div>"""
    return write("Como-usar-Calculadora-Impacto","Como usar a Calculadora de Impacto",body)

def comousar_caixa():
    body=cover("Fluxo de Caixa 13 Semanas + DRE","Como usar a planilha de <em>Fluxo de Caixa</em>","15 minutos por semana para enxergar o caixa 3 meses à frente e saber se a empresa dá lucro de verdade.","Planilha Excel / Google Planilhas")
    body+="""<h1>Passo a passo</h1>
<h3>1. Aba "Configurar"</h3><p>Nome da empresa, data da segunda-feira em que começa a semana 1 e saldo de caixa inicial (soma das contas da empresa). As datas das 13 semanas são calculadas sozinhas.</p>
<h3>2. Aba "Fluxo 13 semanas"</h3><p>Nas linhas de <b>entradas</b> (vendas à vista, cartão, boletos, outros) e <b>saídas</b> (fornecedores, folha, pró-labore, aluguel, impostos, parcelas, outros), preencha o que você <b>espera</b> receber e pagar em cada semana. A planilha calcula o saldo de cada semana, acumula e pinta de vermelho a semana com saldo negativo.</p>
<p>Na linha "Reserva mínima" você vê se o saldo está acima de 1 mês de custo fixo.</p>
<h3>3. Toda segunda-feira</h3><ol><li>Troque o previsto pelo realizado da semana que passou (use o extrato).</li><li>Revise as próximas semanas.</li><li>Se aparecer vermelho: cobrar, adiar uma compra, negociar prazo ou cortar despesa. Nessa ordem.</li></ol>
<h3>4. Aba "DRE mensal"</h3><p>Uma vez por mês, preencha faturamento, impostos sobre a venda, custo da mercadoria ou do serviço, despesas variáveis e fixas. A planilha mostra margem de contribuição, ponto de equilíbrio e lucro líquido do mês, com 12 colunas para acompanhar o ano.</p>
<div class="box gold"><h3>Fluxo de caixa x DRE</h3><p style="margin:0">O <b>fluxo</b> responde "vai faltar dinheiro?" (olha datas). A <b>DRE</b> responde "a empresa dá lucro?" (olha competência). Uma empresa pode ter lucro e quebrar por falta de caixa, ou ter caixa e estar dando prejuízo. Você precisa dos dois.</p></div>
<div class="faca">Preencha o saldo inicial e as entradas e saídas das próximas 4 semanas agora. Leva 15 minutos.</div>"""
    return write("Como-usar-Fluxo-de-Caixa","Como usar o Fluxo de Caixa 13 Semanas + DRE",body)

if __name__=="__main__":
    for f in (apostila,uso,modelos_decisao,pack,comousar_calc,comousar_caixa): print(f())
