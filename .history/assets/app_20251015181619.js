// ===============================
// ⚡ Sairam Portfolio - app.js v2
// ===============================

// ---------- DARK/LIGHT MODE TOGGLE ----------
const themeBtn = document.getElementById("theme-toggle");
const body = document.body;

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    themeBtn.innerHTML = "🌙 Dark";
    localStorage.setItem("theme", "light");
  } else {
    themeBtn.innerHTML = "☀️ Light";
    localStorage.setItem("theme", "dark");
  }
});

// Apply saved theme on reload
window.addEventListener("load", () => {
  const saved = localStorage.getItem("theme");
  if (saved === "light") body.classList.add("light-mode");
});

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ---------- NAVBAR ACTIVE SECTION ----------
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const top = window.scrollY;
    if (top >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) link.classList.add("active");
  });
});

// ---------- PROJECT CARD 3D TILT ----------
const cards = document.querySelectorAll(".project-card");
cards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 20;
    const rotateX = ((y / rect.height) - 0.5) * -20;
    card.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.05)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0) rotateX(0) scale(1)";
  });
});

// ---------- GLOW PARTICLE CURSOR ----------
const particleCount = 12;
const particles = [];

for (let i = 0; i < particleCount; i++) {
  const span = document.createElement("span");
  span.className = "cursor-particle";
  document.body.appendChild(span);
  particles.push(span);
}

let mouseX = 0, mouseY = 0;
document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateParticles() {
  particles.forEach((p, i) => {
    const delay = i * 2;
    setTimeout(() => {
      p.style.left = mouseX + "px";
      p.style.top = mouseY + "px";
    }, delay);
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---------- SCROLL REVEAL ANIMATIONS ----------
const revealEls = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) el.classList.add("show");
    else el.classList.remove("show");
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ---------- PARALLAX IMAGE MOTION ----------
const parallaxImgs = document.querySelectorAll(".parallax");
window.addEventListener("scroll", () => {
  parallaxImgs.forEach(img => {
    const speed = img.getAttribute("data-speed");
    img.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

// ---------- RESUME DOWNLOAD BUTTON ----------
const resumeBtn = document.getElementById("resume-btn");
if (resumeBtn) {
  resumeBtn.addEventListener("click", () => {
    window.open("./assets/Sairam_V_Resume.pdf", "_blank");
  });
}

// ---------- BACK TO TOP ----------
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 700) backToTop.classList.add("show");
    else backToTop.classList.remove("show");
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---------- CONSOLE SIGNATURE ----------
console.log(
  "%c⚡ Designed by Sairam V | Portfolio Active",
  "color:#00ffd9;font-size:14px;font-weight:bold;"
);
