/* ============================================================
   Alat bantu baca/tulis CSV, dipakai oleh scripts/sheet-ke-katalog.mjs
   dan scripts/katalog-ke-sheet.mjs. Ditulis sendiri (bukan pustaka
   luar) mengikuti aturan RFC 4180: sel yang berisi koma, tanda kutip,
   atau baris baru dibungkus tanda kutip ganda; tanda kutip di dalam
   sel ditulis dobel ("").
   ============================================================ */

export function uraikanCsv(teks) {
  const baris = [];
  let barisSkrg = [];
  let kolomSkrg = "";
  let dalamKutip = false;

  for (let i = 0; i < teks.length; i++) {
    const c = teks[i];
    if (dalamKutip) {
      if (c === '"') {
        if (teks[i + 1] === '"') {
          kolomSkrg += '"';
          i++;
        } else {
          dalamKutip = false;
        }
      } else {
        kolomSkrg += c;
      }
    } else if (c === '"') {
      dalamKutip = true;
    } else if (c === ",") {
      barisSkrg.push(kolomSkrg);
      kolomSkrg = "";
    } else if (c === "\r") {
      // dilewati, baris baru ditangani oleh \n
    } else if (c === "\n") {
      barisSkrg.push(kolomSkrg);
      baris.push(barisSkrg);
      barisSkrg = [];
      kolomSkrg = "";
    } else {
      kolomSkrg += c;
    }
  }
  // baris terakhir kalau berkas tidak diakhiri baris baru
  if (kolomSkrg !== "" || barisSkrg.length) {
    barisSkrg.push(kolomSkrg);
    baris.push(barisSkrg);
  }
  return baris;
}

/** Ubah baris CSV (baris pertama = judul kolom) jadi daftar objek.
 *  Baris yang seluruh selnya kosong dilewati. */
export function barisJadiObjek(baris) {
  if (!baris.length) return [];
  const judul = baris[0].map((h) => h.trim());
  return baris
    .slice(1)
    .filter((b) => b.some((sel) => (sel || "").trim() !== ""))
    .map((b) => {
      const obj = {};
      judul.forEach((h, i) => {
        obj[h] = (b[i] ?? "").trim();
      });
      return obj;
    });
}

function nilaiCsv(nilai) {
  const s = String(nilai == null ? "" : nilai);
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

/** header: array nama kolom. baris: array-of-array nilai. */
export function jadiCsv(header, baris) {
  const semua = [header, ...baris];
  return semua.map((b) => b.map(nilaiCsv).join(",")).join("\r\n") + "\r\n";
}
