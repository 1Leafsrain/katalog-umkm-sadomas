/* ============================================================
   Backend kecil untuk situs -- dibuat sebagai STANDALONE SCRIPT di
   script.google.com (BUKAN ditempel ke Google Sheet mana pun), lalu
   di-deploy sebagai Web App.

   CUMA menangani 4 hal yang memang wajib lewat kode yang jalan di
   server: Ulasan Pembeli, Promo per-UMKM, Kode Akses Toko, dan
   Statistik kunjungan/klik-WA. UMKM/PRODUK/WISATA (termasuk foto)
   TIDAK lewat sini -- disimpan langsung di GitHub (data/db/*.json +
   assets/img/) lewat token akses PRIBADI ADMIN, dipanggil langsung dari
   assets/admin.js ke api.github.com (lihat PANDUAN-ADMIN.md Bagian A).

   Kenapa 4 hal ini TIDAK BISA ikut pindah ke GitHub begitu saja:
   - Ulasan Pembeli & Statistik ditulis PENGUNJUNG ANONIM. Validasinya
     (rating 1-5, produk/toko harus benar-benar ada) WAJIB dipaksakan
     di server -- kalau lewat token yang tertanam di app.js publik,
     siapa pun bisa mengambil token itu lewat DevTools lalu menulis apa
     saja ke repo, bukan cuma data yang wajar.
   - Kode Akses Toko itu RAHASIA. Repo GitHub ini publik -- berkas apa
     pun di dalamnya (termasuk data/db/*.json) bisa dibaca siapa saja
     lewat raw.githubusercontent.com. Kalau daftar kode disimpan di
     sana, semua kode toko langsung bocor ke siapa pun.
   Karena itu keempatnya tetap lewat server ini -- tapi PENYIMPANANNYA
   sendiri sudah tidak lagi Google Sheet:
   - Ulasan Pembeli & Promo per-UMKM -- disimpan sebagai
     data/db/ulasan.json & data/db/promo.json di GitHub juga (data ini
     memang publik & jarang ditulis, jadi aman), tapi DITULIS OLEH
     SERVER INI memakai token yang tersimpan di Script Properties
     (Project Settings di editor Apps Script) -- token itu TIDAK PERNAH
     terlihat peramban siapa pun, beda dari token pribadi admin di atas.
   - Kode Akses Toko & Statistik -- disimpan di PropertiesService milik
     proyek Apps Script ini sendiri (privat, tidak bisa diakses lewat
     URL apa pun, cuma bisa dibaca kode yang jalan di proyek ini).
     Statistik disimpan sebagai ANGKA BERJALAN (total per toko + rekap
     14 hari terakhir), BUKAN catatan mentah tiap kunjungan -- supaya
     ukurannya tidak pernah membesar tanpa batas seiring waktu.

   INI BUKAN JAVASCRIPT BIASA -- ini Google Apps Script, hanya bisa
   dijalankan di dalam proyek Apps Script, bukan lewat Node.

   Cara memasang & men-deploy: lihat PANDUAN-ADMIN.md Bagian B.

   Model keamanan:
   - Baca ulasan (bacaUlasan) tidak perlu kata sandi -- datanya sama
     dengan yang sudah publik di halaman katalog.
   - Aksi moderasi admin (hapus ulasan, kelola promo lintas toko, kelola
     kode akses, lihat statistik) WAJIB login admin yang sah -- lewat
     Firebase Authentication (lihat ADMIN_EMAILS/FIREBASE_API_KEY di
     bawah), bukan kata sandi tertulis di source code lagi. Login ini
     TERPISAH dari token GitHub yang dipakai admin.js untuk
     UMKM/PRODUK/WISATA.
   - Aksi PUBLIK/ANONIM (catatStatistik, kirimUlasan) tidak perlu sandi
     APA PUN -- sengaja, karena dipanggil situs publik untuk SEMUA
     pengunjung. Validasinya diperketat di sisi server.
   - Aksi PUBLIK tapi KHUSUS PEMILIK TOKO (cekAksesUmkm,
     bacaStatistikUmkm, bacaPromoUmkm, simpanPromoUmkm) tidak pakai
     login admin -- tapi selalu mencocokkan ulang slug+kode ke
     penyimpanan kode akses, tidak pernah percaya begitu saja state di
     peramban pemanggil.
   ============================================================ */

// GANTI ini sebelum men-deploy: daftar email yang boleh masuk sebagai
// admin, dipisah koma (spasi di sekitar koma diabaikan). Akun-akun ini
// dibuat lewat Firebase Console (Authentication > Users) -- pendaftaran
// sendiri (self sign-up) HARUS dimatikan di sana, supaya cuma email di
// daftar ini yang bisa jadi admin walau seseorang berhasil bikin akun
// Firebase lain.
var ADMIN_EMAILS = "GANTI_EMAIL_ADMIN@contoh.com";

// Firebase Web API key -- BUKAN rahasia (didesain publik oleh Firebase
// sendiri, sama seperti terlihat di source kode web mana pun yang
// pakai Firebase). Keamanan sesungguhnya ada di Firebase Authentication
// + ADMIN_EMAILS di atas, bukan di key ini. Diambil dari Firebase
// Console > Project settings > General > Web API Key.
var FIREBASE_API_KEY = "GANTI_FIREBASE_API_KEY";

