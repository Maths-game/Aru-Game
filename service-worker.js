// PWA: Service Worker file for offline caching
const CACHE_NAME = 'aru-fun-world-v1';
const urlsToCache = [
    './',
    'index.html',
    'manifest.json',
    'https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.min.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap'
];

self.addEventListener('install', (event) => {
    // Perform installation steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    // Serve from cache first, then fall back to network
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // If a cached response is found, return it
                if (response) {
                    return response;
                }
                // Otherwise, fetch from the network
                return fetch(event.request);
            })
    );
});
