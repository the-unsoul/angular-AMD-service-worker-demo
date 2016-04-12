(global => {
    'use strict';
    importScripts('/js/vendor/sw-toolbox/sw-toolbox.js');

    global.toolbox.precache([
        '/',
        'index.html',
        './js/companion.js',
    ]);
    // global.toolbox.options.debug = true;

    global.toolbox.router.get(/\/$/, global.toolbox.networkFirst);
    // global.toolbox.router.get(/(.html|.js|.css|.json)/, global.toolbox.cacheFirst);
    global.toolbox.router.get(/(.js|.css|.png|.jpg|.json|.html|.woff|.ico)/, global.toolbox.fastest);

    // JSON DB's origin
    global.toolbox.router.get('/demo/todo', global.toolbox.networkFirst, {origin: "http://localhost:3000"})


    global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
    global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
