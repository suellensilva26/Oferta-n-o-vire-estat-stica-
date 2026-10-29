# Funil "Não Vire Estatística" — Quiz → VSL por segmento → Cakto → Upsell/Downsell

Site estático (HTML/CSS/JS puro, sem build), mobile-first, pronto para hospedar **de graça** em
**https://planejamento2027.connectmidia.com** (Cloudflare Pages ou Netlify).

Você só edita **um arquivo: `config.js`**. Todo o resto lê dele.

---

## 1. Como o funil funciona

```
Anúncio Meta (com UTMs)
   └─> index.html  (quiz: 1 pergunta por tela, barra de progresso, LGPD, WhatsApp validado)
          ├─ salva o lead (navegador + planilha Google via webhook)
          ├─ evento Lead (Pixel + CAPI opcional)
          └─> redireciona por segmento, levando UTMs + dados do quiz
                ├─ vsl-a.html  Comércio / Alimentação / "Outro: vendo ao consumidor"
                ├─ vsl-b.html  Serviços / "Outro: presto serviço"
                └─ vsl-c.html  Indústria / Agro-B2B / "Outro: vendo para empresas"
                       └─ botão aparece no tempo do pitch (ctaSegundos)
                             └─> Checkout CAKTO (R$ 37 + order bumps nativos)
                                    └─> upsell.html (R$ 47, 1 clique Cakto)
                                           ├─ aceitou ──> obrigado
                                           └─ recusou ──> downsell.html (R$ 27) ──> obrigado.html
```

| Arquivo | Para quê |
|---|---|
| `config.js` | **Tudo que você configura** (links, vídeos, pixel, webhook, empresa, preços) |
| `index.html` + `assets/js/quiz.js` | Quiz e roteamento |
| `vsl-a/b/c.html` + `assets/js/vsl.js` | Páginas de vendas (VSL) |
| `upsell.html`, `downsell.html` + `assets/js/offer.js` | Pós-compra 1 clique |
| `obrigado.html` | Próximos passos (e-mail, WhatsApp) |
| `privacidade.html`, `termos.html` | LGPD / termos (preenchidos com os dados de `empresa` do config) |
| `checkout-pendente.html` | Aviso que aparece **só** enquanto o link da Cakto estiver vazio |
| `apps-script/Code.gs` | Webhook gratuito (Google Planilhas) + ponte CAPI opcional |
| `scripts/aplicar-verificacao.mjs` | Grava a meta tag de verificação de domínio da Meta no HTML |
| `_headers`, `netlify.toml`, `robots.txt`, `sitemap.xml`, `404.html` | Hospedagem |

> O que é rastreado: `utm_source, utm_medium, utm_campaign, utm_content, utm_term, fbclid, gclid, src, sck`.
> Eles passam do anúncio → quiz → VSL → checkout → upsell/downsell. E-mail e WhatsApp **não** vão na URL
> (a Meta bloqueia dados pessoais em URL); o checkout é pré-preenchido com nome/e-mail/telefone.

---

## 2. Checklist rápido (ordem recomendada)

1. `config.js` → `empresa` (razão social, CNPJ, endereço, e-mail, WhatsApp).
2. Cakto → criar os produtos e colar os 3 links em `checkout` (seção 4).
3. Cakto → upsell/downsell com o Gerador de Upsell (seção 4.3).
4. Gravar as VSLs e colar os embeds em `vsl` (seção 3).
5. Pixel + Token CAPI na Cakto **e** `meta.pixelId` no config (seção 5).
6. Webhook da planilha (seção 6).
7. Publicar em planejamento2027.connectmidia.com (seções 7 e 8).
8. Verificar o domínio no Gerenciador de Negócios (seção 9).
9. Rodar o checklist de testes (seção 11) antes de ligar os anúncios.

---

## 3. Trocar os vídeos das VSLs

Em `config.js`:

