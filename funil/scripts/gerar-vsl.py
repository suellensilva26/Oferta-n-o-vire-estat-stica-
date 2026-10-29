import re,sys,subprocess,asyncio,os,json,edge_tts
from PIL import Image,ImageDraw,ImageFont
src,out=sys.argv[1],sys.argv[2]; W,H=1280,720
t=open(src).read()
secs=re.split(r'^## ',t,flags=re.M)[1:]
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
fb=ImageFont.truetype(F,46); fs=ImageFont.truetype(F,26)
segs=[];cum=0;offer=None;i=0;d='/tmp/v/'+os.path.basename(src)[:5];os.makedirs(d,exist_ok=True)
def wrap(s,f,w):
  L=[];c=''
  for x in s.split():
    if f.getlength(c+' '+x)>w and c: L.append(c);c=x
    else: c=(c+' '+x).strip()
  return L+[c]
for s in secs:
  title=s.split('\n')[0].split('·')[-1].strip()
  body='\n'.join(l for l in s.split('\n')[1:] if not l.strip().startswith('*Tela'))
  q=' '.join(re.findall(r'"([^"]+)"|“([^”]+)”',body) and [a or b for a,b in re.findall(r'"([^"]+)"|“([^”]+)”',body)])
  if not q: continue
  if offer is None and re.search(r'oferta',title,re.I): offer=cum
  for sen in re.findall(r'[^.!?]+[.!?]*',q):
    sen=sen.strip()
    if len(sen)<3: continue
    i+=1;a=f'{d}/{i}.mp3'
    asyncio.run(edge_tts.Communicate(sen,'pt-BR-AntonioNeural',rate='+8%').save(a))
    du=float(subprocess.check_output(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',a]))
    im=Image.new('RGB',(W,H),(11,15,22));g=ImageDraw.Draw(im)
    g.rectangle([0,0,W,8],fill=(212,175,55));g.text((60,40),title.upper(),font=fs,fill=(212,175,55))
    L=wrap(sen,fb,W-280)[:7];y=(H-len(L)*62)//2
    for l in L:
      hl=re.search(r'\d|[A-Z][a-z]+ [A-Z]',l); g.text(((W-fb.getlength(l))/2,y),l,font=fb,fill=(243,215,122) if hl else (240,240,240));y+=62
    p=f'{d}/{i}.png';im.save(p);v=f'{d}/{i}.mp4'
    subprocess.run(['ffmpeg','-y','-v','error','-loop','1','-i',p,'-i',a,'-vf',f"fps=25,fade=in:0:6",'-c:v','libx264','-crf','28','-preset','veryfast','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-ar','44100','-t',str(du+0.25),v],check=True)
    segs.append(v);cum+=du+0.25
open(d+'/l.txt','w').write(''.join(f"file '{x}'\n" for x in segs))
subprocess.run(['ffmpeg','-y','-v','error','-f','concat','-safe','0','-i',d+'/l.txt','-c','copy',out],check=True)
print(json.dumps({'out':out,'dur':round(cum),'offer':int(offer or 0)}))
