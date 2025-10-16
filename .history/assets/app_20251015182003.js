// app.js — Stylish, performant interactions for your portfolio

// ---------- HELPERS ----------
const qs = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
const raf = window.requestAnimationFrame.bind(window);

// ---------- THEME TOGGLE (works with :root.light) ----------
const themeToggle = qs('#theme-toggle');
const docEl = document.documentElement;
const THEME_KEY = 'sairam_theme';

function setTheme(isLight) {
  if (isLight) {
    docEl.classList.add('light');
    if (themeToggle) themeToggle.innerHTML = '🌙 Dark';
    localStorage.setItem(THEME_KEY, 'light');
  } else {
    docEl.classList.remove('light');
    if (themeToggle) themeToggle.innerHTML = '☀️ Light';
    localStorage.setItem(THEME_KEY, 'dark');
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = !docEl.classList.contains('light');
    setTheme(isLight);
    // small pulse
    themeToggle.animate([{ transform: 'scale(0.96)' }, { transform: 'scale(1)' }], { duration: 220 });
  });
}

// restore saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(THEME_KEY);
  setTheme(saved === 'light');
});

// ---------- SMOOTH SCROLL (native + fallback) ----------
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    e.preventDefault();
    const target = qs(href);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // update focus for accessibility
    setTimeout(() => target.setAttribute('tabindex','-1') && target.focus(), 600);
  });
});

// ---------- NAVBAR ACTIVE LINK ON SCROLL ----------
const navLinks = qsa('.main-nav a');
const sections = qsa('section[id]');

