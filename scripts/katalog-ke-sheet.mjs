#!/usr/bin/env node
/* ============================================================
   SEKALI PAKAI: membuat berkas CSV dari data/katalog.js yang sekarang,
   untuk diimpor ke Google Sheet baru -- HANYA relevan kalau desa
   memang ingin mengedit DESA/TESTIMONI/KATEGORI (isinya sedikit, jarang
   berubah) lewat spreadsheet biasa. Lihat PANDUAN-SHEET.md.

   UMKM/PRODUK/WISATA/PROMO/ULASAN TIDAK ada di sini -- semuanya
   disimpan di GitHub (data/db/*.json) atau PropertiesService Apps
   Script (Kode Akses Toko), bukan di Sheet sama sekali lagi. Titik
   awalnya dibuat lewat scripts/katalog-ke-db.mjs, bukan skrip ini.
   Lihat PANDUAN-ADMIN.md.

   Jalankan:  node scripts/katalog-ke-sheet.mjs

   Hasilnya masuk ke folder sheet-seed/, satu berkas CSV per tab.
   Cara mengimpornya ke Google Sheet ada di PANDUAN-SHEET.md.

   Berkas ini TIDAK dipakai oleh GitHub Actions dan tidak berjalan
   otomatis -- hanya alat bantu sekali kalau memang mau memakai mode
   Sheet opsional itu.
   ============================================================ */

import { readFile, mkdir, writeFile } from "node:fs/promises";
import vm from "node:vm";
import { jadiCsv } from "./csv-util.mjs";
import { KUNCI_DESA } from "./skema.mjs";

const kode = await readFile(new URL("../data/katalog.js", import.meta.url), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(kode + "\nthis.__data = { DESA, TESTIMONI, KATEGORI };", sandbox);
const { DESA, TESTIMONI, KATEGORI } = sandbox.__data;

const folder = new URL("../sheet-seed/", import.meta.url);
await mkdir(folder, { recursive: true });

async function tulis(namaBerkas, header, baris) {
  await writeFile(new URL(namaBerkas, folder), jadiCsv(header, baris), "utf8");
  console.log("Ditulis:", "sheet-seed/" + namaBerkas, "(" + baris.length + " baris)");
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

console.log("\nSelesai. Impor tiap berkas di sheet-seed/ jadi satu tab di Google Sheet baru.");
