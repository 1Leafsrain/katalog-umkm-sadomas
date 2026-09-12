/* ============================================================
   Grafik batang sederhana, digambar langsung sebagai SVG (tanpa
   library luar) -- dipakai bagian Statistik di admin.html DAN
   toko-saya.html. Cuma dua fungsi, dipisah dari admin.js/toko-saya.js
   supaya tidak digandakan di dua berkas.
   ============================================================ */

function amanGrafik(teks) {
  return String(teks).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

/** data: [{label, nilai}]. Satu seri, satu warna. */
function grafikBatang(data, opsi = {}) {
  const lebar = opsi.lebar || 560;
  const tinggi = opsi.tinggi || 160;
  const warna = opsi.warna || "#1c4331";
  const bawah = 22;
  const tinggiBatang = tinggi - bawah;
  const maks = Math.max(1, ...data.map((d) => d.nilai));
  const n = Math.max(1, data.length);
  const celah = 6;
  const lebarBatang = Math.max(2, (lebar - celah * (n - 1)) / n);

  const isi = data
    .map((d, i) => {
      const h = Math.max(1, Math.round((d.nilai / maks) * (tinggiBatang - 6)));
      const x = i * (lebarBatang + celah);
      const y = tinggiBatang - h;
      return (
        '<rect x="' + x + '" y="' + y + '" width="' + lebarBatang + '" height="' + h +
        '" rx="2" fill="' + warna + '"><title>' + amanGrafik(d.label) + ": " + d.nilai + "</title></rect>" +
        '<text x="' + (x + lebarBatang / 2) + '" y="' + (tinggi - 6) +
        '" font-size="9" text-anchor="middle" fill="#6b7a6c">' + amanGrafik(d.label) + "</text>"
      );
    })
    .join("");

  return (
    '<svg viewBox="0 0 ' + lebar + " " + tinggi + '" width="100%" height="' + tinggi +
    '" role="img" aria-label="Grafik batang">' + isi + "</svg>"
  );
}

/** data: [{label, a, b}]. Dua seri berdampingan per label (mis.
 *  kunjungan vs klik WhatsApp), dengan legenda kecil di atas. */
function grafikBatangGanda(data, opsi = {}) {
  const lebar = opsi.lebar || 560;
  const tinggi = opsi.tinggi || 180;
  const legenda = 20;
  const bawah = 22;
  const tinggiBatang = tinggi - bawah - legenda;
  const warnaA = opsi.warnaA || "#1c4331";
  const warnaB = opsi.warnaB || "#c9852f";
  const maks = Math.max(1, ...data.map((d) => Math.max(d.a, d.b)));
  const n = Math.max(1, data.length);
  const celahLuar = 8;
  const lebarGrup = Math.max(4, (lebar - celahLuar * (n - 1)) / n);
  const lebarBatang = (lebarGrup - 2) / 2;

  const batang = data
    .map((d, i) => {
      const xGrup = i * (lebarGrup + celahLuar);
      const hA = Math.max(1, Math.round((d.a / maks) * (tinggiBatang - 6)));
      const hB = Math.max(1, Math.round((d.b / maks) * (tinggiBatang - 6)));
      const yA = legenda + tinggiBatang - hA;
      const yB = legenda + tinggiBatang - hB;
      return (
        '<rect x="' + xGrup + '" y="' + yA + '" width="' + lebarBatang + '" height="' + hA +
        '" rx="1.5" fill="' + warnaA + '"><title>' + amanGrafik(d.label) + " -- " + (opsi.labelA || "A") + ": " + d.a + "</title></rect>" +
        '<rect x="' + (xGrup + lebarBatang + 2) + '" y="' + yB + '" width="' + lebarBatang + '" height="' + hB +
        '" rx="1.5" fill="' + warnaB + '"><title>' + amanGrafik(d.label) + " -- " + (opsi.labelB || "B") + ": " + d.b + "</title></rect>" +
        '<text x="' + (xGrup + lebarGrup / 2) + '" y="' + (tinggi - 6) +
        '" font-size="9" text-anchor="middle" fill="#6b7a6c">' + amanGrafik(d.label) + "</text>"
      );
    })
    .join("");

  const teksLegenda =
    '<g font-size="10" fill="#2c3e2d">' +
    '<rect x="0" y="4" width="10" height="10" rx="2" fill="' + warnaA + '"></rect>' +
    '<text x="14" y="13">' + amanGrafik(opsi.labelA || "A") + "</text>" +
    '<rect x="90" y="4" width="10" height="10" rx="2" fill="' + warnaB + '"></rect>' +
    '<text x="104" y="13">' + amanGrafik(opsi.labelB || "B") + "</text>" +
    "</g>";

  return (
    '<svg viewBox="0 0 ' + lebar + " " + tinggi + '" width="100%" height="' + tinggi +
    '" role="img" aria-label="Grafik batang ganda">' + teksLegenda + batang + "</svg>"
  );
}
