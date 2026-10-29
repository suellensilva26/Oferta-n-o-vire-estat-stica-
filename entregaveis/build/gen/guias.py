# -*- coding: utf-8 -*-
from base import *

def preco(p0,c,tx,ov,pis,cr0,sr,red=0,cbs=.0921,ibs=.187,cri=0):
    lucro0=p0*(1-tx-ov)-c+c*(cr0+cri)*sr
    c27=cbs*(1-red)+(0.001 if red<1 else 0);outros=max(0,tx-pis)
    cred27=c*sr*(cbs/(1+cbs+outros))+c*sr*cri;kA=(1+c27)*(1-outros-ov)-c27
    l27same=(p0/(1+c27))*kA+cred27-c;P27=(lucro0+c-cred27)/kA*(1+c27)
    t=(cbs+ibs)*(1-red);tf=cbs+ibs;cred33=c*sr*(tf/(1+tf));kB=1-ov*(1+t)
    l33same=p0/(1+t)-ov*p0-c+cred33;P33=(lucro0+c-cred33)/kB*(1+t)
    return dict(lucro0=lucro0,P27=P27,l27=l27same,P33=P33,l33=l33same,c27=c27,t=t)

N={
"A":dict(
 nome="Comércio e Alimentação", arq="Comercio-e-Alimentacao",
 quem="lojas, mercados, padarias, restaurantes, lanchonetes, distribuidoras de bairro, açougues, farmácias e e-commerce",
 dor="Você vive de giro: vende hoje, paga o fornecedor amanhã e torce para o cartão cair a tempo. Margem de comércio é curta, então qualquer ponto percentual de imposto, taxa ou calote vira prejuízo no fim do mês.",
 dado="Comércio é o setor com a maior taxa de mortalidade em 5 anos no estudo do Sebrae (30,2%), à frente da indústria de transformação (27,3%) e dos serviços (26,6%).",
 muda=[
  ("Preço do fornecedor vai mexer","Em 2027 o IPI vai a zero para a maioria dos produtos (exceto os que competem com a Zona Franca de Manaus) e entra o Imposto Seletivo, que pesa sobre itens como bebidas açucaradas, bebidas alcoólicas e cigarros. Sua tabela de compra pode subir em alguns itens e cair em outros."),
  ("Cesta básica com alíquota zero e alimentos com redução","A LC 214/2025 criou a Cesta Básica Nacional com alíquota zero de IBS/CBS e uma lista de alimentos com redução de 60%. Isso só funciona a seu favor se o cadastro (NCM) dos seus produtos estiver correto."),
  ("Concorrente do regime regular passa a ter crédito","Supermercados e atacarejos do Lucro Presumido/Real vão abater o IBS/CBS das compras. Isso pode virar preço menor na prateleira deles. Você precisa saber a sua margem item a item para não entrar numa guerra de preço no escuro."),
  ("Maquininha e Pix vão separar imposto (split payment)","A partir do 2º semestre de 2027, de forma gradual e começando por operações entre empresas, o sistema de pagamento poderá reter o imposto na hora. Para quem vende no cartão, isso pode mudar quanto cai na conta. Fique atento ao comunicado da sua credenciadora."),
  ("Se você é do Simples, a sua guia não muda por causa da reforma","Ficando \"por dentro\" do Simples, o DAS continua. A decisão de ir para o \"híbrido\" faz sentido sobretudo para quem vende muito para outras empresas. Para quem vende ao consumidor final, ficar por dentro tende a ser mais simples. Confirme com o contador."),
 ],
 ex=dict(titulo="Lanchonete no Lucro Presumido (exemplo ilustrativo)",p0=30,c=12,tx=.0965,ov=.035,pis=.0365,cr0=0,sr=.6,red=0,
   desc="Prato vendido a R$ 30,00; custo de insumos R$ 12,00; impostos sobre a venda hoje de 9,65% (3,65% de PIS/Cofins + 6% de ICMS efetivo, número hipotético); 3,5% de taxa de cartão/app; 60% das compras de fornecedores que darão crédito cheio."),
 erros=["Dar desconto \"no olho\" sem saber a margem de cada item.","Deixar o estoque parado virar dinheiro morto (produto parado há mais de 90 dias).","Vender fiado ou no crediário sem limite por cliente.","Antecipar recebíveis do cartão todo mês para fechar a conta (é um empréstimo caro disfarçado).","Achar que a reforma \"é coisa do contador\" e descobrir o efeito no preço só em janeiro."],
 tarefa="Liste os seus 20 produtos mais vendidos e confira com o contador se o NCM de cada um está correto. É ele que define alíquota cheia, reduzida ou zero."
),
"B":dict(
 nome="Serviços", arq="Servicos",
 quem="clínicas, escritórios, agências, consultorias, salões, academias, escolas, oficinas, TI e prestadores em geral",
 dor="O seu custo principal é gente. Salário não gera crédito de IBS/CBS, a inadimplência em serviços é a maior entre os setores e o ISS que você conhece hoje vai sendo trocado pelo IBS de 2029 a 2032.",
 dado="Das 9,3 milhões de empresas inadimplentes no Brasil (recorde da Serasa Experian), 56% são de serviços, o setor com a maior fatia.",
 muda=[
  ("ISS vira IBS aos poucos (2029–2032)","Em 2027 o seu ISS continua. De 2029 a 2032, o ISS cai para 90%, 80%, 70% e 60% e o IBS sobe no lugar. Em 2033, o ISS deixa de existir. Isso muda o preço dos contratos longos."),
  ("Folha não gera crédito","No modelo novo, quem está no regime regular abate o imposto pago nas compras. Mas salário não é compra: empresa de serviço com folha alta tem pouco crédito para abater. Por isso a conta do preço precisa ser feita com calma."),
  ("Reduções para algumas atividades","A LC 214/2025 prevê redução de 60% para serviços de saúde e educação listados e de 30% para algumas profissões intelectuais regulamentadas (como advocacia, contabilidade, engenharia e arquitetura, entre outras), conforme regras da lei. Confirme se a sua atividade se enquadra."),
  ("Cliente empresa vai olhar o crédito","Se você atende outras empresas do regime regular, elas vão preferir fornecedores que geram mais crédito. Se você é do Simples \"por dentro\", o seu cliente aproveita só a parte de IBS/CBS que está dentro do seu DAS. Essa é a conta Simples por dentro x híbrido."),
  ("Contrato sem cláusula de reajuste vira armadilha","Contrato de 12, 24 ou 36 meses assinado hoje vai atravessar a mudança de 2027 e a troca do ISS. Sem cláusula de reajuste por mudança de tributo, a diferença sai do seu lucro."),
 ],
 ex=dict(titulo="Consultoria no Lucro Presumido (exemplo ilustrativo)",p0=10000,c=1500,tx=.0865,ov=0,pis=.0365,cr0=0,sr=.8,red=0,
   desc="Projeto vendido a R$ 10.000; custos diretos com compra de terceiros/ferramentas R$ 1.500 (a folha não entra aqui porque não gera crédito); impostos sobre a venda hoje de 8,65% (3,65% de PIS/Cofins + 5% de ISS); 80% das compras com crédito cheio."),
 erros=["Cobrar por hora sem saber o custo real da hora (folha + encargos + imposto + horas não faturadas).","Começar o serviço sem sinal ou sem contrato assinado.","Deixar o cliente atrasar 60 dias antes de cobrar.","Assinar contrato longo sem cláusula de reajuste por mudança de tributo.","Fazer \"um favorzinho\" fora do escopo toda semana (é hora que não volta)."],
 tarefa="Abra o seu contrato padrão e veja se existe cláusula de reajuste por mudança de tributo. Se não existir, use o modelo da biblioteca e leve ao seu advogado."
),
"C":dict(
 nome="Indústria, Agro e B2B", arq="Industria-Agro-B2B",
 quem="pequenas indústrias, fábricas, confecções, gráficas, distribuidoras, transportadoras, agroindústrias, produtores rurais e quem vende principalmente para outras empresas",
 dor="Você vende para empresas, trabalha com contratos e prazos longos e carrega estoque. Na reforma, crédito vira dinheiro: quem não organizar os créditos das compras vai pagar mais imposto do que precisa, e o split payment vai mudar o dinheiro que fica no caixa entre vender e recolher.",
 dado="Em 2025 o Brasil teve 2.466 pedidos de recuperação judicial, o maior número da série da Serasa Experian.",
 muda=[
  ("Crédito amplo: energia, frete, insumos e máquinas","No regime regular, quase tudo o que você compra com nota de fornecedor do regime regular gera crédito de IBS/CBS. Organizar compras e fornecedores vira estratégia de margem."),
  ("IPI vai a zero em 2027 (com exceções)","O IPI tem alíquota zerada a partir de 2027, exceto para produtos que tenham industrialização incentivada na Zona Franca de Manaus. Isso mexe na formação de preço de quem fabrica e de quem compra de indústria."),
  ("Split payment começa pelo B2B","Os testes técnicos começaram em 15/10/2026, sem afetar pagamentos reais. A implantação deve ser gradual e opcional no 2º semestre de 2027, começando pelas operações entre empresas. Na prática, você recebe o valor sem o imposto, que vai direto para o governo."),
  ("Benefícios de ICMS diminuem de 2029 a 2032","Quem tem incentivo fiscal de ICMS precisa simular o preço de 2029 em diante: o ICMS cai para 90%, 80%, 70% e 60% e some em 2033."),
  ("Produtor rural e cooperativas têm regras próprias","Produtor rural pessoa física abaixo do limite da lei pode ficar fora do IBS/CBS, e quem compra dele pode ter crédito presumido. Cooperativas também têm regime específico. Confirme o seu caso com o contador."),
 ],
 ex=dict(titulo="Pequena indústria no Lucro Real (exemplo ilustrativo)",p0=200,c=110,tx=.2725,ov=.02,pis=.0925,cr0=.0925,cri=.18,sr=.9,red=0,
   desc="Produto vendido a R$ 200 (sem IPI); custo de insumos R$ 110; impostos sobre a venda hoje de 27,25% (9,25% de PIS/Cofins + 18% de ICMS, número hipotético); crédito de 9,25% de PIS/Cofins e de 18% de ICMS nas compras; 2% de comissão; 90% das compras com crédito cheio."),
 erros=["Comprar de fornecedor que não gera crédito sem fazer a conta do preço líquido.","Fechar contrato longo sem cláusula tributária.","Ignorar o efeito do split payment no capital de giro.","Estoque alto financiado com capital de giro caro.","Concentrar mais de 30% do faturamento em um único cliente."],
 tarefa="Monte a lista dos 10 maiores fornecedores com o regime de cada um (Simples, MEI, Presumido, Real). Ela define o seu crédito a partir de 2027."
),
}

