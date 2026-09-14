/* ============================================================
   Form admin: tambah / ubah / hapus UMKM/Produk/Wisata (ditulis
   langsung ke GitHub lewat token pribadi admin, lihat SKEMA_TAB di
   bawah) dan Ulasan/Promo/Kode Akses Toko (lewat Apps Script Web App,
   tidak ada Google Sheet sama sekali). Lihat PANDUAN-ADMIN.md untuk
   cara memasangnya.

   Dimuat sebagai skrip biasa (bukan <script type="module">) SENGAJA:
   server statis (termasuk kadang GitHub Pages) tidak selalu mengirim
   Content-Type yang tepat untuk berkas .mjs, dan peramban menolak
   menjalankan modul ES kalau Content-Type-nya salah -- daripada
   bergantung pada konfigurasi server yang tidak dikendalikan dari
   sini, dua angka di bawah cukup disalin manual dari skema.mjs.

   Halaman ini ditautkan lewat ikon gembok di pojok kanan atas kepala
   situs (lihat susunKepala() di app.js), tapi itu cuma kemudahan --
   siapa pun yang tahu alamatnya tetap bisa membukanya langsung (GitHub
   Pages tidak punya login halaman). Yang benar-benar menahan penulisan
   data adalah pengecekan kata sandi di Apps Script (Code.gs), bukan
   halaman ini ataupun tertaut-tidaknya dari menu.
   ============================================================ */

// Harus selalu sama dengan JUMLAH_GALERI/JUMLAH_RINCIAN di
// scripts/skema.mjs -- kalau salah satu diubah, ubah juga yang lain.
const JUMLAH_GALERI = 4;
const JUMLAH_RINCIAN = 6;

const KUNCI_LOKAL = "admin-katalog-pengaturan";

const TEKS = "teks";
const AREA = "area";
const ANGKA = "angka";
const CENTANG = "centang";
const FOTO = "foto";

// Tiap tab disimpan di salah satu dari dua tempat -- lihat catatan di
// atas berkas Code.gs untuk alasan pembagiannya. UMKM/PRODUK/WISATA
// cuma pernah ditulis admin (yang pegang token GitHub asli), jadi token
// itu cukup jadi gerbangnya -- ditulis LANGSUNG ke GitHub dari sini,
// tidak lewat Apps Script sama sekali. ULASAN/PROMO/AKSES_UMKM
// penulisannya publik/anonim atau lewat kode akses toko -- keduanya
// wajib divalidasi SERVER dulu (Apps Script), sesuatu yang tidak bisa
// dilakukan aman lewat token yang tertanam di halaman publik. Tidak
// ada Google Sheet di jalur mana pun lagi.
const GITHUB = "github";
// Ulasan/Promo/Kode Akses masing-masing punya bentuk penyimpanan &
// pengenal sendiri di Code.gs (berkas GitHub untuk Ulasan/Promo,
// PropertiesService untuk Kode Akses), jadi tiap tab mendefinisikan
// sendiri fungsi baca/simpan/hapus/kunci-nya (lihat SKEMA_TAB di
// bawah) -- semuanya lewat Apps Script Web App, bukan token GitHub.
const KHUSUS = "khusus";

function kolomGaleri() {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_GALERI; i++) {
    hasil.push([`galeri${i}_judul`, `Galeri ${i} — judul`, TEKS]);
    hasil.push([`galeri${i}_foto`, `Galeri ${i} — foto`, FOTO]);
  }
  return hasil;
}

function kolomGaleriProduk() {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_GALERI; i++) {
    hasil.push([`galeri${i}`, `Foto tambahan ${i}`, FOTO]);
  }
  return hasil;
}

function kolomRincian() {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_RINCIAN; i++) {
    hasil.push([`rincian${i}_label`, `Rincian ${i} — label`, TEKS]);
    hasil.push([`rincian${i}_isi`, `Rincian ${i} — isi`, TEKS]);
  }
  return hasil;
}

