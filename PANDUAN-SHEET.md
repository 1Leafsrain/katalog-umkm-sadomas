# Memakai Google Sheet sebagai sumber data (opsional)

Cara ini membuat warga bisa memperbarui katalog lewat Google Sheet biasa,
tanpa perlu akun GitHub sama sekali. Sebuah **GitHub Actions** berjalan
terjadwal (dan bisa dipicu manual), menarik isi Sheet, mengubahnya jadi
`data/katalog.js`, lalu commit sendiri kalau memang ada perubahan.
GitHub Pages menerbitkan ulang seperti biasa setelah commit itu masuk.

**Situsnya tetap 100% statis.** Pengunjung situs tidak pernah menghubungi
Google sama sekali -- yang bicara ke Google Sheet hanya robot GitHub
Actions, sekali per jadwal, bukan setiap kali ada yang membuka halaman.
Kecepatan situs untuk pengunjung sama persis seperti sekarang.

Ini **pilihan tambahan**, bukan keharusan. Kalau lebih nyaman mengedit
`data/katalog.js` langsung di GitHub seperti sebelumnya, ikuti
`PANDUAN-UPDATE.md` saja dan lewati berkas ini.

> Ada satu lapisan tambahan lagi di atas cara ini: `PANDUAN-ADMIN.md`
> menambah halaman form (`admin.html`) supaya pengurus tidak perlu buka
> spreadsheet mentah untuk tambah/ubah/hapus data -- form itu menulis ke
> Sheet yang sama yang disiapkan di panduan ini. Selesaikan panduan ini
> dulu, baru lanjut ke situ kalau mau.

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
Warga edit Google Sheet
        |
GitHub Actions jalan (jadwal / tombol manual)
        |
Tarik tiap tab sebagai CSV -> susun jadi data/katalog.js
        |
Commit HANYA kalau isinya berubah
        |
