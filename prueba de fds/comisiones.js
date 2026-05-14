'use strict';

(function () {

  /* ══════════════════════════════════════════
     CONFIG
  ══════════════════════════════════════════ */
  const CONFIG = {
    rain: {
      count:       90,
      countMobile: 45,
    },
    particles: {
      count:       22,
      countMobile: 10,
      colors: [
        'rgba(200,123,16,.9)',
        'rgba(61,255,160,.9)',
        'rgba(255,192,64,.8)',
        'rgba(100,255,180,.7)',
      ],
    },
    intro: {
      // Both delays are relative to the moment _startIntro() is called
      // (i.e. after the gate is dismissed), NOT page load time.
      shakeDelay: 1380,  // ms — claw impact moment
      hideDelay:  2900,  // ms — intro fades out
    },
    audio: {
      volume: 0.80,
    },
    card: {
      staggerStep: 0.05,   // seconds per card for staggered entry
    },
  };


  /* ══════════════════════════════════════════
     DATA
     Replace this array with a fetch() call
     when connecting to a backend API.
     Always sanitize user-generated text before
     inserting into the DOM.
  ══════════════════════════════════════════ */
  const COMMISSIONS = [
    {
      name: 'Coordinadores Generales', species: 'Tyrannosaurus Rex',
      badge: '👑', icon: '🦖', featured: true, photo: '',
      tag: 'Mando Principal', danger: 'NIVEL AMENAZA: ALFA MÁXIMO',
      desc: 'Liderazgo supremo del parque. Mando total sobre todas las operaciones y decisiones estratégicas.',
      members: [
        { name: 'Tiffany Alfaro', role: 'Coordinadora General', photo: '' },
        { name: 'Didier Beita',   role: 'Coordinador General',  photo: '' },
      ],
    },
    {
      name: 'Asesores', species: 'Mosasaurus',
      badge: '⭐', icon: '🌊', featured: true, photo: '',
      tag: 'Consultoría Experta', danger: 'ANTIGÜEDAD: CLASIFICADA',
      desc: 'Sabiduría ancestral desde las profundidades. Guían con experiencia incomparable a todo el equipo.',
      members: [
        { name: 'Jessie Mena',     role: 'Asesora · Coordinación', photo: '' },
        { name: 'Sebastian Arias', role: 'Asesor',                  photo: '' },
        { name: 'John Barboza',    role: 'Asesor',                  photo: '' },
        { name: 'Cristina López',  role: 'Asesora',                 photo: '' },
      ],
    },
    {
      name: 'Secretaría', species: 'Velociraptor',
      badge: '📋', icon: '🦕', featured: false, photo: '',
      tag: 'Registros del Parque', danger: 'VELOCIDAD: CRÍTICA',
      desc: 'Inteligencia táctica e impecable organización. Coordinación y registro de todas las operaciones del parque.',
      members: [
        { name: 'Reichel Mora',   role: 'Coordinadora',  photo: '' },
        { name: 'Kembly Fallas',  role: 'Secretaria',    photo: '' },
        { name: 'Wendy Rivera',   role: 'Secretaria',    photo: '' },
        { name: 'Joshua Barboza', role: 'Secretario',    photo: '' },
        { name: 'Keisy Hidalgo',  role: 'Secretaria',    photo: '' },
      ],
    },
    {
      name: 'Coordinación Interna', species: 'Triceratops',
      badge: '🔒', icon: '🛡️', featured: false, photo: '',
      tag: 'Control Interno', danger: 'RESISTENCIA: MÁXIMA',
      desc: 'Defensa y estructura interior. Mantiene el orden y la cohesión dentro de las instalaciones.',
      members: [
        { name: 'Brad Campos',    role: 'Coordinador Interno', photo: '' },
        { name: 'Ayleen Aguero',  role: 'Coordinadora',        photo: '' },
        { name: 'Randy Zuñiga',   role: 'Apoyo',               photo: '' },
        { name: 'Karolain Rojas', role: 'Apoyo',               photo: '' },
      ],
    },
    {
      name: 'Coordinación Externa', species: 'Pteranodon',
      badge: '🌐', icon: '🦅', featured: false, photo: '',
      tag: 'Relaciones Externas', danger: 'ALCANCE: GLOBAL',
      desc: 'Enlace con el mundo exterior. Gestión de relaciones y comunicaciones más allá del recinto.',
      members: [
        { name: 'Cristal Lopez',   role: 'Coordinadora Externa', photo: '' },
        { name: 'Natalia Ulloa',   role: 'Apoyo',                photo: '' },
        { name: 'Axel Masis',      role: 'Apoyo',                photo: '' },
        { name: 'Diana Retana',    role: 'Apoyo',                photo: '' },
        { name: 'Joshua Cordero',  role: 'Apoyo',                photo: '' },
        { name: 'Rachi Pereira',   role: 'Apoyo',                photo: '' },
        { name: 'Andres Valverde', role: 'Apoyo',                photo: '' },
      ],
    },
    {
      name: 'Cocina', species: 'Brachiosaurus',
      badge: '🍽️', icon: '🌿', featured: false, photo: '',
      tag: 'Nutrición del Parque', danger: 'CAPACIDAD: MÁXIMA',
      desc: 'Sustento vital del parque. Alimenta con dedicación y arte a toda la comunidad de la isla.',
      members: [
        { name: 'Mauricio Alfaro',   role: 'Coordinador · Chef',  photo: '' },
        { name: 'Yessleyn Sanabria', role: 'Cocinera',            photo: '' },
        { name: 'Homero Gamboa',     role: 'Cocinero',            photo: '' },
      ],
    },
    {
      name: 'Pulpería', species: 'Stegosaurus',
      badge: '🏪', icon: '🎒', featured: false, photo: '',
      tag: 'Logística y Suministros', danger: 'INVENTARIO: CRÍTICO',
      desc: 'Reservas estratégicas. Almacena y distribuye todos los recursos y suministros esenciales.',
      members: [
        { name: 'Mariana Picado',   role: 'Coordinadora', photo: '' },
        { name: 'Jonathan Vargas',  role: 'Apoyo',        photo: '' },
        { name: 'Emily Vargas',     role: 'Apoyo',        photo: '' },
        { name: 'Fabiola Valverde', role: 'Apoyo',        photo: '' },
        { name: 'Mary Ureña',       role: 'Apoyo',        photo: '' },
        { name: 'Jordy Angulo',     role: 'Apoyo',        photo: '' },
      ],
    },
    {
      name: 'Liturgia', species: 'Dilophosaurus',
      badge: '🙏', icon: '✨', featured: false, photo: '',
      tag: 'Guía Espiritual', danger: 'PRESENCIA: SAGRADA',
      desc: 'Espíritu y alma del parque. Guía espiritual y ceremonial de toda la comunidad.',
      members: [
        { name: 'Madelin Barrios', role: 'Coordinadora de Liturgia', photo: '' },
        { name: 'Sofia Vargas',    role: 'Apoyo Litúrgico',          photo: '' },
        { name: 'Emily Solis',     role: 'Apoyo Litúrgico',          photo: '' },
        { name: 'Rocio Morales',   role: 'Apoyo Litúrgico',          photo: '' },
        { name: 'Alexia Flores',   role: 'Apoyo Litúrgico',          photo: '' },
      ],
    },
    {
      name: 'Comunicación', species: 'Compsognathus',
      badge: '📢', icon: '📡', featured: false, photo: '',
      tag: 'Difusión y Medios', danger: 'VELOCIDAD: SUPERSÓNICA',
      desc: 'Red de mensajería del parque. Rápida, precisa e incansable difusión de información.',
      members: [
        { name: 'Daniel Quiros',   role: 'Coordinador de Comunicación', photo: '' },
        { name: 'Joshua Cordero', role: 'Apoyo Comunicación',         photo: '' },
      ],
    },
    {
      name: 'Sonido', species: 'Parasaurolophus',
      badge: '🔊', icon: '🎵', featured: false, photo: '',
      tag: 'Audio y Producción', danger: 'DECIBELIOS: EXTREMOS',
      desc: 'Resonancia del parque. Maestros del audio que hacen vibrar cada espacio con su talento.',
      members: [
        { name: 'Alejandro Ulloa', role: 'Coordinador de Sonido', photo: '' },
      ],
    },
  ];


  /* ══════════════════════════════════════════
     UTILS
  ══════════════════════════════════════════ */
  const Utils = {
    $(id)           { return document.getElementById(id); },
    isMobile()      { return window.matchMedia('(max-width: 768px)').matches; },
    reducedMotion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; },
    rand(min, max)  { return Math.random() * (max - min) + min; },
  };


  /* ══════════════════════════════════════════
     ATMOSPHERIC FX
  ══════════════════════════════════════════ */
  const AtmosphericFX = {
    init() {
      this._createRain();
      this._createParticles();
    },

    _createRain() {
      const container = Utils.$('rain');
      if (!container) return;
      const count = Utils.isMobile() ? CONFIG.rain.countMobile : CONFIG.rain.count;
      const frag  = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.className = 'drop';
        drop.style.cssText =
          `left:${Utils.rand(0,100)}%;` +
          `height:${Utils.rand(8,26)}px;` +
          `width:${Math.random() > 0.85 ? '2px' : '1px'};` +
          `opacity:${Utils.rand(0.1,0.5).toFixed(2)};` +
          `animation-duration:${Utils.rand(0.4,1).toFixed(2)}s;` +
          `animation-delay:${Utils.rand(0,3).toFixed(2)}s;`;
        frag.appendChild(drop);
      }
      container.appendChild(frag);
    },

    _createParticles() {
      const { colors } = CONFIG.particles;
      const count = Utils.isMobile() ? CONFIG.particles.countMobile : CONFIG.particles.count;
      const frag  = document.createDocumentFragment();
      for (let i = 0; i < count; i++) {
        const p     = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size  = Utils.rand(2, 5);
        p.className = 'particle';
        p.style.cssText =
          `left:${Utils.rand(0,100)}%;` +
          `width:${size}px;height:${size}px;` +
          `background:${color};box-shadow:0 0 ${size*2}px ${color};` +
          `animation-duration:${Utils.rand(8,20).toFixed(1)}s;` +
          `animation-delay:${Utils.rand(0,10).toFixed(1)}s;`;
        frag.appendChild(p);
      }
      document.body.appendChild(frag);
    },
  };


  /* ══════════════════════════════════════════
     INTRO SEQUENCE
     ─────────────────────────────────────────
     AUDIO FLOW:
     1. Page loads → <audio id="roar-audio"> preloads the file silently.
     2. Click gate is shown. The gate button click IS the user interaction
        that satisfies browser autoplay policy.
     3. After the user clicks, _startIntro() fires. At CONFIG.intro.shakeDelay
        (1380ms later), _playRoar() is called. By this time the audio is
        preloaded AND we have a user gesture on the stack, so play() succeeds.
     4. If play() still rejects (e.g. audio file missing, device muted by OS),
        _showSoundFallback() renders a pulsing 🔊 button the user can tap.

     ANIMATION FLOW:
     - #intro starts with class .intro--paused so CSS keyframes are frozen.
     - On gate dismiss, the class is removed → all animations start at t=0.
     - JS setTimeout handles shake (t=1380ms) and fade-out (t=2900ms).
  ══════════════════════════════════════════ */
  const IntroSequence = {
    _audio:        null,
    _audioPlayed:  false,

    init() {
      this._initAudio();
      this._setupGate();
    },

    /* ── Audio ── */

    _initAudio() {
      // Prefer the <audio> element in HTML (multiple formats, better preloading)
      const el = Utils.$('roar-audio');
      if (el) {
        el.volume = CONFIG.audio.volume;
        this._audio = el;
        return;
      }
      // Fallback: create dynamically (only MP3)
      try {
        this._audio = new Audio('audio/roar.mp3');
        this._audio.volume  = CONFIG.audio.volume;
        this._audio.preload = 'auto';
        this._audio.load();
      } catch (_) {
        // Audio API unavailable — continue silently
      }
    },

    _playRoar() {
      if (!this._audio || this._audioPlayed) return;
      this._audioPlayed = true;
      this._audio.currentTime = 0;

      const promise = this._audio.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Very unlikely after a user gesture, but handle gracefully
          this._showSoundFallback();
        });
      }
    },

    _showSoundFallback() {
      if (document.querySelector('.sound-fallback-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'sound-fallback-btn';
      btn.setAttribute('aria-label', 'Reproducir rugido de T-Rex');
      btn.innerHTML = '🔊 <span>Reproducir rugido</span>';
      btn.addEventListener('click', () => {
        this._audioPlayed = false;
        this._playRoar();
        btn.remove();
      }, { once: true });
      document.body.appendChild(btn);
      // Auto-remove after 12s so it doesn't stay forever
      setTimeout(() => { if (btn.parentNode) btn.remove(); }, 12000);
    },

    /* ── Gate ── */

    _setupGate() {
      const gate = Utils.$('click-gate');
      if (!gate) {
        // HTML was modified to remove the gate — start immediately
        this._startIntro();
        return;
      }

      const handleEnter = () => {
        gate.classList.add('gate--exiting');
        // Wait for gate exit animation (0.45s) then start intro
        setTimeout(() => {
          gate.style.display = 'none';
          this._startIntro();
        }, 450);
      };

      // Click anywhere on the gate surface OR button activation
      gate.addEventListener('click', handleEnter, { once: true });

      // Keyboard: gate button handles Enter/Space natively (it's a <button>)
      // But the gate surface itself isn't focusable, so this covers it:
      gate.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleEnter();
        }
      }, { once: true });
    },

    /* ── Intro playback ── */

    _startIntro() {
      const intro = Utils.$('intro');
      if (!intro) return;

      // Release paused animations — all CSS keyframes start from t=0
      intro.classList.remove('intro--paused');

      // Impact moment: audio + flash + screen shake
      setTimeout(() => {
        this._playRoar();
        this._spawnFlash();
        document.body.classList.add('shaking');
        setTimeout(() => document.body.classList.remove('shaking'), 350);
      }, CONFIG.intro.shakeDelay);

      // Fade and remove intro
      setTimeout(() => {
        intro.style.transition = 'opacity 0.3s ease';
        intro.style.opacity    = '0';
        setTimeout(() => {
          intro.style.display = 'none';
          intro.setAttribute('aria-hidden', 'true');
        }, 300);
      }, CONFIG.intro.hideDelay);
    },

    _spawnFlash() {
      const el = document.createElement('div');
      el.className = 'impact-flash';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);
      // Remove after animation completes (0.55s)
      setTimeout(() => el.remove(), 600);
    },
  };


  /* ══════════════════════════════════════════
     COMMISSION GRID
  ══════════════════════════════════════════ */
  const CommissionGrid = {
    _observer: null,

    init() {
      this.render(COMMISSIONS);
      this._setupObserver();
    },

    render(data) {
      const grid = Utils.$('grid');
      if (!grid) return;
      const frag = document.createDocumentFragment();
      data.forEach((commission, index) => frag.appendChild(this._createCard(commission, index)));
      grid.appendChild(frag);
    },

    _createCard(commission, index) {
      const card = document.createElement('article');
      card.className  = `card${commission.featured ? ' featured' : ''}`;
      card.setAttribute('role',       'button');
      card.setAttribute('tabindex',   '0');
      card.setAttribute('aria-label', `Ver comisión: ${commission.name}`);
      card.dataset.stagger = index * CONFIG.card.staggerStep;

      const photoHTML = commission.photo
        ? `<img src="${commission.photo}" alt="Foto de ${commission.name}" loading="lazy"/>`
        : `<div class="photo-placeholder" aria-hidden="true">${commission.icon}</div>`;

      card.innerHTML = `
        <div class="card-stripe" aria-hidden="true"></div>
        <div class="card-head">
          <div class="threat" aria-hidden="true">SECTOR ${String(index + 1).padStart(2, '0')}</div>
          <div class="dino-badge" aria-hidden="true">${commission.badge}</div>
          <div class="photo-ring" aria-hidden="true">
            <div class="photo-inner">${photoHTML}</div>
          </div>
        </div>
        <div class="card-body">
          <div class="card-name">${commission.name}</div>
          <div class="card-species" aria-hidden="true">▸ ${commission.species} ◂</div>
          <div class="card-sep"    aria-hidden="true"></div>
          <p class="card-desc">${commission.desc}</p>
          <span class="card-tag">${commission.tag}</span>
          <div class="card-danger" role="note">⚠ ${commission.danger}</div>
        </div>
        <div class="card-click-hint" aria-hidden="true">[ ver miembros ]</div>
      `;

      const open = () => Modal.open(index);
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
      });
      return card;
    },

    _setupObserver() {
      const cards = document.querySelectorAll('.card');

      if (!('IntersectionObserver' in window) || Utils.reducedMotion()) {
        cards.forEach(c => { c.style.opacity = '1'; });
        return;
      }

      this._observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target;
          card.style.animationDelay = `${card.dataset.stagger}s`;
          card.classList.add('visible');
          this._observer.unobserve(card);
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

      cards.forEach(c => this._observer.observe(c));
    },
  };


  /* ══════════════════════════════════════════
     MODAL
  ══════════════════════════════════════════ */
  const Modal = {
    _overlay:       null,
    _closeBtn:      null,
    _previousFocus: null,

    init() {
      this._overlay  = Utils.$('modal-overlay');
      this._closeBtn = Utils.$('modal-close-btn');
      if (!this._overlay) return;

      this._closeBtn.addEventListener('click', () => this.close());
      this._overlay.addEventListener('click', (e) => {
        if (e.target === this._overlay) this.close();
      });
      document.addEventListener('keydown', (e) => {
        if (!this._overlay.classList.contains('open')) return;
        if (e.key === 'Escape') this.close();
        if (e.key === 'Tab')    this._trapFocus(e);
      });
    },

    open(index) {
      const commission = COMMISSIONS[index];
      if (!commission) return;
      this._previousFocus = document.activeElement;

      Utils.$('m-badge').textContent   = commission.badge;
      Utils.$('m-name').textContent    = commission.name;
      Utils.$('m-species').textContent = `▸ ${commission.species} ◂`;
      Utils.$('m-desc').textContent    = commission.desc;
      this._renderMembers(commission.members, commission.icon);

      this._overlay.setAttribute('aria-hidden', 'false');
      this._overlay.style.visibility    = 'visible';
      this._overlay.style.pointerEvents = 'auto';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        this._overlay.classList.add('open');
        setTimeout(() => this._closeBtn.focus(), 60);
      }));
      document.body.style.overflow = 'hidden';
    },

    close() {
      this._overlay.classList.remove('open');
      this._overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        this._overlay.style.visibility    = 'hidden';
        this._overlay.style.pointerEvents = 'none';
      }, 450);
      if (this._previousFocus) {
        this._previousFocus.focus();
        this._previousFocus = null;
      }
    },

    _renderMembers(members, fallbackIcon) {
      const container = Utils.$('m-members');
      if (!container) return;
      if (!members || !members.length) {
        container.innerHTML = '<div class="no-members">Sin miembros asignados</div>';
        return;
      }
      const frag = document.createDocumentFragment();
      members.forEach((member) => {
        const card = document.createElement('div');
        card.className = 'member-card';
        const photoHTML = member.photo
          ? `<img src="${member.photo}" alt="${member.name}" loading="lazy"/>`
          : `<div class="member-emoji" aria-hidden="true">${fallbackIcon}</div>`;
        card.innerHTML = `
          <div class="member-ring" aria-hidden="true">
            <div class="member-photo">${photoHTML}</div>
          </div>
          <div class="member-name">${member.name}</div>
          <div class="member-role">${member.role}</div>
        `;
        frag.appendChild(card);
      });
      container.innerHTML = '';
      container.appendChild(frag);
    },

    _trapFocus(event) {
      const modal     = Utils.$('modal');
      const focusable = Array.from(modal.querySelectorAll(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      ));
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    },
  };


  /* ══════════════════════════════════════════
     INIT
  ══════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    if (Utils.reducedMotion()) {
      // Skip all motion; hide gate + intro via CSS, but also imperatively
      // in case the CSS rule hasn't applied yet (e.g. FOUC edge cases).
      const gate  = Utils.$('click-gate');
      const intro = Utils.$('intro');
      if (gate)  gate.style.display  = 'none';
      if (intro) intro.style.display = 'none';
    } else {
      AtmosphericFX.init();
      IntroSequence.init();
    }

    CommissionGrid.init();
    Modal.init();
  });

})();
