/* Páginas de upsell e downsell: botões da Cakto (1 clique) ou links de plano B do config.js */
(function () {
  "use strict";
  var N = window.NVE, CFG = N.CFG;
  var kind = document.body.getAttribute("data-offer");
  var conf = CFG[kind] || {};
  var here = {}; new URLSearchParams(location.search).forEach(function (v, k) { here[k] = v; });
  function carry(base) { return base ? N.withParams(base, Object.assign({}, N.trackingParams(), here)) : ""; }

  var slot = document.getElementById("cakto-slot");
  var accept = document.getElementById("accept");
  var decline = document.getElementById("decline");
  var notice = document.getElementById("notice");
  var price = Number(conf.preco || 0);

  N.track("ViewContent", { value: price, currency: "BRL", content_name: kind, content_category: "pos_compra" });

  if (conf.caktoHtml && conf.caktoHtml.trim()) {
    N.injectHtml(slot, conf.caktoHtml);
    slot.classList.remove("hidden");
    accept.classList.add("hidden");
    if (conf.esconderRecusarSeCakto) decline.classList.add("hidden");
  } else if (conf.aceitarUrl) {
    accept.href = carry(conf.aceitarUrl);
  } else {
    accept.href = "#";
    accept.addEventListener("click", function (e) { e.preventDefault(); notice.classList.remove("hidden"); });
  }
  decline.href = carry(conf.recusarUrl || "obrigado.html");
})();
