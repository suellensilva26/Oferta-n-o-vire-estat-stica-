import { nb } from './nbsp.mjs';
import { chromium } from '/workspace/pwtest/node_modules/playwright/index.mjs';
import fs from 'fs';
const ROOT='/workspace/criativos';
const css=fs.readFileSync(ROOT+'/src/base.css','utf8');
const B=(f)=>'file://'+ROOT+'/broll/'+f;
export const SHIELD=`<svg viewBox="0 0 48 48"><path d="M24 3 6 10v12c0 11.5 7.7 20.6 18 23 10.3-2.4 18-11.5 18-23V10L24 3z" fill="#fcc419"/><path d="m15.5 24.5 6 6 11-12" stroke="#05080f" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const brand=`<div class="brand z">${SHIELD}<span>NÃO VIRE ESTATÍSTICA</span></div>`;
const cta=(t,s)=>`<div class="cta z"><div>${t}<small>${s}</small></div><div class="arr">→</div></div>`;
const story=f=>f==='story';

export const creatives={
// C01 — marcas em recuperação judicial (comércio)
c01:(f)=>`
<div class="bg" style="background-image:url(${B('loja.jpg')});background-position:center 35%"></div><div class="shade" style="background:linear-gradient(180deg,rgba(5,8,15,.72) 0%,rgba(5,8,15,.45) 30%,rgba(5,8,15,.8) 55%,rgba(5,8,15,.97) 78%,#05080f 100%)"></div>
${brand}
<div class="z" style="margin-top:${story(f)?60:40}px"><span class="tag"><span class="dot"></span>Notícia · 2026</span></div>
<h1 class="z" style="font-size:${story(f)?84:76}px;margin-top:28px">Grandes redes do varejo <span class="hl">pediram recuperação judicial</span> em 2026</h1>
<div class="spacer"></div>
<div class="z" style="display:flex;flex-direction:column;gap:16px">
 ${[['Grupo Casas Bahia','R$ 17,3 bi','em dívidas'],['Dono do Habib’s','R$ 265,2 mi','em dívidas'],['Dono da Tok&Stok','R$ 1 bi','em dívidas, aprox.']].map(([a,b,c])=>`
 <div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:22px 30px">
  <div style="font-family:Montserrat;font-weight:800;font-size:38px">${a}</div>
  <div style="text-align:right"><div style="font-family:Montserrat;font-weight:900;font-size:40px;color:#f87171">${b}</div><div style="font-size:21px;color:var(--muted)">${c}</div></div>
 </div>`).join('')}
</div>
<p class="sub z" style="margin-top:28px;font-size:${story(f)?36:32}px">Motivos citados: <b>juros altos, crédito restrito e caixa apertado.</b> O pequeno comércio sente o mesmo, sem o mesmo fôlego.</p>
<div class="z" style="margin-top:28px">${cta('Veja o plano de 30 dias','Diagnóstico gratuito de 1 minuto')}</div>
<p class="src z" style="margin-top:18px">Fonte: g1, 28/08/2026. Recuperação judicial é a renegociação de dívidas na Justiça, não falência.</p>`,

// C02 — 9,3 milhões
c02:(f)=>`
<div class="grid"></div><div class="glow" style="background:#ef4444;top:-300px;left:-200px"></div><div class="glow" style="background:#fcc419;bottom:-500px;right:-400px;opacity:.18"></div>
${brand}
<div class="z" style="margin-top:${story(f)?80:56}px"><span class="tag"><span class="dot"></span>Recorde · Serasa Experian</span></div>
<div class="z" style="font-family:Anton;font-size:${story(f)?330:290}px;line-height:.95;margin-top:30px;letter-spacing:-.01em;background:linear-gradient(180deg,#fff 30%,#fca5a5);-webkit-background-clip:text;color:transparent">9,3 MI</div>
<h1 class="z" style="font-size:${story(f)?66:58}px;margin-top:6px">de empresas com contas atrasadas no Brasil. <span class="hl">Nunca foram tantas.</span></h1>
<div class="z" style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:${story(f)?60:40}px">
 ${[['56%','serviços'],['32%','comércio'],['8%','indústria']].map(([a,b])=>`<div class="card" style="text-align:center;padding:22px 10px"><div style="font-family:Montserrat;font-weight:900;font-size:56px;color:var(--gold)">${a}</div><div style="font-size:26px;color:var(--soft);font-weight:600">${b}</div></div>`).join('')}
