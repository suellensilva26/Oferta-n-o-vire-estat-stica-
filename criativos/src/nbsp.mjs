// Keep currency with its number and numbers with their units (non-breaking space U+00A0)
export const nb = s => s
  .replace(/R\$[ \t]+/g, 'R$\u00A0')
  .replace(/US\$[ \t]+/g, 'US$\u00A0')
  .replace(/(\d[\d.,]*)[ \t]+(bi|mi|bilhões|milhões|bilhão|milhão|mil|semanas|lojas|empresas|%)(?=[\s*.,:;!?)<]|$)/g, '$1\u00A0$2');
