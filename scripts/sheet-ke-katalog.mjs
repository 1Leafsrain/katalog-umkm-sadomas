#!/usr/bin/env node
/* ============================================================
   Menyusun ulang data/katalog.js dari data/db/*.json -- UMKM, PRODUK,
   WISATA, ULASAN, PROMO semuanya dikelola lewat admin.html, disimpan
   langsung di GitHub (lihat PANDUAN-ADMIN.md). Google Sheet SEPENUHNYA
   OPSIONAL sekarang -- cuma dipakai kalau desa memang ingin mengedit
   DESA/TESTIMONI/KATEGORI (isinya sedikit, jarang berubah) lewat
   spreadsheet biasa, lihat PANDUAN-SHEET.md.

   Dijalankan otomatis oleh GitHub Actions setiap ada commit baru ke
   data/db/** (lihat .github/workflows/tarik-sheet.yml), juga tetap
   berjalan terjadwal untuk jaga-jaga kalau mode Sheet dipakai. Bisa
   juga dicoba sendiri di komputer:

     node scripts/sheet-ke-katalog.mjs
     SHEET_ID=isi_id_sheet node scripts/sheet-ke-katalog.mjs   # kalau mode Sheet dipakai

   ID Sheet ada di URL-nya, di antara "/d/" dan "/edit":
   https://docs.google.com/spreadsheets/d/INI_ID_NYA/edit

   Kalau SHEET_ID TIDAK diisi: DESA/TESTIMONI/KATEGORI diambil apa
   adanya dari data/katalog.js yang sekarang (tidak disentuh) -- cuma
   UMKM/PRODUK/WISATA/ULASAN/PROMO (dari data/db/*.json) yang disusun
   ulang. Ini yang membuat Google Sheet benar-benar opsional.

   Kalau ada kesalahan struktur (slug ganda), berkas data/katalog.js
   TIDAK ditulis ulang dan situs tetap memakai data yang terakhir
   benar -- lihat PANDUAN-SHEET.md bagian "Kalau workflow gagal".
   ============================================================ */

import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";
import { uraikanCsv, barisJadiObjek } from "./csv-util.mjs";
import { rakitData, buatIsiBerkas } from "./skema.mjs";

const SHEET_ID = process.env.SHEET_ID;

// Cuma tab yang sengaja tetap opsional lewat Sheet -- UMKM/PRODUK/
// WISATA/ULASAN/PROMO semuanya dari data/db/*.json (lihat bacaDb()).
const TAB_SHEET = ["DESA", "TESTIMONI", "KATEGORI"];

async function ambilTab(namaTab) {
  const url =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?tqx=out:csv&sheet=" +
    encodeURIComponent(namaTab);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      "Gagal mengambil tab '" +
        namaTab +
        "' (status HTTP " +
        res.status +
        "). Periksa: (1) nama tab di Sheet persis '" +
        namaTab +
        "' -- huruf besar/kecil harus sama, (2) Sheet sudah dibagikan " +
        "'Anyone with the link - Viewer', (3) SHEET_ID benar.",
    );
  }
  return barisJadiObjek(uraikanCsv(await res.text()));
}

async function bacaDb(namaBerkas) {
  const teks = await readFile(new URL("../data/db/" + namaBerkas, import.meta.url), "utf8").catch(
    () => "[]",
  );
  return JSON.parse(teks);
}

// Dipakai HANYA kalau SHEET_ID kosong -- baca ulang DESA/TESTIMONI/
// KATEGORI dari data/katalog.js yang sekarang, "dipura-pura" seakan
// baris CSV (bentuknya cocok dengan yang diharapkan buatDesa/dkk. di
// skema.mjs) supaya tidak perlu menulis ulang fungsi itu.
async function bacaDariKatalogSekarang() {
  const kode = await readFile(new URL("../data/katalog.js", import.meta.url), "utf8");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(kode + "\nthis.__data = { DESA, TESTIMONI, KATEGORI };", sandbox);
  const { DESA, TESTIMONI, KATEGORI } = sandbox.__data;
  const desaRows = Object.entries(DESA).flatMap(([kunci, nilai]) =>
    kunci === "ajakan"
      ? [
          ["ajakan.judul", nilai.judul],
          ["ajakan.teks", nilai.teks],
        ]
      : [[kunci, nilai]],
  );
  return {
    desaRows: desaRows.map(([kunci, nilai]) => ({ kunci, nilai })),
    testimoniRows: [TESTIMONI],
    kategoriRows: KATEGORI,
  };
}

async function utama() {
  let desaRows, testimoniRows, kategoriRows;
  if (SHEET_ID) {
    [desaRows, testimoniRows, kategoriRows] = await Promise.all(TAB_SHEET.map(ambilTab));
  } else {
    console.log("SHEET_ID kosong -- DESA/TESTIMONI/KATEGORI dipakai apa adanya dari data/katalog.js.");
    ({ desaRows, testimoniRows, kategoriRows } = await bacaDariKatalogSekarang());
  }

  const [umkmRows, produkRows, wisataRows, ulasanRows, promoRows] = await Promise.all(
    ["umkm.json", "produk.json", "wisata.json", "ulasan.json", "promo.json"].map(bacaDb),
  );

  const { data, catat } = rakitData({
    desaRows,
    testimoniRows,
    kategoriRows,
    umkmRows,
    produkRows,
    ulasanRows,
    wisataRows,
    promoRows,
  });

  if (catat.peringatan.length) {
    console.warn("Peringatan (data tetap diterbitkan, tapi sebaiknya diperbaiki):");
    catat.peringatan.forEach((p) => console.warn(" - " + p));
  }

  if (catat.galat.length) {
    console.error(
      "Kesalahan struktur ditemukan. data/katalog.js TIDAK ditulis ulang, " +
        "situs tetap memakai data yang terakhir benar sampai ini diperbaiki:",
    );
    catat.galat.forEach((g) => console.error(" - " + g));
    process.exit(1);
  }

  const isi = buatIsiBerkas(data);
  await writeFile(new URL("../data/katalog.js", import.meta.url), isi, "utf8");

  console.log(
    "Selesai: " +
      data.UMKM.length +
      " UMKM, " +
      data.PRODUK.length +
      " produk, " +
      data.WISATA.length +
      " wisata.",
  );
}

utama().catch((e) => {
  console.error(e && e.message ? e.message : e);
  process.exit(1);
});
