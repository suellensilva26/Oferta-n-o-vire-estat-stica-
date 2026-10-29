import { nb } from './nbsp.mjs';
import { chromium } from '/workspace/pwtest/node_modules/playwright/index.mjs';
import fs from 'fs';
const ROOT='/workspace/criativos'; const OUT=ROOT+'/instagram';
const css=fs.readFileSync(ROOT+'/src/base.css','utf8');
const SHIELD=`<svg viewBox="0 0 48 48"><path d="M24 3 6 10v12c0 11.5 7.7 20.6 18 23 10.3-2.4 18-11.5 18-23V10L24 3z" fill="#fcc419"/><path d="m15.5 24.5 6 6 11-12" stroke="#05080f" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const head=(n,t)=>`<div class="z" style="display:flex;justify-content:space-between;align-items:center"><div class="brand">${SHIELD}<span>NÃO VIRE ESTATÍSTICA</span></div><div style="font-family:Montserrat;font-weight:800;font-size:24px;color:var(--muted);letter-spacing:.12em">${t}</div></div>`;
const foot=(s,save=true)=>`<div class="spacer"></div><div class="z" style="display:flex;justify-content:space-between;align-items:flex-end;gap:30px"><p class="src" style="max-width:700px">${s}</p>${save?`<div style="font-family:Montserrat;font-weight:800;font-size:24px;color:var(--gold);white-space:nowrap">SALVE ESTE POST ↗</div>`:''}</div>`;
const bgs=`<div class="grid"></div><div class="glow" style="background:#fcc419;top:-500px;right:-500px;opacity:.14"></div>`;
const row=(a,b,c='var(--gold)',w=230)=>`<div style="display:flex;gap:24px;align-items:baseline;padding:20px 0;border-top:2px solid var(--line)"><div style="font-family:Montserrat;font-weight:900;font-size:34px;color:${c};width:${w}px;flex:none">${a}</div><div style="font-size:31px;color:var(--soft);font-weight:500;line-height:1.3">${b}</div></div>`;
const items={
p1:()=>`${bgs}${head(1,'COMECE AQUI')}
<h1 class="z" style="font-size:88px;margin-top:90px">Dados reais.<br>Plano prático.<br><span class="hl">Sem achismo.</span></h1>
<p class="sub z" style="margin-top:40px">Aqui você entende, em linguagem simples, o que muda para pequenas e médias empresas até 2030: <b>juros, inadimplência e reforma tributária.</b></p>
<div class="z" style="margin-top:44px;display:flex;flex-direction:column;gap:16px">${['🛡️ Caixa: quanto tempo o negócio aguenta','📊 Margem: preço certo com o imposto novo','🧾 Fiscal: o que perguntar ao contador'].map(t=>`<div class="card" style="font-size:33px;font-weight:700;padding:22px 28px">${t}</div>`).join('')}</div>
${foot('Toda informação aqui tem fonte: Serasa Experian, Receita Federal, Banco Central e imprensa.',false)}`,
p2:()=>`${bgs}${head(2,'REFORMA TRIBUTÁRIA')}
<span class="tag gold z" style="margin-top:60px"><span class="dot"></span>Já é lei</span>
<h1 class="z" style="font-size:76px;margin-top:26px">O calendário da reforma, <span class="hl">em 1 imagem</span></h1>
<div class="z card" style="margin-top:40px;padding:6px 32px">${row('2026','Ano de teste da CBS e do IBS').replace('border-top:2px solid var(--line)','')}${row('2027','PIS e Cofins acabam. Entra a CBS. IPI vai a zero (exceto Zona Franca)')}${row('2º sem. 2027','Split payment previsto, de forma gradual')}${row('2029–2032','ICMS e ISS diminuem ano a ano; IBS aumenta')}${row('2033','ICMS e ISS deixam de existir')}</div>
${foot('Fontes: Receita Federal (Reforma Tributária do Consumo); Comsefaz, 09/10/2026.')}`,
p3:()=>`<div class="grid"></div><div class="glow" style="background:#ef4444;top:-400px;left:-400px;opacity:.25"></div>${head(3,'DADO DO MÊS')}
<div class="z" style="font-family:Anton;font-size:300px;line-height:1;margin-top:70px">9,3 MI</div>
<h1 class="z" style="font-size:60px;margin-top:10px">de empresas inadimplentes em agosto de 2026. <span class="hl">Recorde.</span></h1>
<div class="z card" style="margin-top:40px;padding:6px 32px">${row('R$ 244,4 bi','em dívidas negativadas').replace('border-top:2px solid var(--line)','')}${row('R$ 23.902','dívida média das micro e pequenas')}${row('56% · 32% · 8%','serviços · comércio · indústria',undefined,330)}</div>
${foot('Fonte: Serasa Experian, ago/2026 (via CNN Brasil).')}`,
p4:()=>`${bgs}${head(4,'ENTENDA')}
<h1 class="z" style="font-size:72px;margin-top:70px">Recuperação judicial <span class="hl">não é falência.</span></h1>
<div class="z" style="margin-top:44px;display:flex;flex-direction:column;gap:18px">
${[['Recuperação judicial','A empresa pede à Justiça um prazo para renegociar dívidas e continua funcionando.','#fcc419'],['Recuperação extrajudicial','A empresa negocia direto com os credores e leva o acordo para a Justiça homologar.','#60a5fa'],['Falência','A empresa encerra e os bens são vendidos para pagar credores.','#f87171']].map(([a,b,c])=>`<div class="card" style="border-left:10px solid ${c}"><div style="font-family:Montserrat;font-weight:900;font-size:38px;color:${c}">${a}</div><div style="font-size:30px;color:var(--soft);margin-top:10px;line-height:1.35">${b}</div></div>`).join('')}
</div>
${foot('Fonte: g1, 28/08/2026 (Lei 11.101/2005).')}`,
p5:()=>`<div class="bg" style="background-image:url(file://${ROOT}/broll/loja.jpg)"></div><div class="shade"></div>${head(5,'2026 EM NOTÍCIAS')}
<h1 class="z" style="font-size:74px;margin-top:70px">Marcas que você conhece <span class="hl">pediram recuperação</span> em 2026</h1>
<div class="spacer"></div>
<div class="z card" style="padding:6px 32px">${row('Casas Bahia','≈ R$ 17,3 bi · judicial','#fff',390).replace('border-top:2px solid var(--line)','')}${row('Dono do Habib’s','R$ 265,2 mi · judicial','#fff',390)}${row('Dono da Tok&Stok','≈ R$ 1 bi · judicial','#fff',390)}${row('Braskem','R$ 56 bi · extrajudicial','#fff',390)}${row('Oncoclínicas','≈ R$ 5,1 bi · extrajudicial','#fff',390)}</div>
<p class="sub z" style="margin-top:26px;font-size:30px">Motivos citados: <b>juros altos, crédito restrito e consumo mais fraco.</b></p>
${foot('Fonte: g1, 28/08/2026. Valores = dívidas incluídas nos pedidos.')}`,
p6:()=>`${bgs}${head(6,'CAIXA')}
<div class="z" style="font-family:Anton;font-size:230px;line-height:1;margin-top:60px;color:var(--gold)">13,75%</div>
<h1 class="z" style="font-size:58px;margin-top:10px">Selic ao ano. 3 efeitos no caixa de uma pequena empresa:</h1>
<div class="z" style="margin-top:36px;display:flex;flex-direction:column;gap:16px">${['1. Capital de giro e antecipação de recebíveis ficam mais caros','2. Cliente compra menos ou parcela mais','3. Estoque parado custa dinheiro todo mês'].map(t=>`<div class="card" style="font-size:31px;font-weight:600;padding:22px 28px">${t}</div>`).join('')}</div>
${foot('Fonte: Banco Central (Copom, 16/09/2026).')}`,
p7:()=>`${bgs}${head(7,'NOVIDADE')}
<span class="tag gold z" style="margin-top:60px"><span class="dot"></span>Split payment</span>
<h1 class="z" style="font-size:72px;margin-top:26px">O imposto vai ser <span class="hl">separado na hora</span> do pagamento</h1>
<div class="z" style="display:flex;gap:18px;margin-top:44px;align-items:stretch">
 <div class="card" style="flex:1;text-align:center"><div style="font-size:26px;color:var(--muted);font-weight:700">Cliente paga</div><div style="font-family:Montserrat;font-weight:900;font-size:52px;margin-top:8px">R$ 1.000</div></div>
 <div style="font-size:60px;align-self:center;color:var(--muted)">→</div>
 <div style="flex:1.2;display:flex;flex-direction:column;gap:14px"><div class="card" style="padding:18px 22px;border-color:rgba(239,68,68,.5)"><div style="font-size:24px;color:#fca5a5;font-weight:700">Imposto</div><div style="font-family:Montserrat;font-weight:900;font-size:36px">vai direto ao fisco</div></div><div class="card" style="padding:18px 22px;border-color:rgba(34,197,94,.5)"><div style="font-size:24px;color:#86efac;font-weight:700">Empresa</div><div style="font-family:Montserrat;font-weight:900;font-size:36px">recebe o líquido</div></div></div>
