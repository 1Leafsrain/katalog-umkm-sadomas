/* ============================================================
   Katalog UMKM Desa Sadomas — penyusun halaman
   Tidak perlu diubah untuk memperbarui isi. Ubah data/katalog.js.

   Ikon digambar langsung di berkas ini sebagai SVG, jadi tidak ada
   permintaan ke server luar sama sekali.
   ============================================================ */

/* ---------- Ikon ---------- */

const G =
  'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
  'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';

const IKON = {
  daun:
    "<svg " + G + '><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  cari:
    "<svg " + G + '><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
  telepon:
    "<svg " + G + '><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92Z"/></svg>',
  wa:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35Z"/><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.24 8.24 0 0 1 0 16.47Z"/></svg>',
  panah:
    "<svg " + G + '><path d="m9 18 6-6-6-6"/></svg>',
  bintang:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/></svg>',
  toko:
    "<svg " + G + '><path d="M3 9h18l-1.5-5.5a1 1 0 0 0-1-.75H5.5a1 1 0 0 0-1 .75L3 9Z"/><path d="M4 9v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M9 21v-6h6v6"/></svg>',
  kotak:
    "<svg " + G + '><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
  orang:
    "<svg " + G + '><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  peta:
    "<svg " + G + '><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  piring:
    "<svg " + G + '><path d="M3 2v7c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V2"/><path d="M6 2v20"/><path d="M18 2v20"/><path d="M18 12c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3"/></svg>',
  tunas:
    "<svg " + G + '><path d="M7 20h10"/><path d="M12 20V9"/><path d="M12 9C12 5 9 3 5 3c0 4 3 6 7 6Z"/><path d="M12 12c0-3 2.5-5 6-5 0 3-2.5 5-6 5Z"/></svg>',
  ikan:
    "<svg " + G + '><path d="M2 12c3-5 8-7 12-7 3.5 0 6 2 8 7-2 5-4.5 7-8 7-4 0-9-2-12-7Z"/><circle cx="16" cy="11" r="1"/><path d="M2 12c1.5-1 2.5-2 3-3.5"/></svg>',
  tangan:
    "<svg " + G + '><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10V6a2 2 0 1 0-4 0v9"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8 2 2 0 1 1 4 0"/></svg>',
  jam:
    "<svg " + G + '><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  truk:
    "<svg " + G + '><path d="M14 18V6H2v12h2"/><path d="M14 9h4l4 4v5h-2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/><path d="M9 18h6"/></svg>',
  bagikan:
    "<svg " + G + '><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4"/><path d="m15.4 6.5-6.8 4"/></svg>',
  kutip:
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 40" fill="currentColor"><path d="M0 40V22.4C0 10 6.4 2 18 0l2 5.6C13.6 8 10.4 12 10.4 17.6H18V40H0Zm28 0V22.4C28 10 34.4 2 46 0l2 5.6C41.6 8 38.4 12 38.4 17.6H46V40H28Z"/></svg>',
  ig:
    "<svg " + G + '><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  fb:
    "<svg " + G + '><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z"/></svg>',
  surat:
    "<svg " + G + '><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
  gunung:
    "<svg " + G + '><path d="m8 3 4 8 5-5 5 15H2L8 3Z"/></svg>',
  tiket:
    "<svg " + G + '><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>',
};

/* Ikon per kategori. Kunci harus sama dengan id kategori di data. */
const IKON_KATEGORI = {
  kuliner: { ikon: "piring", latar: "var(--jingga-muda)" },
  pertanian: { ikon: "tunas", latar: "var(--hijau-muda)" },
  perikanan: { ikon: "ikan", latar: "var(--biru-muda)" },
  kerajinan: { ikon: "tangan", latar: "var(--netral)" },
};

/* ---------- Alat bantu ---------- */

const $ = (pilih, induk = document) => induk.querySelector(pilih);

function aman(teks) {
  return String(teks == null ? "" : teks).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
}

function nomorSiap(nomor) {
  return Boolean(nomor) && !String(nomor).toUpperCase().includes("GANTI");
}

function perluDiisi(teks) {
  return String(teks || "")
    .toUpperCase()
    .startsWith("GANTI");
}

function tautanWa(nomor, pesan) {
  return (
    "https://wa.me/" +
    String(nomor).replace(/\D/g, "") +
    "?text=" +
    encodeURIComponent(pesan)
  );
}

function sapaan(pemilik) {
  return !pemilik || perluDiisi(pemilik) ? "Halo" : "Halo " + pemilik;
}

function namaKategori(id) {
  const k = KATEGORI.find((x) => x.id === id);
  return k ? k.nama : id;
}

function cariUmkm(slug) {
  return UMKM.find((u) => u.slug === slug);
}

function produkMilik(slug) {
  return PRODUK.filter((p) => p.umkm === slug);
}

/** Kotak gambar. Bila foto kosong, tampil motif anyaman + keterangan. */
function gambar(foto, alt, kelas, label) {
  const kelasnya = "gambar " + (kelas || "");
  if (foto) {
    return (
      '<div class="' +
      kelasnya +
      '"><img src="assets/img/' +
      aman(foto) +
      '" alt="' +
      aman(alt) +
      '" loading="lazy"></div>'
    );
  }
  return (
    '<div class="' +
    kelasnya +
    '"><span class="gambar__label">' +
    aman(label || "Foto belum diunggah") +
    "</span></div>"
  );
}

