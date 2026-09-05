/* ============================================================
   Backend form admin -- ditempel ke Google Sheet lewat Extensions >
   Apps Script, lalu di-deploy sebagai Web App. Dipanggil oleh
   admin.html (lewat assets/admin.js) untuk tambah/ubah/hapus baris
   di tab UMKM, PRODUK, WISATA, ULASAN.

   INI BUKAN JAVASCRIPT BIASA -- ini Google Apps Script, hanya bisa
   ditempel & dijalankan di dalam Google Sheet, bukan lewat Node.

   Cara memasang & men-deploy: lihat PANDUAN-ADMIN.md.

   Baca (doGet) tidak perlu kata sandi -- datanya sama dengan yang
   sudah publik di halaman katalog. Tulis (doPost) WAJIB kata sandi
   yang cocok dengan KATA_SANDI di bawah, supaya bukan sembarang
   orang yang tahu alamat Web App-nya bisa mengubah data.
   ============================================================ */

var TAB_DIIZINKAN = ["UMKM", "PRODUK", "WISATA", "ULASAN"];

// GANTI ini sebelum men-deploy. Ini bukan kata sandi akun Google --
// hanya PIN sederhana yang dicek sebelum data ditulis. Jangan pakai
// kata sandi yang dipakai ulang di tempat lain.
var KATA_SANDI = "GANTI_KATA_SANDI_ADMIN";

// Bukan dipakai oleh admin.js (lihat catatan di doPost) -- disediakan
// supaya deployment-nya bisa dites manual: buka
// ALAMAT_WEB_APP?tab=UMKM langsung di peramban, harus muncul teks JSON.
function doGet(e) {
  try {
    var tab = e.parameter.tab;
    if (TAB_DIIZINKAN.indexOf(tab) === -1) {
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
// jalan (dipakai juga untuk tambah/ubah/hapus di bawah). admin.js
// memanggil doPost untuk keempat aksi ini, bukan cuma tulis.
function doPost(e) {
  try {
    var isi = JSON.parse(e.postData.contents);

    if (isi.aksi === "baca") {
      // Baca tidak perlu kata sandi -- datanya sama dengan yang sudah
      // publik di halaman katalog.
      if (TAB_DIIZINKAN.indexOf(isi.tab) === -1) {
        return keluaran({ galat: "Tab '" + isi.tab + "' tidak dikenal." });
      }
      return keluaran({ data: bacaTab(isi.tab) });
    }

    if (isi.sandi !== KATA_SANDI) {
      return keluaran({ galat: "Kata sandi salah." });
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

/* ---------- Alat bantu ---------- */

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
var KOLOM_TEKS_PAKSA = ["wa", "kontak"];

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