```js
vsl: {
  A: { embedUrl: "https://player-vz-xxxx.tv.pandavideo.com.br/embed/?v=ID", ctaSegundos: 420 },
  B: { embedUrl: "https://www.youtube.com/embed/ID", ctaSegundos: 380 },
  C: { embedUrl: "", ctaSegundos: 420 }
}
```

- **Panda Video (recomendado para VSL)**: copie o link do *embed* (o `src` do iframe). O botão aparece
  quando o vídeo **realmente** chega em `ctaSegundos` (lê o tempo do player).
- **YouTube**: use `https://www.youtube.com/embed/ID`. Também segue o tempo real do vídeo.
- **Outro player** (Vimeo, VTurb, etc.): o botão aparece após `ctaSegundos` de página visível.
- `ctaSegundos` = segundo em que você fala o preço no vídeo (ex.: 7 min = 420).
- Vídeo vazio → aparece uma moldura "vídeo em breve" e o botão é mostrado na hora (bom para testar).
- Quem já viu o botão uma vez o vê direto ao voltar (`lembrarCtaRevelado: true`).
- Teste rápido: `?revelar=1` (ou `?cta=1`) mostra a página como fica depois do pitch; `?revelar=0` mostra o estado antes do pitch (e esquece o "já viu"). `?admin=1` mostra no lugar do vídeo onde configurar o embed.
- Layout das VSLs (padrão VSL brasileira): antes do pitch aparecem só a pré-headline, a headline, a subheadline, o vídeo, o aviso "ative o som" e o rodapé. Botão, preço, oferta, garantia, FAQ e CTA fixo só aparecem em `vsl.X.ctaSegundos` (padrão 420 s = 7:00). Sem vídeo configurado, a oferta aparece depois de `ctaSegundos` com a página aberta (`ctaImediatoSemVideo: false`).
- Os roteiros dos 3 vídeos estão em `roteiros/` (não são publicados). O cenário econômico (Selic, inadimplência, recuperações) e o impacto no nicho são falados DENTRO do vídeo, com a fonte na tela. Se o pitch começar em outro segundo, ajuste `ctaSegundos`.
- Textos das VSLs: edite `build/gen_vsl.py` (HERO e V0) e rode `python3 gen_vsl.py`, ou edite direto `vsl-a.html`, `vsl-b.html` e `vsl-c.html`.

Os textos das VSLs (manchete, dados com fonte, linha do tempo da Reforma, oferta, FAQ) estão nos próprios
`vsl-a/b/c.html`. Todos os números têm link para a fonte. Não há cronômetro falso, escassez falsa nem
depoimentos inventados — mantenha assim (política de anúncios da Meta + CDC).

---

## 4. Cakto (checkout)

### 4.1 Produtos e links
Crie na Cakto o produto principal **R$ 37** (um produto com 3 ofertas/links, ou 3 produtos — um por edição A/B/C,
o que facilita ver qual segmento vende mais). Copie o link de checkout de cada um:

```js
checkout: {
  A: "https://pay.cakto.com.br/XXXXXXX",
  B: "https://pay.cakto.com.br/YYYYYYY",
  C: "https://pay.cakto.com.br/ZZZZZZZ"
}
```

O site adiciona sozinho: `utm_*`, `fbclid`, `src` (se vier vazio, monta `utm_source|utm_campaign|utm_content`)
e o pré-preenchimento `name`, `email`, `confirmEmail`, `phone` (55 + DDD + número).
Para desligar o pré-preenchimento: `preencherCheckout.ativo = false`.

Na Cakto, aba **Links** do produto, cadastre `https://planejamento2027.connectmidia.com` como página de vendas.

### 4.2 Order bumps (nativos da Cakto — não precisa de nada no site)
Produto → **Order Bump** → adicionar. Sugestão da escada:
- Calculadora "Quanto a Reforma custa no meu caixa" — R$ 19,90
- Pack de roteiros de negociação (bancos/fornecedores) — R$ 27
- Planilha de fluxo de caixa 13 semanas — R$ 17

