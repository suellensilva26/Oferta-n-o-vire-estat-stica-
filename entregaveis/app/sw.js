var V="nve-v1";var CORE=["./","index.html","assets/app.css?v=1","assets/data.js?v=1","assets/aulas.js?v=1","assets/app.js?v=1","assets/inter-latin.woff2","assets/montserrat-latin.woff2","icons/icon-192.png","manifest.webmanifest"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(V).then(function(c){return c.addAll(CORE)}).then(function(){return self.skipWaiting()}))});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==V}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener("fetch",function(e){var r=e.request;if(r.method!=="GET")return;var u=new URL(r.url);if(u.origin!==location.origin)return;
 if(u.pathname.indexOf("/f/")===0)return; /* arquivos de download: sempre rede */
 if(r.mode==="navigate"||u.pathname.endsWith(".html")||u.pathname==="/"){e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(V).then(function(c){c.put("index.html",cp)});return res}).catch(function(){return caches.match("index.html")}));return}
 e.respondWith(caches.match(r).then(function(m){return m||fetch(r).then(function(res){if(res.ok){var cp=res.clone();caches.open(V).then(function(c){c.put(r,cp)})}return res})}))});
