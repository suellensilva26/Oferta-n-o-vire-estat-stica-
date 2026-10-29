// Grava (ou atualiza) a meta tag facebook-domain-verification em todas as páginas HTML,
// lendo o código de config.js -> meta.verificacaoDominio.  Uso: node scripts/aplicar-verificacao.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { window: {} };
vm.runInNewContext(readFileSync(join(root, "config.js"), "utf8"), ctx);
const code = String(ctx.window.FUNIL_CONFIG?.meta?.verificacaoDominio || "").trim().replace(/[^\w-]/g, "");
const re = /\n?<meta name="facebook-domain-verification"[^>]*>/g;
let n = 0;
for (const f of readdirSync(root).filter((f) => f.endsWith(".html"))) {
  const p = join(root, f);
  let html = readFileSync(p, "utf8").replace(re, "");
  if (code) html = html.replace(/<meta charset="utf-8">/, `<meta charset="utf-8">\n<meta name="facebook-domain-verification" content="${code}">`);
  writeFileSync(p, html); n++;
}
console.log(code ? `Tag aplicada em ${n} páginas: ${code}` : `Nenhum código em config.js; tag removida de ${n} páginas.`);
