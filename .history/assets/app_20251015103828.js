// app.js - polished & integrated version

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
const header = document.querySelector('.site-header');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('show');
  header.classList.toggle('open');
});

// Smooth close on nav link click (mobile)
document.querySelectorAll('.nav a').forEach(a => {
  a.addEventListener('click', () => {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
      header.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Typewriter (improved: typing, hold, deleting, pause)
const roles = ["Software Developer", "Python Full-Stack", "AI Enthusiast", "Problem Solver"];
const twEl = document.getElementById('typewriter');
let roleIndex = 0;
let charIndex = 0;
let direction = 1; // 1 typing, -1 deleting
let hold = 0;

function typeLoop() {
  const current = roles[roleIndex % roles.length];
  if (direction === 1) {
    charIndex++;
    twEl.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) {
      hold++;
      if (hold > 12) { direction = -1; hold = 0; }
    }
  } else {
    charIndex--;
    twEl.textContent = current.slice(0, Math.max(0, charIndex));
    if (charIndex <= 0) {
      direction = 1;
      roleIndex++;
    }
  }
  const speed = direction === 1 ? 80 + Math.random() * 40 : 28 + Math.random() * 20;
  setTimeout(typeLoop, speed);
}
typeLoop();

// Theme toggle (smooth variable transitions)
const toggle = document.getElementById('themeToggle');
let light = false;
toggle.addEventListener('click', () => {
  light = !light;
  // gentle animated variable changes
  document.documentElement.style.transition = "background 400ms, color 400ms";
  if (light) {
    document.documentElement.style.setProperty('--bg', '#f7f8fb');
    document.documentElement.style.setProperty('--bg-alt', '#ffffff');
    document.documentElement.style.setProperty('--text', '#0b0d10');
    document.documentElement.style.setProperty('--muted', '#55606a');
    toggle.textContent = '☀️';
    document.getElementById('bg-video').style.opacity = '0.18';
  } else {
    document.documentElement.style.setProperty('--bg', '#0b0d10');
    document.documentElement.style.setProperty('--bg-alt', '#030405');
    document.documentElement.style.setProperty('--text', '#e8ecf1');
    document.documentElement.style.setProperty('--muted', '#a8b0bb');
    toggle.textContent = '🌙';
    document.getElementById('bg-video').style.opacity = '1';
  }
});

// Intersection observer reveal (keeps your .reveal semantics)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Minimal confetti (fires once when Projects enters)
const confettiContainer = document.getElementById('confetti');
let confettiFired = false;
function fireConfetti(duration = 1200, count = 72) {
  const colors = ["#6ee7ff","#9b8cff","#ffffff","#a7f3d0","#fde68a"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const w = 6 + Math.random() * 8;
    const h = 8 + Math.random() * 12;
    p.style.position = 'absolute';
    p.style.width = w + 'px';
    p.style.height = h + 'px';
    p.style.left = (Math.random() * 100) + 'vw';
    p.style.top = '-10px';
    p.style.background = colors[(Math.random() * colors.length) | 0];
    p.style.opacity = '0.95';
    p.style.borderRadius = (Math.random() > 0.5 ? '2px' : '50%');
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    p.style.zIndex = '72';
    p.style.transition = `transform ${duration}ms cubic-bezier(.2,.6,.2,1), top ${duration}ms cubic-bezier(.2,.6,.2,1), opacity 300ms ease`;
    confettiContainer.appendChild(p);
    requestAnimationFrame(() => {
      p.style.top = (110 + Math.random() * 20) + 'vh';
      p.style.transform = `translateX(${(-100 + Math.random()*200)}px) rotate(${720 + Math.random()*720}deg)`;
      setTimeout(()=> p.style.opacity = '0', duration - 300);
      setTimeout(()=> p.remove(), duration + 400);
    });
  }
}
const projSection = document.getElementById('projects');
if (projSection) {
  const confIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !confettiFired) {
        confettiFired = true;
        setTimeout(() => fireConfetti(), 280); // small delay for effect
        confIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.45 });
  confIO.observe(projSection);
}

// Contact form (Getform) with small UX tweaks
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = "Sending...";
    const data = new FormData(form);

    // Basic validation
    if (!data.get('name') || !data.get('email') || !data.get('message')) {
      statusEl.textContent = "Please fill name, email & message.";
      return;
    }

    try {
      const res = await fetch("https://getform.io/f/bnllmolb", {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      });
      if (res.ok) {
        statusEl.textContent = "Thanks! I'll get back to you soon.";
        form.reset();
        setTimeout(() => statusEl.textContent = "", 5000);
      } else {
        statusEl.textContent = "Something went wrong. Please try again.";
      }
    } catch (err) {
      statusEl.textContent = "Network error. Try again.";
    }
  });
}

// keyboard accessible skip for nav (escape to close on mobile)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && nav.classList.contains('show')) {
    nav.classList.remove('show');
    header.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

window.addEventListener('load', ()=>{
  gsap.from('.hero-inner', { y: 40, opacity: 0, duration: 1.2, ease: "power3.out" });
  gsap.from('.site-header', { y: -50, opacity: 0, duration: 0.8, delay: 0.1 });
  gsap.from('.nav a', { opacity: 0, y: -10, duration: 0.5, delay: 0.3, stagger: 0.1 });
});

document.addEventListener('mousemove', (e)=>{
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.style.left = e.pageX + 'px';
  glow.style.top = e.pageY + 'px';
  document.body.appendChild(glow);
  setTimeout(()=>glow.remove(), 500);
});

document.querySelectorAll('.skill-bar').forEach(el=>{
  const span = el.querySelector('span');
  const percent = el.dataset.percent || 80;
  new IntersectionObserver((entries,obs)=>{
    if(entries[0].isIntersecting){
      span.style.width = percent+'%';
      obs.unobserve(el);
    }
  }).observe(el);
});



