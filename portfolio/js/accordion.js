/* Accordion domain banners — Hover di desktop & tap/keyboard di mobile/touch */
(() => {
  const root = document.querySelector("[data-accordion]");
  if (!root) return;

  const cards = [...root.querySelectorAll(".vcard")];
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  function setActive(target) {
    cards.forEach((card) => {
      const isActive = card === target;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-expanded", String(isActive));
    });
  }

  cards.forEach((card) => {
    // Mobile / Touch: tap untuk expand / toggle
    card.addEventListener("click", () => {
      if (canHover.matches) return; // Desktop menggunakan CSS :hover
      const isCurrentlyActive = card.classList.contains("is-active");
      setActive(isCurrentlyActive ? null : card);
    });

    // Keyboard Accessibility (Enter / Space)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const isCurrentlyActive = card.classList.contains("is-active");
        setActive(isCurrentlyActive ? null : card);
      } else if (e.key === "Escape") {
        setActive(null);
      }
    });

    // Focus state
    card.addEventListener("focus", () => {
      if (!canHover.matches) setActive(card);
    });
  });

  // Tap di luar area menutup expand (mobile)
  document.addEventListener("click", (e) => {
    if (!root.contains(e.target)) {
      setActive(null);
    }
  });
})();
