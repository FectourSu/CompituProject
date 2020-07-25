"use strict";

/* A version number is useful when updating the worker logic,
   allowing you to remove outdated cache entries during the update.
*/
var version = 'v1::';

/* These resources will be downloaded and cached by the service worker
   during the installation process. If any resource fails to be downloaded,
   then the service worker won't be installed either.
*/
var offlineFundamentals = [
    '',
    '/',
    '/themes/madewithlove/assets/builds/css/styles.css',
    '/themes/madewithlove/assets/builds/js/scripts.js',
];

var offlinePage = '<html><head><title>Uh oh, you appear to be offline!</title><style>.offline{box-sizing:border-box;display:flex;align-items:center;justify-content:center;min-height:100%;padding:2rem;}.offline__container{box-sizing:border-box;width:auto;text-align:center;}h2{font-family:Helvetica,Arial,sans-serif;}</style></head><body><section class="offline"><div class="offline__container"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHdpZHRoPSI4MHB4IiBoZWlnaHQ9IjYwcHgiIHZpZXdCb3g9IjAgMCA4MCA2MCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgODAgNjAiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cG9seWdvbiBmaWxsPSIjQ0QxQjM4IiBwb2ludHM9IjIwLjUyNiwwLjQ1IDEsMTkuOTc3IDQwLjA1Myw1OS4wMjggNzkuMTA1LDE5Ljk3NyA1OS41NzgsMC40NSA0MC4wNTMsMTkuOTc3ICIvPgo8cG9seWdvbiBmaWxsPSIjOEYxMzI5IiBwb2ludHM9IjQwLjA1MywyMCA1OS41NzgsMzkuNTI2IDc5LjEwNSwyMCAiLz4KPC9zdmc+Cg==" alt="madewithlove logo" /><h2>Uh oh, you appear to be offline!</h2></div></section></body></html>';

/* The install event fires when the service worker is first installed.
   You can use this event to prepare the service worker to be able to serve
   files while visitors are offline.
*/
self.addEventListener("install", function (event) {
    /* Using event.waitUntil(p) blocks the installation process on the provided
       promise. If the promise is rejected, the service worker won't be installed.
    */
    event.waitUntil(
        /* The caches built-in is a promise-based API that helps you cache responses,
           as well as finding and deleting them.
        */
        caches
            /* You can open a cache by name, and this method returns a promise. We use
               a versioned cache name here so that we can remove old cache entries in
               one fell swoop later, when phasing out an older service worker.
            */
            .open(version + 'fundamentals')
            .then(function (cache) {
                /* After the cache is opened, we can fill it with the offline fundamentals.
                   The method below will add all resources in `offlineFundamentals` to the
                   cache, after making requests for them.
                */
                return cache.addAll(offlineFundamentals);
            })
            .then(function () {
            })
    );
});

/* The fetch event fires whenever a page controlled by this service worker requests
   a resource. This isn't limited to `fetch` or even XMLHttpRequest. Instead, it
   comprehends even the request for the HTML page on first load, as well as JS and
   CSS resources, fonts, any images, etc.
*/
self.addEventListener("fetch", function (event) {

    /* We should only cache GET requests, and deal with the rest of method in the
       client-side, by handling failed POST,PUT,PATCH,etc. requests.
    */
    if (event.request.method !== 'GET') {
        /* If we don't block the event as shown below, then the request will go to
           the network as usual.
        */
        return;
    }
    /* Similar to event.waitUntil in that it blocks the fetch event on a promise.
       Fulfillment result will be used as the response, and rejection will end in a
       HTTP response indicating failure.
    */
    event.respondWith(
        caches
            /* This method returns a promise that resolves to a cache entry matching
               the request. Once the promise is settled, we can then provide a response
               to the fetch request.
            */
            .match(event.request)
            .then(function (cached) {
                /* Even if the response is in our cache, we go to the network as well.
                   This pattern is known for producing "eventually fresh" responses,
                   where we return cached responses immediately, and meanwhile pull
                   a network response and store that in the cache.
                   Read more:
                   https://ponyfoo.com/articles/progressive-networking-serviceworker
                */
                var networked = fetch(event.request)
                    // We handle the network request with success and failure scenarios.
                    .then(fetchedFromNetwork, unableToResolve)
                    // We should catch errors on the fetchedFromNetwork handler as well.
                    .catch(unableToResolve);

                /* We return the cached response immediately if there is one, and fall
                   back to waiting on the network as usual.
                */
                return cached || networked;

                function fetchedFromNetwork(response) {
                    /* We copy the response before replying to the network request.
                       This is the response that will be stored on the ServiceWorker cache.
                    */
                    var cacheCopy = response.clone();


                    caches
                        // We open a cache to store the response for this request.
                        .open(version + 'pages')
                        .then(function add(cache) {
                            /* We store the response for this request. It'll later become
                               available to caches.match(event.request) calls, when looking
                               for cached responses.
                            */
                            cache.put(event.request, cacheCopy);
                        })
                        .then(function () {
                        });

                    // Return the response so that the promise is settled in fulfillment.
                    return response;
                }

                /* When this method is called, it means we were unable to produce a response
                   from either the cache or the network. This is our opportunity to produce
                   a meaningful response even when all else fails. It's the last chance, so
                   you probably want to display a "Service Unavailable" view or a generic
                   error response.
                */
                function unableToResolve() {
                    /* There's a couple of things we can do here.
                       - Test the Accept header and then return one of the `offlineFundamentals`
                         e.g: `return caches.match('/some/cached/image.png')`
                       - You should also consider the origin. It's easier to decide what
                         "unavailable" means for requests against your origins than for requests
                         against a third party, such as an ad provider.
                       - Generate a Response programmaticaly, as shown below, and return that.
                    */


                    /* Here we're creating a response programmatically. The first parameter is the
                       response body, and the second one defines the options for the response.
                    */
                    return new Response(offlinePage, {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/html'
                        })
                    });
                }
            })
    );
});

/* The activate event fires after a service worker has been successfully installed.
   It is most useful when phasing out an older version of a service worker, as at
   this point you know that the new worker was installed correctly. In this example,
   we delete old caches that don't match the version in the worker we just finished
   installing.
*/
self.addEventListener("activate", function (event) {
    /* Just like with the install event, event.waitUntil blocks activate on a promise.
       Activation will fail unless the promise is fulfilled.
    */

    event.waitUntil(
        caches
            /* This method returns a promise which will resolve to an array of available
               cache keys.
            */
            .keys()
            .then(function (keys) {
                // We return a promise that settles when all outdated caches are deleted.
                return Promise.all(
                    keys
                        .filter(function (key) {
                            // Filter by keys that don't start with the latest version prefix.
                            return !key.startsWith(version);
                        })
                        .map(function (key) {
                            /* Return a promise that's fulfilled
                               when each outdated cache is deleted.
                            */
                            return caches.delete(key);
                        })
                );
            })
            .then(function () {
            })
    );
});