/* [kunci_kolom, label, tipe, wajib] */
const SKEMA_TAB = {
  UMKM: {
    label: "UMKM",
    sumber: GITHUB,
    berkas: "data/db/umkm.json",
    ringkas: (r) => r.nama + " — " + r.slug,
    field: [
      ["slug", "Slug (huruf kecil, pakai -, tidak boleh sama dengan yang lain)", TEKS, true],
      ["nama", "Nama usaha", TEKS, true],
      ["kategori", "Kategori (kuliner / pertanian / perikanan / kerajinan)", TEKS, true],
      ["pemilik", "Nama pemilik", TEKS],
      ["wa", "Nomor WhatsApp (awalan 62, contoh 6281234567890)", TEKS],
      ["alamat", "Alamat", TEKS],
      ["foto", "Foto utama", FOTO],
      ["penilaian", "Penilaian (0-5, biarkan 0 bila belum ada)", ANGKA],
      ["jamBuka", "Jam buka", TEKS],
      ["pengiriman", "Pengiriman", TEKS],
      ["fotoLokasi", "Foto lokasi", FOTO],
      ["deskripsi", "Deskripsi", AREA, true],
    ],
  },
  PRODUK: {
    label: "Produk",
    sumber: GITHUB,
    berkas: "data/db/produk.json",
    ringkas: (r) => r.nama + " — milik " + r.umkm,
    field: [
      ["slug", "Slug (huruf kecil, pakai -, tidak boleh sama dengan yang lain)", TEKS, true],
      ["nama", "Nama produk", TEKS, true],
      ["umkm", "Slug UMKM pemilik (harus sama persis)", TEKS, true],
      ["kategori", "Kategori", TEKS, true],
      ["harga", "Harga (kisaran, contoh Rp15.000 – Rp18.000)", TEKS],
      ["satuan", "Satuan (contoh per kotak isi 10 buah)", TEKS],
      ["foto", "Foto utama", FOTO],
      ["penilaian", "Penilaian (0-5, biarkan 0 bila belum ada)", ANGKA],
      ...kolomGaleriProduk(),
      ["unggulan", "Tampilkan di beranda sebagai produk unggulan", CENTANG],
      ["deskripsi", "Deskripsi", AREA, true],
      ...kolomRincian(),
    ],
  },
  WISATA: {
    label: "Wisata",
    sumber: GITHUB,
    berkas: "data/db/wisata.json",
    ringkas: (r) => r.nama + " — " + r.slug,
    field: [
      ["slug", "Slug (huruf kecil, pakai -, tidak boleh sama dengan yang lain)", TEKS, true],
      ["nama", "Nama lokasi", TEKS, true],
      ["jenis", "Jenis (contoh Air Terjun, Bukit, Kolam Pemandian)", TEKS],
      ["alamat", "Alamat", TEKS],
      ["jamBuka", "Jam buka", TEKS],
      ["tiket", "Tiket masuk", TEKS],
      ["kontak", "Nomor WhatsApp kontak (kosongkan untuk pakai WA desa)", TEKS],
      ["foto", "Foto utama", FOTO],
      ["fotoLokasi", "Foto lokasi", FOTO],
      ["penilaian", "Penilaian (0-5, biarkan 0 bila belum ada)", ANGKA],
      ["keteranganGaleri", "Keterangan galeri suasana", TEKS],
      ...kolomGaleri(),
      ["deskripsi", "Deskripsi", AREA, true],
    ],
  },
  ULASAN: {
    label: "Ulasan pembeli",
    sumber: KHUSUS,
    kunci: (r) => r.id,
    baca: () => panggilAppsScript({ aksi: "bacaUlasan" }).then((j) => j.data),
    simpan: (data, sedangDiedit) =>
      panggilPost(
        sedangDiedit
          ? { aksi: "ubahUlasanAdmin", id: sedangDiedit, data }
          : { aksi: "tambahUlasanAdmin", data },
      ),
    hapus: (id) => panggilPost({ aksi: "hapusUlasan", id }),
    ringkas: (r) => r.nama + " tentang " + r.produk + " — “" + String(r.teks || "").slice(0, 40) + "”",
    field: [
      ["produk", "Slug produk yang diulas (harus sama persis)", TEKS, true],
      ["nama", "Nama pengulas", TEKS, true],
      ["asal", "Asal / tanggal (contoh: Rajagaluh, 12 September 2026)", TEKS],
      ["penilaian", "Penilaian (1-5)", ANGKA],
      ["teks", "Isi ulasan", AREA, true],
    ],
  },
  PROMO: {
    label: "Promo per-UMKM",
    sumber: KHUSUS,
    kunci: (r) => r.slug,
    baca: () => panggilPost({ aksi: "bacaPromoAdmin" }).then((j) => j.data),
    simpan: (data) => panggilPost({ aksi: "simpanPromoAdmin", slug: data.slug, teks: data.teks, aktif: data.aktif }),
    hapus: (slug) => panggilPost({ aksi: "hapusPromo", slug }),
    ringkas: (r) => r.slug + (r.aktif ? " (aktif)" : " (nonaktif)") + " — " + String(r.teks || "").slice(0, 40),
    field: [
      ["slug", "Slug UMKM (harus sama persis)", TEKS, true],
      ["teks", "Isi promo", AREA, true],
      ["aktif", "Tampilkan di halaman toko", CENTANG],
    ],
  },
  AKSES_UMKM: {
    label: "Kode akses toko",
    sumber: KHUSUS,
    kunci: (r) => r.slug,
    baca: () => panggilPost({ aksi: "daftarKodeAkses" }).then((j) => j.data),
    simpan: (data) => panggilPost({ aksi: "simpanKodeAkses", slug: data.slug, kode: data.kode }),
    hapus: (slug) => panggilPost({ aksi: "hapusKodeAkses", slug }),
    ringkas: (r) => r.slug + " — kode: " + r.kode,
    field: [
      ["slug", "Slug UMKM (harus sama persis)", TEKS, true],
      ["kode", "Kode akses (bebas, kabari pemilik toko lewat WA)", TEKS, true],
    ],
  },
};

