(global => {
    'use strict';
    importScripts('/js/vendor/sw-toolbox/sw-toolbox.js');

    global.toolbox.precache([
        './js/companion.js',
    ]);
    global.toolbox.options.debug = true;

    global.toolbox.router.get('/', global.toolbox.networkFirst);
    // global.toolbox.router.get(/(.html|.js|.css|.json)/, global.toolbox.cacheFirst);
    global.toolbox.router.get(/(.js|.css|.png|.jpg|.json|.html|.woff|\/translate)/, global.toolbox.fastest);


    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
