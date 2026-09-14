# Memakai Google Sheet untuk DESA/TESTIMONI/KATEGORI (opsional)

**Google Sheet SEPENUHNYA OPSIONAL di situs ini** -- tidak dipakai untuk
menyimpan apa pun yang wajib. Satu-satunya kegunaannya adalah supaya
warga bisa mengedit `DESA` (profil desa), `TESTIMONI`, dan `KATEGORI`
(isinya sedikit, jarang berubah) lewat spreadsheet biasa, sebagai
alternatif dari mengedit `data/katalog.js` langsung lewat GitHub
(`PANDUAN-UPDATE.md`).

> **UMKM, Produk, Wisata, Ulasan Pembeli, Promo per-UMKM, Kode Akses
> Toko, dan Statistik SEMUANYA TIDAK LEWAT SINI.** Ketujuhnya tersimpan
> di GitHub (`data/db/*.json` + `assets/img/`) atau di penyimpanan
> privat Apps Script sendiri -- lihat `PANDUAN-ADMIN.md` bagian "Kenapa
> dipecah begini" untuk penjelasan lengkapnya. Apps Script di situs ini
> **tidak ditempel ke Google Sheet mana pun** (Standalone Script) --
> jadi kalau Anda tidak butuh mengedit DESA/TESTIMONI/KATEGORI lewat
> spreadsheet, **lewati berkas ini sepenuhnya**, tidak perlu membuat
> Google Sheet sama sekali.

Kalau tetap dipakai: sebuah **GitHub Actions** berjalan terjadwal (dan
bisa dipicu manual) menarik 3 tab ini sebagai CSV, menggabungkannya
dengan `data/db/*.json` (UMKM/Produk/Wisata/Ulasan/Promo, tersimpan di
GitHub), lalu menyusun ulang `data/katalog.js` -- commit sendiri kalau
memang ada perubahan.

**Situsnya tetap (hampir) 100% statis** untuk isi katalog. Pengunjung
situs tidak pernah menghubungi Google Sheet sama sekali -- yang bicara
ke Sheet (kalau dipakai) hanya robot GitHub Actions, sekali per jadwal.

> **Kenapa bukan situs yang membaca Sheet langsung dari peramban pengunjung?**
> Karena itu membuat situs bergantung ke server Google setiap kali dibuka --
> kalau jaringan desa lambat atau Google sedang bermasalah, halaman terbuka
> kosong. Endpoint CSV publik Google juga tidak mendukung CORS untuk dipanggil
> langsung dari peramban dan pernah beberapa kali berhenti bekerja tanpa ada
> yang mengubah apa pun. Menariknya dari GitHub Actions (bukan dari peramban)
> menghindari kedua masalah itu sekaligus, karena CORS hanya berlaku untuk
> permintaan dari peramban -- bukan dari server ke server.

## Ringkasan alurnya

```
Warga edit Google Sheet (DESA/TESTIMONI/KATEGORI) -- OPSIONAL
        |
GitHub Actions jalan (jadwal / tombol manual / ada commit ke data/db/**)
        |
Kalau SHEET_ID diisi: tarik 3 tab Sheet sebagai CSV
Kalau tidak: pakai DESA/TESTIMONI/KATEGORI apa adanya dari data/katalog.js
        |
Baca data/db/*.json (UMKM/Produk/Wisata/Ulasan/Promo, dari GitHub)
        |
Gabungkan semuanya -> susun jadi data/katalog.js
        |
Commit HANYA kalau isinya berubah
        |
GitHub Pages menerbitkan ulang otomatis
```

## 1. Siapkan Google Sheet-nya

1. Buat Google Sheet baru, **pakai akun desa**, bukan akun pribadi.
2. Buat **3 tab**, namanya harus PERSIS seperti ini (huruf besar/kecil
   ikut diperhatikan): `DESA`, `TESTIMONI`, `KATEGORI`.
