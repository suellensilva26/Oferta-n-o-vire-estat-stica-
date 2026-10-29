const row=(a,b,d,c='#fcc419')=>`<div class="card slide ${d}" style="display:flex;gap:28px;align-items:center;margin-top:20px;padding:26px 30px"><div class="h" style="font-size:46px;color:${c};width:300px;flex:none">${a}</div><div style="font-size:38px;font-weight:700;line-height:1.25">${b}</div></div>`;
export default {
 voice:'pt-BR-FranciscaNeural', rate:'+15%',
 scenes:[
 {say:"Anota essa data: primeiro de janeiro de 2027.",
  sub:"Anota essa data: *1º de janeiro de 2027.*",
  src:"Fonte: Receita Federal — Reforma Tributária do Consumo.",
  html:`<div class="gridbg"></div><div class="glow" style="background:#fcc419;top:-300px;right:-300px;opacity:.25"></div>
  <div class="z" style="margin-top:60px;text-align:center"><span class="tag gold in">● Já é lei</span>
  <div class="pop d2" style="margin:50px auto 0;width:520px;border-radius:40px;overflow:hidden;border:4px solid rgba(252,196,25,.7);box-shadow:0 40px 90px -30px rgba(252,196,25,.45)">
   <div style="background:#ef4444;font-family:Montserrat;font-weight:900;font-size:60px;padding:16px 0;letter-spacing:.12em">JANEIRO</div>
   <div style="background:#f8fafc;color:#05080f;font-family:Anton;font-size:300px;line-height:1.1">01</div>
   <div style="background:#e2e8f0;color:#05080f;font-family:Montserrat;font-weight:900;font-size:72px;padding:8px 0">2027</div></div></div>`},
 {say:"Nesse dia, PIS e Cofins acabam e entra a cê bê ésse, o novo imposto federal. Já está na lei.",
  sub:"Nesse dia, *PIS e Cofins* acabam e entra a *CBS,* o novo imposto federal. *Já está na lei.*",
  src:"Fonte: Receita Federal — Reforma Tributária do Consumo.",
  html:`<div class="gridbg"></div>
  <div class="z" style="margin-top:110px;text-align:center">
   <div class="h in" style="font-size:120px"><span class="strike d4" style="animation-delay:1.2s">PIS</span> · <span class="strike" style="animation-delay:1.5s">COFINS</span></div>
   <div class="h pop d10" style="font-size:60px;margin-top:40px;color:#94a3b8">dá lugar à</div>
   <div class="h pop d12" style="font-size:220px;color:#fcc419;margin-top:10px">CBS</div>
   <div class="in d16" style="font-size:40px;font-weight:700;color:#cbd5e1">o novo imposto federal</div></div>`},
 {say:"No segundo semestre de 2027, está previsto o split pêiment: o imposto é separado na hora do pagamento.",
  sub:"No 2º semestre de 2027, está previsto o *split payment:* o imposto é separado *na hora do pagamento.*",
  src:"Fonte: Comsefaz, 09/10/2026 (testes desde 15/10/2026; implantação gradual).",
  html:`<div class="gridbg"></div><div class="glow" style="background:#22c55e;bottom:-300px;left:-300px;opacity:.18"></div>
  <div class="z" style="margin-top:60px"><span class="tag gold in">● Split payment</span>
  <div class="card in d2" style="margin-top:40px;text-align:center"><div style="font-size:36px;color:#94a3b8;font-weight:700">Cliente paga</div><div class="h" style="font-size:110px">R$ 1.000</div></div>
  <div style="display:flex;gap:24px;margin-top:30px">
   <div class="card pop d8" style="flex:1;text-align:center;border-color:rgba(239,68,68,.6)"><div style="font-size:32px;color:#fca5a5;font-weight:700">Imposto</div><div class="h red" style="font-size:64px;margin-top:6px">separado</div><div style="font-size:28px;color:#94a3b8;margin-top:6px">na hora</div></div>
   <div class="card pop d12" style="flex:1;text-align:center;border-color:rgba(34,197,94,.6)"><div style="font-size:32px;color:#86efac;font-weight:700">Empresa recebe</div><div class="h green" style="font-size:64px;margin-top:6px">o líquido</div><div style="font-size:28px;color:#94a3b8;margin-top:6px">no caixa</div></div></div>
  <div class="in d16" style="margin-top:22px;font-size:26px;color:#94a3b8;text-align:center">Valores ilustrativos</div></div>`},
 {say:"De 2029 a 2032, I cê ême ésse e I ésse ésse viram I bê ésse. Em 2033, o modelo novo está completo.",
  sub:"De 2029 a 2032, *ICMS e ISS* viram *IBS.* Em 2033, o modelo novo está completo.",
  src:"Fonte: Receita Federal — Reforma Tributária do Consumo.",
  html:`<div class="gridbg"></div>
  <h1 class="z in" style="font-size:72px;margin-top:40px">A linha do tempo</h1>
  <div class="z" style="margin-top:20px">${row('2026','Ano de teste','d2')}${row('2027','Sai PIS/Cofins, entra a CBS','d4')}${row('2029–2032','ICMS e ISS viram IBS aos poucos','d8')}${row('2033','Modelo novo completo','d12')}</div>`},
 {say:"Preço, nota fiscal e contratos vão precisar de ajuste. Quem se prepara antes negocia melhor.",
  sub:"*Preço, nota fiscal e contratos* vão precisar de ajuste. Quem se prepara antes *negocia melhor.*",
  src:"",
  html:`<div class="kb" style="background-image:url(file:///workspace/criativos/broll/calculadora.jpg)"></div><div class="ov"></div>
  <div class="z" style="margin-top:80px;display:flex;flex-direction:column;gap:24px">${['🏷️ Preço','🧾 Nota fiscal','📄 Contratos'].map((t,i)=>`<div class="card pop d${[1,3,5][i]}" style="font-size:64px;font-weight:900;font-family:Montserrat">${t}</div>`).join('')}</div>`},
 {say:"Faça o diagnóstico gratuito e veja o que muda no seu ramo. Leva um minuto.",
  sub:"Faça o *diagnóstico gratuito* e veja o que muda *no seu ramo.* Leva *1 minuto.*",
  src:"Conteúdo educativo. Fontes: Receita Federal e Comsefaz.",
  html:`<div class="gridbg"></div><div class="glow" style="background:#22c55e;top:-200px;left:-300px;opacity:.22"></div>
  <div class="z" style="margin-top:70px;text-align:center"><span class="tag gold in">● Gratuito · 1 minuto</span>
  <h1 class="in d1" style="font-size:84px;margin-top:36px">O que muda <span class="hl">no seu ramo</span> até 2033?</h1>
  <div class="pop d6" style="margin-top:60px;background:#22c55e;color:#04130a;font-family:Montserrat;font-weight:900;font-size:50px;padding:32px;border-radius:24px">Fazer o diagnóstico →</div></div>`}
 ]};
