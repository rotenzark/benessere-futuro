/* PLUMBING_V 2 — Bespoke Studio · meccanica invisibile canonica.
   Copiato da Agenzia/Toolkit/boilerplate/plumbing.js e adattato nella sola
   costante SITE. Il codice-FIRMA di questo sito sta in fondo, sotto il
   marcatore di fine plumbing. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'benessere-futuro',
    /* Nessun WhatsApp: il numero pubblicato (02 66102368) è un fisso. */
    whatsapp: { number: '', message: '', ids: [] },
    /* Orari verificati sulla scheda Treatwell: lunedì e domenica chiusi. */
    hours: {
      0: [],
      1: [],
      2: [['09:30', '19:00']],
      3: [['09:30', '19:00']],
      4: [['09:30', '19:00']],
      5: [['09:30', '19:00']],
      6: [['09:30', '17:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1600,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 760,
    EN: {
      'nav.due': 'About',
      'nav.corpo': 'Treatments',
      'nav.voci': 'Reviews',
      'nav.dove': 'Find us',

      'hero.occhiello': 'Viale Fulvio Testi 93, Milan',
      'hero.p': 'The left window says Deb & Cri. The right one says Benessere Futuro. Inside there are two different trades: Debora is the beautician, Cristina is the massage therapist.',
      'hero.cta1': 'See the treatments',
      'hero.cta2': 'Call',
      'hero.nota': 'from 510 reviews · Tuesday to Saturday',

      'alt.facciata': 'The two windows of Benessere Futuro on Viale Fulvio Testi, with the signs «Deb & Cri» and «Benessere Futuro»',
      'alt.titolari': 'The owners of Benessere Futuro in the salon, in black uniforms with fuchsia trim',
      'alt.salone': 'Inside Benessere Futuro: light wood reception and shelves of products',

      'due.h': 'Not two beauticians. Two trades.',
      'due.d.ruolo': 'Beautician',
      'due.d.p': 'Face, hands, feet — and the speciality of the house: waxing, twelve entries on the price list. She is the more reviewed of the two: 4.9 from 345 reviews signed with her name.',
      'due.c.ruolo': 'Massage therapist',
      'due.c.p': 'The body: massage, lymphatic drainage, tired legs. A trade of its own, not something improvised between two manicures. 4.9 from 62 reviews.',
      'due.coda': 'They work with Beautech and Image.',

      'corpo.h': 'The price list, head to toe',
      'corpo.p': 'Scroll: you go down the body, one area at a time. Every price and every duration comes from their own list.',
      'corpo.coda': 'The full list is longer than this. For anything you cannot find here, the quickest way is to call.',

      'z1.h': 'Face', 'z1.conta': '5 treatments',
      'z1.a': 'Deep cleansing facial', 'z1.b': 'Eye and lip contour treatment',
      'z2.h': 'Brows', 'z2.conta': 'brow design',
      'z2.p': 'The line nobody books for themselves and everybody notices on other people.',
      'z3.h': 'Hands', 'z3.conta': '7 treatments',
      'z3.a': 'Manicure', 'z3.b': 'Polish change', 'z3.c': 'Gel polish application',
      'z3.d': 'Gel polish, application only', 'z3.e': 'Gel polish removal',
      'z3.f': 'Gel polish with removal', 'z3.g': 'Spa manicure',
      'z4.h': 'Body and back', 'z4.conta': '7 massages · Cristina works here',
      'z4.a': 'Candle Massage, full body',
      'z4.p': 'Lymphatic drainage is on the list too: those who booked it write that it was explained to them before starting.',
      'z5.h': 'Legs', 'z5.conta': '12 waxing entries',
      'z5.a': 'Tired legs massage',
      'z5.p': 'Waxing is the declared speciality of the house. Men too: some have been booking it for years.',
      'z6.h': 'Feet', 'z6.conta': '7 treatments',
      'z6.a': 'Medical pedicure',
      'z6.p': 'Medical, not cosmetic: one hour, and you walk out better than you walked in.',

      'voci.h': 'What people write',
      'voci.sub': 'average · 510 reviews, 359 of them five stars',

      'salone.h': 'Inside',
      'salone.p': 'Light wood, daylight through the two windows, products on open shelves. No waiting room: you walk in and you are already where the work happens.',

      'dove.h': 'Where and when',
      'dove.mezzi': 'Bus stop Via S. Monica / V.le Testi, right outside.',
      'dove.mappa': 'Open in Maps',

      'g.lun': 'Monday', 'g.mar': 'Tuesday', 'g.mer': 'Wednesday', 'g.gio': 'Thursday',
      'g.ven': 'Friday', 'g.sab': 'Saturday', 'g.dom': 'Sunday',
      'g.chiuso': 'closed', 'g.chiuso2': 'closed',

      'foot.nota': 'Demonstration site built by Bespoke Studio.',
      'bar.tel': 'Call', 'bar.tratt': 'Treatments',
    },
  };
  /* ═════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile ---------- */
  var intro = document.getElementById(SITE.introId);
  var heroEntrance = window.bespokeHeroEntrance || function () {};
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    heroEntrance();
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000);
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    var en = root.lang === 'en';
    var txt;
    if (st.open) {
      txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    } else if (st.opensToday) {
      txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    } else {
      txt = en ? 'Closed' : 'Chiuso';
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay ---------- */
  var originals = {};
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, non textContent: il markup interno (<strong>, <br>)
           deve sopravvivere al passaggio EN→IT. La flotta lavorava già
           così; il boilerplate canonico era rimasto indietro ed è stato
           riallineato il 20/7/2026 partendo da qui. */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      setLang(root.lang === 'en' ? 'it' : 'en');
    });
  }
  try {
    if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en');
  } catch (e) {}

  /* ---------- action-bar mobile ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui solo il codice-firma ══════════ */

  /* ═══ FIRMA 1 — l'entrata del titolo ═══
     Le righe dell'h1 salgono una dopo l'altra. Sono elementi-FIRMA:
     NON portano la classe .reveal, per non prendere due animazioni
     sull'opacità (regola anti-flash del 18/7). */
  var righe = document.querySelectorAll('#heroTitolo .riga');
  if (hasGsap && !reducedMotion && righe.length) {
    gsap.set(righe, { opacity: 0, yPercent: 40 });
    window.bespokeHeroEntrance = function () {
      gsap.to(righe, {
        opacity: 1, yPercent: 0, duration: 0.9, ease: 'power3.out', stagger: 0.11,
      });
    };
    /* se l'intro è già stata rimossa quando arriviamo qui, entra subito */
    if (!document.getElementById(SITE.introId)) window.bespokeHeroEntrance();
  }

  /* ═══ FIRMA 2 — l'indice del corpo ═══
     La barra fucsia si riempie e il marcatore scende mentre si scorre
     la sezione: è la traduzione visiva del concept (si percorre il sito
     dall'alto al basso come un corpo). Le zone si accendono quando il
     marcatore le raggiunge. */
  var griglia = document.querySelector('.corpo-griglia');
  var riempi = document.getElementById('asseRiempi');
  var marker = document.getElementById('asseMarker');
  var zone = Array.prototype.slice.call(document.querySelectorAll('.zona'));

  function accendiTutte() {
    zone.forEach(function (z) { z.classList.add('attiva'); });
  }

  if (hasST && !reducedMotion && griglia && riempi && marker) {
    gsap.fromTo(riempi, { height: '0%' }, {
      height: '100%', ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: griglia, start: 'top center', end: 'bottom center', scrub: 0.4 },
    });
    gsap.fromTo(marker, { top: '-38vh' }, {
      top: '38vh', ease: 'none', immediateRender: false,
      scrollTrigger: { trigger: griglia, start: 'top center', end: 'bottom center', scrub: 0.4 },
    });
    zone.forEach(function (z) {
      ScrollTrigger.create({
        trigger: z,
        start: 'top 62%',
        end: 'bottom 38%',
        onToggle: function (self) { z.classList.toggle('attiva', self.isActive); },
      });
    });
    /* rete di sicurezza: se per qualsiasi motivo nessuna zona si è accesa
       dopo due secondi, si accendono tutte (nessuno deve trovare il listino
       spento — è il contenuto principale della pagina). */
    setTimeout(function () {
      if (!document.querySelector('.zona.attiva')) accendiTutte();
    }, 2000);
  } else {
    accendiTutte();
  }
})();
