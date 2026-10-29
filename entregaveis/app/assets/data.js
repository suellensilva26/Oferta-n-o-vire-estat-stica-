/* Painel de Blindagem — conteúdo (dados checados em 28/10/2026; fontes no fim do arquivo) */
window.NVE = {};
NVE.atualizado = "28/10/2026";

NVE.nichos = {
  A: { nome: "Comércio e Alimentação", curto: "Comércio", emoji: "🛒",
       exemplos: "loja, mercado, restaurante, lanchonete, padaria, distribuidora de bairro, e-commerce",
       aula: "Reforma tributária no balcão" },
  B: { nome: "Serviços", curto: "Serviços", emoji: "🧰",
       exemplos: "clínica, salão, agência, escritório, escola, academia, oficina, consultoria",
       aula: "ISS, IBS e CBS sem juridiquês" },
  C: { nome: "Indústria, Agro e B2B", curto: "Indústria/Agro/B2B", emoji: "🏭",
       exemplos: "fábrica, confecção, produtor rural, cooperado, atacado, transportadora, quem vende para empresas",
       aula: "Split payment: o que muda no seu caixa" }
};

NVE.regimes = {
  mei: "MEI", simples: "Simples Nacional", presumido: "Lucro Presumido", real: "Lucro Real", naosei: "Não sei"
};

