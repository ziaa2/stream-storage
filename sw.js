const V='v2',PDF='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png',PDF+'pdf.min.js',PDF+'pdf.worker.min.js'];
const keep=(r,x)=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x};
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(SHELL.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
 if(new URL(r.url).origin===location.origin)e.respondWith(fetch(r).then(x=>keep(r,x)).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match('index.html'))));
 else e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>keep(r,x))))});
