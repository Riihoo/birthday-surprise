/* =========================================================
   Happy Birthday, My Love ❤️ — Script
   ---------------------------------------------------------
   👉 Everything you'll want to personalize is in CONFIG below.
      You don't need to touch the rest of this file.
   ========================================================= */
'use strict';

/* =========================================================
   💝 1. PERSONALIZE HERE
   ========================================================= */
const CONFIG = {
  // Her name: shown on the opening screen ("For Neth 💕") and the celebration
  // ("It's your day, Neth"). Leave '' to use "For the one who owns my heart" instead.
  herName: 'Neth',

  // Your name, used to sign the letter and the final screen.
  yourName: 'Alee',

  // Your song (see music/README.txt).
  music: 'music/romantic-song.mp3',

  // true  = music starts automatically (browsers only allow sound after her first tap,
  //         so it begins the moment she taps "Open Your Surprise 💌").
  // false = music stays off until she taps the 🎵 button.
  autoPlayMusic: true,

  // The photo in the glowing circle on the final screen.
  finalePhoto: 'images/images-couple1.JPG',

  /* ---------- Photo gallery ----------
     Add, remove or reorder freely. Works with any number of photos (10–15 is perfect).
     - src:     path to the photo inside the images/ folder (filenames are case-sensitive on some systems)
     - caption: optional text under the photo ('' for none)
     - alt:     optional short description for screen readers
     TIP: If you empty this list ( photos: [] ), the site automatically looks for
          images/photo1.jpg … images/photo15.jpg and shows whichever exist. */
  photos: [
    { src: 'images/images-couple1.JPG', caption: 'One of my favorite memories with you ❤️', alt: 'Us together, smiling with our drinks' },
    { src: 'images/image1.jpg',         caption: 'Your smile makes everything better.' },
    { src: 'images/image2.jpg',         caption: 'A moment I wish I could live again.' },
    { src: 'images/image3.jpg',         caption: 'My favorite person, always.' },
    { src: 'images/image-couple2.jpg',  caption: 'Every picture tells a story of us.', alt: 'Our mirror photo together among the trees' },
    { src: 'images/image4.jpg',         caption: 'You make ordinary days feel magical ✨' },
    { src: 'images/image5.jpg',         caption: 'The prettiest view, every single time.' },
    { src: 'images/image6.jpg',         caption: 'I’d choose you in every lifetime.' },
    { src: 'images/image7.jpg',         caption: 'Wherever you are is my favorite place.' },
    { src: 'images/image8.jpg',         caption: 'Still can’t believe you’re mine.' },
    { src: 'images/image9.jpg',         caption: 'My whole heart, in one picture 💕' },
    { src: 'images/image10.jpg',        caption: 'Forever my favorite chapter.' },
    { src: 'images/image12.jpg',        caption: 'Main character energy, always ✨', alt: 'Her posing on a quiet tree-lined road' },
    { src: 'images/image13.jpg',        caption: 'Like a fairytale, and you’re the princess 👑', alt: 'Her in a black dress beside a big tree and a green pond' },
    { src: 'images/image11.jpg',        caption: 'Here’s to a million more memories 🥂' },
  ],

  /* ---------- Love story timeline ----------
     Replace each `date` with the real date (e.g. 'March 14, 2023') and make the text yours.
     The item with `today: true` and an empty date shows today's date automatically. */
  timeline: [
    {
      date: 'Where it all began',
      icon: '✨',
      title: 'The Day We First Met',
      text: 'I didn’t know it yet, but that ordinary day quietly became the beginning of my favorite story.',
    },
    {
      date: 'The first spark',
      icon: '😊',
      title: 'The First Time We Made Each Other Smile',
      text: 'One little moment, one silly laugh — and suddenly I couldn’t stop thinking about you.',
    },
    {
      date: 'Our adventures',
      icon: '🌿',
      title: 'Our Favorite Memories Together',
      text: 'Coffee dates, long talks, little trips and photos we’ll laugh at forever. Every single one is a treasure to me.',
    },
    {
      date: 'The little things',
      icon: '💞',
      title: 'The Moments That Made Us, Us',
      text: 'The way you care, the way you listen, the way you hold my hand. It’s the little things that make me fall for you more every day.',
    },
    {
      date: '',            // leave empty → shows today's date
      today: true,
      icon: '🎂',
      title: 'Today — Celebrating You',
      text: 'Another year of the most beautiful girl in my world, and I’m the lucky one who gets to celebrate it with you.',
    },
  ],

  /* ---------- The love letter ----------
     Write freely between the backticks. Blank lines become new paragraphs. */
  letter: `My love,

Happy Birthday to the most beautiful girl in my world. ❤️

I may not always find the perfect words to express how I feel, but I hope you know how special you are to me. Your smile makes my days brighter, your presence makes ordinary moments unforgettable, and every memory with you becomes something I want to keep forever.

On your special day, I wish you endless happiness, good health, success, and all the beautiful things your heart dreams of.

Thank you for being you. Thank you for all the little moments that mean so much to me.

No matter how many birthdays come and go, I hope I can keep making beautiful memories with you.

Happy Birthday, my love. You deserve the whole world. ❤️`,

  signOff: 'Forever yours,',

  // Typing speed of the letter (milliseconds per character). Lower = faster.
  typingSpeed: 28,

  /* ---------- Gift box ---------- */
  finalWish: 'May this new year of your life be full of laughter that makes your cheeks hurt, dreams that come true one by one, and love that wraps around you every single day. I’ll be right here, cheering for you and holding your hand through all of it. Happy Birthday, my love. 🎂✨',
};

// Captions used when CONFIG.photos is empty (auto photo1…photo15 mode)
const DEFAULT_CAPTIONS = [
  'One of my favorite memories with you ❤️',
  'Your smile makes everything better.',
  'A moment I wish I could live again.',
  'My favorite person, always.',
  'Every picture tells a story of us.',
];


/* =========================================================
   2. Helpers
   ========================================================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const PALETTE = ['#f0628a', '#ffd1dc', '#cdb8f2', '#e8b76a', '#ff8fab', '#fff2c7', '#a35ad6', '#ffffff'];

/** Draws a heart path inside a box of `size` px whose top-left is (x, y). */
function heartPath(ctx, x, y, size) {
  const s = size;
  ctx.beginPath();
  ctx.moveTo(x + s * .5, y + s * .3);
  ctx.bezierCurveTo(x + s * .5, y + s * .27, x + s * .45, y + s * .15, x + s * .25, y + s * .15);
  ctx.bezierCurveTo(x, y + s * .15, x, y + s * .4, x, y + s * .4);
  ctx.bezierCurveTo(x, y + s * .55, x + s * .15, y + s * .72, x + s * .5, y + s * .9);
  ctx.bezierCurveTo(x + s * .85, y + s * .72, x + s, y + s * .55, x + s, y + s * .4);
  ctx.bezierCurveTo(x + s, y + s * .4, x + s, y + s * .15, x + s * .75, y + s * .15);
  ctx.bezierCurveTo(x + s * .6, y + s * .15, x + s * .5, y + s * .27, x + s * .5, y + s * .3);
  ctx.closePath();
}

