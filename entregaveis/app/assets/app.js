/* Painel de Blindagem — app (sem servidor; dados ficam só neste aparelho) */
(function(){
"use strict";
var KEY="nve_painel_v1";
var S=load();
function load(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
S.acessos=S.acessos||{};S.perfil=S.perfil||null;
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var app=$("#app");
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
var BRL=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL",maximumFractionDigits:0});
var BRL2=new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"});
function brl(v,d){if(!isFinite(v))return "—";return (d?BRL2:BRL).format(v)}
function pct(v,d){if(!isFinite(v))return "—";return (v*100).toLocaleString("pt-BR",{maximumFractionDigits:d==null?1:d})+"%"}
function num(s){if(typeof s==="number")return s;s=String(s||"").trim().replace(/[R$\s%]/g,"");if(!s)return 0;
  if(s.indexOf(",")>-1){s=s.replace(/\./g,"").replace(",",".")}else if((s.match(/\./g)||[]).length>1){s=s.replace(/\./g,"")}else if(/^\d{1,3}\.\d{3}$/.test(s)){s=s.replace(".","")}
  var n=parseFloat(s);return isFinite(n)?n:0}
function fmtIn(v){if(v===""||v==null)return "";return String(v).replace(".",",")}
function toast(t){var el=$("#toast");el.textContent=t;el.classList.add("on");clearTimeout(toast._t);toast._t=setTimeout(function(){el.classList.remove("on")},2200)}
function today(){var d=new Date();d.setHours(0,0,0,0);return d}
function iso(d){return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0")}
function parseISO(s){var p=s.split("-");return new Date(+p[0],+p[1]-1,+p[2])}
function dias(a,b){return Math.round((b-a)/864e5)}
function nicho(){return (S.perfil&&S.perfil.nicho)||"A"}
function pick(o){return o&&typeof o==="object"&&!Array.isArray(o)?(o[nicho()]||o.A):o}
function has(p){if(S.acessos[p])return true;for(var k in S.acessos){var pr=NVE.produtos[k];if(pr&&pr.inclui&&pr.inclui.indexOf(p)>-1)return true}return false}
function copy(t){if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(function(){toast("Copiado!")},fallback)}else fallback();function fallback(){var ta=document.createElement("textarea");ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand("copy");toast("Copiado!")}catch(e){toast("Não foi possível copiar")}ta.remove()}}

/* ---------- acesso por link (SHA-256 do código) ---------- */
function sha256(t){var b=new TextEncoder().encode(t);return crypto.subtle.digest("SHA-256",b).then(function(h){return Array.prototype.map.call(new Uint8Array(h),function(x){return x.toString(16).padStart(2,"0")}).join("")})}
function tryCode(code){code=String(code||"").trim();var m=code.match(/[?&]k=([^&#\s]+)/);if(m)code=decodeURIComponent(m[1]);
  var codes=code.split(",").map(function(c){return c.replace(/[^a-z0-9-]/gi,"").toLowerCase()}).filter(Boolean);
  if(!codes.length)return Promise.resolve(null);
  return Promise.all(codes.map(function(c){return sha256(c).then(function(h){for(var p in NVE.produtos){if(NVE.produtos[p].hash===h){S.acessos[p]=c;return p}}return null})})).then(function(r){save();var ok=r.filter(Boolean);return ok.length?ok[0]:null})}
function readUrl(){var q=new URLSearchParams(location.search);var k=q.get("k"),ed=(q.get("ed")||"").toUpperCase();
  var job=k?tryCode(k):Promise.resolve(null);
  return job.then(function(ok){
    if(ed&&NVE.nichos[ed]){S.edicao=ed;save()}
    if(k){history.replaceState(null,"",location.pathname+location.hash);if(ok)toast("Acesso liberado!");}
  })}
function anyAccess(){return Object.keys(S.acessos).length>0}

/* ---------- roteamento ---------- */
var routes={},after={};
function go(h){location.hash=h}
function render(){
  var h=(location.hash||"#/inicio").slice(2).split("/");var r=h[0]||"inicio";
  if(!anyAccess()){r="acesso"}
  else if(!S.perfil&&r!=="perfil"){r="perfil"}
  if(r==="acesso"&&anyAccess())r="inicio";
  var fn=routes[r]||routes.inicio;if(!routes[r])r="inicio";
  window.scrollTo(0,0);
  app.innerHTML=fn(h.slice(1))||"";
  var navOn={inicio:"inicio",plano:"plano",ferramentas:"ferramentas",folego:"ferramentas",preco:"ferramentas",recebiveis:"ferramentas",dividas:"ferramentas",linha:"ferramentas",checklist:"ferramentas",contador:"ferramentas",diagnostico:"inicio",resultado:"inicio",aulas:"aulas",aula:"aulas",biblioteca:"biblioteca",relatorio:"biblioteca"}[r];
  $$(".nav a").forEach(function(a){a.classList.toggle("on",a.dataset.r===navOn)});
  $(".nav").classList.toggle("hidden",r==="acesso"||(r==="perfil"&&!S.perfil));
  var chip=$("#chip");if(S.perfil){chip.textContent=NVE.nichos[nicho()].emoji+" "+NVE.nichos[nicho()].curto;chip.classList.remove("hidden")}else chip.classList.add("hidden");
  if(after[r])after[r](h.slice(1));
}
window.addEventListener("hashchange",render);

/* ---------- tela de acesso ---------- */
routes.acesso=function(){return '<div class="gate"><div class="hero-ic">N</div><span class="eyebrow">Área do cliente</span><h1>Painel de Blindagem 2027–2030</h1>'+
 '<p class="soft">O app do Kit Não Vire Estatística: diagnóstico, calculadoras, plano de 90 dias e todos os seus materiais.</p>'+
 '<div class="card"><h3>Entre com o seu link de acesso</h3><p class="small muted">Você recebeu o link no e-mail da compra. Toque nele ou cole aqui o link inteiro (ou só o código).</p>'+
 '<label class="f"><span>Link ou código de acesso</span><input id="code" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Cole aqui o link do e-mail"></label>'+
 '<button class="btn btn-cta" id="enter">Entrar no painel</button><p id="err" class="small red hidden" style="margin-top:10px">Código não reconhecido. Confira se copiou o link inteiro do e-mail de compra.</p></div>'+
 '<p class="small muted center">Não encontrou o e-mail? Procure por "Cakto" na caixa de entrada, no spam e em Promoções. Se precisar, responda o e-mail de compra pedindo o link de novo.</p>'+
 '<p class="foot">Conteúdo educativo. Não substitui o seu contador ou advogado.</p></div>'};
after.acesso=function(){$("#enter").onclick=function(){tryCode($("#code").value).then(function(p){if(p){toast("Acesso liberado!");location.hash="#/inicio";render()}else $("#err").classList.remove("hidden")})}};

/* ---------- perfil / onboarding ---------- */
routes.perfil=function(){var p=S.perfil||{nicho:S.edicao||"A",regime:"simples",vende:"pf"};
 var nOpts=Object.keys(NVE.nichos).map(function(k){return '<option value="'+k+'"'+(p.nicho===k?" selected":"")+'>'+NVE.nichos[k].nome+'</option>'}).join("");
 var rOpts=Object.keys(NVE.regimes).map(function(k){return '<option value="'+k+'"'+(p.regime===k?" selected":"")+'>'+NVE.regimes[k]+'</option>'}).join("");
 return (S.perfil?'<a class="back" href="#/biblioteca">← Voltar</a>':'<span class="eyebrow">Bem-vindo(a)</span>')+'<h1>'+(S.perfil?"Seu perfil":"Vamos montar o seu painel")+'</h1><p class="soft">Leva 30 segundos. Com isso o diagnóstico, o plano e as calculadoras ficam do jeito do seu negócio.</p>'+
 '<div class="card"><label class="f"><span>Nome da empresa</span><input id="pf-emp" value="'+esc(p.empresa||"")+'" placeholder="Ex.: Mercado Bom Preço"></label>'+
 '<label class="f"><span>Segmento</span><select id="pf-n">'+nOpts+'</select><small id="pf-ex"></small></label>'+
 '<label class="f"><span>Regime tributário</span><select id="pf-r">'+rOpts+'</select><small>Não sabe? Escolha "Não sei" e pergunte ao contador depois (é a pergunta 2 do roteiro).</small></label>'+
 '<label class="f"><span>Para quem você mais vende?</span><select id="pf-v"><option value="pf"'+(p.vende==="pf"?" selected":"")+'>Consumidor final (pessoa física)</option><option value="pj"'+(p.vende==="pj"?" selected":"")+'>Outras empresas</option><option value="ambos"'+(p.vende==="ambos"?" selected":"")+'>Os dois</option></select></label>'+
 '<label class="f"><span>Faturamento médio por mês</span><div class="pref"><i>R$</i><input id="pf-f" inputmode="decimal" value="'+fmtIn(p.fat||"")+'" placeholder="Ex.: 40.000"></div><small>Opcional. Usado para sugerir valores nas calculadoras.</small></label>'+
 '<button class="btn btn-cta" id="pf-ok">'+(S.perfil?"Salvar":"Começar")+'</button></div>'};
after.perfil=function(){var ex=function(){$("#pf-ex").textContent="Ex.: "+NVE.nichos[$("#pf-n").value].exemplos};ex();$("#pf-n").onchange=ex;
 $("#pf-ok").onclick=function(){var first=!S.perfil;S.perfil={empresa:$("#pf-emp").value.trim(),nicho:$("#pf-n").value,regime:$("#pf-r").value,vende:$("#pf-v").value,fat:num($("#pf-f").value)};
  if(!S.plano)S.plano={inicio:iso(today()),feito:{}};save();toast("Perfil salvo");location.hash=first?"#/diagnostico":"#/inicio";render()}};

/* ---------- início ---------- */
function lastDiag(){var h=S.diag&&S.diag.hist;return h&&h.length?h[h.length-1]:null}
function nextEvent(){var t=today();for(var i=0;i<NVE.linha.length;i++){var d=parseISO(NVE.linha[i].d);if(d>=t)return {ev:NVE.linha[i],dias:dias(t,d)}}return null}
function planoInfo(){if(!S.plano)S.plano={inicio:iso(today()),feito:{}};var di=dias(parseISO(S.plano.inicio),today())+1;var tot=NVE.plano30.length+NVE.planoSemanas.length;var feitos=Object.keys(S.plano.feito).filter(function(k){return S.plano.feito[k]}).length;return {dia:Math.max(1,di),pct:Math.min(1,feitos/tot),feitos:feitos,tot:tot}}
function proxTarefa(){for(var i=0;i<NVE.plano30.length;i++){var t=NVE.plano30[i];if(!S.plano.feito["d"+t.d])return t}return null}
function txt(o,k){return o[k]!=null?o[k]:pick(o[k+"N"])}
function toolRoute(t){return {folego:"folego",preco:"preco",recebiveis:"recebiveis",dividas:"dividas",contador:"contador",checklist:"checklist",linha:"linha",plano:"plano",diagnostico:"diagnostico",biblioteca:"biblioteca"}[t]||"ferramentas"}
function toolsGrid(){var T=[["diagnostico","🩺","Diagnóstico","Nota 0–100 e suas 3 prioridades"],["folego","⏳","Fôlego do caixa","Quantos meses o caixa aguenta"],["preco","🏷️","Preço 2027","Simule CBS/IBS no seu preço"],["recebiveis","📥","Recebíveis e cobrança","Régua pronta e custo do prazo"],["dividas","🏦","Dívidas x Selic","Qual dívida atacar primeiro"],["linha","🗓️","Linha do tempo","O que muda e quando"],["checklist","✅","Checklist da reforma","O que deixar pronto"],["contador","🧾","Roteiro do contador","12 perguntas + respostas"],["plano","🎯","Plano 90 dias","Uma tarefa por dia"]];
 return '<div class="tools">'+T.map(function(x){return '<a class="tool" href="#/'+x[0]+'"><span class="ic">'+x[1]+'</span><b>'+x[2]+'</b><span>'+x[3]+'</span></a>'}).join("")+'</div>'}
routes.inicio=function(){var p=S.perfil;var dg=lastDiag();var pi=planoInfo();var ne=nextEvent();var f=S.folegoRes;var t=proxTarefa();
 var out='<span class="eyebrow">'+esc(p.empresa||"Seu negócio")+'</span><h1>Seu painel de blindagem</h1>';
 if(!dg)out+='<div class="card hl"><span class="eyebrow">Passo 1</span><h2>Faça o Diagnóstico de Sobrevivência</h2><p class="soft">20 perguntas, 5 minutos. Você recebe uma nota de 0 a 100 e as 3 prioridades do seu negócio.</p><a class="btn btn-cta" href="#/diagnostico">Começar o diagnóstico</a></div>';
 else{var fx=faixa(dg.nota);out+='<a href="#/resultado" style="text-decoration:none;color:inherit"><div class="card"><div class="score"><div class="ring" style="--p:'+dg.nota+';--c:'+fx.cor+'"><div><span><b>'+dg.nota+'</b><small>de 100</small></span></div></div><div><span class="eyebrow">Nota de sobrevivência</span><h3 style="color:'+fx.cor+'">'+fx.nome+'</h3><p class="small muted" style="margin:0">Feito em '+dg.data+'. Toque para ver as prioridades.</p></div></div></div></a>'}
 out+='<div class="grid2"><a href="#/folego" class="card" style="text-decoration:none;color:inherit;margin:0"><span class="eyebrow">Fôlego do caixa</span>'+(f?'<div class="big" style="color:'+(f.cor)+'">'+f.label+'</div><p class="xs muted" style="margin:4px 0 0">com vendas '+f.queda+'% menores</p>':'<p class="small soft" style="margin:0">Quantos meses o seu caixa aguenta? <b class="gold">Calcular →</b></p>')+'</a>'+
  '<a href="#/plano" class="card" style="text-decoration:none;color:inherit;margin:0"><span class="eyebrow">Plano 90 dias</span><div class="big">'+Math.round(pi.pct*100)+'%</div><div class="prog g" style="margin-top:8px"><i style="width:'+(pi.pct*100)+'%"></i></div><p class="xs muted" style="margin:6px 0 0">Dia '+Math.min(pi.dia,91)+' do plano</p></a></div><div style="height:14px"></div>';
 if(t)out+='<div class="card"><span class="eyebrow">Sua próxima tarefa · Dia '+t.d+'</span><h3>'+esc(txt(t,"t"))+'</h3><p class="soft small">'+esc(txt(t,"c"))+'</p><div class="row"><a class="btn btn-2 btn-sm" href="#/'+toolRoute(t.tool)+'">Abrir ferramenta</a><button class="btn btn-cta btn-sm" data-done="d'+t.d+'">Marcar como feita ✓</button></div></div>';
 if(ne)out+='<a href="#/linha" style="text-decoration:none;color:inherit"><div class="card"><span class="eyebrow">Próxima data da reforma</span><h3>'+esc(ne.ev.t)+'</h3><p class="small soft" style="margin:0"><b class="gold">'+ne.ev.data+'</b> · '+(ne.dias===0?"é hoje":"faltam "+ne.dias+" dias")+'. '+esc(pick(ne.ev.acao))+'</p></div></a>';
 out+='<h2 style="margin-top:8px">Ferramentas</h2>'+toolsGrid();
 return out};
after.inicio=function(){$$("[data-done]").forEach(function(b){b.onclick=function(){S.plano.feito[b.dataset.done]=true;save();toast("Boa! Tarefa concluída.");render()}})};
routes.ferramentas=function(){return '<h1>Ferramentas</h1><p class="soft">Tudo calcula na hora e fica salvo só neste aparelho.</p>'+toolsGrid()+'<div style="height:16px"></div><div class="alert i">Os resultados são estimativas educativas para ajudar você a decidir. Confirme números de imposto com o seu contador.</div>'};

/* ---------- diagnóstico ---------- */
function qText(q){return q.t||q.tN[nicho()]}function qOpts(q){return q.o||q.oN[nicho()]}function qAcao(q){return q.acao||q.acaoN[nicho()]}
function faixa(n){for(var i=0;i<NVE.faixas.length;i++){if(n>=NVE.faixas[i].min&&n<=NVE.faixas[i].max)return NVE.faixas[i]}return NVE.faixas[0]}
var dq={i:0,r:{}};
var ESC={caixa:"do Caixa",margem:"da Margem",fiscal:"Fiscal"};
routes.diagnostico=function(){if(dq.i>=NVE.perguntas.length)dq.i=0;var q=NVE.perguntas[dq.i];var sel=dq.r[q.id];
 return '<a class="back" href="#/inicio">← Sair</a><div class="row" style="align-items:center;margin-bottom:8px"><span><span class="pill '+q.escudo+'">Escudo '+ESC[q.escudo]+'</span></span><span class="small muted" style="text-align:right">'+(dq.i+1)+' de '+NVE.perguntas.length+'</span></div>'+
 '<div class="prog"><i style="width:'+((dq.i)/NVE.perguntas.length*100)+'%"></i></div><div class="card" style="margin-top:16px"><h2>'+esc(qText(q))+'</h2><div class="opts">'+
 qOpts(q).map(function(o,ix){return '<button class="opt'+(sel===ix?" sel":"")+'" data-ix="'+ix+'">'+esc(o[0])+'</button>'}).join("")+'</div></div>'+
 (dq.i>0?'<button class="btn btn-2" id="dq-back">← Pergunta anterior</button>':'')};
after.diagnostico=function(){$$(".opt").forEach(function(b){b.onclick=function(){var q=NVE.perguntas[dq.i];dq.r[q.id]=+b.dataset.ix;$$(".opt").forEach(function(x){x.classList.remove("sel")});b.classList.add("sel");
  setTimeout(function(){if(dq.i<NVE.perguntas.length-1){dq.i++;render()}else finishDiag()},220)}});var bk=$("#dq-back");if(bk)bk.onclick=function(){dq.i--;render()}};
function finishDiag(){var sc={caixa:[0,0],margem:[0,0],fiscal:[0,0]},tot=0,items=[];
 NVE.perguntas.forEach(function(q,ix){var o=qOpts(q)[dq.r[q.id]];var pts=o?o[1]:0;tot+=pts;sc[q.escudo][0]+=pts;sc[q.escudo][1]+=5;items.push({id:q.id,pts:pts,ix:ix})});
 items.sort(function(a,b){return a.pts-b.pts||a.ix-b.ix});
 var pri=items.slice(0,3).map(function(x){return x.id});
 var reg={data:new Date().toLocaleDateString("pt-BR"),iso:iso(today()),nota:tot,caixa:Math.round(sc.caixa[0]/sc.caixa[1]*100),margem:Math.round(sc.margem[0]/sc.margem[1]*100),fiscal:Math.round(sc.fiscal[0]/sc.fiscal[1]*100),pri:pri,resp:dq.r};
 S.diag=S.diag||{hist:[]};var h=S.diag.hist;if(h.length&&h[h.length-1].iso===reg.iso)h[h.length-1]=reg;else h.push(reg);save();dq={i:0,r:{}};
 if(location.hash==="#/resultado")render();else location.hash="#/resultado"}
function priHtml(d){return d.pri.map(function(id,i){var q=NVE.perguntas.filter(function(x){return x.id===id})[0];var k="p_"+d.iso+"_"+id;var done=S.priFeito&&S.priFeito[k];
  return '<div class="chk'+(done?" done":"")+'"><input type="checkbox" data-pri="'+k+'"'+(done?" checked":"")+'><div class="tx"><b>'+(i+1)+'. '+esc(qAcao(q))+'</b><div class="meta"><span class="pill '+q.escudo+'">Escudo '+ESC[q.escudo]+'</span><a class="lnk" href="#/'+toolRoute(q.tool)+'">Abrir ferramenta →</a></div></div></div>'}).join("")}
function bindPri(){$$("[data-pri]").forEach(function(c){c.onchange=function(){S.priFeito=S.priFeito||{};S.priFeito[c.dataset.pri]=c.checked;save();c.closest(".chk").classList.toggle("done",c.checked)}})}
routes.resultado=function(){var d=lastDiag();if(!d){location.hash="#/diagnostico";return ""}var fx=faixa(d.nota);
 var hist=S.diag.hist.slice(-6).map(function(x){return '<tr><td>'+x.data+'</td><td class="n"><b>'+x.nota+'</b></td><td class="n">'+x.caixa+'</td><td class="n">'+x.margem+'</td><td class="n">'+x.fiscal+'</td></tr>'}).join("");
 return '<a class="back" href="#/inicio">← Início</a><span class="eyebrow">Diagnóstico de Sobrevivência</span><div class="card"><div class="score"><div class="ring" style="--p:'+d.nota+';--c:'+fx.cor+'"><div><span><b>'+d.nota+'</b><small>de 100</small></span></div></div><div><h2 style="color:'+fx.cor+'">'+fx.nome+'</h2><p class="small soft" style="margin:0">'+fx.texto+'</p></div></div>'+
 '<div class="bars" style="margin-top:16px">'+[["Escudo do Caixa",d.caixa],["Escudo da Margem",d.margem],["Escudo Fiscal",d.fiscal]].map(function(b){return '<div><div class="barl"><span>'+b[0]+'</span><span>'+b[1]+'%</span></div><div class="prog"><i style="width:'+b[1]+'%;background:'+(b[1]<40?"var(--red)":b[1]<70?"var(--yellow)":"var(--green)")+'"></i></div></div>'}).join("")+'</div></div>'+
 '<div class="card hl"><span class="eyebrow">Suas 3 prioridades</span><p class="small muted">São os pontos com menor nota. Resolva estes primeiro: eles também aparecem no seu plano.</p>'+priHtml(d)+'</div>'+
 '<div class="card"><h3>Nota mês a mês</h3><div class="tw"><table class="t"><tr><th>Data</th><th class="n">Nota</th><th class="n">Caixa</th><th class="n">Margem</th><th class="n">Fiscal</th></tr>'+hist+'</table></div><p class="xs muted" style="margin-top:8px">Refaça o diagnóstico 1 vez por mês para acompanhar a evolução.</p></div>'+
 '<a class="btn btn-cta" href="#/plano">Ver meu plano de 90 dias</a><div style="height:10px"></div><button class="btn btn-2" id="redo">Refazer o diagnóstico</button>'};
after.resultado=function(){bindPri();var r=$("#redo");if(r)r.onclick=function(){dq={i:0,r:{}};location.hash="#/diagnostico"}};

/* ---------- campos helper ---------- */
function fld(id,label,val,o){o=o||{};var inner='<input id="'+id+'" inputmode="decimal" value="'+esc(fmtIn(val))+'"'+(o.ph?' placeholder="'+o.ph+'"':'')+'>';
 if(o.pre)inner='<div class="pref"><i>'+o.pre+'</i>'+inner+'</div>';if(o.suf)inner='<div class="suf">'+inner+'<i>'+o.suf+'</i></div>';
 return '<label class="f"><span>'+label+'</span>'+inner+(o.help?'<small>'+o.help+'</small>':'')+'</label>'}
function bindAll(ids,store,fn){ids.forEach(function(id){var el=$("#"+id);if(!el)return;var ev=el.tagName==="SELECT"?"change":"input";el.addEventListener(ev,function(){S[store]=S[store]||{};S[store][id]=el.value;save();fn()})});fn()}
function v(id){var el=$("#"+id);return el?num(el.value):0}
function sv(store,id,def){return S[store]&&S[store][id]!=null&&S[store][id]!==""?S[store][id]:def}

/* ---------- fôlego ---------- */
routes.folego=function(){var fat=(S.perfil&&S.perfil.fat)||"";var st="fol";
 return '<a class="back" href="#/ferramentas">← Ferramentas</a><span class="eyebrow">Escudo do Caixa</span><h1>Fôlego do caixa</h1><p class="soft">Quantos meses o seu negócio aguenta se as vendas caírem? Preencha com os números de um mês típico.</p>'+
 '<div class="card">'+fld("f-caixa","Dinheiro disponível hoje (contas + aplicações que você saca rápido)",sv(st,"f-caixa",""),{pre:"R$",ph:"Ex.: 25.000"})+
 fld("f-rec","A receber nos próximos 30 dias",sv(st,"f-rec",""),{pre:"R$",ph:"Ex.: 12.000"})+
 fld("f-inad","Quanto disso costuma atrasar ou não entrar",sv(st,"f-inad","5"),{suf:"%"})+
 fld("f-fat","Faturamento médio por mês",sv(st,"f-fat",fat),{pre:"R$",ph:"Ex.: 40.000"})+
 fld("f-cv","Custos que sobem com a venda (mercadoria, insumos, comissão, taxas, imposto)",sv(st,"f-cv",nicho()==="B"?"35":"60"),{suf:"%",help:"Em % do faturamento. Comércio costuma ficar entre 55% e 75%; serviços entre 20% e 45%. Use o seu número se souber."})+
 fld("f-cf","Custos fixos do mês (folha, pró-labore, aluguel, contas, sistemas)",sv(st,"f-cf",""),{pre:"R$",ph:"Ex.: 14.000"})+
 fld("f-div","Parcelas de empréstimos e dívidas por mês",sv(st,"f-div","0"),{pre:"R$"})+
 '<label class="f"><span>Cenário: e se as vendas caírem <b id="f-qv" class="gold"></b>?</span><input type="range" id="f-q" min="0" max="60" step="5" value="'+sv(st,"f-q","20")+'"></label></div>'+
 '<div id="f-out"></div>'};
after.folego=function(){bindAll(["f-caixa","f-rec","f-inad","f-fat","f-cv","f-cf","f-div","f-q"],"fol",calcFolego)};
function folegoCalc(i){var mc=1-i.cv/100;var liq=i.caixa+i.rec*(1-i.inad/100);var fixo=i.cf+i.div;
 var resN=i.fat*mc-fixo;var resS=i.fat*(1-i.q/100)*mc-fixo;var meses=resS>=0?Infinity:liq/(-resS);var zero=fixo>0?liq/fixo:Infinity;
 var pe=mc>0?fixo/mc:Infinity;return {mc:mc,liq:liq,fixo:fixo,resN:resN,resS:resS,meses:meses,zero:zero,pe:pe}}
function mesesLabel(m){return m===Infinity?"Estável":(m<1?Math.max(0,Math.round(m*30))+" dias":m.toLocaleString("pt-BR",{maximumFractionDigits:1})+" meses")}
function calcFolego(){var i={caixa:v("f-caixa"),rec:v("f-rec"),inad:v("f-inad"),fat:v("f-fat"),cv:v("f-cv"),cf:v("f-cf"),div:v("f-div"),q:+$("#f-q").value};$("#f-qv").textContent=i.q+"%";
 var o=$("#f-out");if(!i.fat||!i.cf){o.innerHTML='<div class="alert i">Preencha pelo menos o faturamento e os custos fixos para ver o resultado.</div>';return}
 var r=folegoCalc(i);var cor=r.meses<1?"var(--red)":r.meses<3?"var(--yellow)":"var(--green)";var label=mesesLabel(r.meses);
 S.folegoRes={label:label,cor:r.meses<1?"#f87171":r.meses<3?"#fcc419":"#4ade80",queda:i.q,meses:r.meses===Infinity?99:r.meses};save();
 var wk=[],saldo=r.liq;for(var w=1;w<=13;w++){saldo+=r.resS/4.33;wk.push(saldo)}
 var mx=Math.max.apply(null,wk.map(Math.abs))||1;
 var bars='<div class="wk">'+wk.map(function(s){return '<div class="'+(s<0?"neg":"")+'" style="height:'+Math.max(2,Math.abs(s)/mx*100)+'%" title="'+brl(s)+'"></div>'}).join("")+'</div><div class="wkl">'+wk.map(function(s,ix){return "<span>"+(ix+1)+"</span>"}).join("")+'</div><p class="xs muted" style="margin-top:6px">Saldo previsto por semana (1 a 13) no cenário escolhido. Vermelho = saldo negativo.</p>';
 var msg=r.meses===Infinity?'<div class="alert g">Mesmo com vendas '+i.q+'% menores, a operação ainda fecha no azul ('+brl(r.resS)+' por mês). Use a folga para montar a reserva e pagar dívidas caras.</div>':
  (r.meses<1?'<div class="alert r"><b>Alerta vermelho.</b> Nesse cenário o caixa acaba em cerca de '+label+'. Prioridade total para o Escudo do Caixa: cobre atrasados, corte custos fixos e renegocie dívidas esta semana.</div>':
  r.meses<3?'<div class="alert w"><b>Atenção.</b> Nesse cenário o caixa dura cerca de '+label+'. A meta é chegar a 3 meses: siga as tarefas das semanas 1 e 3 do plano.</div>':'<div class="alert g">Nesse cenário o caixa dura cerca de '+label+'. Bom fôlego: mantenha a reserva e use o tempo para se preparar para 2027.</div>');
 var dutil=nicho()==="A"?26:22;
 o.innerHTML='<div class="card"><span class="eyebrow">Resultado</span><div class="big" style="color:'+cor+'">'+label+'</div><p class="small muted">de fôlego com vendas '+i.q+'% menores</p>'+msg+
  '<div class="kpis"><div class="kpi"><small>Resultado do mês hoje</small><b class="'+(r.resN<0?"red":"green")+'">'+brl(r.resN)+'</b></div><div class="kpi"><small>Com vendas −'+i.q+'%</small><b class="'+(r.resS<0?"red":"green")+'">'+brl(r.resS)+'</b></div>'+
  '<div class="kpi"><small>Ponto de equilíbrio (vender por mês)</small><b>'+brl(r.pe)+'</b></div><div class="kpi"><small>Meta diária ('+dutil+' dias)</small><b>'+brl(r.pe/dutil)+'</b></div>'+
  '<div class="kpi"><small>Se as vendas parassem</small><b>'+mesesLabel(r.zero)+'</b></div><div class="kpi"><small>Reserva mínima (1 mês) / ideal (3)</small><b>'+brl(r.fixo)+' / '+brl(r.fixo*3)+'</b></div></div>'+bars+
  '</div><div class="card"><h3>Como aumentar o fôlego</h3><ol class="soft small" style="padding-left:18px;margin:0"><li>Cobrar atrasados com a <a href="#/recebiveis">régua de cobrança</a>.</li><li>Cortar custos fixos: cada R$ 1.000 a menos por mês reduz em '+brl(1000/r.mc)+' o quanto você precisa vender para empatar.</li><li>Renegociar a <a href="#/dividas">dívida mais cara</a>.</li><li>Separar '+(r.resN>0?brl(Math.min(r.resN*0.3,r.fixo/3)):"3% das vendas")+' por mês para a reserva.</li></ol></div>'}

/* ---------- preço 2027 ---------- */
routes.preco=function(){var st="pre";var reg=(S.perfil&&S.perfil.regime)||"simples";
 var defTx={simples:"8",mei:"0",presumido:"14",real:"18",naosei:"12"}[reg];var defP={presumido:"3,65",real:"9,25"}[reg]||"3,65";
 return '<a class="back" href="#/ferramentas">← Ferramentas</a><span class="eyebrow">Escudo da Margem</span><h1>Preço 2027</h1><p class="soft">Simule o efeito da CBS/IBS no preço de um produto ou serviço e descubra quanto cobrar para manter o seu lucro.</p>'+
 '<div class="alert w"><b>Estimativa.</b> A alíquota oficial da CBS para 2027 será fixada pelo Senado até 15/12/2026. Os padrões abaixo usam a estimativa não oficial do Comitê Gestor (CBS 9,21% + IBS 18,7%). Confirme com o seu contador.</div>'+
 '<div class="card"><label class="f"><span>Como a sua empresa vai pagar IBS/CBS?</span><select id="p-modo"><option value="simples">Simples Nacional "por dentro" (padrão do Simples)</option><option value="regular">Regime regular (Lucro Presumido/Real ou Simples híbrido)</option></select></label>'+
 '<label class="f"><span>Item</span><input id="p-nome" value="'+esc(sv(st,"p-nome",""))+'" placeholder="Ex.: Marmita executiva" inputmode="text"></label>'+
 fld("p-p0","Preço de venda hoje",sv(st,"p-p0","100"),{pre:"R$"})+
 fld("p-c","Custo direto por unidade (o que você paga ao fornecedor/insumo)",sv(st,"p-c","50"),{pre:"R$"})+
 fld("p-tx","Impostos sobre a venda hoje (soma, em % do preço)",sv(st,"p-tx",defTx),{suf:"%",help:"Simples: a sua alíquota efetiva do DAS. Presumido/Real: PIS/Cofins + ICMS ou ISS. Pergunte ao contador (pergunta 1 do roteiro)."})+
 fld("p-ov","Outros custos sobre a venda (cartão, app, comissão)",sv(st,"p-ov","4"),{suf:"%"})+
 '<div id="p-reg">'+
 fld("p-pis","Desse imposto de hoje, quanto é PIS/Cofins",sv(st,"p-pis",defP),{suf:"%",help:"Presumido: 3,65%. Real: 9,25% (com créditos). É a parte que vira CBS em 2027."})+
 fld("p-cr0","Crédito de PIS/Cofins que você já aproveita hoje nas compras",sv(st,"p-cr0",reg==="real"?"9,25":"0"),{suf:"%",help:"Em % do custo. Presumido: 0. Real: em geral 9,25% das compras com crédito."})+
 fld("p-cri","Crédito de ICMS que você aproveita hoje nas compras",sv(st,"p-cri","0"),{suf:"%",help:"Em % do custo. Comércio e indústria no regime normal de ICMS costumam ter. Serviços e Simples: 0."})+
 fld("p-sr","Quanto das suas compras vem de empresas que vão gerar crédito cheio (regime regular)",sv(st,"p-sr","70"),{suf:"%",help:"Compras de MEI, Simples por dentro ou pessoa física geram pouco ou nenhum crédito."})+
 '<label class="f"><span>Seu item tem redução de alíquota?</span><select id="p-red"><option value="0">Não (alíquota cheia)</option><option value="0.3">Redução de 30% (algumas profissões regulamentadas)</option><option value="0.6">Redução de 60% (saúde, educação, alimentos e itens listados)</option><option value="1">Alíquota zero (cesta básica nacional e itens listados)</option></select></label>'+
 '<details><summary>Ajustar alíquotas estimadas</summary>'+fld("p-cbs","CBS (estimativa)",sv(st,"p-cbs","9,21"),{suf:"%"})+fld("p-ibs","IBS no modelo final (estimativa)",sv(st,"p-ibs","18,7"),{suf:"%"})+'</details>'+
 '</div><div id="p-simp">'+fld("p-das","Parte de IBS/CBS dentro do seu DAS (para o cliente empresa)",sv(st,"p-das","3"),{suf:"%",help:"Em % da venda. Peça ao contador. É o crédito que o seu cliente empresa poderá aproveitar se você ficar \"por dentro\"."})+'</div></div>'+
 '<div id="p-out"></div>'};
after.preco=function(){var st=S.pre||{};var reg=(S.perfil&&S.perfil.regime)||"simples";$("#p-modo").value=st["p-modo"]||((reg==="simples"||reg==="mei"||reg==="naosei")?"simples":"regular");$("#p-red").value=st["p-red"]||"0";
 $("#p-nome").addEventListener("input",function(){S.pre=S.pre||{};S.pre["p-nome"]=this.value;save()});
 bindAll(["p-modo","p-p0","p-c","p-tx","p-ov","p-pis","p-cr0","p-cri","p-sr","p-red","p-cbs","p-ibs","p-das"],"pre",calcPreco)};
function precoCalc(i){
 var lucro0=i.p0*(1-i.tx-i.ov)-i.c+i.c*(i.cr0+(i.cri||0))*i.sr;
 var c27=i.cbs*(1-i.red)+(i.red<1?0.001:0);var outros=Math.max(0,i.tx-i.pis);
 var cred27=i.c*i.sr*(i.cbs/(1+i.cbs+outros))+i.c*i.sr*(i.cri||0);
 var kA=(1+c27)*(1-outros-i.ov)-c27;
 var L27same=i.p0/(1+c27);var lucro27same=L27same*kA+cred27-i.c;
 var L27=(lucro0+i.c-cred27)/kA;var P27=L27*(1+c27);
 var t=(i.cbs+i.ibs)*(1-i.red);var tf=i.cbs+i.ibs;var cred33=i.c*i.sr*(tf/(1+tf));
 var kB=1-i.ov*(1+t);var L33same=i.p0/(1+t);var lucro33same=L33same-i.ov*i.p0-i.c+cred33;
 var L33=(lucro0+i.c-cred33)/kB;var P33=L33*(1+t);
 return {lucro0:lucro0,c27:c27,P27:P27,lucro27same:lucro27same,t:t,P33:P33,lucro33same:lucro33same,cred27:cred27,cred33:cred33}}
function calcPreco(){var modo=$("#p-modo").value;$("#p-reg").classList.toggle("hidden",modo!=="regular");$("#p-simp").classList.toggle("hidden",modo!=="simples");
 var i={p0:v("p-p0"),c:v("p-c"),tx:v("p-tx")/100,ov:v("p-ov")/100,pis:v("p-pis")/100,cr0:v("p-cr0")/100,cri:v("p-cri")/100,sr:v("p-sr")/100,red:+$("#p-red").value,cbs:v("p-cbs")/100,ibs:v("p-ibs")/100,das:v("p-das")/100};
 var o=$("#p-out");if(!i.p0){o.innerHTML="";return}
 var lucro0=i.p0*(1-i.tx-i.ov)-i.c+(modo==="regular"?i.c*(i.cr0+i.cri)*i.sr:0);var m0=lucro0/i.p0;
 if(modo==="simples"){var tf=i.cbs+i.ibs;var credH=1000/(1+tf)*tf;var credS=1000*i.das;
  o.innerHTML='<div class="card"><span class="eyebrow">Resultado · Simples por dentro</span><div class="kpis"><div class="kpi"><small>Seu lucro por unidade hoje</small><b class="'+(lucro0<0?"red":"green")+'">'+brl(lucro0,1)+'</b></div><div class="kpi"><small>Margem</small><b>'+pct(m0)+'</b></div></div>'+
  '<p class="soft small">No Simples "por dentro", o seu imposto continua no DAS, pelas tabelas do Simples. A reforma, sozinha, não muda a sua guia. O que muda para você:</p><ul class="soft small" style="padding-left:18px"><li><b>Concorrentes</b> do regime regular podem baixar ou subir preço conforme os créditos que ganham.</li><li><b>Fornecedores</b>: o IPI vai a zero em 2027 (exceto Zona Franca) e começa o Imposto Seletivo (bebidas, cigarro etc.).</li><li><b>Clientes empresa</b>: aproveitam como crédito só a parte de IBS/CBS do seu DAS.</li></ul>'+
  (S.perfil&&S.perfil.vende!=="pf"?'<div class="alert w"><b>Você vende para empresas.</b> A cada R$ 1.000 que um cliente do regime regular compra de você, ele aproveita cerca de <b>'+brl(credS)+'</b> de crédito com você "por dentro", contra cerca de <b>'+brl(credH)+'</b> se você fosse para o híbrido (estimativa). Diferença: '+brl(credH-credS)+'. Leve essa conta ao contador antes da janela de março de 2027.</div>':'<div class="alert g">Você vende principalmente para consumidor final: em geral, ficar "por dentro" tende a ser o caminho mais simples. Confirme com o contador.</div>')+
  (m0<0.15?'<div class="alert r">Margem abaixo de 15%: esse item merece reajuste ou revisão de custo agora, independente da reforma.</div>':'')+'</div>';return}
 var r=precoCalc(i);
 function bloco(tit,P,ls){var d=P/i.p0-1;return '<div class="card"><span class="eyebrow">'+tit+'</span><p class="small muted" style="margin:0">Preço para manter o mesmo lucro de hoje ('+brl(r.lucro0,1)+')</p><div class="big">'+brl(P,1)+'</div><p class="'+(d>0.005?"red":d<-0.005?"green":"soft")+'" style="font-weight:800">'+(d>=0?"+":"")+pct(d)+' em relação ao preço atual</p><div class="kpis"><div class="kpi"><small>Se mantiver o preço de hoje, o lucro vira</small><b class="'+(ls<r.lucro0?"red":"green")+'">'+brl(ls,1)+'</b></div><div class="kpi"><small>Diferença por unidade</small><b>'+brl(ls-r.lucro0,1)+'</b></div></div></div>'}
 o.innerHTML='<div class="card"><span class="eyebrow">Hoje</span><div class="kpis"><div class="kpi"><small>Lucro por unidade</small><b class="'+(lucro0<0?"red":"green")+'">'+brl(lucro0,1)+'</b></div><div class="kpi"><small>Margem</small><b>'+pct(m0)+'</b></div></div></div>'+
 bloco("2027–2028 · CBS no lugar do PIS/Cofins ("+pct(r.c27,2)+" por fora)",r.P27,r.lucro27same)+
 bloco("2033 · modelo completo (IBS + CBS "+pct(r.t,2)+" por fora)",r.P33,r.lucro33same)+
 '<div class="alert i">Como ler: o preço novo já inclui o imposto "por fora". O crédito estimado das suas compras é de '+brl(r.cred27,2)+' (2027, incluindo o ICMS que continua) e '+brl(r.cred33,2)+' (2033) por unidade. Suposições: fornecedores com crédito cobram a alíquota cheia embutida no custo; ICMS/ISS de hoje seguem até 2028. Use para decidir e valide com o contador.</div>'}

/* ---------- recebíveis ---------- */
var CHK_REC=["Tenho a lista de quem me deve, com valor e dias de atraso, atualizada toda semana.","Peço sinal ou entrada em vendas grandes ou sob encomenda.","Consulto CPF/CNPJ antes de vender a prazo para cliente novo.","Tenho limite de crédito por cliente (valor máximo em aberto).","Envio lembrete antes do vencimento (D-3).","Cobro no dia seguinte ao vencimento, sem esperar.","Ofereço desconto para Pix à vista.","Uso boleto/Pix com multa e juros já no documento.","Tenho contrato ou pedido assinado com as condições de pagamento.","Paro de vender a prazo para quem está com atraso.","Sei o custo real de vender parcelado (taxa de cartão + tempo).","Tenho uma pessoa e um horário fixo para cobrar."];
routes.recebiveis=function(){var st="rec";var c=S.recChk||{};var done=CHK_REC.filter(function(x,i){return c[i]}).length;var p=S.perfil||{};
 return '<a class="back" href="#/ferramentas">← Ferramentas</a><span class="eyebrow">Escudo do Caixa</span><h1>Recebíveis e cobrança</h1><p class="soft">Receba o que é seu: régua de cobrança pronta, custo real do prazo e checklist de proteção.</p>'+
 '<div class="card hl"><h2>Régua de cobrança</h2><p class="small muted">Preencha e copie as mensagens prontas (ou abra direto no WhatsApp).</p>'+
 '<label class="f"><span>Nome do cliente</span><input id="r-nome" value="'+esc(sv(st,"r-nome",""))+'" placeholder="Ex.: Carla" inputmode="text"></label>'+
 fld("r-valor","Valor em aberto",sv(st,"r-valor",""),{pre:"R$",ph:"Ex.: 850,00"})+
 '<label class="f"><span>Vencimento</span><input id="r-venc" type="date" value="'+esc(sv(st,"r-venc",iso(today())))+'"></label>'+
 '<label class="f"><span>Sua chave Pix</span><input id="r-pix" value="'+esc(sv(st,"r-pix",""))+'" inputmode="text" placeholder="CNPJ, e-mail ou telefone"></label>'+
 '<label class="f"><span>Assinatura</span><input id="r-emp" value="'+esc(sv(st,"r-emp",p.empresa||""))+'" inputmode="text"></label>'+
 '<label class="f"><span>WhatsApp do cliente (opcional, com DDD)</span><input id="r-tel" value="'+esc(sv(st,"r-tel",""))+'" inputmode="tel" placeholder="Ex.: 11 98888-7777"></label>'+
 '<div id="r-msgs"></div></div>'+
 '<div class="card"><h2>Quanto custa vender a prazo?</h2>'+fld("v-val","Valor da venda",sv(st,"v-val","1000"),{pre:"R$"})+fld("v-n","Número de parcelas (uma a cada 30 dias)",sv(st,"v-n","3"))+fld("v-mdr","Taxa da maquininha/boleto",sv(st,"v-mdr","3,5"),{suf:"%"})+fld("v-i","Custo do dinheiro por mês",sv(st,"v-i","1,08"),{suf:"% a.m.",help:"1,08% ≈ Selic de 13,75% ao ano. Se você antecipa recebíveis ou usa cheque especial, use a taxa que paga (ex.: 2% a 8% ao mês)."})+'<div id="v-out"></div></div>'+
 '<div class="card"><h2>Ciclo financeiro</h2><p class="small muted">Quanto do seu dinheiro fica preso entre pagar e receber.</p>'+fld("c-pmr","Dias para receber dos clientes (média)",sv(st,"c-pmr","30"))+fld("c-pme","Dias que a mercadoria/insumo fica parada (estoque)",sv(st,"c-pme",nicho()==="B"?"0":"45"))+fld("c-pmp","Dias de prazo dos fornecedores",sv(st,"c-pmp","28"))+fld("c-fat","Faturamento médio por mês",sv(st,"c-fat",p.fat||""),{pre:"R$"})+'<div id="c-out"></div></div>'+
 '<div class="card"><h2>Checklist de proteção</h2><p class="small muted" id="rc-n">'+done+' de '+CHK_REC.length+' feitos</p>'+CHK_REC.map(function(t,i){return '<div class="chk'+(c[i]?" done":"")+'"><input type="checkbox" data-rc="'+i+'"'+(c[i]?" checked":"")+'><div class="tx"><b style="font-weight:600">'+esc(t)+'</b></div></div>'}).join("")+'</div>'};
after.recebiveis=function(){["r-nome","r-pix","r-emp","r-tel","r-venc"].forEach(function(id){$("#"+id).addEventListener("input",function(){S.rec=S.rec||{};S.rec[id]=this.value;save();msgs()})});
 bindAll(["r-valor"],"rec",msgs);bindAll(["v-val","v-n","v-mdr","v-i"],"rec",prazo);bindAll(["c-pmr","c-pme","c-pmp","c-fat"],"rec",ciclo);
 $$("[data-rc]").forEach(function(c){c.onchange=function(){S.recChk=S.recChk||{};S.recChk[c.dataset.rc]=c.checked;save();c.closest(".chk").classList.toggle("done",c.checked);$("#rc-n").textContent=CHK_REC.filter(function(x,i){return S.recChk[i]}).length+" de "+CHK_REC.length+" feitos"}})};
function fmtD(s){if(!s)return "";return parseISO(s).toLocaleDateString("pt-BR")}
function msgs(){var nome=$("#r-nome").value.trim()||"cliente",val=v("r-valor"),venc=$("#r-venc").value,pix=$("#r-pix").value.trim()||"[sua chave Pix]",emp=$("#r-emp").value.trim(),tel=$("#r-tel").value.replace(/\D/g,"");
 var prazoD=venc?fmtD(iso(new Date(parseISO(venc).getTime()+20*864e5))):"[data]";
 $("#r-msgs").innerHTML=NVE.regua.map(function(m,ix){var tx=m.msg.replace(/{nome}/g,nome).replace(/{valor}/g,val?brl(val,1):"[valor]").replace(/{venc}/g,fmtD(venc)||"[data]").replace(/{pix}/g,pix).replace(/{empresa}/g,emp||"").replace(/{prazo}/g,prazoD);
  var wa="https://wa.me/"+(tel?(tel.length<=11?"55"+tel:tel):"")+"?text="+encodeURIComponent(tx);
  return '<div class="rmsg" style="margin-top:14px"><span class="pill">'+m.quando+'</span> <b class="small">'+m.titulo+'</b><div class="msg">'+esc(tx)+'</div><div class="row"><button class="btn btn-2 btn-sm" data-cp="'+ix+'">Copiar</button><a class="btn btn-cta btn-sm" target="_blank" rel="noopener" href="'+wa+'">Abrir no WhatsApp</a></div></div>'}).join("")+'<p class="xs muted" style="margin-top:12px">Cobre com respeito, sem expor o cliente a terceiros e sem ameaças: o Código de Defesa do Consumidor (art. 42) proíbe cobrança constrangedora. Negativação só com aviso prévio.</p>';
 $$("[data-cp]").forEach(function(b){b.onclick=function(){copy(b.closest(".rmsg").querySelector(".msg").textContent)}})}
function prazo(){var V=v("v-val"),n=Math.max(1,Math.round(v("v-n"))),mdr=v("v-mdr")/100,i=v("v-i")/100;var o=$("#v-out");if(!V){o.innerHTML="";return}
 var pv=0;for(var k=1;k<=n;k++)pv+=(V/n)/Math.pow(1+i,k);var liq=pv-V*mdr;var custo=V-liq;var justo=V*V/liq;
 o.innerHTML='<div class="kpis"><div class="kpi"><small>Você recebe de verdade (valor de hoje)</small><b>'+brl(liq,1)+'</b></div><div class="kpi"><small>Custo do parcelamento</small><b class="red">'+brl(custo,1)+' ('+pct(custo/V)+')</b></div><div class="kpi"><small>Preço a prazo que empata</small><b>'+brl(justo,1)+'</b></div><div class="kpi"><small>Desconto no Pix à vista que ainda compensa</small><b class="green">até '+pct(custo/V)+'</b></div></div><p class="xs muted">Considera a taxa da maquininha e o valor do dinheiro no tempo. Não inclui risco de calote.</p>'}
function ciclo(){var a=v("c-pmr"),b=v("c-pme"),c=v("c-pmp"),f=v("c-fat");var cy=a+b-c;var o=$("#c-out");
 o.innerHTML='<div class="kpis"><div class="kpi"><small>Ciclo financeiro</small><b class="'+(cy>0?"yellow":"green")+'">'+Math.round(cy)+' dias</b></div><div class="kpi"><small>Dinheiro preso no ciclo (aprox.)</small><b>'+(f?brl(Math.max(0,cy)*f/30):"—")+'</b></div></div>'+(cy>0?'<p class="small soft">Cada 10 dias a menos no ciclo liberam cerca de <b class="gold">'+(f?brl(10*f/30):"—")+'</b> de caixa. Caminhos: encurtar o prazo do cliente (desconto no Pix), girar o estoque e alongar o prazo do fornecedor.</p>':'<p class="small green">Você recebe antes de pagar: o seu ciclo financia a operação. Proteja essa vantagem.</p>')}

/* ---------- dívidas ---------- */
var SELIC=NVE.selic||13.75,PRONAMPE=SELIC+6;
function aa(im){return Math.pow(1+im/100,12)-1}
function price(P,i,n){i=i/100;return i?P*i/(1-Math.pow(1+i,-n)):P/n}
routes.dividas=function(){
 return '<a class="back" href="#/ferramentas">← Ferramentas</a><span class="eyebrow">Escudo do Caixa</span><h1>Dívidas x Selic</h1><p class="soft">Lance as dívidas e veja qual está sangrando o seu caixa. Referência: Selic em '+SELIC.toLocaleString("pt-BR")+'% ao ano (desde 16/09/2026) e teto do Pronampe em Selic + 6% ao ano ('+PRONAMPE.toLocaleString("pt-BR")+'%).</p>'+
 '<div class="card"><h3>Adicionar dívida</h3><label class="f"><span>Nome</span><input id="d-nome" inputmode="text" placeholder="Ex.: Cheque especial Banco X"></label>'+
 '<label class="f"><span>Tipo</span><select id="d-tipo"><option>Cheque especial</option><option>Rotativo do cartão</option><option>Capital de giro</option><option>Antecipação de recebíveis</option><option>Financiamento/máquina</option><option>Pronampe/linha com garantia</option><option>Fornecedor</option><option>Impostos parcelados</option><option>Outro</option></select></label>'+
 '<div class="grid2">'+fld("d-saldo","Saldo devedor","",{pre:"R$"})+fld("d-taxa","Juros ao mês","",{suf:"%"})+'</div>'+fld("d-parc","Parcela mensal","",{pre:"R$"})+
 '<button class="btn btn-gold" id="d-add">Adicionar</button></div><div id="d-list"></div>'+
 '<div class="card"><h2>Vale a pena pegar um empréstimo?</h2><label class="f"><span>Para quê?</span><select id="e-fim"><option value="prej">Cobrir prejuízo do mês</option><option value="troca">Trocar uma dívida mais cara</option><option value="estoque">Comprar estoque/insumo que gira rápido</option><option value="invest">Investir em algo que aumenta a receita</option></select></label>'+
 '<div class="grid2">'+fld("e-val","Valor","20000",{pre:"R$"})+fld("e-tx","Juros ao mês","1,9",{suf:"%"})+'</div><div class="grid2">'+fld("e-n","Prazo (meses)","24")+fld("e-ret","Ganho extra por mês","",{pre:"R$"})+'</div><p class="xs muted" style="margin-top:-6px">Ganho extra = lucro a mais (não faturamento). Para troca de dívida: os juros que você deixa de pagar por mês.</p><div id="e-out"></div></div>'+
 '<div class="card"><h2>Pagar à vista com desconto ou parcelar?</h2><div class="grid2">'+fld("a-val","Valor da compra","10000",{pre:"R$"})+fld("a-desc","Desconto à vista","5",{suf:"%"})+'</div><div class="grid2">'+fld("a-n","Parcelas sem juros","5")+fld("a-ren","Rendimento do dinheiro","0,9",{suf:"% a.m."})+'</div><p class="xs muted" style="margin-top:-6px">Aplicação de liquidez diária rende perto de 100% do CDI: algo como 0,9% a 1% ao mês antes do IR.</p><div id="a-out"></div></div>'};
after.dividas=function(){drawDebts();$("#d-add").onclick=function(){var d={nome:$("#d-nome").value.trim()||$("#d-tipo").value,tipo:$("#d-tipo").value,saldo:v("d-saldo"),taxa:v("d-taxa"),parc:v("d-parc")};if(!d.saldo||!d.taxa){toast("Preencha saldo e juros ao mês");return}S.dividas=S.dividas||[];S.dividas.push(d);save();["d-nome","d-saldo","d-taxa","d-parc"].forEach(function(id){$("#"+id).value=""});drawDebts();toast("Dívida adicionada")};
 ["e-fim","e-val","e-tx","e-n","e-ret"].forEach(function(id){$("#"+id).addEventListener(id==="e-fim"?"change":"input",emp)});emp();["a-val","a-desc","a-n","a-ren"].forEach(function(id){$("#"+id).addEventListener("input",avista)});avista()};
function drawDebts(){var L=(S.dividas||[]).map(function(d,ix){return Object.assign({},d,{ix:ix,aa:aa(d.taxa)})});var el=$("#d-list");if(!L.length){el.innerHTML='<div class="alert i">Nenhuma dívida lançada. Dica: o juro ao mês está no extrato, no contrato ou no app do banco (procure por "CET" ou "taxa a.m.").</div>';return}
 L.sort(function(a,b){return b.taxa-a.taxa});var jm=L.reduce(function(s,d){return s+d.saldo*d.taxa/100},0);var tot=L.reduce(function(s,d){return s+d.saldo},0);var par=L.reduce(function(s,d){return s+(d.parc||0)},0);
 var med=tot?jm/tot*100:0;
 el.innerHTML='<div class="card"><span class="eyebrow">Suas dívidas, da mais cara para a mais barata</span><div class="kpis"><div class="kpi"><small>Total devido</small><b>'+brl(tot)+'</b></div><div class="kpi"><small>Juros por mês (aprox.)</small><b class="red">'+brl(jm)+'</b></div><div class="kpi"><small>Custo médio</small><b>'+med.toLocaleString("pt-BR",{maximumFractionDigits:2})+'% a.m. ('+pct(aa(med),0)+' a.a.)</b></div><div class="kpi"><small>Parcelas por mês</small><b>'+brl(par)+'</b></div></div>'+
 L.map(function(d,r){var cara=d.aa*100>PRONAMPE;return '<div class="debt"><div style="display:flex;align-items:center;gap:8px"><span class="rank'+(r===0?" r1":"")+'">'+(r+1)+'</span><b style="flex:1">'+esc(d.nome)+'</b><button class="btn btn-2 btn-sm" style="width:auto" data-del="'+d.ix+'" aria-label="Remover">✕</button></div><p class="small soft" style="margin:8px 0 4px">'+brl(d.saldo)+' · '+d.taxa.toLocaleString("pt-BR")+'% a.m. = <b class="'+(cara?"red":"green")+'">'+pct(d.aa,0)+' ao ano</b> ('+(d.aa*100/SELIC).toLocaleString("pt-BR",{maximumFractionDigits:1})+'× a Selic)</p><p class="xs muted" style="margin:0">'+(cara?(r===0?"<b class='red'>Ataque esta primeiro.</b> ":"")+"Acima do teto do Pronampe: candidata a troca ou renegociação.":"Custo dentro da faixa de linhas subsidiadas. Mantenha em dia.")+'</p></div>'}).join("")+
 '<p class="xs muted">Estratégia "avalanche": pague o mínimo em todas e jogue toda a sobra na mais cara. É a que mais economiza juros.</p></div>';
 $$("[data-del]").forEach(function(b){b.onclick=function(){S.dividas.splice(+b.dataset.del,1);save();drawDebts()}})}
function emp(){var f=$("#e-fim").value,V=v("e-val"),i=v("e-tx"),n=Math.max(1,v("e-n")),ret=v("e-ret");var p=price(V,i,n);var tot=p*n;var o=$("#e-out");
 var verd;if(f==="prej")verd='<div class="alert r"><b>Cuidado.</b> Empréstimo para cobrir prejuízo que se repete só empurra o problema e soma juros. Antes, use o Fôlego do caixa e o Preço 2027 para fechar o buraco (corte, reajuste, cobrança). Só faz sentido como ponte curta, com plano para voltar ao azul.</div>';
 else if(!ret)verd='<div class="alert i">Informe o ganho extra por mês para ver o veredito.</div>';
 else if(ret>=p*1.3)verd='<div class="alert g"><b>Faz sentido</b>: o ganho ('+brl(ret)+'/mês) cobre a parcela com folga. Peça o CET por escrito e evite comprometer mais de 10% a 15% do faturamento com parcelas.</div>';
 else if(ret>=p)verd='<div class="alert w"><b>No limite</b>: o ganho mal cobre a parcela. Qualquer atraso vira prejuízo. Negocie taxa menor ou prazo maior.</div>';
 else verd='<div class="alert r"><b>Não compensa</b>: a parcela ('+brl(p)+') é maior que o ganho ('+brl(ret)+'). Você trabalharia para o banco.</div>';
 o.innerHTML='<div class="kpis"><div class="kpi"><small>Parcela</small><b>'+brl(p)+'</b></div><div class="kpi"><small>Juros totais</small><b class="red">'+brl(tot-V)+'</b></div><div class="kpi"><small>Taxa ao ano</small><b>'+pct(aa(i),0)+'</b></div><div class="kpi"><small>Comparação</small><b>'+(aa(i)*100/SELIC).toLocaleString("pt-BR",{maximumFractionDigits:1})+'× a Selic</b></div></div>'+verd}
function avista(){var V=v("a-val"),d=v("a-desc")/100,n=Math.max(1,v("a-n")),r=v("a-ren")/100;var pv=0;for(var k=1;k<=n;k++)pv+=(V/n)/Math.pow(1+r,k);var av=V*(1-d);var o=$("#a-out");
 o.innerHTML='<div class="kpis"><div class="kpi"><small>À vista</small><b>'+brl(av)+'</b></div><div class="kpi"><small>Parcelado, em valor de hoje</small><b>'+brl(pv)+'</b></div></div>'+(av<pv?'<div class="alert g">Pagar à vista é melhor: economia de '+brl(pv-av)+' em valor de hoje. Mas só pague à vista se não furar a reserva mínima.</div>':'<div class="alert w">Parcelar é melhor: o desconto é menor que o rendimento do dinheiro no período. Deixe o dinheiro rendendo na reserva e pague parcelado.</div>')}

/* ---------- linha do tempo ---------- */
routes.linha=function(){var t=today();var placed=false;var items=NVE.linha.map(function(e){var d=parseISO(e.d);var past=d<t;var cls=past?"past":"";var out="";
  if(!past&&!placed){placed=true;cls="next";out+='<span class="here">Você está aqui · '+t.toLocaleDateString("pt-BR")+'</span>'}
  return out+'<div class="tli '+cls+'"><span class="dt">'+e.data+(cls==="next"?" · faltam "+dias(t,d)+" dias":"")+'</span><h3>'+esc(e.t)+'</h3><p>'+esc(e.txt)+'</p><div class="ac"><b>Para você:</b> '+esc(pick(e.acao))+'</div><div class="src">Fonte: '+esc(e.fonte)+'</div></div>'}).join("");
 return '<a class="back" href="#/ferramentas">← Ferramentas</a><span class="eyebrow">Escudo Fiscal</span><h1>Linha do tempo da reforma</h1><p class="soft">O que muda, quando, e o que fazer no seu segmento. Base: EC 132/2023, LC 214/2025 e comunicados oficiais.</p><div class="card"><div class="tl">'+items+'</div></div>'};
after.linha=function(){var h=$(".here");if(h)setTimeout(function(){h.scrollIntoView({block:"center",behavior:"smooth"})},150)};

/* ---------- checklist ---------- */
routes.checklist=function(){var L=NVE.checklistComum.concat(NVE.checklistNicho[nicho()]);var c=S.chk||{};var done=L.filter(function(x,i){return c[i]}).length;
 return '<a class="back" href="#/ferramentas">← Ferramentas</a><span class="eyebrow">Escudo Fiscal</span><h1>Checklist da reforma</h1><p class="soft">Versão '+NVE.nichos[nicho()].nome+'. O que ficar sem marcar vira pergunta para o contador.</p><div class="card"><div class="barl"><span id="ck-n">'+done+' de '+L.length+'</span><span id="ck-p">'+Math.round(done/L.length*100)+'%</span></div><div class="prog g"><i id="ck-b" style="width:'+(done/L.length*100)+'%"></i></div><div style="height:6px"></div>'+
 L.map(function(t,i){return '<div class="chk'+(c[i]?" done":"")+'"><input type="checkbox" data-c="'+i+'"'+(c[i]?" checked":"")+'><div class="tx"><b style="font-weight:600">'+esc(t)+'</b></div></div>'}).join("")+'</div><button class="btn btn-2 noprint" onclick="window.print()">Imprimir checklist</button>'};
after.checklist=function(){var L=NVE.checklistComum.concat(NVE.checklistNicho[nicho()]);$$("[data-c]").forEach(function(c){c.onchange=function(){S.chk=S.chk||{};S.chk[c.dataset.c]=c.checked;save();c.closest(".chk").classList.toggle("done",c.checked);var d=L.filter(function(x,i){return S.chk[i]}).length;$("#ck-n").textContent=d+" de "+L.length;$("#ck-p").textContent=Math.round(d/L.length*100)+"%";$("#ck-b").style.width=(d/L.length*100)+"%"}})};

/* ---------- contador ---------- */
routes.contador=function(){var L=NVE.contador.concat(NVE.contadorNicho[nicho()]);var n=S.cont||{};
 return '<a class="back" href="#/ferramentas">← Ferramentas</a><span class="eyebrow">Escudo Fiscal</span><h1>Roteiro de reunião com o contador</h1><p class="soft">12 perguntas essenciais + '+NVE.contadorNicho[nicho()].length+' do seu segmento. Anote as respostas aqui mesmo (fica salvo).</p><div class="row noprint" style="margin-bottom:14px"><button class="btn btn-2 btn-sm" id="ct-copy">Copiar perguntas</button><button class="btn btn-2 btn-sm" id="ct-print">Imprimir / PDF</button></div>'+
 L.map(function(q,i){return '<div class="card"><span class="eyebrow">Pergunta '+(i+1)+(i>=12?" · seu segmento":"")+'</span><h3 style="font-size:.98rem">'+esc(q)+'</h3><textarea data-n="'+i+'" placeholder="Resposta do contador">'+esc(n[i]||"")+'</textarea></div>'}).join("")};
after.contador=function(){var L=NVE.contador.concat(NVE.contadorNicho[nicho()]);$$("[data-n]").forEach(function(t){t.oninput=function(){S.cont=S.cont||{};S.cont[t.dataset.n]=t.value;save()}});
 $("#ct-copy").onclick=function(){copy("Perguntas para a reunião sobre a Reforma Tributária"+(S.perfil.empresa?" — "+S.perfil.empresa:"")+"\n\n"+L.map(function(q,i){return (i+1)+". "+q}).join("\n"))};$("#ct-print").onclick=function(){window.print()}};

/* ---------- plano ---------- */
routes.plano=function(){var pi=planoInfo();var d=lastDiag();var f=S.plano.feito;
 var pri=d?'<div class="card hl"><span class="eyebrow">Prioridades do seu diagnóstico</span>'+priHtml(d)+'</div>':'<div class="alert w">Faça o <a href="#/diagnostico">diagnóstico</a> para o plano incluir as suas 3 prioridades.</div><div style="height:14px"></div>';
 var ws=["Semana 1 · Escudo do Caixa (emergência)","Semana 2 · Escudo da Margem","Semana 3 · Dívidas e crédito","Semana 4 · Escudo Fiscal","Fechamento do mês"];
 var days="",curW=-1,hoje=Math.min(pi.dia,30);NVE.plano30.forEach(function(t){var w=Math.min(4,Math.floor((t.d-1)/7));if(w!==curW){curW=w;days+='<h3 style="margin:18px 0 6px">'+ws[w]+'</h3>'}
  var k="d"+t.d,done=f[k],isT=t.d===hoje;var dt=new Date(parseISO(S.plano.inicio).getTime()+(t.d-1)*864e5);
  days+='<div class="chk'+(done?" done":"")+(isT?" today":"")+'"><input type="checkbox" data-k="'+k+'"'+(done?" checked":"")+'><div class="tx"><b>Dia '+t.d+' · '+esc(txt(t,"t"))+'</b><p>'+esc(txt(t,"c"))+'</p><div class="meta"><span class="pill '+t.e+'">'+dt.toLocaleDateString("pt-BR",{day:"2-digit",month:"2-digit"})+(isT?" · hoje":"")+'</span>'+(t.tool?'<a class="lnk" href="#/'+toolRoute(t.tool)+'">Ferramenta →</a>':'')+'</div></div></div>'});
 var wk=NVE.planoSemanas.map(function(s){var k="s"+s.s,done=f[k];return '<div class="chk'+(done?" done":"")+'"><input type="checkbox" data-k="'+k+'"'+(done?" checked":"")+'><div class="tx"><b>Semana '+s.s+' · '+esc(txt(s,"t"))+'</b><p>'+esc(txt(s,"c"))+'</p></div></div>'}).join("");
 return '<span class="eyebrow">Plano personalizado · '+NVE.nichos[nicho()].nome+'</span><h1>Plano de 90 dias</h1><p class="soft">30 dias com uma tarefa por dia, depois uma meta por semana até a semana 13.</p><div class="card"><div class="barl"><span id="pl-n">'+pi.feitos+' de '+pi.tot+' concluídas</span><span id="pl-p">'+Math.round(pi.pct*100)+'%</span></div><div class="prog g"><i id="pl-b" style="width:'+(pi.pct*100)+'%"></i></div><p class="xs muted" style="margin:8px 0 0">Início: '+parseISO(S.plano.inicio).toLocaleDateString("pt-BR")+' · <a href="#" id="pl-reset">mudar data de início</a></p></div>'+pri+'<div class="card">'+days+'</div><div class="card"><h3>Semanas 5 a 13</h3>'+wk+'</div>'};
after.plano=function(){$$("[data-k]").forEach(function(c){c.onchange=function(){S.plano.feito[c.dataset.k]=c.checked;save();c.closest(".chk").classList.toggle("done",c.checked);var pi=planoInfo();$("#pl-n").textContent=pi.feitos+" de "+pi.tot+" concluídas";$("#pl-p").textContent=Math.round(pi.pct*100)+"%";$("#pl-b").style.width=(pi.pct*100)+"%";if(c.checked)toast("Boa! Mais uma feita.")}});bindPri();
 var t=$(".chk.today");if(t)setTimeout(function(){t.scrollIntoView({block:"center",behavior:"smooth"})},150);
 $("#pl-reset").onclick=function(e){e.preventDefault();var s=prompt("Nova data de início (dd/mm/aaaa):",parseISO(S.plano.inicio).toLocaleDateString("pt-BR"));if(!s)return;var m=s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);if(!m){toast("Data inválida");return}S.plano.inicio=m[3]+"-"+m[2].padStart(2,"0")+"-"+m[1].padStart(2,"0");save();render()}};

/* ---------- aulas ---------- */
function aulaOk(a){return has(a.produto)}
routes.aulas=function(){var n=nicho();var L=NVE.aulas.filter(function(a){return !a.nicho||a.nicho===n});var outros=NVE.aulas.filter(function(a){return a.nicho&&a.nicho!==n});var fe=S.aulasFeitas||{};
 function item(a){var ok=aulaOk(a);return '<a class="tool'+(ok?"":" locked")+'" href="'+(ok?"#/aula/"+a.id:"#/aulas")+'" style="min-height:0;margin-bottom:10px"><b>'+(ok?(fe[a.id]?"✓ ":"▶ "):"🔒 ")+esc(a.titulo)+'</b><span>'+esc(a.sub)+' · '+a.min+' min'+(ok?"":" · incluída no "+NVE.produtos[a.produto].nome)+'</span></a>'}
 return '<h1>Aulas</h1><p class="soft">Leia no seu ritmo ou toque em "Ouvir" para o celular ler a aula para você. Cada aula termina com um "Faça agora".</p>'+L.map(item).join("")+(outros.length?'<details><summary>Aulas das outras edições</summary><div style="height:10px"></div>'+outros.map(item).join("")+'</details>':'')};
routes.aula=function(p){var a=NVE.aulas.filter(function(x){return x.id===p[0]})[0];if(!a||!aulaOk(a)){return routes.aulas()}
 return '<a class="back" href="#/aulas">← Aulas</a><span class="eyebrow">Aula · '+a.min+' min</span><h1>'+esc(a.titulo)+'</h1><p class="soft">'+esc(a.sub)+'</p><div class="row noprint" style="margin-bottom:12px"><button class="btn btn-gold btn-sm" id="tts">🔊 Ouvir aula</button><button class="btn btn-2 btn-sm" id="tts-stop">■ Parar</button></div><div class="card aula" id="aula-body">'+a.html+'</div>'+
 '<button class="btn btn-cta" id="aula-ok">'+(S.aulasFeitas&&S.aulasFeitas[a.id]?"✓ Aula concluída":"Marcar aula como concluída")+'</button>'};
after.aula=function(p){var ok=$("#aula-ok");if(!ok)return;ok.onclick=function(){S.aulasFeitas=S.aulasFeitas||{};S.aulasFeitas[p[0]]=true;save();ok.textContent="✓ Aula concluída";toast("Aula concluída!")};
 var tts=$("#tts");if(!("speechSynthesis" in window)){tts.disabled=true;tts.textContent="Leitura em voz indisponível";return}
 tts.onclick=function(){speechSynthesis.cancel();var text=$("#aula-body").innerText;var parts=text.match(/[^.!?\n]+[.!?\n]*/g)||[text];var vs=speechSynthesis.getVoices().filter(function(x){return /pt(-|_)BR/i.test(x.lang)});
  parts.forEach(function(t){if(!t.trim())return;var u=new SpeechSynthesisUtterance(t);u.lang="pt-BR";if(vs[0])u.voice=vs[0];u.rate=1.02;speechSynthesis.speak(u)});toast("Lendo a aula…")};
 $("#tts-stop").onclick=function(){speechSynthesis.cancel()}};
window.addEventListener("hashchange",function(){if("speechSynthesis" in window)speechSynthesis.cancel()});

/* ---------- biblioteca ---------- */
function codeFor(p){if(S.acessos[p])return S.acessos[p];for(var k in S.acessos){var pr=NVE.produtos[k];if(pr.inclui&&pr.inclui.indexOf(p)>-1)return S.acessos[k]}return null}
routes.biblioteca=function(){var n=nicho();var out='<h1>Biblioteca</h1><p class="soft">Seus materiais para baixar, imprimir e usar no computador.</p>';
 ["kit","calc","pack","caixa","impl","painel"].forEach(function(p){var pr=NVE.produtos[p];if(!has(p))return;var code=S.acessos[p]||codeFor(p);var files=NVE.arquivos[p]||[];var mine=files.filter(function(f){return !f.nicho||f.nicho===n}),oth=files.filter(function(f){return f.nicho&&f.nicho!==n});
  function fl(f){return '<a class="file" href="f/'+code+'/'+f.f+'" target="_blank" rel="noopener" download><span class="ft '+f.tipo+'">'+(f.tipo==="Planilha"?"XLSX":f.tipo==="Word"?"DOCX":"PDF")+'</span><span><b>'+esc(f.n)+'</b><small>'+(f.tipo==="Planilha"?"Planilha · abre no Excel ou Google Planilhas":f.tipo==="Word"?"Modelo editável · abre no Word ou Google Docs":"PDF · para ler e imprimir")+'</small></span></a>'}
  out+='<div class="card"><span class="eyebrow">'+pr.tipo+'</span><h2>'+pr.nome+'</h2>'+mine.map(fl).join("")+(oth.length?'<details><summary>Versões das outras edições</summary>'+oth.map(fl).join("")+'</details>':'')+'</div>'});
 var locked=["calc","pack","caixa","impl"].filter(function(p){return !has(p)});
 if(locked.length)out+='<div class="card"><h3>Comprou outro item?</h3><p class="small muted">Cada compra tem o seu link de acesso no e-mail. Toque no link ou cole aqui para liberar.</p><label class="f"><span>Link ou código</span><input id="b-code" autocomplete="off" autocapitalize="off" spellcheck="false"></label><button class="btn btn-2" id="b-add">Liberar</button></div>';
 out+='<div class="card"><h3>Instalar o app no celular</h3><p class="small soft"><b>Android (Chrome):</b> menu ⋮ → "Instalar app" ou "Adicionar à tela inicial".<br><b>iPhone (Safari):</b> botão Compartilhar → "Adicionar à Tela de Início".</p><p class="small muted">No iPhone, o app instalado pode pedir o link de acesso de novo: copie o seu link abaixo antes de instalar e cole na primeira tela.</p><button class="btn btn-2 btn-sm" id="b-link">Copiar meu link de acesso</button></div>'+
 '<div class="card"><h3>Seus dados</h3><p class="small muted">Tudo o que você preenche fica salvo só neste aparelho (nada vai para servidor). Faça uma cópia de segurança para usar em outro aparelho.</p><div class="row"><button class="btn btn-2 btn-sm" id="b-exp">Baixar cópia</button><label class="btn btn-2 btn-sm" style="margin:0">Restaurar cópia<input type="file" id="b-imp" accept=".json,application/json" class="hidden"></label></div><div style="height:10px"></div><div class="row"><a class="btn btn-2 btn-sm" href="#/perfil">Editar perfil</a><a class="btn btn-2 btn-sm" href="#/relatorio">Relatório</a></div></div>'+
 '<div class="card"><h3>Fontes dos dados</h3><ul class="xs soft" style="padding-left:16px;margin:0">'+NVE.fontes.map(function(f){return '<li style="margin-bottom:6px">'+esc(f[0])+' — '+(f[2]?'<a href="'+f[2]+'" target="_blank" rel="noopener">'+esc(f[1])+'</a>':esc(f[1]))+'</li>'}).join("")+'</ul><p class="xs muted" style="margin-top:8px">Dados checados em '+NVE.atualizado+'. Conteúdo educativo: não substitui contador ou advogado e não é promessa de resultado.</p></div>';
 return out};
after.biblioteca=function(){var b=$("#b-add");if(b)b.onclick=function(){tryCode($("#b-code").value).then(function(p){if(p){toast("Liberado: "+NVE.produtos[p].nome);render()}else toast("Código não reconhecido")})};
 $("#b-link").onclick=function(){copy(location.origin+location.pathname+"?k="+Object.keys(S.acessos).map(function(k){return S.acessos[k]}).join(",")+"&ed="+nicho())};
 $("#b-exp").onclick=function(){var bl=new Blob([JSON.stringify(S,null,1)],{type:"application/json"});var a=document.createElement("a");a.href=URL.createObjectURL(bl);a.download="painel-blindagem-copia-"+iso(today())+".json";document.body.appendChild(a);a.click();a.remove()};
 $("#b-imp").onchange=function(e){var f=e.target.files[0];if(!f)return;f.text().then(function(t){try{var d=JSON.parse(t);if(!d||typeof d!=="object"||!d.acessos)throw 0;S=d;save();toast("Cópia restaurada");render()}catch(x){toast("Arquivo inválido")}})}};

/* ---------- relatório ---------- */
routes.relatorio=function(){var d=lastDiag();var pi=planoInfo();var p=S.perfil;var f=S.folegoRes;
 var resp=NVE.contador.concat(NVE.contadorNicho[nicho()]).map(function(q,i){var a=S.cont&&S.cont[i];return a?'<p class="small"><b>'+esc(q)+'</b><br>'+esc(a)+'</p>':""}).join("");
 return '<a class="back noprint" href="#/biblioteca">← Voltar</a><h1>Relatório de blindagem</h1><p class="soft">'+esc(p.empresa||"")+' · '+NVE.nichos[nicho()].nome+' · '+NVE.regimes[p.regime]+' · '+new Date().toLocaleDateString("pt-BR")+'</p><button class="btn btn-gold noprint" onclick="window.print()">Imprimir ou salvar em PDF</button><div style="height:14px"></div>'+
 '<div class="card"><h3>Diagnóstico</h3>'+(d?'<p>Nota <b>'+d.nota+'/100</b> ('+faixa(d.nota).nome+') · Caixa '+d.caixa+'% · Margem '+d.margem+'% · Fiscal '+d.fiscal+'%</p><ol class="small">'+d.pri.map(function(id){var q=NVE.perguntas.filter(function(x){return x.id===id})[0];return "<li>"+esc(qAcao(q))+"</li>"}).join("")+'</ol>':'<p>Ainda não feito.</p>')+'</div>'+
 '<div class="card"><h3>Fôlego do caixa</h3><p>'+(f?f.label+" com vendas "+f.queda+"% menores":"Ainda não calculado.")+'</p></div>'+
 '<div class="card"><h3>Plano de 90 dias</h3><p>'+pi.feitos+' de '+pi.tot+' tarefas concluídas ('+Math.round(pi.pct*100)+'%).</p></div>'+
 '<div class="card"><h3>Respostas do contador</h3>'+(resp||'<p class="small muted">Nenhuma resposta anotada ainda.</p>')+'</div>'};

/* ---------- start ---------- */
readUrl().then(render);
if("serviceWorker" in navigator&&location.protocol==="https:"){navigator.serviceWorker.register("sw.js").catch(function(){})}
window.__NVE_TEST__={precoCalc:precoCalc,folegoCalc:folegoCalc,num:num};
})();
