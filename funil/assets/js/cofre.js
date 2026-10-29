/* Cofre do Empresário: cupom real para quem concluiu o diagnóstico. Sem sorteio. */
(function () {
  var N = window.NVE || {}, CFG = window.FUNIL_CONFIG || {}, cf = CFG.cofre;
  if (!cf || !cf.ativo) return;
  var lead = N.getLead ? N.getLead() : null;
  var box = document.querySelector("#oferta .price-box"); if (!box) return;
  var st = document.createElement("style");
  st.textContent = ".cofre{margin:18px 0;padding:22px;border-radius:18px;background:linear-gradient(145deg,#141a24,#0b0f16);border:1px solid rgba(212,175,55,.45);text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.4)}" +
    ".cofre .door{width:96px;height:96px;margin:0 auto 12px;border-radius:50%;border:6px solid #d4af37;display:flex;align-items:center;justify-content:center;font-size:40px;transition:transform 1.4s cubic-bezier(.2,.8,.2,1)}" +
    ".cofre.open .door{transform:rotate(540deg);background:rgba(212,175,55,.15)}.cofre h3{margin:4px 0;color:#f3d77a;font-size:20px}" +
    ".cofre .code{display:inline-block;margin:10px 0;padding:8px 16px;border:2px dashed #d4af37;border-radius:10px;font:700 20px monospace;letter-spacing:2px;color:#fff;opacity:0;transition:opacity .6s .9s}.cofre.open .code{opacity:1}" +
    ".cofre .old{text-decoration:line-through;opacity:.6}.cofre p{margin:6px 0;color:#c9d1dc;font-size:15px}.cofre a{color:#f3d77a}";
  document.head.appendChild(st);
  var d = document.createElement("div"); d.className = "cofre";
  function setPrice(v) { document.querySelectorAll('[data-cfg="produto.precoFront"]').forEach(function (e) { e.textContent = v; }); }
  if (lead) {
    var nicho = lead.segmentoLabel ? " para " + lead.segmentoLabel : "";
    d.innerHTML = '<div class="door">🔒</div><h3>Cofre do Empresário</h3><p>' + (lead.nome ? String(lead.nome).split(" ")[0].replace(/[<>&]/g, "") + ", v" : "V") +
      "ocê concluiu o diagnóstico" + nicho.replace(/[<>&]/g, "") + ". Isso libera o seu cupom:</p>" +
      '<div class="code">' + cf.cupomCodigo + '</div><p>De <span class="old">R$ ' + cf.precoLista + "</span> por <b>R$ " + cf.precoCupom + "</b>. O cupom já vai aplicado no checkout.</p>";
    setPrice(cf.precoCupom);
    var io = "IntersectionObserver" in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { open(); io.disconnect(); } }); }, { threshold: .5 }) : null;
    function open() { d.classList.add("open"); setTimeout(function () { d.querySelector(".door").textContent = "🔓"; }, 900); }
    if (io) io.observe(d); else open();
  } else {
    setPrice(cf.precoLista);
    d.innerHTML = '<div class="door">🔒</div><h3>Cofre do Empresário</h3><p>Quem faz o diagnóstico gratuito (2 minutos) desbloqueia um cupom que reduz o kit de R$ ' + cf.precoLista + " para R$ " + cf.precoCupom + '.</p><p><a href="index.html">Fazer o diagnóstico e liberar o cupom →</a></p>';
  }
  box.parentNode.insertBefore(d, box);
})();
