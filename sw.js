self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("FinanceFLP-cache").then((cache) => {
            return cache.addAll([
                "./",
                "./app.js",
                "./index.html",
                "./style.css",
                "./manifest.json",
                "./icon.png",
                "https://cdn.jsdelivr.net/npm/pouchdb@7.2.2/dist/pouchdb.min.js"
            ])
        })
    )
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => res || fetch(e.request))
    );
});