3. Supaya tidak mengetik ulang data yang sudah ada, jalankan sekali di
   komputer (perlu Node.js terpasang):

   ```bash
   node scripts/katalog-ke-sheet.mjs
   ```

   Ini membuat folder `sheet-seed/` berisi CSV untuk ketiga tab. Untuk
   tiap tab: buka tabnya -> **File > Import > Upload** -> pilih CSV
   yang namanya sama dengan tab itu -> pilih **Replace current sheet**
   -> Import data.
4. Buka **Share** (kanan atas) -> **General access** -> ubah jadi
   **Anyone with the link**, peran **Viewer**. Tanpa ini, GitHub Actions
   tidak bisa membaca Sheet-nya.

   Karena tabnya jadi bisa dibaca siapa saja yang punya tautannya, **jangan
   taruh catatan internal** di tab-tab ini. Kalau perlu catatan begitu,
   taruh di Sheet atau dokumen yang terpisah.
5. Salin ID Sheet-nya dari alamat di peramban:
   `https://docs.google.com/spreadsheets/d/`**`ID-NYA-DI-SINI`**`/edit`

## 2. Sambungkan ke GitHub

1. Di repositori, buka **Settings -> Secrets and variables -> Actions**.
2. Klik tab **Variables** (bukan Secrets -- ID Sheet bukan rahasia karena
   Sheet-nya sendiri sudah bisa dibaca siapa saja yang punya tautannya).
3. **New repository variable**: nama `SHEET_ID`, nilai ID Sheet dari
   langkah sebelumnya. Simpan.
4. Pastikan Actions menyala: **Settings -> Actions -> General ->
   Actions permissions**, pilih yang mengizinkan workflow berjalan.

## 3. Coba jalankan

1. Buka tab **Actions** di repositori, pilih workflow **"Tarik data dari
   Google Sheet"** di daftar kiri.
2. Klik **Run workflow** (tombol di kanan) untuk mencoba sekarang juga,
   tidak usah menunggu jadwal.
3. Tunggu sampai tanda centang hijau muncul. Buka `data/katalog.js` di
   repositori -- kalau berhasil, bagian atasnya sekarang bertuliskan
   "BERKAS INI DIBUAT OTOMATIS".
4. Sejak titik ini, **jangan edit bagian DESA/TESTIMONI/KATEGORI di
   `data/katalog.js` langsung lagi** -- perubahannya akan tertimpa pada
   jalan berikutnya. Edit lewat Sheet saja untuk ketiga bagian itu.

Boleh menghapus folder `sheet-seed/` setelah langkah 1 selesai -- folder
itu cuma alat bantu sekali pakai saat mengisi Sheet pertama kali, tidak
dipakai lagi setelah itu.

**Berhenti pakai Sheet lagi?** Hapus variabel `SHEET_ID` (langkah 2).
Workflow berikutnya otomatis memakai DESA/TESTIMONI/KATEGORI apa adanya
dari `data/katalog.js` yang sedang tampil -- tidak ada langkah lain yang
perlu dibatalkan.

## Kolom di tiap tab

Baris pertama tiap tab adalah judul kolom, harus ditulis persis seperti di
bawah (huruf besar/kecil ikut diperhatikan). Urutan kolom bebas, yang
penting namanya cocok.

### Tab `DESA` (dua kolom: `kunci`, `nilai`, satu baris per pengaturan)

Sama seperti bagian `const DESA` yang lama. Baris `kunci`-nya:
`nama`, `kecamatan`, `kabupaten`, `tagline`, `sapaan`, `judulHero`,
`paragrafHero`, `alamat`, `waDesa`, `email`, `maps`, `instagram`,
`facebook`, `fotoHero`, `fotoProfil`, `judulProfil`, `paragrafProfil`,
`deskripsiKaki`, `ajakan.judul`, `ajakan.teks`, `jiwa`, `wilayah`,
`catatanAngka`.

### Tab `TESTIMONI` (satu baris data)

`teks`, `nama`, `peran`, `foto`. Kosongkan `teks` kalau belum ada
narasumber -- bagian testimoni otomatis tidak tampil di beranda.