/** Locks / unlocks page scrolling with a class on <body>. */
function setLock(cls, on) {
  document.body.classList.toggle(cls, on);
}

/** Small message at the bottom of the screen. */
let toastTimer;
function toast(message, ms = 4200) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), ms);
}

/** A tiny vibration on phones that support it (most Android phones; iPhones ignore it). */
function buzz(pattern) {
  if (reducedMotion || !navigator.vibrate) return;
  try { navigator.vibrate(pattern); } catch (_) { /* not allowed yet */ }
}

/** Splits text into characters without breaking emoji apart. */
const graphemes = (str) => (window.Intl && Intl.Segmenter
  ? [...new Intl.Segmenter(undefined, { granularity: 'grapheme' }).segment(str)].map((s) => s.segment)
  : Array.from(str));

/** Wraps every letter of a heading in its own span so the letters can flip in, one by one, in 3D. */
function splitLetters(el) {
  el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
  let i = 0;
  [...el.childNodes].forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (!part.trim()) { frag.append(' '); return; }
        const word = document.createElement('span');
        word.className = 'word';
        word.setAttribute('aria-hidden', 'true');
        graphemes(part).forEach((g) => {
          const ch = document.createElement('span');
          ch.className = 'ch';
          ch.style.setProperty('--i', i++);
          ch.textContent = g;
          word.append(ch);
        });
        frag.append(word);
      });
      child.replaceWith(frag);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      // Styled bits (like the shimmering "My Love!") flip in as one piece
      const ch = document.createElement('span');
      ch.className = 'ch';
      ch.setAttribute('aria-hidden', 'true');
      ch.style.setProperty('--i', i);
      i += 3;
      child.replaceWith(ch);
      ch.append(child);
    }
  });
}
$$('[data-split]').forEach(splitLetters);

/** Builds a ring of little hearts that orbits in 3D (passing in front of and behind things). */
function buildOrbit(el) {
  const glyphs = el.dataset.orbit.split(' ');
  const ring = document.createElement('div');
  ring.className = 'orbit-ring';
  glyphs.forEach((glyph, k) => {
    const slot = document.createElement('span');
    slot.className = 'orbit-slot';
    slot.style.setProperty('--a', `${(360 / glyphs.length) * k}deg`);
    const face = document.createElement('span');
    face.className = 'orbit-glyph';
    face.textContent = glyph;
    slot.append(face);
    ring.append(slot);
  });
  el.append(ring);
}
$$('[data-orbit]').forEach(buildOrbit);


/* =========================================================
   2b. Tilt: her phone's motion sensor (or the mouse on a computer)
       turns into 3D depth. Elements with data-tilt="deg" rotate,
       elements with data-depth="px" drift like parallax layers.
   ========================================================= */
const Tilt = (() => {
  const state = { x: 0, y: 0 };           // smoothed, −1 … 1
  let tx = 0, ty = 0;                     // where we're easing towards
  let baseBeta = null, baseGamma = null;  // however she naturally holds the phone counts as "flat"
  let listening = false, rafId = 0;
  const visible = new Set();

  function apply(el) {
    if (el.dataset.tilt) {
      const d = parseFloat(el.dataset.tilt);
      el.style.transform = `perspective(900px) rotateX(${(state.y * d).toFixed(2)}deg) rotateY(${(state.x * d).toFixed(2)}deg)`;
    } else {
      const d = parseFloat(el.dataset.depth);
      el.style.transform = `translate3d(${(-state.x * d).toFixed(1)}px, ${(-state.y * d).toFixed(1)}px, 0)`;
    }
  }

  function frame() {
    rafId = 0;
    state.x += (tx - state.x) * .08;
    state.y += (ty - state.y) * .08;
    visible.forEach(apply);
    if (Math.abs(tx - state.x) > .002 || Math.abs(ty - state.y) > .002) rafId = requestAnimationFrame(frame);
  }
  const kick = () => { if (!rafId && !reducedMotion) rafId = requestAnimationFrame(frame); };

  function onOrientation(e) {
    if (e.beta == null || e.gamma == null) return;
    let b = e.beta, g = e.gamma;
    const angle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
    if (angle === 90) [b, g] = [-g, b];                       // landscape
    else if (angle === -90 || angle === 270) [b, g] = [g, -b];
    if (baseBeta === null) { baseBeta = b; baseGamma = g; }
    baseBeta += (b - baseBeta) * .015;                       // slowly re-centre
    baseGamma += (g - baseGamma) * .015;
    tx = clamp((g - baseGamma) / 20, -1, 1);
    ty = clamp((b - baseBeta) / 20, -1, 1);
    kick();
  }

  function listen() {
    if (listening || reducedMotion) return;
    listening = true;
    window.addEventListener('deviceorientation', onOrientation);
  }

  // Computers: follow the mouse
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      kick();
    }, { passive: true });
  }

  // Android gives motion without asking; iPhone needs permission from a tap (see enable)
  const needsPermission = typeof DeviceOrientationEvent !== 'undefined'
    && typeof DeviceOrientationEvent.requestPermission === 'function';
  if (typeof DeviceOrientationEvent !== 'undefined' && !needsPermission) listen();

  /** Call from inside a tap handler: asks iPhone for motion access. */
  function enable() {
    if (!needsPermission || listening) return;
    DeviceOrientationEvent.requestPermission()
      .then((res) => { if (res === 'granted') listen(); })
      .catch(() => {});
  }

  // Only animate what's on screen
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { visible.add(en.target); apply(en.target); }
    else visible.delete(en.target);
  }));
  $$('[data-tilt], [data-depth]').forEach((el) => io.observe(el));

  return { state, enable };
})();


/* =========================================================
   3. Floating hearts & sparkles (lightweight canvas)
   ========================================================= */
