// ════════════════════════════════════════════════════════════
//  Service Worker — 更新を自動反映する
//  記事やコードを更新したら、下の CACHE_VERSION の数字を1つ上げて
//  git push すれば、会員のアプリにも自動で反映されます。
// ════════════════════════════════════════════════════════════
const CACHE_VERSION = 'v2';            // ← 更新時はここを v2, v3... と上げる
const CACHE_NAME = 'xector1-' + CACHE_VERSION;

// インストール時：すぐ新SWを有効化
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// 有効化時：古いバージョンのキャッシュを削除
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// 取得時：ネットワーク優先（最新を取りに行き、失敗時のみキャッシュ）
// これにより「git pushした最新」が常に優先される
self.addEventListener('fetch', (e) => {
  const req = e.request;
  // GET以外・別オリジン（Firebase等）はそのまま通す
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) {
    return;
  }
  e.respondWith(
    fetch(req)
      .then(res => {
        // 取れた最新をキャッシュに保存（オフライン用）
        const copy = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      })
      .catch(() => caches.match(req))   // オフライン時はキャッシュから
  );
});