/* ---------------- DIAGNÓSTICO: 20 perguntas, 0 a 5 pontos cada = nota 0 a 100 ---------------- */
NVE.perguntas = [
 { id:"q1", escudo:"caixa", t:"Se as vendas parassem hoje, por quanto tempo o dinheiro em caixa paga as contas fixas?",
   o:[["Menos de 15 dias",0],["De 15 a 30 dias",1],["De 1 a 2 meses",3],["3 meses ou mais",5]],
   acao:"Criar a reserva mínima: separar todo dia uma % das vendas até juntar 1 mês de custo fixo.", tool:"folego" },
 { id:"q2", escudo:"caixa", t:"Você sabe quanto vai entrar e sair do caixa nas próximas 4 semanas?",
   o:[["Não faço ideia",0],["Mais ou menos, de cabeça",2],["Sim, anotado em planilha ou sistema",5]],
   acao:"Montar o fluxo de caixa de 13 semanas e atualizar toda segunda-feira.", tool:"folego" },
 { id:"q3", escudo:"caixa", t:"O dinheiro da empresa é separado do seu dinheiro pessoal?",
   o:[["Misturo tudo",0],["Separo, mas às vezes pago contas pessoais pela empresa",2],["Totalmente separado, com pró-labore fixo",5]],
   acao:"Separar contas e definir um pró-labore fixo mensal. Sem isso nenhum número da empresa é confiável.", tool:"plano" },
 { id:"q4", escudo:"caixa", t:"Do total que você tem a receber de clientes, quanto já está vencido?",
   o:[["Mais de 15%",0],["Entre 5% e 15%",2],["Menos de 5%",4],["Não vendo a prazo",5]],
   acao:"Rodar a régua de cobrança nos atrasados desta semana, começando pelos maiores valores.", tool:"recebiveis" },
 { id:"q5", escudo:"caixa", t:"Você tem uma rotina fixa de cobrança (lembrete antes, no dia e depois do vencimento)?",
   o:[["Não",0],["Cobro quando lembro",2],["Sim, com datas fixas",5]],
   acao:"Ativar a régua de cobrança: D-3, D0, D+1, D+5, D+15 e D+30, com mensagens prontas.", tool:"recebiveis" },
 { id:"q6", escudo:"caixa", t:"Comparando prazos: você recebe dos clientes antes ou depois de pagar os fornecedores?",
   o:[["Recebo bem depois de pagar",0],["Mais ou menos no mesmo prazo",3],["Recebo antes de pagar",5]],
   acao:"Negociar +15 dias com os 3 maiores fornecedores e reduzir o prazo dado aos clientes (desconto no Pix à vista).", tool:"recebiveis" },
 { id:"q7", escudo:"caixa", t:"As parcelas de empréstimos e dívidas somam quanto do faturamento do mês?",
   o:[["Mais de 20%",0],["Entre 10% e 20%",2],["Até 10%",4],["Não tenho dívidas",5]],
   acao:"Listar as dívidas pelo custo real (taxa ao ano) e renegociar primeiro a mais cara.", tool:"dividas" },
 { id:"q8", escudo:"caixa", t:"Você usa cheque especial, rotativo do cartão ou antecipação de recebíveis para fechar o mês?",
   o:[["Sim, quase todo mês",0],["Às vezes",2],["Nunca",5]],
   acao:"Trocar cheque especial e rotativo por uma linha mais barata ou renegociação (veja o comparador de dívidas).", tool:"dividas" },

 { id:"q9", escudo:"margem", t:"Você sabe a margem de lucro de cada produto ou serviço principal?",
   o:[["Não",0],["De alguns",2],["De todos os principais",5]],
   acao:"Calcular a margem dos 10 itens que mais vendem e cortar ou reprecificar os que dão prejuízo.", tool:"preco" },
 { id:"q10", escudo:"margem", t:"Quando foi o último reajuste de preço feito com base nos seus custos?",
   o:[["Há mais de 12 meses",0],["Entre 6 e 12 meses",2],["Há menos de 6 meses",5]],
   acao:"Refazer a conta de preço com o simulador e planejar o reajuste antes de janeiro de 2027.", tool:"preco" },
 { id:"q11", escudo:"margem",
   tN:{ A:"Quanto do seu estoque está parado há mais de 90 dias?",
        B:"Quantas horas por semana sua equipe trabalha sem faturar (retrabalho, atraso, serviço extra de graça)?",
        C:"Quantos dos seus contratos longos têm cláusula de reajuste (inclusive por mudança de imposto)?" },
   oN:{ A:[["Mais de 30% do estoque",0],["Entre 10% e 30%",2],["Menos de 10%",5]],
        B:[["Mais de 20% das horas",0],["Entre 10% e 20%",2],["Menos de 10%",5]],
        C:[["Nenhum",0],["Alguns",2],["Todos ou quase todos",5],["Não trabalho com contrato longo",4]] },
   acaoN:{ A:"Fazer uma ação de giro do estoque parado (combo, queima, troca com fornecedor) e transformar em caixa.",
           B:"Medir as horas não faturadas por 1 semana e cobrar escopo extra a partir de agora.",
           C:"Incluir aditivo de reajuste tributário nos contratos que vencem ou renovam até 2027." },
   tool:"preco" },
 { id:"q12", escudo:"margem", t:"Você vende parcelado sem juros?",
   o:[["Sim, e não coloco esse custo no preço",0],["Sim, mas o custo já está no preço",3],["Não, ou muito pouco",5]],
   acao:"Calcular o custo real do parcelamento e criar preço à vista no Pix com desconto.", tool:"recebiveis" },
 { id:"q13", escudo:"margem", t:"Você sabe quanto precisa vender no mês para não ter prejuízo (ponto de equilíbrio)?",
   o:[["Não",0],["Tenho uma ideia",2],["Sei o número exato",5]],
   acao:"Calcular o ponto de equilíbrio e acompanhar a meta diária de vendas.", tool:"folego" },
 { id:"q14", escudo:"margem",
   tN:{ A:"Quanto das suas vendas depende de um único canal (um aplicativo, um marketplace ou um só ponto)?",
        B:"Quanto do faturamento vem dos seus 3 maiores clientes?",
        C:"Quanto do faturamento vem dos seus 3 maiores clientes?" },
   o:[["Mais de 50%",0],["Entre 20% e 50%",2],["Menos de 20%",5]],
   acao:"Reduzir a dependência: meta de trazer 1 novo cliente ou canal por semana nos próximos 90 dias.", tool:"plano" },
 { id:"q15", escudo:"margem", t:"Você revisou os custos fixos (aluguel, sistemas, assinaturas, contratos) nos últimos 6 meses?",
   o:[["Nunca revisei",0],["Revisei uma parte",2],["Sim, todos",5]],
   acao:"Revisar todos os custos fixos e cortar ou renegociar pelo menos 3 nesta semana.", tool:"plano" },

 { id:"q16", escudo:"fiscal", t:"Você sabe seu regime tributário e quanto paga de imposto em % do faturamento?",
   o:[["Não sei",0],["Sei o regime, mas não a %",2],["Sei os dois",5]],
   acao:"Pedir ao contador a alíquota efetiva dos últimos 12 meses e anotar no painel.", tool:"contador" },
 { id:"q17", escudo:"fiscal", t:"Você já conversou com seu contador sobre a Reforma Tributária?",
   o:[["Não",0],["Por alto",2],["Sim, e temos um plano",5]],
   acao:"Marcar a reunião com o contador levando as 12 perguntas do roteiro.", tool:"contador" },
 { id:"q18", escudo:"fiscal", t:"Seu sistema de emissão de notas já mostra CBS e IBS nas notas?",
   o:[["Não sei",0],["Está em adaptação",3],["Sim",5]],
   acao:"Confirmar com o fornecedor do sistema se as notas já saem com os campos de CBS e IBS (testes de 2026).", tool:"checklist" },
 { id:"q19", escudo:"fiscal", t:"Você já avaliou com números se é melhor ficar no Simples \"por dentro\" ou ir para o \"híbrido\" (ou mudar de regime)?",
   o:[["Não",0],["Já ouvi falar",2],["Sim, com simulação",5],["Não sou do Simples",4]],
   acao:"Simular Simples por dentro x híbrido antes da janela de março de 2027.", tool:"preco" },
 { id:"q20", escudo:"fiscal", t:"Seus contratos ou sua tabela de preços preveem reajuste se o imposto mudar?",
   o:[["Não",0],["Alguns",2],["Sim",5],["Não uso contrato nem tabela",3]],
   acao:"Adicionar a cláusula de reajuste tributário nos contratos e na tabela de preços.", tool:"biblioteca" }
];

NVE.faixas = [
  { min:0,  max:39,  nome:"Zona de risco", cor:"#f87171", texto:"Seu negócio está exposto. Comece pelo Escudo do Caixa ainda hoje: as 3 prioridades abaixo são o que mais protege você nas próximas semanas." },
  { min:40, max:69,  nome:"Atenção", cor:"#fcc419", texto:"Você tem uma base, mas há buracos que juro alto e a reforma vão aumentar. Feche as 3 prioridades abaixo nos próximos 30 dias." },
  { min:70, max:100, nome:"Blindado em construção", cor:"#4ade80", texto:"Bom nível de proteção. Use o plano para manter a disciplina e se preparar para as mudanças de 2027." }
];

