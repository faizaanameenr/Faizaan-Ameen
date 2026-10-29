const toggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}
const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(
  ".section-heading, .project-card, .about-label, .principles > div, .toolkit-card, .contact-panel"
);
if (!reduceMotion && "IntersectionObserver" in window) {
  revealTargets.forEach((element, index) => {
    element.classList.add("motion-reveal");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 75}ms`);
  });
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((element) => observer.observe(element));
}

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (finePointer && !reduceMotion) {
  let frame = 0;
  window.addEventListener("pointermove", (event) => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
      frame = 0;
    });
  }, { passive: true });
}


// Rotating professional focus in the hero. Pauses when the tab is hidden
// and honors reduced-motion preferences.
(() => {
  const role = document.querySelector("#rotating-role");
  if (!role) return;
  const roles = [
    "Android developer",
    "AI builder",
    "SaaS developer",
    "product designer",
    "automation engineer"
  ];
  const article = document.querySelector("#rotating-article");
  const updateArticle = (value) => {
    if (!article) return;
    article.textContent = /^[AEIOU]/i.test(value.trim()) ? "an" : "a";
  };
  updateArticle(roles[0]);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let index = 0;
  let intervalId;
  const showNext = () => {
    index = (index + 1) % roles.length;
    if (reduceMotion) {
      role.textContent = roles[index];
      role.setAttribute("aria-label", roles[index]);
      updateArticle(roles[index]);
      return;
    }
    role.classList.add("role-exit");
    window.setTimeout(() => {
      role.textContent = roles[index];
      role.setAttribute("aria-label", roles[index]);
      updateArticle(roles[index]);
      role.classList.remove("role-exit");
      role.classList.remove("role-enter");
      void role.offsetWidth;
      role.classList.add("role-enter");
    }, 220);
  };
  const start = () => {
    if (reduceMotion || intervalId) return;
    intervalId = window.setInterval(showNext, 2400);
  };
  const stop = () => {
    if (intervalId) window.clearInterval(intervalId);
    intervalId = undefined;
  };
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  start();
})();


// Keep footer navigation smooth and land at the actual top of the viewport.
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  backToTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
}
