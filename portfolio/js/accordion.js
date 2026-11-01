/* Accordion horizontal — hover (desktop) + tap/klik/keyboard (mobile) */
(() => {
  const root = document.querySelector("[data-accordion]");
  if (!root) return;

  const panels = [...root.querySelectorAll(".panel")];
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  function setActive(target) {
    panels.forEach((p) => {
      const on = p === target;
      p.classList.toggle("is-active", on);
      p.querySelector(".panel__btn").setAttribute("aria-expanded", String(on));
    });
  }

  panels.forEach((panel) => {
    const btn = panel.querySelector(".panel__btn");
    // Desktop: hover membuka panel
    panel.addEventListener("mouseenter", () => { if (canHover.matches) setActive(panel); });
    // Mobile / keyboard: tap atau Enter membuka; tap lagi menutup
    btn.addEventListener("click", () => {
      const close = panel.classList.contains("is-active") && !canHover.matches;
      setActive(close ? null : panel);
    });
    // Fokus keyboard juga membuka panel
    btn.addEventListener("focus", () => setActive(panel));
  });

  // Desktop: kursor keluar -> semua kembali sama lebar
  root.addEventListener("mouseleave", () => { if (canHover.matches) setActive(null); });
  root.addEventListener("keydown", (e) => { if (e.key === "Escape") setActive(null); });
  // Tap di luar accordion menutup (mobile)
  document.addEventListener("click", (e) => { if (!root.contains(e.target)) setActive(null); });
})();
