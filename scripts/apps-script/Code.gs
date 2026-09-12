/* ============================================================
   Backend form admin -- ditempel ke Google Sheet lewat Extensions >
   Apps Script, lalu di-deploy sebagai Web App. Dipanggil oleh
   admin.html (lewat assets/admin.js) untuk tambah/ubah/hapus baris
   di tab UMKM, PRODUK, WISATA, ULASAN, PROMO, AKSES_UMKM -- dan
   dipanggil LANGSUNG oleh situs publik (assets/app.js) untuk mencatat
   statistik kunjungan/klik-WA, menerima ulasan pembeli, dan melayani
   halaman "Toko Saya" (statistik & promo per-UMKM lewat kode akses).

   INI BUKAN JAVASCRIPT BIASA -- ini Google Apps Script, hanya bisa
   ditempel & dijalankan di dalam Google Sheet, bukan lewat Node.

   Cara memasang & men-deploy: lihat PANDUAN-ADMIN.md.

   Model keamanan:
   - Baca (doGet, atau doPost aksi "baca") tab KATALOG (UMKM, PRODUK,
     WISATA, ULASAN, PROMO) tidak perlu kata sandi -- datanya sama
     dengan yang sudah publik di halaman katalog.
   - Baca tab di TAB_RAHASIA (AKSES_UMKM -- kode akses tiap toko) WAJIB
     kata sandi admin juga, meski masih lewat aksi "baca" yang sama.
   - Tulis lewat CRUD admin (tambah/ubah/hapus, dan cekSandi) WAJIB
     kata sandi yang cocok dengan KATA_SANDI di bawah.
   - Aksi PUBLIK/ANONIM baru (catatStatistik, kirimUlasan) tidak perlu
     sandi APA PUN -- sengaja, karena dipanggil situs publik untuk
     SEMUA pengunjung, bukan cuma admin. Validasinya diperketat di sisi
     server supaya tidak jadi jalan belakang menulis data bebas.
   - Aksi PUBLIK tapi KHUSUS PEMILIK TOKO (cekAksesUmkm,
     bacaStatistikUmkm, bacaPromoUmkm, simpanPromoUmkm) tidak pakai
     KATA_SANDI admin -- tapi selalu mencocokkan ulang slug+kode ke tab
     AKSES_UMKM di server, tidak pernah percaya begitu saja state di
     peramban pemanggil.
   ============================================================ */

var TAB_DIIZINKAN = ["UMKM", "PRODUK", "WISATA", "ULASAN", "PROMO", "AKSES_UMKM"];

// Tab di sini tetap masuk TAB_DIIZINKAN (supaya admin bisa kelola lewat
// CRUD generic), tapi aksi "baca" untuk tab ini WAJIB kata sandi admin
// juga -- beda dari tab katalog lain yang datanya memang publik.
var TAB_RAHASIA = ["AKSES_UMKM"];

// GANTI ini sebelum men-deploy. Ini bukan kata sandi akun Google --
// hanya PIN sederhana yang dicek sebelum data ditulis. Jangan pakai
// kata sandi yang dipakai ulang di tempat lain.
var KATA_SANDI = "GANTI_KATA_SANDI_ADMIN";

// Zona waktu dipakai untuk mengelompokkan statistik per hari dan untuk
// tanggal otomatis di ulasan pembeli.
var ZONA_WAKTU = "Asia/Jakarta";

// Bukan dipakai oleh admin.js (lihat catatan di doPost) -- disediakan
// supaya deployment-nya bisa dites manual: buka
// ALAMAT_WEB_APP?tab=UMKM langsung di peramban, harus muncul teks JSON.
function doGet(e) {
  try {
    var tab = e.parameter.tab;
    if (TAB_DIIZINKAN.indexOf(tab) === -1 || TAB_RAHASIA.indexOf(tab) !== -1) {
      return keluaran({ galat: "Tab '" + tab + "' tidak dikenal." });
    }
    return keluaran({ data: bacaTab(tab) });
  } catch (err) {
    return keluaran({ galat: String(err) });
  }
}