/* ---------------- LINHA DO TEMPO DA REFORMA ---------------- */
NVE.linha = [
 { d:"2026-01-01", data:"Jan/2026", t:"Ano de teste", txt:"CBS (0,9%) e IBS (0,1%) aparecem destacados na nota fiscal para teste. Quem cumpre as obrigações da nota não paga esse valor a mais.", fonte:"LC 214/2025; Receita Federal",
   acao:{A:"Confira se o seu sistema de caixa/PDV já destaca CBS e IBS.",B:"Confira se a sua nota de serviço já sai no padrão novo.",C:"Confira se as NF-e já saem com os campos de CBS e IBS."} },
 { d:"2026-10-15", data:"15/10/2026", t:"Testes do split payment", txt:"Começam os testes técnicos entre bancos/maquininhas e a plataforma pública. Ainda não mexem em pagamento real.", fonte:"Receita Federal, comunicado de 09/10/2026; Comsefaz",
   acao:{A:"Nada a pagar. Pergunte ao banco e à maquininha como vão tratar o split.",B:"Nada a pagar. Pergunte ao banco como vai funcionar.",C:"Comece a simular no fluxo de caixa o recebimento líquido (sem o imposto)."} },
 { d:"2026-10-30", data:"30/10/2026", t:"Encerrada a 1ª janela do Simples \"híbrido\"", txt:"Terminou a opção excepcional para pagar IBS e CBS por fora do DAS a partir de janeiro de 2027. Quem não optou segue \"por dentro\" no 1º semestre de 2027; quem optou pode cancelar de 03/11 a 20/12/2026. A próxima janela é março de 2027 (efeito em 01/07/2027).", fonte:"Resolução CGSN 194/2026; Serpro; Receita Federal",
   acao:{A:"Pergunte ao contador se a empresa fez alguma opção. Se vende ao consumidor final, ficar por dentro tende a ser o caminho mais simples.",B:"Confirme com o contador o que foi feito e peça a simulação dos dois cenários para março de 2027.",C:"Vende para empresas? Simule com o contador os dois cenários para a janela de março de 2027."} },
 { d:"2026-12-15", data:"15/12/2026", t:"Senado fixa a alíquota da CBS para 2027", txt:"O TCU envia o cálculo até 30/10 e o Senado fixa a alíquota de referência até 15/12. Estimativa não oficial usada pelo Comitê Gestor: CBS 9,21% e IBS 18,7% (27,91% somados no modelo final).", fonte:"TCU; Senado Notícias, 26/10/2026; O Globo, 28/10/2026",
   acao:{A:"Atualize o simulador de preço com a alíquota oficial assim que sair.",B:"Atualize o simulador de preço com a alíquota oficial.",C:"Atualize preços e propostas de 2027 com a alíquota oficial."} },
 { d:"2027-01-01", data:"01/01/2027", t:"CBS entra no lugar de PIS e Cofins", txt:"PIS e Cofins deixam de existir. O IPI vai a zero (exceto produtos da Zona Franca de Manaus). Começa o Imposto Seletivo (cigarro, bebidas alcoólicas e açucaradas, veículos, mineração etc.). O IBS fica em 0,1% em 2027 e 2028.", fonte:"EC 132/2023; LC 214/2025; Receita Federal",
   acao:{A:"Tabela de preços revisada e sistema pronto antes do dia 1º.",B:"Contratos e propostas com cláusula de reajuste tributário.",C:"Revise preço de venda, crédito nas compras e contratos com clientes."} },
 { d:"2027-03-01", data:"Março/2027", t:"Janela do Simples: entrar ou sair do híbrido", txt:"Optantes do Simples podem escolher (ou desistir) do regime regular de IBS/CBS, com efeito no 2º semestre de 2027. Depois, as janelas são em março e setembro de cada ano.", fonte:"Serpro; Manual da opção (Receita Federal)",
   acao:{A:"Reveja a decisão com os números do 1º trimestre.",B:"Leve ao contador a simulação feita no painel.",C:"Pergunte aos seus maiores clientes como eles tratam o crédito de fornecedores do Simples."} },
 { d:"2027-07-01", data:"2º sem/2027", t:"Split payment começa (gradual)", txt:"Previsão de início gradual e facultativo, começando nas vendas entre empresas: o imposto é separado na hora do pagamento e você recebe o valor líquido.", fonte:"Receita Federal via Comsefaz, 09/10/2026",
   acao:{A:"Pouco muda no balcão no começo, mas fornecedores podem mudar condições.",B:"Se atende empresas, prepare o caixa para receber o líquido.",C:"Fim do imposto como capital de giro: ajuste o fluxo de caixa e a reserva."} },
 { d:"2029-01-01", data:"2029", t:"Começa a troca de ICMS e ISS pelo IBS", txt:"ICMS e ISS passam a 90% das alíquotas atuais; o IBS sobe na mesma proporção.", fonte:"EC 132/2023 (ADCT, art. 128); LC 214/2025",
   acao:{A:"Revise preços: o ICMS começa a cair e o IBS a subir.",B:"Revise preços: o ISS começa a cair e o IBS a subir.",C:"Benefícios de ICMS começam a ser reduzidos: reveja preços e contratos."} },
 { d:"2030-01-01", data:"2030", t:"ICMS e ISS a 80%", txt:"Segue a transição: ICMS e ISS em 80% das alíquotas; IBS sobe.", fonte:"EC 132/2023",
   acao:{A:"Revisão anual de preço.",B:"Revisão anual de preço.",C:"Revisão anual de preço e contratos."} },
 { d:"2031-01-01", data:"2031", t:"ICMS e ISS a 70%", txt:"Segue a transição.", fonte:"EC 132/2023", acao:{A:"Revisão anual de preço.",B:"Revisão anual de preço.",C:"Revisão anual de preço e contratos."} },
 { d:"2032-01-01", data:"2032", t:"ICMS e ISS a 60%", txt:"Último ano da convivência dos dois sistemas.", fonte:"EC 132/2023", acao:{A:"Prepare o sistema para o fim do ICMS.",B:"Prepare o sistema para o fim do ISS.",C:"Prepare o sistema para o fim do ICMS/ISS."} },
 { d:"2033-01-01", data:"2033", t:"Modelo novo completo", txt:"ICMS e ISS deixam de existir. Ficam CBS (federal) e IBS (estados e municípios), com crédito amplo nas compras. A soma das alíquotas de referência não pode passar de 26,5% em 2033, pela regra da lei (com mecanismo de ajuste).", fonte:"LC 214/2025; O Globo, 28/10/2026",
   acao:{A:"Preço e margem já no modelo novo.",B:"Preço e margem já no modelo novo.",C:"Preço, crédito e contratos já no modelo novo."} }
];