/** Baris bintang. Hanya muncul bila nilai penilaian benar-benar diisi. */
function bintang(nilai) {
  if (!nilai) return "";
  const jumlah = Math.max(1, Math.min(5, Math.round(Number(nilai))));
  return (
    '<span class="bintang" aria-label="Penilaian ' +
    jumlah +
    ' dari 5">' +
    IKON.bintang.repeat(jumlah) +
    "</span>"
  );
}

/* ---------- Kepala & kaki ---------- */

const HALAMAN = [
  { kunci: "beranda", nama: "Beranda", url: "index.html" },
  { kunci: "profil", nama: "Profil Desa", url: "index.html#profil" },
  { kunci: "katalog", nama: "Katalog UMKM", url: "katalog.html" },
  { kunci: "wisata", nama: "Wisata Desa", url: "wisata.html" },
  { kunci: "kontak", nama: "Hubungi Kami", url: "index.html#kontak" },
];

function susunKepala() {
  const aktif = document.body.dataset.menu || document.body.dataset.halaman;
  const menu = HALAMAN.map(
    (h) =>
      '<a href="' +
      h.url +
      '"' +
      (h.kunci === aktif ? ' aria-current="page"' : "") +
      ">" +
      h.nama +
      "</a>",
  ).join("");

  const tombolDesa = nomorSiap(DESA.waDesa)
    ? '<a class="tombol tombol--hijau tombol--pil" href="' +
      tautanWa(
        DESA.waDesa,
        "Halo, saya ingin bertanya tentang UMKM Desa " + DESA.nama + ".",
      ) +
      '" target="_blank" rel="noopener">' +
      IKON.telepon +
      "Hubungi Desa</a>"
    : "";

  return (
    '<a class="lompat" href="#isi">Lompat ke isi</a>' +
    '<header class="kepala"><div class="blok__isi kepala__isi">' +
    '<a class="merek" href="index.html">' +
    '<span class="merek__lambang" aria-hidden="true">' +
    IKON.daun +
    "</span>" +
    '<span class="merek__teks"><span class="merek__nama">' +
    aman(DESA.nama.toUpperCase()) +
    '</span><span class="merek__sub">' +
    aman(DESA.tagline) +
    "</span></span></a>" +
    '<nav class="menu" id="menu-utama" aria-label="Menu utama">' +
    menu +
    "</nav>" +
    '<div class="kepala__kanan">' +
    '<a class="bulat" href="katalog.html" aria-label="Cari produk">' +
    IKON.cari +
    "</a>" +
    tombolDesa +
    '<button class="tombol-menu" type="button" aria-expanded="false" aria-controls="menu-utama">Menu</button>' +
    "</div></div></header>"
  );
}

function susunKaki() {
  const jelajah = HALAMAN.map(
    (h) => '<li><a href="' + h.url + '">' + h.nama + "</a></li>",
  ).join("");

  const kategori = KATEGORI.map(
    (k) =>
      '<li><a href="katalog.html?k=' +
      encodeURIComponent(k.id) +
      '">' +
      aman(k.nama) +
      "</a></li>",
  ).join("");

  const kontak = ["<li>" + aman(DESA.alamat) + "</li>"];
  if (nomorSiap(DESA.waDesa)) {
    kontak.push(
      '<li><a href="' +
        tautanWa(DESA.waDesa, "Halo Desa " + DESA.nama) +
        '" target="_blank" rel="noopener">WhatsApp desa</a></li>',
    );
  }
  if (DESA.email) {
    kontak.push(
      '<li><a href="mailto:' +
        aman(DESA.email) +
        '">' +
        aman(DESA.email) +
        "</a></li>",
    );
  }
  if (DESA.maps) {
    kontak.push(
      '<li><a href="' +
        aman(DESA.maps) +
        '" target="_blank" rel="noopener">Lihat di Google Maps</a></li>',
    );
  }

  const sosial = [
    DESA.instagram ? ["ig", DESA.instagram, "Instagram"] : null,
    DESA.facebook ? ["fb", DESA.facebook, "Facebook"] : null,
    nomorSiap(DESA.waDesa)
      ? ["wa", tautanWa(DESA.waDesa, "Halo Desa " + DESA.nama), "WhatsApp"]
      : null,
    DESA.email ? ["surat", "mailto:" + DESA.email, "Email"] : null,
  ]
    .filter(Boolean)
    .map(
      (s) =>
        '<a href="' +
        aman(s[1]) +
        '" target="_blank" rel="noopener" aria-label="' +
        s[2] +
        '">' +
        IKON[s[0]] +
        "</a>",
    )
    .join("");

  return (
    '<footer class="kaki" id="kontak"><div class="blok__isi kaki__isi">' +
    '<div class="kaki__atas">' +
    '<div class="kaki__merek">' +
    '<div class="merek">' +
    '<span class="kaki__lambang" aria-hidden="true">' +
    IKON.daun +
    "</span>" +
    '<span class="merek__teks"><span class="kaki__nama">DESA ' +
    aman(DESA.nama.toUpperCase()) +
    '</span><span class="kaki__sub">Kecamatan ' +
    aman(DESA.kecamatan) +
    ", Kabupaten " +
    aman(DESA.kabupaten) +
    "</span></span></div>" +
    '<p class="kaki__teks">' +
    aman(DESA.deskripsiKaki) +
    "</p></div>" +
    '<div class="kaki__kolom">' +
    "<div><h3>Jelajahi</h3><ul>" +
    jelajah +
    "</ul></div>" +
    "<div><h3>Kategori</h3><ul>" +
    kategori +
    "</ul></div>" +
    "</div>" +
    '<div class="kaki__alamat"><h3>Kontak Kami</h3><ul>' +
    kontak.join("") +
    "</ul></div>" +
    "</div>" +
    '<div class="kaki__bawah"><span>&copy; ' +
    new Date().getFullYear() +
    " Pemerintah Desa " +
    aman(DESA.nama) +
    ". Dibangun bersama KKM UMC 2026.</span>" +
    '<div class="sosial">' +
    sosial +
    "</div></div>" +
    "</div></footer>"
  );
}