/* ---------- Pengaturan (alamat Web App + kata sandi) ---------- */

function ambilPengaturan() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI_LOKAL) || "{}");
  } catch {
    return {};
  }
}

function simpanPengaturan(p) {
  try {
    localStorage.setItem(KUNCI_LOKAL, JSON.stringify(p));
  } catch {
    /* localStorage tidak tersedia (mode privat dsb.) -- pengaturan tidak diingat, tidak fatal */
  }
}

// Nilai yang BENAR-BENAR dipakai untuk memanggil Apps Script selalu
// dibaca langsung dari kolom form yang sedang terlihat -- bukan dari
// localStorage. localStorage cuma dipakai untuk MENGISI kolom ini saat
// halaman dibuka (lihat renderPengaturan). Kalau tidak begini: waktu
// "Ingat kata sandi" tidak dicentang, sandi yang baru saja diketik
// tidak akan pernah tersimpan ke localStorage, dan kalau nilainya
// dibaca dari sana lagi, sandi yang baru diketik itu seolah hilang.
function nilaiPengaturanAktif() {
  const elUrl = $("#p-url");
  const elSandi = $("#p-sandi");
  const elPemilik = $("#g-pemilik");
  const elRepo = $("#g-repo");
  const elToken = $("#g-token");
  return {
    url: elUrl ? elUrl.value.trim() : "",
    sandi: elSandi ? elSandi.value : "",
    githubPemilik: elPemilik ? elPemilik.value.trim() : "",
    githubRepo: elRepo ? elRepo.value.trim() : "",
    githubToken: elToken ? elToken.value : "",
  };
}

/* ---------- Panggilan ke Apps Script ---------- */

// Content-Type text/plain SENGAJA, bukan application/json, untuk SEMUA
// panggilan (termasuk baca) -- lihat catatan CORS di Code.gs. Isinya
// tetap teks JSON, cuma nama Content-Type-nya yang "berbohong" supaya
// peramban tidak mengirim permintaan preflight OPTIONS yang tidak bisa
// dijawab Apps Script.
async function panggilAppsScript(payload) {
  const { url } = nilaiPengaturanAktif();
  if (!url) throw new Error("Alamat Web App belum diisi di bagian Pengaturan.");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const j = await res.json();
  if (j.galat) throw new Error(j.galat);
  return j;
}

async function panggilPost(payload) {
  const { sandi } = nilaiPengaturanAktif();
  if (!sandi) throw new Error("Kata sandi admin belum diisi di bagian Pengaturan.");
  return panggilAppsScript({ ...payload, sandi });
}

/* ---------- Panggilan ke GitHub Contents API (UMKM/Produk/Wisata) ----------
   Dipakai untuk tab bersumber GITHUB -- lihat catatan di dekat definisi
   SKEMA_TAB dan di kepala Code.gs untuk alasan pembagiannya. Token diisi
   di bagian Pengaturan (kolom terpisah dari kata sandi Apps Script),
   dikirim sebagai header Authorization, TIDAK PERNAH ditulis ke berkas
   apa pun di repositori. */

function kredensialGithub() {
  const { githubPemilik, githubRepo, githubToken } = nilaiPengaturanAktif();
  if (!githubPemilik || !githubRepo || !githubToken) {
    throw new Error(
      "Isi Pemilik GitHub, Repositori, dan Token GitHub di bagian Pengaturan dulu.",
    );
  }
  return { githubPemilik, githubRepo, githubToken };
}

// Dipanggil dari layar Masuk saja, buat kasih tahu cepat kalau
// pemilik/repo/token yang diketik salah -- daripada admin baru sadar
// nanti saat mencoba menyimpan data UMKM/Produk/Wisata pertama kalinya.
async function cekGithub() {
  const { githubPemilik, githubRepo, githubToken } = kredensialGithub();
  const res = await fetch(
    "https://api.github.com/repos/" + encodeURIComponent(githubPemilik) + "/" + encodeURIComponent(githubRepo),
    { headers: { Authorization: "Bearer " + githubToken, Accept: "application/vnd.github+json" } },
  );
  if (!res.ok) throw new Error(await pesanGalatGithub(res));
}