def guia(n):
    d=N[n]; e=d["ex"]; r=preco(e["p0"],e["c"],e["tx"],e["ov"],e["pis"],e["cr0"],e["sr"],e["red"],cri=e.get("cri",0))
    plano="".join(f'<div class="chk"><div><b>Dia {t["d"]} · {E(txt(t,"t",n))}</b><br><span class="small muted">{E(txt(t,"c",n))}</span></div></div>' for t in NVE["plano30"])
    linha="".join(f'<tr><td><b>{E(x["data"])}</b></td><td><b>{E(x["t"])}</b><br><span class="small">{E(x["txt"])}</span></td><td class="small">{E(pick(x["acao"],n))}</td></tr>' for x in NVE["linha"])
    chk="".join(f'<div class="chk"><div>{E(t)}</div></div>' for t in NVE["checklistComum"]+NVE["checklistNicho"][n])
    cont="".join(f'<li>{E(q)}</li>' for q in NVE["contador"]+NVE["contadorNicho"][n])
    muda="".join(f'<div class="box avoid"><h3>{i+1}. {E(t)}</h3><p style="margin:0">{E(x)}</p></div>' for i,(t,x) in enumerate(d["muda"]))
    erros_comuns=["Misturar o dinheiro da empresa com o pessoal.","Não ter reserva: um mês ruim vira dívida cara.","Pegar empréstimo para cobrir prejuízo que se repete.","Não saber o ponto de equilíbrio (quanto precisa vender por mês para empatar).","Esperar janeiro de 2027 para falar com o contador."]
    erros="".join(f"<li>{E(x)}</li>" for x in erros_comuns+d["erros"])
    body=cover("Guia 2027–2030 · Edição "+d["nome"],"O que muda e o que fazer para <em>não virar estatística</em>",
       f"O guia completo do Método dos 3 Escudos (Caixa, Margem e Fiscal) para {d['quem']}.","Kit Não Vire Estatística")
    body+=f"""
<h1>Antes de começar</h1>
<p>Este guia foi feito para dono de negócio, não para contador. Aqui você não vai encontrar opinião política nem previsão de catástrofe. Vai encontrar <b>fatos com fonte</b>, <b>contas simples</b> e <b>tarefas práticas</b> para proteger o seu caixa, a sua margem e a sua situação fiscal nos próximos anos.</p>
<div class="box gold"><h3>Como usar este guia junto com o app</h3><p style="margin:0">Todas as contas deste guia estão prontas no <b>Painel de Blindagem</b> (o app do seu kit): diagnóstico, fôlego do caixa, simulador de preço 2027, régua de cobrança, dívidas x Selic e plano de 90 dias. Leia um capítulo e faça a tarefa no app no mesmo dia.</p></div>
<h3>O que tem aqui</h3>
<ol class="toc"><li>Os números que ninguém conta</li><li>A reforma tributária em linguagem de dono</li><li>O que muda para {E(d['nome'])}</li><li>Escudo 1 · Caixa</li><li>Escudo 2 · Margem (com conta de preço)</li><li>Escudo 3 · Fiscal</li><li>O que as grandes empresas que quebraram ensinam</li><li>Os 10 erros que mais matam negócios do seu setor</li><li>Plano de 30 dias</li><li>Linha do tempo 2026–2033</li><li>Checklist e roteiro do contador</li><li>Glossário e fontes</li></ol>
<p class="nota">Dados checados em 28/10/2026. Alguns números da reforma (como a alíquota oficial da CBS) ainda vão ser definidos: quando isso acontecer, o app é atualizado e você recebe o valor novo lá.</p>

<h2 class="pb">1. Os números que ninguém conta</h2>
<p>{E(d['dor'])}</p>
<div class="stats">
<div class="stat"><b>9,3 mi</b><span>empresas inadimplentes no Brasil, recorde da série</span><i>Serasa Experian, out/2026</i></div>
<div class="stat"><b>2.466</b><span>pedidos de recuperação judicial em 2025, o maior número já registrado</span><i>Serasa Experian, 2026</i></div>
<div class="stat"><b>13,75%</b><span>Selic ao ano desde 16/09/2026: dinheiro emprestado continua caro</span><i>Banco Central, 281ª reunião do Copom</i></div>
<div class="stat"><b>3 em 10</b><span>MEIs fecham em até 5 anos (29%); nas microempresas são 21,6%</span><i>Sebrae, Sobrevivência das Empresas</i></div>
</div>
<div class="box"><p style="margin:0"><b>No seu setor:</b> {E(d['dado'])}</p></div>
<p>Nenhum desses números quer dizer que o seu negócio vai fechar. Eles mostram <b>onde as empresas quebram</b>: falta de caixa, margem que some sem ninguém perceber, dívida cara e surpresa fiscal. São exatamente os três escudos deste guia.</p>
<div class="faca">Abra o app e faça o Diagnóstico de Sobrevivência (20 perguntas, 5 minutos). Anote aqui a sua nota: ______ /100.</div>

<h2 class="pb">2. A reforma tributária em linguagem de dono</h2>
<p>A Emenda Constitucional 132/2023 e a Lei Complementar 214/2025 trocam cinco tributos sobre consumo por um modelo novo, aos poucos, até 2033:</p>
<table><tr><th>Sai</th><th>Entra</th><th>Quem cobra</th></tr>
<tr><td>PIS e Cofins</td><td><b>CBS</b> (Contribuição sobre Bens e Serviços)</td><td>União</td></tr>
<tr><td>ICMS e ISS</td><td><b>IBS</b> (Imposto sobre Bens e Serviços)</td><td>Estados e municípios, por um Comitê Gestor</td></tr>
<tr><td>IPI (vai a zero, com exceções)</td><td><b>Imposto Seletivo</b> sobre itens como cigarro, bebidas e outros listados</td><td>União</td></tr></table>
<h3>As 5 ideias que você precisa entender</h3>
<ol><li><b>Imposto "por fora".</b> O IBS e a CBS são calculados sobre o preço sem eles e aparecem separados na nota.</li>
<li><b>Crédito amplo.</b> Quem está no regime regular abate o IBS/CBS pago nas compras. Salário não gera crédito.</li>
<li><b>Simples continua.</b> Quem é do Simples pode ficar "por dentro" (tudo no DAS) ou escolher o regime regular de IBS/CBS (o "híbrido"). A primeira janela (efeito em janeiro de 2027) encerrou em <b>30/10/2026</b> (Resolução CGSN 194/2026). Quem não optou segue "por dentro" no 1º semestre de 2027; a próxima janela é <b>março de 2027</b>, com efeito a partir de 01/07/2027, e depois março e setembro de cada ano.</li>
<li><b>Split payment.</b> O imposto poderá ser separado no momento do pagamento e ir direto para o governo. Testes desde 15/10/2026; início gradual previsto no 2º semestre de 2027, começando pelas vendas entre empresas.</li>
<li><b>Alíquota ainda em definição.</b> O Senado fixa a alíquota da CBS de 2027 até 15/12/2026. Uma estimativa não oficial do Comitê Gestor fala em 9,21% de CBS + 18,7% de IBS (27,91% no total do modelo final). A lei prevê um teto de referência de 26,5% em 2033, com mecanismo de ajuste.</li></ol>
<div class="box"><h3>O calendário em uma frase</h3><p style="margin:0">2026 é ano de teste (CBS 0,9% e IBS 0,1% só destacados na nota); em 2027 a CBS substitui PIS/Cofins e o IBS fica em 0,1% até 2028; de 2029 a 2032 o ICMS e o ISS caem para 90%, 80%, 70% e 60%; em 2033 o modelo novo está completo.</p></div>

<h2 class="pb">3. O que muda para {E(d['nome'])}</h2>
{muda}
<div class="faca">{E(d['tarefa'])}</div>

<h2 class="pb">4. Escudo 1 · Caixa</h2>
<p>Empresa não quebra por falta de lucro no papel. Quebra quando o dinheiro acaba antes do mês. O Escudo do Caixa tem 4 peças:</p>
<h3>4.1 Separar o dinheiro da empresa do seu</h3><p>Conta só da empresa, pró-labore fixo e nada de conta pessoal paga pelo caixa. Sem isso, nenhuma outra ferramenta funciona.</p>
<h3>4.2 Fluxo de caixa de 13 semanas</h3><p>Três meses, semana a semana: quanto entra, quanto sai, qual o saldo. Você enxerga o buraco antes de cair nele. Atualize toda segunda-feira (15 minutos).</p>
<table><tr><th>Semana</th><th class="n">Entradas</th><th class="n">Saídas</th><th class="n">Saldo final</th></tr>
<tr><td>1</td><td class="n">R$ 22.000</td><td class="n">R$ 19.500</td><td class="n">R$ 12.500</td></tr>
<tr><td>2</td><td class="n">R$ 18.000</td><td class="n">R$ 24.000</td><td class="n">R$ 6.500</td></tr>
<tr><td>3</td><td class="n">R$ 20.000</td><td class="n">R$ 29.000</td><td class="n"><b style="color:#b91c1c">−R$ 2.500</b></td></tr></table>
<p class="small muted">Exemplo: a semana 3 mostra o problema com 15 dias de antecedência. Dá tempo de cobrar, adiar uma compra ou negociar um prazo sem pagar juros de cheque especial.</p>
<h3>4.3 Reserva mínima</h3><p>Meta: 1 mês de custo fixo; ideal: 3 meses. Separe uma porcentagem das vendas todo dia até chegar lá (no app, o Fôlego do Caixa calcula o valor).</p>
<h3>4.4 Régua de cobrança</h3><p>Cobrança é processo, não constrangimento. Lembrete 3 dias antes, aviso no dia, cobrança no dia seguinte, proposta de acordo em 5 dias, última tentativa amigável em 15 dias e formalização em 30 dias. As 6 mensagens estão prontas no app, com o nome do cliente e a sua chave Pix.</p>
<div class="box gold"><h3>Dívida cara primeiro</h3><p style="margin:0">Com a Selic em 13,75% ao ano, cheque especial e rotativo podem custar mais de 100% ao ano. Liste as dívidas, ordene da taxa mais alta para a mais baixa e ataque a primeira. Linhas como o Pronampe têm teto de Selic + 6% ao ano: use a ferramenta Dívidas x Selic para comparar.</p></div>

<h2 class="pb">5. Escudo 2 · Margem</h2>
<p>Margem é o que sobra de cada venda depois de pagar o custo, os impostos e as taxas. Na reforma, a margem pode mudar <b>mesmo sem você mexer em nada</b>: muda o imposto, muda o crédito, muda o preço do fornecedor.</p>
<h3>{E(e['titulo'])}</h3><p class="small">{E(e['desc'])}</p>
<table><tr><th>Cenário</th><th class="n">Preço para manter o lucro</th><th class="n">Lucro se mantiver o preço</th></tr>
<tr><td>Hoje</td><td class="n">{brl(e['p0'])}</td><td class="n">{brl(r['lucro0'])}</td></tr>
<tr><td>2027–2028 (CBS {pct(r['c27'],2)} no lugar do PIS/Cofins)</td><td class="n"><b>{brl(r['P27'])}</b> ({'+' if r['P27']>=e['p0'] else ''}{pct(r['P27']/e['p0']-1)})</td><td class="n">{brl(r['l27'])}</td></tr>
<tr><td>2033 (IBS + CBS {pct(r['t'],2)}, sem ICMS/ISS)</td><td class="n"><b>{brl(r['P33'])}</b> ({'+' if r['P33']>=e['p0'] else ''}{pct(r['P33']/e['p0']-1)})</td><td class="n">{brl(r['l33'])}</td></tr></table>
<p class="small muted">Estimativa com as alíquotas não oficiais citadas no capítulo 2, considerando que os fornecedores com crédito repassam o imposto no custo. O "preço" de 2027 e de 2033 já inclui o imposto por fora. É um exemplo para aprender a conta: faça a sua no simulador Preço 2027 do app e valide com o contador.</p>
<div class="box"><h3>As 3 regras de ouro do preço</h3><ol style="margin:0"><li>Saiba a margem dos seus 20 itens que mais vendem. Margem abaixo de 15% pede revisão agora.</li><li>Reajuste aos poucos e com aviso (clientes aceitam melhor 3% a cada trimestre do que 12% de uma vez).</li><li>Coloque cláusula de reajuste por mudança de tributo em contratos e propostas.</li></ol></div>
<h3>Ponto de equilíbrio</h3><p>Quanto você precisa vender por mês para empatar: <b>custos fixos ÷ margem de contribuição</b>. Exemplo: custos fixos de R$ 18.000 e margem de contribuição de 40% → ponto de equilíbrio de R$ 45.000 por mês. Divida pelos dias úteis e você tem a meta diária.</p>

<h2 class="pb">6. Escudo 3 · Fiscal</h2>
<p>O Escudo Fiscal não é fazer o trabalho do contador. É <b>fazer as perguntas certas e tomar as decisões no prazo</b>. As decisões que mais pesam:</p>
<ul><li><b>Agora:</b> se é do Simples, confirme com o contador se a empresa fez alguma opção na 1ª janela (encerrada em 30/10/2026). Quem optou e quer voltar atrás pode cancelar de 03/11 a 20/12/2026, sem nova chance para o mesmo semestre.</li>
<li><b>Até 15/12/2026:</b> acompanhar a alíquota oficial da CBS e refazer a conta do preço.</li>
<li><b>Janeiro de 2027:</b> nota fiscal com CBS no lugar do PIS/Cofins; tabela de preços revisada.</li>
<li><b>Março de 2027:</b> próxima janela do Simples (por dentro x híbrido), com efeito a partir de 01/07/2027. Chegue com a simulação pronta.</li>
<li><b>2º semestre de 2027:</b> preparar o caixa para o split payment.</li></ul>
<div class="box"><h3>Cadastro certo vale dinheiro</h3><p style="margin:0">É o código do produto (NCM) ou do serviço que define se a alíquota é cheia, reduzida ou zero. Um cadastro errado pode fazer você pagar mais do que deve, ou cobrar menos e receber uma autuação depois.</p></div>
<div class="faca">Marque a reunião com o seu contador para os próximos 7 dias. Leve o roteiro de 12 perguntas (capítulo 11 e no app) e anote as respostas.</div>

<h2 class="pb">7. O que as grandes empresas que quebraram ensinam</h2>
<p>Empresas gigantes também quebram, e quase sempre pelos mesmos motivos das pequenas: caixa que ninguém enxergava, dívida cara e decisões tomadas tarde. Os casos abaixo são públicos (processos de recuperação judicial e cobertura da imprensa).</p>
<div class="box"><h3>Americanas (2023)</h3><p style="margin:0">Em janeiro de 2023, a varejista revelou inconsistências contábeis bilionárias e pediu recuperação judicial com dívidas declaradas de cerca de R$ 43 bilhões. <b>Lição:</b> número bonito no papel não paga conta. Você precisa de um fluxo de caixa que mostre o dinheiro de verdade, conferido com o extrato.</p></div>
<div class="box"><h3>Saraiva (2018–2023)</h3><p style="margin:0">A rede de livrarias pediu recuperação judicial em 2018 e teve a falência decretada em 2023. <b>Lição:</b> quando o mercado muda (ali, a venda migrou para o online), quem demora para ajustar custo fixo e modelo de venda vê o caixa ir embora mês a mês.</p></div>
<div class="box"><h3>Grupo Petrópolis (2023)</h3><p style="margin:0">A cervejaria pediu recuperação judicial em março de 2023, com dívidas de mais de R$ 4 bilhões, citando aperto de crédito e juros altos. <b>Lição:</b> com Selic alta, crescer com dinheiro emprestado de curto prazo é perigoso. Dívida cara precisa de plano de saída.</p></div>
<div class="box"><h3>Oi (2016 e 2023)</h3><p style="margin:0">A operadora fez a maior recuperação judicial do país até então, em 2016, e voltou a pedir em 2023. <b>Lição:</b> renegociar sem mudar a operação só adia o problema. Acordo com credor precisa vir junto de corte de custo e aumento de margem.</p></div>
<p class="nota">Esses casos têm muitas causas e ainda são discutidos na Justiça. Aqui usamos só os fatos públicos para tirar lições de gestão.</p>

<h2 class="pb">8. Os 10 erros que mais matam negócios de {E(d['nome'])}</h2>
<ol>{erros}</ol>
<div class="box green"><h3>A boa notícia</h3><p style="margin:0">Todos esses erros têm conserto com processo simples. Os 30 dias do próximo capítulo atacam um por um.</p></div>

<h2 class="pb">9. Plano de 30 dias · {E(d['nome'])}</h2>
<p class="small">Uma tarefa por dia, de 15 a 40 minutos. Marque aqui ou no app (que lembra a tarefa do dia e mostra o progresso).</p>
{plano}

<h2 class="pb">10. Linha do tempo 2026–2033</h2>
<table><tr><th style="width:18%">Quando</th><th>O que acontece</th><th style="width:33%">O que você faz</th></tr>{linha}</table>

<h2 class="pb">11. Checklist da reforma · {E(d['nome'])}</h2>
{chk}
<h3 style="margin-top:20pt">Roteiro da reunião com o contador</h3>
<ol class="small">{cont}</ol>

<h2 class="pb">12. Glossário rápido</h2>
<table>
<tr><td><b>CBS</b></td><td>Contribuição sobre Bens e Serviços, federal. Substitui PIS e Cofins em 2027.</td></tr>
<tr><td><b>IBS</b></td><td>Imposto sobre Bens e Serviços, de estados e municípios. Substitui ICMS e ISS de 2029 a 2033.</td></tr>
<tr><td><b>Imposto Seletivo</b></td><td>Tributo extra sobre itens prejudiciais à saúde ou ao meio ambiente (cigarro, bebidas e outros listados na lei).</td></tr>
<tr><td><b>Crédito</b></td><td>Imposto pago nas compras que a empresa do regime regular pode abater do imposto das vendas.</td></tr>
<tr><td><b>Simples "por dentro"</b></td><td>Continuar pagando tudo no DAS do Simples. O cliente empresa aproveita como crédito só a parte de IBS/CBS do DAS.</td></tr>
<tr><td><b>Simples "híbrido"</b></td><td>Ficar no Simples para os outros tributos, mas pagar IBS/CBS pelo regime regular, gerando crédito cheio para o cliente.</td></tr>
<tr><td><b>Split payment</b></td><td>Separação do imposto no momento do pagamento (cartão, Pix, boleto), indo direto para o governo.</td></tr>
<tr><td><b>Alíquota efetiva</b></td><td>Imposto pago ÷ faturamento. É o número real que você paga, diferente da alíquota "de tabela".</td></tr>
<tr><td><b>Margem de contribuição</b></td><td>O que sobra de cada venda depois dos custos variáveis (mercadoria, imposto, taxa, comissão).</td></tr>
<tr><td><b>Ponto de equilíbrio</b></td><td>Faturamento mínimo do mês para pagar todos os custos: custo fixo ÷ margem de contribuição.</td></tr>
<tr><td><b>Fluxo de caixa</b></td><td>Previsão de entradas e saídas de dinheiro por data. O de 13 semanas olha 3 meses à frente.</td></tr>
<tr><td><b>Selic</b></td><td>Taxa básica de juros do Brasil, definida pelo Copom. Referência para o custo de qualquer dívida.</td></tr>
</table>
<h3>Fontes</h3>{fontes_html()}
<p class="footer-note">Este material é educativo e não substitui a orientação do seu contador ou advogado. As estimativas de alíquota são não oficiais até a definição pelo Senado. Nenhum resultado é garantido: ele depende da aplicação das tarefas e da realidade de cada negócio.</p>
"""
    return write("Guia-2027-2030-"+d["arq"],"Guia 2027–2030 — "+d["nome"],body)

