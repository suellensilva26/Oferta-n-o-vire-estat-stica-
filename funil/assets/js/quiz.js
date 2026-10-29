/* Quiz: uma pergunta por tela, validação, salvamento do lead e roteamento para a VSL */
(function () {
  "use strict";
  var N = window.NVE, CFG = N.CFG;
  var steps = Array.prototype.slice.call(document.querySelectorAll(".step"));
  var answers = {}, labels = {}, history = [], current = 0;
  var bar = document.getElementById("bar"), barLabel = document.getElementById("bar-label"), backBtn = document.getElementById("back");

  var DDDS = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99];

  var FACTS = {
    A: { text: "Em 2025, 535 empresas do comércio entraram em recuperação judicial no Brasil, dentro de um recorde de 2.466 empresas.", src: "Fonte: Serasa Experian, via Poder360 (07/04/2026)." },
    B: { text: "Em agosto de 2026, o Brasil tinha 9,3 milhões de empresas inadimplentes, recorde. 56% delas são de serviços.", src: "Fonte: Serasa Experian, via CNN Brasil (10/2026)." },
    C: { text: "Em 2025, o agro foi o setor com mais empresas em recuperação judicial (743), seguido de perto pela indústria (449), dentro de um recorde de 2.466.", src: "Fonte: Serasa Experian, via Poder360 (07/04/2026)." }
  };

  function visible(step) {
    var cond = step.getAttribute("data-if");
    if (!cond) return true;
    var kv = cond.split("=");
    return answers[kv[0]] === kv[1];
  }
  function questionSteps() { return steps.filter(function (s) { return s.getAttribute("data-type") !== "result" && visible(s); }); }

  function show(i) {
    steps.forEach(function (s) { s.classList.remove("active"); });
    var s = steps[i]; s.classList.add("active"); current = i;
    document.body.classList.toggle("first-step", i === 0);
    var qs = questionSteps(), type = s.getAttribute("data-type");
    var pos = qs.indexOf(s);
    if (type === "result") { bar.style.width = "100%"; barLabel.textContent = "Concluído"; backBtn.hidden = true; }
    else {
      bar.style.width = Math.round((pos / qs.length) * 100) + "%";
      barLabel.textContent = "Pergunta " + (pos + 1) + " de " + qs.length;
      backBtn.hidden = history.length === 0;
    }
    var inp = s.querySelector("input,select");
    if (inp && window.matchMedia("(min-width: 700px)").matches) setTimeout(function () { inp.focus(); }, 50);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function nextIndex(from) {
    for (var i = from + 1; i < steps.length; i++) if (visible(steps[i])) return i;
    return -1;
  }
  function advance() { var n = nextIndex(current); if (n >= 0) { history.push(current); show(n); } }

  /* opções de múltipla escolha: avança sozinho */
  steps.forEach(function (s) {
    var key = s.getAttribute("data-step");
    s.querySelectorAll(".opt").forEach(function (b) {
      b.addEventListener("click", function () {
        s.querySelectorAll(".opt").forEach(function (o) { o.classList.remove("selected"); });
        b.classList.add("selected");
        answers[key] = b.getAttribute("data-value");
        labels[key] = b.getAttribute("data-label");
        if (key === "segmento" && answers.segmento !== "outro") { delete answers.outroTipo; delete labels.outroTipo; }
        setTimeout(advance, 180);
      });
    });
  });

  /* campos */
  function setErr(field, msg) {
    var f = field.closest(".field"); if (!f) return;
    f.classList.toggle("invalid", !!msg);
    f.querySelector(".err").textContent = msg || "";
  }
  function maskPhone(v) {
    var d = N.digits(v).replace(/^55(?=\d{10,11}$)/, "").slice(0, 11);
    if (d.length <= 2) return d.length ? "(" + d : "";
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }
  function validPhone(v) {
    var d = N.digits(v);
    if (d.length !== 10 && d.length !== 11) return "Digite o número com DDD, ex.: (11) 91234-5678.";
    if (DDDS.indexOf(parseInt(d.slice(0, 2), 10)) < 0) return "Esse DDD não existe. Confira o número.";
    if (d.length === 11 && d[2] !== "9") return "Celular com 11 dígitos começa com 9 depois do DDD.";
    if (/^(\d)\1+$/.test(d.slice(2))) return "Confira o número digitado.";
    return "";
  }
  /* ---------- e-mail: mensagens claras e sugestão de correção ---------- */
  var DOMAINS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "yahoo.com.br", "icloud.com", "live.com", "uol.com.br", "bol.com.br", "terra.com.br", "hotmail.com.br", "outlook.com.br", "msn.com", "me.com", "globo.com", "ig.com.br"];
  var PROVIDERS = ["gmail", "hotmail", "outlook", "yahoo", "icloud", "live", "uol", "bol", "terra", "msn"];
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function fixDomain(dom) {
    if (DOMAINS.indexOf(dom) >= 0) return "";
    var t = dom.replace(/\.(con|cmo|cm|co|comm|om|vom|xom|c0m)$/, ".com").replace(/\.com\.(bt|r|brr)$/, ".com.br").replace(/\.combr$/, ".com.br").replace(/,/g, ".");
    var best = "", bestD = 3;
    DOMAINS.forEach(function (d) { var x = lev(t, d); if (x < bestD && x <= (d.length >= 9 ? 2 : 1)) { bestD = x; best = d; } });
    if (best) return best;
    return t !== dom && /\.[a-z]{2,}$/.test(t) ? t : "";
  }
  /* devolve {msg, sugestao} */
  function emailCheck(raw) {
    var v = (raw || "").trim().toLowerCase();
    if (!v) return { msg: "Digite seu e-mail, ex.: seunome@gmail.com" };
    if (/\s/.test(v)) return { msg: "Tire os espaços do e-mail, ex.: seunome@gmail.com", sugestao: v.replace(/\s+/g, "") };
    var at = (v.match(/@/g) || []).length;
    if (at === 0) {
      var m = v.match(new RegExp("^(.+?)[.\\-_]?(" + PROVIDERS.join("|") + ")(\\..+)$"));
      if (m && m[1]) { var dom = m[2] + m[3]; var sug = m[1] + "@" + (fixDomain(dom) || dom); return { msg: "Faltou o @ no e-mail.", sugestao: sug }; }
      return { msg: "Faltou o @, ex.: seunome@gmail.com" };
    }
    if (at > 1) return { msg: "O e-mail tem mais de um @. Confira, ex.: seunome@gmail.com" };
    var parts = v.split("@"), user = parts[0], domain = parts[1];
    if (!user) return { msg: "Falta o seu nome antes do @, ex.: seunome@gmail.com" };
    if (!domain) return { msg: "Falta o final depois do @, ex.: @gmail.com ou @hotmail.com" };
    if (domain.indexOf(".") < 0) {
      var guess = fixDomain(domain + ".com");
      return { msg: "Faltou o final do e-mail (.com).", sugestao: user + "@" + (guess || domain + ".com") };
    }
    if (!/^[a-z0-9._%+'-]+$/i.test(user) || !/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(domain) || /\.\./.test(v))
      return { msg: "Esse e-mail parece ter algum caractere errado. Confira, ex.: seunome@gmail.com" };
    var f = fixDomain(domain);
    if (f && f !== domain) return { msg: "", sugestao: user + "@" + f, aviso: true };
    return { msg: "" };
  }

  var validators = {
    uf: function (v) { return v ? "" : "Selecione o estado."; },
    empresa: function (v) { return v.trim().length >= 2 ? "" : "Digite o nome da empresa."; },
    nome: function (v) { return v.trim().length >= 2 && /[A-Za-zÀ-ÿ]/.test(v) ? "" : "Digite seu nome."; },
    email: function (v) { return emailCheck(v).msg; },
    whatsapp: validPhone
  };
  var phone = document.getElementById("f-whatsapp");
  phone.addEventListener("input", function () { phone.value = maskPhone(phone.value); if (phone.closest(".field").classList.contains("invalid")) setErr(phone, validPhone(phone.value)); });

  var emailInp = document.getElementById("f-email"), sugBox = null, sugIgnorada = "";
  function showSuggestion(sug, aviso) {
    var f = emailInp.closest(".field");
    if (!sugBox) { sugBox = document.createElement("div"); sugBox.className = "suggest"; sugBox.setAttribute("aria-live", "polite"); f.appendChild(sugBox); }
    sugBox.innerHTML = "";
    var t = document.createElement("span"); t.textContent = "Você quis dizer " + sug + "?";
    var b = document.createElement("button"); b.type = "button"; b.textContent = "Sim, corrigir";
    b.addEventListener("click", function () { emailInp.value = sug; hideSuggestion(); setErr(emailInp, ""); });
    sugBox.appendChild(t); sugBox.appendChild(b); sugBox.hidden = false;
  }
  function hideSuggestion() { if (sugBox) sugBox.hidden = true; }
  emailInp.addEventListener("input", function () { hideSuggestion(); if (emailInp.closest(".field").classList.contains("invalid")) setErr(emailInp, ""); });

  function commitField(s) {
    var key = s.getAttribute("data-step"), inp = s.querySelector("input,select");
    if (key === "email") {
      var r = emailCheck(inp.value), val = inp.value.trim().toLowerCase();
      setErr(inp, r.msg);
      if (r.msg) { if (r.sugestao) showSuggestion(r.sugestao, false); else hideSuggestion(); inp.focus(); return false; }
      /* sugestão de digitação (ex.: gmial.com): avisa uma vez; se tocar em Continuar de novo, aceita como está */
      if (r.aviso && sugIgnorada !== val) { sugIgnorada = val; showSuggestion(r.sugestao, true); return false; }
      hideSuggestion(); inp.value = val; answers.email = val; labels.email = val; return true;
    }
    var msg = validators[key](inp.value);
    setErr(inp, msg);
    if (msg) { inp.focus(); return false; }
    answers[key] = inp.value.trim(); labels[key] = answers[key];
    return true;
  }
  steps.forEach(function (s) {
    var btn = s.querySelector(".next"); if (!btn) return;
    btn.addEventListener("click", function () { if (commitField(s)) advance(); });
    var inp = s.querySelector("input,select");
    if (inp) inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); btn.click(); } });
    if (inp && inp.tagName === "SELECT") inp.addEventListener("change", function () { if (inp.value) btn.click(); });
  });

  backBtn.addEventListener("click", function () { if (history.length) show(history.pop()); });

  /* roteamento */
  function route(a) {
    if (a.segmento === "comercio" || a.segmento === "alimentacao") return "A";
    if (a.segmento === "servicos") return "B";
    if (a.segmento === "industria" || a.segmento === "agro_b2b") return "C";
    if (a.outroTipo === "consumidor") return "A";
    if (a.outroTipo === "servico") return "B";
    return "C";
  }

  var submitting = false;
  document.getElementById("submit").addEventListener("click", function () {
    if (submitting) return;
    var s = document.querySelector('[data-step="whatsapp"]');
    var ok = commitField(s);
    var diag = document.getElementById("c-diag").checked;
    document.getElementById("consent-err").textContent = diag ? "" : "Marque a caixinha acima para receber seu diagnóstico.";
    if (!ok || !diag) return;
    submitting = true;

    var seg = route(answers);
    var hot = ["100a400k", "400ka1_5m", "acima1_5m"].indexOf(answers.faturamento) >= 0 && (answers.regime === "presumido" || answers.regime === "real");
    var lead = {
      id: N.uid(), criadoEm: new Date().toISOString(),
      vsl: seg, segmento: answers.segmento, segmentoLabel: labels.segmento, outroTipo: answers.outroTipo || "",
      faturamento: answers.faturamento, faturamentoLabel: labels.faturamento,
      regime: answers.regime, regimeLabel: labels.regime, dor: answers.dor, dorLabel: labels.dor,
      uf: answers.uf, empresa: answers.empresa, nome: answers.nome, email: answers.email.toLowerCase(),
      whatsapp: N.digits(answers.whatsapp), consentimentoDiagnostico: true,
      consentimentoContato: true,
      consentimentoTexto: (document.querySelector('label.check span') || {}).textContent || "",
      leadQuente: hot, pagina: location.href.split("?")[0], userAgent: navigator.userAgent
    };
    lead = Object.assign(lead, N.trackingParams());
    N.saveLead(lead);
    var whUrl = CFG.webhook && CFG.webhook.url;
    if (whUrl) N.postJSON(whUrl, Object.assign({ type: "lead" }, lead));
    N.track("Lead", { content_category: "vsl_" + seg, content_name: "quiz_diagnostico" });

    var params = Object.assign({
      seg: seg, segmento: answers.segmento, fat: answers.faturamento, regime: answers.regime,
      dor: answers.dor, uf: answers.uf, lid: lead.id, fn: lead.nome.split(/\s+/)[0]
    }, N.trackingParams());
    if (CFG.passarContatoNaUrl) { params.email = lead.email; params.wa = lead.whatsapp; params.empresa = lead.empresa; }
    var url = N.withParams("vsl-" + seg.toLowerCase() + ".html", params);

    document.getElementById("r-nome").textContent = lead.nome.split(/\s+/)[0];
    document.getElementById("r-fact").textContent = FACTS[seg].text;
    document.getElementById("r-src").textContent = FACTS[seg].src;
    document.getElementById("r-go").href = url;
    history = [];
    show(steps.length - 1);
    window.NVE_LAST_REDIRECT = url;
    setTimeout(function () { location.href = url; }, 3500);
  });

  window.NVE_EMAIL_CHECK = emailCheck; /* usado nos testes */
  show(0);
})();
