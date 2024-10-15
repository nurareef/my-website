const CACHE_NAME = 'google-maps-pwa-cache-v1';
const urlsToCache = [
    '/',
    'https://www.google.com.my/maps', // Link to Google Maps
    'https://raw.githack.com/nurareef/my-website/main/areef.html', // Your HTML file
    'https://raw.githack.com/nurareef/my-website/main/manifest.json', // Your manifest file
    // Add other resources you want to cache (e.g., CSS, JS, icons)
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching files');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return the cached response
                if (response) {
                    return response;
                }
                return fetch(event.request); // Fallback to network
            })
    );
});
