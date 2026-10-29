const B=f=>`file:///workspace/criativos/broll/${f}`;
const name=(n,v,d)=>`<div class="card slide ${d}" style="display:flex;justify-content:space-between;align-items:center;margin-top:22px"><div class="h" style="font-size:48px">${n}</div><div class="h red" style="font-size:44px">${v}</div></div>`;
export default {
 voice:'pt-BR-AntonioNeural', rate:'+15%',
 scenes:[
 {say:"Casas Bahia, o dono do Rabíbs e o dono da Tók i Stók: as três pediram recuperação judicial em 2026.",
  sub:"*Casas Bahia,* o dono do *Habib's* e o dono da *Tok&Stok:* as três pediram *recuperação judicial* em 2026.",
  src:"Fonte: g1, 28/08/2026.",
  html:`<div class="kb" style="background-image:url(${B('loja.jpg')})"></div><div class="ov"></div>
  <div class="z" style="margin-top:60px"><span class="tag in">● Notícia · 2026</span></div>
  <h1 class="z in d1" style="font-size:84px;margin-top:34px">Pediram <span class="hl">recuperação judicial</span> em 2026:</h1>
  <div class="z" style="margin-top:30px">${name('Grupo Casas Bahia','R$ 17,3 bi','d4')}${name('Dono do Habib’s','R$ 265,2 mi','d8')}${name('Dono da Tok&Stok','R$ 1 bi','d12')}</div>`},
 {say:"Só a Casas Bahia levou cerca de dezessete bilhões de reais em dívidas à Justiça, e fechou quase trezentas lojas.",
  sub:"Só a Casas Bahia levou cerca de *R$ 17 bilhões* em dívidas à Justiça, e fechou *quase 300 lojas.*",
  src:"Fonte: g1, 28/08/2026 (valores informados no pedido).",
  html:`<div class="gridbg"></div><div class="glow" style="background:#ef4444;top:-300px;left:-300px"></div>
  <div class="z" style="margin-top:120px;text-align:center"><div class="h soft in" style="font-size:44px">Dívidas no pedido</div>
  <div class="h" style="font-family:Anton;font-weight:400;font-size:230px;margin-top:10px;color:#fff" data-to="17.3" data-dec="1" data-pre="R$ " data-dur="1.6">R$ 0</div>
  <div class="h red in d4" style="font-size:72px">bilhões</div>
  <div class="card in d10" style="margin:70px auto 0;width:760px;font-size:44px;font-weight:700">≈ <span class="hl">300 lojas</span> fechadas</div></div>`},
 {say:"Os motivos se repetem: juros altos, crédito restrito e consumo fraco.",
  sub:"Os motivos se repetem: *juros altos,* *crédito restrito* e *consumo fraco.*",
  src:"Fonte: g1, 28/08/2026.",
  html:`<div class="kb" style="background-image:url(${B('calculadora.jpg')})"></div><div class="ov"></div>
  <h1 class="z in" style="font-size:80px;margin-top:80px">Os motivos <span class="hl">se repetem</span></h1>
  <div class="z" style="margin-top:50px;display:flex;flex-direction:column;gap:24px">
   ${[['📈','Juros altos','d6'],['🏦','Crédito restrito','d10'],['🛒','Consumo mais fraco','d12']].map(([e,t,d])=>`<div class="card pop ${d}" style="font-size:54px;font-weight:800;display:flex;gap:24px;align-items:center"><span>${e}</span>${t}</div>`).join('')}
  </div>`},
 {say:"Em 2025, foram duas mil, quatrocentas e sessenta e seis empresas em recuperação judicial no Brasil. Recorde.",
  sub:"Em 2025, foram *2.466 empresas* em recuperação judicial no Brasil. *Recorde.*",
  src:"Fonte: Serasa Experian (recuperações judiciais 2025).",
  html:`<div class="gridbg"></div><div class="glow" style="background:#fcc419;bottom:-200px;right:-400px;opacity:.2"></div>
  <div class="z" style="margin-top:80px;text-align:center"><span class="tag gold in">● Brasil · 2025</span>
  <div style="font-family:Anton;font-size:300px;line-height:1.05;margin-top:30px" data-to="2466" data-delay="0.6" data-dur="1.8">0</div>
  <div class="h in d4" style="font-size:56px">empresas em recuperação judicial</div>
  <div class="tag pop d16" style="margin-top:50px;font-size:40px">Recorde da série</div></div>`},
 {say:"Se as grandes estão renegociando dívidas, o pequeno comércio precisa de um plano para o caixa.",
  sub:"Se as grandes estão renegociando dívidas, o *pequeno comércio* precisa de um *plano para o caixa.*",
  src:"Imagem ilustrativa.",
  html:`<div class="kb" style="background-image:url(${B('restaurante.jpg')});background-position:center 30%"></div><div class="ov" style="background:linear-gradient(180deg,rgba(5,8,15,.7) 0%,rgba(5,8,15,.1) 30%,rgba(5,8,15,.35) 55%,rgba(5,8,15,.92) 75%)"></div>
  <h1 class="z in d2" style="font-size:78px;margin-top:40px">O pequeno comércio precisa de <span class="hl">um plano.</span></h1>`},
 {say:"Faça o diagnóstico gratuito de um minuto e veja o plano de trinta dias para o seu ramo.",
  sub:"Faça o *diagnóstico gratuito* de 1 minuto e veja o *plano de 30 dias* para o seu ramo.",
  src:"Conteúdo educativo. Dados: Serasa Experian e g1.",
  html:`<div class="gridbg"></div><div class="glow" style="background:#22c55e;top:-200px;left:-300px;opacity:.22"></div>
  <div class="z" style="margin-top:70px;text-align:center"><span class="tag gold in">● Gratuito · 1 minuto</span>
  <h1 class="in d1" style="font-size:86px;margin-top:36px">Diagnóstico para <span class="hl">2027</span></h1>
  <div class="card in d3" style="margin-top:46px;text-align:left;font-size:42px;font-weight:700;line-height:1.6">✅ Risco do seu ramo<br>✅ O que muda no caixa e no preço<br>✅ Plano de 30 dias</div>
  <div class="pop d8" style="margin-top:46px;background:#22c55e;color:#04130a;font-family:Montserrat;font-weight:900;font-size:50px;padding:32px;border-radius:24px">Fazer o diagnóstico →</div></div>`}
 ]};
