/* Funções compartilhadas: rastreio (UTMs), lead, Meta Pixel/CAPI, links e rodapé */
(function () {
  "use strict";
  var CFG = window.FUNIL_CONFIG || {};
  var LS_LEAD = "nve_lead", LS_UTM = "nve_utm", LS_LEADS = "nve_leads";
  var TRACK_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id", "fbclid", "gclid", "src", "sck"];
  var LEAD_URL_KEYS = ["seg", "segmento", "fat", "regime", "dor", "uf", "lid", "fn"];

  function safeParse(v, d) { try { return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function lsGet(k, d) { try { return safeParse(localStorage.getItem(k), d); } catch (e) { return d; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function qs() { return new URLSearchParams(location.search); }
  function digits(s) { return String(s || "").replace(/\D+/g, ""); }
  function getPath(obj, path) { return path.split(".").reduce(function (o, k) { return o && o[k] !== undefined ? o[k] : undefined; }, obj); }

  /* ---------- UTMs e parâmetros de rastreio ---------- */
  function captureTracking() {
    var p = qs(), found = {}, any = false;
    TRACK_KEYS.forEach(function (k) { var v = p.get(k); if (v) { found[k] = v; any = true; } });
    var saved = lsGet(LS_UTM, {});
    if (any) { saved = Object.assign({}, saved, found, { _ts: Date.now() }); lsSet(LS_UTM, saved); }
    if (found.fbclid && !getCookie("_fbc")) setCookie("_fbc", "fb.1." + Date.now() + "." + found.fbclid, 90);
    return saved;
  }
  function trackingParams() {
    var t = lsGet(LS_UTM, {}), out = {};
    TRACK_KEYS.forEach(function (k) { if (t[k]) out[k] = t[k]; });
    return out;
  }
  function getCookie(n) { var m = document.cookie.match(new RegExp("(?:^|; )" + n + "=([^;]*)")); return m ? decodeURIComponent(m[1]) : ""; }
  function setCookie(n, v, days) {
    var d = new Date(); d.setTime(d.getTime() + days * 864e5);
    document.cookie = n + "=" + encodeURIComponent(v) + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  }

  /* ---------- Lead ---------- */
  function getLead() { return lsGet(LS_LEAD, null); }
  function saveLead(lead) {
    lsSet(LS_LEAD, lead);
    var all = lsGet(LS_LEADS, []); all.push(lead); lsSet(LS_LEADS, all.slice(-50));
  }
  function uid() { return "L" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  /* ---------- Envio sem bloquear (webhook / CAPI) ---------- */
  function postJSON(url, data) {
    if (!url) return Promise.resolve(false);
    var body = JSON.stringify(data);
    try {
      if (navigator.sendBeacon && navigator.sendBeacon(url, new Blob([body], { type: "text/plain;charset=UTF-8" }))) return Promise.resolve(true);
    } catch (e) {}
    return fetch(url, { method: "POST", mode: "no-cors", keepalive: true, headers: { "Content-Type": "text/plain;charset=UTF-8" }, body: body })
      .then(function () { return true; }).catch(function () { return false; });
  }

  /* ---------- Meta Pixel + Conversions API ---------- */
  var pixelOn = !!(CFG.meta && CFG.meta.pixelId);
  function initPixel() {
    if (!pixelOn) return;
    /* eslint-disable */
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
    var lead = getLead(), am = {};
    if (lead) { if (lead.email) am.em = lead.email.trim().toLowerCase(); if (lead.whatsapp) am.ph = "55" + digits(lead.whatsapp); if (lead.nome) am.fn = lead.nome.trim().split(/\s+/)[0].toLowerCase(); if (lead.uf) am.st = lead.uf.toLowerCase(); am.country = "br"; am.external_id = lead.id; }
    window.fbq("init", CFG.meta.pixelId, am);
  }
  function sha256(str) {
    if (!str || !(window.crypto && crypto.subtle && window.TextEncoder)) return Promise.resolve(undefined);
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return ("0" + b.toString(16)).slice(-2); }).join("");
    });
  }
  function sendCapi(name, eventId, custom) {
    var endpoint = CFG.meta && CFG.meta.capiEndpoint;
    if (!endpoint || !pixelOn) return;
    var lead = getLead() || {};
    Promise.all([
      sha256(lead.email && lead.email.trim().toLowerCase()),
      sha256(lead.whatsapp && "55" + digits(lead.whatsapp)),
      sha256(lead.nome && lead.nome.trim().split(/\s+/)[0].toLowerCase()),
      sha256(lead.uf && lead.uf.toLowerCase()),
      sha256("br"),
      sha256(lead.id)
    ]).then(function (h) {
      var ud = { client_user_agent: navigator.userAgent, fbp: getCookie("_fbp") || undefined, fbc: getCookie("_fbc") || undefined };
      if (h[0]) ud.em = [h[0]]; if (h[1]) ud.ph = [h[1]]; if (h[2]) ud.fn = [h[2]]; if (h[3]) ud.st = [h[3]]; if (h[4]) ud.country = [h[4]]; if (h[5]) ud.external_id = [h[5]];
      postJSON(endpoint, {
        type: "capi",
        pixel_id: CFG.meta.pixelId,
        test_event_code: CFG.meta.testEventCode || undefined,
        event: { event_name: name, event_time: Math.floor(Date.now() / 1000), event_id: eventId, action_source: "website", event_source_url: location.origin + location.pathname, user_data: ud, custom_data: custom || {} }
      });
    });
  }
  function track(name, custom) {
    var eventId = name.toLowerCase() + "." + Date.now() + "." + Math.random().toString(36).slice(2, 8);
    if (window.NVE_DEBUG_EVENTS) window.NVE_DEBUG_EVENTS.push({ name: name, eventId: eventId, custom: custom || {} });
    if (pixelOn && window.fbq) window.fbq("track", name, custom || {}, { eventID: eventId });
    sendCapi(name, eventId, custom);
    return eventId;
  }

  /* ---------- Utmify (opcional) ---------- */
  function initUtmify() {
    var u = CFG.utmify || {};
    if (u.scriptUtms && u.scriptUtmsUrl) {
      var s = document.createElement("script");
      s.src = u.scriptUtmsUrl; s.async = true; s.defer = true;
      s.setAttribute("data-utmify-prevent-xcod-sck", ""); s.setAttribute("data-utmify-prevent-subids", "");
      document.head.appendChild(s);
    }
    if (u.pixelId) {
      window.pixelId = u.pixelId;
      var a = document.createElement("script");
      a.async = true; a.defer = true; a.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
      document.head.appendChild(a);
    }
  }

  /* Insere o HTML gerado pela Cakto (Gerador de Upsell) e executa os scripts dele */
  function injectHtml(el, html) {
    el.innerHTML = html;
    el.querySelectorAll("script").forEach(function (old) {
      var s = document.createElement("script");
      Array.prototype.forEach.call(old.attributes, function (at) { s.setAttribute(at.name, at.value); });
      s.text = old.textContent;
      old.parentNode.replaceChild(s, old);
    });
  }

  /* ---------- Links ---------- */
  function withParams(base, params) {
    var hash = "", i = base.indexOf("#");
    if (i >= 0) { hash = base.slice(i); base = base.slice(0, i); }
    var u = new URL(base, location.href);
    Object.keys(params).forEach(function (k) { var v = params[k]; if (v !== undefined && v !== null && v !== "" && !u.searchParams.has(k)) u.searchParams.set(k, v); });
    var out = u.toString();
    if (/^https?:/i.test(base)) return out + hash;
    return u.pathname.split("/").pop() + u.search + hash;
  }
  function leadUrlParams() {
    var p = qs(), out = {};
    LEAD_URL_KEYS.forEach(function (k) { if (p.get(k)) out[k] = p.get(k); });
    return out;
  }
  function checkoutUrl(seg) {
    var base = CFG.checkout && CFG.checkout[seg];
    var t = trackingParams();
    if (!base) return withParams("checkout-pendente.html", Object.assign({ seg: seg }, t));
    var params = Object.assign({}, t);
    if (!params.src && t.utm_source) params.src = [t.utm_source, t.utm_campaign, t.utm_content].filter(Boolean).join("|").slice(0, 250);
    var lead = getLead(), pf = CFG.preencherCheckout || {};
    if (lead && pf.ativo && pf.plataforma && pf.plataforma !== "nenhum") {
      var ph = digits(lead.whatsapp);
      params.name = lead.nome; params.email = lead.email;
      if (pf.plataforma === "hotmart") { params.phoneac = ph.slice(0, 2); params.phonenumber = ph.slice(2); }
      else if (pf.plataforma === "kiwify") { params.phone = ph; params.region = "br"; }
      else { params.confirmEmail = lead.email; params.phone = "55" + ph; } /* cakto */
    }
    return withParams(base, params);
  }
  function nextUrl(base) {
    if (!base) return "";
    return withParams(base, Object.assign({}, trackingParams(), leadUrlParams()));
  }
  function wa(num, text) { return "https://wa.me/" + digits(num) + (text ? "?text=" + encodeURIComponent(text) : ""); }

  /* ---------- Preenche textos vindos do config ---------- */
  /* valores entre colchetes no config.js ("[CNPJ]") são modelos e não aparecem para o visitante */
  var DEFAULTS = { "empresa.nome": "Connect Mídia" };
  function isPlaceholder(v) { return v === undefined || v === null || v === "" || (typeof v === "string" && v.trim().charAt(0) === "["); }
  function cfgText(key) { var v = getPath(CFG, key); return isPlaceholder(v) ? (DEFAULTS[key] || "") : String(v); }
  function fillConfigText(root) {
    (root || document).querySelectorAll("[data-cfg]").forEach(function (el) {
      var key = el.getAttribute("data-cfg"), v = getPath(CFG, key);
      if (isPlaceholder(v)) v = DEFAULTS[key];
      if (v !== undefined && v !== "" && v !== null) el.textContent = v;
    });
  }

  function renderFooter() {
    var f = document.getElementById("site-footer");
    if (!f) return;
    var e = CFG.empresa || {}, y = new Date().getFullYear();
    f.innerHTML =
      '<div class="wrap footer-inner">' +
      '<nav class="footer-links"><a href="privacidade.html">Política de Privacidade</a><a href="termos.html">Termos de Uso</a>' +
      (e.email && e.email.indexOf("[") !== 0 ? '<a href="mailto:' + e.email + '">Contato</a>' : '') + '</nav>' +
      '<p>Conteúdo educativo. Não substitui a orientação do seu contador ou advogado. Resultados dependem da aplicação de cada empresa.</p>' +
      '<p>Este site não faz parte do Facebook, do Instagram ou da Meta Platforms, Inc., nem é endossado por eles.</p>' +
      '<p class="footer-legal">' + cfgText("empresa.nome") + (cfgText("empresa.cnpj") ? ' · CNPJ ' + cfgText("empresa.cnpj") : '') + ' · © ' + y + '</p>' +
      '</div>';
  }

  function onReady(fn) { if (document.readyState !== "loading") fn(); else document.addEventListener("DOMContentLoaded", fn); }

  captureTracking();
  initPixel();
  initUtmify();
  onReady(function () {
    renderFooter();
    fillConfigText();
    if (!document.body.hasAttribute("data-no-pageview")) track("PageView");
  });

  window.NVE = {
    CFG: CFG, getLead: getLead, saveLead: saveLead, uid: uid, digits: digits, track: track, postJSON: postJSON,
    trackingParams: trackingParams, withParams: withParams, checkoutUrl: checkoutUrl, nextUrl: nextUrl,
    leadUrlParams: leadUrlParams, cfgText: cfgText, wa: wa, injectHtml: injectHtml, onReady: onReady, lsGet: lsGet, lsSet: lsSet
  };
})();