</div>
<div class="spacer"></div>
<p class="sub z" style="font-size:32px">O que as empresas que atravessam esse cenário fazem diferente? <b>Caixa projetado, preço revisado e cobrança organizada.</b></p>
<div class="z" style="margin-top:28px">${cta('Faça o diagnóstico gratuito','Gratuito · 1 minuto · feito para o seu ramo')}</div>
<p class="src z" style="margin-top:18px">Fonte: Serasa Experian, dados de agosto de 2026 (via CNN Brasil).</p>`,

// C03 — 01/01/2027 reforma
c03:(f)=>`
<div class="grid"></div><div class="glow" style="background:#fcc419;top:-400px;right:-300px;opacity:.22"></div>
${brand}
<div class="z" style="margin-top:${story(f)?80:50}px"><span class="tag gold"><span class="dot"></span>Já é lei · Reforma Tributária</span></div>
<div class="z" style="display:flex;align-items:center;gap:30px;margin-top:34px">
 <div style="width:250px;border-radius:28px;overflow:hidden;border:3px solid rgba(252,196,25,.6);box-shadow:0 30px 60px -20px rgba(252,196,25,.35);flex:none">
  <div style="background:#ef4444;text-align:center;font-family:Montserrat;font-weight:900;font-size:34px;padding:12px 0;letter-spacing:.1em">JAN</div>
  <div style="background:#f8fafc;color:#05080f;text-align:center;font-family:Anton;font-size:150px;line-height:1.1">01</div>
  <div style="background:#e2e8f0;color:#05080f;text-align:center;font-family:Montserrat;font-weight:900;font-size:40px;padding:6px 0">2027</div>
 </div>
 <h1 style="font-size:${story(f)?70:64}px">PIS e Cofins <span class="red">acabam.</span><br>Entra a <span class="hl">CBS.</span></h1>
</div>
<div class="z card" style="margin-top:${story(f)?60:36}px;padding:12px 30px">
 ${[['2026','Ano de teste do imposto novo'],['2º sem. 2027','Split payment previsto: imposto separado na hora do pagamento'],['2029–2032','ICMS e ISS trocados aos poucos pelo IBS'],['2033','Modelo novo completo']].map(([a,b],i)=>`<div style="display:flex;gap:22px;align-items:baseline;padding:16px 0;${i?'border-top:2px solid var(--line)':''}"><div style="font-family:Montserrat;font-weight:900;font-size:32px;color:var(--gold);width:230px;flex:none">${a}</div><div style="font-size:29px;color:var(--soft);font-weight:500;line-height:1.3">${b}</div></div>`).join('')}
</div>
<div class="spacer"></div>
<p class="sub z" style="font-size:32px"><b>Preço, nota fiscal e contratos</b> precisam estar prontos. Veja o que fazer agora, por segmento.</p>
<div class="z" style="margin-top:26px">${cta('Ver o plano por segmento','Diagnóstico gratuito de 1 minuto')}</div>
<p class="src z" style="margin-top:18px">Fontes: Receita Federal (Reforma Tributária do Consumo); Comsefaz, 09/10/2026.</p>`,

// C04 — quantas semanas o caixa aguenta (story-first)
c04:(f)=>`
<div class="bg" style="background-image:url(${B('calculadora.jpg')})"></div><div class="shade" style="background:linear-gradient(180deg,rgba(5,8,15,.7) 0%,rgba(5,8,15,.82) 45%,rgba(5,8,15,.97) 80%)"></div>
${brand}
<div class="z" style="margin-top:${story(f)?70:44}px"><span class="tag gold"><span class="dot"></span>Teste de 10 segundos</span></div>
<h1 class="z" style="font-size:${story(f)?88:72}px;margin-top:30px">Se as vendas caírem 20%, <span class="hl">quantas semanas o caixa aguenta?</span></h1>
<div class="z card" style="margin-top:${story(f)?70:36}px">
 <div style="display:flex;justify-content:space-between;font-family:Montserrat;font-weight:800;font-size:26px;color:var(--soft)"><span>Fôlego do caixa</span><span>semanas</span></div>
 <div style="display:flex;gap:10px;margin-top:20px">${Array.from({length:13},(_,i)=>`<div style="flex:1;height:${story(f)?110:80}px;border-radius:10px;background:${i<3?'#ef4444':i<7?'#f59e0b':'rgba(148,163,184,.18)'};${i>=7?'border:2px dashed rgba(148,163,184,.35)':''}"></div>`).join('')}</div>
 <div style="display:flex;gap:10px;margin-top:12px;font-size:22px;color:var(--muted);font-weight:700;text-align:center">${Array.from({length:13},(_,i)=>`<div style="flex:1">${[1,4,8,13].includes(i+1)?i+1:''}</div>`).join('')}</div>
 <p style="font-size:28px;color:var(--soft);margin-top:18px;line-height:1.35">Quem não sabe esse número descobre do pior jeito. <b style="color:#fff">O ideal é enxergar 13 semanas à frente.</b></p>