function urlGithubIsi(pemilik, repo, path) {
  return (
    "https://api.github.com/repos/" +
    encodeURIComponent(pemilik) +
    "/" +
    encodeURIComponent(repo) +
    "/contents/" +
    path
  );
}

// btoa/atob polos cuma aman untuk Latin1 -- dilewatkan TextEncoder/Decoder
// dulu supaya nama/deskripsi dengan huruf di luar itu tidak rusak.
function keBase64Utf8(teks) {
  const bytes = new TextEncoder().encode(teks);
  let biner = "";
  bytes.forEach((b) => (biner += String.fromCharCode(b)));
  return btoa(biner);
}

function dariBase64Utf8(b64) {
  const biner = atob(b64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(biner, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function pesanGalatGithub(res) {
  try {
    const j = await res.json();
    return j.message || "Permintaan ke GitHub gagal (status " + res.status + ").";
  } catch {
    return "Permintaan ke GitHub gagal (status " + res.status + ").";
  }
}

// sha null/undefined => berkas belum ada (dianggap daftar kosong) --
// wajar untuk pemasangan pertama kali sebelum ada data apa pun.
async function githubBacaBerkas(path) {
  const { githubPemilik, githubRepo, githubToken } = kredensialGithub();
  const res = await fetch(urlGithubIsi(githubPemilik, githubRepo, path), {
    headers: { Authorization: "Bearer " + githubToken, Accept: "application/vnd.github+json" },
  });
  if (res.status === 404) return { data: [], sha: null };
  if (!res.ok) throw new Error(await pesanGalatGithub(res));
  const j = await res.json();
  return { data: JSON.parse(dariBase64Utf8(j.content)), sha: j.sha };
}

// PUT Contents API MENIMPA SELURUH ISI berkas -- sha wajib disertakan
// kalau berkas itu sudah ada (didapat dari githubBacaBerkas), supaya
// GitHub bisa menolak (409) kalau ada yang menyimpan duluan sejak
// dibaca. Tanpa itu, dua admin yang menyimpan nyaris bersamaan bisa
// saling menimpa perubahan satu sama lain tanpa disadari. contentBase64
// harus SUDAH dalam bentuk base64 (dipakai untuk JSON maupun foto).
async function githubTulisMentah(path, contentBase64, shaLama, pesanCommit) {
  const { githubPemilik, githubRepo, githubToken } = kredensialGithub();
  const res = await fetch(urlGithubIsi(githubPemilik, githubRepo, path), {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + githubToken,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: pesanCommit,
      content: contentBase64,
      sha: shaLama || undefined,
    }),
  });
  if (res.status === 409) {
    throw new Error("Data sudah berubah sejak dimuat -- muat ulang daftarnya lalu coba lagi.");
  }
  if (!res.ok) throw new Error(await pesanGalatGithub(res));
  return await res.json();
}

function githubTulisBerkas(path, dataBaru, shaLama, pesanCommit) {
  return githubTulisMentah(path, keBase64Utf8(JSON.stringify(dataBaru, null, 2) + "\n"), shaLama, pesanCommit);
}

async function githubTambah(skema, dataBaru) {
  const { data: daftar, sha } = await githubBacaBerkas(skema.berkas);
  if (daftar.some((r) => String(r.slug) === String(dataBaru.slug))) {
    throw new Error("Slug '" + dataBaru.slug + "' sudah dipakai di tab " + skema.label + ".");
  }
  daftar.push(dataBaru);
  await githubTulisBerkas(skema.berkas, daftar, sha, "tambah " + skema.label + ": " + dataBaru.slug);
}

async function githubUbah(skema, slugLama, dataBaru) {
  const { data: daftar, sha } = await githubBacaBerkas(skema.berkas);
  const idx = daftar.findIndex((r) => String(r.slug) === String(slugLama));
  if (idx === -1) {
    throw new Error(
      "Data tidak ditemukan -- mungkin sudah diubah/dihapus orang lain. Muat ulang daftarnya lalu coba lagi.",
    );
  }
  daftar[idx] = dataBaru;
  await githubTulisBerkas(skema.berkas, daftar, sha, "ubah " + skema.label + ": " + dataBaru.slug);
}

async function githubHapus(skema, slug) {
  const { data: daftar, sha } = await githubBacaBerkas(skema.berkas);
  const idx = daftar.findIndex((r) => String(r.slug) === String(slug));
  if (idx === -1) {
    throw new Error("Data tidak ditemukan -- mungkin sudah dihapus orang lain. Muat ulang daftarnya.");
  }
  daftar.splice(idx, 1);
  await githubTulisBerkas(skema.berkas, daftar, sha, "hapus " + skema.label + ": " + slug);
}

/* ---------- Unggah foto ke GitHub (assets/img/) ---------- */

// kecilkanFoto() dan jalurFotoTampil() sekarang ada di
// assets/foto-util.js (dimuat lewat <script> sebelum berkas ini di
// admin.html) -- dipakai bersama assets/toko-saya.js, tidak lagi
// didefinisikan dua kali di dua tempat.

// Nama berkas SELALU dibuat unik (awalan waktu) supaya PUT ini SELALU
// membuat berkas baru di assets/img/ -- tidak pernah menimpa berkas
// yang sudah ada, jadi tidak perlu sha (beda dari githubTulisBerkas
// yang menimpa satu berkas data/db/*.json yang sama berulang kali).
async function unggahFotoDariInput(elBerkas, elTeks, elPratinjau, elStatus) {
  const file = elBerkas.files && elBerkas.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    elStatus.textContent = "Berkas yang dipilih bukan gambar.";
    elStatus.className = "f-foto-status f-foto-status--galat";
    elBerkas.value = "";
    return;
  }
  elStatus.textContent = "Mengecilkan & mengunggah foto...";
  elStatus.className = "f-foto-status";
  try {
    const { dataBase64 } = await kecilkanFoto(file);
    const namaBersih = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, "-");
    const namaBerkas = Date.now() + "-" + namaBersih.replace(/\.[^.]+$/, "") + ".jpg";
    await githubTulisMentah(
      "assets/img/" + namaBerkas,
      dataBase64,
      null,
      "unggah foto: " + namaBerkas,
    );
    elTeks.value = namaBerkas;
    elPratinjau.src = "assets/img/" + namaBerkas;
    elPratinjau.hidden = false;
    elStatus.textContent = "Foto berhasil diunggah.";
    elStatus.className = "f-foto-status f-foto-status--ok";
  } catch (err) {
    elStatus.textContent = "Gagal mengunggah: " + err.message;
    elStatus.className = "f-foto-status f-foto-status--galat";
  } finally {
    elBerkas.value = "";
  }
}

