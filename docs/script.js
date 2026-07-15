
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");
const revealItems = document.querySelectorAll(".reveal, .reveal-card");

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("menu-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-38% 0px -55% 0px" }
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

sections.forEach((section) => navObserver.observe(section));
revealItems.forEach((item) => revealObserver.observe(item));


const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const hoverTargets = document.querySelectorAll("a, button, .skill-icon-card, .project-card, .interactive-name span:not(.name-gap)");

if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
  let ringX = window.innerWidth / 2;
  let ringY = window.innerHeight / 2;
  let mouseX = ringX;
  let mouseY = ringY;

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  const animateCursor = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  hoverTargets.forEach((target) => {
    target.addEventListener("mouseenter", () => cursorRing.classList.add("cursor-hover"));
    target.addEventListener("mouseleave", () => cursorRing.classList.remove("cursor-hover"));
  });
}


const themeToggle = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("portfolio-theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

function applyTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.toggle("light-theme", isLight);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  }
}

applyTheme(storedTheme || (prefersLight ? "light" : "dark"));

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
    localStorage.setItem("portfolio-theme", nextTheme);
    applyTheme(nextTheme);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = targetId === "#top" ? document.body : document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    window.scrollTo({
      top: targetId === "#top" ? 0 : target.getBoundingClientRect().top + window.scrollY - 88,
      behavior: "smooth",
    });
  });
});

const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  const syncBackToTop = () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 520);
  };
  syncBackToTop();
  window.addEventListener("scroll", syncBackToTop, { passive: true });
}
