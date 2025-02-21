self.addEventListener('install', (event) => {
    // console.log('Service Worker installed');
    self.skipWaiting(); // Immediately activate the new SW
});

self.addEventListener('activate', (event) => {
    // console.log('Service Worker activated');
    event.waitUntil(self.clients.claim()); // Take control of all pages immediately
});
