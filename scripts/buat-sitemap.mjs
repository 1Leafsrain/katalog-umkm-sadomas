#!/usr/bin/env node
/* ============================================================
   Membuat sitemap.xml dari data/katalog.js yang SEKARANG -- setiap
   UMKM, produk, dan wisata terdaftar otomatis dapat baris sendiri,
   tidak perlu didaftar manual satu-satu.

   Dijalankan otomatis oleh GitHub Actions setiap ada perubahan di
   data/katalog.js (lihat .github/workflows/perbarui-sitemap.yml, dan
   langkah tambahan di .github/workflows/tarik-sheet.yml). Bisa juga
   dicoba sendiri di komputer:

     node scripts/buat-sitemap.mjs

   Kalau alamat situsnya pindah (ganti akun GitHub, ganti nama
   repositori, atau pakai domain sendiri), ubah BASE_URL di bawah ini.
   ============================================================ */

import { readFile, writeFile } from "node:fs/promises";
import vm from "node:vm";

const BASE_URL = "https://1leafsrain.github.io/katalog-umkm-sadomas";

const kode = await readFile(new URL("../data/katalog.js", import.meta.url), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(kode + "\nthis.__data = { UMKM, PRODUK, WISATA };", sandbox);
const { UMKM, PRODUK, WISATA } = sandbox.__data;

function url(loc) {
  return "  <url><loc>" + BASE_URL + loc + "</loc></url>";
}

const baris = [
  url("/index.html"),
  url("/katalog.html"),
  url("/wisata.html"),
  ...UMKM.map((u) => url("/umkm.html?u=" + encodeURIComponent(u.slug))),
  ...PRODUK.map((p) => url("/produk.html?p=" + encodeURIComponent(p.slug))),
  ...WISATA.map((w) => url("/destinasi.html?w=" + encodeURIComponent(w.slug))),
];

const isi =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  baris.join("\n") +
  "\n</urlset>\n";

await writeFile(new URL("../sitemap.xml", import.meta.url), isi, "utf8");
console.log(
  "sitemap.xml ditulis: " +
    (3 + UMKM.length + PRODUK.length + WISATA.length) +
    " alamat.",
);
