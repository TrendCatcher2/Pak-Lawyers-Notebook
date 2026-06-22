const CACHE_NAME = 'pak-notebook-cache-v1';
const ASSETS = [
  '/Pak-Lawyers-Notebook/',
  '/Pak-Lawyers-Notebook/index.html',
  '/Pak-Lawyers-Notebook/manifest.json',
  '/Pak-Lawyers-Notebook/icon-192.png',
  '/Pak-Lawyers-Notebook/icon-512.png'
];

// Install Service Worker and cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch assets from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