/* ---------------- CHECKLIST DA REFORMA ---------------- */
NVE.checklistComum = [
 "Sei meu regime tributário (MEI, Simples, Presumido ou Real) e a minha alíquota efetiva dos últimos 12 meses.",
 "Meu sistema de notas/PDV já emite com os campos de CBS e IBS (teste de 2026).",
 "Meu cadastro de produtos/serviços está com NCM ou código de serviço corretos (é isso que define alíquota reduzida ou cheia).",
 "Conversei com o contador sobre o impacto de 2027 e anotei as respostas das 12 perguntas.",
 "Sei se algum item que vendo tem alíquota reduzida (60% ou 30% de redução) ou zero.",
 "Simulei meu preço para 2027 e para o modelo final (2033) no simulador do painel.",
 "Meus contratos e propostas têm cláusula de reajuste por mudança de tributo.",
 "Revisei quais fornecedores me darão crédito de IBS/CBS (regime regular) e quais não (Simples, MEI, pessoa física).",
 "Tenho fluxo de caixa de 13 semanas atualizado toda semana.",
 "Tenho a data de março de 2027 marcada para rever Simples por dentro x híbrido (se for do Simples).",
 "Sei que o imposto separado na hora do pagamento (split payment) vai reduzir o dinheiro que fica no caixa entre vender e recolher.",
 "Anotei 15/12/2026 para atualizar o simulador com a alíquota oficial da CBS."
];
NVE.checklistNicho = {
 A:["Revisei a tabela de preços do balcão e do delivery para janeiro de 2027.",
    "Sei quais itens da minha venda são da cesta básica (alíquota zero) ou têm redução de 60%.",
    "Confirmei com a maquininha/banco como vão tratar o split payment e as taxas.",
    "Organizei as notas de compra dos fornecedores: no modelo novo, compra com nota gera crédito (se eu estiver no regime regular).",
    "Se vendo bebidas açucaradas ou alcoólicas, sei que o Imposto Seletivo começa em 2027 e pode mudar o preço do fornecedor."],
 B:["Calculei o preço da minha hora real (com folha, imposto e inadimplência).",
    "Verifiquei se a minha atividade é profissão regulamentada com possível redução de 30% (ex.: advocacia, contabilidade, engenharia) ou saúde/educação com redução de 60%.",
    "Sei que salário não gera crédito de IBS/CBS: empresa com muita folha precisa fazer a conta com cuidado.",
    "Se atendo empresas, perguntei aos maiores clientes se o crédito que eu gero é importante para eles.",
    "Meu contrato padrão tem cláusula de reajuste tributário (modelo na biblioteca)."],
 C:["Mapeei o crédito de IBS/CBS das minhas compras de insumos, energia, frete e máquinas.",
    "Sei se o meu produto tem IPI hoje (vai a zero em 2027, exceto Zona Franca) e como isso mexe no preço.",
    "Se compro de produtor rural pessoa física, sei como funciona o crédito presumido.",
    "Revisei benefícios fiscais de ICMS que tenho hoje: eles vão diminuindo de 2029 a 2032.",
    "Simulei o efeito do split payment no meu caixa (recebo o líquido, sem o imposto).",
    "Contratos longos com clientes têm aditivo de cláusula tributária (modelo na biblioteca)."]
};

/* ---------------- 12 PERGUNTAS PARA O CONTADOR ---------------- */
NVE.contador = [
 "Qual foi a nossa alíquota efetiva (imposto pago ÷ faturamento) nos últimos 12 meses?",
 "Continuamos no regime mais barato para 2027? Vale simular outro regime?",
 "Se somos do Simples: ficar \"por dentro\" ou ir para o regime regular de IBS/CBS (híbrido)? Qual a conta para o nosso caso?",
 "Quais dos nossos produtos ou serviços têm alíquota reduzida ou zero? Os códigos (NCM/serviço) estão certos?",
 "Quanto de crédito de IBS/CBS vamos ter nas compras? Quais fornecedores não geram crédito?",
 "Qual é o impacto estimado no nosso preço em 2027 (troca do PIS/Cofins pela CBS)?",
 "Nosso sistema de notas já está emitindo com CBS e IBS? O que falta ajustar?",
 "Como o split payment vai afetar o nosso caixa e quando devemos nos preparar?",
 "Temos algum benefício fiscal de ICMS/ISS que vai acabar até 2032?",
 "Que documentos e controles precisamos mudar a partir de janeiro de 2027?",
 "Temos débitos ou parcelamentos com a Receita que precisamos regularizar (podem impedir regime ou crédito)?",
 "Qual é o calendário de decisões que precisamos tomar juntos (março e setembro de cada ano)?"
];
NVE.contadorNicho = {
 A:["Os itens da cesta básica e de alimentação que vendemos estão com a classificação correta?",
    "Como fica o preço dos produtos com Imposto Seletivo (bebidas) que compramos?"],
 B:["A nossa atividade tem direito à redução de 30% (profissão regulamentada) ou de 60% (saúde/educação)?",
    "Com folha alta e poucos créditos, qual é o melhor regime para nós a partir de 2027?"],
 C:["Como ficam os créditos de energia, frete, máquinas e insumos no modelo novo?",
    "Qual o impacto do fim gradual dos benefícios de ICMS no nosso preço de 2029 em diante?"]
};

