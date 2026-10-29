const vm=require('vm'),fs=require('fs');const R='/workspace/entregaveis/';
const ctx={window:{}};ctx.window=ctx;vm.createContext(ctx);
for(const f of ['data.js','aulas.js'])vm.runInContext(fs.readFileSync(R+'app/assets/'+f,'utf8'),ctx);
const old=JSON.parse(fs.readFileSync(R+'build/nve.json','utf8'));
const n=JSON.parse(JSON.stringify(ctx.NVE));
console.log('old keys',Object.keys(old).join(),'\nnew keys',Object.keys(n).join());
fs.writeFileSync(R+'build/nve.json',JSON.stringify(n));
