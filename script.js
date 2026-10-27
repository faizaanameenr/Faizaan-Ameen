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