function updateActiveNav() {
  let current = sections[0]?.id || '';
  const offset = Math.round(window.innerHeight * 0.18);
  for (const s of sections) {
    if (window.scrollY >= s.offsetTop - offset) current = s.id;
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

// ---------- PROJECT CARD 3D TILT & LIGHT SPOT (uses CSS vars -- optional) ----------
qsa('.project-card').forEach(card => {
  // enable GPU friendly transforms & smoothing
  card.style.transformStyle = 'preserve-3d';
  card.style.transition = 'transform 350ms cubic-bezier(.2,.9,.3,1), box-shadow 300ms';

  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    // tilt range
    const tiltX = (py - 0.5) * -12; // rotateX
    const tiltY = (px - 0.5) * 12;  // rotateY
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px) scale(1.03)`;
    // optional css vars for lighting (if you add to CSS)
    card.style.setProperty('--mx', `${e.clientX}px`);
    card.style.setProperty('--my', `${e.clientY}px`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ---------- SCROLL REVEAL (.reveal elements) ----------
const reveals = qsa('.reveal');
function revealTick() {
  const h = window.innerHeight;
  for (const el of reveals) {
    const t = el.getBoundingClientRect().top;
    if (t < h - 100) el.classList.add('show');
    else el.classList.remove('show');
  }
}
window.addEventListener('scroll', revealTick, { passive: true });
window.addEventListener('resize', revealTick);
window.addEventListener('load', revealTick);

// ---------- PARALLAX (elements with .parallax and data-speed) ----------
const parallaxEls = qsa('.parallax');
function parallaxTick() {
  const y = window.scrollY;
  parallaxEls.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed') || '0.12');
    el.style.transform = `translateY(${y * speed}px)`;
  });
}
window.addEventListener('scroll', parallaxTick, { passive: true });
window.addEventListener('load', parallaxTick);

// ---------- RESUME DOWNLOAD ----------
const resumeBtn = qs('#resume-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', () => {
    // change the path when you host the PDF
    const path = './assets/Sairam_V_Resume.pdf';
    window.open(path, '_blank');
    // subtle feedback
    resumeBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }], { duration: 260 });
  });
}

// ---------- BACK TO TOP BUTTON ----------
const backToTop = qs('#back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 700));
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ---------- CURSOR GLOW + TINY TRAIL PARTICLES ----------
// Uses your #cursor-glow CSS rule and creates small particle dots that fade.
// The large glow element (id="cursor-glow") is styled via your CSS.
let cursorGlow = qs('#cursor-glow');
if (!cursorGlow) {
  cursorGlow = document.createElement('div');
  cursorGlow.id = 'cursor-glow';
  document.body.appendChild(cursorGlow);
}

// create small trailing particles (styled inline to avoid extra CSS)
const PARTICLE_COUNT = 10;
const particles = [];
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('span');
  p.className = 'cursor-dot';
  // inline style for particle appearance — subtle, small, blurred dots
  Object.assign(p.style, {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: `${6 + Math.random() * 8}px`,
    height: `${6 + Math.random() * 8}px`,
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%,-50%)',
    opacity: '0.0',
    mixBlendMode: 'screen',
    zIndex: '9998',
    transition: 'opacity 420ms, transform 420ms',
    background: `radial-gradient(circle at 30% 30%, rgba(78,243,197,0.55), rgba(124,92,255,0.28) 40%, rgba(10,10,12,0) 70%)`
  });
  document.body.appendChild(p);
  particles.push({ el: p, x: 0, y: 0, vx: 0, vy: 0 });
}

// track mouse with lightweight throttling
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let lastMove = 0;
const THROTTLE_MS = 8;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastMove < THROTTLE_MS) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    return;
  }
  lastMove = now;
  mouseX = e.clientX;
  mouseY = e.clientY;
  // move main glow quickly
  cursorGlow.style.left = `${mouseX}px`;
  cursorGlow.style.top = `${mouseY}px`;
  cursorGlow.style.opacity = '1';
  cursorGlow.style.width = '54px';
  cursorGlow.style.height = '54px';
  // briefly enlarge when moving fast
  cursorGlow.style.transition = 'width 160ms,height 160ms,opacity 260ms';
  // set particles visible
  particles.forEach((p, i) => {
    const jitter = (i - particles.length/2) * 3;
    p.el.style.opacity = '0.9';
    p.el.style.left = `${mouseX + jitter}px`;
    p.el.style.top = `${mouseY + jitter}px`;
    p.el.style.transform = `translate(-50%,-50%) scale(${0.7 + Math.random() * 0.7})`;
  });
});

// fade particles slowly when mouse stops; animate trailing motion
function particleLoop() {
  particles.forEach((p, i) => {
    // simple easing to mouse position for trailing effect
    p.x += (mouseX - p.x) * (0.08 + i * 0.006);
    p.y += (mouseY - p.y) * (0.08 + i * 0.006);
    p.el.style.left = `${p.x}px`;
    p.el.style.top = `${p.y}px`;
    // fade out older particles slightly
    const alpha = 0.9 - (i * 0.06);
    p.el.style.opacity = `${Math.max(0, alpha)}`;
  });
  raf(particleLoop);
}
raf(particleLoop);

// hide glow when leaving window (polish)
window.addEventListener('mouseout', (e) => {
  const from = e.relatedTarget || e.toElement;
  if (!from) {
    cursorGlow.style.opacity = '0';
    particles.forEach(p => p.el.style.opacity = '0');
  }
});

// ---------- LIGHT HOVER EFFECT ON BUTTONS (small polish) ----------
qsa('.btn-primary, .btn-ghost, .btn-icon').forEach(b => {
  b.addEventListener('mouseenter', () => {
    cursorGlow.style.width = '72px';
    cursorGlow.style.height = '72px';
  });
  b.addEventListener('mouseleave', () => {
    cursorGlow.style.width = '54px';
    cursorGlow.style.height = '54px';
  });
});

// ---------- PERFORMANCE: reduce work on hidden tab ----------
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // minimize particle opacity to save GPU
    particles.forEach(p => p.el.style.opacity = '0');
    cursorGlow.style.opacity = '0';
  } else {
    cursorGlow.style.opacity = '0.95';
  }
});

// ---------- FIN ----------
console.log('%cSairam Portfolio: interactions loaded ✨', 'color: #7c5cff; font-weight:700;');
