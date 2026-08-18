/* =========================================================
   START CAR MULTIMARCAS — Script principal
   ========================================================= */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Helpers ---------- */
  var FALLBACK = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1b1b21"/><stop offset="1" stop-color="#0b0b0d"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="400" y="300" font-family="Arial" font-size="30" fill="#4a4f57" text-anchor="middle" letter-spacing="6">START CAR</text></svg>'
  );

  window.SC = window.SC || {};

  SC.km = function (v) {
    if (v === null || v === undefined) return 'Consulte';
    if (v === 0) return '0 km';
    return v.toLocaleString('pt-BR') + ' km';
  };
  SC.preco = function (v) {
    if (!v) return 'Sob consulta';
    return 'R$ ' + v.toLocaleString('pt-BR');
  };
  SC.nome = function (c) { return c.marca + ' ' + c.modelo; };
  SC.byId = function (id) {
    for (var i = 0; i < STOCK.length; i++) if (STOCK[i].id === id) return STOCK[i];
    return null;
  };
  SC.wa = function (msg) {
    return 'https://wa.me/' + LOJA.whatsapp + '?text=' + encodeURIComponent(msg);
  };
  SC.toast = function (msg) {
    var t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tm);
    t._tm = setTimeout(function () { t.classList.remove('show'); }, 4200);
  };

  /* ---------- Header ---------- */
  function initHeader() {
    var hd = $('.hd');
    if (!hd) return;
    var onScroll = function () { hd.classList.toggle('solid', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var b = $('.burger'), d = $('.drawer');
    if (b && d) {
      b.addEventListener('click', function () {
        b.classList.toggle('x');
        d.classList.toggle('open');
      });
      $$('a', d).forEach(function (a) {
        a.addEventListener('click', function () { b.classList.remove('x'); d.classList.remove('open'); });
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var els = $$('.rv');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Scroll misto (horizontal) ---------- */
  function initHorizontal() {
    var sec = $('.hx');
    if (!sec) return;
    var track = $('.hx-track', sec);
    var panels = $$('.hx-panel', sec);
    var dots = $$('.hx-prog i', sec);
    var n = panels.length;

    var mobile = function () {
      return window.matchMedia('(max-width: 980px)').matches ||
             window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    };

    function size() {
      if (mobile()) { sec.style.height = ''; track.style.transform = ''; return; }
      // 1 tela por painel extra + 1 tela de leitura do primeiro
      sec.style.height = (n * 100) + 'vh';
      move();
    }

    function move() {
      if (mobile()) return;
      var r = sec.getBoundingClientRect();
      var total = sec.offsetHeight - window.innerHeight;
      var p = Math.min(1, Math.max(0, -r.top / total));
      var maxX = (n - 1) * window.innerWidth;
      track.style.transform = 'translate3d(' + (-p * maxX) + 'px,0,0)';
      var idx = Math.round(p * (n - 1));
      dots.forEach(function (d, i) { d.classList.toggle('on', i === idx); });
    }

    size();
    window.addEventListener('scroll', move, { passive: true });
    window.addEventListener('resize', function () { clearTimeout(size._t); size._t = setTimeout(size, 140); });
    if (dots.length) dots[0].classList.add('on');
  }

  /* ---------- Card de veículo ---------- */
  SC.card = function (c) {
    var el = document.createElement('article');
    el.className = 'car rv';
    el.dataset.id = c.id;

    var selo = c.selo ? '<div class="selo' + (c.selo === 'SEMINOVO' ? '' : ' cromo-b') + '">' + c.selo + '</div>' : '';

    el.innerHTML =
      '<div class="car-img" data-act="galeria" title="Clique para ver todas as fotos">' +
        selo +
        '<div class="car-zoom">' + c.fotos.length + ' fotos</div>' +
        '<img src="' + c.fotos[0] + '" alt="' + SC.nome(c) + ' ' + c.ano + '" loading="lazy">' +
        '<div class="car-marca">' + c.marca + '</div>' +
      '</div>' +
      '<div class="car-body">' +
        '<h3 class="car-nome cromo">' + c.modelo + '</h3>' +
        '<p class="car-versao">' + c.versao + '</p>' +
        '<div class="ficha-prev">' +
          '<div class="fp"><span>Ano</span><b>' + c.anoFab + '/' + c.ano + '</b></div>' +
          '<div class="fp"><span>Km</span><b>' + SC.km(c.km) + '</b></div>' +
          '<div class="fp"><span>Câmbio</span><b>' + c.cambio + '</b></div>' +
          '<div class="fp"><span>Comb.</span><b>' + c.combustivel + '</b></div>' +
          '<div class="fp"><span>Cor</span><b>' + c.cor + '</b></div>' +
          '<div class="fp"><span>Portas</span><b>' + c.portas + '</b></div>' +
        '</div>' +
        '<div class="car-preco"><small>Valor</small><b class="ouro">' + SC.preco(c.preco) + '</b></div>' +
        '<div class="car-acoes">' +
          '<button class="btn btn-ghost btn-sm" data-act="ficha">Ficha completa</button>' +
          '<a class="btn btn-ouro btn-sm" href="financiamento.html?veiculo=' + c.id + '">Financiar</a>' +
        '</div>' +
      '</div>';

    var img = $('img', el);
    img.addEventListener('error', function () { this.src = FALLBACK; });

    $('.car-img', el).addEventListener('click', function () { SC.galeria(c, 0); });
    $('[data-act="ficha"]', el).addEventListener('click', function () { SC.ficha(c); });

    return el;
  };

  SC.render = function (lista, alvo) {
    var box = typeof alvo === 'string' ? $(alvo) : alvo;
    if (!box) return;
    box.innerHTML = '';
    if (!lista.length) {
      box.innerHTML = '<div class="vazio"><h3>Nenhum veículo encontrado</h3><p>Ajuste os filtros ou fale com a gente — recebemos veículos novos toda semana.</p></div>';
      return;
    }
    lista.forEach(function (c) { box.appendChild(SC.card(c)); });
    initReveal();
  };

  /* ---------- Lightbox / carrossel ---------- */
  var lb = { car: null, i: 0 };

  function buildLightbox() {
    if ($('#lb')) return;
    var d = document.createElement('div');
    d.id = 'lb';
    d.className = 'lb';
    d.innerHTML =
      '<div class="lb-top">' +
        '<div><h4 class="cromo" id="lbTitulo"></h4><small id="lbSub"></small></div>' +
        '<div class="lb-acoes">' +
          '<button class="btn btn-ghost btn-sm" id="lbFicha">Ficha completa</button>' +
          '<a class="btn btn-ouro btn-sm" id="lbFin">Financiar</a>' +
          '<button class="mdl-x" id="lbX" style="position:static;width:42px;height:42px">&times;</button>' +
        '</div>' +
      '</div>' +
      '<div class="lb-stage">' +
        '<button class="lb-nav lb-prev" id="lbPrev">&#10094;</button>' +
        '<img id="lbImg" alt="">' +
        '<button class="lb-nav lb-next" id="lbNext">&#10095;</button>' +
      '</div>' +
      '<div class="lb-thumbs" id="lbThumbs"></div>';
    document.body.appendChild(d);

    $('#lbX').addEventListener('click', SC.fecharGaleria);
    $('#lbPrev').addEventListener('click', function () { passo(-1); });
    $('#lbNext').addEventListener('click', function () { passo(1); });
    $('#lbFicha').addEventListener('click', function () { SC.fecharGaleria(); SC.ficha(lb.car); });
    $('#lbImg').addEventListener('error', function () { this.src = FALLBACK; });

    document.addEventListener('keydown', function (e) {
      if (!d.classList.contains('show')) return;
      if (e.key === 'Escape') SC.fecharGaleria();
      if (e.key === 'ArrowLeft') passo(-1);
      if (e.key === 'ArrowRight') passo(1);
    });

    // swipe
    var x0 = null;
    var st = $('.lb-stage', d);
    st.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    st.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) passo(dx < 0 ? 1 : -1);
      x0 = null;
    }, { passive: true });
  }

  function passo(d) {
    if (!lb.car) return;
    var n = lb.car.fotos.length;
    lb.i = (lb.i + d + n) % n;
    pinta();
  }

  function pinta() {
    var c = lb.car;
    $('#lbImg').src = c.fotos[lb.i];
    $('#lbSub').textContent = c.versao + ' · ' + c.anoFab + '/' + c.ano + ' · foto ' + (lb.i + 1) + ' de ' + c.fotos.length;
    $$('#lbThumbs img').forEach(function (t, i) {
      t.classList.toggle('on', i === lb.i);
      if (i === lb.i) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    });
  }

  SC.galeria = function (c, i) {
    buildLightbox();
    lb.car = c; lb.i = i || 0;
    $('#lbTitulo').textContent = SC.nome(c);
    $('#lbFin').href = 'financiamento.html?veiculo=' + c.id;
    var th = $('#lbThumbs');
    th.innerHTML = '';
    c.fotos.forEach(function (f, k) {
      var im = document.createElement('img');
      im.src = f; im.loading = 'lazy'; im.alt = 'Foto ' + (k + 1);
      im.addEventListener('error', function () { this.style.display = 'none'; });
      im.addEventListener('click', function () { lb.i = k; pinta(); });
      th.appendChild(im);
    });
    pinta();
    $('#lb').classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  SC.fecharGaleria = function () {
    var d = $('#lb');
    if (d) d.classList.remove('show');
    document.body.style.overflow = '';
  };

  /* ---------- Modal de ficha completa ---------- */
  function buildModal() {
    if ($('#mdlFicha')) return;
    var d = document.createElement('div');
    d.id = 'mdlFicha';
    d.className = 'ov';
    d.innerHTML =
      '<div class="mdl">' +
        '<button class="mdl-x" data-x>&times;</button>' +
        '<div class="mdl-head"><h3 class="cromo" id="fTit"></h3><p id="fSub"></p></div>' +
        '<div class="mdl-body" id="fBody"></div>' +
      '</div>';
    document.body.appendChild(d);
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.hasAttribute('data-x')) SC.fecharFicha();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && d.classList.contains('show')) SC.fecharFicha();
    });
  }

  SC.ficha = function (c) {
    buildModal();
    $('#fTit').textContent = SC.nome(c);
    $('#fSub').textContent = c.versao;

    var itens = [
      ['Ano', c.anoFab + '/' + c.ano],
      ['Quilometragem', SC.km(c.km)],
      ['Câmbio', c.cambio],
      ['Combustível', c.combustivel],
      ['Cor', c.cor],
      ['Portas', c.portas],
      ['Marca', c.marca],
      ['Valor', SC.preco(c.preco)]
    ];

    var msg = 'Olá! Tenho interesse no ' + SC.nome(c) + ' ' + c.versao + ' ' + c.anoFab + '/' + c.ano +
              ' que vi no site da Start Car. Pode me passar mais informações?';

    $('#fBody').innerHTML =
      '<div class="ficha-full">' +
        itens.map(function (i) {
          return '<div class="ff-item"><span>' + i[0] + '</span><b class="' + (i[0] === 'Valor' ? 'ouro' : 'cromo') + '">' + i[1] + '</b></div>';
        }).join('') +
      '</div>' +
      '<h4 class="sub-t">Opcionais e itens de série</h4>' +
      '<div class="op-list">' + c.opcionais.map(function (o) { return '<span class="op">' + o + '</span>'; }).join('') + '</div>' +
      '<div class="mdl-acoes">' +
        '<a class="btn btn-ouro" href="financiamento.html?veiculo=' + c.id + '">Simular financiamento</a>' +
        '<a class="btn btn-cromo" href="' + SC.wa(msg) + '" target="_blank" rel="noopener">Falar no WhatsApp</a>' +
        '<button class="btn btn-ghost" id="fGal">Ver as ' + c.fotos.length + ' fotos</button>' +
      '</div>';

    $('#fGal').addEventListener('click', function () { SC.fecharFicha(); SC.galeria(c, 0); });
    $('#mdlFicha').classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  SC.fecharFicha = function () {
    var d = $('#mdlFicha');
    if (d) d.classList.remove('show');
    document.body.style.overflow = '';
  };

  /* ---------- Política de privacidade + cookies ---------- */
  var POLITICA =
    '<h4>Sobre o uso de suas informações pessoais</h4>' +
    '<p>Com o intuito de manter a privacidade e a segurança das informações de seus usuários, a <strong>Start Car Multimarcas</strong> adota as seguintes regras:</p>' +
    '<ul>' +
      '<li>A Start Car trata todas as informações de seus usuários com a máxima confidencialidade.</li>' +
      '<li>Não divulgamos, sem prévia autorização, em hipótese nenhuma, informações pessoais e/ou o e-mail do usuário que se cadastrar em páginas que requerem preenchimento desses dados.</li>' +
      '<li>Não cedemos ou comercializamos, sob nenhuma forma, qualquer informação individual de nossos usuários a terceiros.</li>' +
      '<li>Utilizamos as informações preenchidas (nome, e-mail e telefone) dos nossos usuários APENAS para comunicação sobre interesse em nossos produtos e dúvidas em geral.</li>' +
      '<li>Para cancelamento de seu cadastro em nosso banco de dados, favor entrar em contato com a Start Car através do formulário principal ou do WhatsApp ' + '(21) 99131-4232' + '.</li>' +
      '<li>Preservamos a identidade do usuário, mantendo sigilo enquanto este navega nas páginas da Start Car. Para isso, o usuário deve se comprometer a respeitar as normas de segurança acima, assim como as normas específicas de cada serviço.</li>' +
    '</ul>' +
    '<h4>Cookies e dados de navegação</h4>' +
    '<p>Coletamos dados para melhorar o desempenho do site, além de personalizar conteúdo e anúncios. Utilizamos cookies próprios e de terceiros para:</p>' +
    '<ul>' +
      '<li><strong>Cookies essenciais:</strong> necessários para o funcionamento do site, como manter suas preferências de navegação e o consentimento registrado.</li>' +
      '<li><strong>Cookies de desempenho:</strong> nos ajudam a entender quais veículos e páginas despertam mais interesse, para melhorarmos a vitrine.</li>' +
      '<li><strong>Cookies de marketing:</strong> permitem apresentar anúncios mais relevantes sobre nossos veículos e condições de financiamento.</li>' +
    '</ul>' +
    '<p>Você pode configurar suas preferências de cookies diretamente no seu navegador, bloqueando ou removendo os arquivos a qualquer momento. A recusa de cookies não essenciais não impede a navegação no site.</p>' +
    '<h4>Lei Geral de Proteção de Dados (LGPD)</h4>' +
    '<p>Em conformidade com a Lei nº 13.709/2018, o titular dos dados pode, a qualquer momento, solicitar a confirmação do tratamento, o acesso, a correção, a portabilidade, a anonimização ou a exclusão de seus dados pessoais. As solicitações devem ser feitas pelo WhatsApp <strong>(21) 99131-4232</strong> ou presencialmente em nossa loja, na Avenida Automóvel Clube, 1961 — Vilar dos Teles, São João de Meriti — RJ.</p>' +
    '<h4>Dados enviados pelos formulários</h4>' +
    '<p>Os dados preenchidos nos formulários de <strong>financiamento</strong> e <strong>consignação</strong> são utilizados exclusivamente para análise de crédito junto às instituições financeiras parceiras e para o atendimento comercial referente ao veículo de interesse.</p>' +
    '<h4>Atualizações desta política</h4>' +
    '<p>Esta política pode ser atualizada periodicamente. Recomendamos a consulta regular a esta página. A versão vigente é sempre a publicada neste site.</p>';

  function buildPolitica() {
    if ($('#mdlPol')) return;
    var d = document.createElement('div');
    d.id = 'mdlPol';
    d.className = 'ov';
    d.innerHTML =
      '<div class="mdl">' +
        '<button class="mdl-x" data-x>&times;</button>' +
        '<div class="mdl-head"><h3 class="cromo">Políticas de Privacidade</h3><p>Start Car Multimarcas · LGPD</p></div>' +
        '<div class="mdl-body pol">' + POLITICA + '</div>' +
      '</div>';
    document.body.appendChild(d);
    d.addEventListener('click', function (e) {
      if (e.target === d || e.target.hasAttribute('data-x')) SC.fecharPolitica();
    });
  }

  SC.politica = function () {
    buildPolitica();
    $('#mdlPol').classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  SC.fecharPolitica = function () {
    var d = $('#mdlPol');
    if (d) d.classList.remove('show');
    document.body.style.overflow = '';
  };

  function initCookies() {
    var ck = $('#ck');
    if (!ck) return;
    var KEY = 'sc_cookies_v1';
    var ok;
    try { ok = window.sessionStorage ? null : null; } catch (e) { ok = null; }
    // Preferência mantida apenas na sessão em memória para não depender de storage
    if (!window.__scCookieOk) {
      setTimeout(function () { ck.classList.add('show'); }, 1200);
    }
    $$('[data-ck]', ck).forEach(function (b) {
      b.addEventListener('click', function () {
        window.__scCookieOk = true;
        ck.classList.remove('show');
        if (b.dataset.ck === 'ok') SC.toast('Preferências de cookies salvas. Obrigado!');
      });
    });
    $$('[data-pol]', ck).forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); SC.politica(); });
    });
  }

  /* ---------- Links globais de política ---------- */
  function initPolLinks() {
    $$('[data-pol]').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); SC.politica(); });
    });
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    $$('.q > button').forEach(function (b) {
      b.addEventListener('click', function () {
        var q = b.parentElement;
        var aberto = q.classList.contains('open');
        $$('.q').forEach(function (o) { o.classList.remove('open'); });
        if (!aberto) q.classList.add('open');
      });
    });
  }

  /* ---------- Máscaras ---------- */
  SC.mascaras = function (form) {
    var tel = $('[data-mask="tel"]', form);
    if (tel) tel.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6) this.value = '(' + v.slice(0, 2) + ') ' + v.slice(2, 7) + '-' + v.slice(7);
      else if (v.length > 2) this.value = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      else if (v.length) this.value = '(' + v;
      else this.value = '';
    });
    var cpf = $('[data-mask="cpf"]', form);
    if (cpf) cpf.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '').slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      this.value = v;
    });
    $$('[data-mask="moeda"]', form).forEach(function (el) {
      el.addEventListener('input', function () {
        var v = this.value.replace(/\D/g, '');
        this.value = v ? 'R$ ' + (parseInt(v, 10) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';
      });
    });
    var km = $('[data-mask="km"]', form);
    if (km) km.addEventListener('input', function () {
      var v = this.value.replace(/\D/g, '');
      this.value = v ? parseInt(v, 10).toLocaleString('pt-BR') : '';
    });
  };

  SC.validar = function (form) {
    var ok = true;
    $$('[required]', form).forEach(function (el) {
      var f = el.closest('.fld') || el.closest('.consent');
      var vazio = el.type === 'checkbox' ? !el.checked : !el.value.trim();
      if (f) f.classList.toggle('invalid', vazio);
      if (vazio) { ok = false; if (!form._foco) { form._foco = el; } }
    });
    if (!ok && form._foco) { form._foco.focus(); form._foco = null; }
    return ok;
  };

  /* ---------- Boot ---------- */
  function boot() {
    initHeader();
    initReveal();
    initHorizontal();
    initCookies();
    initPolLinks();
    initFaq();
    $$('img[data-fb]').forEach(function (i) {
      i.addEventListener('error', function () { this.src = FALLBACK; });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
