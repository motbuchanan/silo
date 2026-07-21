/* GPI console — cache version must match the gpi.html version badge */
var CACHE = "gpi-ops-v0.2";
var ASSETS = ["./gpi.html", "./gpi.webmanifest", "./gpi-192.png", "./gpi-512.png"];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
/* network-first, and only ever cache GPI's own assets so the subject app stays untouched */
self.addEventListener("fetch", function(e){
  var url = new URL(e.request.url);
  var isOps = ASSETS.some(function(a){ return url.pathname.endsWith(a.replace("./","/")); });
  if(!isOps){ return; }
  e.respondWith(
    fetch(e.request).then(function(r){
      var copy = r.clone();
      caches.open(CACHE).then(function(c){ if(e.request.method === "GET"){ c.put(e.request, copy); } });
      return r;
    }).catch(function(){ return caches.match(e.request); })
  );
});