### 4.3 Upsell (R$ 47) e downsell (R$ 27) de 1 clique
1. Crie na Cakto os produtos de upsell (R$ 47) e downsell (R$ 27).
2. No produto **principal**: aba **Upsell / Downsell** → ative a página de obrigado/upsell personalizada →
   URL: `https://planejamento2027.connectmidia.com/upsell.html`.
3. Abra o **Gerador de Upsell**: escolha o produto de upsell, ação de recusa = ir para
   `https://planejamento2027.connectmidia.com/downsell.html`. Copie o HTML gerado.
4. Cole no `config.js`, entre as crases:
   ```js
   upsell: { preco: "47", caktoHtml: `COLE AQUI O HTML DO GERADOR`, ... }
   ```
5. Repita para o downsell (produto R$ 27; recusa → `https://planejamento2027.connectmidia.com/obrigado.html`)
   e cole em `downsell.caktoHtml`.

Com o HTML colado, os botões do site somem e ficam os botões oficiais da Cakto (compra com 1 clique, sem digitar
o cartão de novo). Sem HTML, você pode usar `aceitarUrl` (link de checkout comum) como alternativa.

> Pix/boleto não têm 1 clique: quem pagar o principal via Pix vê o checkout normal do upsell.

### 4.4 Pixel e CAPI na Cakto (essencial para otimizar por Compra)
Em **cada produto** (principal, upsell e downsell): Produtos → Editar → **Configurações Avançadas** →
**Configurar Pixel** → Meta → cole o **ID do Pixel** e, na engrenagem, o **Token da API de Conversões**.

- Sem o token, **Pix pago depois** não chega à Meta como Purchase (e o Pix é a maior parte das vendas low ticket).
- Opção "disparar Purchase ao gerar Pix" com % do valor: útil só no início, para dar volume ao pixel;
  depois desligue para não inflar o ROAS.
- Quem dispara **InitiateCheckout** e **Purchase** é a Cakto. Por isso o clique no botão da VSL dispara um
  evento personalizado `CliqueCheckout` (evita contar InitiateCheckout em dobro). Se quiser mesmo assim,
  troque em `meta.eventoCliqueCta: "InitiateCheckout"`.

### 4.5 Utmify (opcional, ~plano grátis para começar)
Mostra ROAS real por campanha/conjunto/anúncio (inclusive Pix pago depois).
1. Cakto → **Integrações → Apps → UTMify** → cole o token da Utmify e marque os eventos
   `pix_gerado` e `purchase_approved`.
2. No `config.js`: `utmify.scriptUtms: true` (carrega o script de UTMs da Utmify em todas as páginas).
   Se o painel da Utmify gerar um script próprio (Integrações → UTMs → Scripts → "Outra"), cole a URL em
   `utmify.scriptUtmsUrl`.
3. Pixel da Utmify (opcional): `utmify.pixelId`.
4. Nos anúncios, use os parâmetros de URL que a Utmify indica.

---

## 5. Meta Pixel e API de Conversões (no site)

```js
meta: {
  pixelId: "123456789012345",   // vazio = pixel desligado
  capiEndpoint: "",            // URL /exec do Apps Script (opcional)
  testEventCode: "",           // ex.: TEST1234 enquanto testa no Gerenciador de Eventos
  eventoCliqueCta: "CliqueCheckout",
  verificacaoDominio: ""       // ver seção 9
}
```

Eventos do site: `PageView` (todas), `Lead` (envio do quiz, com correspondência avançada), `ViewContent`
(VSL e pós-compra), `CliqueCheckout` (botão da VSL). Cada evento tem `event_id`, pronto para deduplicação.
CAPI pelo site é **opcional**: o mais importante (Purchase) já vai pela Cakto. Se quiser também Lead via CAPI,
coloque a URL do Apps Script em `capiEndpoint` e configure `META_CAPI_TOKEN` (seção 6).

