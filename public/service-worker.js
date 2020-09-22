self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open("static")
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(['./', './static/css/', './static/js/']);
            })
    );
});
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                return fetch(event.request);
            }
            )
    );
});