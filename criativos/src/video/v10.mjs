const B=f=>`file:///workspace/criativos/broll/${f}`;
const name=(n,v,d)=>`<div class="card slide ${d}" style="display:flex;justify-content:space-between;align-items:center;margin-top:22px"><div class="h" style="font-size:52px">${n}</div><div class="h red" style="font-size:46px">${v}</div></div>`;
export default {
 voice:'pt-BR-AntonioNeural', rate:'+15%',
 scenes:[
 {say:"Raízen, Braskem e Ruiz Cófis: em 2026, as três foram à Justiça renegociar dívidas bilionárias.",
  sub:"*Raízen, Braskem e Ruiz Coffees:* em 2026, as três foram à Justiça *renegociar dívidas bilionárias.*",
  src:"Fontes: g1 e CNN Brasil (2026); Globo Rural, 10/2026.",
  html:`<div class="kb" style="background-image:url(${B('galpao.jpg')})"></div><div class="ov"></div>
  <div class="z" style="margin-top:50px"><span class="tag in">● Indústria e agro · 2026</span></div>
  <h1 class="z in d1" style="font-size:80px;margin-top:30px">Foram à Justiça <span class="hl">renegociar dívidas:</span></h1>
  <div class="z" style="margin-top:24px">${name('Raízen','+ de R$ 60 bi','d4')}${name('Braskem','R$ 56 bi','d6')}${name('Ruiz Coffees','R$ 1,6 bi','d8')}</div>`},
 {say:"Quando um cliente grande renegocia, o fornecedor vira credor e espera na fila.",
  sub:"Quando um cliente grande renegocia, *o fornecedor vira credor* e *espera na fila.*",
  src:"",
  html:`<div class="gridbg"></div><div class="glow" style="background:#ef4444;top:-300px;left:-300px;opacity:.22"></div>
  <div class="z" style="margin-top:80px;text-align:center">
   <div class="card pop" style="font-size:52px;font-weight:900;font-family:Montserrat">🏭 Cliente grande</div>
   <div class="h in d3" style="font-size:44px;color:#f87171;margin:26px 0">▼ renegocia dívidas ▼</div>
   <div class="card pop d6" style="font-size:52px;font-weight:900;font-family:Montserrat;border-color:rgba(239,68,68,.6)">📦 Fornecedor vira <span class="red">credor</span></div>
   <div class="in d10" style="margin-top:30px;font-size:40px;font-weight:700;color:#cbd5e1">⏳ e espera na fila</div></div>`},
 {say:"Em 2025, o agro liderou as recuperações judiciais: setecentas e quarenta e três empresas.",
  sub:"Em 2025, o *agro* liderou as recuperações judiciais: *743 empresas.*",
  src:"Fonte: Serasa Experian via Poder360, 07/04/2026.",
  html:`<div class="kb" style="background-image:url(${B('agro.jpg')})"></div><div class="ov" style="background:rgba(5,8,15,.82)"></div>
  <h1 class="z in" style="font-size:66px;margin-top:40px">Recuperações judiciais em 2025, por setor</h1>
  <div class="z" style="display:flex;align-items:flex-end;gap:40px;height:560px;margin-top:40px;padding:0 40px">
   ${[['Agro',743,'#ef4444'],['Serviços',739,'#64748b'],['Comércio',535,'#64748b'],['Indústria',449,'#fcc419']].map(([l,v,c],i)=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%"><div class="h in d${[4,5,6,8][i]}" style="font-size:44px;margin-bottom:10px">${v}</div><div class="growv d${[2,3,4,6][i]}" style="width:100%;height:${v/743*420}px;background:${c};border-radius:16px 16px 0 0"></div><div style="font-size:30px;font-weight:700;margin-top:12px;color:#cbd5e1">${l}</div></div>`).join('')}
  </div>`},
 {say:"Em 2027, o seu cliente vai perguntar se a sua nota gera crédito de cê bê ésse e i bê ésse.",
  sub:"Em 2027, o seu cliente vai perguntar: *a sua nota gera crédito de CBS e IBS?*",
  src:"Fonte: Receita Federal; CGSN, 11/08/2026.",
  html:`<div class="gridbg"></div>
  <div class="z" style="margin-top:60px">
   <div class="card in" style="background:#f8fafc;color:#0f172a;border:none;padding:40px">
    <div style="display:flex;justify-content:space-between;font-family:Montserrat;font-weight:900;font-size:40px"><span>NOTA FISCAL</span><span style="color:#64748b">2027</span></div>
    ${['Produto / serviço','Valor','CBS','IBS'].map((t,i)=>`<div style="display:flex;justify-content:space-between;border-top:2px solid #e2e8f0;padding:20px 0;font-size:34px;font-weight:600"><span>${t}</span><span style="color:#94a3b8">${i<2?'———':'gera crédito?'}</span></div>`).join('')}
   </div>
   <div class="h pop d8" style="font-size:76px;text-align:center;margin-top:44px">Gera <span class="hl">crédito?</span></div></div>`},
 {say:"Com a Selic a treze vírgula setenta e cinco por cento, vender a prazo é financiar o cliente com dinheiro caro.",
  sub:"Com a Selic a *13,75% ao ano,* vender a prazo é *financiar o cliente com dinheiro caro.*",
  src:"Fonte: Banco Central (Copom, 16/09/2026).",
  html:`<div class="gridbg"></div><div class="glow" style="background:#fcc419;top:-300px;right:-400px;opacity:.2"></div>
  <div class="z" style="margin-top:110px;text-align:center"><div class="h soft in" style="font-size:50px">Selic</div>
  <div style="font-family:Anton;font-size:280px;line-height:1.05" data-to="13.75" data-dec="2" data-suf="%" data-dur="1.4">0%</div>
  <div class="h in d4" style="font-size:52px;color:#cbd5e1">ao ano</div></div>`},
 {say:"Faça o diagnóstico gratuito e veja o plano para o seu caixa. Leva um minuto.",
  sub:"Faça o *diagnóstico gratuito* e veja o *plano para o seu caixa.* Leva *1 minuto.*",
  src:"Conteúdo educativo. Dados: Serasa Experian, Receita Federal e Banco Central.",
  html:`<div class="gridbg"></div><div class="glow" style="background:#22c55e;top:-200px;left:-300px;opacity:.22"></div>
  <div class="z" style="margin-top:70px;text-align:center"><span class="tag gold in">● Gratuito · 1 minuto</span>
  <h1 class="in d1" style="font-size:80px;margin-top:36px">Plano para <span class="hl">indústria, agro e B2B</span></h1>
  <div class="card in d3" style="margin-top:40px;text-align:left;font-size:40px;font-weight:700;line-height:1.6">✅ Prazo de recebimento x pagamento<br>✅ Crédito de CBS e IBS<br>✅ Plano de 30 dias</div>
  <div class="pop d8" style="margin-top:40px;background:#22c55e;color:#04130a;font-family:Montserrat;font-weight:900;font-size:50px;padding:32px;border-radius:24px">Fazer o diagnóstico →</div></div>`}
 ]};