function createParticleField(canvas, options = {}) {
  const opts = Object.assign({
    density: 30,          // particles on a ~1400px wide screen
    colors: ['#f0628a', '#f6b6c8', '#cdb8f2', '#e8b76a'],
    sparkleRatio: .4,     // share of particles that are sparkles instead of hearts
    edgeBias: false,      // on wide screens keep particles near the sides (away from text)
    maxAlpha: .8,
  }, options);

  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;
  let particles = [];
  let running = false, rafId = 0, last = 0;

  // Pre-render sprites once (much faster than drawing paths every frame)
  const heartSprites = new Map();
  function heartSprite(color) {
    if (heartSprites.has(color)) return heartSprites.get(color);
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    g.shadowColor = color;
    g.shadowBlur = 10;
    g.fillStyle = color;
    heartPath(g, 10, 8, 44);
    g.fill();
    heartSprites.set(color, c);
    return c;
  }
  const sparkleSprite = (() => {
    const size = 32;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(.25, 'rgba(255,240,220,.8)');
    grad.addColorStop(1, 'rgba(255,220,230,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    g.fillStyle = 'rgba(255,255,255,.9)';
    g.fillRect(15, 3, 2, 26);
    g.fillRect(3, 15, 26, 2);
    return c;
  })();

  function targetCount() {
    const scale = clamp(w / 1400, .45, 1.2);
    return Math.round(opts.density * scale * (reducedMotion ? .4 : 1));
  }

  function spawn(p, initial) {
    p.heart = Math.random() > opts.sparkleRatio;
    let x = Math.random() * w;
    if (opts.edgeBias && w > 900) {
      const side = w * .2;
      x = Math.random() < .5 ? Math.random() * side : w - Math.random() * side;
    }
    p.x = x;
    p.y = initial ? Math.random() * h : h + 30;
    p.z = rand(.35, 1.3);              // depth: near ones are bigger, faster and drift more when she tilts
    p.size = (p.heart ? rand(10, 24) : rand(8, 16)) * p.z;
    p.vy = rand(14, 38) * (.55 + .45 * p.z);
    p.sway = rand(8, 34) * p.z;
    p.phase = Math.random() * Math.PI * 2;
    p.freq = rand(.35, 1);
    p.alpha = rand(.35, opts.maxAlpha) * (.5 + .5 * Math.min(p.z, 1));
    p.color = pick(opts.colors);
    p.rot = rand(-.35, .35);
    p.tw = rand(1.5, 4);
    return p;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const want = targetCount();
    while (particles.length < want) particles.push(spawn({}, true));
    particles.length = want;
  }

  function frame(now) {
    if (!running) return;
    const dt = Math.min((now - last) / 1000, .05);
    last = now;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const px = Tilt.state.x * 30, py = Tilt.state.y * 20;
    for (const p of particles) {
      p.y -= p.vy * dt;
      p.phase += p.freq * dt;
      if (p.y < -40) spawn(p, false);
      const x = p.x + Math.sin(p.phase) * p.sway + px * p.z;
      const y = p.y + py * p.z;
      // fade in from the bottom and out near the top
      const edgeFade = clamp(p.y / (h * .25), 0, 1) * clamp((h - p.y) / 80, 0, 1);

      if (p.heart) {
        ctx.globalAlpha = p.alpha * edgeFade;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.translate(x, y);
        ctx.rotate(p.rot + Math.sin(p.phase) * .2);
        ctx.scale(Math.cos(p.phase * 1.7), 1);   // slowly spins round, like a 3D coin
        ctx.drawImage(heartSprite(p.color), -p.size / 2, -p.size / 2, p.size, p.size);
      } else {
        const twinkle = .45 + .55 * Math.sin(now / 1000 * p.tw + p.phase);
        ctx.globalAlpha = p.alpha * edgeFade * Math.max(twinkle, 0);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.drawImage(sparkleSprite, x - p.size / 2, y - p.size / 2, p.size, p.size);
      }
    }
    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(frame);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { if (running) resize(); }, 150);
  });

  return {
    start() {
      if (running) return;
      running = true;
      resize();
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    },
    stop() {
      running = false;
      cancelAnimationFrame(rafId);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    get running() { return running; },
  };
}

const entranceField = createParticleField($('#entranceSky'), {
  density: 46,
  colors: ['#ffffff', '#ffe1ea', '#f0628a', '#e2c6ff', '#ffd59e'],
  sparkleRatio: .45,
  maxAlpha: .9,
});

const pageField = createParticleField($('#sky'), {
  density: 22,
  colors: ['#f0628a', '#f6b6c8', '#cdb8f2', '#e8b76a'],
  sparkleRatio: .35,
  edgeBias: true,
  maxAlpha: .55,
});

// Pause the effects when the tab is hidden (saves battery)
let activeField = entranceField;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) activeField.stop();
  else activeField.start();
});


/* =========================================================
   4. Confetti
   ========================================================= */
