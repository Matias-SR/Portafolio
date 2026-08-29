/* =============================================================
   CONFIGURACIÓN RÁPIDA
   Cambia estos valores cuando lo necesites, sin tocar el HTML.
   ============================================================= */
const CONFIG = {
  // "available" | "unavailable"
  availability: "unavailable",
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

/* =============================================================
   Modal de proyectos
   ============================================================= */
function initProjectsModal() {
  const modal = document.getElementById("projectsModal");
  const openBtns = [
    document.getElementById("viewProjectsBtn"),
    document.getElementById("navProjectsBtn"),
  ].filter(Boolean);
  const closeBtn = document.getElementById("closeProjectsModal");
  if (!modal) return;

  const openModal = () => {
    modal.showModal();
    document.body.style.overflow = "hidden"; // evita scroll de fondo
  };

  const closeModal = () => {
    modal.close();
    document.body.style.overflow = "";
  };

  openBtns.forEach((btn) => btn.addEventListener("click", openModal));
  closeBtn?.addEventListener("click", closeModal);

  // Cerrar al hacer click en el fondo (backdrop)
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  // Restaurar el scroll si se cierra con la tecla Esc (evento nativo del <dialog>)
  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
  });
}


/* =============================================================
   Modal de contacto
   ============================================================= */
function initContactModal() {
  const modal = document.getElementById("contactModal");
  const openBtns = [
    document.getElementById("contactBtn"),
    document.getElementById("navContactBtn"),
  ].filter(Boolean);
  const closeBtn = document.getElementById("closeContactModal");
  const copyBtn = document.getElementById("copyEmailBtn");
  const copyText = document.getElementById("copyEmailText");
  const email = "matias.sandovalroa@gmail.com";
  if (!modal) return;

  const openModal = () => {
    modal.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.close();
    document.body.style.overflow = "";
  };

  openBtns.forEach((btn) => btn.addEventListener("click", () => {
    // Si el botón está dentro del menú móvil, ciérralo antes de abrir el modal.
    const navMenu = document.getElementById("navMenu");
    const navToggle = document.getElementById("navToggle");
    navMenu?.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
    openModal();
  }));

  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  modal.addEventListener("close", () => {
    document.body.style.overflow = "";
  });

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      if (copyText) copyText.textContent = "¡Copiado!";
      setTimeout(() => {
        if (copyText) copyText.textContent = "Copiar";
      }, 1800);
    } catch {
      // Fallback para navegadores/contextos donde Clipboard API no está disponible.
      const textArea = document.createElement("textarea");
      textArea.value = email;
      textArea.setAttribute("readonly", "");
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      textArea.remove();
      if (copyText) copyText.textContent = "¡Copiado!";
      setTimeout(() => {
        if (copyText) copyText.textContent = "Copiar";
      }, 1800);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initAvailabilityBadge();
  initNavToggle();
  initProjectsModal();
  initContactModal();
});