// Semua operasi -- termasuk BACA -- lewat doPost, bukan cuma tulis. Ini
// sengaja: keterbacaan lintas-asal (CORS) untuk respons doGet dari Apps
// Script tidak selalu konsisten di semua kondisi, sedangkan trik
// "text/plain supaya tidak ada preflight" pada doPost sudah terbukti
// jalan (dipakai juga untuk tambah/ubah/hapus di bawah).
function doPost(e) {
  try {
    var isi = JSON.parse(e.postData.contents);

    if (isi.aksi === "baca") {
      if (TAB_DIIZINKAN.indexOf(isi.tab) === -1) {
        return keluaran({ galat: "Tab '" + isi.tab + "' tidak dikenal." });
      }
      if (TAB_RAHASIA.indexOf(isi.tab) !== -1 && isi.sandi !== KATA_SANDI) {
        return keluaran({ galat: "Kata sandi salah." });
      }
      return keluaran({ data: bacaTab(isi.tab) });
    }

    // ---- Aksi publik/anonim: dipanggil situs katalog untuk SEMUA
    // pengunjung, tidak pakai kata sandi apa pun. ----
    if (isi.aksi === "catatStatistik") {
      return keluaran(catatStatistik(isi.slug, isi.jenis));
    }
    if (isi.aksi === "kirimUlasan") {
      return keluaran(kirimUlasan(isi.data || {}));
    }

    // ---- Aksi publik tapi khusus pemilik toko: butuh slug+kode yang
    // cocok di tab AKSES_UMKM, BUKAN kata sandi admin. Selalu
    // dicocokkan ulang ke server, tidak pernah percaya ke state
    // peramban. ----
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

    // ---- Mulai sini WAJIB kata sandi admin. ----
    if (isi.sandi !== KATA_SANDI) {
      return keluaran({ galat: "Kata sandi salah." });
    }
    // Dipakai admin.js sebagai "login" -- cuma mengecek KATA_SANDI di atas
    // tanpa menyentuh data apa pun, jadi tidak perlu tab.
    if (isi.aksi === "cekSandi") return keluaran({ ok: true });
    if (isi.aksi === "bacaStatistik") {
      return keluaran({ ok: true, data: agregasiStatistik() });
    }
    if (TAB_DIIZINKAN.indexOf(isi.tab) === -1) {
      return keluaran({ galat: "Tab '" + isi.tab + "' tidak dikenal." });
    }
    if (isi.aksi === "tambah") return keluaran(tambahBaris(isi.tab, isi.data));
    if (isi.aksi === "ubah") return keluaran(ubahBaris(isi.tab, isi.baris, isi.data));
    if (isi.aksi === "hapus") return keluaran(hapusBaris(isi.tab, isi.baris));
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

function lembarTab(nama) {
  var lembar = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nama);
  if (!lembar) throw new Error("Tab '" + nama + "' tidak ditemukan di Sheet ini.");
  return lembar;
}

function judulTab(lembar) {
  var kolomTerakhir = lembar.getLastColumn();
  if (kolomTerakhir === 0) return [];
  return lembar.getRange(1, 1, 1, kolomTerakhir).getValues()[0];
}

// Setiap baris yang dikembalikan diberi "_baris": nomor baris asli di
// Sheet (2, 3, 4, ...). Nomor ini dipakai admin.js untuk memberi tahu
// ubahBaris/hapusBaris baris mana yang dimaksud -- lebih aman daripada
// menebak dari slug, karena ULASAN tidak punya slug unik per baris.
function bacaTab(nama) {
  var lembar = lembarTab(nama);
  var nilai = lembar.getDataRange().getValues();
  if (nilai.length < 2) return [];
  var judul = nilai[0];
  var hasil = [];
  for (var i = 1; i < nilai.length; i++) {
    var obj = { _baris: i + 1 };
    for (var j = 0; j < judul.length; j++) obj[judul[j]] = nilai[i][j];
    hasil.push(obj);
  }
  return hasil;
}

// Kolom-kolom ini WAJIB diformat Teks Biasa SEBELUM nilainya ditulis --
// kalau ditulis dulu baru diformat belakangan, Sheets sudah keburu
// membaca angka panjangnya (nomor WA) sebagai Angka dan mungkin sudah
// dibulatkan/diubah jadi notasi ilmiah sebelum sempat diperbaiki.
var KOLOM_TEKS_PAKSA = ["wa", "kontak", "kode"];

function paksaFormatTeks(lembar, judul, nomorBaris) {
  KOLOM_TEKS_PAKSA.forEach(function (nama) {
    var idx = judul.indexOf(nama);
    if (idx !== -1) lembar.getRange(nomorBaris, idx + 1).setNumberFormat("@");
  });
}

function tambahBaris(tab, dataBaris) {
  var lembar = lembarTab(tab);
  var judul = judulTab(lembar);
  if (judul.indexOf("slug") !== -1 && dataBaris.slug) {
    var dipakai = bacaTab(tab).some(function (r) {
      return String(r.slug) === String(dataBaris.slug);
    });
    if (dipakai) {
      throw new Error("Slug '" + dataBaris.slug + "' sudah dipakai di tab " + tab + ".");
    }
  }
  var nomorBaris = lembar.getLastRow() + 1;
  paksaFormatTeks(lembar, judul, nomorBaris);
  var baris = judul.map(function (h) {
    return dataBaris[h] != null ? dataBaris[h] : "";
  });
  lembar.getRange(nomorBaris, 1, 1, judul.length).setValues([baris]);
  return { ok: true, pesan: "Data ditambahkan." };
}

function ubahBaris(tab, nomorBaris, dataBaris) {
  var lembar = lembarTab(tab);
  var judul = judulTab(lembar);
  cekNomorBaris(lembar, nomorBaris);
  paksaFormatTeks(lembar, judul, nomorBaris);
  var nilaiBaru = judul.map(function (h) {
    return dataBaris[h] != null ? dataBaris[h] : "";
  });
  lembar.getRange(nomorBaris, 1, 1, judul.length).setValues([nilaiBaru]);
  return { ok: true, pesan: "Perubahan disimpan." };
}

function hapusBaris(tab, nomorBaris) {
  var lembar = lembarTab(tab);
  cekNomorBaris(lembar, nomorBaris);
  lembar.deleteRow(nomorBaris);
  return { ok: true, pesan: "Data dihapus." };
}

function cekNomorBaris(lembar, nomorBaris) {
  var n = Number(nomorBaris);
  if (!n || n < 2 || n > lembar.getLastRow()) {
    throw new Error(
      "Baris tidak ditemukan -- mungkin sudah diubah/dihapus orang lain. " +
        "Muat ulang daftarnya lalu coba lagi.",
    );
  }
}

/* ---------- Statistik kunjungan & klik-WA ---------- */

// Dipanggil app.js untuk SETIAP pengunjung situs -- sengaja tidak
// melempar error ke pemanggil kalau datanya tidak masuk akal (slug
// asing, jenis di luar dua pilihan). Cukup diam saja, supaya tidak ada
// celah bikin situs publik menampilkan pesan galat gara-gara ini.
function catatStatistik(slug, jenis) {
  if (jenis !== "kunjungan" && jenis !== "klik_wa") return { ok: true };
  var ada = bacaTab("UMKM").some(function (r) {
    return String(r.slug) === String(slug);
  });
  if (!ada) return { ok: true };
  var lembar = lembarTab("STATISTIK");
  lembar.appendRow([new Date(), String(slug), jenis]);
  return { ok: true };
}

// Dipakai bacaStatistik (admin, semua toko) & bacaStatistikUmkm
// (pemilik, satu toko). filterSlug kosong/undefined -> rekap semua.
function agregasiStatistik(filterSlug) {
  var baris = bacaTab("STATISTIK");
  var perToko = {};
  var perHari = {};
  var HARI_DITAMPILKAN = 14;
  var batasWaktu = new Date();
  batasWaktu.setDate(batasWaktu.getDate() - (HARI_DITAMPILKAN - 1));
  batasWaktu.setHours(0, 0, 0, 0);

  baris.forEach(function (r) {
    var slug = String(r.slug);
    if (filterSlug && slug !== String(filterSlug)) return;
    if (!perToko[slug]) perToko[slug] = { kunjungan: 0, klikWa: 0 };
    if (r.jenis === "kunjungan") perToko[slug].kunjungan++;
    else if (r.jenis === "klik_wa") perToko[slug].klikWa++;

    var waktu = r.waktu instanceof Date ? r.waktu : new Date(r.waktu);
    if (waktu >= batasWaktu) {
      var tanggal = Utilities.formatDate(waktu, ZONA_WAKTU, "yyyy-MM-dd");
      if (!perHari[tanggal]) perHari[tanggal] = { kunjungan: 0, klikWa: 0 };
      if (r.jenis === "kunjungan") perHari[tanggal].kunjungan++;
      else if (r.jenis === "klik_wa") perHari[tanggal].klikWa++;
    }
  });

  // Pastikan semua hari dalam rentang ada (biar grafik tidak bolong),
  // termasuk hari yang nol kunjungan.
  var harian = [];
  for (var i = HARI_DITAMPILKAN - 1; i >= 0; i--) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    var tgl = Utilities.formatDate(d, ZONA_WAKTU, "yyyy-MM-dd");
    harian.push({
      tanggal: tgl,
      kunjungan: (perHari[tgl] && perHari[tgl].kunjungan) || 0,
      klikWa: (perHari[tgl] && perHari[tgl].klikWa) || 0,
    });
  }

  return { perToko: perToko, harian: harian };
}