const Confetti = (() => {
  const canvas = $('#confetti');
  const ctx = canvas.getContext('2d');
  const MAX = 450;
  let pieces = [];
  let w = 0, h = 0, dpr = 1, rafId = 0, last = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  function makePiece(x, y, vx, vy, heartChance) {
    const r = Math.random();
    return {
      x, y, vx, vy,
      size: rand(7, 12),
      color: pick(PALETTE),
      shape: r < heartChance ? 'heart' : (r < heartChance + (1 - heartChance) / 2 ? 'rect' : 'circle'),
      rot: rand(0, Math.PI * 2),
      vr: rand(-6, 6),
      flip: rand(0, Math.PI * 2),
      life: 0,
      ttl: rand(2.6, 4.6),
    };
  }

  function ensureRunning() {
    if (!rafId) {
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }

  /** Explosion of confetti from a point. Angles in radians (−π/2 = straight up). */
  function burst({ x = w / 2, y = h / 2, count = 120, angle = -Math.PI / 2, spread = Math.PI * .9, power = 1, hearts = .25 } = {}) {
    const n = Math.round(count * (reducedMotion ? .25 : 1));
    for (let i = 0; i < n && pieces.length < MAX; i++) {
      const a = angle + rand(-spread / 2, spread / 2);
      const speed = rand(320, 820) * power;
      pieces.push(makePiece(x, y, Math.cos(a) * speed, Math.sin(a) * speed, hearts));
    }
    ensureRunning();
  }

  /** Gentle confetti falling from the top of the screen. */
  function rain({ count = 120, hearts = .35 } = {}) {
    const n = Math.round(count * (reducedMotion ? .25 : 1));
    for (let i = 0; i < n && pieces.length < MAX; i++) {
      const p = makePiece(rand(0, w), rand(-h * .6, -10), rand(-40, 40), rand(40, 140), hearts);
      p.ttl = rand(4, 6.5);
      pieces.push(p);
    }
    ensureRunning();
  }

  /** Burst centred on an element. */
  function fromElement(el, opts = {}) {
    const r = el.getBoundingClientRect();
    burst({ x: r.left + r.width / 2, y: r.top + r.height / 2, ...opts });
  }

  function tick(now) {
    const dt = Math.min((now - last) / 1000, .05);
    last = now;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const drag = Math.pow(.25, dt);
    for (let i = pieces.length - 1; i >= 0; i--) {
      const p = pieces[i];
      p.life += dt;
      p.vx *= drag;
      p.vy = Math.min(p.vy * Math.pow(.6, dt) + 900 * dt, 260);
      p.flip += 5 * dt;
      p.x += (p.vx + Math.sin(p.flip) * 25) * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;

      if (p.life > p.ttl || p.y > h + 40) { pieces.splice(i, 1); continue; }

      ctx.globalAlpha = p.life > p.ttl - .7 ? Math.max((p.ttl - p.life) / .7, 0) : 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === 'rect') {
        ctx.scale(1, Math.cos(p.flip));
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        heartPath(ctx, -p.size * .7, -p.size * .7, p.size * 1.4);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    if (pieces.length) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = 0;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return { burst, rain, fromElement };
})();

/** Two "party poppers" from the bottom corners. */
function cornerPoppers() {
  const w = window.innerWidth, h = window.innerHeight;
  Confetti.burst({ x: 0, y: h * .85, angle: -Math.PI / 3, spread: .9, count: 90, power: 1.25 });
  Confetti.burst({ x: w, y: h * .85, angle: -Math.PI * 2 / 3, spread: .9, count: 90, power: 1.25 });
}


/* =========================================================
   5. Background music (auto-starts on her first tap)
   ========================================================= */
const Music = (() => {
  const audio = $('#bgMusic');
  const btn = $('#musicBtn');
  const label = $('#musicLabel');
  const VOLUME = .6;
  let playing = false;
  let pending = false;      // a play() request is in progress
  let userPaused = false;   // she paused it herself → never auto-restart
  let missingFile = false;  // song file not found → stop trying
  let fadeTimer = 0;

  audio.src = CONFIG.music;

  // Timer-based (not requestAnimationFrame) so the fade still finishes if the tab is in the background
  function fadeTo(target, ms, done) {
    clearInterval(fadeTimer);
    const from = audio.volume;
    const t0 = performance.now();
    fadeTimer = setInterval(() => {
      const t = clamp((performance.now() - t0) / ms, 0, 1);
      audio.volume = from + (target - from) * t;
      if (t >= 1) {
        clearInterval(fadeTimer);
        if (done) done();
      }
    }, 30);
  }

  function render() {
    btn.classList.toggle('playing', playing);
    btn.setAttribute('aria-pressed', String(playing));
    btn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
    label.textContent = playing ? 'Pause music' : 'Play our song';
  }

  /** Resolves to true if music is playing. `quiet` = no message on failure (auto attempts). */
  async function play({ quiet = false } = {}) {
    if (playing || pending) return playing;
    pending = true;
    try {
      if (audio.paused) audio.volume = 0;
      await audio.play();
      playing = true;
      fadeTo(VOLUME, 2200);
    } catch (err) {
      if (err && err.name === 'NotSupportedError') missingFile = true;
      if (!quiet) toast('🎵 Add your song as music/romantic-song.mp3 to hear our music.');
    }
    pending = false;
    render();
    return playing;
  }

  function pause() {
    playing = false;
    render();
    fadeTo(0, 600, () => audio.pause());
  }

  btn.addEventListener('click', () => {
    if (playing) {
      userPaused = true;
      pause();
    } else {
      userPaused = false;
      play();
    }
  });
  render();

  /* ---- Auto-start ----
     Browsers block sound until the visitor interacts with the page, so: try right away,
     and if that's blocked, start on her very first tap / click / key press. */
  const GESTURES = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'];

  function onFirstGesture(e) {
    if (e.target.closest && e.target.closest('#musicBtn')) return; // the button handles itself
    if (userPaused || missingFile) return disarm();
    play({ quiet: true }).then((ok) => { if (ok || missingFile) disarm(); });
  }
  function arm() { GESTURES.forEach((ev) => document.addEventListener(ev, onFirstGesture, true)); }
  function disarm() { GESTURES.forEach((ev) => document.removeEventListener(ev, onFirstGesture, true)); }

  if (CONFIG.autoPlayMusic) {
    arm();
    play({ quiet: true }).then((ok) => { if (ok) disarm(); });
  }
})();


/* =========================================================
   6. Section 1 — Entrance & envelope
   ========================================================= */
const Entrance = (() => {
  const entrance = $('#entrance');
  const envelope = $('#envelope');
  const openBtn = $('#openBtn');
  const main = $('#main');
  let opening = false;

  const herName = CONFIG.herName.trim();
  if (herName) {
    $('#entranceEyebrow').textContent = `For ${herName} 💕`;
    $('#celebrateEyebrow').textContent = `✨ It's your day, ${herName} ✨`;
  }

  function open() {
    if (opening) return;
    Tilt.enable();                        // must be inside her tap (iPhone asks for motion access)
    buzz(25);
    opening = true;
    openBtn.disabled = true;
    entrance.classList.add('opening');
    envelope.classList.add('open');

    // Little sparkle of confetti as the letter slides out
    setTimeout(() => Confetti.fromElement(envelope, { count: 40, spread: Math.PI * .7, power: .7, hearts: .6 }), reducedMotion ? 0 : 900);

    setTimeout(() => entrance.classList.add('leaving'), reducedMotion ? 150 : 2000);

    setTimeout(() => {
      entrance.classList.add('gone');
      entranceField.stop();
      main.inert = false;
      setLock('locked', false);
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.body.classList.add('started');
      activeField = pageField;
      pageField.start();
      cornerPoppers();
      $('#celebrateTitle').focus({ preventScroll: true });
      opening = false;
    }, reducedMotion ? 500 : 3000);
  }

  function show() {
    entrance.classList.remove('gone');
    void entrance.offsetWidth;            // reflow so the fade-in transition plays
    entrance.classList.remove('leaving', 'opening');
    envelope.classList.remove('open');
    openBtn.disabled = false;
    main.inert = true;
    window.scrollTo({ top: 0, behavior: 'instant' });
    setLock('locked', true);
    pageField.stop();
    activeField = entranceField;
    entranceField.start();
    openBtn.focus({ preventScroll: true });
  }

  openBtn.addEventListener('click', open);
  envelope.addEventListener('click', open);   // tapping the envelope itself works too
  return { show };
})();


/* =========================================================
   7. Section 2 — Cake & candles
   ========================================================= */
const Cake = (() => {
  const cake = $('#cake');
  const scene = cake.closest('.cake-scene');
  const hint = $('#cakeHint');
  const candles = $$('.candle', cake);
  const micBtn = $('#micBtn');
  const micLabel = $('#micLabel');
  const HINT = hint.textContent;
  const MIC_LABEL = micLabel.textContent;
  const isOut = (c) => c.classList.contains('out');

  function blowOut(candle) {
    if (isOut(candle)) return;
    candle.classList.add('out');
    candle.setAttribute('aria-label', `Candle ${candles.indexOf(candle) + 1} blown out`);

    if (candles.every(isOut)) {
      buzz([30, 40, 30, 40, 90]);
      stopMic();
      micBtn.hidden = true;
      scene.classList.add('wished');
      hint.textContent = 'Wish made ✨ I hope every single one comes true.';
      Confetti.fromElement(cake, { count: 150, spread: Math.PI * .8, power: 1.1, hearts: .4 });
    } else {
      buzz(18);
      const left = candles.filter((c) => !isOut(c)).length;
      hint.textContent = left === 1 ? 'Just one more… 🕯️' : 'Keep going… 🕯️';
    }
  }
  candles.forEach((candle) => candle.addEventListener('click', () => blowOut(candle)));

  /* ---- Blow into the phone's microphone to blow the candles out ---- */
  let mic = null, starting = false;
  const canListen = window.isSecureContext && navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
  micBtn.hidden = !canListen;

  async function startMic() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();                 // created inside the tap so iPhone allows it
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      await ctx.resume();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const now = performance.now();
      mic = { stream, ctx, analyser, data: new Uint8Array(analyser.fftSize), loud: 0, cool: 0, raf: 0, last: now, until: now + 30000 };
      micBtn.classList.add('listening');
      micLabel.textContent = 'Listening… blow!';
      hint.textContent = 'Blow gently on your phone 🌬️';
      mic.raf = requestAnimationFrame(listen);
    } catch (_) {
      ctx.close();
      toast('🎤 No microphone? No problem, just tap the candles 🕯️');
    }
  }

  function listen(now) {
    if (!mic) return;
    const dt = Math.min(now - mic.last, 100);
    mic.last = now;
    mic.analyser.getByteTimeDomainData(mic.data);
    let sum = 0;
    for (let k = 0; k < mic.data.length; k++) {
      const v = (mic.data[k] - 128) / 128;
      sum += v * v;
    }
    const rms = Math.sqrt(sum / mic.data.length);
    micBtn.style.setProperty('--lvl', Math.min(rms * 4, 1).toFixed(2));

    // A breath is loud *and* lasts a moment, so a short noise won't count
    mic.loud = rms > .14 ? mic.loud + dt : Math.max(mic.loud - dt * 2, 0);
    mic.cool -= dt;
    if (mic.loud > 130 && mic.cool <= 0) {
      const lit = candles.find((c) => !isOut(c));
      if (lit) blowOut(lit);
      mic.loud = 0;
      mic.cool = 380;
    }
    if (!mic) return;                     // the last candle just stopped it
    if (now > mic.until) {
      stopMic();
      if (!candles.every(isOut)) hint.textContent = HINT;
      return;
    }
    mic.raf = requestAnimationFrame(listen);
  }

  function stopMic() {
    if (!mic) return;
    cancelAnimationFrame(mic.raf);
    mic.stream.getTracks().forEach((t) => t.stop());
    mic.ctx.close();
    mic = null;
    micBtn.classList.remove('listening');
    micBtn.style.removeProperty('--lvl');
    micLabel.textContent = MIC_LABEL;
  }

  micBtn.addEventListener('click', () => {
    if (mic) return stopMic();
    if (starting) return;
    starting = true;
    startMic().finally(() => { starting = false; });
  });

  function reset() {
    stopMic();
    candles.forEach((c, i) => {
      c.classList.remove('out');
      c.setAttribute('aria-label', `Blow out candle ${i + 1}`);
    });
    scene.classList.remove('wished');
    micBtn.hidden = !canListen;
    hint.textContent = HINT;
  }

  return { reset };
})();


/* =========================================================
   8. Reveal-on-scroll (shared)
   ========================================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });

function observeReveals() {
  $$('.reveal:not(.in-view)').forEach((el) => revealObserver.observe(el));
}

function resetReveals() {
  $$('.reveal.in-view').forEach((el) => el.classList.remove('in-view'));
  observeReveals();
}


/* =========================================================
   9. Section 3 — Photo gallery
   ========================================================= */
const Gallery = (() => {
  const grid = $('#gallery');
  const empty = $('#galleryEmpty');
  const ui = $('#carouselUi');
  const countEl = $('#carCount');
  const toggle = $('#galleryToggle');
  const tilts = [-2.2, 1.6, -1.2, 2, -1.6, 1.1, -.8, 1.8];

  const photos = CONFIG.photos.length
    ? CONFIG.photos
    : Array.from({ length: 15 }, (_, i) => ({ src: `images/photo${i + 1}.jpg` }));

  let cards = [];
  let mode = 'carousel';
  let pos = 0, target = 0;          // which photo is in front (fractional while moving)
  let cardW = 260, rafId = 0, last = 0, active = -1;
  let drag = null, moved = false;

  photos.forEach((photo, i) => {
    const caption = photo.caption ?? (CONFIG.photos.length ? '' : DEFAULT_CAPTIONS[i % DEFAULT_CAPTIONS.length]);

    const card = document.createElement('figure');
    card.className = 'photo-card';
    card.style.setProperty('--rot', `${tilts[i % tilts.length]}deg`);
    card.dataset.caption = caption;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'photo-btn';
    btn.setAttribute('aria-label', `Open photo ${i + 1}${caption ? `: ${caption}` : ''}`);

    const img = document.createElement('img');
    img.alt = photo.alt || `A beautiful memory of us — photo ${i + 1}`;
    img.decoding = 'async';
    img.draggable = false;
    img.addEventListener('load', () => card.classList.add('loaded'), { once: true });
    img.addEventListener('error', () => { card.remove(); refresh(); }, { once: true }); // missing photo? just skip it
    img.src = photo.src;

    btn.append(img);
    btn.addEventListener('click', () => {
      if (moved) return;                                   // that was a swipe, not a tap
      const k = cards.indexOf(card);
      if (mode === 'carousel' && k !== active) return goTo(k);
      Lightbox.open(card);
    });
    card.append(btn);

    const figcaption = document.createElement('figcaption');
    figcaption.textContent = caption;
    card.append(figcaption);
    grid.append(card);
  });

  /* ---- 3D coverflow ---- */
  const n = () => cards.length;
  const wraps = () => n() > 3;

  /** Signed distance of card i from the front, the short way round. */
  function offset(i) {
    const d = i - pos;
    return wraps() ? ((d % n()) + n() * 1.5) % n() - n() / 2 : d;
  }

  function layout() {
    if (mode !== 'carousel' || !n()) return;
    const near = cardW * .6, far = cardW * .22;
    cards.forEach((card, i) => {
      const d = offset(i), ad = Math.abs(d);
      if (ad > 3.4) { card.style.visibility = 'hidden'; return; }
      const x = Math.sign(d) * (Math.min(ad, 1) * near + Math.max(ad - 1, 0) * far);
      card.style.visibility = '';
      card.style.transform = `translate3d(${x.toFixed(1)}px, 0, ${(-ad * cardW * .5).toFixed(1)}px) rotateY(${(-clamp(d, -1, 1) * 52).toFixed(2)}deg)`;
      card.style.zIndex = String(100 - Math.round(ad * 10));
      card.style.opacity = String(clamp(3.4 - ad, 0, 1).toFixed(3));
      card.style.setProperty('--shade', clamp(ad * .32, 0, .55).toFixed(3));
    });

    const now = ((Math.round(pos) % n()) + n()) % n();
    if (now !== active) {
      active = now;
      cards.forEach((c, i) => c.classList.toggle('is-active', i === active));
      countEl.textContent = `${active + 1} / ${n()}`;
      if (drag && drag.active) buzz(6);                    // a little "tick" as each photo passes
    }
  }

  function tick(now) {
    const dt = Math.min((now - last) / 1000, .05);
    last = now;
    pos += (target - pos) * (1 - Math.exp(-dt * (reducedMotion ? 40 : 9)));
    if (Math.abs(target - pos) < .002) {
      pos = target;
      if (wraps()) pos = target = ((pos % n()) + n()) % n();
      rafId = 0;
      layout();
      return;
    }
    layout();
    rafId = requestAnimationFrame(tick);
  }

  function settle(to) {
    target = wraps() ? to : clamp(to, 0, n() - 1);
    if (!rafId) {
      last = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }

  const goTo = (i) => settle(Math.round(pos + offset(i)));
  const step = (dir) => { buzz(8); settle(Math.round(target) + dir); };

  /** Jump straight to a photo (used when the full-screen viewer closes). */
  function show(i) {
    pos = target = i;
    layout();
  }

  function measure() {
    if (cards[0]) cardW = cards[0].offsetWidth || cardW;
  }

  function refresh() {
    cards = $$('.photo-card', grid);
    empty.hidden = n() > 0;
    ui.hidden = mode !== 'carousel' || n() < 2;
    toggle.hidden = n() < 2;
    if (!n()) { grid.hidden = true; return; }
    if (pos > n() - 1) pos = target = 0;
    active = -1;
    measure();
    layout();
  }

  /* ---- Swipe with a finger (or drag with the mouse) ---- */
  grid.addEventListener('pointerdown', (e) => {
    moved = false;
    if (mode !== 'carousel' || (e.pointerType === 'mouse' && e.button !== 0)) return;
    const t = performance.now();
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, pos, lastX: e.clientX, lastT: t, v: 0, active: false };
  });

  grid.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.active) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
      drag.active = moved = true;
      grid.setPointerCapture(e.pointerId);
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    const t = performance.now();
    drag.v = .7 * ((e.clientX - drag.lastX) / Math.max(t - drag.lastT, 1)) + .3 * drag.v;   // px per ms
    drag.lastX = e.clientX;
    drag.lastT = t;
    pos = target = drag.pos - dx / (cardW * .6);
    layout();
  });

  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const { active: wasDragging, v } = drag;
    drag = null;
    if (wasDragging) settle(Math.round(pos - clamp(v * 1000 / (cardW * .6) * .22, -3, 3)));  // flick = momentum
  }
  grid.addEventListener('pointerup', endDrag);
  grid.addEventListener('pointercancel', endDrag);

  grid.addEventListener('keydown', (e) => {
    if (mode !== 'carousel') return;
    if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
  });
  $('#carNext').addEventListener('click', () => step(1));
  $('#carPrev').addEventListener('click', () => step(-1));

  /* ---- Switch between the 3D carousel and a grid of all photos ---- */
  function setMode(m) {
    mode = m;
    grid.classList.toggle('is-carousel', m === 'carousel');
    grid.classList.toggle('is-grid', m === 'grid');
    toggle.textContent = m === 'carousel' ? '▦ See all photos at once' : '◎ Back to the 3D carousel';
    toggle.setAttribute('aria-pressed', String(m === 'grid'));
    if (m === 'grid') {
      cards.forEach((c) => {
        c.style.transform = c.style.zIndex = c.style.opacity = c.style.visibility = '';
        c.classList.remove('is-active');
      });
    }
    refresh();
  }
  toggle.addEventListener('click', () => {
    const top = grid.getBoundingClientRect().top;
    setMode(mode === 'carousel' ? 'grid' : 'carousel');
    if (top < 0) grid.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { measure(); layout(); }, 120);
  });

  refresh();
  return { grid, show, get isCarousel() { return mode === 'carousel'; } };
})();


