/* =====================================================================
   CONFIGURAÇÃO ÚNICA DO FUNIL "NÃO VIRE ESTATÍSTICA"
   Edite só este arquivo para trocar vídeos, links de checkout, pixel e
   webhook. Campos vazios ("") ficam desativados com segurança.
   ===================================================================== */
window.FUNIL_CONFIG = {
  /* Dados da empresa (aparecem no rodapé, na Política de Privacidade e nos Termos) */
  empresa: {
    nome: "Connect Mídia",
    cnpj: "[00.000.000/0001-00]",
    endereco: "[Endereço completo]",
    email: "[contato@seudominio.com.br]",        // e-mail de suporte e do encarregado (LGPD)
    whatsapp: "",                                  // só números com DDI, ex.: "5511999999999"
    site: "https://planejamento2027.vercel.app"
  },

  produto: {
    nome: "Kit Não Vire Estatística",
    precoFront: "37",                 // R$ exibido nas páginas de venda
    garantiaDias: 7                   // prazo de garantia exibido nas páginas
  },

  /* CHECKOUT CAKTO: cole o link de cada edição (aba "Links" do produto na Cakto),
     ex.: "https://pay.cakto.com.br/AbC123x". As UTMs, src e sck do anúncio são
     anexadas automaticamente. Os order bumps são configurados dentro da Cakto.
     Enquanto vazio, o botão leva a uma tela avisando que o checkout não foi configurado. */
  checkout: {
    A: "",   // Edição Comércio e Alimentação
    B: "",   // Edição Serviços
    C: ""    // Edição Indústria, Agro e B2B
  },

  /* Pré-preencher o checkout com nome, e-mail e WhatsApp do quiz.
     plataforma: "cakto" (name, email, confirmEmail, phone=55DDDNÚMERO),
                 "kiwify" (name, email, phone, region=br),
                 "hotmart" (name, email, phoneac, phonenumber) ou "nenhum". */
  preencherCheckout: {
    ativo: true,
    plataforma: "cakto"
  },

  /* Vídeos das VSLs. Cole o link de embed (Panda Video: ".../embed/?v=ID";
     YouTube: "https://www.youtube.com/embed/ID"). Vazio = placeholder.
     ctaSegundos = em que segundo do vídeo o botão de compra aparece (início do pitch). */
  vsl: {
    A: { embedUrl: "", ctaSegundos: 420 },
    B: { embedUrl: "", ctaSegundos: 420 },
    C: { embedUrl: "", ctaSegundos: 420 }
  },
  /* Sem vídeo configurado: false = a oferta só aparece depois de ctaSegundos com a página aberta (padrão).
     Para ver a página já "revelada" (testes e prints), abra a VSL com ?revelar=1. Com ?revelar=0 você vê o estado antes do pitch. */
  ctaImediatoSemVideo: false,
  /* Quem já viu o botão uma vez continua vendo nas próximas visitas */
  lembrarCtaRevelado: true,

  /* PÓS-COMPRA ONE CLICK (CAKTO)
     1) Na Cakto, produto principal > Upsell/Downsell > ative a página personalizada
        e cole a URL de upsell.html deste site.
     2) Clique em "Gerador de Upsell", escolha o produto Kit Implementação 2027,
        defina Aceitar -> área de membros/obrigado e Recusar -> "Oferecer downsell"
        com a URL de downsell.html. Gere e cole o HTML no campo caktoHtml abaixo
        (entre crases `...`).
     3) Repita para o downsell (produto Painel de Implementação), com
        Aceitar e Recusar -> obrigado.html, e cole em downsell.caktoHtml.
     Com caktoHtml preenchido, os botões da Cakto (1 clique, sem digitar o cartão)
     substituem os botões deste site. aceitarUrl é só um plano B (link de checkout
     comum do produto, que pede os dados de novo). */
  upsell: {
    preco: "47",
    caktoHtml: ``,
    aceitarUrl: "",
    recusarUrl: "downsell.html",
    esconderRecusarSeCakto: true      // o HTML da Cakto já traz o botão de recusar
  },
  downsell: {
    preco: "27",
    caktoHtml: ``,
    aceitarUrl: "",
    recusarUrl: "obrigado.html",
    esconderRecusarSeCakto: true
  },

  /* Link de boas-vindas no WhatsApp (grupo, comunidade ou wa.me) mostrado na página de obrigado */
  whatsappBoasVindas: "",

  /* META PIXEL + API DE CONVERSÕES (páginas deste site)
     pixelId vazio = nenhum script da Meta é carregado.
     A COMPRA (Purchase) é enviada pela CAKTO, não por este site: configure o mesmo
     Pixel em cada produto na Cakto e preencha lá o Token da API de Conversões
     (sem o token, Pix pago depois não chega como Purchase). Veja o README.
     capiEndpoint = URL que repassa os eventos deste site para a API de Conversões
     (pode ser o mesmo Apps Script do webhook; veja apps-script/Code.gs). */
  meta: {
    pixelId: "",
    capiEndpoint: "",
    testEventCode: "",                // opcional: Gerenciador de Eventos > Testar eventos
    /* A Cakto já dispara InitiateCheckout ao abrir o checkout. Para não contar duas
       vezes, o clique no botão sai como evento personalizado "CliqueCheckout".
       Troque para "InitiateCheckout" se o Pixel NÃO estiver configurado na Cakto. */
    eventoCliqueCta: "CliqueCheckout",
    /* Verificação de domínio no Meta Business Manager (opção "Metatag").
       Cole só o código do content, ex.: "abc123xyz". Depois rode
       `node scripts/aplicar-verificacao.mjs` para gravar a tag no HTML
       (o robô da Meta não executa JavaScript). Preferível: verificar por DNS TXT (README). */
    verificacaoDominio: ""
  },

  /* UTMIFY (opcional). A venda chega à Utmify pela integração nativa
     Cakto > Integrações > Apps > UTMify (eventos pix_gerado e purchase_approved).
     scriptUtms: carrega o script de UTMs da Utmify em todas as páginas.
     scriptUtmsUrl: se a Utmify gerar um script individual no painel
       (Integrações > UTMs > Scripts de UTMs > "Outra"), cole aqui o endereço do src.
     pixelId: ID do Pixel da Utmify (opcional, só se você usar o Pixel deles). */
  utmify: {
    scriptUtms: false,
    scriptUtmsUrl: "https://cdn.utmify.com.br/scripts/utms/latest.js",
    pixelId: ""
  },

  /* Webhook que recebe cada lead do quiz (Google Apps Script, Make, Zapier, n8n, CRM).
     Vazio = o lead fica salvo só no navegador (localStorage). */
  webhook: {
    url: ""
  },

  /* Por padrão, e-mail e WhatsApp NÃO vão na URL da VSL (a Meta bloqueia eventos com dados
     pessoais na URL). Eles seguem no navegador e entram no pré-preenchimento do checkout. */
  passarContatoNaUrl: false
};
