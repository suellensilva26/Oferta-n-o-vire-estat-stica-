# -*- coding: utf-8 -*-
# Exemplos numéricos por porte (todos hipotéticos; alíquotas não oficiais)
from base import brl, pct
SELIC=.1375
CBS=.0921; IBS=.187
def mes2ano(i): return (1+i)**12-1
def f0(v): return brl(v,0)

def calc(x):
    mc=1-x["cv"]; pe=x["cf"]/mc; lucro=x["fat"]*mc-x["cf"]
    perda30=x["cf"]-x["fat"]*.7*mc
    folego=(x["caixa"]/perda30) if perda30>0 else None
    giro=x["fat"]/30*x["pmr"]; libera10=x["fat"]/30*10
    meta1=x["cf"]; meta3=3*x["cf"]
    sep=max(0,(meta1-x["caixa"]))/(6*x["fat"]) if meta1>x["caixa"] else 0
    dv=[]
    for nome,saldo,i in x["dividas"]:
        a=mes2ano(i); jur=saldo*a; alt=SELIC+.06
        dv.append((nome,saldo,i,a,jur,saldo*alt))
    return dict(mc=mc,pe=pe,lucro=lucro,folga=x["fat"]/pe-1,perda30=perda30,folego=folego,giro=giro,libera10=libera10,meta1=meta1,meta3=meta3,sep=sep,dv=dv)

def bloco(x,preco_fn=None):
    r=calc(x)
    prof="".join(f"<tr><td>{a}</td><td class='n'>{b}</td></tr>" for a,b in [
      ("Faturamento médio por mês",f0(x["fat"])),("Regime",x["regime"]),
      ("Custos variáveis (mercadoria/insumo, impostos sobre a venda, taxas, comissões)",pct(x["cv"],0)+" das vendas"),
      ("Custos fixos por mês (aluguel, folha, pró-labore, sistemas, contador)",f0(x["cf"])),
      ("Dinheiro em caixa hoje",f0(x["caixa"])),("Prazo médio de recebimento",f"{x['pmr']} dias")])
    fol=("não falta caixa: mesmo com −30% nas vendas a empresa empata" if r["folego"] is None else f"{r['folego']:.1f} meses".replace(".",","))
    met="".join(f"<tr><td>{a}</td><td class='n'><b>{b}</b></td><td class='small'>{c}</td></tr>" for a,b,c in [
      ("Margem de contribuição",pct(r["mc"],0),"100% − custos variáveis"),
      ("Ponto de equilíbrio por mês",f0(r["pe"]),f"custos fixos ÷ margem. Folga atual: {pct(r['folga'],0)} acima do empate"),
      ("Lucro operacional por mês (antes de juros)",f0(r["lucro"]),"faturamento × margem − custos fixos"),
      ("Se as vendas caírem 30%, o caixa dura",fol,"caixa ÷ prejuízo mensal na queda"),
      ("Dinheiro parado em contas a receber",f0(r["giro"]),f"faturamento ÷ 30 × {x['pmr']} dias"),
      ("Encurtar o prazo em 10 dias libera",f0(r["libera10"]),"uma vez, sem pegar empréstimo"),
      ("Reserva mínima (1 mês) / ideal (3 meses)",f"{f0(r['meta1'])} / {f0(r['meta3'])}","custo fixo × 1 e × 3"),
    ]+([("Para chegar à reserva mínima em 6 meses, separe",pct(r["sep"],1)+" das vendas","todo dia, em conta separada")] if r["sep"]>0 else []))
    dv="".join(f"<tr><td>{n}</td><td class='n'>{f0(s)}</td><td class='n'>{pct(i,1)} a.m. ≈ {pct(a,0)} a.a.</td><td class='n'>{f0(j)}</td><td class='n'>{f0(alt)}</td></tr>" for n,s,i,a,j,alt in r["dv"])
    tot=sum(d[4] for d in r["dv"]); totalt=sum(d[5] for d in r["dv"])
    h=f"""<div class="avoid"><h3>{x['titulo']}</h3><p class="small muted">{x['quem']}</p>
<table><tr><th>Perfil (hipotético)</th><th class="n">Valor</th></tr>{prof}</table></div>
<div class="avoid"><table><tr><th>Conta</th><th class="n">Resultado</th><th>Como chegamos</th></tr>{met}</table></div>
<div class="avoid"><table><tr><th>Dívida</th><th class="n">Saldo</th><th class="n">Taxa</th><th class="n">Juros em 12 meses</th><th class="n">Se fosse Selic + 6%</th></tr>{dv}
<tr><td><b>Total</b></td><td></td><td></td><td class="n"><b>{f0(tot)}</b></td><td class="n"><b>{f0(totalt)}</b></td></tr></table>
<p class="small muted">Juros calculados sobre o saldo atual, sem amortização, só para comparar o tamanho do custo. "Selic + 6%" ({pct(SELIC+.06,2)} a.a.) é o teto de linhas como o Pronampe; aprovação, limite e garantias dependem do banco e do programa.</p></div>"""
    if x.get("reforma"): h+=f'<div class="box avoid"><h3>E a reforma?</h3>{x["reforma"](r)}</div>'
    h+='<div class="box green avoid"><h3>Plano de ação deste caso</h3><ol style="margin:0">'+"".join(f"<li>{a(r) if callable(a) else a}</li>" for a in x["acoes"])+"</ol></div>"
    return h

def simples_b2b(fat,das=.03):
    tf=CBS+IBS; credH=1000/(1+tf)*tf; credS=1000*das
    c27=CBS+.001; credH27=1000/(1+c27)*c27
    return (f"<p>Ficando no Simples \"por dentro\", o cliente empresa do regime regular aproveita como crédito só a parte de IBS/CBS do seu DAS. Supondo (número hipotético; o contador calcula o real) que essa parte seja {pct(das,0)} da venda, a cada <b>R$ 1.000</b> que ele compra de você o crédito dele é de cerca de <b>{brl(credS)}</b>. No híbrido, com as alíquotas não oficiais citadas no guia, seria cerca de <b>{brl(credH27)}</b> em 2027–2028 (só CBS) e <b>{brl(credH)}</b> no modelo final (2033).</p>"
            f"<p style='margin:0'>Sobre o seu faturamento de {f0(fat)} por mês, a diferença de crédito para os seus clientes no modelo final seria de cerca de <b>{f0(fat/1000*(credH-credS))}</b> por mês. É esse número que um comprador grande vai colocar na mesa. Mas o híbrido também muda o que <b>você</b> paga: faça as duas contas com o contador antes de <b>março de 2027</b> (efeito a partir de 01/07/2027).</p>")

def split_float(fat_sem,compras_cred,dias=35):
    c27=CBS+.001
    liq=fat_sem*c27-compras_cred*CBS
    return liq, liq*dias/30