/* =========================================================
   10. Lightbox
   ========================================================= */
const Lightbox = (() => {
  const box = $('#lightbox');
  const img = $('#lbImg');
  const caption = $('#lbCaption');
  const count = $('#lbCount');
  const closeBtn = $('#lbClose');
  const prevBtn = $('#lbPrev');
  const nextBtn = $('#lbNext');
  let cards = [];
  let index = 0;
  let lastFocus = null;
  let closeTimer;

  /** `dir` (1 = next, −1 = previous) makes the photo swing away in 3D and the new one swing in. */
  function render(i, animate, dir = 0) {
    index = (i + cards.length) % cards.length;
    const card = cards[index];
    const source = $('img', card);

    if (animate && dir && !reducedMotion) {
      img.style.transition = '';
      img.style.transform = `translateX(${-dir * 55}vw) rotateY(${dir * 40}deg) scale(.85)`;
    }

    const apply = () => {
      img.src = source.currentSrc || source.src;
      img.alt = source.alt;
      caption.textContent = card.dataset.caption || '';
      count.textContent = `${index + 1} / ${cards.length}`;
      if (dir && !reducedMotion) {          // start the new photo on the other side…
        img.style.transition = 'none';
        img.style.transform = `translateX(${dir * 55}vw) rotateY(${-dir * 40}deg) scale(.85)`;
        void img.offsetWidth;
        img.style.transition = '';
        img.style.transform = '';            // …and let it swing to the middle
      }
      const done = () => img.classList.remove('swap');
      if (img.decode) img.decode().then(done, done); else done();

      // Preload neighbours so next/prev feel instant
      [index + 1, index - 1].forEach((n) => {
        const neighbour = cards[(n + cards.length) % cards.length];
        if (neighbour) new Image().src = $('img', neighbour).src;
      });
    };

    if (animate) {
      img.classList.add('swap');
      setTimeout(apply, 200);
    } else {
      apply();
    }
  }

  function open(card) {
    cards = $$('.photo-card', Gallery.grid);
    if (!cards.length) return;
    clearTimeout(closeTimer);
    lastFocus = document.activeElement;
    box.hidden = false;
    render(cards.indexOf(card), false);
    requestAnimationFrame(() => box.classList.add('open'));
    setLock('lb-open', true);
    const single = cards.length < 2;
    prevBtn.hidden = single;
    nextBtn.hidden = single;
    closeBtn.focus();
  }

  function close() {
    if (box.hidden) return;
    box.classList.remove('open');
    setLock('lb-open', false);
    closeTimer = setTimeout(() => { box.hidden = true; }, 350);
    if (Gallery.isCarousel) Gallery.show(index);   // the carousel waits on the photo she was looking at
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }

  const next = () => render(index + 1, true, 1);
  const prev = () => render(index - 1, true, -1);

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  box.addEventListener('click', (e) => { if (e.target === box) close(); });

  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Tab') {               // keep focus inside the viewer
      const focusables = [closeBtn, prevBtn, nextBtn].filter((b) => !b.hidden);
      const i = focusables.indexOf(document.activeElement);
      e.preventDefault();
      const n = (i + (e.shiftKey ? -1 : 1) + focusables.length) % focusables.length;
      focusables[n].focus();
    }
  });

  // Swipe left / right on phones: the photo follows her finger and tilts in 3D
  let touchX = null, dragX = 0;
  box.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) { touchX = null; return; }
    touchX = e.touches[0].clientX;
    dragX = 0;
  }, { passive: true });
  box.addEventListener('touchmove', (e) => {
    if (touchX === null || cards.length < 2 || reducedMotion) return;
    dragX = e.touches[0].clientX - touchX;
    img.style.transition = 'none';
    img.style.transform = `translateX(${dragX}px) rotateY(${dragX * .08}deg)`;
  }, { passive: true });
  box.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    img.style.transition = '';
    if (Math.abs(dx) > 50 && cards.length > 1) { buzz(8); (dx < 0 ? next : prev)(); }
    else img.style.transform = '';
  });

  return { open, close };
})();


