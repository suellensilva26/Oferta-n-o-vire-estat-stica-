# -*- coding: utf-8 -*-
import json, html, os
ROOT="/workspace/entregaveis"
NVE=json.load(open(ROOT+"/build/nve.json"))
TOK=json.load(open(ROOT+"/build/tokens.json"))["tokens"]
APP_URL=os.environ.get("APP_URL","https://painel-blindagem.vercel.app")
E=html.escape
NICHO={"A":"Comércio e Alimentação","B":"Serviços","C":"Indústria, Agro e B2B"}
CSS="""
@page{size:A4;margin:18mm 16mm 18mm 16mm}
@page:first{margin:0}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{font-family:Inter,Arial,sans-serif;color:#141a26;font-size:10.6pt;line-height:1.55;margin:0}
h1,h2,h3,h4{font-family:Montserrat,Inter,sans-serif;color:#0b1220;line-height:1.2;letter-spacing:-.01em}
h1{font-size:22pt;margin:0 0 10pt;font-weight:900}
h2{font-size:15pt;margin:20pt 0 8pt;font-weight:800;border-left:5px solid #fcc419;padding-left:10px}
h3{font-size:12pt;margin:14pt 0 6pt;font-weight:800}
p{margin:0 0 8pt}ul,ol{margin:0 0 9pt;padding-left:18pt}li{margin-bottom:3pt}
a{color:#0b6b35}
.cover{height:297mm;width:210mm;background:#05080f;color:#f5f7fb;padding:30mm 20mm;position:relative;page-break-after:always;overflow:hidden}
.cover:before{content:"";position:absolute;inset:-40mm -40mm auto auto;width:170mm;height:170mm;border-radius:50%;background:radial-gradient(circle,rgba(252,196,25,.22),transparent 65%)}
.cover .kick{font-family:Montserrat;font-weight:800;letter-spacing:.2em;font-size:9pt;color:#fcc419;text-transform:uppercase}
.cover h1{color:#fff;font-size:34pt;line-height:1.06;margin:14pt 0 12pt;max-width:160mm}
.cover h1 em{font-style:normal;color:#fcc419}
.cover .sub{font-size:13pt;color:#cbd5e1;max-width:150mm}
.cover .badge{display:inline-block;margin-top:18pt;background:#22c55e;color:#04210f;font-weight:800;padding:7pt 12pt;border-radius:8pt;font-size:10pt}
.cover .foot{position:absolute;left:20mm;right:20mm;bottom:22mm;font-size:8.5pt;color:#8b98ad;border-top:1px solid rgba(255,255,255,.15);padding-top:8pt}
.cover .mark{width:46pt;height:46pt;border-radius:12pt;background:linear-gradient(135deg,#fcc419,#f59f00);display:flex;align-items:center;justify-content:center;font:900 22pt Montserrat;color:#1a1300;margin-bottom:26pt}
.pb{page-break-before:always}
.avoid{page-break-inside:avoid}
.box{border:1px solid #e3e7ef;border-radius:10pt;padding:10pt 12pt;margin:10pt 0;background:#f8fafc;page-break-inside:avoid}
.box.gold{background:#fff8e1;border-color:#f5d36b}
.box.green{background:#ecfdf3;border-color:#a7e9c0}
.box.red{background:#fef2f2;border-color:#f6c1c1}
.box.dark{background:#0b1220;color:#e7ecf5;border-color:#0b1220}.box.dark h3{color:#fcc419;margin-top:0}
.box h3:first-child{margin-top:0}
.kick{font-family:Montserrat;font-weight:800;letter-spacing:.14em;font-size:8pt;color:#b7860b;text-transform:uppercase}
.big{font:900 26pt Montserrat;color:#0b1220;line-height:1}
.stats{display:grid;grid-template-columns:1fr 1fr;gap:8pt;margin:10pt 0}
.stat{border:1px solid #e3e7ef;border-radius:10pt;padding:10pt;page-break-inside:avoid}
.stat b{display:block;font:900 20pt Montserrat;color:#0b1220}.stat span{font-size:9pt;color:#4b5565}.stat i{display:block;font-style:normal;font-size:7.5pt;color:#8b98ad;margin-top:4pt}
table{width:100%;border-collapse:collapse;margin:8pt 0 12pt;font-size:9.4pt;page-break-inside:auto}
th{background:#0b1220;color:#fff;text-align:left;padding:6pt 7pt;font-weight:700}
td{border-bottom:1px solid #e3e7ef;padding:6pt 7pt;vertical-align:top}
tr{page-break-inside:avoid}
tr:nth-child(even) td{background:#f8fafc}
.n{text-align:right;white-space:nowrap}
.chk{display:flex;gap:8pt;padding:6pt 0;border-bottom:1px dashed #d5dbe5;page-break-inside:avoid}
.chk:before{content:"";flex:0 0 11pt;height:11pt;border:1.6px solid #0b1220;border-radius:3pt;margin-top:2pt}
.small{font-size:8.8pt}.muted{color:#5b6576}
.src{font-size:7.8pt;color:#6b7585}
.pill{display:inline-block;font-size:7.5pt;font-weight:800;padding:1pt 6pt;border-radius:20pt;background:#eef2f7;color:#334155;letter-spacing:.04em;text-transform:uppercase}
.pill.caixa{background:#e0f2fe;color:#075985}.pill.margem{background:#fef3c7;color:#92400e}.pill.fiscal{background:#ede9fe;color:#5b21b6}
.toc li{margin-bottom:5pt}
.line{border-bottom:1px solid #9aa3b2;height:18pt}
.two{display:grid;grid-template-columns:1fr 1fr;gap:12pt}
.script{border-left:4px solid #22c55e;background:#f4fbf6;padding:8pt 11pt;margin:7pt 0 10pt;border-radius:0 8pt 8pt 0;page-break-inside:avoid;white-space:pre-wrap}
.faca{border:2px solid #22c55e;border-radius:10pt;padding:9pt 12pt;margin:10pt 0;background:#f0fdf4;page-break-inside:avoid}
.faca:before{content:"FAÇA AGORA";display:block;font:800 8pt Montserrat;letter-spacing:.14em;color:#15803d;margin-bottom:4pt}
.nota{font-size:9pt;color:#4b5565;border-left:3px solid #cbd5e1;padding-left:8pt}
.footer-note{font-size:7.8pt;color:#8b98ad;margin-top:16pt;border-top:1px solid #e3e7ef;padding-top:6pt}
"""
def cover(kick,title,sub,badge,foot="Conteúdo educativo, com dados checados em 28/10/2026. Não substitui contador ou advogado. Connect Mídia · Kit Não Vire Estatística"):
    return f'<section class="cover"><div class="mark">N</div><div class="kick">{kick}</div><h1>{title}</h1><p class="sub">{sub}</p>{f"<span class=badge>{badge}</span>" if badge else ""}<div class="foot">{foot}</div></section>'
def doc(title,body):
    return f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>{E(title)}</title><style>{CSS}</style></head><body>{body}</body></html>'
def write(name,title,body):
    p=ROOT+"/build/html/"+name+".html"
    open(p,"w",encoding="utf-8").write(doc(title,body)); return p
def fontes_html():
    return "<ol class='small'>"+"".join(f"<li><b>{E(f[0])}</b> — {E(f[1])}{(' · <a href=\"'+f[2]+'\">'+E(f[2])+'</a>') if f[2] else ''}</li>" for f in NVE["fontes"])+"</ol>"
def brl(v,d=2):
    s=f"{v:,.{d}f}".replace(",","X").replace(".",",").replace("X",".")
    return "R$ "+s
def pct(v,d=1):
    return (f"{v*100:.{d}f}").replace(".",",")+"%"
def pick(o,n):
    return o[n] if isinstance(o,dict) else o
def txt(o,k,n):
    return o[k] if k in o else o[k+"N"][n]
