/* ============================================================
   Skema & transformasi: baris CSV (per tab Google Sheet) -> bentuk
   data yang dipakai situs (sama seperti isi data/katalog.js).

   Dipisah dari scripts/sheet-ke-katalog.mjs supaya bisa diuji tanpa
   jaringan (lihat scripts/uji-roundtrip.mjs) dan supaya nama kolom
   hanya didefinisikan SATU kali di berkas ini.

   Kalau menambah kolom baru, ubah di sini SAJA lalu cocokkan dengan
   PANDUAN-SHEET.md.
   ============================================================ */

export const JUMLAH_GALERI = 4;
export const JUMLAH_RINCIAN = 6;

function t(nilai) {
  return (nilai || "").toString().trim();
}

function keAngka(nilai) {
  return Number(nilai) || 0;
}

function keBoolean(nilai) {
  return /^(true|ya|yes|1)$/i.test(t(nilai));
}

/** Google Sheets kadang mengubah angka panjang (nomor WA) jadi notasi
 *  ilmiah kalau sel diformat "Angka", bukan "Teks Biasa". Kalau ini
 *  lolos tanpa dicek, tombol WhatsApp akan tertaut ke nomor yang salah
 *  tanpa ada yang sadar. */
function sepertiNotasiIlmiah(nilai) {
  return /^[\d.]+E\+?\d+$/i.test(t(nilai));
}

function nomorAman(nilai, label, catat) {
  const v = t(nilai);
  if (!v) return "";
  if (sepertiNotasiIlmiah(v)) {
    catat.peringatan.push(
      label +
        ": nilainya '" +
        v +
        "' -- sepertinya berubah jadi notasi ilmiah karena format sel " +
        "Angka. Ubah format kolom itu ke Format > Angka > Teks biasa " +
        "di Google Sheet, lalu ketik ulang nomornya.",
    );
    return "";
  }
  return v;
}

function galeriEmpat(row, prefix) {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_GALERI; i++) {
    const judul = t(row[prefix + i + "_judul"]);
    const foto = t(row[prefix + i + "_foto"]);
    if (judul || foto) hasil.push({ judul, foto });
  }
  return hasil;
}

function galeriProduk(row) {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_GALERI; i++) {
    const f = t(row["galeri" + i]);
    if (f) hasil.push(f);
  }
  return hasil;
}

function rincianEnam(row) {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_RINCIAN; i++) {
    const label = t(row["rincian" + i + "_label"]);
    const isi = t(row["rincian" + i + "_isi"]);
    if (label || isi) hasil.push([label, isi]);
  }
  return hasil;
}

/* ---------- DESA (tab key-value: kolom "kunci", "nilai") ---------- */

export const KUNCI_DESA = [
  "nama",
  "kecamatan",
  "kabupaten",
  "tagline",
  "sapaan",
  "judulHero",
  "paragrafHero",
  "alamat",
  "waDesa",
  "email",
  "maps",
  "instagram",
  "facebook",
  "fotoHero",
  "fotoProfil",
  "judulProfil",
  "paragrafProfil",
  "deskripsiKaki",
  "ajakan.judul",
  "ajakan.teks",
  "jiwa",
  "wilayah",
  "catatanAngka",
];

export function buatDesa(rows, catat) {
  const peta = {};
  rows.forEach((r) => {
    peta[t(r.kunci)] = r.nilai == null ? "" : r.nilai;
  });
  const ambil = (k) => t(peta[k]);
  return {
    nama: ambil("nama"),
    kecamatan: ambil("kecamatan"),
    kabupaten: ambil("kabupaten"),
    tagline: ambil("tagline"),
    sapaan: ambil("sapaan"),
    judulHero: ambil("judulHero"),
    paragrafHero: ambil("paragrafHero"),
    alamat: ambil("alamat"),
    waDesa: nomorAman(peta["waDesa"], "DESA.waDesa", catat),
    email: ambil("email"),
    maps: ambil("maps"),
    instagram: ambil("instagram"),
    facebook: ambil("facebook"),
    fotoHero: ambil("fotoHero"),
    fotoProfil: ambil("fotoProfil"),
    judulProfil: ambil("judulProfil"),
    paragrafProfil: ambil("paragrafProfil"),
    deskripsiKaki: ambil("deskripsiKaki"),
    ajakan: {
      judul: ambil("ajakan.judul"),
      teks: ambil("ajakan.teks"),
    },
    jiwa: ambil("jiwa"),
    wilayah: ambil("wilayah"),
    catatanAngka: ambil("catatanAngka"),
  };
}

