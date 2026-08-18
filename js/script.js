/* =============================================================
   CONFIGURACIÓN RÁPIDA
   Cambia estos valores cuando lo necesites, sin tocar el HTML.
   ============================================================= */
const CONFIG = {
  // "available" | "unavailable"
  availability: "available",
};

/* =============================================================
   Badge de disponibilidad
   ============================================================= */
function initAvailabilityBadge() {
  const badge = document.getElementById("availabilityBadge");
  const text = document.getElementById("availabilityText");
  if (!badge || !text) return;

  const labels = {
    available: "Disponible para práctica profesional",
    unavailable: "No disponible por el momento",
  };

  const status = CONFIG.availability === "unavailable" ? "unavailable" : "available";
  badge.setAttribute("data-status", status);
  text.textContent = labels[status];
}

/* =============================================================
   Menú de navegación (mobile)
   ============================================================= */
function initNavToggle() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Cierra el menú al hacer click en un link (mobile)
  menu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initAvailabilityBadge();
  initNavToggle();
});