function pasangKerangka() {
  document.body.insertAdjacentHTML("afterbegin", susunKepala());
  document.body.insertAdjacentHTML("beforeend", susunKaki());

  const tombol = $(".tombol-menu");
  const menu = $(".menu");
  if (tombol && menu) {
    tombol.addEventListener("click", () => {
      const buka = menu.classList.toggle("buka");
      tombol.setAttribute("aria-expanded", String(buka));
    });
  }
}

/* ---------- Kartu ---------- */

function kartuProduk(p, kecil) {
  const u = cariUmkm(p.umkm);
  return (
    '<a class="kartu' +
    (kecil ? " kartu--kecil" : "") +
    '" href="produk.html?p=' +
    encodeURIComponent(p.slug) +
    '">' +
    gambar(p.foto, p.nama, "kartu__gambar kartu__gambar--tinggi") +
    '<div class="kartu__badan kartu__badan--rapat">' +
    '<span class="kartu__kategori">' +
    aman(namaKategori(p.kategori)) +
    "</span>" +
    '<span class="kartu__nama kartu__nama--kecil">' +
    aman(p.nama) +
    "</span>" +
    '<span class="kartu__ket">' +
    aman(u ? u.nama : "") +
    "</span>" +
    '<span class="kartu__harga">' +
    aman(p.harga) +
    "</span>" +
    "</div>" +
    '<div class="kartu__kaki"><span>' +
    aman(p.satuan) +
    '</span><span class="kartu__aksi">Detail Produk' +
    IKON.panah +
    "</span></div>" +
    "</a>"
  );
}

function kartuUmkm(u) {
  const jumlah = produkMilik(u.slug).length;
  return (
    '<a class="kartu" href="umkm.html?u=' +
    encodeURIComponent(u.slug) +
    '">' +
    gambar(u.foto, u.nama, "kartu__gambar") +
    '<div class="kartu__badan">' +
    '<div class="kartu__baris"><span class="tanda">' +
    aman(namaKategori(u.kategori)) +
    "</span>" +
    bintang(u.penilaian) +
    "</div>" +
    '<span class="kartu__nama">' +
    aman(u.nama) +
    "</span>" +
    '<span class="kartu__ket">Pemilik: ' +
    aman(u.pemilik) +
    "</span>" +
    "</div>" +
    '<div class="kartu__kaki"><span>' +
    jumlah +
    ' Produk</span><span class="kartu__aksi">Kunjungi Profil' +
    IKON.panah +
    "</span></div>" +
    "</a>"
  );
}

function kartuWisata(w) {
  return (
    '<a class="kartu" href="destinasi.html?w=' +
    encodeURIComponent(w.slug) +
    '">' +
    gambar(w.foto, w.nama, "kartu__gambar") +
    '<div class="kartu__badan">' +
    '<div class="kartu__baris"><span class="tanda">' +
    aman(w.jenis || "Wisata Desa") +
    "</span>" +
    bintang(w.penilaian) +
    "</div>" +
    '<span class="kartu__nama">' +
    aman(w.nama) +
    "</span>" +
    '<span class="kartu__ket">' +
    aman(w.alamat) +
    "</span>" +
    "</div>" +
    '<div class="kartu__kaki"><span>' +
    aman(w.tiket || "") +
    '</span><span class="kartu__aksi">Lihat Detail' +
    IKON.panah +
    "</span></div>" +
    "</a>"
  );
}

/* ---------- Bagian bersama ---------- */

function bagianTestimoni() {
  const t = TESTIMONI;
  if (!t || !t.teks) return "";
  return (
    '<section class="blok bagian--hijau"><div class="blok__isi testimoni">' +
    gambar(t.foto, t.nama, "testimoni__foto", "Foto warga") +
    '<div class="testimoni__kanan">' +
    '<span class="testimoni__kutip" aria-hidden="true">' +
    IKON.kutip +
    "</span>" +
    '<blockquote class="testimoni__teks">' +
    aman(t.teks) +
    "</blockquote>" +
    '<div><div class="testimoni__nama">' +
    aman(t.nama) +
    '</div><div class="testimoni__peran">' +
    aman(t.peran) +
    "</div></div>" +
    "</div></div></section>"
  );
}

function bagianAjakan() {
  const a = DESA.ajakan || {};
  const tombolWa = nomorSiap(DESA.waDesa)
    ? '<a class="tombol tombol--putih" href="' +
      tautanWa(DESA.waDesa, "Halo, saya ingin mendaftarkan UMKM saya.") +
      '" target="_blank" rel="noopener">' +
      IKON.wa +
      "Daftarkan UMKM</a>"
    : "";
  return (
    '<section class="blok ajakan"><div class="blok__isi ajakan__isi">' +
    "<h2>" +
    aman(a.judul || "") +
    "</h2><p>" +
    aman(a.teks || "") +
    "</p>" +
    '<div class="ajakan__aksi">' +
    '<a class="tombol tombol--jingga" href="katalog.html">Lihat Katalog Lengkap</a>' +
    tombolWa +
    "</div></div></section>"
  );
}

