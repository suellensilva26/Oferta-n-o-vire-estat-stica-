# Entregáveis · Kit Não Vire Estatística (28/10/2026)

- **App (PWA)**: https://painel-blindagem.vercel.app  (pasta `app/`). Entrega por link secreto (ver CAKTO-ENTREGA.md).
- **Arquivos dos clientes**: `app/f/<código>/` (PDF, XLSX, DOCX) e cópias em `arquivos/`.
- **Fontes do conteúdo**: `build/` (data.js → nve.json; gen/*.py gera HTML/PDF/XLSX/DOCX).
  - Regenerar: `cd build/gen && python3 guias.py && python3 docs2.py && python3 xlsx.py && python3 docx_gen.py`, depois `node /workspace/pwtest/pdf.mjs` e `python3 build/place.py`.
- **Atualizar a alíquota da CBS após 15/12/2026**: `app/assets/data.js` (padrões do simulador), `build/gen/base.py`/`guias.py` e células B4 das planilhas.
- Screenshots do teste mobile: `/workspace/entregaveis-shots/`.