/* ---------- Bangun tampilan ---------- */

const $ = (sel, akar = document) => akar.querySelector(sel);

function elemen(tag, atribut = {}, ...anak) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(atribut)) {
    if (k === "kelas") e.className = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) e.setAttribute(k, v === true ? "" : v);
  }
  anak.flat().forEach((a) => e.append(a instanceof Node ? a : document.createTextNode(a)));
  return e;
}

let tabAktif = "UMKM";
let barisDiedit = null; // null = mode tambah; angka = mode ubah (nomor baris di Sheet)

// Layar "Masuk" bukan pengaman sungguhan (lihat catatan di atas berkas
// ini) -- fungsinya cuma supaya bagian Data/Form tidak langsung
// kelihatan dan tidak bisa dipakai sebelum kata sandi diperiksa ke
// Apps Script (aksi "cekSandi", lihat Code.gs). Kata sandinya tetap
// satu untuk semua pengurus, bukan akun per orang.
function tutupKunci() {
  $("#fieldset-data").hidden = true;
  $("#fieldset-form").hidden = true;
  $("#fieldset-statistik").hidden = true;
  $("#btn-masuk").hidden = false;
  $("#btn-keluar").hidden = true;
}

function bukaKunci() {
  $("#fieldset-data").hidden = false;
  $("#fieldset-form").hidden = false;
  $("#fieldset-statistik").hidden = false;
  $("#btn-masuk").hidden = true;
  $("#btn-keluar").hidden = false;
}

/* ---------- Statistik kunjungan & klik-WA (semua toko) ---------- */

async function muatStatistik() {
  const kotak = $("#statistik-isi");
  kotak.innerHTML = "Memuat...";
  try {
    const j = await panggilPost({ aksi: "bacaStatistik" });
    const { perToko, harian } = j.data;

    const slugSemua = Object.keys(perToko);
    kotak.innerHTML = "";
    if (!slugSemua.length) {
      kotak.append(elemen("p", { kelas: "kosong-kecil" }, "Belum ada data kunjungan tercatat."));
      return;
    }

    const dataToko = slugSemua
      .map((slug) => ({ label: slug, a: perToko[slug].kunjungan, b: perToko[slug].klikWa }))
      .sort((x, y) => y.a + y.b - (x.a + x.b))
      .slice(0, 12); // batasi supaya grafik tetap terbaca kalau UMKM banyak

    const dataHarian = harian.map((h) => ({
      label: h.tanggal.slice(5), // "MM-DD" saja, cukup untuk sumbu
      a: h.kunjungan,
      b: h.klikWa,
    }));

    kotak.innerHTML =
      "<h3>Per toko (kunjungan vs klik WhatsApp)</h3>" +
      grafikBatangGanda(dataToko, { labelA: "Kunjungan", labelB: "Klik WA" }) +
      '<h3 style="margin-top:24px">14 hari terakhir (semua toko)</h3>' +
      grafikBatangGanda(dataHarian, { labelA: "Kunjungan", labelB: "Klik WA" });
  } catch (err) {
    kotak.innerHTML = "";
    pesanStatus("Gagal memuat statistik: " + err.message, "galat");
  }
}