---

## 6. Webhook grátis: leads numa Planilha Google

1. Crie uma planilha em sheets.google.com (ex.: "Leads Planejamento 2027").
2. **Extensões → Apps Script** → apague o conteúdo → cole `apps-script/Code.gs` → salvar.
3. (Opcional CAPI) ⚙️ Configurações do projeto → **Propriedades do script** →
   `META_CAPI_TOKEN` = token do Gerenciador de Eventos; `META_PIXEL_ID` = seu pixel.
4. **Implantar → Nova implantação** → tipo **App da Web** → Executar como: **Eu** →
   Quem pode acessar: **Qualquer pessoa** → Implantar → autorize.
5. Copie a URL que termina em `/exec` → `config.js` → `webhook.url` (e `meta.capiEndpoint`, se usar CAPI).
6. Teste: abra a URL `/exec` no navegador → deve mostrar `{"ok":true,...}`. Faça o quiz → a aba **Leads** é criada.

Ao alterar o código, use **Implantar → Gerenciar implantações → editar → Nova versão** (a URL continua a mesma).
Os leads também ficam no navegador do visitante (`localStorage`) como reserva.

---

## 7. Publicar grátis (Cloudflare Pages — recomendado)

Custo: **R$ 0** (sem limite de banda, HTTPS automático).

**Opção A — upload direto (sem GitHub)**
1. Crie conta grátis em dash.cloudflare.com → **Workers & Pages → Create → Pages → Upload assets**.
2. Nome do projeto: `planejamento2027` → arraste a **pasta** do site (ou o .zip) → Deploy.
   Fica no ar em `https://planejamento2027.pages.dev`.
3. Projeto → **Custom domains → Set up a custom domain** → `planejamento2027.connectmidia.com` →
   a Cloudflare mostra o CNAME a criar (seção 8).
4. Para atualizar: **Create new deployment** e envie a pasta de novo.

**Opção B — GitHub** (atualiza sozinho a cada alteração): suba a pasta num repositório, Pages → Connect to Git,
build command vazio, output directory `/`.

**Alternativa: Netlify (grátis)** — app.netlify.com → **Add new site → Deploy manually** → arraste a pasta →
Site configuration → **Domain management → Add a domain** → `planejamento2027.connectmidia.com`.
Endereço de destino do CNAME: `SEU-SITE.netlify.app`. (Plano grátis tem limite de créditos/banda; para tráfego
pago alto, Cloudflare é mais seguro.)

---

## 7-B. Vercel (grátis, plano Hobby) — onde o funil está publicado agora

- Projeto: `planejamento2027` → `https://planejamento2027.vercel.app` (site estático, sem build; `vercel.json` já incluso).
- **Deployment Protection** (Vercel Authentication) precisa estar **desligada** para o público abrir o link:
  Project → Settings → Deployment Protection → Vercel Authentication: Disabled.
- Atualizar: arraste a pasta de novo pelo painel (ou `vercel deploy --prod` na pasta).
- Trocar o domínio público (canonical, sitemap, robots) quando o subdomínio estiver pronto:
  ```bash
  node scripts/definir-dominio.mjs https://planejamento2027.connectmidia.com
  ```
- **Domínio próprio na Vercel**: connectmidia.com já está na sua conta Vercel (projeto `connectmidia-site`),
  com DNS na Hostinger (nameservers `aurora/nebula.dns-parking.com`). Para o funil:
  1. Vercel → projeto `planejamento2027` → Settings → Domains → Add → `planejamento2027.connectmidia.com`.
  2. Hostinger → DNS → registro **CNAME**: Nome `planejamento2027` → Destino `cname.vercel-dns.com` → TTL 3600.
  3. Aguarde a Vercel mostrar "Valid Configuration" (HTTPS automático) e rode o script acima.

---

## 8. DNS: apontar planejamento2027.connectmidia.com

