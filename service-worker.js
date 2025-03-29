
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("geist-cache").then(cache => {
      return cache.addAll([
        "/index.html",
        "/style.css",
        "/geist.js",
        "/manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