function pesanStatus(teks, jenis) {
  const kotak = $("#status");
  kotak.textContent = teks;
  kotak.className = "status" + (jenis ? " status--" + jenis : "");
}

function renderPengaturan() {
  const p = ambilPengaturan();
  $("#p-url").value = p.url || "";
  $("#p-sandi").value = p.sandi || "";
  $("#p-ingat").checked = Boolean(p.ingatSandi);
  $("#g-pemilik").value = p.githubPemilik || "";
  $("#g-repo").value = p.githubRepo || "";
  $("#g-token").value = p.githubToken || "";
  $("#g-ingat").checked = Boolean(p.ingatToken);
}

function renderPilihanTab() {
  const sel = $("#pilih-tab");
  sel.innerHTML = "";
  Object.entries(SKEMA_TAB).forEach(([kunci, skema]) => {
    sel.append(elemen("option", { value: kunci }, skema.label));
  });
  sel.value = tabAktif;
  perbaruiPetunjukSumber();
}

function perbaruiPetunjukSumber() {
  const el = $("#petunjuk-sumber");
  if (!el) return;
  el.textContent =
    SKEMA_TAB[tabAktif].sumber === GITHUB
      ? "Tab ini disimpan di GitHub -- butuh Token GitHub di bagian Pengaturan."
      : "Tab ini lewat Apps Script -- butuh Alamat Web App & Kata Sandi Admin di bagian Pengaturan.";
}

function renderForm() {
  const skema = SKEMA_TAB[tabAktif];
  const wadah = $("#form-field");
  wadah.innerHTML = "";
  skema.field.forEach(([kunci, label, tipe, wajib]) => {
    const idInput = "f-" + kunci;
    const baris = elemen("div", { kelas: "f-baris" });
    baris.append(elemen("label", { for: idInput }, label + (wajib ? " *" : "")));
    if (tipe === AREA) {
      baris.append(elemen("textarea", { id: idInput, name: kunci, rows: "3" }));
    } else if (tipe === CENTANG) {
      baris.append(elemen("input", { id: idInput, name: kunci, type: "checkbox" }));
    } else if (tipe === ANGKA) {
      baris.append(elemen("input", { id: idInput, name: kunci, type: "number", step: "1" }));
    } else if (tipe === FOTO) {
      const inputTeks = elemen("input", {
        id: idInput,
        name: kunci,
        type: "text",
        placeholder: "Ketik nama berkas di assets/img/, atau unggah foto di sebelah",
      });
      const pratinjau = elemen("img", { id: idInput + "-pratinjau", kelas: "f-foto-pratinjau", alt: "", hidden: true });
      const status = elemen("span", { kelas: "f-foto-status" });
      const berkas = elemen("input", { type: "file", accept: "image/*" });
      berkas.addEventListener("change", () => unggahFotoDariInput(berkas, inputTeks, pratinjau, status));
      baris.append(inputTeks, elemen("div", { kelas: "f-foto-alat" }, berkas, status), pratinjau);
    } else {
      baris.append(elemen("input", { id: idInput, name: kunci, type: "text" }));
    }
    wadah.append(baris);
  });
  isiFormDariData({});
  perbaruiJudulForm();
}

function perbaruiJudulForm() {
  const skema = SKEMA_TAB[tabAktif];
  $("#form-judul").textContent =
    barisDiedit == null ? "Tambah " + skema.label + " baru" : "Ubah " + skema.label;
  $("#btn-hapus").hidden = barisDiedit == null;
  $("#btn-batal").hidden = barisDiedit == null;
}

function isiFormDariData(data) {
  const skema = SKEMA_TAB[tabAktif];
  skema.field.forEach(([kunci, , tipe]) => {
    const input = $("#f-" + kunci);
    if (!input) return;
    if (tipe === CENTANG) {
      const v = String(data[kunci] || "").toUpperCase();
      input.checked = v === "TRUE" || v === "1" || v === "YA";
    } else {
      input.value = data[kunci] != null ? data[kunci] : "";
      if (tipe === FOTO) {
        const pratinjau = $("#f-" + kunci + "-pratinjau");
        const jalur = jalurFotoTampil(input.value);
        if (pratinjau && jalur) {
          pratinjau.src = jalur;
          pratinjau.hidden = false;
        } else if (pratinjau) {
          pratinjau.hidden = true;
          pratinjau.removeAttribute("src");
        }
      }
    }
  });
}