// Zona waktu dipakai untuk mengelompokkan statistik per hari dan untuk
// tanggal otomatis di ulasan pembeli.
var ZONA_WAKTU = "Asia/Jakarta";

// Dipakai untuk memvalidasi slug UMKM/PRODUK (baca publik, TANPA
// token) dan sebagai alamat data/db/ulasan.json & promo.json (ditulis
// server ini, PAKAI token -- lihat githubTokenServer()). GANTI dua
// nilai ini sesuai repo yang sebenarnya (sama dengan yang dipakai di
// alamat GitHub Pages situs ini dan di admin.html).
var GITHUB_PEMILIK = "GANTI_PEMILIK_GITHUB";
var GITHUB_REPO = "GANTI_NAMA_REPO";

// Statistik disimpan sebagai rekap harian selama sekian hari terakhir
// -- lihat catatan di bersihkanStatLama().
var HARI_STATISTIK = 14;

// Dites manual dengan membuka Web App URL langsung di peramban --
// kalau muncul {"ok":true,...} berarti deployment-nya benar. Bukan
// dipakai oleh admin.js/app.js sama sekali (semuanya lewat doPost).
function doGet(e) {
  return keluaran({ ok: true, pesan: "Web App aktif dan bisa diakses." });
}

// Semua operasi -- termasuk BACA -- lewat doPost, bukan cuma tulis. Ini
// sengaja: keterbacaan lintas-asal (CORS) untuk respons doGet dari Apps
// Script tidak selalu konsisten di semua kondisi, sedangkan trik
// "text/plain supaya tidak ada preflight" pada doPost sudah terbukti
// jalan.
function doPost(e) {
  try {
    var isi = JSON.parse(e.postData.contents);

    // ---- Aksi publik/anonim: dipanggil situs katalog untuk SEMUA
    // pengunjung, tidak pakai kata sandi apa pun. ----
    if (isi.aksi === "catatStatistik") {
      return keluaran(catatStatistik(isi.slug, isi.jenis));
    }
    if (isi.aksi === "kirimUlasan") {
      return keluaran(kirimUlasan(isi.data || {}));
    }
    if (isi.aksi === "bacaUlasan") {
      return keluaran({ data: bacaUlasanSemua() });
    }

    // ---- Aksi publik tapi khusus pemilik toko: butuh slug+kode yang
    // cocok, BUKAN kata sandi admin. Selalu dicocokkan ulang ke
    // penyimpanan kode akses, tidak pernah percaya ke state peramban.
    // ----
    if (isi.aksi === "cekAksesUmkm") {
      return keluaran(cekKodeUmkm(isi.slug, isi.kode));
    }
    if (isi.aksi === "bacaStatistikUmkm") {
      var cekA = cekKodeUmkm(isi.slug, isi.kode);
      if (cekA.galat) return keluaran(cekA);
      return keluaran({ ok: true, data: agregasiStatistik(isi.slug) });
    }
    if (isi.aksi === "bacaPromoUmkm") {
      var cekB = cekKodeUmkm(isi.slug, isi.kode);
      if (cekB.galat) return keluaran(cekB);
      return keluaran({ ok: true, data: bacaPromoSlug(isi.slug) });
    }
    if (isi.aksi === "simpanPromoUmkm") {
      var cekC = cekKodeUmkm(isi.slug, isi.kode);
      if (cekC.galat) return keluaran(cekC);
      return keluaran(simpanPromoUntukSlug(isi.slug, isi.teks, isi.aktif));
    }
    if (isi.aksi === "bacaUmkmSaya") {
      var cekD = cekKodeUmkm(isi.slug, isi.kode);
      if (cekD.galat) return keluaran(cekD);
      return keluaran({ ok: true, data: bacaUmkmSaya(isi.slug) });
    }
    if (isi.aksi === "simpanUmkmSaya") {
      var cekE = cekKodeUmkm(isi.slug, isi.kode);
      if (cekE.galat) return keluaran(cekE);
      return keluaran(simpanUmkmSaya(isi.slug, isi.data || {}));
    }
    if (isi.aksi === "bacaProdukSaya") {
      var cekF = cekKodeUmkm(isi.slug, isi.kode);
      if (cekF.galat) return keluaran(cekF);
      return keluaran({ ok: true, data: bacaProdukSaya(isi.slug) });
    }
    if (isi.aksi === "simpanProdukSaya") {
      var cekG = cekKodeUmkm(isi.slug, isi.kode);
      if (cekG.galat) return keluaran(cekG);
      return keluaran(simpanProdukSaya(isi.slug, isi.data || {}));
    }
    if (isi.aksi === "hapusProdukSaya") {
      var cekH = cekKodeUmkm(isi.slug, isi.kode);
      if (cekH.galat) return keluaran(cekH);
      return keluaran(hapusProdukSaya(isi.slug, isi.produkSlug));
    }
    if (isi.aksi === "unggahFotoSaya") {
      var cekI = cekKodeUmkm(isi.slug, isi.kode);
      if (cekI.galat) return keluaran(cekI);
      return keluaran(unggahFotoSaya(isi.namaAsli, isi.tipeMime, isi.dataBase64));
    }

    // ---- Mulai sini WAJIB login admin (Firebase Authentication). ----
    var batasAdmin = cekBatasPercobaan("admin");
    if (batasAdmin.terkunci) return keluaran({ galat: batasAdmin.pesan });
    var cekAdmin = verifikasiTokenAdmin(isi.tokenAdmin);
    if (cekAdmin.galat) {
      catatPercobaanGagal("admin");
      return keluaran(cekAdmin);
    }
    resetPercobaan("admin");
    // Dipakai admin.js sebagai "login".
    if (isi.aksi === "cekSandi") return keluaran({ ok: true });
    if (isi.aksi === "bacaStatistik") {
      return keluaran({ ok: true, data: agregasiStatistik() });
    }

    // Moderasi ulasan
    if (isi.aksi === "tambahUlasanAdmin") return keluaran(tambahUlasanAdmin(isi.data || {}));
    if (isi.aksi === "ubahUlasanAdmin") return keluaran(ubahUlasanAdmin(isi.id, isi.data || {}));
    if (isi.aksi === "hapusUlasan") return keluaran(hapusUlasan(isi.id));

    // Moderasi promo (lintas toko, di luar yang dikelola pemilik toko sendiri)
    if (isi.aksi === "bacaPromoAdmin") return keluaran({ ok: true, data: bacaPromoSemua() });
    if (isi.aksi === "simpanPromoAdmin") {
      return keluaran(simpanPromoUntukSlug(isi.slug, isi.teks, isi.aktif));
    }
    if (isi.aksi === "hapusPromo") return keluaran(hapusPromo(isi.slug));

    // Kelola kode akses toko
    if (isi.aksi === "daftarKodeAkses") return keluaran({ ok: true, data: daftarKodeAksesAdmin() });
    if (isi.aksi === "simpanKodeAkses") return keluaran(simpanKodeAkses(isi.slug, isi.kode));
    if (isi.aksi === "hapusKodeAkses") return keluaran(hapusKodeAkses(isi.slug));

    return keluaran({ galat: "Aksi '" + isi.aksi + "' tidak dikenal." });
  } catch (err) {
    return keluaran({ galat: String(err) });
  }
}