/* ---------- Halaman: beranda ---------- */

function halamanBeranda() {
  const isi = $("#isi");

  const angka = [
    ["toko", UMKM.length, "UMKM Terdaftar", "Dihitung dari katalog"],
    ["kotak", PRODUK.length, "Produk Tercatat", "Dihitung dari katalog"],
    ["orang", DESA.jiwa, "Jumlah Penduduk", DESA.catatanAngka],
    [
      "peta",
      DESA.wilayah,
      "Pembagian Wilayah",
      "Kecamatan " + DESA.kecamatan,
    ],
  ]
    .map(
      (a) =>
        '<div class="angka__sel"><span class="angka__ikon" aria-hidden="true">' +
        IKON[a[0]] +
        '</span><div><div class="angka__nilai">' +
        aman(a[1]) +
        '</div><div class="angka__nama">' +
        aman(a[2]) +
        '</div><div class="angka__ket">' +
        aman(a[3]) +
        "</div></div></div>",
    )
    .join("");

  const kategori = KATEGORI.map((k) => {
    const gaya = IKON_KATEGORI[k.id] || IKON_KATEGORI.kerajinan;
    const jumlah = PRODUK.filter((p) => p.kategori === k.id).length;
    return (
      '<a class="kategori__kartu" href="katalog.html?k=' +
      encodeURIComponent(k.id) +
      '"><span class="kategori__ikon" style="background:' +
      gaya.latar +
      '" aria-hidden="true">' +
      IKON[gaya.ikon] +
      '</span><span class="kategori__nama">' +
      aman(k.nama) +
      '</span><span class="kategori__jumlah">' +
      jumlah +
      "</span>" +
      IKON.panah +
      "</a>"
    );
  }).join("");

  const unggulan = PRODUK.filter((p) => p.unggulan);
  const produkTampil = (unggulan.length ? unggulan : PRODUK).slice(0, 4);

  isi.innerHTML =
    /* Hero */
    '<section class="blok hero"><div class="blok__isi hero__isi">' +
    '<div class="hero__kiri">' +
    '<span class="pil">' +
    aman(DESA.sapaan) +
    "</span>" +
    "<div><h1>" +
    aman(DESA.judulHero) +
    '</h1><p class="hero__teks">' +
    aman(DESA.paragrafHero) +
    "</p></div>" +
    '<div class="hero__aksi">' +
    '<a class="tombol tombol--jingga" href="katalog.html">Lihat Katalog Produk</a>' +
    '<a class="tombol tombol--garis" href="#profil">Tentang Desa</a>' +
    "</div></div>" +
    gambar(
      DESA.fotoHero,
      "Suasana Desa " + DESA.nama,
      "hero__gambar",
      "Ganti kotak ini dengan foto desa (assets/img/desa.jpg)",
    ) +
    "</div></section>" +
    /* Angka */
    '<section class="blok angka"><div class="blok__isi angka__isi">' +
    angka +
    "</div></section>" +
    /* Kategori */
    '<section class="blok"><div class="blok__isi pad-20-10">' +
    '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
    '<h2 class="judul-24">Jelajahi Kategori Produk</h2>' +
    "<p>Angka di sebelah kanan menunjukkan jumlah produk yang sudah terdaftar.</p>" +
    "</div></div>" +
    '<div class="kategori">' +
    kategori +
    "</div></div></section>" +
    /* UMKM unggulan */
    '<section class="blok"><div class="blok__isi pad-16">' +
    '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
    '<h2 class="judul-32">UMKM Desa ' +
    aman(DESA.nama) +
    "</h2>" +
    "<p>Setiap usaha dijalankan langsung oleh warga. Pesanan diterima sendiri oleh pemiliknya.</p>" +
    '</div><a class="tautan-jingga" href="katalog.html">Lihat Semua UMKM' +
    IKON.panah +
    "</a></div>" +
    '<div class="kisi">' +
    UMKM.slice(0, 4).map(kartuUmkm).join("") +
    "</div></div></section>" +
    /* Produk pilihan */
    '<section class="blok bagian--krem"><div class="blok__isi pad-16">' +
    '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
    '<h2 class="judul-32">Produk Pilihan</h2>' +
    "<p>Harga yang tertulis adalah kisaran. Harga pasti dibicarakan langsung dengan pemilik lewat WhatsApp.</p>" +
    '</div><a class="tautan-jingga" href="katalog.html">Lihat Semua Produk' +
    IKON.panah +
    "</a></div>" +
    '<div class="kisi">' +
    produkTampil.map((p) => kartuProduk(p, true)).join("") +
    "</div></div></section>" +
    /* Wisata desa */
    (WISATA.length
      ? '<section class="blok bagian--putih"><div class="blok__isi pad-16">' +
        '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
        '<h2 class="judul-32">Wisata Desa ' +
        aman(DESA.nama) +
        "</h2>" +
        "<p>Selain UMKM, Desa " +
        aman(DESA.nama) +
        " juga punya tempat wisata yang bisa dikunjungi.</p>" +
        '</div><a class="tautan-jingga" href="wisata.html">Lihat Semua Wisata' +
        IKON.panah +
        "</a></div>" +
        '<div class="kisi">' +
        WISATA.slice(0, 4).map(kartuWisata).join("") +
        "</div></div></section>"
      : "") +
    /* Profil desa */
    '<section class="blok bagian--putih" id="profil"><div class="blok__isi hero__isi">' +
    '<div class="hero__kiri">' +
    '<span class="pil pil--jingga">Tentang Desa ' +
    aman(DESA.nama) +
    "</span>" +
    '<div><h2 class="judul-32">' +
    aman(DESA.judulProfil) +
    '</h2><p class="hero__teks">' +
    aman(DESA.paragrafProfil) +
    "</p></div>" +
    '<dl class="profil__meta">' +
    "<div><dt>Alamat sekretariat</dt><dd>" +
    aman(DESA.alamat) +
    "</dd></div>" +
    "<div><dt>Jumlah penduduk</dt><dd>" +
    aman(DESA.jiwa) +
    " jiwa</dd></div>" +
    "<div><dt>Pembagian wilayah</dt><dd>" +
    aman(DESA.wilayah) +
    "</dd></div>" +
    "</dl></div>" +
    gambar(
      DESA.fotoProfil,
      "Balai Desa " + DESA.nama,
      "hero__gambar",
      "Ganti kotak ini dengan foto balai desa (assets/img/profil.jpg)",
    ) +
    "</div></section>" +
    bagianTestimoni() +
    bagianAjakan();
}