GitHub Pages menerbitkan ulang otomatis
```

## 1. Siapkan Google Sheet-nya

1. Buat Google Sheet baru, **pakai akun desa**, bukan akun pribadi.
2. Buat **7 tab**, namanya harus PERSIS seperti ini (huruf besar/kecil ikut
   diperhatikan): `DESA`, `TESTIMONI`, `KATEGORI`, `UMKM`, `PRODUK`,
   `ULASAN`, `WISATA`.
3. Supaya tidak mengetik ulang data yang sudah ada, jalankan sekali di
   komputer (perlu Node.js terpasang):

   ```bash
   node scripts/katalog-ke-sheet.mjs
   ```

   Ini membuat folder `sheet-seed/` berisi 7 berkas CSV, isinya data yang
   sekarang sudah ada di `data/katalog.js`. Untuk tiap tab yang tadi dibuat:
   buka tabnya -> **File > Import > Upload** -> pilih CSV yang namanya sama
   dengan tab itu -> pilih **Replace current sheet** -> Import data.
4. Buka **Share** (kanan atas) -> **General access** -> ubah jadi
   **Anyone with the link**, peran **Viewer**. Tanpa ini, GitHub Actions
   tidak bisa membaca Sheet-nya.

   Karena tabnya jadi bisa dibaca siapa saja yang punya tautannya, **jangan
   taruh catatan internal** di tab-tab ini -- harga modal, nomor pribadi
   yang bukan untuk pembeli, catatan antar-pengurus. Kalau perlu catatan
   begitu, taruh di Sheet atau dokumen yang terpisah.
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
4. Sejak titik ini, **jangan edit `data/katalog.js` langsung lagi** --
   perubahannya akan tertimpa oleh jadwal berikutnya. Semua perubahan isi
   lewat Sheet.

Boleh menghapus folder `sheet-seed/` setelah langkah 1 selesai -- folder
itu cuma alat bantu sekali pakai saat mengisi Sheet pertama kali, tidak
dipakai lagi setelah itu.

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

### Tab `UMKM`

`slug`, `nama`, `kategori`, `pemilik`, `berdiri`, `pekerja`, `wa`,
`alamat`, `foto`, `penilaian`, `jamBuka`, `pengiriman`, `fotoLokasi`,
`keteranganGaleri`, lalu empat pasang untuk foto proses:
`galeri1_judul`, `galeri1_foto`, `galeri2_judul`, `galeri2_foto`,
`galeri3_judul`, `galeri3_foto`, `galeri4_judul`, `galeri4_foto`,
dan `deskripsi`. Boleh diisi kurang dari 4 pasang, sisanya biarkan kosong.

### Tab `PRODUK`

`slug`, `nama`, `umkm` (harus sama persis dengan `slug` UMKM pemiliknya),
`kategori`, `harga`, `satuan`, `foto`, `penilaian`, `galeri1`..`galeri4`
(nama berkas foto tambahan), `unggulan` (isi `TRUE` supaya tampil di
beranda, kosongkan/`FALSE` kalau tidak), `deskripsi`, lalu enam pasang
untuk rincian: `rincian1_label`, `rincian1_isi`, ... sampai `rincian6`.

### Tab `ULASAN`

`produk` (slug produk yang diulas), `nama`, `asal`, `penilaian` (1-5),
`teks`. Satu baris satu ulasan. **Isi hanya ulasan sungguhan yang sudah
diizinkan pembelinya** -- sama seperti aturan lama, ulasan karangan
gampang ketahuan dan merugikan nama desa.

### Tab `WISATA`

`slug`, `nama`, `jenis` (contoh: Air Terjun, Bukit, Kolam Pemandian),
`alamat`, `jamBuka`, `tiket`, `kontak` (nomor WA untuk lokasi ini,
kosongkan untuk memakai WA desa), `foto`, `fotoLokasi`, `penilaian`,
`keteranganGaleri`, lalu `galeri1_judul`/`galeri1_foto` sampai
`galeri4`, dan `deskripsi`.

## Yang tetap tidak lewat Sheet

**Foto.** Sheet hanya menyimpan *nama berkas* fotonya (contoh:
`gabin-tape-original.jpg`). Fotonya sendiri tetap harus diunggah ke folder
`assets/img/` di GitHub seperti biasa (lihat `PANDUAN-UPDATE.md` bagian
"Menambah foto"). Sheet tidak bisa menyimpan berkas gambar.

## Sangat penting: kolom nomor WhatsApp

Google Sheets kadang mengubah angka panjang jadi **notasi ilmiah**
(contoh: `6281234567890` berubah tampil jadi `6.28123E+11`) kalau selnya
diformat sebagai Angka, bukan Teks. Ini bisa membuat tombol WhatsApp
tertaut ke nomor yang salah tanpa ada yang sadar.

Sebelum mengetik nomor WA di kolom `wa` atau `kontak`: pilih kolomnya,
lalu **Format > Angka > Teks biasa**, baru ketik nomornya. Kalau lupa,
workflow-nya akan mendeteksi dan memberi peringatan di log Actions (lihat
bagian di bawah), dan nomor itu diperlakukan seperti belum diisi supaya
tidak ada pesan pembeli yang nyasar.

## Kalau workflow gagal

Buka tab **Actions**, klik jalannya yang bertanda silang merah, baca
catatannya. Dua jenis pesan:

- **Peringatan** (data tetap diterbitkan) -- misalnya kolom `umkm` di
  tab PRODUK menunjuk ke slug yang tidak ada, atau nomor WA kena notasi
  ilmiah. Situs tetap terbit, tapi baiknya diperbaiki di Sheet.
- **Kesalahan** (data TIDAK diterbitkan) -- saat ini hanya untuk slug yang
  dobel di tab UMKM/PRODUK/WISATA. Situs tetap menampilkan data yang
  terakhir benar sampai slug dobelnya diperbaiki, lalu jalankan lagi lewat
  tombol **Run workflow**.

## Dua hal yang perlu diketahui soal GitHub Actions

1. **Jadwal terjadwal dimatikan otomatis kalau repositori 60 hari tanpa
   commit sama sekali.** Di sini itu jarang jadi masalah, karena setiap
   kali workflow ini berhasil commit (karena Sheet berubah), penghitung
   60 harinya ikut ter-reset. Yang bisa membuatnya mati adalah kalau
   Sheet-nya memang 60 hari penuh tidak diubah sedikit pun -- kalau itu
   terjadi, GitHub mengirim satu email pemberitahuan, dan menghidupkannya
   lagi cukup satu klik di tab Actions.
2. **Jadwal cron itu "usaha terbaik", bukan janji waktu pasti.** Telat
   5-30 menit dari jadwal itu wajar, terutama saat GitHub sedang ramai.
   Jangan janjikan ke warga "begitu Sheet diubah langsung tampil" --
   kalau perubahan perlu tampil cepat, pakai tombol **Run workflow**
   di tab Actions, jangan menunggu jadwal.
