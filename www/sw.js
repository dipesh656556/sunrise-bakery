/* Offline support: app files are cached so the bakery app opens without internet. */
const CACHE = 'sunrise-bakery-v1';
const SHELL = ['./','index.html','config.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  // Never cache Firebase data/auth calls (the Firebase SDK handles its own offline storage)
  if(/googleapis\.com$/.test(url.hostname) && !/fonts\./.test(url.hostname)) return;
  if(url.hostname.endsWith('firebaseio.com') || url.hostname.endsWith('firebaseapp.com')) return;
  // App page + config: network first (so updates arrive), fall back to cache offline
  if(url.origin === location.origin){
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(CACHE).then(c=>c.put(req, copy)); return r; }).catch(()=>caches.match(req).then(m=>m||caches.match('index.html'))));
    return;
  }
  // Fonts + Firebase SDK scripts: cache first
  e.respondWith(caches.match(req).then(m => m || fetch(req).then(r => { if(r.ok || r.type==='opaque'){ const copy = r.clone(); caches.open(CACHE).then(c=>c.put(req, copy)); } return r; })));
});