/* ---------- Halaman: katalog ---------- */

function halamanKatalog() {
  const isi = $("#isi");
  let kategoriAktif = new URLSearchParams(location.search).get("k") || "semua";
  let kataCari = "";

  const cip = [{ id: "semua", nama: "Semua" }]
    .concat(KATEGORI)
    .map(
      (k) =>
        '<button class="cip" type="button" data-k="' +
        aman(k.id) +
        '" aria-pressed="' +
        (k.id === kategoriAktif) +
        '">' +
        aman(k.nama) +
        "</button>",
    )
    .join("");

  isi.innerHTML =
    '<section class="blok"><div class="blok__isi pad-16">' +
    '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
    '<h1 class="judul-32">Katalog Produk</h1>' +
    "<p>Ketik nama produk atau nama usaha untuk mencari. Semua harga yang tertulis adalah kisaran.</p>" +
    "</div></div>" +
    '<div class="saring">' +
    '<label class="lompat" for="cari">Cari produk</label>' +
    '<div class="saring__kotak">' +
    IKON.cari +
    '<input class="saring__cari" id="cari" type="search" placeholder="Cari gabin, opak, bibit…" autocomplete="off"></div>' +
    '<div class="cip-baris" id="cip">' +
    cip +
    "</div></div>" +
    '<p class="jumlah-hasil" id="jumlah-hasil"></p>' +
    '<div class="kisi" id="hasil"></div>' +
    "</div></section>" +
    '<section class="blok bagian--krem"><div class="blok__isi pad-16">' +
    '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
    '<h2 class="judul-28">Semua UMKM</h2>' +
    "<p>Buka profil usaha untuk melihat seluruh produknya.</p>" +
    "</div></div>" +
    '<div class="kisi">' +
    UMKM.map(kartuUmkm).join("") +
    "</div></div></section>" +
    bagianAjakan();

  const kotakHasil = $("#hasil");
  const kotakJumlah = $("#jumlah-hasil");
  const kotakCip = $("#cip");

  function gambarUlang() {
    const kata = kataCari.trim().toLowerCase();
    const hasil = PRODUK.filter((p) => {
      const u = cariUmkm(p.umkm);
      const cocokKategori =
        kategoriAktif === "semua" || p.kategori === kategoriAktif;
      const cocokKata =
        !kata ||
        p.nama.toLowerCase().includes(kata) ||
        (u && u.nama.toLowerCase().includes(kata)) ||
        (p.deskripsi || "").toLowerCase().includes(kata);
      return cocokKategori && cocokKata;
    });

    kotakJumlah.textContent =
      "Menampilkan " + hasil.length + " dari " + PRODUK.length + " produk";
    kotakHasil.innerHTML = hasil.length
      ? hasil.map((p) => kartuProduk(p, true)).join("")
      : '<p class="kosong">Tidak ada produk yang cocok. Coba kata lain atau pilih kategori Semua.</p>';
  }

  kotakCip.addEventListener("click", (e) => {
    const t = e.target.closest(".cip");
    if (!t) return;
    kategoriAktif = t.dataset.k;
    kotakCip
      .querySelectorAll(".cip")
      .forEach((c) =>
        c.setAttribute("aria-pressed", String(c.dataset.k === kategoriAktif)),
      );
    gambarUlang();
  });

  $("#cari").addEventListener("input", (e) => {
    kataCari = e.target.value;
    gambarUlang();
  });

  gambarUlang();
}

/* ---------- Halaman: daftar wisata ---------- */

function halamanWisata() {
  const isi = $("#isi");

  isi.innerHTML =
    '<section class="blok"><div class="blok__isi pad-16">' +
    '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
    '<h1 class="judul-32">Wisata Desa ' +
    aman(DESA.nama) +
    "</h1>" +
    "<p>Tempat wisata yang bisa dikunjungi di Desa " +
    aman(DESA.nama) +
    " dan sekitarnya.</p>" +
    "</div></div>" +
    (WISATA.length
      ? '<div class="kisi">' + WISATA.map(kartuWisata).join("") + "</div>"
      : '<p class="kosong">Data wisata belum ditambahkan.</p>') +
    "</div></section>" +
    bagianAjakan();
}

/* ---------- Halaman: detail wisata ---------- */

function cariWisata(slug) {
  return WISATA.find((w) => w.slug === slug);
}

