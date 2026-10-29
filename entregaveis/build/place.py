import json,shutil,os,glob
R='/workspace/entregaveis';d=json.load(open(R+'/build/nve.json'));T=json.load(open(R+'/build/tokens.json'))['tokens']
shutil.rmtree(R+'/app/f',ignore_errors=True)
def src(f):
    for p in (R+'/build/pdf/'+f,R+'/build/out/'+f):
        if os.path.exists(p):return p
    raise SystemExit('missing '+f)
for k,files in d['arquivos'].items():
    targets=[k]+(['impl'] if k=='painel' else [])
    for t in targets:
        os.makedirs(f"{R}/app/f/{T[t]}",exist_ok=True)
        for x in files: shutil.copy(src(x['f']),f"{R}/app/f/{T[t]}/{x['f']}")
for p in sorted(glob.glob(R+'/app/f/*/*')):print(p.split('/app/')[1],os.path.getsize(p))
