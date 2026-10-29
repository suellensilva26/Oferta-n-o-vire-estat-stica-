/* VSL: player (Panda Video, YouTube ou outro), revelação do CTA no tempo do pitch e botão do checkout */
(function () {
  "use strict";
  var N = window.NVE, CFG = N.CFG;
  var seg = document.body.getAttribute("data-vsl");
  var conf = (CFG.vsl && CFG.vsl[seg]) || {};
  var ctaAt = Number(conf.ctaSegundos) || 0;
  var price = Number((CFG.produto && CFG.produto.precoFront) || 37);
  var LS_KEY = "nve_cta_" + seg;
  var revealed = false;
  var p = new URLSearchParams(location.search);
  /* testes: ?revelar=1 mostra o estado depois do pitch; ?revelar=0 mostra o estado antes (e esquece o "já viu") */
  var preview = p.get("revelar") === "1" || p.get("cta") === "1";
  if (p.get("revelar") === "0") { try { localStorage.removeItem(LS_KEY); } catch (x) {} }

  /* personalização simples pelo primeiro nome (vem do quiz) */
  var fn = p.get("fn") || ((N.getLead() || {}).nome || "").split(/\s+/)[0];
  var eb = document.getElementById("eyebrow");
  if (fn && eb && eb.getAttribute("data-fn")) {
    fn = fn.replace(/[<>]/g, "").slice(0, 30);
    eb.textContent = eb.getAttribute("data-fn").replace("{fn}", fn.charAt(0).toUpperCase() + fn.slice(1));
  }

  function reveal() {
    if (revealed) return; revealed = true;
    document.querySelectorAll(".after-cta").forEach(function (el) { el.classList.remove("hidden"); el.classList.add("reveal"); });
    var w = document.getElementById("cta-wait"); if (w) w.classList.add("hidden");
    document.body.classList.add("revealed", "has-sticky");
    if (CFG.lembrarCtaRevelado && !preview) N.lsSet(LS_KEY, 1);
    initSticky();
  }
  /* CTA fixo no rodapé: aparece quando o botão principal sai da tela */
  function initSticky() {
    var st = document.getElementById("sticky"), top = document.getElementById("cta-top");
    if (!st || !top) return;
    function upd() { st.classList.toggle("on", top.getBoundingClientRect().bottom < 0); }
    window.addEventListener("scroll", upd, { passive: true }); upd();
  }
  window.NVE_REVEAL = reveal;

  /* clique no CTA -> evento + checkout com UTMs */
  document.querySelectorAll(".js-cta").forEach(function (b) {
    b.addEventListener("click", function () {
      var ev = (CFG.meta && CFG.meta.eventoCliqueCta) || "InitiateCheckout";
      N.track(ev, { value: price, currency: "BRL", content_name: "Kit Não Vire Estatística " + seg, content_category: "vsl_" + seg });
      var url = N.checkoutUrl(seg);
      window.NVE_LAST_CHECKOUT = url;
      setTimeout(function () { location.href = url; }, 250);
    });
  });

  /* ViewContent ao abrir a VSL */
  N.track("ViewContent", { value: price, currency: "BRL", content_name: "VSL " + seg, content_category: "vsl_" + seg });

  /* já viu o pitch antes, ou ?cta=1 para testar */
  if (preview || (p.get("revelar") !== "0" && CFG.lembrarCtaRevelado && N.lsGet(LS_KEY, 0))) reveal();

  /* player */
  var shell = document.getElementById("video");
  var url = (conf.embedUrl || "").trim();
  if (!url) {
    var admin = p.get("admin") === "1";
    shell.innerHTML = '<div class="video-placeholder"><div><div class="play"></div><b>' + (admin ? "Vídeo da VSL " + seg : "O vídeo está chegando") + '</b><div class="small" style="opacity:.8;margin-top:6px">' +
      (admin ? "Cole o link de embed em config.js → vsl." + seg + ".embedUrl" : "Volte em alguns minutos para assistir.") + '</div></div></div>';
    if (CFG.ctaImediatoSemVideo) reveal();
    else startPageTimer();
    return;
  }

  var isYT = /youtube\.com|youtu\.be/.test(url);
  var isPanda = /pandavideo/.test(url);
  if (isYT) {
    var id = (url.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/) || [])[1];
    if (id) url = "https://www.youtube.com/embed/" + id + "?enablejsapi=1&rel=0&modestbranding=1&playsinline=1&origin=" + encodeURIComponent(location.origin);
  }
  var ifr = document.createElement("iframe");
  ifr.id = "vsl-player"; ifr.src = url; ifr.title = "Vídeo da análise";
  ifr.setAttribute("allow", "accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen");
  ifr.setAttribute("allowfullscreen", "true"); ifr.setAttribute("fetchpriority", "high");
  shell.appendChild(ifr);

  if (!ctaAt) { reveal(); return; }

  if (isPanda) {
    /* Panda Video envia "panda_timeupdate" com currentTime por postMessage */
    window.addEventListener("message", function (e) {
      var d = e.data; if (typeof d === "string") { try { d = JSON.parse(d); } catch (x) { return; } }
      if (d && d.message === "panda_timeupdate" && !d.isMutedIndicator && Number(d.currentTime) >= ctaAt) reveal();
    });
  } else if (isYT) {
    window.onYouTubeIframeAPIReady = function () {
      var pl = new window.YT.Player("vsl-player", { events: { onReady: function () {
        var t = setInterval(function () { try { if (pl.getCurrentTime() >= ctaAt) { reveal(); clearInterval(t); } } catch (x) {} }, 1000);
      } } });
    };
    var s = document.createElement("script"); s.src = "https://www.youtube.com/iframe_api"; document.head.appendChild(s);
  } else {
    startPageTimer();
  }

  /* plano B: conta o tempo com a página aberta e visível */
  function startPageTimer() {
    var elapsed = 0;
    var t = setInterval(function () {
      if (document.visibilityState === "visible") elapsed++;
      if (elapsed >= ctaAt) { reveal(); clearInterval(t); }
    }, 1000);
  }
})();

(function(){var s=document.createElement("script");s.src="assets/js/cofre.js";document.body.appendChild(s);})();
