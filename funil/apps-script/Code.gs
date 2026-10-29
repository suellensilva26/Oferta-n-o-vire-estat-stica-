/**
 * Webhook gratuito do funil "Não Vire Estatística" (Google Apps Script)
 *  - type "lead": grava o lead na aba "Leads" da planilha
 *  - type "capi": repassa o evento para a API de Conversões da Meta (opcional)
 *
 * Instalação (resumo; passo a passo no README):
 * 1. Crie uma Planilha Google > Extensões > Apps Script > cole este arquivo.
 * 2. (Opcional, CAPI) Configurações do projeto > Propriedades do script:
 *      META_CAPI_TOKEN = token gerado no Gerenciador de Eventos
 *      META_PIXEL_ID   = ID do pixel (deve ser o mesmo do config.js)
 * 3. Implantar > Nova implantação > Tipo "App da Web" >
 *      Executar como: Eu · Quem pode acessar: Qualquer pessoa > Implantar.
 * 4. Copie a URL que termina em /exec e cole em config.js -> webhook.url
 *    (e, se usar CAPI, também em meta.capiEndpoint).
 */
var SHEET_NAME = "Leads";
var GRAPH_VERSION = "v26.0";
var COLS = ["criadoEm","id","nome","email","whatsapp","empresa","uf","segmentoLabel","outroTipo","faturamentoLabel","regimeLabel","dorLabel","vsl","leadQuente","consentimentoDiagnostico","consentimentoContato","consentimentoTexto","utm_source","utm_medium","utm_campaign","utm_content","utm_term","fbclid","src","pagina","userAgent","recebidoEm"];

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (data.type === "lead") return json(saveLead_(data));
    if (data.type === "capi") return json(sendCapi_(data));
    return json({ ok: false, error: "type desconhecido" });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() { return json({ ok: true, servico: "funil-nao-vire-estatistica" }); }

function saveLead_(d) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) sh.appendRow(COLS);
    d.recebidoEm = new Date().toISOString();
    // evita duplicar o mesmo lead (sendBeacon + retry)
    var ids = sh.getLastRow() > 1 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getValues().map(function (r) { return r[0]; }) : [];
    if (d.id && ids.indexOf(d.id) >= 0) return { ok: true, duplicado: true };
    sh.appendRow(COLS.map(function (c) { var v = d[c]; return v === undefined ? "" : (c === "whatsapp" ? "'" + v : v); }));
    return { ok: true };
  } finally { lock.releaseLock(); }
}

function sendCapi_(d) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty("META_CAPI_TOKEN");
  var pixel = props.getProperty("META_PIXEL_ID") || d.pixel_id;
  if (!token || !pixel) return { ok: false, error: "CAPI não configurada" };
  if (String(pixel) !== String(d.pixel_id)) return { ok: false, error: "pixel diferente" };
  var payload = { data: JSON.stringify([d.event]) };
  if (d.test_event_code) payload.test_event_code = d.test_event_code;
  var res = UrlFetchApp.fetch("https://graph.facebook.com/" + GRAPH_VERSION + "/" + pixel + "/events?access_token=" + encodeURIComponent(token), {
    method: "post", payload: payload, muteHttpExceptions: true
  });
  return { ok: res.getResponseCode() === 200, status: res.getResponseCode() };
}

function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
