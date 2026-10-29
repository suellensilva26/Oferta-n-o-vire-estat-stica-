import asyncio, json, sys, edge_tts, subprocess
async def one(text, out, voice, rate):
    c = edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary")
    words=[]
    with open(out,'wb') as f:
        async for ch in c.stream():
            if ch["type"]=="audio": f.write(ch["data"])
            elif ch["type"]=="WordBoundary":
                words.append({"t":ch["offset"]/1e7,"d":ch["duration"]/1e7,"w":ch["text"]})
    dur=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",out]).strip())
    return {"words":words,"dur":dur}
async def main():
    spec=json.load(open(sys.argv[1])); outdir=sys.argv[2]
    res=[]
    for i,s in enumerate(spec["scenes"]):
        r=await one(s["say"], f"{outdir}/s{i:02d}.mp3", spec.get("voice","pt-BR-AntonioNeural"), spec.get("rate","+8%"))
        res.append(r)
    json.dump(res,open(f"{outdir}/tts.json","w"),ensure_ascii=False,indent=1)
asyncio.run(main())