function halamanDestinasi() {
  const isi = $("#isi");
  const w = cariWisata(new URLSearchParams(location.search).get("w"));

  if (!w) {
    isi.innerHTML =
      '<section class="blok"><div class="blok__isi pad-20">' +
      '<p class="kosong">Wisata tidak ditemukan. <a href="wisata.html">Kembali ke daftar wisata</a>.</p>' +
      "</div></section>";
    return;
  }

  document.title = w.nama + " — Wisata Desa " + DESA.nama;

  const pesan =
    "Halo, saya ingin bertanya tentang " +
    w.nama +
    " di Desa " +
    DESA.nama +
    ".";
  const nomorKontak = w.kontak || DESA.waDesa;

  const tombolWa = nomorSiap(nomorKontak)
    ? '<a class="tombol tombol--hijau tombol--penuh" href="' +
      tautanWa(nomorKontak, pesan) +
      '" target="_blank" rel="noopener">' +
      IKON.wa +
      "Tanya via WhatsApp</a>"
    : '<span class="tombol tombol--mati tombol--penuh">Nomor WhatsApp belum diisi</span>';

  const galeri = (w.galeri || []).length
    ? '<section class="blok"><div class="blok__isi pad-20-10">' +
      '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
      '<h2 class="judul-24">Suasana Lokasi</h2>' +
      "<p>" +
      aman(w.keteranganGaleri || "") +
      "</p></div></div>" +
      '<div class="galeri">' +
      w.galeri
        .map((g) => gambar(g.foto, g.judul, "", g.judul || "Foto lokasi"))
        .join("") +
      "</div></div></section>"
    : "";

  const kontakBaris = [
    ["jam", "Jam Buka", w.jamBuka],
    ["tiket", "Tiket Masuk", w.tiket],
    ["peta", "Alamat", w.alamat],
  ]
    .filter((b) => b[2])
    .map(
      (b) =>
        '<div class="kontak-baris">' +
        IKON[b[0]] +
        '<div><div class="kontak-baris__label">' +
        b[1] +
        '</div><div class="kontak-baris__nilai">' +
        aman(b[2]) +
        "</div></div></div>",
    )
    .join("");

  isi.innerHTML =
    '<div class="blok"><div class="blok__isi remah">' +
    '<a href="index.html">Beranda</a>' +
    IKON.panah +
    '<a href="wisata.html">Wisata</a>' +
    IKON.panah +
    "<strong>" +
    aman(w.nama) +
    "</strong></div></div>" +
    /* Kepala profil */
    '<section class="blok bagian--putih"><div class="blok__isi profil">' +
    gambar(w.foto, w.nama, "profil__gambar") +
    '<div class="profil__kanan">' +
    '<div class="rinci__baris">' +
    '<span class="pil pil--jingga">' +
    aman(w.jenis || "Wisata Desa") +
    "</span>" +
    '<span class="pil pil--polos">Terdaftar di Desa ' +
    aman(DESA.nama) +
    "</span>" +
    bintang(w.penilaian) +
    "</div>" +
    '<h1 class="profil__judul">' +
    aman(w.nama) +
    "</h1>" +
    '<p class="hero__teks" style="margin:0">' +
    aman(w.deskripsi) +
    "</p>" +
    "</div></div></section>" +
    galeri +
    /* Lokasi & kontak */
    '<section class="blok bagian--krem"><div class="blok__isi lokasi">' +
    '<div class="lokasi__kiri">' +
    '<h2 class="lokasi__judul">Lokasi</h2>' +
    gambar(
      w.fotoLokasi,
      "Lokasi " + w.nama,
      "lokasi__peta",
      "Tangkapan layar peta bisa diletakkan di sini",
    ) +
    '<span class="lokasi__alamat">' +
    IKON.peta +
    aman(w.alamat) +
    "</span></div>" +
    '<div class="kontak-kartu">' +
    "<h2>Detail Kunjungan &amp; Kontak</h2>" +
    '<div class="kontak-daftar">' +
    kontakBaris +
    "</div>" +
    tombolWa +
    "</div></div></section>";
}

/* ---------- Halaman: profil UMKM ---------- */

