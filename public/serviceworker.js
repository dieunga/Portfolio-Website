//set up cache name and files to add to it
// only change from here down
const CACHE_NAME = 'my-site-v1';
const CACHE_URLS =  ['/','index.html',                      
                     'manifest.json',
                     'styles.css',
                     '404.html',
                     'image/about.jpg',
                     'contact.html',
                     'qualification.html',
                     'skills_page_1.html',
                     'skills_page_2.html',
                     'style_page1.css',
                     'style_page2.css',
                     'wordle.css',
                     'wordle.html',
                     'wordle.js', 
                     'image/background.png',
                     'image/bg1.jpg',
                     'image/colorbg.png',
                     'image/contact.jpg',
                     'image/css_logo.png',
                     'image/favicon.jpg',
                     'image/js_logo.png',
                     'image/logo.png',
                     'image/pic.png',
                     'image/pinkbg.png'];



//DO NOT change any of the code below 
//...

//add all URLs to cache when installed
self.addEventListener("install", function(event){
    console.log("Service worker installed");
    event.waitUntil(
        //create and open cache
        caches.open(CACHE_NAME)
            .then(function(cache){
                console.log("Cache opened");
                //add all URLs to cache
                return cache.addAll(CACHE_URLS);
        })
    );
});

//On activate update the cache with the new version and clean out old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName.startsWith('my-site-') && CACHE_NAME !== cacheName) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
  
//add all URLs to cache when installed
//...
//user has navigated to page - fetch required assets
self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            //check whether asset is in cache
            if(response){
                //asset in cache, so return it
                console.log(`Return ${event.request.url} from cache`);
                return response;
            }
            //asset not in cache so fetch asset from network
            console.log(`Fetch ${event.request.url} from network`);
            return fetch(event.request);
        })
    );
});