/* ---------- Ulasan pembeli (publik, tayang langsung) ---------- */

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
  var adaProduk = bacaTab("PRODUK").some(function (r) {
    return String(r.slug) === produk;
  });
  if (!adaProduk) {
    throw new Error("Produk '" + produk + "' tidak ditemukan.");
  }

  var asal = asalDiketik ? asalDiketik + ", " + tanggalIndo() : tanggalIndo();
  var lembar = lembarTab("ULASAN");
  lembar.appendRow([produk, nama, asal, penilaian, teks]);
  return { ok: true, pesan: "Terima kasih atas ulasannya." };
}

/* ---------- Akses & data mandiri pemilik UMKM ---------- */

// Dipakai cekAksesUmkm DAN sebagai pengecekan ulang di setiap aksi
// mandiri pemilik toko lainnya -- tidak pernah percaya ke state
// peramban pemanggil, selalu dicocokkan lagi ke Sheet.
function cekKodeUmkm(slug, kode) {
  if (!slug || !kode) return { galat: "Slug dan kode wajib diisi." };
  var cocok = bacaTab("AKSES_UMKM").some(function (r) {
    return String(r.slug) === String(slug) && String(r.kode) === String(kode);
  });
  if (!cocok) return { galat: "Slug atau kode akses salah." };
  return { ok: true };
}