/* =========================================================
   11. Section 4 — Timeline
   ========================================================= */
(() => {
  const list = $('#timeline');
  const todayLabel = new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' });

  CONFIG.timeline.forEach((item) => {
    const li = document.createElement('li');
    li.className = `tl-item reveal${item.today ? ' today' : ''}`;

    const dot = document.createElement('div');
    dot.className = 'tl-dot';
    dot.setAttribute('aria-hidden', 'true');
    dot.textContent = item.icon || '💗';

    const card = document.createElement('div');
    card.className = 'tl-card glass';

    const date = document.createElement('span');
    date.className = 'tl-date';
    date.textContent = item.date || (item.today ? todayLabel : '');

    const title = document.createElement('h3');
    title.textContent = item.title;

    const text = document.createElement('p');
    text.textContent = item.text;

    if (date.textContent) card.append(date);
    card.append(title, text);
    li.append(dot, card);
    list.append(li);
  });
})();


/* =========================================================
   12. Section 5 — Love letter (typing animation)
   ========================================================= */
const Letter = (() => {
  const paper = $('#paper');
  const typedEl = $('#letterTyped');
  const signature = $('#signature');
  const skipBtn = $('#skipLetter');
  const text = CONFIG.letter.trim();

  // The invisible "ghost" copy reserves the full height so the page never jumps
  $('#letterGhost').textContent = text;
  $('#sigOff').textContent = CONFIG.signOff;
  $('#sigName').textContent = CONFIG.yourName;
  $('#letterFull').textContent = `${text}\n\n${CONFIG.signOff} ${CONFIG.yourName}`;

  const chars = graphemes(text);

  const node = document.createTextNode('');
  typedEl.append(node);
  let i = 0, timer = 0, started = false;

  function step() {
    if (i >= chars.length) return finish();
    const ch = chars[i++];
    node.data += ch;
    let delay = CONFIG.typingSpeed * rand(.7, 1.4);
    if ('.!?'.includes(ch)) delay = CONFIG.typingSpeed * 14;
    else if (ch === ',') delay = CONFIG.typingSpeed * 6;
    else if (ch === '\n') delay = CONFIG.typingSpeed * 7;
    timer = setTimeout(step, delay);
  }

  function start() {
    if (started) return;
    started = true;
    if (reducedMotion) return finish();
    timer = setTimeout(step, 700);
  }

  function finish() {
    started = true;
    clearTimeout(timer);
    node.data = text;
    i = chars.length;
    paper.classList.add('done');
    signature.classList.add('show');
    skipBtn.hidden = true;
  }

  function reset() {
    clearTimeout(timer);
    node.data = '';
    i = 0;
    started = false;
    paper.classList.remove('done');
    signature.classList.remove('show');
    skipBtn.hidden = false;
    observer.observe(paper);
  }

  // Start writing once the letter is on screen
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      start();
      observer.unobserve(paper);
    }
  }, { threshold: .3 });
  observer.observe(paper);

  skipBtn.addEventListener('click', finish);
  return { reset };
})();