</div>
<div class="spacer"></div>
<p class="sub z" style="font-size:32px">Com a Selic em <b>13,75% ao ano</b>, cobrir buraco de caixa com empréstimo ficou caro.</p>
<div class="z" style="margin-top:26px">${cta('Faça a conta no diagnóstico','Gratuito · 1 minuto')}</div>
<p class="src z" style="margin-top:18px">Fonte: Banco Central (Copom, 16/09/2026). Exemplo ilustrativo.</p>`,

// C05 — serviços / ISS
c05:(f)=>`
<div class="bg" style="background-image:url(${B('servicos.jpg')})"></div><div class="shade" style="background:linear-gradient(180deg,rgba(5,8,15,.75) 0%,rgba(5,8,15,.55) 40%,rgba(5,8,15,.92) 70%,#05080f 100%)"></div>
${brand}
<div class="z" style="margin-top:${story(f)?70:44}px"><span class="tag gold"><span class="dot"></span>Para quem presta serviço</span></div>
<p class="z" style="font-family:Montserrat;font-weight:800;font-size:${story(f)?40:34}px;color:var(--soft);margin-top:30px;line-height:1.25">Clínica, salão, agência, escritório, academia, escola:</p>
<h1 class="z" style="font-size:${story(f)?96:80}px;margin-top:14px">O ISS tem <span class="hl">data para acabar.</span></h1>
<div class="z" style="margin-top:${story(f)?60:36}px;display:flex;flex-direction:column;gap:14px">
 ${[['2027','PIS e Cofins dão lugar à CBS'],['2029 a 2032','O ISS vai sendo trocado pelo IBS'],['2033','O ISS deixa de existir']].map(([a,b])=>`<div class="card" style="display:flex;gap:24px;align-items:center;padding:20px 28px"><div style="font-family:Montserrat;font-weight:900;font-size:34px;color:var(--gold);width:250px;flex:none">${a}</div><div style="font-size:30px;font-weight:600">${b}</div></div>`).join('')}
</div>
<div class="spacer"></div>
<p class="sub z" style="font-size:32px">E <b>56% das empresas com contas atrasadas</b> no Brasil são de serviços. Preço por hora e contratos precisam ser revistos.</p>
<div class="z" style="margin-top:26px">${cta('Ver o plano para serviços','Diagnóstico gratuito de 1 minuto')}</div>
<p class="src z" style="margin-top:18px">Fontes: Receita Federal; Serasa Experian, ago/2026.</p>`,

// C06 — indústria/agro
c06:(f)=>`
<div class="bg" style="background-image:url(${B('agro.jpg')});background-position:center 60%"></div><div class="shade" style="background:linear-gradient(180deg,rgba(5,8,15,.6) 0%,rgba(5,8,15,.8) 35%,rgba(5,8,15,.96) 70%,#05080f 100%)"></div>
${brand}
<div class="z" style="margin-top:${story(f)?70:44}px"><span class="tag"><span class="dot"></span>Indústria e agro · 2026</span></div>
<h1 class="z" style="font-size:${story(f)?84:72}px;margin-top:28px">Gigantes foram à Justiça <span class="hl">renegociar dívidas</span> em 2026</h1>
<div class="z" style="margin-top:${story(f)?60:34}px;display:flex;flex-direction:column;gap:14px">
 ${[['Raízen','mais de R$ 60 bi'],['Braskem','R$ 56 bi'],['Ruiz Coffees','R$ 1,6 bi']].map(([a,b])=>`<div class="card" style="display:flex;justify-content:space-between;align-items:center;padding:20px 30px"><div style="font-family:Montserrat;font-weight:800;font-size:40px">${a}</div><div style="font-family:Montserrat;font-weight:900;font-size:40px;color:#f87171">${b}</div></div>`).join('')}
