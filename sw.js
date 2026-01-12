importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js');

  const firebaseConfig = {
    apiKey: "AIzaSyCwcdPhGcHb6kDhVPYJgV0lpZoWX3qSn4A",           // ← CHANGE!
    authDomain: "heartline-6bb08.firebaseapp.com",
    projectId: "heartline-6bb08",
    storageBucket: "heartline-6bb08.firebasestorage.app",
    messagingSenderId: "372851895770",
    appId: "1:372851895770:web:aac0ae1e5bdb22482c24e3"
    measurementId: "G-C51VHHGKG6"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://files.catbox.moe/74tj86.jpg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('twinnie-chat-v1').then(cache => {
      return cache.addAll([
        './',
        'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js',
        'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js',
        'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js',
        'https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging.js'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