/* =========================================================
   13. Section 6 — Gift box
   ========================================================= */
const Gift = (() => {
  const stage = $('#giftStage');
  const box = $('#giftBox');
  const reveal = $('#giftReveal');
  const heartsLayer = $('#giftHearts');
  let opened = false;

  $('#giftWish').textContent = CONFIG.finalWish;

  function heartBurst() {
    const glyphs = ['❤', '💖', '💗', '💕', '✨'];
    const colors = ['#f0628a', '#ff8fab', '#e2456a', '#cdb8f2', '#e8b76a'];
    const n = reducedMotion ? 6 : 22;
    for (let k = 0; k < n; k++) {
      const s = document.createElement('span');
      s.className = 'burst-heart';
      s.textContent = pick(glyphs);
      const angle = rand(-Math.PI * .95, -Math.PI * .05); // mostly upwards
      const dist = rand(110, 260);
      s.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      s.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
      s.style.setProperty('--rot', `${rand(-40, 40)}deg`);
      s.style.setProperty('--size', `${rand(1, 2.1)}rem`);
      s.style.setProperty('--color', pick(colors));
      s.style.setProperty('--dur', `${rand(1.4, 2.4)}s`);
      heartsLayer.append(s);
      s.addEventListener('animationend', () => s.remove(), { once: true });
    }
  }

  /* ---- The 3D box slowly turns by itself; she can spin it with a finger ---- */
  const cube = $('#giftCube');
  let ry = -28, rx = -24, spin = 0, visible = false, rafId = 0, last = 0;
  let drag = null, dragged = false;

  const draw = () => { cube.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`; };

  function frame(now) {
    const dt = Math.min((now - last) / 1000, .05);
    last = now;
    if (!drag) {
      spin += ((opened ? 8 : 22) - spin) * (1 - Math.exp(-dt * 1.2));   // ease back to a gentle idle turn
      ry += spin * dt;
      rx += (-24 - rx) * (1 - Math.exp(-dt * 3));
    }
    draw();
    rafId = visible ? requestAnimationFrame(frame) : 0;
  }

  function run() {
    if (!rafId && visible && !reducedMotion) {
      last = performance.now();
      rafId = requestAnimationFrame(frame);
    }
  }
  new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; run(); }).observe(stage);
  draw();

  box.addEventListener('pointerdown', (e) => {
    dragged = false;
    if (reducedMotion) return;
    drag = { id: e.pointerId, x: e.clientX, y: e.clientY, ry, rx, lastX: e.clientX, lastT: performance.now(), v: 0, active: false };
  });
  box.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
    if (!drag.active) {
      if (Math.abs(dx) < 7 || Math.abs(dx) < Math.abs(dy)) return;
      drag.active = dragged = true;
      box.setPointerCapture(e.pointerId);
    }
    const t = performance.now();
    drag.v = .7 * ((e.clientX - drag.lastX) / Math.max(t - drag.lastT, 1)) + .3 * drag.v;
    drag.lastX = e.clientX;
    drag.lastT = t;
    ry = drag.ry + dx * .7;
    rx = clamp(drag.rx - dy * .25, -45, -5);
    if (!rafId) draw();
  });
  const endSpin = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (drag.active) spin = clamp(drag.v * 700, -900, 900);   // fling it and it keeps spinning
    drag = null;
  };
  box.addEventListener('pointerup', endSpin);
  box.addEventListener('pointercancel', endSpin);

  box.addEventListener('click', () => {
    if (opened || dragged) return;
    opened = true;
    buzz([20, 30, 20, 30, 80]);
    box.classList.add('opened');
    stage.classList.add('opened');
    box.setAttribute('aria-label', 'Gift opened');
    box.setAttribute('aria-disabled', 'true');

    setTimeout(() => {
      Confetti.fromElement(box, { count: 170, spread: Math.PI * 1.1, power: 1.2, hearts: .45 });
      heartBurst();
      reveal.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => reveal.classList.add('show')));
    }, 450);

    // Make sure the message is visible on small screens
    setTimeout(() => reveal.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' }), 1300);
  });

  function reset() {
    opened = false;
    box.classList.remove('opened');
    stage.classList.remove('opened');
    box.setAttribute('aria-label', 'Open your gift');
    box.removeAttribute('aria-disabled');
    reveal.classList.remove('show');
    reveal.hidden = true;
    heartsLayer.innerHTML = '';
  }

  return { reset };
})();


/* =========================================================
   14. Section 7 — Finale (stars, hearts, replay)
   ========================================================= */
const Finale = (() => {
  const section = $('#finale');
  const stars = $('#stars');
  const hearts = $('#finaleHearts');
  let celebrated = false;

  $('#finalePhoto').src = CONFIG.finalePhoto;
  $('#finaleName').textContent = CONFIG.yourName;

  // Our photo is a 3D card: tap it to flip it over
  const flip = $('#flipPhoto');
  flip.addEventListener('click', () => {
    const on = flip.classList.toggle('flipped');
    flip.setAttribute('aria-pressed', String(on));
    buzz(12);
    if (on) setTimeout(() => Confetti.fromElement(flip, { count: 45, spread: Math.PI * 1.4, power: .6, hearts: .8 }), 350);
  });

  // Twinkling stars
  const starCount = window.innerWidth < 640 ? 60 : 110;
  const frag = document.createDocumentFragment();
  for (let k = 0; k < starCount; k++) {
    const s = document.createElement('span');
    s.className = 'star';
    s.style.left = `${rand(0, 100)}%`;
    s.style.top = `${rand(0, 100)}%`;
    s.style.setProperty('--s', `${rand(1, 3).toFixed(1)}px`);
    s.style.setProperty('--d', `${rand(2, 5.5).toFixed(1)}s`);
    s.style.setProperty('--delay', `${rand(-5, 0).toFixed(1)}s`);
    frag.append(s);
  }
  stars.append(frag);

  // Slowly rising hearts
  const heartColors = ['#ff8fab', '#f6b6c8', '#cdb8f2', '#ffd59e'];
  for (let k = 0; k < 12; k++) {
    const h = document.createElement('span');
    h.textContent = '❤';
    h.style.setProperty('--x', `${rand(3, 97)}%`);
    h.style.setProperty('--size', `${rand(.8, 1.8).toFixed(2)}rem`);
    h.style.setProperty('--color', pick(heartColors));
    h.style.setProperty('--dur', `${rand(9, 16).toFixed(1)}s`);
    h.style.setProperty('--delay', `${rand(-16, 0).toFixed(1)}s`);
    hearts.append(h);
  }

  // A soft shower of hearts the first time she reaches the end
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !celebrated) {
      celebrated = true;
      setTimeout(() => Confetti.rain({ count: 110, hearts: .6 }), 600);
    }
  }, { threshold: .45 });
  observer.observe(section);

  return {
    reset() {
      celebrated = false;
      flip.classList.remove('flipped');
      flip.setAttribute('aria-pressed', 'false');
    },
  };
})();


/* =========================================================
   14b. Chapter dock (bottom navigation, like a phone app)
   ========================================================= */
(() => {
  const dock = $('#dock');
  const buttons = $$('button', dock);
  const indicator = $('.dock-indicator', dock);
  const sections = buttons.map((b) => $(b.dataset.scroll));

  function setActive(i) {
    if (i < 0) return;
    buttons.forEach((b, k) => {
      b.classList.toggle('active', k === i);
      if (k === i) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
    indicator.style.transform = `translateX(${buttons[i].offsetLeft}px)`;
  }

  // Whichever chapter crosses the middle of the screen is the current one
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) setActive(sections.indexOf(en.target));
  }), { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));

  buttons.forEach((b) => b.addEventListener('click', () => buzz(8)));
  setActive(0);
})();

/** Restart the whole experience from the envelope. */
function replay() {
  Lightbox.close();
  Cake.reset();
  Gift.reset();
  Letter.reset();
  Finale.reset();
  resetReveals();
  document.body.classList.remove('started');
  Entrance.show();
}
$('#replayBtn').addEventListener('click', replay);


/* =========================================================
   15. Scroll effects: progress bar, timeline line, parallax
   ========================================================= */
(() => {
  const bar = $('#scrollProgress');
  const tlWrap = $('#timelineWrap');
  const tlProgress = $('#tlProgress');
  const parallaxEls = $$('[data-parallax]');
  let ticking = false;

  function update() {
    ticking = false;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    bar.style.transform = `scaleX(${max > 0 ? clamp(window.scrollY / max, 0, 1) : 0})`;

    const r = tlWrap.getBoundingClientRect();
    tlProgress.style.setProperty('--p', clamp((vh * .65 - r.top) / r.height, 0, 1).toFixed(3));

    if (!reducedMotion) {
      parallaxEls.forEach((el) => {
        const rect = el.parentElement.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        el.style.transform = `translate3d(0, ${(rect.top * parseFloat(el.dataset.parallax)).toFixed(1)}px, 0)`;
      });
    }
  }

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();


/* =========================================================
   16. Little extras: smooth "continue" buttons & tap hearts
   ========================================================= */
$$('[data-scroll]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = $(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

document.addEventListener('click', (e) => {
  if (!document.body.classList.contains('started') || reducedMotion) return;
  if (e.target.closest('button, a, .lightbox, .paper, .gallery, .dock')) return;
  const heart = document.createElement('span');
  heart.className = 'pop-heart';
  heart.textContent = pick(['❤', '💕', '💖']);
  heart.style.left = `${e.clientX}px`;
  heart.style.top = `${e.clientY}px`;
  document.body.append(heart);
  heart.addEventListener('animationend', () => heart.remove(), { once: true });
});


/* =========================================================
   17. Start
   ========================================================= */
observeReveals();
entranceField.start();
