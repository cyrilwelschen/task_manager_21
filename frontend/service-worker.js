self.addEventListener('install', event => {
    event.waitUntil(
        caches.open("static").then(cache => {
            return cache.addAll(["./", "./modal.css", "./style.css", "./images/uhr.png"])
        })
    )
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    )
})