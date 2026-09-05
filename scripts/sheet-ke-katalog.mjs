#!/usr/bin/env node
/* ============================================================
   Menarik data dari Google Sheet dan membuat data/katalog.js.

   Dijalankan otomatis oleh GitHub Actions, lihat
   .github/workflows/tarik-sheet.yml. Bisa juga dicoba sendiri di
   komputer:

     SHEET_ID=isi_id_sheet node scripts/sheet-ke-katalog.mjs

   ID Sheet ada di URL-nya, di antara "/d/" dan "/edit":
   https://docs.google.com/spreadsheets/d/INI_ID_NYA/edit

   Sheet harus dibagikan "Anyone with the link - Viewer" (Share ->
   General access) supaya berkas ini bisa membacanya tanpa masuk akun.

   Kalau ada kesalahan struktur (slug ganda), berkas data/katalog.js
   TIDAK ditulis ulang dan situs tetap memakai data yang terakhir
   benar -- lihat PANDUAN-SHEET.md bagian "Kalau workflow gagal".
   ============================================================ */

import { writeFile } from "node:fs/promises";
import { uraikanCsv, barisJadiObjek } from "./csv-util.mjs";
import { rakitData, buatIsiBerkas } from "./skema.mjs";

const SHEET_ID = process.env.SHEET_ID;

const TAB = ["DESA", "TESTIMONI", "KATEGORI", "UMKM", "PRODUK", "ULASAN", "WISATA"];

if (!SHEET_ID) {
  console.error(
    "SHEET_ID belum diisi. Tambahkan sebagai Repository Variable: " +
      "Settings -> Secrets and variables -> Actions -> tab Variables " +
      "-> New repository variable, nama SHEET_ID, isinya ID Google " +
      "Sheet (bagian URL di antara '/d/' dan '/edit').",
  );
  process.exit(1);
}

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

async function utama() {
  const [
    desaRows,
    testimoniRows,
    kategoriRows,
    umkmRows,
    produkRows,
    ulasanRows,
    wisataRows,
  ] = await Promise.all(TAB.map(ambilTab));

  const { data, catat } = rakitData({
    desaRows,
    testimoniRows,
    kategoriRows,
    umkmRows,
    produkRows,
    ulasanRows,
    wisataRows,
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