function bacaFormJadiData() {
  const skema = SKEMA_TAB[tabAktif];
  const data = {};
  for (const [kunci, label, tipe, wajib] of skema.field) {
    const input = $("#f-" + kunci);
    if (tipe === CENTANG) {
      data[kunci] = input.checked ? "TRUE" : "FALSE";
    } else {
      const v = input.value.trim();
      if (wajib && !v) throw new Error("Kolom '" + label + "' wajib diisi.");
      data[kunci] = v;
    }
  }
  return data;
}

// Pengenal baris beda bentuk menurut sumbernya: slug (sudah unik)
// untuk tab GITHUB, atau apa pun yang dikembalikan skema.kunci(r)
// untuk tab KHUSUS (id untuk Ulasan, slug untuk Promo/Kode Akses) --
// dipakai apa adanya sebagai kunci "sedang mengedit yang mana" di
// mulaiUbah/simpan/hapus, tidak perlu tahu bentuknya di situ.
function kunciBaris(skema, r) {
  return skema.sumber === GITHUB ? r.slug : skema.kunci(r);
}

async function muatDaftar() {
  const kotak = $("#daftar");
  const skema = SKEMA_TAB[tabAktif];
  kotak.innerHTML = "Memuat...";
  try {
    const baris =
      skema.sumber === GITHUB ? (await githubBacaBerkas(skema.berkas)).data : await skema.baca();
    kotak.innerHTML = "";
    if (!baris.length) {
      kotak.append(elemen("p", { kelas: "kosong-kecil" }, "Belum ada data di tab ini."));
      return;
    }
    baris.forEach((r) => {
      const item = elemen(
        "div",
        { kelas: "daftar__item" },
        elemen("span", {}, skema.ringkas(r)),
        elemen(
          "div",
          { kelas: "daftar__aksi" },
          elemen("button", { type: "button", onclick: () => mulaiUbah(r) }, "Ubah"),
          elemen(
            "button",
            { type: "button", kelas: "tombol-bahaya", onclick: () => hapus(kunciBaris(skema, r), skema.ringkas(r)) },
            "Hapus",
          ),
        ),
      );
      kotak.append(item);
    });
  } catch (err) {
    kotak.innerHTML = "";
    pesanStatus("Gagal memuat daftar: " + err.message, "galat");
  }
}

function mulaiUbah(data) {
  barisDiedit = kunciBaris(SKEMA_TAB[tabAktif], data);
  isiFormDariData(data);
  perbaruiJudulForm();
  pesanStatus("", "");
  $("#form-field").scrollIntoView({ behavior: "smooth", block: "start" });
}

// SENGAJA tidak membersihkan #status di sini -- dipanggil juga dari
// jalur sukses simpan()/hapus() setelah pesan "Data ditambahkan." dsb.
// ditampilkan, dan pesan itu harus tetap terlihat. Pemanggil yang
// benar-benar berpindah (ganti tab, tombol +Tambah Baru, Batal)
// membersihkan status sendiri.
function mulaiTambah() {
  barisDiedit = null;
  isiFormDariData({});
  perbaruiJudulForm();
}

async function simpan(ev) {
  ev.preventDefault();
  const skema = SKEMA_TAB[tabAktif];
  try {
    const data = bacaFormJadiData();
    pesanStatus("Menyimpan...", "");
    if (skema.sumber === GITHUB) {
      if (barisDiedit == null) await githubTambah(skema, data);
      else await githubUbah(skema, barisDiedit, data);
    } else {
      await skema.simpan(data, barisDiedit);
    }
    pesanStatus(barisDiedit == null ? "Data ditambahkan." : "Perubahan disimpan.", "ok");
    mulaiTambah();
    muatDaftar();
  } catch (err) {
    pesanStatus("Gagal menyimpan: " + err.message, "galat");
  }
}

async function hapus(kunci, ringkasan) {
  if (!confirm("Hapus data ini?\n\n" + ringkasan)) return;
  const skema = SKEMA_TAB[tabAktif];
  try {
    pesanStatus("Menghapus...", "");
    if (skema.sumber === GITHUB) await githubHapus(skema, kunci);
    else await skema.hapus(kunci);
    pesanStatus("Data dihapus.", "ok");
    if (barisDiedit === kunci) mulaiTambah();
    muatDaftar();
  } catch (err) {
    pesanStatus("Gagal menghapus: " + err.message, "galat");
  }
}

/* ---------- Pasang semua ---------- */