def plano90(n):
    d=N[n]; arq={"A":"Comercio","B":"Servicos","C":"Industria-Agro-B2B"}[n]
    ws=["Semana 1 · Escudo do Caixa (emergência)","Semana 2 · Escudo da Margem","Semana 3 · Dívidas e crédito","Semana 4 · Escudo Fiscal","Fechamento do mês"]
    out="";cw=-1
    for t in NVE["plano30"]:
        w=min(4,(t["d"]-1)//7)
        if w!=cw: cw=w; out+=f"<h3>{ws[w]}</h3>"
        out+=f'<div class="chk"><div><b>Dia {t["d"]} · {E(txt(t,"t",n))}</b> <span class="pill {t["e"]}">{t["e"]}</span><br><span class="small muted">{E(txt(t,"c",n))}</span><br><span class="small">Data: ____/____ &nbsp; Resultado: ______________________________</span></div></div>'
    sem="".join(f'<div class="chk"><div><b>Semana {s["s"]} · {E(txt(s,"t",n))}</b><br><span class="small muted">{E(txt(s,"c",n))}</span></div></div>' for s in NVE["planoSemanas"])
    body=cover("Plano de 90 dias · "+d["nome"],"30 dias de tarefas + <em>9 semanas</em> de rotina","Uma tarefa por dia no primeiro mês. Depois, uma meta por semana até fechar 13 semanas blindado.","Imprima e cole na parede")
    body+=f"""<h1>Como usar</h1><ul><li>Defina a data de início e escreva ao lado de cada dia.</li><li>Faça a tarefa do dia (15 a 40 minutos). Se não der, faça no dia seguinte, mas não pule.</li><li>Use o app para as contas: cada tarefa indica a ferramenta.</li><li>No fim de cada semana, refaça a conta do fôlego do caixa.</li><li>No dia 30, refaça o diagnóstico e compare a nota.</li></ul>
<div class="box"><b>Data de início:</b> ____/____/______ &nbsp;&nbsp; <b>Nota inicial do diagnóstico:</b> ______ &nbsp;&nbsp; <b>Nota no dia 30:</b> ______ &nbsp;&nbsp; <b>Nota no dia 90:</b> ______</div>
<h2>Mês 1 · uma tarefa por dia</h2>{out}<h2 class="pb">Semanas 5 a 13 · rotina e metas</h2>{sem}
<div class="box green"><h3>Rotina fixa da segunda-feira (15 minutos)</h3><ol style="margin:0"><li>Atualizar o fluxo de 13 semanas com o extrato.</li><li>Rodar a régua de cobrança dos atrasados.</li><li>Separar a reserva da semana.</li><li>Ver a próxima data da reforma no app.</li></ol></div>"""
    return write("Plano-90-Dias-"+arq,"Plano de 90 dias — "+d["nome"],body)

def checklist(n):
    d=N[n]; arq={"A":"Comercio","B":"Servicos","C":"Industria-Agro-B2B"}[n]
    chk="".join(f'<div class="chk" style="padding:4.5pt 0"><div class="small">{E(t)}</div></div>' for t in NVE["checklistComum"]+NVE["checklistNicho"][n])
    body=f"""<style>@page:first{{margin:12mm 14mm}}body{{font-size:9.6pt}}</style>
<div style="display:flex;align-items:center;gap:10pt;border-bottom:3px solid #fcc419;padding-bottom:6pt;margin-bottom:8pt"><div style="width:30pt;height:30pt;border-radius:8pt;background:#fcc419;display:flex;align-items:center;justify-content:center;font:900 15pt Montserrat">N</div><div><div class="kick">Checklist da Reforma · {E(d['nome'])}</div><h1 style="font-size:16pt;margin:0">O que deixar pronto antes de 2027</h1></div></div>
<p class="small" style="margin-bottom:4pt">Marque o que já está feito. O que ficar em branco vira pergunta para o contador. <b>Datas-chave:</b> 03/11 a 20/12/2026 (cancelamento de opção do Simples, se feita) · 15/12/2026 (alíquota oficial da CBS) · 01/01/2027 (CBS no lugar de PIS/Cofins) · março/2027 (janela do Simples, efeito em 01/07/2027) · 2º sem/2027 (split payment gradual).</p>
{chk}
<p class="src" style="margin-top:6pt">Fontes: EC 132/2023; LC 214/2025; Resolução CGSN 194/2026; Receita Federal; Comsefaz. Conteúdo educativo, não substitui o contador. Kit Não Vire Estatística.</p>"""
    return write("Checklist-Reforma-"+arq,"Checklist da Reforma — "+d["nome"],body)

def roteiro():
    q="".join(f'<div class="avoid" style="margin-bottom:8pt"><b>{i+1}. {E(x)}</b><div class="line"></div><div class="line"></div></div>' for i,x in enumerate(NVE["contador"]))
    nich="".join(f'<h3>{E(N[n]["nome"])}</h3>'+"".join(f'<div class="avoid" style="margin-bottom:8pt"><b>{E(x)}</b><div class="line"></div><div class="line"></div></div>' for x in NVE["contadorNicho"][n]) for n in "ABC")
    body=cover("Roteiro de reunião","As 12 perguntas para fazer ao <em>seu contador</em>","Leve impresso, anote as respostas e saia da reunião com as decisões de 2027 tomadas.","Com perguntas extras por segmento")
    body+=f"""<h1>Antes da reunião</h1><div class="box"><h3>Leve com você</h3><ul style="margin:0"><li>Faturamento dos últimos 12 meses e o total de impostos pagos.</li><li>Lista dos 20 produtos/serviços que mais vendem, com preço e custo.</li><li>Lista dos 10 maiores fornecedores e o regime de cada um.</li><li>Seus contratos com clientes (se tiver).</li><li>O resultado do diagnóstico e do simulador de preço do app.</li></ul></div>
<div class="box gold"><h3>Como conduzir</h3><p style="margin:0">Peça 45 minutos. Diga logo no início: "Quero sair daqui sabendo o que muda para mim em 2027 e quais decisões tenho que tomar e quando". Faça as perguntas na ordem. Se a resposta for "depende", pergunte "depende de quê, e quando você me traz a conta?".</p></div>
<p><b>Empresa:</b> ______________________ &nbsp; <b>Contador:</b> ______________________ &nbsp; <b>Data:</b> ___/___/____</p>
<h2>As 12 perguntas</h2>{q}<h2 class="pb">Perguntas extras por segmento</h2>{nich}
<h2>Decisões e prazos combinados</h2><table><tr><th>Decisão</th><th>Responsável</th><th>Prazo</th></tr>{"<tr><td style='height:22pt'></td><td></td><td></td></tr>"*6}</table>"""
    return write("Roteiro-Reuniao-Contador","Roteiro de reunião com o contador",body)

if __name__=="__main__":
    for n in "ABC": print(guia(n)); print(plano90(n)); print(checklist(n))
    print(roteiro())
    for n in "ABC":
        e=N[n]["ex"]; print(n, preco(e["p0"],e["c"],e["tx"],e["ov"],e["pis"],e["cr0"],e["sr"],e["red"],cri=e.get("cri",0)))