/* ---------- TESTIMONI (satu baris data) ---------- */

export function buatTestimoni(rows) {
  const r = rows[0] || {};
  return {
    teks: t(r.teks),
    nama: t(r.nama),
    peran: t(r.peran),
    foto: t(r.foto),
  };
}

/* ---------- KATEGORI ---------- */

export function buatKategori(rows) {
  return rows
    .map((r) => ({ id: t(r.id), nama: t(r.nama) }))
    .filter((k) => k.id);
}

/* ---------- UMKM ---------- */

export function buatUmkm(rows, catat) {
  const dipakai = new Set();
  const hasil = [];
  rows.forEach((r, idx) => {
    const slug = t(r.slug);
    const nama = t(r.nama);
    if (!slug || !nama) {
      catat.peringatan.push(
        "UMKM baris " + (idx + 2) + ": slug/nama kosong, dilewati.",
      );
      return;
    }
    if (dipakai.has(slug)) {
      catat.galat.push("UMKM: slug ganda '" + slug + "'.");
      return;
    }
    dipakai.add(slug);
    hasil.push({
      slug,
      nama,
      kategori: t(r.kategori),
      pemilik: t(r.pemilik),
      berdiri: t(r.berdiri),
      pekerja: t(r.pekerja),
      wa: nomorAman(r.wa, "UMKM '" + slug + "' kolom wa", catat),
      alamat: t(r.alamat),
      foto: t(r.foto),
      penilaian: keAngka(r.penilaian),
      jamBuka: t(r.jamBuka),
      pengiriman: t(r.pengiriman),
      fotoLokasi: t(r.fotoLokasi),
      deskripsi: t(r.deskripsi),
    });
  });
  return hasil;
}

/* ---------- WISATA ---------- */

export function buatWisata(rows, catat) {
  const dipakai = new Set();
  const hasil = [];
  rows.forEach((r, idx) => {
    const slug = t(r.slug);
    const nama = t(r.nama);
    if (!slug || !nama) {
      catat.peringatan.push(
        "WISATA baris " + (idx + 2) + ": slug/nama kosong, dilewati.",
      );
      return;
    }
    if (dipakai.has(slug)) {
      catat.galat.push("WISATA: slug ganda '" + slug + "'.");
      return;
    }
    dipakai.add(slug);
    hasil.push({
      slug,
      nama,
      jenis: t(r.jenis),
      alamat: t(r.alamat),
      jamBuka: t(r.jamBuka),
      tiket: t(r.tiket),
      kontak: nomorAman(r.kontak, "WISATA '" + slug + "' kolom kontak", catat),
      foto: t(r.foto),
      fotoLokasi: t(r.fotoLokasi),
      penilaian: keAngka(r.penilaian),
      keteranganGaleri: t(r.keteranganGaleri),
      galeri: galeriEmpat(r, "galeri"),
      deskripsi: t(r.deskripsi),
    });
  });
  return hasil;
}

/* ---------- ULASAN (dikelompokkan per slug produk) ---------- */

export function buatUlasanMap(rows, catat) {
  const peta = new Map();
  rows.forEach((r, idx) => {
    const produk = t(r.produk);
    const nama = t(r.nama);
    const teks = t(r.teks);
    if (!produk || !nama || !teks) {
      catat.peringatan.push(
        "ULASAN baris " + (idx + 2) + ": produk/nama/teks kosong, dilewati.",
      );
      return;
    }
    if (!peta.has(produk)) peta.set(produk, []);
    peta.get(produk).push({
      nama,
      asal: t(r.asal),
      penilaian: keAngka(r.penilaian),
      teks,
    });
  });
  return peta;
}

/* ---------- PRODUK ---------- */

