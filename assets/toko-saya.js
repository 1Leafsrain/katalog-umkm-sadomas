/* ============================================================
   Halaman "Toko Saya": pemilik UMKM masuk pakai slug + kode akses
   (BUKAN kata sandi admin) untuk melihat statistik tokonya sendiri
   dan mengatur promo yang tampil di halaman profil tokonya.

   Dimuat sebagai skrip biasa (bukan module), sama alasannya dengan
   assets/admin.js -- lihat catatan di berkas itu.
   ============================================================ */

// GANTI dengan alamat Web App yang SAMA dengan yang ditulis di
// assets/app.js (URL_STATISTIK) -- kalau salah satu diubah, ubah juga
// yang lain, dua-duanya harus menunjuk Apps Script Web App yang sama.
const URL_STATISTIK = "https://script.google.com/macros/s/AKfycbw5ndsgrKzy_RiZrgDtMHKLanauzMdCdFWzNzsC_L3Vay4Csk7_lfqAdBenk3w4wX3Z/exec";

const $ = (sel) => document.querySelector(sel);

async function panggilStatistikPublik(payload) {
  if (!URL_STATISTIK || URL_STATISTIK.startsWith("GANTI")) {
    throw new Error("Fitur ini belum aktif.");
  }
  const res = await fetch(URL_STATISTIK, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const j = await res.json();
  if (j.galat) throw new Error(j.galat);
  return j;
}

function pesan(sel, teks, jenis) {
  const el = $(sel);
  el.textContent = teks;
  el.className = "status" + (jenis ? " status--" + jenis : "");
}

// Kode akses SENGAJA tidak disimpan ke localStorage (beda dari
// admin.js yang punya opsi "ingat sandi") -- perangkat pemilik toko
// bisa dipakai bersama orang lain, lebih aman minta masuk ulang tiap
// sesi peramban.
let sesiSlug = null;
let sesiKode = null;

function isiPilihanToko() {
  const sel = $("#ts-slug");
  UMKM.slice()
    .sort((a, b) => a.nama.localeCompare(b.nama))
    .forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u.slug;
      opt.textContent = u.nama;
      sel.append(opt);
    });
}

async function muatSetelahMasuk() {
  const [statistik, promo, profil] = await Promise.all([
    panggilStatistikPublik({ aksi: "bacaStatistikUmkm", slug: sesiSlug, kode: sesiKode }),
    panggilStatistikPublik({ aksi: "bacaPromoUmkm", slug: sesiSlug, kode: sesiKode }),
    panggilStatistikPublik({ aksi: "bacaUmkmSaya", slug: sesiSlug, kode: sesiKode }),
  ]);

  const { perToko, harian } = statistik.data;
  const totalToko = perToko[sesiSlug] || { kunjungan: 0, klikWa: 0 };
  $("#angka-kunjungan").textContent = totalToko.kunjungan;
  $("#angka-klik-wa").textContent = totalToko.klikWa;

  const u = UMKM.find((x) => x.slug === sesiSlug);
  $("#isi-nama-toko").textContent = u ? "— " + u.nama : "";

  const dataHarian = harian.map((h) => ({
    label: h.tanggal.slice(5), // "MM-DD"
    a: h.kunjungan,
    b: h.klikWa,
  }));
  $("#grafik-harian").innerHTML = grafikBatangGanda(dataHarian, {
    labelA: "Kunjungan",
    labelB: "Klik WA",
  });

  $("#promo-teks").value = promo.data.teks || "";
  $("#promo-aktif").checked = Boolean(promo.data.aktif);

  isiFormProfil(profil.data);

  $("#fieldset-isi").hidden = false;
  $("#fieldset-promo").hidden = false;
  $("#fieldset-profil").hidden = false;
  $("#fieldset-produk").hidden = false;

  await muatDaftarProduk();
}

/* ---------- Profil Toko ---------- */

const FIELD_PROFIL = ["nama", "kategori", "pemilik", "wa", "alamat", "jamBuka", "pengiriman", "foto", "fotoLokasi", "deskripsi"];

function isiFormProfil(data) {
  FIELD_PROFIL.forEach((kunci) => {
    const input = $("#pf-" + kunci);
    if (input) input.value = data[kunci] != null ? data[kunci] : "";
  });
  tampilkanPratinjauFoto("#pf-foto-pratinjau", data.foto);
  tampilkanPratinjauFoto("#pf-fotoLokasi-pratinjau", data.fotoLokasi);
}

function bacaFormProfil() {
  const data = {};
  FIELD_PROFIL.forEach((kunci) => {
    data[kunci] = $("#pf-" + kunci).value.trim();
  });
  return data;
}

function tampilkanPratinjauFoto(selPratinjau, foto) {
  const el = $(selPratinjau);
  const jalur = jalurFotoTampil(foto);
  if (el && jalur) {
    el.src = jalur;
    el.hidden = false;
  } else if (el) {
    el.hidden = true;
    el.removeAttribute("src");
  }
}