### Tab `KATEGORI`

`id`, `nama`. **Jangan ubah/tambah `id`** tanpa sepengetahuan yang paham
kode -- nilainya dipakai untuk memilih ikon dan warna di `assets/app.js`.
Mengubah `nama` (label yang tampil) aman-aman saja.

## Yang tidak lewat Sheet sama sekali

**UMKM, Produk, Wisata (+ foto), Ulasan Pembeli, dan Promo per-UMKM.**
Semuanya tersimpan sebagai `data/db/*.json` (+ `assets/img/` untuk
foto) di repositori GitHub ini -- diedit lewat `admin.html`
(`PANDUAN-ADMIN.md`) atau langsung lewat GitHub untuk yang terbiasa
mengedit JSON. Perubahan di sini tampil di katalog publik hampir
seketika (tidak menunggu jadwal GitHub Actions seperti tab Sheet di
atas, kalau memang dipakai).

**Kode Akses Toko dan Statistik** tersimpan privat di dalam Apps Script
sendiri (`PropertiesService`) -- tidak pernah ada di Sheet maupun di
GitHub sama sekali. Lihat `PANDUAN-ADMIN.md` Bagian B.

## Sangat penting: kolom nomor WA di tab DESA

Google Sheets kadang mengubah angka panjang jadi **notasi ilmiah**
(contoh: `6281234567890` berubah tampil jadi `6.28123E+11`) kalau selnya
diformat sebagai Angka, bukan Teks. Ini bisa berlaku untuk baris
`waDesa` di tab `DESA`. Sebelum mengetiknya: pilih kolom `nilai`, lalu
**Format > Angka > Teks biasa**, baru ketik nomornya.

## Kalau workflow gagal

Buka tab **Actions**, klik jalannya yang bertanda silang merah, baca
catatannya. Dua jenis pesan:

- **Peringatan** (data tetap diterbitkan) -- misalnya kolom `produk` di
  `data/db/ulasan.json` menunjuk ke slug yang tidak ada di
  `data/db/produk.json`. Situs tetap terbit, tapi baiknya diperbaiki.
- **Kesalahan** (data TIDAK diterbitkan) -- saat ini hanya untuk slug
  yang dobel di `data/db/umkm.json`/`produk.json`/`wisata.json` (jarang
  terjadi kalau selalu diedit lewat `admin.html`, karena sudah dicegah
  di situ juga -- tapi tetap dicek ulang di sini sebagai jaring
  pengaman kalau ada yang mengedit JSON-nya langsung). Situs tetap
  menampilkan data yang terakhir benar sampai slug dobelnya diperbaiki,
  lalu jalankan lagi lewat tombol **Run workflow**.

## Dua hal yang perlu diketahui soal GitHub Actions

1. **Jadwal terjadwal dimatikan otomatis kalau repositori 60 hari tanpa
   commit sama sekali.** Di sini itu jarang jadi masalah, karena setiap
   kali workflow ini berhasil commit (karena Sheet berubah, ATAU karena
   ada perubahan UMKM/Produk/Wisata/Ulasan/Promo lewat GitHub),
   penghitung 60 harinya ikut ter-reset. Yang bisa membuatnya mati
   adalah kalau situs memang 60 hari penuh tidak diubah sedikit pun --
   kalau itu terjadi, GitHub mengirim satu email pemberitahuan, dan
   menghidupkannya lagi cukup satu klik di tab Actions.
2. **Jadwal cron itu "usaha terbaik", bukan janji waktu pasti.** Telat
   5-30 menit dari jadwal itu wajar, terutama saat GitHub sedang ramai.
   Ini hanya relevan kalau mode Sheet dipakai (DESA/TESTIMONI/KATEGORI)
   -- perubahan lewat `admin.html` (UMKM/Produk/Wisata/Ulasan/Promo)
   TIDAK menunggu jadwal ini sama sekali, tampil hampir seketika lewat
   trigger `push` ke `data/db/**`.
