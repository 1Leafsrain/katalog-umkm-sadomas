/* ============================================================
   Alat bantu foto yang dipakai BERSAMA oleh assets/admin.js dan
   assets/toko-saya.js (dimuat lewat <script> biasa di admin.html DAN
   toko-saya.html, sama seperti assets/grafik.js) -- supaya logika
   mengecilkan foto & menampilkan jalurnya tidak dua kali ditulis di
   dua tempat.
   ============================================================ */

// Dikecilkan di peramban SEBELUM dikirim -- foto langsung dari HP bisa
// beberapa MB, padahal katalog cukup butuh ukuran layar. Ini juga yang
// menjaga permintaan ke Apps Script/GitHub tetap kecil (ada batas
// ukuran di Code.gs sebagai jaring pengaman, lihat UKURAN_FOTO_MAKS di
// sana).
const SISI_FOTO_MAKS = 1600; // px, sisi terpanjang setelah dikecilkan
const KUALITAS_FOTO = 0.82;

// Sama persis dengan jalurFoto() di assets/app.js -- foto bisa berupa
// nama berkas di assets/img/ atau URL penuh (foto lama dari versi
// Google Drive, kalau masih ada yang belum diunggah ulang).
function jalurFotoTampil(foto) {
  const s = String(foto || "").trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : "assets/img/" + s;
}

function kecilkanFoto(file) {
  return new Promise((resolve, reject) => {
    const gambar = new Image();
    const urlSementara = URL.createObjectURL(file);
    gambar.onload = () => {
      URL.revokeObjectURL(urlSementara);
      const sisi = Math.max(gambar.naturalWidth, gambar.naturalHeight);
      const skala = sisi > SISI_FOTO_MAKS ? SISI_FOTO_MAKS / sisi : 1;
      const kanvas = document.createElement("canvas");
      kanvas.width = Math.round(gambar.naturalWidth * skala);
      kanvas.height = Math.round(gambar.naturalHeight * skala);
      kanvas.getContext("2d").drawImage(gambar, 0, 0, kanvas.width, kanvas.height);
      kanvas.toBlob(
        (blob) => {
          if (!blob) return reject(new Error("Gagal memproses foto."));
          const pembaca = new FileReader();
          pembaca.onload = () => {
            const hasil = String(pembaca.result || "");
            resolve({ dataBase64: hasil.slice(hasil.indexOf(",") + 1), tipeMime: "image/jpeg" });
          };
          pembaca.onerror = () => reject(new Error("Gagal membaca foto yang sudah dikecilkan."));
          pembaca.readAsDataURL(blob);
        },
        "image/jpeg",
        KUALITAS_FOTO,
      );
    };
    gambar.onerror = () => {
      URL.revokeObjectURL(urlSementara);
      reject(new Error("Berkas yang dipilih bukan gambar yang valid."));
    };
    gambar.src = urlSementara;
  });
}
