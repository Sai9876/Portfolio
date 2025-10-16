/* ============================
   Energetic Glowing JS
   Author: Sai ⚡
   ============================ */

// === Dynamic Year ===
document.getElementById('year').textContent = new Date().getFullYear();

// === Typewriter Effect ===
const roles = ["Software Developer", "Python Full-Stack", "AI Enthusiast", "Problem Solver"];
const twEl = document.getElementById('typewriter');
let ri = 0, li = 0, deleting = false;

function typeLoop() {
  const word = roles[ri % roles.length];
  twEl.textContent = word.slice(0, li);
  if (!deleting && li <= word.length) li++;
  else if (deleting && li >= 0) li--;

  if (li === word.length + 6) deleting = true;
  if (li === 0) { deleting = false; ri++; }

  twEl.style.textShadow = deleting
    ? "0 0 6px var(--accent2)"
    : "0 0 15px var(--accent)";
  
  setTimeout(typeLoop, deleting ? 40 : 90);
}
typeLoop();

// === Theme Toggle (Light/Dark Neon) ===
const toggle = document.getElementById('themeToggle');
let light = false;
toggle.addEventListener('click', () => {
  light = !light;
  document.documentElement.style.setProperty('--bg', light ? '#f8fafc' : '#0b0d10');
  document.documentElement.style.setProperty('--bg-alt', light ? '#ffffff' : '#10141a');
  document.documentElement.style.setProperty('--text', light ? '#0b0d10' : '#e8ecf1');
  document.documentElement.style.setProperty('--muted', light ? '#475569' : '#a8b0bb');
  document.documentElement.style.setProperty('--accent', light ? '#00bcd4' : '#00ffff');
  document.documentElement.style.setProperty('--accent2', light ? '#7c3aed' : '#8b5cf6');
  toggle.textContent = light ? '☀️' : '🌙';
  toggle.style.transition = 'transform 0.4s ease';
  toggle.style.transform = light ? 'rotate(360deg)' : 'rotate(-360deg)';
});

// === Scroll Reveal ===
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      e.target.style.transitionDelay = `${Math.random() * 0.3}s`;
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// === Confetti ===
const confettiContainer = document.getElementById('confetti');
let confettiFired = false;

function fireConfetti(duration = 1400, count = 100) {
  const colors = ["#00ffff", "#8b5cf6", "#ffffff", "#67e8f9", "#a78bfa"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.style.position = 'absolute';
    p.style.width = (6 + Math.random() * 6) + 'px';
    p.style.height = (8 + Math.random() * 10) + 'px';
    p.style.background = colors[(Math.random() * colors.length) | 0];
    p.style.left = (Math.random() * 100) + 'vw';
    p.style.top = '-10px';
    p.style.opacity = '0.9';
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    p.style.borderRadius = '2px';
    p.style.transition = `transform ${duration}ms cubic-bezier(.2,.6,.2,1), top ${duration}ms cubic-bezier(.2,.6,.2,1), opacity 300ms ease`;
    confettiContainer.appendChild(p);
    requestAnimationFrame(() => {
      p.style.top = '110vh';
      p.style.transform = `translateX(${(-100 + Math.random() * 200)}px) rotate(${720 + Math.random() * 720}deg)`;
      setTimeout(() => p.style.opacity = '0', duration - 250);
      setTimeout(() => p.remove(), duration + 300);
    });
  }
}

const proj = document.getElementById('projects');
const confIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !confettiFired) {
      confettiFired = true;
      fireConfetti();
      confIO.unobserve(e.target);
    }
  });
}, { threshold: 0.4 });
confIO.observe(proj);

// === Navbar Glow on Scroll ===
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    header.style.boxShadow = '0 0 20px rgba(0,255,255,0.25)';
    header.style.background = 'rgba(16, 20, 26, 0.9)';
  } else {
    header.style.boxShadow = 'none';
    header.style.background = 'var(--glass)';
  }
});

// === Mobile Menu ===
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('nav ul');
menuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuBtn.textContent = navMenu.classList.contains('active') ? '✖️' : '☰';
});

// === Parallax Mouse Movement on Hero ===
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
});
hero.addEventListener('mouseleave', () => {
  hero.style.transform = 'translate(0, 0)';
});

// === Contact Form Submission ===
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  statusEl.textContent = "🚀 Sending your message...";
  const data = new FormData(form);

  if (!data.get('name') || !data.get('email') || !data.get('message')) {
    statusEl.textContent = "⚠️ Please fill name, email & message.";
    return;
  }

  try {
    const res = await fetch("https://getform.io/f/bnllmolb", {
      method: "POST",
      body: data,
      headers: { "Accept": "application/json" }
    });
    if (res.ok) {
      statusEl.textContent = "✅ Message sent! I'll get back to you soon.";
      form.reset();
      fireConfetti(1000, 60);
    } else {
      statusEl.textContent = "❌ Something went wrong. Please try again.";
    }
  } catch (err) {
    statusEl.textContent = "🌐 Network error. Try again.";
  }
});
