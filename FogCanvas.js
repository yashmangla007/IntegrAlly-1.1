/**
 * FogCanvas.js — IntegrAlly Homepage Atmospheric Layer  (v3)
 *
 * ARCHITECTURE
 * ────────────
 * • Canvas sits at z-index:1  (above botanical bg -2 / noise -1,
 *   BELOW .homepage at z-index:2 → cards and branding float on top).
 * • pointer-events:none — never intercepts clicks or inputs.
 *
 * RENDERING  (per-frame, clearRect each tick)
 *  1. Word collage   — from a static offscreen canvas, blended at 22% opacity
 *  2. Fog base fill  — tinted to look like fog, NOT a plain white/dark screen
 *  3. Fog blobs      — 6 soft radial gradients that drift slowly (real fog feel)
 *  4. Edge vignette  — subtle darker rim for depth
 *  5. Cursor holes   — destination-out circles; FADE BACK over ~3.6 s after
 *                      cursor leaves, giving the "re-fogging" behaviour
 *
 * Call  window.initFogCanvas()  after DOMContentLoaded.
 */

(function () {
  'use strict';

  /* ─── Extended word list ────────────────────────────────────── */
  const WORDS = [
    /* original core */
    'I remember', 'testimony', '3rd March', 'she said', 'evidence',
    'bruise', 'I was there', 'statement', 'he told me', 'I am certain',
    'it happened', 'witness', 'my account', 'that night', 'I felt',
    'record', 'affidavit', 'I know', 'the truth', 'documented',
    'memory', 'I saw', 'it was real', 'I survived', 'my words',
    'deposition', 'I am valid', 'I was heard',
    /* extended */
    'corroborate', 'sworn', 'I disclose', 'narrative', 'my experience',
    'firsthand', 'I speak', 'lived truth', 'I attest', 'before the court',
    'I stand by', 'proof', 'my voice', 'preserved', 'I carry this',
    'he was there', 'recorded', 'typed', 'signed', 'acknowledged',
    'on the record', 'not forgotten', 'lodged', 'catalogued',
    'safe to say now', 'fact of record', 'October 2nd', 'April 7th',
    'her account', 'they heard me', 'found', 'protected', 'stored safely',
    'named', 'the time was', 'I told them', 'I wrote this',
    'kept for safekeeping', 'unsilenced', 'my pain', 'I disclose this',
    'these are facts', 'witnessed', 'my clarity', 'I was not alone',
    'the date', 'confirmed', 'I am here', 'speak up', 'remember',
    'I held on', 'this is real', 'I endure', 'written down',
    'I came forward', 'the record stands', 'my testimony matters',
  ];

  /* ─── Seeded PRNG (Mulberry32) ──────────────────────────────── */
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function todaySeed() {
    const d = new Date();
    return (d.getFullYear() * 10000) + ((d.getMonth() + 1) * 100) + d.getDate();
  }

  /* ─── Helpers ───────────────────────────────────────────────── */
  function isDarkMode() {
    const root = document.documentElement;
    if (root.classList.contains('dark-mode'))  return true;
    if (root.classList.contains('light-mode')) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function isMobile() {
    return window.matchMedia('(max-width: 767px)').matches ||
      ('ontouchstart' in window && window.innerWidth <= 767);
  }

  /* ─── Fog colour palette ────────────────────────────────────── *
   *  Light: warm muted sage-grey — NOTICEABLY different from ivory *
   *  Dark : forest-green haze   — NOTICEABLY lighter than bg       */
  const FOG = {
    light: {
      base:      'rgba(198, 192, 178, 0.91)',  // warm grey — foggy, not white
      blobLight: 'rgba(230, 225, 215, 0.06)',
      blobDark:  'rgba(150, 140, 120, 0.07)',
      word:      '#2D4A3E',
    },
    dark: {
      base:      'rgba(46, 63, 53, 0.92)',     // forest-green haze — lighter than #1A1F1C
      blobLight: 'rgba(80, 110, 85, 0.08)',
      blobDark:  'rgba(20, 28, 23, 0.10)',
      word:      '#E8EDE9',
    },
  };

  /* ─── Timing constants ──────────────────────────────────────── */
  const R_DESKTOP   = 68;   // clear radius, desktop (px)
  const R_MOBILE    = 48;   // clear radius, mobile (px)
  const HOLD_MS     = 1200; // hole stays fully open for 1.2 s after cursor leaves
  const FADE_MS     = 2400; // then fades closed over 2.4 s  (total ~3.6 s)
  const TOTAL_MS    = HOLD_MS + FADE_MS;
  const THROTTLE_MS = 32;   // max one stored point per 32 ms (~30 pts/s)

  /* ═══════════════════════════════════════════════════════════════
     MAIN CLASS
     ═══════════════════════════════════════════════════════════════ */
  class FogCanvas {
    constructor(container = document.body) {
      this._container   = container;
      this._rafId       = null;
      this._cursor      = null;    // { x, y } — current pointer in CSS px
      this._clearPoints = [];      // [{ x, y, t }]  — timed trail for re-fog
      this._lastPushed  = 0;
      this._offWords    = null;    // static word-collage offscreen canvas
      this._blobs       = [];      // precomputed fog-blob descriptors
      this._currentDark = isDarkMode();
      this._destroyed   = false;

      this._onMouseMove  = this._onMouseMove.bind(this);
      this._onMouseLeave = this._onMouseLeave.bind(this);
      this._onTouchMove  = this._onTouchMove.bind(this);
      this._onResize     = this._onResize.bind(this);
      this._onThemeMut   = this._onThemeMut.bind(this);

      this._init();
    }

    /* ── Bootstrap ────────────────────────────────────────────── */
    _init() {
      this._canvas = document.createElement('canvas');
      const s = this._canvas.style;
      s.position      = 'fixed';
      s.top           = '0';
      s.left          = '0';
      s.width         = '100vw';
      s.height        = '100vh';
      /* z-index 1: above botanical bg (-2) & noise overlay (-1),
         BELOW .homepage (z:2) so cards & branding float above   */
      s.zIndex        = '1';
      s.pointerEvents = 'none';  /* CRITICAL — never blocks interactions */
      this._canvas.setAttribute('aria-hidden', 'true');

      this._container.insertBefore(this._canvas, this._container.firstChild);
      this._ctx = this._canvas.getContext('2d');

      this._resize();
      this._buildWords();

      window.addEventListener('mousemove',  this._onMouseMove,  { passive: true });
      window.addEventListener('mouseleave', this._onMouseLeave, { passive: true });
      window.addEventListener('touchmove',  this._onTouchMove,  { passive: true });
      window.addEventListener('resize',     this._onResize,     { passive: true });

      this._observer = new MutationObserver(this._onThemeMut);
      this._observer.observe(document.documentElement, {
        attributes: true, attributeFilter: ['class'],
      });

      prefersReducedMotion() ? this._drawStatic() : this._loop();
    }

    /* ── Cleanup ──────────────────────────────────────────────── */
    destroy() {
      this._destroyed = true;
      if (this._rafId) cancelAnimationFrame(this._rafId);
      window.removeEventListener('mousemove',  this._onMouseMove);
      window.removeEventListener('mouseleave', this._onMouseLeave);
      window.removeEventListener('touchmove',  this._onTouchMove);
      window.removeEventListener('resize',     this._onResize);
      this._observer.disconnect();
      if (this._canvas.parentNode) this._canvas.parentNode.removeChild(this._canvas);
    }

    /* ── Resize ───────────────────────────────────────────────── */
    _resize() {
      const dpr = window.devicePixelRatio || 1;
      const w   = window.innerWidth;
      const h   = window.innerHeight;
      this._canvas.width  = Math.round(w * dpr);
      this._canvas.height = Math.round(h * dpr);
      this._ctx.setTransform(1, 0, 0, 1, 0, 0);
      this._ctx.scale(dpr, dpr);
      this._dpr = dpr;
      this._w   = w;
      this._h   = h;
    }

    _onResize() {
      this._resize();
      this._buildWords();
      if (prefersReducedMotion()) this._drawStatic();
    }

    _onThemeMut() {
      const nowDark = isDarkMode();
      if (nowDark !== this._currentDark) {
        this._currentDark = nowDark;
        this._buildWords();
        if (prefersReducedMotion()) this._drawStatic();
      }
    }

    /* ── Build static word-collage offscreen canvas ───────────── */
    _buildWords() {
      const dark      = this._currentDark;
      const cfg       = dark ? FOG.dark : FOG.light;
      const oc        = document.createElement('canvas');
      oc.width        = this._canvas.width;
      oc.height       = this._canvas.height;
      const octx      = oc.getContext('2d');
      const dpr       = this._dpr || 1;
      octx.setTransform(1, 0, 0, 1, 0, 0);
      octx.scale(dpr, dpr);

      const rand   = mulberry32(todaySeed());
      const EDGE_M = 36;

      octx.globalAlpha = 0.22;

      for (const word of WORDS) {
        const fontSize = 10 + rand() * 13;                     // 10–23 px
        const rotation = (rand() * 40 - 20) * (Math.PI / 180); // ±20°
        const x        = EDGE_M + rand() * (this._w - EDGE_M * 2);
        const y        = EDGE_M + rand() * (this._h - EDGE_M * 2);

        octx.save();
        octx.translate(x, y);
        octx.rotate(rotation);
        octx.font         = `italic ${fontSize}px 'Lora', Georgia, serif`;
        octx.fillStyle    = cfg.word;
        octx.textBaseline = 'middle';
        octx.fillText(word, 0, 0);
        octx.restore();
      }

      octx.globalAlpha = 1;
      this._offWords = oc;

      /* Precompute fog-blob descriptors (used for animated drift per frame) */
      const br = mulberry32(todaySeed() + 13);
      this._blobs = Array.from({ length: 6 }, () => ({
        fx:    0.08 + br() * 0.84,   // base X as fraction of W
        fy:    0.08 + br() * 0.84,   // base Y as fraction of H
        r:     160 + br() * 230,     // radius px
        alpha: 0.035 + br() * 0.05,  // opacity
        phase: br() * Math.PI * 2,   // drift phase offset
        light: br() > 0.5,           // lighter or darker blob
      }));
    }

    /* ── Input: mouse ─────────────────────────────────────────── */
    _onMouseMove(e) {
      const now = Date.now();
      this._cursor = { x: e.clientX, y: e.clientY };
      if (now - this._lastPushed >= THROTTLE_MS) {
        this._clearPoints.push({ x: e.clientX, y: e.clientY, t: now });
        this._lastPushed = now;
      }
    }

    /* Cursor left the window — push current pos to trail so it fades */
    _onMouseLeave() {
      if (this._cursor) {
        this._clearPoints.push({ ...this._cursor, t: Date.now() });
        this._cursor = null;
      }
    }

    /* ── Input: touch ─────────────────────────────────────────── */
    _onTouchMove(e) {
      if (!e.touches || !e.touches.length) return;
      const t = e.touches[0];
      const now = Date.now();
      this._cursor = { x: t.clientX, y: t.clientY };
      if (now - this._lastPushed >= THROTTLE_MS) {
        this._clearPoints.push({ x: t.clientX, y: t.clientY, t: now });
        this._lastPushed = now;
      }
    }

    /* ── Static render (prefers-reduced-motion) ───────────────── */
    _drawStatic() {
      const ctx  = this._ctx;
      const cfg  = this._currentDark ? FOG.dark : FOG.light;
      ctx.clearRect(0, 0, this._w, this._h);
      if (this._offWords) ctx.drawImage(this._offWords, 0, 0, this._w, this._h);
      ctx.globalAlpha = 0.55;
      ctx.fillStyle   = cfg.base;
      ctx.fillRect(0, 0, this._w, this._h);
      ctx.globalAlpha = 1;
    }

    /* ── RAF loop ─────────────────────────────────────────────── */
    _loop() {
      if (this._destroyed) return;
      this._draw();
      this._rafId = requestAnimationFrame(() => this._loop());
    }

    /* ── Per-frame composite ──────────────────────────────────── */
    _draw() {
      const ctx    = this._ctx;
      const W      = this._w;
      const H      = this._h;
      const dark   = this._currentDark;
      const cfg    = dark ? FOG.dark : FOG.light;
      const mobile = isMobile();
      const now    = Date.now();
      const R      = mobile ? R_MOBILE : R_DESKTOP;

      // Expire old clear-points
      this._clearPoints = this._clearPoints.filter(pt => now - pt.t < TOTAL_MS);

      ctx.clearRect(0, 0, W, H);

      /* ─── LAYER 1: word collage ─────────────────────────────── */
      if (this._offWords) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.drawImage(this._offWords, 0, 0, W, H);
      }

      /* ─── LAYER 2: fog base fill ────────────────────────────── */
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = cfg.base;
      ctx.fillRect(0, 0, W, H);

      /* ─── LAYER 2b: slowly drifting fog blobs ───────────────── *
       *  6 large soft radial gradients that slowly drift.           *
       *  This is what makes it look like fog rather than flat paint.*
       *  Base-positions precomputed; drift uses Date.now().         */
      const drift = now * 0.000035;
      for (let i = 0; i < this._blobs.length; i++) {
        const b  = this._blobs[i];
        const bx = b.fx * W + Math.sin(drift + b.phase) * 28;
        const by = b.fy * H + Math.cos(drift + b.phase * 0.71) * 20;
        const blobGrad = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        const colour   = b.light ? cfg.blobLight : cfg.blobDark;
        blobGrad.addColorStop(0, colour);
        blobGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = blobGrad;
        ctx.fillRect(bx - b.r, by - b.r, b.r * 2, b.r * 2);
      }

      /* ─── LAYER 2c: edge vignette (depth / fog thickness) ────── */
      const vig = ctx.createRadialGradient(
        W * 0.5, H * 0.5, 0,
        W * 0.5, H * 0.5, Math.max(W, H) * 0.68
      );
      vig.addColorStop(0,   'rgba(0,0,0,0)');
      vig.addColorStop(0.55,'rgba(0,0,0,0)');
      vig.addColorStop(1,   dark
        ? 'rgba(0,0,0,0.22)'
        : 'rgba(80,70,55,0.12)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      /* ─── LAYER 3: cursor reveal holes (destination-out) ─────── *
       *  • Current cursor   → full opacity hole, always present      *
       *  • Stored trail pts → fade from full → 0 over HOLD+FADE ms  */
      ctx.globalCompositeOperation = 'destination-out';

      // Current cursor (no expiry — stays open while cursor is here)
      if (this._cursor) {
        const { x, y } = this._cursor;
        const wobble   = Math.sin(now * 0.0011) * 3;
        const r        = R + wobble;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,    'rgba(0,0,0,1)');
        g.addColorStop(0.45, 'rgba(0,0,0,0.85)');
        g.addColorStop(0.80, 'rgba(0,0,0,0.35)');
        g.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }

      // Timed trail — fades back
      for (const pt of this._clearPoints) {
        const age = now - pt.t;
        let   opacity;
        if (age < HOLD_MS) {
          opacity = 1.0;                          // hold phase
        } else {
          opacity = 1.0 - (age - HOLD_MS) / FADE_MS; // fade phase
        }
        if (opacity <= 0.01) continue;

        // Radius shrinks slightly as opacity drops → natural closing look
        const r = R * (0.25 + 0.75 * opacity);
        const g = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, r);
        g.addColorStop(0,    `rgba(0,0,0,${opacity})`);
        g.addColorStop(0.5,  `rgba(0,0,0,${opacity * 0.7})`);
        g.addColorStop(0.85, `rgba(0,0,0,${opacity * 0.2})`);
        g.addColorStop(1,    'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(pt.x - r, pt.y - r, r * 2, r * 2);
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }
  }

  /* ─── Public init ───────────────────────────────────────────── */
  window.initFogCanvas = function (container) {
    const target = container || document.body;
    if (target._fogCanvas) target._fogCanvas.destroy();
    target._fogCanvas = new FogCanvas(target);
    return target._fogCanvas;
  };

})();