/* ---------- Alat bantu umum ---------- */

// Dikirim sebagai text/plain (bukan application/json) supaya peramban
// tidak mengirim permintaan "preflight" OPTIONS -- Apps Script Web App
// tidak bisa menjawab preflight itu, jadi kalau dipaksa application/json
// permintaannya akan gagal karena CORS. Isinya tetap teks JSON biasa.
function keluaran(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function propScript() {
  return PropertiesService.getScriptProperties();
}

// Membungkus baca-ubah-tulis PropertiesService/GitHub supaya dua
// permintaan yang datang nyaris bersamaan (dua pengunjung sekaligus)
// tidak saling menimpa pembaruan satu sama lain -- beda dari
// Sheet.appendRow() (dulu) yang aman dipanggil bersamaan tanpa ini.
function denganKunci(fungsi) {
  var kunci = LockService.getScriptLock();
  kunci.waitLock(10000);
  try {
    return fungsi();
  } finally {
    kunci.releaseLock();
  }
}

function bacaPeta(kunciProperti) {
  var teks = propScript().getProperty(kunciProperti);
  return teks ? JSON.parse(teks) : {};
}

function tulisPeta(kunciProperti, peta) {
  propScript().setProperty(kunciProperti, JSON.stringify(peta));
}

/* ---------- Pembatas percobaan gagal (anti tebak-tebakan) ----------
   Dipakai utk kode akses toko (pengenal "toko:<slug>") dan kata sandi
   admin (pengenal "admin") -- keduanya cuma dicocokkan langsung tanpa
   batas percobaan, jadi siapa pun bisa menebak berkali-kali lewat
   doPost. Cuma percobaan GAGAL yang dihitung, jadi pemilik toko/admin
   yang sah tidak pernah kena batas walau mengirim banyak aksi
   beruntun dengan kode/sandi yang BENAR (hitungan direset tiap
   berhasil). */
var KUNCI_BATAS_GAGAL = "BATAS_GAGAL";
var BATAS_PERCOBAAN = 8; // percobaan gagal maksimal sebelum terkunci
var JENDELA_KUNCI_MENIT = 15; // lama terkunci setelah lewat batas

function cekBatasPercobaan(pengenal) {
  var peta = bacaPeta(KUNCI_BATAS_GAGAL);
  var catatan = peta[pengenal];
  if (!catatan) return { terkunci: false };
  var kedaluwarsa = new Date(catatan.waktu).getTime() + JENDELA_KUNCI_MENIT * 60000;
  if (catatan.jumlah >= BATAS_PERCOBAAN && Date.now() < kedaluwarsa) {
    var sisaMenit = Math.ceil((kedaluwarsa - Date.now()) / 60000);
    return { terkunci: true, pesan: "Terlalu banyak percobaan gagal. Coba lagi dalam " + sisaMenit + " menit." };
  }
  return { terkunci: false };
}

function catatPercobaanGagal(pengenal) {
  denganKunci(function () {
    var peta = bacaPeta(KUNCI_BATAS_GAGAL);
    var catatan = peta[pengenal];
    var kedaluwarsa = catatan ? new Date(catatan.waktu).getTime() + JENDELA_KUNCI_MENIT * 60000 : 0;
    catatan =
      catatan && Date.now() < kedaluwarsa
        ? { jumlah: catatan.jumlah + 1, waktu: catatan.waktu }
        : { jumlah: 1, waktu: new Date().toISOString() };
    peta[pengenal] = catatan;
    tulisPeta(KUNCI_BATAS_GAGAL, peta);
  });
}

function resetPercobaan(pengenal) {
  denganKunci(function () {
    var peta = bacaPeta(KUNCI_BATAS_GAGAL);
    if (peta[pengenal] != null) {
      delete peta[pengenal];
      tulisPeta(KUNCI_BATAS_GAGAL, peta);
    }
  });
}

/* ---------- Login admin lewat Firebase Authentication ----------
   Code.gs TIDAK memverifikasi tanda tangan JWT sendiri (Apps Script
   tidak punya pustaka RSA/JWT bawaan) -- sebagai gantinya minta Google
   sendiri yang memvalidasi lewat endpoint Identity Toolkit publik.
   Ini panggilan UrlFetchApp biasa (sama seperti slugGithubAda ke
   GitHub), TIDAK ada hubungannya dengan batasan Cloud Functions/Blaze
   milik Firebase -- Apps Script memang selalu bisa memanggil URL apa
   pun secara gratis. */
function verifikasiTokenAdmin(idToken) {
  if (!idToken) return { galat: "Belum login." };
  var res = UrlFetchApp.fetch(
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=" + FIREBASE_API_KEY,
    {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify({ idToken: idToken }),
      muteHttpExceptions: true,
    },
  );
  if (res.getResponseCode() !== 200) {
    return { galat: "Sesi login tidak valid atau sudah kedaluwarsa, silakan masuk ulang." };
  }
  var data = JSON.parse(res.getContentText());
  var pengguna = data.users && data.users[0];
  var email = pengguna && pengguna.email;
  if (!email) {
    return { galat: "Sesi login tidak valid atau sudah kedaluwarsa, silakan masuk ulang." };
  }
  var daftarEmail = String(ADMIN_EMAILS)
    .split(",")
    .map(function (s) {
      return s.trim().toLowerCase();
    });
  if (daftarEmail.indexOf(String(email).toLowerCase()) === -1) {
    return { galat: "Akun ini bukan admin yang terdaftar." };
  }
  return { ok: true, email: email };
}

/* ---------- Validasi slug UMKM/PRODUK lewat GitHub ---------- */

// UMKM/PRODUK/WISATA disimpan sebagai data/db/*.json di GitHub. Repo
// publik ini dibaca lewat raw.githubusercontent.com TANPA token/
// autentikasi (sama seperti siapa pun membuka berkasnya di GitHub),
// cukup untuk sekadar mengecek "apakah slug ini benar-benar ada"
// sebelum mencatat statistik atau menerima ulasan.
function slugGithubAda(namaBerkas, slug) {
  if (!slug) return false;
  var url =
    "https://raw.githubusercontent.com/" +
    GITHUB_PEMILIK +
    "/" +
    GITHUB_REPO +
    "/main/data/db/" +
    namaBerkas +
    ".json";
  try {
    var res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (res.getResponseCode() !== 200) return false;
    var daftar = JSON.parse(res.getContentText());
    return daftar.some(function (r) {
      return String(r.slug) === String(slug);
    });
  } catch (err) {
    // GitHub sedang tidak terjangkau/berkas berubah bentuk -- anggap
    // tidak ada daripada melempar error ke pengunjung situs publik.
    return false;
  }
}

/* ---------- Relay tulis ke GitHub (Ulasan/Promo), token di server ---------- */

function githubTokenServer() {
  var token = propScript().getProperty("GITHUB_TOKEN");
  if (!token) {
    throw new Error(
      "GITHUB_TOKEN belum diisi -- buka Project Settings > Script Properties di editor Apps Script.",
    );
  }
  return token;
}

function urlGithubIsiServer(path) {
  return "https://api.github.com/repos/" + GITHUB_PEMILIK + "/" + GITHUB_REPO + "/contents/" + path;
}

function githubBacaServer(path) {
  var res = UrlFetchApp.fetch(urlGithubIsiServer(path), {
    headers: { Authorization: "Bearer " + githubTokenServer(), Accept: "application/vnd.github+json" },
    muteHttpExceptions: true,
  });
  if (res.getResponseCode() === 404) return { data: [], sha: null };
  if (res.getResponseCode() !== 200) {
    throw new Error("Gagal membaca dari GitHub (status " + res.getResponseCode() + ").");
  }
  var j = JSON.parse(res.getContentText());
  var teks = Utilities.newBlob(Utilities.base64Decode(j.content)).getDataAsString("UTF-8");
  return { data: JSON.parse(teks), sha: j.sha };
}

// contentBase64 harus SUDAH dalam bentuk base64 (dipakai untuk JSON
// (lewat githubTulisServer di bawah) MAUPUN foto mentah langsung dari
// unggahFotoSaya -- jangan pernah JSON.stringify isi yang sudah base64
// lagi, itu akan merusak berkas binernya).
function githubTulisMentahServer(path, contentBase64, shaLama, pesanCommit) {
  var res = UrlFetchApp.fetch(urlGithubIsiServer(path), {
    method: "put",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + githubTokenServer(), Accept: "application/vnd.github+json" },
    payload: JSON.stringify({ message: pesanCommit, content: contentBase64, sha: shaLama || undefined }),
    muteHttpExceptions: true,
  });
  var kode = res.getResponseCode();
  if (kode !== 200 && kode !== 201) {
    throw new Error("Gagal menulis ke GitHub (status " + kode + "): " + res.getContentText());
  }
  return JSON.parse(res.getContentText());
}

