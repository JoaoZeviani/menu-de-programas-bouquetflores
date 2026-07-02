const APP_VERSION = "20260701-6";
const PROGRAM_LINKS = document.querySelectorAll(".card-button");
const PROGRAM_ICONS = document.querySelectorAll(".program-icon-img");

function withCacheBust(src) {
  if (!src) return "";

  const url = new URL(src, window.location.href);
  url.searchParams.set("v", APP_VERSION);
  return url.toString();
}

PROGRAM_LINKS.forEach((link) => {
  link.addEventListener("click", () => {
    link.setAttribute("aria-busy", "true");
  });
});

PROGRAM_ICONS.forEach((img) => {
  const mainSrc = img.dataset.src || img.getAttribute("src") || "";
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
      img.src = withCacheBust(nextSrc);
      return;
    }

    img.classList.add("is-hidden");
    img.closest(".card-icon")?.classList.remove("has-image");
  });

  img.src = withCacheBust(mainSrc);
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const registration = await navigator.serviceWorker.register(`./service-worker.js?v=${APP_VERSION}`, {
        scope: "./"
      });

      await registration.update();
    } catch {
      // O menu continua funcionando normalmente mesmo sem service worker.
    }
  });
}
