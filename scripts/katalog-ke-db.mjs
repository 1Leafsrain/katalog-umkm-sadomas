#!/usr/bin/env node
/* ============================================================
   SEKALI PAKAI: membuat data/db/umkm.json, produk.json, wisata.json,
   promo.json, dan ulasan.json dari data/katalog.js yang sekarang --
   titik awal supaya isi yang sudah ada (kalau ada) tidak perlu diketik
   ulang manual lewat form admin setelah GitHub/Apps Script dipasang
   sebagai penyimpanan baru (menggantikan Google Sheet).

   Jalankan:  node scripts/katalog-ke-db.mjs

   Bentuk umkm.json/produk.json/wisata.json SAMA PERSIS dengan field di
   SKEMA_TAB (assets/admin.js) -- termasuk kolom galeri/rincian yang
   dipecah rata (galeri1_judul, galeri1_foto, dst.), BUKAN bentuk
   bersarang yang dipakai app.js. skema.mjs yang nanti merapikannya jadi
   bentuk akhir saat scripts/sheet-ke-katalog.mjs membaca berkas ini.
   promo.json/ulasan.json sudah bentuk akhir (bukan perlu dirata-ratakan
   lagi) -- diambil dari field u.promo/p.ulasan yang sudah ada.

   Berkas ini TIDAK dipakai otomatis oleh mana pun -- hanya alat bantu
   sekali saat memasang GitHub (Bagian A) & Apps Script standalone
   (Bagian B) sebagai penyimpanan baru. Lihat PANDUAN-ADMIN.md. Kode
   Akses Toko TIDAK ada di sini -- pindah ke PropertiesService privat
   Apps Script, tidak ada sumbernya di data/katalog.js (memang rahasia,
   diisi ulang manual lewat admin.html Bagian B).
   ============================================================ */

import { readFile, mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import vm from "node:vm";
import { JUMLAH_GALERI, JUMLAH_RINCIAN } from "./skema.mjs";

const kode = await readFile(new URL("../data/katalog.js", import.meta.url), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(kode + "\nthis.__data = { UMKM, PRODUK, WISATA };", sandbox);
const { UMKM, PRODUK, WISATA } = sandbox.__data;

const folder = new URL("../data/db/", import.meta.url);
await mkdir(folder, { recursive: true });

async function tulis(namaBerkas, baris) {
  await writeFile(new URL(namaBerkas, folder), JSON.stringify(baris, null, 2) + "\n", "utf8");
  console.log("Ditulis:", "data/db/" + namaBerkas, "(" + baris.length + " baris)");
}

function galeriRata(prefix, galeri) {
  const g = galeri || [];
  const hasil = {};
  for (let i = 1; i <= JUMLAH_GALERI; i++) {
    hasil[prefix + i + "_judul"] = g[i - 1]?.judul || "";
    hasil[prefix + i + "_foto"] = g[i - 1]?.foto || "";
  }
  return hasil;
}

function rincianRata(rincian) {
  const r = rincian || [];
  const hasil = {};
  for (let i = 1; i <= JUMLAH_RINCIAN; i++) {
    hasil["rincian" + i + "_label"] = r[i - 1]?.[0] || "";
    hasil["rincian" + i + "_isi"] = r[i - 1]?.[1] || "";
  }
  return hasil;
}

await tulis(
  "umkm.json",
  UMKM.map((u) => ({
    slug: u.slug,
    nama: u.nama,
    kategori: u.kategori,
    pemilik: u.pemilik,
    wa: u.wa,
    alamat: u.alamat,
    foto: u.foto,
    penilaian: u.penilaian,
    jamBuka: u.jamBuka,
    pengiriman: u.pengiriman,
    fotoLokasi: u.fotoLokasi,
    deskripsi: u.deskripsi,
  })),
);

await tulis(
  "produk.json",
  PRODUK.map((p) => ({
    slug: p.slug,
    nama: p.nama,
    umkm: p.umkm,
    kategori: p.kategori,
    harga: p.harga,
    satuan: p.satuan,
    foto: p.foto,
    penilaian: p.penilaian,
    ...(() => {
      const hasil = {};
      const g = p.galeri || [];
      for (let i = 1; i <= JUMLAH_GALERI; i++) hasil["galeri" + i] = g[i - 1] || "";
      return hasil;
    })(),
    unggulan: p.unggulan ? "TRUE" : "FALSE",
    deskripsi: p.deskripsi,
    ...rincianRata(p.rincian),
  })),
);

await tulis(
  "wisata.json",
  WISATA.map((w) => ({
    slug: w.slug,
    nama: w.nama,
    jenis: w.jenis,
    alamat: w.alamat,
    jamBuka: w.jamBuka,
    tiket: w.tiket,
    kontak: w.kontak,
    foto: w.foto,
    fotoLokasi: w.fotoLokasi,
    penilaian: w.penilaian,
    keteranganGaleri: w.keteranganGaleri,
    ...galeriRata("galeri", w.galeri),
    deskripsi: w.deskripsi,
  })),
);

await tulis(
  "promo.json",
  UMKM.filter((u) => u.promo && u.promo.teks).map((u) => ({
    slug: u.slug,
    teks: u.promo.teks,
    aktif: Boolean(u.promo.aktif),
  })),
);

const semuaUlasan = [];
PRODUK.forEach((p) =>
  (p.ulasan || []).forEach((u) =>
    semuaUlasan.push({
      id: randomUUID(),
      produk: p.slug,
      nama: u.nama,
      asal: u.asal,
      penilaian: u.penilaian,
      teks: u.teks,
    }),
  ),
);
await tulis("ulasan.json", semuaUlasan);

console.log("\nSelesai. Berkas ini yang dibaca scripts/sheet-ke-katalog.mjs.");
