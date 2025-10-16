// assets/app.js (fixed & consolidated)
// Helpers
const qs = (s, ctx = document) => ctx.querySelector(s);
const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

// THEME
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
    themeToggle.animate([{ transform: 'scale(0.96)' }, { transform: 'scale(1)' }], { duration: 220 });
  });
}
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem(THEME_KEY);
  setTheme(saved === 'light');
});

// SMOOTH SCROLL for in-page links
qsa('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = qs(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => target.setAttribute('tabindex','-1') && target.focus(), 600);
  });
});

// NAV active on scroll
const navLinks = qsa('.main-nav a');
const sections = qsa('section[id]');
function updateActiveNav() {
  if (!sections.length) return;
  let current = sections[0].id;
  const offset = Math.round(window.innerHeight * 0.18);
  for (const s of sections) {
    if (window.scrollY >= s.offsetTop - offset) current = s.id;
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('load', updateActiveNav);

// PROJECT CARD TILT
qsa('.project-card').forEach(card => {
  card.style.transformStyle = 'preserve-3d';
  card.style.transition = 'transform 350ms cubic-bezier(.2,.9,.3,1), box-shadow 300ms';
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const tiltX = (py - 0.5) * -12;
    const tiltY = (px - 0.5) * 12;
    card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(6px) scale(1.03)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

// REVEAL on scroll (simple)
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

// PARALLAX
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

// RESUME (if present)
const resumeBtn = qs('#resume-btn');
if (resumeBtn) {
  resumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const path = './assets/Sairam_V_Resume.pdf';
    window.open(path, '_blank');
    resumeBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-4px)' }, { transform: 'translateY(0)' }], { duration: 260 });
  });
}

// BACK TO TOP
const backToTop = qs('#back-to-top');
if (backToTop) {
  window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 700));
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// CURSOR GLOW + PARTICLES
let cursorGlow = qs('#cursor-glow');
if (!cursorGlow) {
  cursorGlow = document.createElement('div');
  cursorGlow.id = 'cursor-glow';
  document.body.appendChild(cursorGlow);
}
const PARTICLE_COUNT = 10;
const particles = [];
for (let i = 0; i < PARTICLE_COUNT; i++) {
  const p = document.createElement('span');
  p.className = 'cursor-dot';
  Object.assign(p.style, {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: `${6 + Math.random() * 8}px`,
    height: `${6 + Math.random() * 8}px`,
    borderRadius: '50%',
    pointerEvents: 'none',
    transform: 'translate(-50%,-50%)',
    opacity: '0',
    mixBlendMode: 'screen',
    zIndex: '9998',
    transition: 'opacity 420ms, transform 420ms',
    background: `radial-gradient(circle at 30% 30%, rgba(78,243,197,0.55), rgba(124,92,255,0.28) 40%, rgba(10,10,12,0) 70%)`
  });
  document.body.appendChild(p);
  particles.push({ el: p, x: window.innerWidth/2, y: window.innerHeight/2 });
}
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursorGlow.style.left = `${mouseX}px`; cursorGlow.style.top = `${mouseY}px`; cursorGlow.style.opacity = '1';
});
function animateParticles() {
  particles.forEach((p, i) => {
    p.x += (mouseX - p.x) * (0.08 + i * 0.005);
    p.y += (mouseY - p.y) * (0.08 + i * 0.005);
    p.el.style.left = `${p.x}px`; p.el.style.top = `${p.y}px`;
    p.el.style.opacity = `${0.9 - i * 0.06}`;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('mouseout', (e) => {
  const from = e.relatedTarget || e.toElement;
  if (!from) {
    cursorGlow.style.opacity = '0';
    particles.forEach(p => p.el.style.opacity = '0');
  }
});
document.querySelectorAll('.btn-primary, .btn-icon').forEach(btn => {
  btn.addEventListener('mouseenter', () => { cursorGlow.style.width = '72px'; cursorGlow.style.height = '72px'; });
  btn.addEventListener('mouseleave', () => { cursorGlow.style.width = '54px'; cursorGlow.style.height = '54px'; });
});

// SKILLS: animate progress bars (single reliable routine)
function animateSkills() {
  const skillCards = document.querySelectorAll('.skill-card');
  const winH = window.innerHeight;
  skillCards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < winH - 100 && !card.classList.contains('visible')) {
      card.classList.add('visible');
      const percent = card.getAttribute('data-percent') || card.dataset.percent || '0';
      const span = card.querySelector('.skill-bar span');
      if (span) {
        // ensure transition applied and set width
        span.classList.add('filled');
        span.style.width = percent + '%';
      }
    }
  });
}
window.addEventListener('scroll', animateSkills, { passive: true });
window.addEventListener('load', animateSkills);

