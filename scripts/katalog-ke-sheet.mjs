#!/usr/bin/env node
/* ============================================================
   SEKALI PAKAI: membuat berkas CSV dari data/katalog.js yang
   sekarang, untuk diimpor ke Google Sheet baru sebagai titik awal --
   supaya isi yang sudah ada (UMKM, produk, wisata) tidak perlu
   diketik ulang manual satu-satu di Sheet.

   Jalankan:  node scripts/katalog-ke-sheet.mjs

   Hasilnya masuk ke folder sheet-seed/, satu berkas CSV per tab.
   Cara mengimpornya ke Google Sheet ada di PANDUAN-SHEET.md.

   Berkas ini TIDAK dipakai oleh GitHub Actions dan tidak berjalan
   otomatis -- hanya alat bantu sekali saat menyiapkan Sheet pertama
   kali.
   ============================================================ */

import { readFile, mkdir, writeFile } from "node:fs/promises";
import vm from "node:vm";
import { jadiCsv } from "./csv-util.mjs";
import { JUMLAH_GALERI, JUMLAH_RINCIAN, KUNCI_DESA } from "./skema.mjs";

const kode = await readFile(new URL("../data/katalog.js", import.meta.url), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(
  kode +
    "\nthis.__data = { DESA, TESTIMONI, KATEGORI, UMKM, PRODUK, WISATA };",
  sandbox,
);
const { DESA, TESTIMONI, KATEGORI, UMKM, PRODUK, WISATA } = sandbox.__data;

const folder = new URL("../sheet-seed/", import.meta.url);
await mkdir(folder, { recursive: true });

async function tulis(namaBerkas, header, baris) {
  await writeFile(new URL(namaBerkas, folder), jadiCsv(header, baris), "utf8");
  console.log("Ditulis:", "sheet-seed/" + namaBerkas, "(" + baris.length + " baris)");
}

function kolomGaleriJudulFoto(prefix) {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_GALERI; i++) hasil.push(prefix + i + "_judul", prefix + i + "_foto");
  return hasil;
}

function nilaiGaleriJudulFoto(galeri) {
  const g = galeri || [];
  const hasil = [];
  for (let i = 0; i < JUMLAH_GALERI; i++) hasil.push(g[i]?.judul || "", g[i]?.foto || "");
  return hasil;
}

/* ---------- DESA ---------- */
function nilaiDesa(kunci) {
  if (kunci === "ajakan.judul") return DESA.ajakan?.judul || "";
  if (kunci === "ajakan.teks") return DESA.ajakan?.teks || "";
  return DESA[kunci] ?? "";
}
await tulis(
  "DESA.csv",
  ["kunci", "nilai"],
  KUNCI_DESA.map((k) => [k, nilaiDesa(k)]),
);

/* ---------- TESTIMONI ---------- */
await tulis(
  "TESTIMONI.csv",
  ["teks", "nama", "peran", "foto"],
  [[TESTIMONI.teks, TESTIMONI.nama, TESTIMONI.peran, TESTIMONI.foto]],
);

/* ---------- KATEGORI ---------- */
await tulis(
  "KATEGORI.csv",
  ["id", "nama"],
  KATEGORI.map((k) => [k.id, k.nama]),
);

/* ---------- UMKM ---------- */
await tulis(
  "UMKM.csv",
  [
    "slug", "nama", "kategori", "pemilik", "berdiri", "pekerja", "wa",
    "alamat", "foto", "penilaian", "jamBuka", "pengiriman", "fotoLokasi",
    "keteranganGaleri", ...kolomGaleriJudulFoto("galeri"), "deskripsi",
  ],
  UMKM.map((u) => [
    u.slug, u.nama, u.kategori, u.pemilik, u.berdiri, u.pekerja, u.wa,
    u.alamat, u.foto, u.penilaian, u.jamBuka, u.pengiriman, u.fotoLokasi,
    u.keteranganGaleri, ...nilaiGaleriJudulFoto(u.galeri), u.deskripsi,
  ]),
);

/* ---------- WISATA ---------- */
await tulis(
  "WISATA.csv",
  [
    "slug", "nama", "jenis", "alamat", "jamBuka", "tiket", "kontak", "foto",
    "fotoLokasi", "penilaian", "keteranganGaleri",
    ...kolomGaleriJudulFoto("galeri"), "deskripsi",
  ],
  WISATA.map((w) => [
    w.slug, w.nama, w.jenis, w.alamat, w.jamBuka, w.tiket, w.kontak, w.foto,
    w.fotoLokasi, w.penilaian, w.keteranganGaleri,
    ...nilaiGaleriJudulFoto(w.galeri), w.deskripsi,
  ]),
);

/* ---------- PRODUK ---------- */
function kolomRincian() {
  const hasil = [];
  for (let i = 1; i <= JUMLAH_RINCIAN; i++) hasil.push("rincian" + i + "_label", "rincian" + i + "_isi");
  return hasil;
}
function nilaiRincian(rincian) {
  const r = rincian || [];
  const hasil = [];
  for (let i = 0; i < JUMLAH_RINCIAN; i++) hasil.push(r[i]?.[0] || "", r[i]?.[1] || "");
  return hasil;
}
await tulis(
  "PRODUK.csv",
  [
    "slug", "nama", "umkm", "kategori", "harga", "satuan", "foto",
    "penilaian", "galeri1", "galeri2", "galeri3", "galeri4", "unggulan",
    "deskripsi", ...kolomRincian(),
  ],
  PRODUK.map((p) => {
    const g = p.galeri || [];
    return [
      p.slug, p.nama, p.umkm, p.kategori, p.harga, p.satuan, p.foto,
      p.penilaian, g[0] || "", g[1] || "", g[2] || "", g[3] || "",
      p.unggulan ? "TRUE" : "FALSE", p.deskripsi, ...nilaiRincian(p.rincian),
    ];
  }),
);

/* ---------- ULASAN (digabung dari semua produk) ---------- */
const semuaUlasan = [];
PRODUK.forEach((p) =>
  (p.ulasan || []).forEach((u) =>
    semuaUlasan.push([p.slug, u.nama, u.asal, u.penilaian, u.teks]),
  ),
);
await tulis("ULASAN.csv", ["produk", "nama", "asal", "penilaian", "teks"], semuaUlasan);

console.log("\nSelesai. Impor tiap berkas di sheet-seed/ jadi satu tab di Google Sheet baru.");