function githubTulisServer(path, dataBaru, shaLama, pesanCommit) {
  var isiBase64 = Utilities.base64Encode(JSON.stringify(dataBaru, null, 2) + "\n", Utilities.Charset.UTF_8);
  return githubTulisMentahServer(path, isiBase64, shaLama, pesanCommit);
}

// Baca-ubah-tulis dengan retry singkat kalau kena konflik (sha sudah
// berubah, atau gangguan sesaat) -- beda dari admin.js (yang dipakai
// admin sendiri, cukup disuruh klik ulang), di sini pengunjungnya
// anonim jadi dicoba ulang otomatis sebelum menyerah.
function githubUbahDenganRetry(path, pesanCommit, ubahFungsi) {
  var percobaan = 0;
  for (;;) {
    percobaan++;
    var sekarang = githubBacaServer(path);
    var dataBaru = ubahFungsi(sekarang.data);
    try {
      return githubTulisServer(path, dataBaru, sekarang.sha, pesanCommit);
    } catch (err) {
      if (percobaan >= 3) throw err;
      Utilities.sleep(300 * percobaan);
    }
  }
}

/* ---------- Statistik kunjungan & klik-WA (angka berjalan, bukan log) ---------- */

// Satu properti untuk total sepanjang masa per toko, TIDAK PERNAH
// membesar seiring waktu (cuma seiring jumlah toko).
var KUNCI_STAT_TOTAL = "STAT_TOTAL";

