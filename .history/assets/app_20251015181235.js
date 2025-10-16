// ===== app.js =====

// 🌙 DARK / LIGHT THEME TOGGLE
const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    toggleBtn.innerHTML = "🌙 Dark Mode";
  } else {
    toggleBtn.innerHTML = "☀️ Light Mode";
  }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// ===== HOVER ANIMATION ON PROJECT CARDS =====
const projects = document.querySelectorAll(".project-card");
projects.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);
  });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--x", `50%`);
    card.style.setProperty("--y", `50%`);
  });
});

// ===== GLOW CURSOR EFFECT =====
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// ===== RESUME DOWNLOAD BUTTON =====
const resumeBtn = document.getElementById("resume-btn");
resumeBtn.addEventListener("click", () => {
  // Replace this with your actual resume file path later
  window.open("./assets/Sairam_V_Resume.pdf", "_blank");
});

// ===== SCROLL REVEAL EFFECT =====
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 120) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
