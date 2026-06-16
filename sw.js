const CACHE_NAME = 'gajahmas-cache-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js'
];

// Tahap Install: Simpan aset-aset penting ke cache browser
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Membuka cache PWA Gajah Mas');
        return cache.addAll(urlsToCache);
      })
  );
});

// Tahap Fetch: Ambil dari cache jika offline untuk loading super cepat
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan aset cache
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});