function kunciStatHari(tanggal) {
  return "STAT_" + Utilities.formatDate(tanggal, ZONA_WAKTU, "yyyy-MM-dd");
}

function tambahKeStat(peta, slug, jenis) {
  if (!peta[slug]) peta[slug] = { kunjungan: 0, klikWa: 0 };
  if (jenis === "kunjungan") peta[slug].kunjungan++;
  else peta[slug].klikWa++;
}

// Dipanggil app.js untuk SETIAP pengunjung situs -- sengaja tidak
// melempar error ke pemanggil kalau datanya tidak masuk akal (slug
// asing, jenis di luar dua pilihan). Cukup diam saja, supaya tidak ada
// celah bikin situs publik menampilkan pesan galat gara-gara ini.
function catatStatistik(slug, jenis) {
  if (jenis !== "kunjungan" && jenis !== "klik_wa") return { ok: true };
  if (!slugGithubAda("umkm", slug)) return { ok: true };
  denganKunci(function () {
    var total = bacaPeta(KUNCI_STAT_TOTAL);
    tambahKeStat(total, slug, jenis);
    tulisPeta(KUNCI_STAT_TOTAL, total);

    var kunciHariIni = kunciStatHari(new Date());
    var hari = bacaPeta(kunciHariIni);
    tambahKeStat(hari, slug, jenis);
    tulisPeta(kunciHariIni, hari);

    bersihkanStatLama();
  });
  return { ok: true };
}

// Properti STAT_<tanggal> yang lebih tua dari HARI_STATISTIK dihapus
// setiap kali ada kunjungan baru -- ini yang membuat ukuran total
// PropertiesService tidak pernah membesar tanpa batas walau situs
// sudah bertahun-tahun jalan.
function bersihkanStatLama() {
  var props = propScript();
  var polaTanggal = /^STAT_(\d{4}-\d{2}-\d{2})$/;
  var batas = new Date();
  batas.setDate(batas.getDate() - (HARI_STATISTIK - 1));
  batas.setHours(0, 0, 0, 0);
  props.getKeys().forEach(function (k) {
    var cocok = k.match(polaTanggal);
    if (!cocok) return;
    var tanggal = new Date(cocok[1] + "T00:00:00");
    if (tanggal < batas) props.deleteProperty(k);
  });
}

function jumlahkanSemuaToko(peta) {
  var hasil = { kunjungan: 0, klikWa: 0 };
  Object.keys(peta).forEach(function (slug) {
    hasil.kunjungan += peta[slug].kunjungan || 0;
    hasil.klikWa += peta[slug].klikWa || 0;
  });
  return hasil;
}

