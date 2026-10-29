from PIL import Image, ImageDraw, ImageFont
fp='/usr/share/fonts/truetype/sand-box/google/Montserrat/Montserrat-VariableFont_wght.ttf'
def F(sz,w):
    f=ImageFont.truetype(fp,sz); f.set_variation_by_axes([w]); return f
font=F(30,800); small=F(19,600); big=F(40,800)
items=[('C01','Marcas em RJ · Comércio','estaticos/c01_1080x1350.png'),('C02','9,3 mi inadimplentes · Amplo','estaticos/c02_1080x1350.png'),('C03','Reforma 01/01/2027 · Amplo','estaticos/c03_1080x1350.png'),('C04','Semanas de caixa · Amplo','estaticos/c04_1080x1920.png'),('C05','ISS acaba · Serviços','estaticos/c05_1080x1920.png'),('C06','Gigantes na Justiça · Ind./agro','estaticos/c06_1080x1350.png'),('C07','Diagnóstico · Amplo/RMKT','estaticos/c07_1080x1920.png'),('V08','Vídeo 40s · Marcas · Comércio','videos/v08_marcas_recuperacao_capa.jpg'),('V09','Vídeo 39s · Reforma · Amplo','videos/v09_reforma_linha_do_tempo_capa.jpg'),('V10','Vídeo 38s · Ind./agro/B2B','videos/v10_industria_agro_b2b_capa.jpg')]
cw,ch=360,640; pad=24; lab=70
W=5*cw+6*pad; H=2*(ch+lab)+3*pad+90
im=Image.new('RGB',(W,H),'#0b1224'); d=ImageDraw.Draw(im)
d.text((pad,28),'Não Vire Estatística — 10 criativos de teste (Meta Ads)',font=big,fill='#fcc419')
for i,(c,t,f) in enumerate(items):
    x=pad+(i%5)*(cw+pad); y=90+pad+(i//5)*(ch+lab+pad)
    src=Image.open(f).convert('RGB'); r=min(cw/src.width,ch/src.height); s=src.resize((int(src.width*r),int(src.height*r)),Image.LANCZOS)
    im.paste(s,(x+(cw-s.width)//2,y+(ch-s.height)//2))
    if c.startswith('V'):
        cx,cy=x+cw-50,y+50; d.ellipse((cx-34,cy-34,cx+34,cy+34),fill=(0,0,0)); d.polygon([(cx-11,cy-19),(cx-11,cy+19),(cx+21,cy)],fill='#fcc419')
    d.text((x,y+ch+8),c,font=font,fill='#ffffff'); d.text((x,y+ch+44),t,font=small,fill='#cbd5e1')
im.save('contact-sheet.png')