export function buatProduk(rows, catat, umkmSlugSet, ulasanMap) {
  const dipakai = new Set();
  const hasil = [];
  rows.forEach((r, idx) => {
    const slug = t(r.slug);
    const nama = t(r.nama);
    const umkm = t(r.umkm);
    if (!slug || !nama || !umkm) {
      catat.peringatan.push(
        "PRODUK baris " + (idx + 2) + ": slug/nama/umkm kosong, dilewati.",
      );
      return;
    }
    if (dipakai.has(slug)) {
      catat.galat.push("PRODUK: slug ganda '" + slug + "'.");
      return;
    }
    dipakai.add(slug);
    if (!umkmSlugSet.has(umkm)) {
      catat.peringatan.push(
        "PRODUK '" +
          slug +
          "': kolom umkm berisi '" +
          umkm +
          "', tidak cocok dengan slug mana pun di tab UMKM.",
      );
    }
    let harga = t(r.harga);
    if (!harga) harga = "GANTI: kisaran harga";
    hasil.push({
      slug,
      nama,
      umkm,
      kategori: t(r.kategori),
      harga,
      satuan: t(r.satuan),
      foto: t(r.foto),
      penilaian: keAngka(r.penilaian),
      galeri: galeriProduk(r),
      ulasan: ulasanMap.get(slug) || [],
      unggulan: keBoolean(r.unggulan),
      deskripsi: t(r.deskripsi),
      rincian: rincianEnam(r),
    });
  });
  return hasil;
}

/* ---------- Rakit semuanya jadi satu paket data ---------- */

export function rakitData({
  desaRows,
  testimoniRows,
  kategoriRows,
  umkmRows,
  produkRows,
  ulasanRows,
  wisataRows,
}) {
  const catat = { peringatan: [], galat: [] };

  const DESA = buatDesa(desaRows, catat);
  const TESTIMONI = buatTestimoni(testimoniRows);
  const KATEGORI = buatKategori(kategoriRows);
  const UMKM = buatUmkm(umkmRows, catat);
  const WISATA = buatWisata(wisataRows, catat);
  const umkmSlugSet = new Set(UMKM.map((u) => u.slug));
  const ulasanMap = buatUlasanMap(ulasanRows, catat);
  const PRODUK = buatProduk(produkRows, catat, umkmSlugSet, ulasanMap);

  return { data: { DESA, TESTIMONI, KATEGORI, UMKM, PRODUK, WISATA }, catat };
}

/* ---------- Tulis data/katalog.js dari paket data ---------- */

function konstanta(nama, nilai) {
  return "const " + nama + " = " + JSON.stringify(nilai, null, 2) + ";\n";
}

export function buatIsiBerkas({ DESA, TESTIMONI, KATEGORI, UMKM, PRODUK, WISATA }) {
  const kepala =
    "/* ============================================================\n" +
    "   DATA KATALOG UMKM DESA SADOMAS\n" +
    "   ------------------------------------------------------------\n" +
    "   BERKAS INI DIBUAT OTOMATIS oleh GitHub Actions dari Google\n" +
    "   Sheet, setiap kali Sheet berubah dan workflow berjalan.\n" +
    "\n" +
    "   JANGAN DIEDIT LANGSUNG DI SINI -- perubahan akan tertimpa pada\n" +
    "   jadwal berikutnya. Untuk mengubah isi katalog, edit Google\n" +
    "   Sheet-nya. Lihat PANDUAN-SHEET.md untuk kolom apa saja yang\n" +
    "   tersedia di tiap tab.\n" +
    "\n" +
    "   Riwayat perubahan bisa dilihat lewat tombol History pada\n" +
    "   berkas ini di GitHub.\n" +
    "   ============================================================ */\n\n";

  return (
    kepala +
    konstanta("DESA", DESA) +
    "\n" +
    konstanta("TESTIMONI", TESTIMONI) +
    "\n" +
    konstanta("KATEGORI", KATEGORI) +
    "\n" +
    konstanta("UMKM", UMKM) +
    "\n" +
    konstanta("PRODUK", PRODUK) +
    "\n" +
    konstanta("WISATA", WISATA)
  );
}