/* ---------------- RÉGUA DE COBRANÇA (mensagens) ---------------- */
NVE.regua = [
 { quando:"D-3", titulo:"Lembrete amigável (3 dias antes)", msg:"Olá, {nome}! Tudo bem? Passando para lembrar que a parcela de {valor} vence em {venc}. Se preferir, já pode pagar pelo Pix: {pix}. Qualquer dúvida, estou à disposição. {empresa}" },
 { quando:"D0", titulo:"No dia do vencimento", msg:"Bom dia, {nome}! Hoje vence o pagamento de {valor}. Chave Pix: {pix}. Assim que pagar, se puder, me envie o comprovante por aqui. Obrigado! {empresa}" },
 { quando:"D+1", titulo:"1 dia de atraso", msg:"Olá, {nome}. Não identificamos o pagamento de {valor}, que venceu em {venc}. Pode ter sido só esquecimento: segue a chave Pix {pix}. Se já pagou, desconsidere e me envie o comprovante. {empresa}" },
 { quando:"D+5", titulo:"5 dias: oferecer solução", msg:"{nome}, o pagamento de {valor} (vencido em {venc}) continua em aberto. Entendo que o momento está difícil para muita gente. Consigo te ajudar com uma destas opções: pagar hoje sem juros, ou dividir em 2 vezes. Qual fica melhor para você? {empresa}" },
 { quando:"D+15", titulo:"15 dias: firme e respeitoso", msg:"{nome}, o valor de {valor}, vencido em {venc}, segue em aberto há 15 dias. Precisamos regularizar até {prazo}. Para fechar um acordo, me responda por aqui. Após essa data, o atendimento passa para o setor de cobrança e incidem multa e juros previstos. {empresa}" },
 { quando:"D+30", titulo:"30 dias: último aviso antes de medidas formais", msg:"{nome}, este é o último aviso amigável sobre o débito de {valor}, vencido em {venc}. Se não houver acordo até {prazo}, seguiremos com as medidas previstas em contrato e na lei, como protesto ou inclusão em cadastro de inadimplentes, com aviso prévio. Ainda queremos resolver de forma simples: me responda por aqui. {empresa}" }
];

