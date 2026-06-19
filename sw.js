// Gaming Hub Service Worker v6
const CACHE_NAME = 'gaming-hub-v10-salary-cat';
const ASSETS = [
    './',
    'index.html',
    'style.css',
    'script.js',
    'avatar.jpg',
    'profile-bg.jpg',
    'manifest.json'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(names) {
            return Promise.all(
                names.filter(function(name) { return name !== CACHE_NAME; })
                    .map(function(name) { return caches.delete(name); })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    if (event.request.url.includes('/api/')) return;

    var requestUrl = new URL(event.request.url);
    var isFreshAsset =
        event.request.destination === 'document' ||
        requestUrl.pathname.endsWith('/index.html') ||
        requestUrl.pathname.endsWith('/style.css') ||
        requestUrl.pathname.endsWith('/script.js') ||
        requestUrl.pathname.endsWith('/sw.js');

    if (isFreshAsset) {
        event.respondWith(
            fetch(event.request).then(function(response) {
                if (response && response.status === 200 && response.type === 'basic') {
                    var responseClone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(function() {
                return caches.match(event.request).then(function(cached) {
                    return cached || caches.match('index.html');
                });
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then(function(cached) {
            if (cached) return cached;
            return fetch(event.request).then(function(response) {
                if (response && response.status === 200 && response.type === 'basic') {
                    var responseClone = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, responseClone);
                    });
                }
                return response;
            }).catch(function() {
                if (event.request.destination === 'document') {
                    return caches.match('index.html');
                }
            });
        })
    );
});