function bacaPromoSlug(slug) {
  var baris = bacaTab("PROMO").filter(function (r) {
    return String(r.slug) === String(slug);
  });
  if (!baris.length) return { teks: "", aktif: false };
  var r = baris[0];
  return { teks: String(r.teks || ""), aktif: keBooleanGs(r.aktif) };
}

function keBooleanGs(nilai) {
  var v = String(nilai || "").toUpperCase();
  return v === "TRUE" || v === "1" || v === "YA";
}

// Upsert by slug (BUKAN by nomor baris seperti ubahBaris generic) --
// pemilik toko tidak tahu dan tidak perlu tahu nomor barisnya di Sheet.
function simpanPromoUntukSlug(slug, teks, aktif) {
  var lembar = lembarTab("PROMO");
  var judul = judulTab(lembar);
  var semua = bacaTab("PROMO");
  var adaDi = null;
  for (var i = 0; i < semua.length; i++) {
    if (String(semua[i].slug) === String(slug)) {
      adaDi = semua[i]._baris;
      break;
    }
  }
  var dataBaris = { slug: slug, teks: String(teks || ""), aktif: aktif ? "TRUE" : "FALSE" };
  var nilaiBaris = judul.map(function (h) {
    return dataBaris[h] != null ? dataBaris[h] : "";
  });
  if (adaDi) {
    lembar.getRange(adaDi, 1, 1, judul.length).setValues([nilaiBaris]);
  } else {
    lembar.getRange(lembar.getLastRow() + 1, 1, 1, judul.length).setValues([nilaiBaris]);
  }
  return { ok: true, pesan: "Promo disimpan." };
}