// Dipakai bacaStatistik (admin, semua toko) & bacaStatistikUmkm
// (pemilik, satu toko). filterSlug kosong/undefined -> rekap semua.
// Bentuk hasil ({perToko, harian}) SAMA seperti sebelumnya -- yang
// beda cuma cara mendapatkannya (langsung baca angka berjalan, tidak
// perlu lagi menghitung ulang dari ribuan baris mentah tiap dipanggil).
function agregasiStatistik(filterSlug) {
  var total = bacaPeta(KUNCI_STAT_TOTAL);
  var perToko;
  if (filterSlug) {
    perToko = {};
    perToko[filterSlug] = total[filterSlug] || { kunjungan: 0, klikWa: 0 };
  } else {
    perToko = total;
  }

  var harian = [];
  for (var i = HARI_STATISTIK - 1; i >= 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    var tgl = Utilities.formatDate(d, ZONA_WAKTU, "yyyy-MM-dd");
    var peta = bacaPeta("STAT_" + tgl);
    var nilai = filterSlug ? peta[filterSlug] : jumlahkanSemuaToko(peta);
    harian.push({
      tanggal: tgl,
      kunjungan: (nilai && nilai.kunjungan) || 0,
      klikWa: (nilai && nilai.klikWa) || 0,
    });
  }
  return { perToko: perToko, harian: harian };
}

/* ---------- Ulasan pembeli (publik, tayang langsung; disimpan di GitHub) ---------- */

function tanggalIndo() {
  return Utilities.formatDate(new Date(), ZONA_WAKTU, "d MMMM yyyy");
}

function kirimUlasan(data) {
  var produk = String(data.produk || "").trim();
  var nama = String(data.nama || "").trim();
  var teks = String(data.teks || "").trim();
  var asalDiketik = String(data.asal || "").trim();
  var penilaian = Number(data.penilaian);

  if (!produk || !nama || !teks) {
    throw new Error("Nama, ulasan, dan produk wajib diisi.");
  }
  if (!penilaian || penilaian < 1 || penilaian > 5 || Math.round(penilaian) !== penilaian) {
    throw new Error("Rating harus bilangan 1-5.");
  }
  if (!slugGithubAda("produk", produk)) {
    throw new Error("Produk '" + produk + "' tidak ditemukan.");
  }

  var asal = asalDiketik ? asalDiketik + ", " + tanggalIndo() : tanggalIndo();
  var entriBaru = {
    id: Utilities.getUuid(),
    produk: produk,
    nama: nama,
    asal: asal,
    penilaian: penilaian,
    teks: teks,
  };
  denganKunci(function () {
    githubUbahDenganRetry("data/db/ulasan.json", "ulasan baru: " + produk, function (daftar) {
      daftar.push(entriBaru);
      return daftar;
    });
  });
  return { ok: true, pesan: "Terima kasih atas ulasannya." };
}

function bacaUlasanSemua() {
  return githubBacaServer("data/db/ulasan.json").data;
}

function tambahUlasanAdmin(data) {
  var produk = String(data.produk || "").trim();
  var nama = String(data.nama || "").trim();
  var teks = String(data.teks || "").trim();
  var asal = String(data.asal || "").trim();
  var penilaian = Number(data.penilaian) || 0;
  if (!produk || !nama || !teks) throw new Error("Produk, nama, dan ulasan wajib diisi.");

  var entriBaru = {
    id: Utilities.getUuid(),
    produk: produk,
    nama: nama,
    asal: asal,
    penilaian: penilaian,
    teks: teks,
  };
  denganKunci(function () {
    githubUbahDenganRetry("data/db/ulasan.json", "tambah ulasan manual: " + produk, function (daftar) {
      daftar.push(entriBaru);
      return daftar;
    });
  });
  return { ok: true, pesan: "Ulasan ditambahkan." };
}

function ubahUlasanAdmin(id, data) {
  if (!id) throw new Error("id ulasan wajib diisi.");
  var produk = String(data.produk || "").trim();
  var nama = String(data.nama || "").trim();
  var teks = String(data.teks || "").trim();
  var asal = String(data.asal || "").trim();
  var penilaian = Number(data.penilaian) || 0;
  if (!produk || !nama || !teks) throw new Error("Produk, nama, dan ulasan wajib diisi.");

  var ditemukan = false;
  denganKunci(function () {
    githubUbahDenganRetry("data/db/ulasan.json", "ubah ulasan: " + id, function (daftar) {
      return daftar.map(function (r) {
        if (r.id !== id) return r;
        ditemukan = true;
        return { id: id, produk: produk, nama: nama, asal: asal, penilaian: penilaian, teks: teks };
      });
    });
  });
  if (!ditemukan) throw new Error("Ulasan tidak ditemukan -- mungkin sudah diubah/dihapus orang lain.");
  return { ok: true, pesan: "Ulasan diubah." };
}