/* ---------------- PLANO DE 90 DIAS ---------------- */
/* dias 1–30: uma tarefa por dia. semanas 5–13: uma meta por semana. tool = ferramenta do painel */
NVE.plano30 = [
 { d:1, e:"caixa", t:"Separe o dinheiro da empresa do seu", c:"Abra (ou confirme) uma conta só da empresa. Defina hoje o seu pró-labore fixo do mês e pare de pagar contas pessoais pela empresa.", tool:"folego" },
 { d:2, e:"caixa", t:"Liste tudo o que você tem para pagar", c:"Todas as contas das próximas 13 semanas: fornecedores, folha, aluguel, impostos, parcelas. Coloque data e valor. Use a planilha de 13 semanas ou o bloco de notas.", tool:"folego" },
 { d:3, e:"caixa", t:"Liste tudo o que você tem a receber", c:"Quem deve, quanto, e há quantos dias venceu. Separe: a vencer, até 30 dias de atraso, mais de 30 dias.", tool:"recebiveis" },
 { d:4, e:"caixa", t:"Calcule o seu fôlego", c:"Use a calculadora de fôlego com os números reais e o cenário de vendas 20% menores. Anote quantos meses o caixa aguenta.", tool:"folego" },
 { d:5, e:"caixa", t:"Corte ou renegocie 3 custos fixos", c:"Assinaturas que ninguém usa, plano de telefone/internet, aluguel de máquina, contrato de sistema. Ligue e peça desconto ou cancele.", tool:"plano" },
 { d:6, e:"caixa", t:"Cobre os atrasados (régua de cobrança)", c:"Envie as mensagens da régua para todos os clientes com atraso, começando pelos maiores valores. Ofereça Pix à vista ou 2 vezes.", tool:"recebiveis" },
 { d:7, e:"caixa", t:"Revisão da semana 1", c:"Atualize o fluxo de 13 semanas, marque o que foi feito e anote quanto entrou de cobrança. Defina a % das vendas que vai para a reserva (comece com 3% a 5%).", tool:"folego" },
 { d:8, e:"margem", t:"Seus 10 campeões de venda", c:"Liste os 10 produtos ou serviços que mais vendem, com preço e custo direto de cada um.", tool:"preco" },
 { d:9, e:"margem", t:"Calcule a margem de cada um", c:"Margem = preço − imposto − custo direto − taxa de cartão/app. Marque em vermelho quem tem margem abaixo de 20%.", tool:"preco" },
 { d:10, e:"margem", t:"Descubra o seu ponto de equilíbrio", c:"Use a calculadora de fôlego: ela mostra quanto precisa vender por mês para empatar. Divida pelos dias de trabalho e tenha a meta diária.", tool:"folego" },
 { d:11, e:"margem", t:"Simule o preço para 2027", c:"No simulador, rode os 3 itens mais importantes com a regra nova. Anote se o preço precisa subir, ficar ou pode cair.", tool:"preco" },
 { d:12, e:"margem", tN:{A:"Transforme estoque parado em caixa",B:"Meça a sua hora real",C:"Calcule o seu ciclo financeiro"},
   cN:{A:"Liste o que está parado há mais de 90 dias e crie uma ação de giro: combo, kit, queima com prazo ou troca com o fornecedor.",
       B:"Anote por 1 semana as horas faturadas e não faturadas. Preço da hora = (custos do mês + pró-labore + lucro desejado) ÷ horas faturáveis.",
       C:"Ciclo = dias para receber + dias de estoque − dias para pagar. Cada dia a menos libera caixa. Anote o seu número."}, tool:"recebiveis" },
 { d:13, e:"margem", t:"Crie a regra do parcelamento", c:"Defina: desconto para Pix à vista, até quantas vezes sem juros e a partir de quando cobra juros. Use a calculadora de custo da venda a prazo.", tool:"recebiveis" },
 { d:14, e:"margem", t:"Revisão da semana 2", c:"Reajuste o que estava com prejuízo, comunique o cliente com antecedência e atualize o fluxo de caixa.", tool:"preco" },
 { d:15, e:"caixa", t:"Coloque todas as dívidas na mesa", c:"No comparador de dívidas, lance cada empréstimo, cartão, cheque especial e parcelamento com a taxa ao mês.", tool:"dividas" },
 { d:16, e:"caixa", t:"Descubra qual dívida está te sangrando", c:"O comparador ordena da mais cara para a mais barata e compara com a Selic. A primeira da lista é a que você ataca.", tool:"dividas" },
 { d:17, e:"caixa", t:"Renegocie a dívida mais cara", c:"Ligue ou vá ao banco com o roteiro: peça troca por linha mais barata, carência ou alongamento. Peça a proposta por escrito com o CET.", tool:"dividas" },
 { d:18, e:"caixa", t:"Pesquise linhas de crédito mais baratas", c:"Pergunte no seu banco e em cooperativas pelo Pronampe (teto de Selic + 6% ao ano) e por linhas com garantia do FGO/FAMPE. Só use para trocar dívida cara ou para algo que dá retorno.", tool:"dividas" },
 { d:19, e:"caixa", t:"Ganhe prazo dos fornecedores", c:"Peça +15 dias de prazo aos 3 maiores fornecedores, oferecendo fidelidade ou volume. Prazo de fornecedor é o crédito mais barato que existe.", tool:"recebiveis" },
 { d:20, e:"caixa", t:"Programe a reserva mínima", c:"Crie uma conta/caixinha separada e programe a transferência diária ou semanal da % definida. Meta: 1 mês de custo fixo; depois 3 meses.", tool:"folego" },
 { d:21, e:"caixa", t:"Revisão da semana 3", c:"Quanto você economizou de juros? Atualize o fluxo de 13 semanas e o fôlego.", tool:"folego" },
 { d:22, e:"fiscal", t:"Descubra quanto você paga de imposto", c:"Peça ao contador a alíquota efetiva dos últimos 12 meses e confirme o seu regime.", tool:"contador" },
 { d:23, e:"fiscal", t:"Faça o checklist da reforma", c:"Marque no painel o que já está feito e o que falta. O que faltar vira pergunta para o contador.", tool:"checklist" },
 { d:24, e:"fiscal", t:"Confira o seu sistema de notas", c:"Pergunte ao fornecedor do sistema/PDV se a nota já sai com CBS e IBS e se está pronto para 2027.", tool:"checklist" },
 { d:25, e:"fiscal", t:"Reunião com o contador", c:"Leve as 12 perguntas do roteiro (no painel) e anote as respostas. Peça a simulação de 2027 por escrito.", tool:"contador" },
 { d:26, e:"fiscal", tN:{A:"Atualize a tabela de preços para 2027",B:"Coloque a cláusula tributária no contrato",C:"Faça o aditivo tributário nos contratos"},
   cN:{A:"Com o simulador e a conversa com o contador, prepare a tabela de janeiro de 2027 e o aviso aos clientes.",
       B:"Use o modelo da biblioteca e peça ao seu advogado para revisar. Aplique nos contratos novos e nas renovações.",
       C:"Use o modelo de aditivo da biblioteca, revise com o advogado e envie aos clientes com contrato longo."}, tool:"biblioteca" },
 { d:27, e:"fiscal", t:"Decida o caminho do Simples (se for o seu caso)", c:"Com a simulação do contador, decida: por dentro ou híbrido. A próxima janela é março de 2027 (efeito no 2º semestre).", tool:"preco" },
 { d:28, e:"fiscal", t:"Marque as datas no calendário", c:"15/12/2026 (alíquota oficial da CBS), 01/01/2027 (CBS começa), março/2027 (janela do Simples), 2º semestre/2027 (split payment).", tool:"linha" },
 { d:29, e:"caixa", t:"Refaça o diagnóstico", c:"Responda de novo as 20 perguntas e compare a nota com a do dia 1. A nota fica salva mês a mês.", tool:"diagnostico" },
 { d:30, e:"caixa", t:"Planeje os próximos 60 dias", c:"Veja as metas das semanas 5 a 13 aqui no plano e escolha 1 hábito semanal fixo: toda segunda, atualizar o caixa e cobrar.", tool:"plano" }
];
NVE.planoSemanas = [
 { s:5,  t:"Fluxo de caixa no piloto automático", c:"Toda segunda-feira: atualizar 13 semanas, cobrar atrasados, separar a reserva. Meta: nenhum dia com saldo negativo previsto." },
 { s:6,  t:"Teste de preço", c:"Aplique o reajuste planejado em parte dos itens e meça: vendas caíram? Margem subiu? Ajuste." },
 { s:7,  t:"Recupere metade dos atrasados", c:"Feche acordos com pelo menos 50% dos clientes em atraso há mais de 30 dias." },
 { s:8,  t:"Segunda rodada de renegociação", c:"Ataque a segunda dívida mais cara. Meta: custo médio das dívidas abaixo de 2% ao mês." },
 { s:9,  tN:{A:"Mix campeão",B:"Pacotes e recorrência",C:"Clientes que pagam em dia"},
         cN:{A:"Dê mais destaque (vitrine, cardápio, anúncio) aos itens de maior margem e menos aos de menor margem.",
             B:"Transforme serviços avulsos em pacotes mensais com pagamento recorrente (Pix Automático ou cartão recorrente).",
             C:"Classifique os clientes por pontualidade e margem. Dê prazo e prioridade a quem paga em dia; exija entrada de quem atrasa."} },
 { s:10, t:"Cobrança automática", c:"Use boleto/Pix com lembrete automático, Pix Automático ou cartão recorrente para reduzir esquecimento." },
 { s:11, tN:{A:"Sistema e maquininha prontos para 2027",B:"Sistema e contratos prontos para 2027",C:"Prepare-se para o split payment"},
         cN:{A:"Confirme com o fornecedor do PDV e com a maquininha a configuração de CBS e IBS para janeiro.",
             B:"Confirme o sistema de notas e aplique a cláusula tributária em todos os contratos ativos.",
             C:"Recalcule a reserva de caixa considerando que o imposto não ficará mais no seu caixa até o recolhimento."} },
 { s:12, t:"Revisão com o contador", c:"Leve os números do trimestre e revise a decisão do regime (janela de março de 2027)." },
 { s:13, t:"Novo diagnóstico e plano do próximo trimestre", c:"Refaça o diagnóstico, compare as notas e gere um novo plano de 90 dias com as novas prioridades." }
];

