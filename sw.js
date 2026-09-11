/* ============================================================
   Service worker -- membuat situs ini bisa "diinstal" ke layar HP
   (PWA) dan tetap bisa dibuka saat tidak ada internet.

   Strategi disengaja beda per jenis berkas:

   - HALAMAN (index.html, katalog.html, umkm.html, dst.) dan
     data/katalog.js -> INTERNET DULU. Setiap dibuka dalam keadaan
     online, situs selalu mengambil versi TERBARU dan sekaligus
     menyimpannya. Baru kalau memang tidak ada internet, versi
     tersimpan terakhir yang dipakai. Ini yang membuat versi offline
     tetap "sinkron" tiap kali HP tersambung internet -- tidak perlu
     langkah sinkron manual.

   - Berkas lain (CSS, JS, font, foto) -> CACHE DULU. Jarang berubah,
     jadi diutamakan cepat, sambil diam-diam diperbarui di latar
     belakang untuk kunjungan berikutnya.

   Naikkan CACHE_VERSI setiap daftar BERKAS_INTI berubah, supaya
   peramban tahu perlu mengunduh ulang.
   ============================================================ */

const CACHE_VERSI = "sadomas-v1";

const BERKAS_INTI = [
  "index.html",
  "katalog.html",
  "wisata.html",
  "umkm.html",
  "produk.html",
  "destinasi.html",
  "404.html",
  "assets/style.css",
  "assets/app.js",
  "assets/fonts/plus-jakarta-sans.woff2",
  "data/katalog.js",
  "manifest.json",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_VERSI)
      .then((cache) => cache.addAll(BERKAS_INTI))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((nama) =>
        Promise.all(
          nama
            .filter((n) => n !== CACHE_VERSI)
            .map((n) => caches.delete(n)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/** Halaman & data/katalog.js: coba jaringan dulu. Kalau berhasil,
 *  simpan salinannya. Kalau gagal (offline), pakai yang tersimpan --
 *  diabaikan bagian ?u=/?p=/?w= supaya satu salinan umkm.html/
 *  produk.html/destinasi.html bisa dipakai untuk SEMUA slug, bukan
 *  cuma slug yang persis pernah dibuka. */
async function jaringanDuluCache(permintaan) {
  try {
    const respons = await fetch(permintaan);
    const cache = await caches.open(CACHE_VERSI);
    cache.put(permintaan, respons.clone());
    return respons;
  } catch {
    const tersimpan = await caches.match(permintaan, { ignoreSearch: true });
    if (tersimpan) return tersimpan;
    return caches.match("404.html");
  }
}

/** Aset lain: pakai yang tersimpan dulu (cepat), sambil di latar
 *  belakang mengambil versi baru untuk kunjungan berikutnya. */
function cacheDuluJaringan(permintaan) {
  return caches.match(permintaan).then((tersimpan) => {
    const diperbarui = fetch(permintaan)
      .then((respons) => {
        if (respons && respons.ok) {
          caches
            .open(CACHE_VERSI)
            .then((cache) => cache.put(permintaan, respons.clone()));
        }
        return respons;
      })
      .catch(() => tersimpan);
    return tersimpan || diperbarui;
  });
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Jangan campuri permintaan ke domain lain (mis. Apps Script untuk
  // form admin) -- biarkan berjalan seperti biasa, apa adanya.
  if (url.origin !== location.origin) return;

  const perluSelaluBaru =
    req.mode === "navigate" || url.pathname.endsWith("/data/katalog.js");

  e.respondWith(
    perluSelaluBaru ? jaringanDuluCache(req) : cacheDuluJaringan(req),
  );
});
