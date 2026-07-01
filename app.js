const PROGRAM_LINKS = document.querySelectorAll(".card-button");
const PROGRAM_ICONS = document.querySelectorAll(".program-icon-img");

PROGRAM_LINKS.forEach((link) => {
  link.addEventListener("click", () => {
    link.setAttribute("aria-busy", "true");
  });
});

PROGRAM_ICONS.forEach((img) => {
  const fallbacks = (img.dataset.fallbacks || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  img.dataset.fallbackIndex = "0";

  img.addEventListener("load", () => {
    img.classList.add("is-loaded");
    img.closest(".card-icon")?.classList.add("has-image");
  });

  img.addEventListener("error", () => {
    const nextIndex = Number(img.dataset.fallbackIndex || 0);
    const nextSrc = fallbacks[nextIndex];

    if (nextSrc) {
      img.dataset.fallbackIndex = String(nextIndex + 1);
      img.src = nextSrc;
      return;
    }

    img.classList.add("is-hidden");
    img.closest(".card-icon")?.classList.remove("has-image");
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // O menu continua funcionando normalmente mesmo sem service worker.
    });
  });
}
