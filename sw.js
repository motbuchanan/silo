/* Shared service worker — SILO + GPI.
   Both pages live at the same origin root, so there can be only ONE
   service worker here. Bump CACHE on every content change. */
var CACHE = "silo-v0.11";
var SHELL = [
  "./index.html",
  "./sightings.json",
  "./silo.webmanifest",
  "./silo-192.png",
  "./silo-512.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){
      return Promise.all(SHELL.map(function(u){
        return c.add(u).catch(function(){});
      }));
    }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE; })
        .map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* network-first so pushed content and edits land immediately,
   cache as offline fallback */
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET"){ return; }
  var url = new URL(e.request.url);
  if(url.origin !== self.location.origin){ return; }
  e.respondWith(
    fetch(e.request).then(function(r){
      var copy = r.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      return r;
    }).catch(function(){
      return caches.match(e.request).then(function(m){
        return m || caches.match("./index.html");
      });
    })
  );
});

/* notifications raised by the page (see index.html) and, if FCM is
   wired later, by push events */
self.addEventListener("notificationclick", function(e){
  e.notification.close();
  var ref = (e.notification.data && e.notification.data.ref) || "";
  var target = "./index.html" + (ref ? ("#" + ref) : "");
  e.waitUntil(
    clients.matchAll({type:"window", includeUncontrolled:true}).then(function(list){
      for(var i=0;i<list.length;i++){
        if(list[i].url.indexOf("index.html") >= 0 && "focus" in list[i]){
          list[i].navigate(target);
          return list[i].focus();
        }
      }
      if(clients.openWindow){ return clients.openWindow(target); }
    })
  );
});

self.addEventListener("push", function(e){
  var d = {};
  try{ d = e.data ? e.data.json() : {}; }catch(err){}
  var title = d.title || "SILO — INTAKE ALERT";
  var body  = d.body  || "A new formation has entered the registry.";
  e.waitUntil(self.registration.showNotification(title, {
    body: body,
    icon: "./silo-192.png",
    badge: "./silo-192.png",
    tag: d.ref || "silo-intake",
    data: { ref: d.ref || "" },
    vibrate: [200,100,200]
  }));
});