Primeiro descubra **onde está o DNS** de connectmidia.com (quem são os *nameservers*):
no registro.br (painel do domínio → DNS) ou em `https://www.whatsmydns.net/#NS/connectmidia.com`.
- `ns1.dns-parking.com` / `ns2.dns-parking.com` → DNS na **Hostinger**
- `a.dns.br` / `b.dns.br` (DNS do Registro.br) → DNS no **Registro.br**
- `*.ns.cloudflare.com` → DNS na **Cloudflare** (aí o subdomínio é criado com 1 clique na etapa 7)

Destino do CNAME:
- Cloudflare Pages: `planejamento2027.pages.dev`
- Vercel: `cname.vercel-dns.com`
- Netlify: `SEU-SITE.netlify.app`

### 8.1 Hostinger
1. hpanel.hostinger.com → **Domínios** → `connectmidia.com` → **DNS / Nameservers** → **Registros DNS**.
2. Se já existir um registro `A` ou `CNAME` com nome `planejamento2027`, apague-o.
3. Adicionar registro:
   - Tipo: **CNAME**
   - Nome: **planejamento2027**  (só isso, sem `.connectmidia.com`)
   - Aponta para / Destino: **planejamento2027.pages.dev**  (ou `SEU-SITE.netlify.app`)
   - TTL: 3600 (ou o padrão)
4. **Adicionar registro**. Volte à Cloudflare/Netlify e clique em verificar. Propaga em minutos (até 24 h);
   o HTTPS é emitido sozinho.

> O site principal connectmidia.com (WordPress/Hostinger, etc.) **não é afetado**: só o subdomínio aponta para fora.

### 8.2 Registro.br
1. registro.br → entrar → clique em `connectmidia.com`.
2. Seção **DNS** → **Editar zona** (se aparecer "Configurar endereçamento"/"modo avançado", ative o modo avançado
   para usar o DNS do Registro.br — **atenção:** se o domínio usa nameservers da Hostinger, edite na Hostinger, não aqui).
3. **Nova entrada** → Tipo **CNAME** → Nome `planejamento2027` → Dados `planejamento2027.pages.dev` → Salvar.

### 8.3 Conferir
`https://www.whatsmydns.net/#CNAME/planejamento2027.connectmidia.com` deve mostrar o destino.
Depois abra `https://planejamento2027.connectmidia.com` (cadeado ativo).

---

## 9. Verificar o domínio na Meta (Gerenciador de Negócios)

Necessário para configurar eventos e para a Meta confiar nos dados do pixel.
1. business.facebook.com → **Configurações do negócio → Segurança da marca → Domínios → Adicionar** →
   digite **`connectmidia.com`** (a Meta verifica o domínio raiz; isso cobre `planejamento2027.connectmidia.com`).
2. **Método recomendado — registro TXT de DNS:** a Meta mostra algo como
   `facebook-domain-verification=abc123xyz`.
   - **Hostinger:** Registros DNS → Tipo **TXT** → Nome **@** → Valor `facebook-domain-verification=abc123xyz` → Adicionar.
   - **Registro.br:** Editar zona → Nova entrada → **TXT** → Nome em branco (raiz) → Dados o valor acima → Salvar.
   - Aguarde alguns minutos e clique em **Verificar**.
3. **Alternativa — Metatag** (se preferir verificar pelo site): copie só o código do `content`, cole em
   `config.js` → `meta.verificacaoDominio: "abc123xyz"` e rode:
   ```bash
   node scripts/aplicar-verificacao.mjs
   ```
   (grava a tag `<meta name="facebook-domain-verification">` em todas as páginas). Republique o site e
   clique em Verificar. Observação: a metatag precisa estar na página inicial do domínio verificado; para
   verificar `connectmidia.com` pela metatag ela teria de ir no site principal — por isso o **TXT é o caminho mais simples**.
4. Depois: Gerenciador de Eventos → seu pixel → **Configurações → Agregação de eventos**, priorize `Purchase`.