/* ---------- Unggah foto (relay lewat Apps Script -- pemilik toko
   tidak pernah pegang token GitHub apa pun, beda dari admin.js) ---------- */

async function unggahFotoSayaDariInput(elBerkas, elTeks, elPratinjau, elStatus) {
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
    const hasil = await panggilStatistikPublik({
      aksi: "unggahFotoSaya",
      slug: sesiSlug,
      kode: sesiKode,
      namaAsli: file.name,
      tipeMime: "image/jpeg",
      dataBase64,
    });
    elTeks.value = hasil.namaBerkas;
    elPratinjau.src = jalurFotoTampil(hasil.namaBerkas);
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

function pasangWidgetFoto(prefix) {
  const elBerkas = $("#" + prefix + "-berkas");
  const elTeks = $("#" + prefix);
  const elPratinjau = $("#" + prefix + "-pratinjau");
  const elStatus = $("#" + prefix + "-status");
  elBerkas.addEventListener("change", () => unggahFotoSayaDariInput(elBerkas, elTeks, elPratinjau, elStatus));
}

/* ---------- Produk Saya ---------- */

const FIELD_PRODUK = ["slug", "nama", "kategori", "harga", "satuan", "foto", "unggulan", "deskripsi"];
let produkSlugDiedit = null; // null = mode tambah

async function muatDaftarProduk() {
  const kotak = $("#daftar-produk");
  kotak.innerHTML = "Memuat...";
  try {
    const hasil = await panggilStatistikPublik({ aksi: "bacaProdukSaya", slug: sesiSlug, kode: sesiKode });
    kotak.innerHTML = "";
    kotak.className = "";
    if (!hasil.data.length) {
      const p = document.createElement("p");
      p.className = "kosong-kecil";
      p.textContent = "Belum ada produk. Tekan “+ Tambah Produk” untuk menambahkan.";
      kotak.append(p);
      return;
    }
    kotak.className = "kisi-produk-saya";
    hasil.data.forEach((p) => {
      kotak.append(buatKartuProduk(p));
    });
  } catch (err) {
    kotak.innerHTML = "";
    pesan("#produk-status", "Gagal memuat produk: " + err.message, "galat");
  }
}

function buatKartuProduk(p) {
  const kartu = document.createElement("div");
  kartu.className = "kartu kartu--kecil kartu-produk-saya";

  const gambar = document.createElement("div");
  gambar.className = "gambar kartu__gambar";
  const jalur = jalurFotoTampil(p.foto);
  if (jalur) {
    const img = document.createElement("img");
    img.src = jalur;
    img.alt = p.nama || "";
    img.loading = "lazy";
    gambar.append(img);
  }

  const badan = document.createElement("div");
  badan.className = "kartu__badan kartu__badan--rapat";

  const baris = document.createElement("div");
  baris.className = "kartu__baris";
  const kategori = document.createElement("span");
  kategori.className = "kartu__kategori";
  kategori.textContent = p.kategori || "";
  baris.append(kategori);
  if (p.unggulan) {
    const tanda = document.createElement("span");
    tanda.className = "tanda tanda--kecil";
    tanda.textContent = "Unggulan";
    baris.append(tanda);
  }

  const nama = document.createElement("span");
  nama.className = "kartu__nama kartu__nama--kecil";
  nama.textContent = p.nama;

  const harga = document.createElement("span");
  harga.className = "kartu__harga";
  harga.textContent = p.harga || "Harga belum diisi";

  badan.append(baris, nama, harga);
  if (p.satuan) {
    const satuan = document.createElement("span");
    satuan.className = "kartu__ket";
    satuan.textContent = p.satuan;
    badan.append(satuan);
  }

  const kaki = document.createElement("div");
  kaki.className = "kartu__kaki";
  const aksi = document.createElement("div");
  aksi.className = "daftar__aksi";
  const btnUbah = document.createElement("button");
  btnUbah.type = "button";
  btnUbah.className = "sekunder";
  btnUbah.textContent = "Ubah";
  btnUbah.addEventListener("click", () => mulaiUbahProduk(p));
  const btnHapus = document.createElement("button");
  btnHapus.type = "button";
  btnHapus.className = "tombol-bahaya";
  btnHapus.textContent = "Hapus";
  btnHapus.addEventListener("click", () => hapusProdukSaya(p.slug, p.nama));
  aksi.append(btnUbah, btnHapus);
  kaki.append(aksi);

  kartu.append(gambar, badan, kaki);
  return kartu;
}

function isiFormProduk(data) {
  FIELD_PRODUK.forEach((kunci) => {
    const input = $("#pr-" + kunci);
    if (!input) return;
    if (input.type === "checkbox") input.checked = Boolean(data[kunci]);
    else input.value = data[kunci] != null ? data[kunci] : "";
  });
  tampilkanPratinjauFoto("#pr-foto-pratinjau", data.foto);
}

function bacaFormProduk() {
  const data = {};
  FIELD_PRODUK.forEach((kunci) => {
    const input = $("#pr-" + kunci);
    data[kunci] = input.type === "checkbox" ? input.checked : input.value.trim();
  });
  return data;
}

function mulaiTambahProduk() {
  produkSlugDiedit = null;
  isiFormProduk({});
  $("#pr-slug").disabled = false;
  $("#produk-judul-form").textContent = "Tambah produk baru";
  $("#btn-hapus-produk").hidden = true;
  $("#form-produk").hidden = false;
  pesan("#produk-status", "", "");
  $("#form-produk").scrollIntoView({ behavior: "smooth", block: "start" });
}

function mulaiUbahProduk(data) {
  produkSlugDiedit = data.slug;
  isiFormProduk(data);
  $("#pr-slug").disabled = true; // slug produk tidak diganti saat mengubah, cukup dihapus & ditambah baru kalau memang perlu
  $("#produk-judul-form").textContent = "Ubah produk";
  $("#btn-hapus-produk").hidden = false;
  $("#form-produk").hidden = false;
  pesan("#produk-status", "", "");
  $("#form-produk").scrollIntoView({ behavior: "smooth", block: "start" });
}

function tutupFormProduk() {
  produkSlugDiedit = null;
  $("#form-produk").hidden = true;
  $("#pr-slug").disabled = false;
}

async function hapusProdukSaya(slug, nama) {
  if (!confirm("Hapus produk ini?\n\n" + nama)) return;
  try {
    pesan("#produk-status", "Menghapus...", "");
    await panggilStatistikPublik({ aksi: "hapusProdukSaya", slug: sesiSlug, kode: sesiKode, produkSlug: slug });
    pesan("#produk-status", "Produk dihapus.", "ok");
    if (produkSlugDiedit === slug) tutupFormProduk();
    await muatDaftarProduk();
  } catch (err) {
    pesan("#produk-status", "Gagal menghapus: " + err.message, "galat");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  isiPilihanToko();

  $("#form-masuk").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const slug = $("#ts-slug").value;
    const kode = $("#ts-kode").value;
    pesan("#masuk-status", "Memeriksa...", "");
    try {
      await panggilStatistikPublik({ aksi: "cekAksesUmkm", slug, kode });
      sesiSlug = slug;
      sesiKode = kode;
      await muatSetelahMasuk();
      pesan("#masuk-status", "Berhasil masuk.", "ok");
    } catch (err) {
      pesan("#masuk-status", "Gagal masuk: " + err.message, "galat");
    }
  });

  $("#form-promo").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (!sesiSlug) return;
    pesan("#promo-status", "Menyimpan...", "");
    try {
      await panggilStatistikPublik({
        aksi: "simpanPromoUmkm",
        slug: sesiSlug,
        kode: sesiKode,
        teks: $("#promo-teks").value.trim(),
        aktif: $("#promo-aktif").checked,
      });
      pesan("#promo-status", "Promo disimpan. Tampil di situs hampir seketika.", "ok");
    } catch (err) {
      pesan("#promo-status", "Gagal menyimpan: " + err.message, "galat");
    }
  });

  $("#form-profil").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (!sesiSlug) return;
    pesan("#profil-status", "Menyimpan...", "");
    try {
      await panggilStatistikPublik({
        aksi: "simpanUmkmSaya",
        slug: sesiSlug,
        kode: sesiKode,
        data: bacaFormProfil(),
      });
      pesan("#profil-status", "Profil toko disimpan. Tampil di katalog hampir seketika.", "ok");
    } catch (err) {
      pesan("#profil-status", "Gagal menyimpan: " + err.message, "galat");
    }
  });
  pasangWidgetFoto("pf-foto");
  pasangWidgetFoto("pf-fotoLokasi");

  $("#btn-tambah-produk").addEventListener("click", mulaiTambahProduk);
  $("#btn-batal-produk").addEventListener("click", tutupFormProduk);
  $("#btn-hapus-produk").addEventListener("click", () => {
    if (produkSlugDiedit) hapusProdukSaya(produkSlugDiedit, $("#pr-nama").value);
  });
  $("#form-produk").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (!sesiSlug) return;
    const data = bacaFormProduk();
    if (!data.slug || !data.nama || !data.kategori || !data.deskripsi) {
      pesan("#produk-status", "Slug, nama, kategori, dan deskripsi wajib diisi.", "galat");
      return;
    }
    pesan("#produk-status", "Menyimpan...", "");
    try {
      await panggilStatistikPublik({ aksi: "simpanProdukSaya", slug: sesiSlug, kode: sesiKode, data });
      pesan("#produk-status", "Produk disimpan. Tampil di katalog hampir seketika.", "ok");
      tutupFormProduk();
      await muatDaftarProduk();
    } catch (err) {
      pesan("#produk-status", "Gagal menyimpan: " + err.message, "galat");
    }
  });
  pasangWidgetFoto("pr-foto");
});
