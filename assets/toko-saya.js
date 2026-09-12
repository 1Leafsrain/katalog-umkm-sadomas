/* ============================================================
   Halaman "Toko Saya": pemilik UMKM masuk pakai slug + kode akses
   (BUKAN kata sandi admin) untuk melihat statistik tokonya sendiri
   dan mengatur promo yang tampil di halaman profil tokonya.

   Dimuat sebagai skrip biasa (bukan module), sama alasannya dengan
   assets/admin.js -- lihat catatan di berkas itu.
   ============================================================ */

// GANTI dengan alamat Web App yang SAMA dengan yang ditulis di
// assets/app.js (URL_STATISTIK) -- kalau salah satu diubah, ubah juga
// yang lain, dua-duanya harus menunjuk Apps Script Web App yang sama.
const URL_STATISTIK = "GANTI_URL_APPS_SCRIPT";

const $ = (sel) => document.querySelector(sel);

async function panggilStatistikPublik(payload) {
  if (!URL_STATISTIK || URL_STATISTIK.startsWith("GANTI")) {
    throw new Error("Fitur ini belum aktif.");
  }
  const res = await fetch(URL_STATISTIK, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  const j = await res.json();
  if (j.galat) throw new Error(j.galat);
  return j;
}

function pesan(sel, teks, jenis) {
  const el = $(sel);
  el.textContent = teks;
  el.className = "status" + (jenis ? " status--" + jenis : "");
}

// Kode akses SENGAJA tidak disimpan ke localStorage (beda dari
// admin.js yang punya opsi "ingat sandi") -- perangkat pemilik toko
// bisa dipakai bersama orang lain, lebih aman minta masuk ulang tiap
// sesi peramban.
let sesiSlug = null;
let sesiKode = null;

function isiPilihanToko() {
  const sel = $("#ts-slug");
  UMKM.slice()
    .sort((a, b) => a.nama.localeCompare(b.nama))
    .forEach((u) => {
      const opt = document.createElement("option");
      opt.value = u.slug;
      opt.textContent = u.nama;
      sel.append(opt);
    });
}

async function muatSetelahMasuk() {
  const [statistik, promo] = await Promise.all([
    panggilStatistikPublik({ aksi: "bacaStatistikUmkm", slug: sesiSlug, kode: sesiKode }),
    panggilStatistikPublik({ aksi: "bacaPromoUmkm", slug: sesiSlug, kode: sesiKode }),
  ]);

  const { perToko, harian } = statistik.data;
  const totalToko = perToko[sesiSlug] || { kunjungan: 0, klikWa: 0 };
  $("#angka-kunjungan").textContent = totalToko.kunjungan;
  $("#angka-klik-wa").textContent = totalToko.klikWa;

  const u = UMKM.find((x) => x.slug === sesiSlug);
  $("#isi-nama-toko").textContent = u ? "— " + u.nama : "";

  const dataHarian = harian.map((h) => ({
    label: h.tanggal.slice(5), // "MM-DD"
    a: h.kunjungan,
    b: h.klikWa,
  }));
  $("#grafik-harian").innerHTML = grafikBatangGanda(dataHarian, {
    labelA: "Kunjungan",
    labelB: "Klik WA",
  });

  $("#promo-teks").value = promo.data.teks || "";
  $("#promo-aktif").checked = Boolean(promo.data.aktif);

  $("#fieldset-isi").hidden = false;
  $("#fieldset-promo").hidden = false;
}

document.addEventListener("DOMContentLoaded", () => {
  isiPilihanToko();

  $("#form-masuk").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const slug = $("#ts-slug").value;
    const kode = $("#ts-kode").value;
    pesan("#masuk-status", "Memeriksa...", "");
    try {
      await panggilStatistikPublik({ aksi: "cekAksesUmkm", slug, kode });
      sesiSlug = slug;
      sesiKode = kode;
      await muatSetelahMasuk();
      pesan("#masuk-status", "Berhasil masuk.", "ok");
    } catch (err) {
      pesan("#masuk-status", "Gagal masuk: " + err.message, "galat");
    }
  });

  $("#form-promo").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    if (!sesiSlug) return;
    pesan("#promo-status", "Menyimpan...", "");
    try {
      await panggilStatistikPublik({
        aksi: "simpanPromoUmkm",
        slug: sesiSlug,
        kode: sesiKode,
        teks: $("#promo-teks").value.trim(),
        aktif: $("#promo-aktif").checked,
      });
      pesan("#promo-status", "Promo disimpan. Akan tampil di situs dalam 30-60 menit.", "ok");
    } catch (err) {
      pesan("#promo-status", "Gagal menyimpan: " + err.message, "galat");
    }
  });
});
