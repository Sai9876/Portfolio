// ============================
// 🌟 SaiRam Portfolio - app.js
// ============================

// ----- DARK / LIGHT THEME TOGGLE -----
const toggleBtn = document.getElementById("theme-toggle");
const root = document.documentElement;

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    toggleBtn.innerHTML = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.innerHTML = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  }
});

// ----- LOAD SAVED THEME ON REFRESH -----
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    toggleBtn.innerHTML = "🌙 Dark Mode";
  } else {
    toggleBtn.innerHTML = "☀️ Light Mode";
  }
});

// ----- SMOOTH SCROLL NAVIGATION -----
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ----- NAVBAR ACTIVE HIGHLIGHT ON SCROLL -----
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 60;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ----- PROJECT CARD HOVER LIGHT EFFECT -----
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
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

// ----- GLOW CURSOR EFFECT -----
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// ----- RESUME DOWNLOAD BUTTON -----
const resumeBtn = document.getElementById("resume-btn");
if (resumeBtn) {
  resumeBtn.addEventListener("click", () => {
    const resumePath = "./assets/Sairam_V_Resume.pdf"; // change when hosted
    window.open(resumePath, "_blank");
  });
}

// ----- SCROLL REVEAL ANIMATION -----
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

// ----- BACK TO TOP BUTTON -----
const backToTop = document.getElementById("back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ----- CONSOLE LOG STYLING -----
console.log(
  "%cWelcome to SaiRam's Portfolio 🚀",
  "color:#6ee7b7;font-size:16px;font-weight:bold;"
);
console.log("%cCrafted with ❤️ using HTML, CSS & JS", "color:#60a5fa;");