</div>
<p class="sub z" style="margin-top:36px;font-size:31px">Testes desde 15/10/2026, início previsto no 2º semestre de 2027, de forma gradual. <b>Quem usa o imposto como capital de giro precisa se preparar.</b></p>
${foot('Fonte: Comsefaz, 09/10/2026. Valores ilustrativos.')}`,
p8:()=>`${bgs}${head(8,'CHECKLIST')}
<h1 class="z" style="font-size:68px;margin-top:70px">Perguntas para fazer ao seu contador <span class="hl">antes de 2027</span></h1>
<div class="z" style="margin-top:36px;display:flex;flex-direction:column;gap:14px">${['Meu preço já considera a CBS e o IBS?','Vale a pena o Simples “híbrido” para quem vende a empresas? (opção em março de 2027)','Meu sistema emite nota no layout novo?','Como o split payment muda o meu caixa?','Meus contratos longos têm cláusula de reajuste tributário?'].map((t,i)=>`<div class="card" style="font-size:30px;font-weight:600;padding:20px 26px;display:flex;gap:18px"><span style="color:var(--gold);font-family:Montserrat;font-weight:900">${String(i+1).padStart(2,'0')}</span>${t}</div>`).join('')}</div>
${foot('Fontes: Receita Federal; CGSN, 11/08/2026.')}`,
p9:()=>`<div class="grid"></div><div class="glow" style="background:#22c55e;top:-400px;left:-300px;opacity:.18"></div>${head(9,'DIAGNÓSTICO')}
<h1 class="z" style="font-size:80px;margin-top:80px">Em 1 minuto, veja <span class="hl">o que muda no seu ramo</span> até 2030</h1>
<div class="z card" style="margin-top:44px;font-size:34px;font-weight:700;line-height:1.75">✅ Comércio e alimentação<br>✅ Serviços<br>✅ Indústria, agro e B2B</div>
<div class="z" style="margin-top:40px"><div class="cta"><div>Link na bio<small>Diagnóstico gratuito · 9 perguntas</small></div><div class="arr">↗</div></div></div>
${foot('Conteúdo educativo. Não substitui o seu contador.',false)}`,
};
const browser=await chromium.launch(); const page=await browser.newPage();
async function shot(html,w,h,name,pt=64,pb=64){await page.setViewportSize({width:w,height:h});
 fs.writeFileSync('/tmp/_ig.html',`<!doctype html><html><head><meta charset="utf-8"><style>${css}:root{--w:${w}px;--h:${h}px;--pt:${pt}px;--pb:${pb}px}</style></head><body>${nb(html)}</body></html>`);
 await page.goto('file:///tmp/_ig.html'); await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(100); await page.screenshot({path:`${OUT}/${name}`}); console.log(name);}
for(const [k,f] of Object.entries(items)) await shot(`<div class="frame">${f()}</div>`,1080,1350,`post${k.slice(1).padStart(2,'0')}.png`);
// profile picture
await shot(`<div style="width:1080px;height:1080px;background:radial-gradient(circle at 50% 40%,#13213f,#05080f 70%);display:flex;align-items:center;justify-content:center"><div style="width:560px;height:560px">${SHIELD.replace('<svg','<svg width="560" height="560"')}</div></div>`,1080,1080,'perfil_1080.png');
// highlights
const hl=[['comece','Comece aqui','<path d="M24 6v36M6 24h36" stroke="#fcc419" stroke-width="5" stroke-linecap="round"/>'],
['reforma','Reforma 2027','<rect x="8" y="10" width="32" height="30" rx="4" stroke="#fcc419" stroke-width="4" fill="none"/><path d="M8 18h32M16 6v8M32 6v8" stroke="#fcc419" stroke-width="4" stroke-linecap="round"/>'],
['caixa','Caixa','<rect x="6" y="14" width="36" height="24" rx="4" stroke="#fcc419" stroke-width="4" fill="none"/><circle cx="24" cy="26" r="5" stroke="#fcc419" stroke-width="4" fill="none"/>'],
['dados','Dados','<path d="M10 40V26M20 40V16M30 40V22M40 40V8" stroke="#fcc419" stroke-width="5" stroke-linecap="round"/>'],
['duvidas','Dúvidas','<circle cx="24" cy="24" r="18" stroke="#fcc419" stroke-width="4" fill="none"/><path d="M18 19a6 6 0 1 1 8 5.6c-1.4.6-2 1.6-2 3.4" stroke="#fcc419" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="24" cy="34" r="2.6" fill="#fcc419"/>']];
for(const [id,label,path] of hl) await shot(`<div style="width:1080px;height:1920px;background:#05080f;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="width:640px;height:640px;border-radius:50%;background:radial-gradient(circle,#13213f,#0b1224);border:6px solid rgba(252,196,25,.5);display:flex;align-items:center;justify-content:center"><svg viewBox="0 0 48 48" width="320" height="320">${path}</svg></div></div>`,1080,1920,`destaque_${id}.png`);
await browser.close();