function halamanUmkm() {
  const isi = $("#isi");
  const u = cariUmkm(new URLSearchParams(location.search).get("u"));

  if (!u) {
    isi.innerHTML =
      '<section class="blok"><div class="blok__isi pad-20">' +
      '<p class="kosong">UMKM tidak ditemukan. <a href="katalog.html">Kembali ke katalog</a>.</p>' +
      "</div></section>";
    return;
  }

  document.title = u.nama + " — UMKM Desa " + DESA.nama;
  const daftar = produkMilik(u.slug);

  const pesan =
    sapaan(u.pemilik) +
    ", saya melihat " +
    u.nama +
    " di katalog UMKM Desa " +
    DESA.nama +
    ". Saya ingin bertanya soal produknya.";

  const tombolWa = nomorSiap(u.wa)
    ? '<a class="tombol tombol--hijau tombol--penuh" href="' +
      tautanWa(u.wa, pesan) +
      '" target="_blank" rel="noopener">' +
      IKON.wa +
      "Hubungi via WhatsApp</a>"
    : '<span class="tombol tombol--mati tombol--penuh">Nomor WhatsApp belum diisi</span>';

  const kontakBaris = [
    ["jam", "Jam Buka", u.jamBuka],
    ["truk", "Pengiriman", u.pengiriman],
    ["peta", "Alamat", u.alamat],
  ]
    .filter((b) => b[2])
    .map(
      (b) =>
        '<div class="kontak-baris">' +
        IKON[b[0]] +
        '<div><div class="kontak-baris__label">' +
        b[1] +
        '</div><div class="kontak-baris__nilai">' +
        aman(b[2]) +
        "</div></div></div>",
    )
    .join("");

  isi.innerHTML =
    '<div class="blok"><div class="blok__isi remah">' +
    '<a href="index.html">Beranda</a>' +
    IKON.panah +
    '<a href="katalog.html">Katalog</a>' +
    IKON.panah +
    "<strong>" +
    aman(u.nama) +
    "</strong></div></div>" +
    /* Kepala profil */
    '<section class="blok bagian--putih"><div class="blok__isi profil">' +
    gambar(u.foto, u.nama, "profil__gambar") +
    '<div class="profil__kanan">' +
    '<div class="rinci__baris">' +
    '<span class="pil pil--jingga">' +
    aman(namaKategori(u.kategori)) +
    "</span>" +
    '<span class="pil pil--polos">Terdaftar di Desa ' +
    aman(DESA.nama) +
    "</span>" +
    bintang(u.penilaian) +
    "</div>" +
    '<h1 class="profil__judul">' +
    aman(u.nama) +
    "</h1>" +
    '<p class="hero__teks" style="margin:0">' +
    aman(u.deskripsi) +
    "</p>" +
    '<dl class="profil__meta">' +
    "<div><dt>Pemilik</dt><dd>" +
    aman(u.pemilik) +
    "</dd></div>" +
    "<div><dt>Mulai berjalan</dt><dd>" +
    aman(u.berdiri) +
    "</dd></div>" +
    "<div><dt>Jumlah pekerja</dt><dd>" +
    aman(u.pekerja) +
    "</dd></div>" +
    "<div><dt>Produk terdaftar</dt><dd>" +
    daftar.length +
    " produk</dd></div>" +
    "</dl></div></div></section>" +
    /* Katalog produk UMKM */
    '<section class="blok"><div class="blok__isi pad-60">' +
    '<div class="kepala-bagian"><div class="kepala-bagian__kiri">' +
    '<h2 class="judul-28">Produk ' +
    aman(u.nama) +
    "</h2>" +
    "<p>Harga yang tertulis adalah kisaran; harga pasti dikonfirmasi lewat WhatsApp.</p>" +
    "</div></div>" +
    (daftar.length
      ? '<div class="kisi kisi--3">' +
        daftar.map((p) => kartuProduk(p, true)).join("") +
        "</div>"
      : '<p class="kosong">Produk belum didaftarkan.</p>') +
    "</div></section>" +
    /* Lokasi & kontak */
    '<section class="blok bagian--krem"><div class="blok__isi lokasi">' +
    '<div class="lokasi__kiri">' +
    '<h2 class="lokasi__judul">Lokasi Rumah Produksi</h2>' +
    gambar(
      u.fotoLokasi,
      "Lokasi " + u.nama,
      "lokasi__peta",
      "Tangkapan layar peta bisa diletakkan di sini",
    ) +
    '<span class="lokasi__alamat">' +
    IKON.peta +
    aman(u.alamat) +
    "</span></div>" +
    '<div class="kontak-kartu">' +
    "<h2>Detail Operasional &amp; Kontak</h2>" +
    '<div class="kontak-daftar">' +
    kontakBaris +
    "</div>" +
    tombolWa +
    "</div></div></section>";
}

/* ---------- Halaman: detail produk ---------- */

