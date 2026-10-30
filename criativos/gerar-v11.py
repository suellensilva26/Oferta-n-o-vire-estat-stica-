import subprocess,asyncio,edge_tts,os
from PIL import Image,ImageDraw,ImageFont
os.makedirs('/tmp/g',exist_ok=True)
W,H=1080,1920;F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
S=[("Três perguntas:",["3 PERGUNTAS","para o dono","do negócio"]),
("você sabe quanto vai pagar de imposto em 2027?",["1.","Quanto você","vai pagar","de imposto","em\u00a02027?"]),
("Sabe quantos meses o seu caixa aguenta?",["2.","Quantos meses","seu caixa","aguenta?"]),
("E tem um plano se as vendas caírem?",["3.","Tem um plano","se as vendas","caírem?"]),
("Se você respondeu não para alguma delas, faz o diagnóstico gratuito no link.",["Respondeu","NÃO","para alguma?"]),
("Em 2 minutos você tem as respostas.",["Diagnóstico","gratuito","2\u00a0minutos","Toque em","SAIBA\u00a0MAIS"])]
segs=[]
for i,(t,L) in enumerate(S):
  a=f'/tmp/g/{i}.mp3';asyncio.run(edge_tts.Communicate(t,'pt-BR-FranciscaNeural',rate='+8%').save(a))
  du=float(subprocess.check_output(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',a]))
  im=Image.new('RGB',(W,H),(11,15,22));g=ImageDraw.Draw(im)
  g.rectangle([0,0,W,14],fill=(212,175,55));g.rectangle([0,H-14,W,H],fill=(212,175,55))
  f=ImageFont.truetype(F,40);g.text((60,120),"NÃO VIRE ESTATÍSTICA",font=f,fill=(212,175,55))
  y=(H-len(L)*150)//2
  for l in L:
    sz=120
    while ImageFont.truetype(F,sz).getlength(l)>W-120: sz-=4
    fb=ImageFont.truetype(F,sz);col=(243,215,122) if any(c.isdigit() for c in l) or l.isupper() or l=='NÃO' else (245,245,245)
    g.text(((W-fb.getlength(l))/2,y),l,font=fb,fill=col);y+=150
  m="Faça o diagnóstico gratuito";g.text(((W-f.getlength(m))/2,H-180),m,font=f,fill=(200,200,200))
  p=f'/tmp/g/{i}.png';im.save(p);v=f'/tmp/g/{i}.mp4'
  subprocess.run(['ffmpeg','-y','-v','error','-loop','1','-i',p,'-i',a,'-vf','fps=30,format=yuv420p','-c:v','libx264','-crf','26','-preset','veryfast','-c:a','aac','-b:a','128k','-ar','44100','-t',str(du+0.2),v],check=True);segs.append(v)
open('/tmp/g/l.txt','w').write(''.join(f"file '{x}'\n" for x in segs))
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i','/tmp/g/l.txt','-c','copy','-movflags','+faststart','v11-tres-perguntas-9x16.mp4'],check=True)