</div>
<div class="spacer"></div>
<p class="sub z" style="font-size:31px">Em 2025, o agro foi o setor com mais pedidos de recuperação judicial: <b>743 empresas.</b> Quem vende a prazo para outras empresas sente primeiro.</p>
<div class="z" style="margin-top:26px">${cta('Ver o plano para indústria e agro','Diagnóstico gratuito de 1 minuto')}</div>
<p class="src z" style="margin-top:18px">Fontes: g1, CNN Brasil e Globo Rural (2026); Serasa Experian via Poder360. Valores = dívidas incluídas nos pedidos.</p>`,

// C07 — quiz/diagnóstico (story-first)
c07:(f)=>`
<div class="grid"></div><div class="glow" style="background:#22c55e;top:-300px;left:-300px;opacity:.18"></div><div class="glow" style="background:#fcc419;bottom:-300px;right:-400px;opacity:.16"></div>
${brand}
<div class="z" style="margin-top:${story(f)?70:40}px"><span class="tag gold"><span class="dot"></span>Gratuito · 1 minuto</span></div>
<h1 class="z" style="font-size:${story(f)?80:64}px;margin-top:26px">Qual o nível de risco do <span class="hl">seu segmento</span> para 2027?</h1>
<div class="z" style="margin:${story(f)?60:30}px auto 0;width:${story(f)?720:640}px;background:#0b1224;border:3px solid rgba(148,163,184,.3);border-radius:46px;padding:34px 30px;box-shadow:0 40px 80px -30px rgba(0,0,0,.8)">
 <div style="display:flex;justify-content:space-between;font-size:22px;color:var(--muted);font-weight:700"><span>Pergunta 1 de 9</span><span>11%</span></div>
 <div style="height:10px;border-radius:9px;background:rgba(148,163,184,.2);margin-top:12px"><div style="width:11%;height:100%;border-radius:9px;background:var(--gold)"></div></div>
 <p style="font-family:Montserrat;font-weight:800;font-size:${story(f)?34:30}px;margin-top:26px;line-height:1.25">Qual é o ramo da sua empresa?</p>
 ${['🛍️  Comércio, loja ou e-commerce','🍽️  Alimentação','💼  Serviços','🏭  Indústria','🚚  Agro, atacado ou transporte'].map((t,i)=>`<div style="margin-top:12px;padding:${story(f)?18:14}px 22px;border-radius:18px;border:2px solid ${i==2?'#fcc419':'rgba(148,163,184,.3)'};background:${i==2?'rgba(252,196,25,.1)':'transparent'};font-size:${story(f)?27:24}px;font-weight:600">${t}</div>`).join('')}
</div>
<div class="spacer"></div>
<p class="sub z" style="font-size:31px;text-align:center">Responda 9 perguntas rápidas e veja <b>o que muda no seu caixa, preço e impostos</b> até 2030.</p>
<div class="z" style="margin-top:24px">${cta('Começar o diagnóstico','Gratuito · 1 minuto')}</div>
<p class="src z" style="margin-top:16px;text-align:center">Conteúdo educativo. Baseado em dados da Serasa Experian, Receita Federal e Banco Central.</p>`,
};

export async function render(list, outDir){
  const browser=await chromium.launch();
  const page=await browser.newPage({deviceScaleFactor:1});
  for(const [id,fmt] of list){
    const [w,h,pt,pb]=fmt==='story'?[1080,1920,200,300]:[1080,1350,64,64];
    await page.setViewportSize({width:w,height:h});
    const html=`<!doctype html><html><head><meta charset="utf-8"><style>${css}:root{--w:${w}px;--h:${h}px;--pt:${pt}px;--pb:${pb}px}</style></head><body><div class="frame">${creatives[id](fmt)}</div></body></html>`;
    fs.writeFileSync(`${ROOT}/src/_${id}_${fmt}.html`,nb(html));
    await page.goto(`file://${ROOT}/src/_${id}_${fmt}.html`);
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(150);
    const over=await page.evaluate(()=>{const f=document.querySelector('.frame');return [...f.children].some(c=>c.getBoundingClientRect().bottom>f.clientHeight+1)});
    const name=`${outDir}/${id}_${fmt==='story'?'1080x1920':'1080x1350'}.png`;
    await page.screenshot({path:name});
    console.log(name, over?'OVERFLOW':'ok');
  }
  await browser.close();
}
if(process.argv[2]==='run'){
  const ids=process.argv[3]?process.argv[3].split(','):Object.keys(creatives);
  const list=[];for(const id of ids){list.push([id,'feed']);list.push([id,'story'])}
  await render(list, ROOT+'/estaticos');
}