/* ---------------- PRODUTOS (o que cada acesso libera) ---------------- */
/* hash = SHA-256 do código de acesso. O código vai só no link de entrega (Cakto). */
NVE.produtos = {
  kit:    { nome:"Kit Não Vire Estatística", tipo:"Produto principal", hash:"1afe0bc04ab4e129a7e3ac4cf88d86581d2992b237e16224825b1859f4383631" },
  calc:   { nome:"Calculadora de Impacto da Reforma", tipo:"Bônus do checkout", hash:"6a59bc325a3b81f262c11e064d1a6552973dc69b8a2bb8d1211dbf2d6f788c3d" },
  pack:   { nome:"Pack Renegociação e Cobrança", tipo:"Bônus do checkout", hash:"f817c18e69b07363a86c212ed9877b01edc4948bd14f1202df67669091914140" },
  caixa:  { nome:"Planilha Fluxo de Caixa 13 Semanas + DRE", tipo:"Bônus do checkout", hash:"10d5d2e82bde05ffd7074d769270cf3f9d8c73bbe67696c6e88959db8b2e3fc4" },
  impl:   { nome:"Kit Implementação 2027", tipo:"Oferta especial", hash:"cb5e49785c64d7ae630c09447a1963ca22c81e8c230c3911b00e694038951d7b", inclui:["painel"] },
  painel: { nome:"Painel de Implementação", tipo:"Oferta especial", hash:"d6c6cdde3abb51907fc9fa44d450fac67d99f6f27a8c899883ef8ebaf35c07b5" }
};