function hapusUlasan(id) {
  if (!id) throw new Error("id ulasan wajib diisi.");
  var ditemukan = false;
  denganKunci(function () {
    githubUbahDenganRetry("data/db/ulasan.json", "hapus ulasan: " + id, function (daftar) {
      return daftar.filter(function (r) {
        if (r.id !== id) return true;
        ditemukan = true;
        return false;
      });
    });
  });
  if (!ditemukan) throw new Error("Ulasan tidak ditemukan -- mungkin sudah dihapus.");
  return { ok: true, pesan: "Ulasan dihapus." };
}

/* ---------- Promo per-UMKM (publik, disimpan di GitHub) ---------- */

function bacaPromoSlug(slug) {
  var daftar = githubBacaServer("data/db/promo.json").data;
  var baris = daftar.filter(function (r) {
    return String(r.slug) === String(slug);
  });
  if (!baris.length) return { teks: "", aktif: false };
  return { teks: String(baris[0].teks || ""), aktif: Boolean(baris[0].aktif) };
}

function bacaPromoSemua() {
  return githubBacaServer("data/db/promo.json").data;
}

// toko-saya.js mengirim boolean asli, tapi form admin (kotak centang)
// mengirim teks "TRUE"/"FALSE" (kebiasaan lama dari zaman Sheet) --
// diterima dua-duanya supaya tidak salah baca "FALSE" (string, truthy
// di JS) sebagai aktif.
function keBoolean(nilai) {
  if (typeof nilai === "boolean") return nilai;
  return String(nilai || "").toUpperCase() === "TRUE";
}

// Upsert by slug -- dipakai simpanPromoUmkm (kode akses toko) MAUPUN
// simpanPromoAdmin (kata sandi admin), logikanya sama persis.
function simpanPromoUntukSlug(slug, teks, aktif) {
  denganKunci(function () {
    githubUbahDenganRetry("data/db/promo.json", "promo: " + slug, function (daftar) {
      var idx = daftar.findIndex(function (r) {
        return String(r.slug) === String(slug);
      });
      var baris = { slug: slug, teks: String(teks || ""), aktif: keBoolean(aktif) };
      if (idx === -1) daftar.push(baris);
      else daftar[idx] = baris;
      return daftar;
    });
  });
  return { ok: true, pesan: "Promo disimpan." };
}

function hapusPromo(slug) {
  var ditemukan = false;
  denganKunci(function () {
    githubUbahDenganRetry("data/db/promo.json", "hapus promo: " + slug, function (daftar) {
      return daftar.filter(function (r) {
        if (String(r.slug) !== String(slug)) return true;
        ditemukan = true;
        return false;
      });
    });
  });
  if (!ditemukan) throw new Error("Promo tidak ditemukan -- mungkin sudah dihapus.");
  return { ok: true, pesan: "Promo dihapus." };
}

/* ---------- Profil toko & produk milik sendiri (toko-saya.html) ----------
   Dipanggil setelah cekKodeUmkm(slug, kode) lolos (lihat doPost) --
   slug di sini SELALU slug pemilik toko yang sedang login, tidak
   pernah dipercaya dari field lain manapun di payload. */

// slug TIDAK PERNAH diganti (identitas toko), penilaian TIDAK PERNAH
// diganti lewat sini (tetap admin-only) -- keduanya dipertahankan dari
// baris lama walau field itu ada di payload data.
function bacaUmkmSaya(slug) {
  var daftar = githubBacaServer("data/db/umkm.json").data;
  var baris = daftar.find(function (r) {
    return String(r.slug) === String(slug);
  });
  if (!baris) throw new Error("Data toko tidak ditemukan.");
  return baris;
}

function simpanUmkmSaya(slug, data) {
  denganKunci(function () {
    githubUbahDenganRetry("data/db/umkm.json", "profil toko: " + slug, function (daftar) {
      var idx = daftar.findIndex(function (r) {
        return String(r.slug) === String(slug);
      });
      if (idx === -1) throw new Error("Data toko tidak ditemukan.");
      var lama = daftar[idx];
      daftar[idx] = Object.assign({}, lama, data, { slug: lama.slug, penilaian: lama.penilaian });
      return daftar;
    });
  });
  return { ok: true, pesan: "Profil toko disimpan." };
}

function bacaProdukSaya(slug) {
  var daftar = githubBacaServer("data/db/produk.json").data;
  return daftar.filter(function (r) {
    return String(r.umkm) === String(slug);
  });
}

// Otorisasi kepemilikan produk: kalau slug produk itu SUDAH ADA, wajib
// baris lamanya memang milik toko yang sedang login (umkm === slug) --
// TIDAK CUKUP cuma percaya field umkm yang dikirim dari form, itu bisa
// dipalsukan siapa pun yang sedang login sebagai toko lain. Untuk
// produk baru, umkm DIPAKSA jadi slug yang sedang login apa pun yang
// dikirim klien.
function simpanProdukSaya(slug, data) {
  var produkSlug = String(data.slug || "").trim();
  if (!produkSlug) throw new Error("Slug produk wajib diisi.");
  denganKunci(function () {
    githubUbahDenganRetry("data/db/produk.json", "produk toko " + slug + ": " + produkSlug, function (daftar) {
      var idx = daftar.findIndex(function (r) {
        return String(r.slug) === produkSlug;
      });
      var penilaianLama = 0;
      if (idx !== -1) {
        if (String(daftar[idx].umkm) !== String(slug)) {
          throw new Error("Produk ini bukan milik toko Anda.");
        }
        penilaianLama = daftar[idx].penilaian;
      }
      var baris = Object.assign({}, data, { slug: produkSlug, umkm: slug, penilaian: penilaianLama });
      if (idx === -1) daftar.push(baris);
      else daftar[idx] = baris;
      return daftar;
    });
  });
  return { ok: true, pesan: "Produk disimpan." };
}