---

## 10. O que é configurável (resumo do `config.js`)

| Campo | O que faz |
|---|---|
| `empresa.*` | Nome, CNPJ, endereço, e-mail, WhatsApp, site — rodapé e páginas legais |
| `produto.precoFront`, `produto.garantiaDias` | Preço exibido (R$ 37) e garantia (7 dias) |
| `checkout.A/B/C` | Links Cakto por VSL |
| `preencherCheckout` | Pré-preenchimento (cakto / kiwify / hotmart / nenhum) |
| `vsl.A/B/C.embedUrl`, `ctaSegundos` | Vídeo e tempo do botão |
| `upsell.*`, `downsell.*` | Preço, HTML do Gerador de Upsell, links alternativos |
| `whatsappBoasVindas` | Link de grupo/WhatsApp mostrado no obrigado |
| `meta.*` | Pixel, CAPI, código de teste, evento do clique, verificação de domínio |
| `utmify.*` | Script de UTMs e pixel da Utmify |
| `webhook.url` | URL do Apps Script |
| `passarContatoNaUrl` | Mantém `false` (Meta bloqueia PII em URL) |

---

## 11. Checklist de testes antes de anunciar

- [ ] Abrir `https://planejamento2027.connectmidia.com/?utm_source=teste&utm_campaign=teste` e fazer o quiz 3 vezes
      (Comércio, Serviços, Indústria) → cai em VSL A, B e C.
- [ ] Linha nova na planilha com UTMs.
- [ ] Meta Pixel Helper (extensão do Chrome) mostra PageView, Lead, ViewContent, CliqueCheckout.
- [ ] Gerenciador de Eventos → **Testar eventos** (use `meta.testEventCode` e o código de teste na Cakto).
- [ ] Checkout Cakto abre com nome/e-mail/telefone preenchidos e UTMs na URL.
- [ ] Compra de teste (Pix de valor baixo / cupom 100%) → Purchase aparece no Gerenciador de Eventos e na Utmify.
- [ ] Upsell aparece após a compra; "não quero" → downsell → obrigado.
- [ ] Testar no celular (Android e iPhone) e no navegador interno do Instagram.

## 12. Custos

| Ferramenta | Custo |
|---|---|
| Cloudflare Pages (ou Netlify) | Grátis |
| Subdomínio planejamento2027.connectmidia.com | Grátis (você já tem o domínio) |
| Google Planilhas + Apps Script | Grátis |
| Meta Pixel / CAPI | Grátis |
| Cakto | Só taxa por venda |
| Utmify | Opcional (tem plano gratuito/teste) |
| Panda Video | Pago (opcional — YouTube não listado funciona de graça) |

## 13. Rodar localmente
```bash
cd funil-nao-vire-estatistica
python3 -m http.server 8080
# abra http://localhost:8080
```


## 14. Consentimento (LGPD) e e-mail no quiz
- Uma única caixa, desmarcada, obrigatória: "Concordo em receber meu diagnóstico e contatos da Connect Mídia por WhatsApp e e-mail. Saio quando quiser." O texto aceito é salvo no lead (`consentimentoTexto`) junto com `consentimentoContato`.
- Para enviar mensagens promocionais em massa com mais segurança jurídica, ofereça sempre a saída (responder SAIR / link de descadastro), como descrito na Política de Privacidade.
- O e-mail aceita qualquer provedor (Gmail, Hotmail, Outlook, iCloud, domínio próprio). Erros comuns têm mensagem própria ("Faltou o @") e erros de digitação no domínio (gmial.com, hotmai.com, gmail.con) mostram "Você quis dizer…?" com botão para corrigir; tocar em Continuar de novo aceita como foi digitado.
- O nome da empresa exibido vem de `config.js > empresa.nome` (padrão "Connect Mídia"). Valores entre colchetes, como "[CNPJ]", não aparecem para o visitante.