function halamanProduk() {
  const isi = $("#isi");
  const p = PRODUK.find(
    (x) => x.slug === new URLSearchParams(location.search).get("p"),
  );

  if (!p) {
    isi.innerHTML =
      '<section class="blok"><div class="blok__isi pad-20">' +
      '<p class="kosong">Produk tidak ditemukan. <a href="katalog.html">Kembali ke katalog</a>.</p>' +
      "</div></section>";
    return;
  }

  const u = cariUmkm(p.umkm) || {};
  document.title = p.nama + " — UMKM Desa " + DESA.nama;

  const pesan =
    sapaan(u.pemilik) +
    ", saya ingin memesan " +
    p.nama +
    " (" +
    p.harga +
    " " +
    p.satuan +
    ") dari katalog UMKM Desa " +
    DESA.nama +
    ". Apakah masih tersedia?";

  const tombolWa = nomorSiap(u.wa)
    ? '<a class="tombol tombol--hijau tombol--penuh" href="' +
      tautanWa(u.wa, pesan) +
      '" target="_blank" rel="noopener">' +
      IKON.wa +
      "Pesan via WhatsApp</a>"
    : '<span class="tombol tombol--mati tombol--penuh">Nomor WhatsApp belum diisi</span>';

  /* Galeri: foto utama + deretan jempol bila ada foto tambahan */
  const semuaFoto = [p.foto].concat(p.galeri || []).filter(Boolean);
  const jempol =
    semuaFoto.length > 1
      ? '<div class="jempol">' +
        semuaFoto
          .slice(0, 4)
          .map(
            (f, i) =>
              '<button class="jempol__satu" type="button" data-foto="' +
              aman(f) +
              '" aria-current="' +
              (i === 0) +
              '">' +
              gambar(f, p.nama, "") +
              "</button>",
          )
          .join("") +
        "</div>"
      : "";

  const spek = (p.rincian || [])
    .map(
      (r) =>
        '<div class="spek__baris"><span class="spek__label">' +
        aman(r[0]) +
        '</span><span class="spek__nilai">' +
        aman(r[1]) +
        "</span></div>",
    )
    .join("");

  const ulasan = (p.ulasan || []).length
    ? '<section class="blok bagian--krem"><div class="blok__isi pad-60-20">' +
      '<h2 class="judul-24" style="margin-bottom:24px">Ulasan Pembeli</h2>' +
      '<div class="ulasan">' +
      p.ulasan
        .map(
          (r) =>
            '<div class="ulasan__kartu"><div class="ulasan__kepala">' +
            '<div><div class="ulasan__nama">' +
            aman(r.nama) +
            '</div><div class="ulasan__meta">' +
            aman(r.asal) +
            "</div></div>" +
            bintang(r.penilaian) +
            "</div>" +
            '<p class="ulasan__teks">' +
            aman(r.teks) +
            "</p></div>",
        )
        .join("") +
      "</div></div></section>"
    : "";

  const lainnya = produkMilik(p.umkm).filter((x) => x.slug !== p.slug);

  isi.innerHTML =
    '<div class="blok"><div class="blok__isi remah">' +
    '<a href="index.html">Beranda</a>' +
    IKON.panah +
    '<a href="umkm.html?u=' +
    encodeURIComponent(p.umkm) +
    '">' +
    aman(u.nama || "") +
    "</a>" +
    IKON.panah +
    "<strong>" +
    aman(p.nama) +
    "</strong></div></div>" +
    '<div class="blok"><div class="blok__isi rinci">' +
    '<div class="rinci__galeri">' +
    gambar(p.foto, p.nama, "rinci__utama") +
    jempol +
    "</div>" +
    '<div class="rinci__kanan">' +
    '<div class="rinci__kepala">' +
    '<div class="rinci__baris"><span class="tanda">' +
    aman(namaKategori(p.kategori)) +
    "</span><span>UMKM: " +
    aman(u.nama || "") +
    "</span>" +
    bintang(p.penilaian) +
    "</div>" +
    '<h1 class="rinci__judul">' +
    aman(p.nama) +
    "</h1>" +
    '<div class="rinci__harga">' +
    aman(p.harga) +
    ' <span class="rinci__satuan">' +
    aman(p.satuan) +
    "</span></div>" +
    (perluDiisi(p.harga)
      ? '<p class="peringatan">Harga produk ini belum diisi pengelola. Tanyakan langsung ke pemilik.</p>'
      : "") +
    "</div>" +
    '<div class="blok-teks"><h2>Deskripsi Produk</h2><p>' +
    aman(p.deskripsi) +
    "</p></div>" +
    (spek ? '<div class="spek">' + spek + "</div>" : "") +
    '<div class="aksi">' +
    tombolWa +
    '<button class="tombol tombol--garis tombol--penuh" type="button" id="bagikan">' +
    IKON.bagikan +
    "Bagikan Produk Ini</button>" +
    '<a class="tombol tombol--garis tombol--penuh" href="umkm.html?u=' +
    encodeURIComponent(p.umkm) +
    '">Lihat Profil ' +
    aman(u.nama || "Penjual") +
    "</a></div>" +
    "</div></div></div>" +
    ulasan +
    (lainnya.length
      ? '<section class="blok"><div class="blok__isi pad-20">' +
        '<h2 class="judul-24" style="margin-bottom:24px">Produk Lainnya dari ' +
        aman(u.nama || "") +
        '</h2><div class="kisi kisi--3">' +
        lainnya.map((x) => kartuProduk(x, true)).join("") +
        "</div></div></section>"
      : "");

  /* Ganti foto utama saat jempol ditekan */
  const utama = $(".rinci__utama");
  isi.querySelectorAll(".jempol__satu").forEach((t) => {
    t.addEventListener("click", () => {
      isi
        .querySelectorAll(".jempol__satu")
        .forEach((x) => x.setAttribute("aria-current", "false"));
      t.setAttribute("aria-current", "true");
      utama.innerHTML =
        '<img src="assets/img/' +
        t.dataset.foto +
        '" alt="' +
        aman(p.nama) +
        '">';
    });
  });

  /* Batang WhatsApp menempel di bawah layar HP */
  if (nomorSiap(u.wa)) {
    document.body.classList.add("ada-batang");
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="batang-wa"><a class="tombol tombol--hijau tombol--penuh" href="' +
        tautanWa(u.wa, pesan) +
        '" target="_blank" rel="noopener">' +
        IKON.wa +
        "Pesan via WhatsApp</a></div>",
    );
  }

  const tombolBagi = $("#bagikan");
  tombolBagi.addEventListener("click", async () => {
    const data = {
      title: p.nama,
      text: p.nama + " — " + p.harga + " " + p.satuan,
      url: location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(location.href);
        const semula = tombolBagi.innerHTML;
        tombolBagi.textContent = "Tautan tersalin";
        setTimeout(() => (tombolBagi.innerHTML = semula), 2000);
      }
    } catch (e) {
      /* dibatalkan pengguna */
    }
  });
}

/* ---------- Penjalan ---------- */

document.addEventListener("DOMContentLoaded", () => {
  pasangKerangka();
  const halaman = document.body.dataset.halaman;
  if (halaman === "beranda") halamanBeranda();
  if (halaman === "katalog") halamanKatalog();
  if (halaman === "umkm") halamanUmkm();
  if (halaman === "produk") halamanProduk();
  if (halaman === "wisata") halamanWisata();
  if (halaman === "destinasi") halamanDestinasi();
});