function pasang() {
  renderPengaturan();
  tutupKunci();
  renderPilihanTab();
  renderForm();

  $("#form-pengaturan").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const url = $("#p-url").value.trim();
    const sandi = $("#p-sandi").value;
    const githubPemilik = $("#g-pemilik").value.trim();
    const githubRepo = $("#g-repo").value.trim();
    const githubToken = $("#g-token").value;
    const isiSheet = Boolean(url || sandi);
    const isiGithub = Boolean(githubPemilik || githubRepo || githubToken);

    if (!isiSheet && !isiGithub) {
      pesanStatus(
        "Isi Alamat Web App + Kata Sandi Admin, dan/atau Pemilik GitHub + Repositori + Token.",
        "galat",
      );
      return;
    }
    pesanStatus("Memeriksa...", "");
    try {
      if (isiSheet) {
        if (!url || !sandi) throw new Error("Alamat Web App dan Kata Sandi Admin harus diisi berdua.");
        await panggilPost({ aksi: "cekSandi" });
      }
      if (isiGithub) {
        if (!githubPemilik || !githubRepo || !githubToken) {
          throw new Error("Pemilik GitHub, Repositori, dan Token harus diisi bertiga.");
        }
        await cekGithub();
      }
      simpanPengaturan({
        url,
        sandi: $("#p-ingat").checked ? sandi : "",
        ingatSandi: $("#p-ingat").checked,
        githubPemilik,
        githubRepo,
        githubToken: $("#g-ingat").checked ? githubToken : "",
        ingatToken: $("#g-ingat").checked,
      });
      bukaKunci();
      muatDaftar();
      muatStatistik();
      pesanStatus("Berhasil masuk.", "ok");
    } catch (err) {
      pesanStatus("Gagal masuk: " + err.message, "galat");
    }
  });

  $("#btn-keluar").addEventListener("click", () => {
    simpanPengaturan({
      url: $("#p-url").value.trim(),
      sandi: "",
      ingatSandi: false,
      githubPemilik: $("#g-pemilik").value.trim(),
      githubRepo: $("#g-repo").value.trim(),
      githubToken: "",
      ingatToken: false,
    });
    $("#p-sandi").value = "";
    $("#p-ingat").checked = false;
    $("#g-token").value = "";
    $("#g-ingat").checked = false;
    $("#daftar").innerHTML = "";
    mulaiTambah();
    tutupKunci();
    pesanStatus("Sudah keluar.", "");
  });

  // Kalau kredensial sebelumnya diminta diingat, coba langsung masuk
  // tanpa perlu klik apa pun -- tetap lewat cekSandi/cekGithub ke
  // server, bukan sekadar percaya begitu saja pada apa yang tersimpan
  // di peramban. Kedua kredensial independen: satu boleh belum pernah
  // diisi sementara yang lain sudah dipakai.
  const tersimpan = ambilPengaturan();
  const cobaSheet = Boolean(tersimpan.url && tersimpan.sandi);
  const cobaGithub = Boolean(tersimpan.githubPemilik && tersimpan.githubRepo && tersimpan.githubToken);
  if (cobaSheet || cobaGithub) {
    pesanStatus("Memeriksa sesi tersimpan...", "");
    Promise.all([
      cobaSheet ? panggilPost({ aksi: "cekSandi" }).then(() => "").catch((e) => "Sheet: " + e.message) : "",
      cobaGithub ? cekGithub().then(() => "").catch((e) => "GitHub: " + e.message) : "",
    ]).then(([galatSheet, galatGithub]) => {
      if ((cobaSheet && !galatSheet) || (cobaGithub && !galatGithub)) {
        bukaKunci();
        muatDaftar();
        muatStatistik();
      }
      const galat = [galatSheet, galatGithub].filter(Boolean);
      pesanStatus(galat.length ? "Sesi tersimpan tidak semuanya berlaku lagi -- " + galat.join("; ") : "", galat.length ? "galat" : "");
    });
  }

  $("#pilih-tab").addEventListener("change", (ev) => {
    tabAktif = ev.target.value;
    mulaiTambah();
    renderForm();
    perbaruiPetunjukSumber();
    $("#daftar").innerHTML = "";
    pesanStatus("", "");
  });

  $("#btn-muat").addEventListener("click", muatDaftar);
  $("#btn-muat-statistik").addEventListener("click", muatStatistik);
  $("#btn-tambah-baru").addEventListener("click", () => {
    mulaiTambah();
    pesanStatus("", "");
  });
  $("#btn-batal").addEventListener("click", () => {
    mulaiTambah();
    pesanStatus("", "");
  });
  $("#form-data").addEventListener("submit", simpan);
  $("#btn-hapus").addEventListener("click", () => {
    if (barisDiedit != null) hapus(barisDiedit, SKEMA_TAB[tabAktif].ringkas(bacaFormJadiDataAman()));
  });
}

function bacaFormJadiDataAman() {
  try {
    return bacaFormJadiData();
  } catch {
    return {};
  }
}

document.addEventListener("DOMContentLoaded", pasang);