/* arquivos de cada produto (pasta /f/<código>/) */
NVE.arquivos = {
  kit: [
    { f:"Guia-2027-2030-Comercio-e-Alimentacao.pdf", n:"Guia 2027–2030: o que muda e o que fazer (Comércio e Alimentação)", nicho:"A", tipo:"PDF" },
    { f:"Guia-2027-2030-Servicos.pdf", n:"Guia 2027–2030: o que muda e o que fazer (Serviços)", nicho:"B", tipo:"PDF" },
    { f:"Guia-2027-2030-Industria-Agro-B2B.pdf", n:"Guia 2027–2030: o que muda e o que fazer (Indústria, Agro e B2B)", nicho:"C", tipo:"PDF" },
    { f:"Plano-90-Dias-Comercio.pdf", n:"Plano de 90 Dias (com o Plano de 30 Dias) — Comércio", nicho:"A", tipo:"PDF" },
    { f:"Plano-90-Dias-Servicos.pdf", n:"Plano de 90 Dias (com o Plano de 30 Dias) — Serviços", nicho:"B", tipo:"PDF" },
    { f:"Plano-90-Dias-Industria-Agro-B2B.pdf", n:"Plano de 90 Dias (com o Plano de 30 Dias) — Indústria/Agro/B2B", nicho:"C", tipo:"PDF" },
    { f:"Checklist-Reforma-Comercio.pdf", n:"Checklist da Reforma (1 página) — Comércio", nicho:"A", tipo:"PDF" },
    { f:"Checklist-Reforma-Servicos.pdf", n:"Checklist da Reforma (1 página) — Serviços", nicho:"B", tipo:"PDF" },
    { f:"Checklist-Reforma-Industria-Agro-B2B.pdf", n:"Checklist da Reforma (1 página) — Indústria/Agro/B2B", nicho:"C", tipo:"PDF" },
    { f:"Roteiro-Reuniao-Contador.pdf", n:"Roteiro de reunião com o contador (12 perguntas + espaço para respostas)", tipo:"PDF" },
    { f:"Modelo-Politica-Venda-a-Prazo.docx", n:"Modelo: política de venda a prazo e cobrança (editável)", nicho:"A", tipo:"Word" },
    { f:"Modelo-Clausula-Reajuste-Tributario-Contrato.docx", n:"Modelo: cláusula de reajuste tributário para contrato de serviços (editável)", nicho:"B", tipo:"Word" },
    { f:"Modelo-Aditivo-Contratual-Clausula-Tributaria.docx", n:"Modelo: aditivo contratual com cláusula tributária (editável)", nicho:"C", tipo:"Word" }
  ],
  calc: [
    { f:"Calculadora-Impacto-Reforma.xlsx", n:"Calculadora de Impacto da Reforma (Excel/Google Planilhas)", tipo:"Planilha" },
    { f:"Como-usar-Calculadora-Impacto.pdf", n:"Como usar a calculadora (passo a passo)", tipo:"PDF" }
  ],
  pack: [
    { f:"Pack-Renegociacao-e-Cobranca.pdf", n:"Pack Renegociação e Cobrança: roteiros para bancos, fornecedores e clientes", tipo:"PDF" },
    { f:"Pack-Modelos-Editaveis.docx", n:"Modelos editáveis: e-mails, propostas, acordo e termo de confissão de dívida", tipo:"Word" }
  ],
  caixa: [
    { f:"Fluxo-de-Caixa-13-Semanas-e-DRE.xlsx", n:"Planilha Fluxo de Caixa 13 Semanas + DRE simples", tipo:"Planilha" },
    { f:"Como-usar-Fluxo-de-Caixa.pdf", n:"Como usar a planilha de caixa (passo a passo)", tipo:"PDF" }
  ],
  painel: [
    { f:"Painel-de-Implementacao-2027.xlsx", n:"Painel de Implementação 2027 (Excel/Google Planilhas)", tipo:"Planilha" },
    { f:"Aula-Como-Usar-o-Painel.pdf", n:"Aula: como usar o Painel de Implementação (apostila)", tipo:"PDF" }
  ],
  impl: [
    { f:"Aulas-Kit-Implementacao-2027.pdf", n:"As 4 aulas do Kit Implementação 2027 (apostila completa)", tipo:"PDF" },
    { f:"Modelos-de-Decisao-com-o-Contador.pdf", n:"Modelos de decisão para levar ao contador (um por segmento)", tipo:"PDF" }
  ]
};

/* ---------------- FONTES ---------------- */
NVE.fontes = [
 ["Selic 13,75% a.a. desde 16/09/2026","Banco Central — Ata da 281ª reunião do Copom; g1, 16/09/2026","https://g1.globo.com/economia/noticia/2026/09/16/copom-reduz-a-taxa-basica-de-juros-da-economia-a-selic-de-14percent-para-1375percent-ao-ano.ghtml"],
 ["9,3 milhões de empresas inadimplentes (recorde)","Serasa Experian via CNN Brasil, 10/2026","https://www.cnnbrasil.com.br/economia/money/macroeconomia/inadimplencia-das-empresas-bate-novo-recorde-no-brasil-diz-serasa-experian/"],
 ["2.466 recuperações judiciais em 2025 (recorde)","Serasa Experian; Poder360, 07/04/2026",""],
 ["Mortalidade em 5 anos: MEI 29%, ME 21,6%, EPP 17%; comércio 30,2%, ind. transformação 27,3%, serviços 26,6%, agro 18%","Sebrae — Sobrevivência das Empresas no Brasil (2020)","https://agenciasebrae.com.br/economia-e-politica/tres-em-cada-10-mei-fecham-as-portas-em-ate-cinco-anos-de-atividade-no-brasil/"],
 ["Opção do Simples híbrido: 1ª janela até 30/10/2026; depois, março e setembro","Serpro; Resolução CGSN 194/2026; Manual da opção (Receita)","https://www.serpro.gov.br/menu/noticias/noticias-2026/opcao-simples-hibrido"],
 ["Alíquota da CBS: Senado fixa até 15/12/2026; estimativa não oficial 9,21% CBS + 18,7% IBS","Senado Notícias, 26/10/2026; O Globo, 28/10/2026","https://www12.senado.leg.br/noticias/materias/2026/10/26/reforma-tributaria-aliquota-da-cbs-avanca-nesta-semana"],
 ["Split payment: testes desde 15/10/2026; início gradual no 2º sem/2027 em B2B","Receita Federal; Comsefaz, 09/10/2026","https://comsefaz.org.br/novo/split-payment-entra-em-fase-de-testes-a-partir-de-15-de-outubro-saiba-o-que-muda/"],
 ["Pronampe: teto de Selic + 6% a.a.; limite ligado à receita bruta do ano anterior","Lei 13.999/2020 (compilada); gov.br/MEMP","https://www.gov.br/memp/pt-br/programa-acredita/novo-desenrola-brasil/novo-pronampe"],
 ["Cronograma da reforma (2026 teste; 2027 CBS; 2029–2032 transição; 2033 completo)","EC 132/2023; LC 214/2025; TCU — Painel da Reforma","https://sites.tcu.gov.br/recursos/reforma-tributaria/"]
];
