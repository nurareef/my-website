const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
    'https://raw.githack.com/nurareef/my-website/main/areef2.html',
    'https://raw.githack.com/nurareef/my-website/main/AAflower.html',
    'https://raw.githack.com/nurareef/my-website/main/manifest2.json',
    'https://raw.githack.com/nurareef/my-website/main/icons/icon-192x192.png',
    'https://raw.githack.com/nurareef/my-website/main/icons/icon-512x512.png',
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response from the cached version
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
