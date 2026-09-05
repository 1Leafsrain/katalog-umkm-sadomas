#!/usr/bin/env node
/* ============================================================
   Uji internal (bukan bagian dari alur otomatis): pastikan
   data/katalog.js -> CSV (katalog-ke-sheet.mjs) -> data lagi
   (skema.mjs) menghasilkan isi yang SAMA PERSIS dengan aslinya.

   Ini bukti bahwa skema kolom di skema.mjs tidak kehilangan data.
   Jalankan setelah mengubah skema.mjs atau katalog-ke-sheet.mjs:

     node scripts/katalog-ke-sheet.mjs
     node scripts/uji-roundtrip.mjs
   ============================================================ */

import { readFile } from "node:fs/promises";
import vm from "node:vm";
import { uraikanCsv, barisJadiObjek } from "./csv-util.mjs";
import { rakitData } from "./skema.mjs";

const kode = await readFile(new URL("../data/katalog.js", import.meta.url), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(
  kode + "\nthis.__data = { DESA, TESTIMONI, KATEGORI, UMKM, PRODUK, WISATA };",
  sandbox,
);
const asli = sandbox.__data;

async function bacaCsv(namaBerkas) {
  const teks = await readFile(new URL("../sheet-seed/" + namaBerkas, import.meta.url), "utf8");
  return barisJadiObjek(uraikanCsv(teks));
}

const { data: hasil, catat } = rakitData({
  desaRows: await bacaCsv("DESA.csv"),
  testimoniRows: await bacaCsv("TESTIMONI.csv"),
  kategoriRows: await bacaCsv("KATEGORI.csv"),
  umkmRows: await bacaCsv("UMKM.csv"),
  produkRows: await bacaCsv("PRODUK.csv"),
  ulasanRows: await bacaCsv("ULASAN.csv"),
  wisataRows: await bacaCsv("WISATA.csv"),
});

let gagal = false;

if (catat.peringatan.length || catat.galat.length) {
  gagal = true;
  console.error("Ada peringatan/galat saat merakit ulang data:");
  [...catat.galat, ...catat.peringatan].forEach((p) => console.error(" - " + p));
}

for (const kunci of ["DESA", "TESTIMONI", "KATEGORI", "UMKM", "PRODUK", "WISATA"]) {
  const a = JSON.stringify(asli[kunci]);
  const b = JSON.stringify(hasil[kunci]);
  if (a !== b) {
    gagal = true;
    console.error("BEDA pada " + kunci + ":");
    console.error("  asli : " + a.slice(0, 500));
    console.error("  hasil: " + b.slice(0, 500));
  } else {
    console.log("OK   " + kunci + " (" + (Array.isArray(asli[kunci]) ? asli[kunci].length + " entri" : "1 objek") + ")");
  }
}

if (gagal) {
  console.error("\nUji round-trip GAGAL.");
  process.exit(1);
} else {
  console.log("\nUji round-trip BERHASIL -- tidak ada data yang hilang.");
}
