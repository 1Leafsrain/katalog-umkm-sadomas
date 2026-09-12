/* ============================================================
   Form admin: tambah / ubah / hapus data UMKM, PRODUK, WISATA,
   ULASAN lewat Google Apps Script Web App yang nulis langsung ke
   Google Sheet. Lihat PANDUAN-ADMIN.md untuk cara memasangnya.

   Dimuat sebagai skrip biasa (bukan <script type="module">) SENGAJA:
   server statis (termasuk kadang GitHub Pages) tidak selalu mengirim
   Content-Type yang tepat untuk berkas .mjs, dan peramban menolak
   menjalankan modul ES kalau Content-Type-nya salah -- daripada
   bergantung pada konfigurasi server yang tidak dikendalikan dari
   sini, dua angka di bawah cukup disalin manual dari skema.mjs.

   Halaman ini SENGAJA tidak ditautkan di menu situs. Tetap bisa
   dibuka siapa saja yang tahu alamatnya (GitHub Pages tidak punya
   login) -- yang benar-benar menahan penulisan data adalah
   pengecekan kata sandi di Apps Script (Code.gs), bukan halaman ini.
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

function kolomGaleri() {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_GALERI; i++) {
    hasil.push([`galeri${i}_judul`, `Galeri ${i} — judul`, TEKS]);
    hasil.push([`galeri${i}_foto`, `Galeri ${i} — nama berkas foto`, TEKS]);
  }
  return hasil;
}

function kolomGaleriProduk() {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_GALERI; i++) {
    hasil.push([`galeri${i}`, `Foto tambahan ${i} — nama berkas`, TEKS]);
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
    ringkas: (r) => r.nama + " — " + r.slug,
    field: [
      ["slug", "Slug (huruf kecil, pakai -, tidak boleh sama dengan yang lain)", TEKS, true],
      ["nama", "Nama usaha", TEKS, true],
      ["kategori", "Kategori (kuliner / pertanian / perikanan / kerajinan)", TEKS, true],
      ["pemilik", "Nama pemilik", TEKS],
      ["wa", "Nomor WhatsApp (awalan 62, contoh 6281234567890)", TEKS],
      ["alamat", "Alamat", TEKS],
      ["foto", "Nama berkas foto utama (di assets/img/)", TEKS],
      ["penilaian", "Penilaian (0-5, biarkan 0 bila belum ada)", ANGKA],
      ["jamBuka", "Jam buka", TEKS],
      ["pengiriman", "Pengiriman", TEKS],
      ["fotoLokasi", "Nama berkas foto lokasi", TEKS],
      ["deskripsi", "Deskripsi", AREA, true],
    ],
  },
  PRODUK: {
    label: "Produk",
    ringkas: (r) => r.nama + " — milik " + r.umkm,
    field: [
      ["slug", "Slug (huruf kecil, pakai -, tidak boleh sama dengan yang lain)", TEKS, true],
      ["nama", "Nama produk", TEKS, true],
      ["umkm", "Slug UMKM pemilik (harus sama persis)", TEKS, true],
      ["kategori", "Kategori", TEKS, true],
      ["harga", "Harga (kisaran, contoh Rp15.000 – Rp18.000)", TEKS],
      ["satuan", "Satuan (contoh per kotak isi 10 buah)", TEKS],
      ["foto", "Nama berkas foto utama", TEKS],
      ["penilaian", "Penilaian (0-5, biarkan 0 bila belum ada)", ANGKA],
      ...kolomGaleriProduk(),
      ["unggulan", "Tampilkan di beranda sebagai produk unggulan", CENTANG],
      ["deskripsi", "Deskripsi", AREA, true],
      ...kolomRincian(),
    ],
  },
  WISATA: {
    label: "Wisata",
    ringkas: (r) => r.nama + " — " + r.slug,
    field: [
      ["slug", "Slug (huruf kecil, pakai -, tidak boleh sama dengan yang lain)", TEKS, true],
      ["nama", "Nama lokasi", TEKS, true],
      ["jenis", "Jenis (contoh Air Terjun, Bukit, Kolam Pemandian)", TEKS],
      ["alamat", "Alamat", TEKS],
      ["jamBuka", "Jam buka", TEKS],
      ["tiket", "Tiket masuk", TEKS],
      ["kontak", "Nomor WhatsApp kontak (kosongkan untuk pakai WA desa)", TEKS],
      ["foto", "Nama berkas foto utama", TEKS],
      ["fotoLokasi", "Nama berkas foto lokasi", TEKS],
      ["penilaian", "Penilaian (0-5, biarkan 0 bila belum ada)", ANGKA],
      ["keteranganGaleri", "Keterangan galeri suasana", TEKS],
      ...kolomGaleri(),
      ["deskripsi", "Deskripsi", AREA, true],
    ],
  },
  ULASAN: {
    label: "Ulasan pembeli",
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
    ringkas: (r) => r.slug + (r.aktif && String(r.aktif).toUpperCase() === "TRUE" ? " (aktif)" : " (nonaktif)") + " — " + String(r.teks || "").slice(0, 40),
    field: [
      ["slug", "Slug UMKM (harus sama persis)", TEKS, true],
      ["teks", "Isi promo", AREA, true],
      ["aktif", "Tampilkan di halaman toko", CENTANG],
    ],
  },
  AKSES_UMKM: {
    label: "Kode akses toko",
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
  return {
    url: elUrl ? elUrl.value.trim() : "",
    sandi: elSandi ? elSandi.value : "",
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

// Sandi selalu dikirim (bukan cuma untuk tab yang wajib) -- perlu
// supaya tab AKSES_UMKM (kode privat tiap toko) bisa terbaca admin.
// Untuk tab lain, Code.gs mengabaikannya begitu saja, jadi aman.
async function panggilGet(tab) {
  const { sandi } = nilaiPengaturanAktif();
  const j = await panggilAppsScript({ aksi: "baca", tab, sandi });
  return j.data;
}

async function panggilPost(payload) {
  const { sandi } = nilaiPengaturanAktif();
  if (!sandi) throw new Error("Kata sandi admin belum diisi di bagian Pengaturan.");
  return panggilAppsScript({ ...payload, sandi });
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
}

function renderPilihanTab() {
  const sel = $("#pilih-tab");
  sel.innerHTML = "";
  Object.entries(SKEMA_TAB).forEach(([kunci, skema]) => {
    sel.append(elemen("option", { value: kunci }, skema.label));
  });
  sel.value = tabAktif;
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

async function muatDaftar() {
  const kotak = $("#daftar");
  kotak.innerHTML = "Memuat...";
  try {
    const baris = await panggilGet(tabAktif);
    const skema = SKEMA_TAB[tabAktif];
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
            { type: "button", kelas: "tombol-bahaya", onclick: () => hapus(r._baris, skema.ringkas(r)) },
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
  barisDiedit = data._baris;
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
  try {
    const data = bacaFormJadiData();
    pesanStatus("Menyimpan...", "");
    if (barisDiedit == null) {
      await panggilPost({ aksi: "tambah", tab: tabAktif, data });
      pesanStatus("Data ditambahkan.", "ok");
    } else {
      await panggilPost({ aksi: "ubah", tab: tabAktif, baris: barisDiedit, data });
      pesanStatus("Perubahan disimpan.", "ok");
    }
    mulaiTambah();
    muatDaftar();
  } catch (err) {
    pesanStatus("Gagal menyimpan: " + err.message, "galat");
  }
}

async function hapus(nomorBaris, ringkasan) {
  if (!confirm("Hapus data ini?\n\n" + ringkasan)) return;
  try {
    pesanStatus("Menghapus...", "");
    await panggilPost({ aksi: "hapus", tab: tabAktif, baris: nomorBaris });
    pesanStatus("Data dihapus.", "ok");
    if (barisDiedit === nomorBaris) mulaiTambah();
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
    if (!url || !sandi) {
      pesanStatus("Isi alamat Web App dan kata sandi dulu.", "galat");
      return;
    }
    pesanStatus("Memeriksa kata sandi...", "");
    try {
      await panggilPost({ aksi: "cekSandi" });
      simpanPengaturan({
        url,
        sandi: $("#p-ingat").checked ? sandi : "",
        ingatSandi: $("#p-ingat").checked,
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
    simpanPengaturan({ url: $("#p-url").value.trim(), sandi: "", ingatSandi: false });
    $("#p-sandi").value = "";
    $("#p-ingat").checked = false;
    $("#daftar").innerHTML = "";
    mulaiTambah();
    tutupKunci();
    pesanStatus("Sudah keluar.", "");
  });

  // Kalau kata sandi sebelumnya diminta diingat, coba langsung masuk
  // tanpa perlu klik apa pun -- tetap lewat cekSandi ke server, bukan
  // sekadar percaya begitu saja pada apa yang tersimpan di peramban.
  const tersimpan = ambilPengaturan();
  if (tersimpan.url && tersimpan.sandi) {
    pesanStatus("Memeriksa sesi tersimpan...", "");
    panggilPost({ aksi: "cekSandi" })
      .then(() => {
        bukaKunci();
        muatDaftar();
        muatStatistik();
        pesanStatus("", "");
      })
      .catch((err) => {
        pesanStatus("Sesi tersimpan tidak berlaku lagi: " + err.message, "galat");
      });
  }

  $("#pilih-tab").addEventListener("change", (ev) => {
    tabAktif = ev.target.value;
    mulaiTambah();
    renderForm();
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
