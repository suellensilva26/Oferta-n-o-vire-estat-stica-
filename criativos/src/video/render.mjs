import { nb } from '../nbsp.mjs';
import { chromium } from '/workspace/pwtest/node_modules/playwright/index.mjs';
import fs from 'fs'; import { execSync, spawn } from 'child_process';
const [,, specPath, outName] = process.argv;
const spec=(await import(specPath)).default;
const work=`/tmp/v_${outName}`; fs.mkdirSync(work,{recursive:true});
const FPS=30, GAP=0.2, TAIL=1.5;
// 1) TTS
fs.writeFileSync(`${work}/spec.json`, JSON.stringify({voice:spec.voice,rate:spec.rate,scenes:spec.scenes.map(s=>({say:s.say}))}));
if(!process.env.SKIPTTS) execSync(`python3 /workspace/criativos/src/video/tts.py ${work}/spec.json ${work}`,{stdio:'inherit'});
const tts=JSON.parse(fs.readFileSync(`${work}/tts.json`,'utf8'));
// 2) timeline
let t=0; const scenes=spec.scenes.map((s,i)=>{const d=tts[i].dur+(i==spec.scenes.length-1?TAIL:GAP)+(s.extra||0); const o={start:t,end:t+d,dur:d,audio:tts[i].dur}; t+=d; return o;});
const total=t;
// subtitles: map display chunks to spoken word times
const chunks=[];
spec.scenes.forEach((s,i)=>{
  const words=tts[i].words; const sayLen=words.reduce((a,w)=>a+w.w.length+1,0);
  let acc=0; const wpos=words.map(w=>{const p=acc/sayLen; acc+=w.w.length+1; return {p,t:w.t,end:w.t+w.d}});
  const timeAt=f=>{let best=wpos[0]; for(const w of wpos){ if(w.p<=f+1e-6) best=w; } return best.t;};
  const toks=nb(s.sub).split(/[ \t\n]+/).filter(Boolean); const disp=toks.join(' '); const L=disp.replace(/\*/g,'').length;
  let cur=[], pos=0; const groups=[];
  toks.forEach((w,k)=>{cur.push(w); const clean=w.replace(/\*/g,''); pos+=clean.length+1;
    if(cur.length>=4 || /[.,:?!;]$/.test(clean) || k==toks.length-1){groups.push({ws:cur,endPos:pos}); cur=[];}});
  let startPos=0;
  groups.forEach((g,gi)=>{ g.a=scenes[i].start+timeAt(startPos/L); startPos=g.endPos; });
  groups.forEach((g,gi)=>{ const last=words[words.length-1]; g.b= gi<groups.length-1? groups[gi+1].a : scenes[i].start+last.t+last.d+0.15;
    const html=g.ws.join(' ').replace(/\*([^*]+)\*/g,'<span class="k">$1</span>').replace(/\*/g,'');
    chunks.push({a:g.a,b:g.b,html}); });
});
// 3) audio
const parts=spec.scenes.map((s,i)=>`[${i}:a]apad=whole_dur=${scenes[i].dur.toFixed(3)}[a${i}]`).join(';');
execSync(`ffmpeg -y -loglevel error ${spec.scenes.map((s,i)=>`-i ${work}/s${String(i).padStart(2,'0')}.mp3`).join(' ')} -filter_complex "${parts};${spec.scenes.map((s,i)=>`[a${i}]`).join('')}concat=n=${spec.scenes.length}:v=0:a=1,loudnorm=I=-14:TP=-1.5:LRA=11[out]" -map "[out]" -ar 48000 ${work}/voice.wav`);
// 4) page
const css=fs.readFileSync('/workspace/criativos/src/video/vcss.css','utf8');
const SHIELD=`<svg viewBox="0 0 48 48"><path d="M24 3 6 10v12c0 11.5 7.7 20.6 18 23 10.3-2.4 18-11.5 18-23V10L24 3z" fill="#fcc419"/><path d="m15.5 24.5 6 6 11-12" stroke="#05080f" stroke-width="4.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const html=`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>
<div id="brand">${SHIELD}<span>NÃO VIRE ESTATÍSTICA</span></div>
${spec.scenes.map((s,i)=>`<div class="sc" id="s${i}" style="z-index:${i+1}">${s.html}</div>`).join('\n')}
<div id="sub"></div><div id="src"></div>
<script>
const SC=${JSON.stringify(scenes)}, CH=${JSON.stringify(chunks)}, SRC=${JSON.stringify(spec.scenes.map(s=>s.src||''))};
const els=SC.map((_,i)=>document.getElementById('s'+i));
const ease=x=>1-Math.pow(1-x,3);
window.setTime=function(t){
  let active=0;
  SC.forEach((s,i)=>{const el=els[i]; const lt=t-s.start;
    if(t>=s.start) active=i;
    let op= t<s.start?0:(i==0?1:Math.min(1,lt/0.22));
    if(t>SC[Math.min(i+1,SC.length-1)].start+0.3 && i<SC.length-1) op=0;
    el.style.opacity=op;
    if(op>0){
      el.getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=Math.max(0,lt)*1000;});
      el.querySelectorAll('.kb').forEach(k=>{const p=Math.max(0,lt)/s.dur; k.style.transform='scale('+(1.0+0.12*p)+') translateY('+(-20*p)+'px)';});
      el.querySelectorAll('[data-to]').forEach(c=>{const d=+(c.dataset.delay||0), du=+(c.dataset.dur||1.2); const p=ease(Math.min(1,Math.max(0,(lt-d)/du))); const v=(+c.dataset.to)*p; const dec=+(c.dataset.dec||0);
        c.textContent=(c.dataset.pre||'')+v.toLocaleString('pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec})+(c.dataset.suf||'');});
    }
  });
  const ch=CH.find(c=>t>=c.a&&t<c.b); const sub=document.getElementById('sub');
  sub.innerHTML=ch?ch.html:''; if(ch){const p=Math.min(1,(t-ch.a)/0.12); sub.style.transform='scale('+(0.92+0.08*p)+')';}
  document.getElementById('src').textContent=SRC[active];
};
</script></body></html>`;
fs.writeFileSync(`${work}/index.html`,nb(html));
const browser=await chromium.launch(); const page=await browser.newPage({viewport:{width:1080,height:1920}});
await page.goto(`file://${work}/index.html`); await page.evaluate(()=>document.fonts.ready); await page.waitForTimeout(300);
const out=`/workspace/criativos/videos/${outName}.mp4`;
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-i',`${work}/voice.wav`,'-c:v','libx264','-preset','medium','-crf','19','-pix_fmt','yuv420p','-profile:v','high','-c:a','aac','-b:a','160k','-shortest','-movflags','+faststart',out],{stdio:['pipe','inherit','inherit']});
const N=Math.ceil(total*FPS);
const preview=(process.env.PREVIEW||'').split(',').filter(Boolean).map(Number);
for(let f=0;f<N;f++){
  const tt=f/FPS; await page.evaluate(x=>window.setTime(x),tt);
  const buf=await page.screenshot({type:'jpeg',quality:92});
  if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
  if(f%150==0) process.stdout.write(`${outName} ${f}/${N}\n`);
}
ff.stdin.end(); await new Promise(r=>ff.on('close',r));
await browser.close();
fs.writeFileSync(`/workspace/criativos/videos/${outName}.srt`, chunks.map((c,i)=>{const f=x=>{const h=Math.floor(x/3600),m=Math.floor(x%3600/60),s=Math.floor(x%60),ms=Math.round((x%1)*1000);return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${String(ms).padStart(3,'0')}`};return `${i+1}\n${f(c.a)} --> ${f(c.b)}\n${c.html.replace(/<[^>]+>/g,'')}\n`}).join('\n'));
console.log('done',out,total.toFixed(2)+'s');