// TYPEWRITER (hero)
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
  const titleEl = document.getElementById('hero-title');
  const subtitleEl = document.getElementById('hero-subtitle');
  if (titleEl) {
    // compose with accent HTML
    titleEl.innerHTML = '';
    const pre = "Hey, I'm ";
    const accentHtml = '<span class="accent">Sai</span>';
    // type pre then insert accent immediately
    let idx = 0;
    const cursor = document.createElement('span'); cursor.classList.add('type-cursor');
    titleEl.appendChild(cursor);
    function tick() {
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
    }
    tick();
  }
});

// ABOUT & SOFT SKILLS reveal helpers
function animateAbout() {
  const about = document.querySelector('.animated-section');
  if (!about) return;
  const rect = about.getBoundingClientRect();
  if (rect.top < window.innerHeight - 120) about.classList.add('visible');
}
function animateSoftSkills() {
  const cards = document.querySelectorAll('.soft-card');
  const winH = window.innerHeight;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < winH - 100) {
      const delay = parseFloat(card.dataset.delay || '0') * 1000;
      setTimeout(() => card.classList.add('visible'), delay);
    }
  });
}
window.addEventListener('scroll', animateAbout);
window.addEventListener('load', () => { animateAbout(); animateSoftSkills(); animateSkills(); });

// MOBILE NAV: simple toggle button injection (keeps CSS minimal)
(function mobileNavToggle(){
  const nav = document.querySelector('.main-nav');
  const headerInner = document.querySelector('.header-inner');
  if (!nav || !headerInner) return;
  const btn = document.createElement('button');
  btn.className = 'mobile-only btn-icon';
  btn.innerHTML = '☰';
  btn.setAttribute('aria-expanded', 'false');
  headerInner.insertBefore(btn, headerInner.lastElementChild);
  btn.addEventListener('click', () => {
    const shown = getComputedStyle(nav).display !== 'none' && nav.style.display === 'flex';
    nav.style.display = shown ? '' : 'flex';
    nav.style.flexDirection = 'column';
    btn.setAttribute('aria-expanded', (!shown).toString());
  });
})();

// Smooth back-to-top anchors
document.querySelectorAll('.to-top').forEach(btn => {
  btn.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
});

console.log('%cSairam Portfolio loaded ✨', 'color:#7c5cff;font-weight:bold;');

// Contact form submit animation (optional)
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', () => {
    form.classList.add('sending');
    setTimeout(() => {
      alert('✅ Message sent successfully!');
      form.reset();
      form.classList.remove('sending');
    }, 800);
  });
}

// ==== Animate Projects on Scroll ====
function animateProjects() {
  const cards = document.querySelectorAll('.project-anim');
  const winH = window.innerHeight;
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if (rect.top < winH - 120) card.classList.add('visible');
  });
}
window.addEventListener('scroll', animateProjects);
window.addEventListener('load', animateProjects);


// ==== Animate Courses and Certifications ====
function animateCourses() {
  const elements = document.querySelectorAll('.course-card, .cert-card');
  const winH = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < winH - 120) el.classList.add('visible');
  });
}
window.addEventListener('scroll', animateCourses);
window.addEventListener('load', animateCourses);

// ==== Animate new Project Rows ====
function animateProjectRows() {
  const rows = document.querySelectorAll('.project-row');
  const winH = window.innerHeight;
  rows.forEach(row => {
    const rect = row.getBoundingClientRect();
    if (rect.top < winH - 100) row.classList.add('visible');
  });
}
window.addEventListener('scroll', animateProjectRows);
window.addEventListener('load', animateProjectRows);

// Typing animation for hero title
const text = "";
let index = 0;
const heroTitle = document.querySelector('.hero-title');
heroTitle.innerHTML = '';

function typeEffect() {
  if (index < text.length) {
    heroTitle.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 10);
  }
}
window.addEventListener('load', typeEffect);