function hapusProdukSaya(slug, produkSlug) {
  var ditolakBukanMilik = false;
  var ditemukan = false;
  denganKunci(function () {
    githubUbahDenganRetry("data/db/produk.json", "hapus produk toko " + slug + ": " + produkSlug, function (daftar) {
      var idx = daftar.findIndex(function (r) {
        return String(r.slug) === String(produkSlug);
      });
      if (idx === -1) return daftar;
      if (String(daftar[idx].umkm) !== String(slug)) {
        ditolakBukanMilik = true;
        return daftar;
      }
      ditemukan = true;
      return daftar.filter(function (_, i) {
        return i !== idx;
      });
    });
  });
  if (ditolakBukanMilik) throw new Error("Produk ini bukan milik toko Anda.");
  if (!ditemukan) throw new Error("Produk tidak ditemukan -- mungkin sudah dihapus.");
  return { ok: true, pesan: "Produk dihapus." };
}

var UKURAN_FOTO_MAKS = 6 * 1024 * 1024; // 6 MB, diukur SETELAH didekode dari base64
var TIPE_FOTO_DIIZINKAN = ["image/jpeg", "image/png", "image/webp"];

// Sama seperti unggahan foto admin (assets/admin.js), tapi ditulis
// lewat token SERVER (githubTulisServer) -- pemilik toko tidak pernah
// pegang token GitHub pribadi apa pun.
function unggahFotoSaya(namaAsli, tipeMime, dataBase64) {
  if (TIPE_FOTO_DIIZINKAN.indexOf(tipeMime) === -1) {
    throw new Error("Jenis berkas '" + tipeMime + "' tidak didukung -- pakai JPG, PNG, atau WEBP.");
  }
  if (!dataBase64) throw new Error("Tidak ada data foto yang dikirim.");
  var bytes = Utilities.base64Decode(dataBase64);
  if (bytes.length > UKURAN_FOTO_MAKS) {
    throw new Error("Ukuran foto terlalu besar (maksimum 6 MB setelah dikecilkan).");
  }
  var namaBersih = String(namaAsli || "foto")
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-");
  var namaBerkas = Date.now() + "-" + namaBersih;
  githubTulisMentahServer("assets/img/" + namaBerkas, dataBase64, null, "unggah foto (toko-saya): " + namaBerkas);
  return { ok: true, namaBerkas: namaBerkas };
}

/* ---------- Kode Akses Toko (privat, disimpan di PropertiesService) ---------- */

var KUNCI_AKSES_UMKM = "AKSES_UMKM";

// Dipakai cekAksesUmkm DAN sebagai pengecekan ulang di setiap aksi
// mandiri pemilik toko lainnya -- tidak pernah percaya ke state
// peramban pemanggil, selalu dicocokkan lagi ke PropertiesService.
function cekKodeUmkm(slug, kode) {
  if (!slug || !kode) return { galat: "Slug dan kode wajib diisi." };
  var pengenal = "toko:" + slug;
  var batas = cekBatasPercobaan(pengenal);
  if (batas.terkunci) return { galat: batas.pesan };
  var peta = bacaPeta(KUNCI_AKSES_UMKM);
  if (String(peta[slug] || "") !== String(kode)) {
    catatPercobaanGagal(pengenal);
    return { galat: "Slug atau kode akses salah." };
  }
  resetPercobaan(pengenal);
  return { ok: true };
}

function daftarKodeAksesAdmin() {
  var peta = bacaPeta(KUNCI_AKSES_UMKM);
  return Object.keys(peta).map(function (slug) {
    return { slug: slug, kode: peta[slug] };
  });
}

// Upsert by slug.
function simpanKodeAkses(slug, kode) {
  if (!slug || !kode) throw new Error("Slug dan kode wajib diisi.");
  denganKunci(function () {
    var peta = bacaPeta(KUNCI_AKSES_UMKM);
    peta[slug] = String(kode);
    tulisPeta(KUNCI_AKSES_UMKM, peta);
  });
  return { ok: true, pesan: "Kode akses disimpan." };
}

function hapusKodeAkses(slug) {
  var ditemukan = false;
  denganKunci(function () {
    var peta = bacaPeta(KUNCI_AKSES_UMKM);
    if (peta[slug] != null) {
      ditemukan = true;
      delete peta[slug];
    }
    tulisPeta(KUNCI_AKSES_UMKM, peta);
  });
  if (!ditemukan) throw new Error("Kode akses tidak ditemukan -- mungkin sudah dihapus.");
  return { ok: true, pesan: "Kode akses dihapus." };
}
