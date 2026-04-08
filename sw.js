// Service Worker for 김비서 - 마케팅팀장 대시보드
const CACHE_NAME = 'kim-biseo-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/업무대시보드.html',
  '/manifest.json',
  '/sw.js'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS).catch(() => {
        // 네트워크 오류 무시 (배포 초기)
        console.log('[Service Worker] Some assets failed to cache');
      });
    })
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Network first, fallback to cache
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // GET 요청만 처리
  if (request.method !== 'GET') {
    return;
  }

  // 네트워크 우선
  event.respondWith(
    fetch(request)
      .then((response) => {
        // 성공한 응답은 캐시에 저장
        if (!response || response.status !== 200) {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });

        return response;
      })
      .catch(() => {
        // 네트워크 실패 시 캐시에서 반환
        return caches.match(request).then((cached) => {
          return cached || caches.match('/');
        });
      })
  );
});

// Background sync (선택사항)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-todos') {
    console.log('[Service Worker] Background sync triggered');
    // 여기에 TODO 동기화 로직 추가 가능
  }
});

// Push notification (선택사항)
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    tag: 'kim-biseo-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('김비서', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }
      return clients.openWindow('/');
    })
  );
});

console.log('[Service Worker] Loaded');
