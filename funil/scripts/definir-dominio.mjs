// Troca o domínio público do funil (canonical, sitemap, robots e config.empresa.site).
// Uso: node scripts/definir-dominio.mjs https://planejamento2027.connectmidia.com
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.argv[2] || "").replace(/\/+$/, "");
if (!/^https:\/\/[a-z0-9.-]+$/i.test(base)) { console.error("Informe a URL, ex.: https://planejamento2027.connectmidia.com"); process.exit(1); }
const fix = (f, fn) => { const p = join(root, f); writeFileSync(p, fn(readFileSync(p, "utf8"))); };
for (const f of readdirSync(root).filter((f) => f.endsWith(".html")))
  fix(f, (s) => s.replace(/(<link rel="canonical" href=")https:\/\/[^/"]+/, `$1${base}`));
fix("sitemap.xml", (s) => s.replace(/<loc>https:\/\/[^/<]+/g, `<loc>${base}`));
fix("robots.txt", (s) => s.replace(/Sitemap: https:\/\/[^/\s]+/, `Sitemap: ${base}`));
fix("config.js", (s) => s.replace(/site: "[^"]*"/, `site: "${base}"`));
console.log("Domínio definido:", base);
