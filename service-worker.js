const CACHE_NAME = "menu-aplicativos-bouquetflores-v4";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=20260701-4",
  "./app.js?v=20260701-4",
  "./manifest.webmanifest?v=20260701-4",
  "./icons/icon-192.png?v=20260701-4",
  "./icons/icon-512.png?v=20260701-4",
  "./icons/apple-touch-icon.png?v=20260701-4",
  "./icons/favicon-32.png?v=20260701-4",
  "./icons/favicon-16.png?v=20260701-4",
  "./icons/favicon.ico?v=20260701-4",
  "./icons/menu-aplicativos-icon.png?v=20260701-4"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      try {
        const freshRequest = new Request(event.request, { cache: "reload" });
        const networkResponse = await fetch(freshRequest);

        if (networkResponse && networkResponse.ok) {
          await cache.put(event.request, networkResponse.clone());
        }

        return networkResponse;
      } catch {
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) return cachedResponse;

        if (event.request.mode === "navigate") {
          return cache.match("./") || cache.match("./index.html");
        }

        throw new Error("Recurso indisponível offline.");
      }
    })()
  );
});
