const PROGRAM_LINKS = document.querySelectorAll(".card-button");

PROGRAM_LINKS.forEach((link) => {
  link.addEventListener("click", () => {
    link.setAttribute("aria-busy", "true");
  });
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // O menu continua funcionando normalmente mesmo sem service worker.
    });
  });
}
