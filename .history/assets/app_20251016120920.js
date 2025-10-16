// === Sairam Portfolio — Optimized JS ===

// Shortcuts
const qs = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

/* =====================
   THEME TOGGLE
===================== */
const themeToggle = qs('#theme-toggle');
const docEl = document.documentElement;
const THEME_KEY = 'sairam_theme';

function setTheme(isLight) {
  docEl.classList.toggle('light', isLight);
  if (themeToggle) themeToggle.textContent = isLight ? '🌙 Dark' : '☀️ Light';
  localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(THEME_KEY) === 'light';
  setTheme(saved);
});

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = !docEl.classList.contains('light');
    setTheme(isLight);
    themeToggle.animate([{ transform: 'scale(0.96)' }, { transform: 'scale(1)' }], { duration: 220 });
  });
}

/* =====================
   SMOOTH SCROLL LINKS
===================== */
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = qs(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => target.setAttribute('tabindex', '-1') && target.focus(), 600);
  });
});

/* =====================
   NAV ACTIVE ON SCROLL
===================== */
const navLinks = qsa('.main-nav a');
const sections = qsa('section[id]');
function updateActiveNav() {
  let current = sections[0]?.id || '';
  const offset = window.innerHeight * 0.18;
  for (const s of sections) {
    if (window.scrollY >= s.offsetTop - offset) current = s.id;
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}

/* =====================
   PROJECT CARD TILT
===================== */
if (window.matchMedia('(pointer: fine)').matches) {
  qsa('.project-card').forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 350ms cubic-bezier(.2,.9,.3,1), box-shadow 300ms';
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const tiltX = (py - 0.5) * -12;
      const tiltY = (px - 0.5) * 12;
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px) scale(1.03)`;
    });
    card.addEventListener('mouseleave', () => (card.style.transform = ''));
  });
}

/* =====================
   RESUME BUTTON
===================== */
const resumeBtn = qs('#resume-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', e => {
    e.preventDefault();
    window.open('./assets/Sairam_V_Resume.pdf', '_blank');
    resumeBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }], { duration: 260 });
  });
}

/* =====================
   BACK TO TOP BUTTON
===================== */
const backToTop = qs('#back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 700));
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =====================
   CURSOR GLOW + PARTICLES
===================== */
let cursorGlow = qs('#cursor-glow');
if (!cursorGlow) {
  cursorGlow = document.createElement('div');
  cursorGlow.id = 'cursor-glow';
  document.body.appendChild(cursorGlow);
}

const PARTICLE_COUNT = 10;
const particles = [];
const frag = document.createDocumentFragment();

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('span');
  p.className = 'cursor-dot';
  Object.assign(p.style, {
    position: 'fixed',
    left: '0px',
    top: '0px',
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%,-50%)',
    opacity: '0',
    mixBlendMode: 'screen',
    zIndex: '9998',
    transition: 'opacity 420ms, transform 420ms',
    background: `radial-gradient(circle at 30% 30%, rgba(78,243,197,0.55), rgba(124,92,255,0.28) 40%, rgba(10,10,12,0) 70%)`
  });
  frag.appendChild(p);
  particles.push({ el: p, x: innerWidth / 2, y: innerHeight / 2 });
}
document.body.appendChild(frag);

let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorGlow.style.left = `${mouseX}px`;
  cursorGlow.style.top = `${mouseY}px`;
  cursorGlow.style.opacity = '1';
});

function animateParticles() {
  particles.forEach((p, i) => {
    p.x += (mouseX - p.x) * (0.08 + i * 0.005);
    p.y += (mouseY - p.y) * (0.08 + i * 0.005);
    p.el.style.left = `${p.x}px`;
    p.el.style.top = `${p.y}px`;
    p.el.style.opacity = `${0.9 - i * 0.06}`;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('mouseout', e => {
  const from = e.relatedTarget || e.toElement;
  if (!from) {
    cursorGlow.style.opacity = '0';
    particles.forEach(p => (p.el.style.opacity = '0'));
  }
});

qsa('.btn-primary, .btn-icon').forEach(btn => {
  btn.addEventListener('mouseenter', () => { cursorGlow.style.width = '72px'; cursorGlow.style.height = '72px'; });
  btn.addEventListener('mouseleave', () => { cursorGlow.style.width = '54px'; cursorGlow.style.height = '54px'; });
});

/* =====================
   HERO TYPEWRITER
===================== */
function typeText(element, text, delay = 60, callback) {
  element.innerHTML = "";
  let i = 0;
  const cursor = document.createElement('span');
  cursor.classList.add('type-cursor');
  element.appendChild(cursor);
  function type() {
    if (i < text.length) {
      cursor.insertAdjacentText('beforebegin', text.charAt(i));
      i++;
      setTimeout(type, delay);
    } else {
      cursor.remove();
      if (callback) callback();
    }
  }
  type();
}

window.addEventListener('DOMContentLoaded', () => {
  const titleEl = qs('#hero-title');
  const subtitleEl = qs('#hero-subtitle');
  if (titleEl) {
    const pre = "Hey, I'm S ";
    const accentHtml = '<span class="accent">Sai</span>';
    titleEl.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.classList.add('type-cursor');
    titleEl.appendChild(cursor);
    let idx = 0;
    (function tick() {
      if (idx < pre.length) {
        cursor.insertAdjacentText('beforebegin', pre.charAt(idx));
        idx++;
        setTimeout(tick, 80);
      } else {
        cursor.insertAdjacentHTML('beforebegin', accentHtml);
        cursor.remove();
        if (subtitleEl) {
          setTimeout(() => typeText(subtitleEl, subtitleEl.textContent.trim(), 30), 500);
        }
      }
    })();
  }
});

/* =====================
   ANIMATIONS (UNIFIED)
===================== */
function unifiedScrollAnimations() {
  const winH = innerHeight;

  // Sections visibility (reveal)
  qsa('.reveal, .project-anim, .course-card, .cert-card, .project-row, .skill-card').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < winH - 120 && !el.classList.contains('visible')) {
      el.classList.add('visible');
      if (el.classList.contains('skill-card')) {
        const percent = el.dataset.percent || '0';
        const span = el.querySelector('.skill-bar span');
        if (span) {
          span.classList.add('filled');
          span.style.width = `${percent}%`;
        }
      }
    }
  });

  // About and soft skills
  qsa('.animated-section, .soft-card').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < winH - 120) {
      if (el.classList.contains('soft-card')) {
        const delay = parseFloat(el.dataset.delay || '0') * 1000;
        setTimeout(() => el.classList.add('visible'), delay);
      } else el.classList.add('visible');
    }
  });

  updateActiveNav();
  parallaxTick();
}

function parallaxTick() {
  const y = window.scrollY;
  qsa('.parallax').forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed') || '0.12');
    el.style.transform = `translateY(${y * speed}px)`;
  });
}

window.addEventListener('scroll', unifiedScrollAnimations, { passive: true });
window.addEventListener('resize', unifiedScrollAnimations);
window.addEventListener('load', unifiedScrollAnimations);

/* =====================
   MOBILE NAV TOGGLE
===================== */
(function mobileNavToggle() {
  const nav = qs('.main-nav');
  const headerInner = qs('.header-inner');
  if (!nav || !headerInner) return;
  const btn = document.createElement('button');
  btn.className = 'mobile-only btn-icon';
  btn.textContent = '☰';
  btn.setAttribute('aria-expanded', 'false');
  headerInner.insertBefore(btn, headerInner.lastElementChild);
  btn.addEventListener('click', () => {
    const shown = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', shown.toString());
  });
})();

/* =====================
   CONTACT FORM
===================== */
const form = qs('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    form.classList.add('sending');
    setTimeout(() => {
      alert('✅ Message sent successfully!');
      form.reset();
      form.classList.remove('sending');
    }, 800);
  });
}

console.log('%cSairam Portfolio Loaded ✨', 'color:#7c5cff;font-weight:bold;');

// Reveal About section on scroll
const animatedSections = document.querySelectorAll('.animated-section');
function revealSections() {
  animatedSections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) sec.classList.add('visible');
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);


// Animate Tools section cards on scroll
const toolCards = document.querySelectorAll('.tool-card');
function revealTools() {
  toolCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add('show');
    }
  });
}
window.addEventListener('scroll', revealTools);
window.addEventListener('load', revealTools);

// Animate Language cards on scroll
const langCards = document.querySelectorAll('.lang-card');
function revealLangs() {
  langCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add('show');
    }
  });
}
window.addEventListener('scroll', revealLangs);
window.addEventListener('load', revealLangs);

// Animate modern education cards
const modernEduCards = document.querySelectorAll('.edu-item');
function revealModernEdu() {
  modernEduCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      card.classList.add('show');
    }
  });
}
window.addEventListener('scroll', revealModernEdu);
window.addEventListener('load', revealModernEdu);



