# Form admin (tambah / ubah / hapus data lewat halaman web)

Cara ini menambah **halaman form** di atas Google Sheet yang sudah disiapkan
lewat `PANDUAN-SHEET.md` -- supaya pengurus tidak perlu buka spreadsheet
mentah untuk tambah/ubah/hapus UMKM, produk, wisata, atau ulasan. Formnya
dihost statis di GitHub Pages seperti halaman lain, tapi saat disimpan,
datanya dikirim ke **Google Apps Script Web App** yang menulis langsung ke
Sheet yang sama dipakai `PANDUAN-SHEET.md`.

**Wajib sudah menyelesaikan `PANDUAN-SHEET.md` dulu** (Sheet dengan tab-tab
katalog sudah ada, sudah dibagikan "Anyone with the link"). Panduan ini
menambah satu lapisan di atasnya, bukan pengganti. Selain tab katalog, form
admin ini juga butuh 2 tab tambahan yang khusus dijelaskan di sini:
`AKSES_UMKM` (kode akses tiap toko) dan `STATISTIK` (log kunjungan/klik-WA)
-- lihat `PANDUAN-SHEET.md` untuk kolomnya.

> **Sudah pernah pasang `Code.gs` versi lama?** Bagian statistik, promo,
> ulasan mandiri, DAN unggah foto di bawah ini butuh `Code.gs` versi
> TERBARU. Ulangi langkah 1-2 di bawah (salin ulang isi
> `scripts/apps-script/Code.gs` yang sekarang, tempel menimpa yang lama,
> lalu **Deploy > Manage deployments** -> pensil pada deployment aktif ->
> Version **New version** -> Deploy). Alamat Web App-nya TIDAK berubah,
> jadi tidak perlu isi ulang di `admin.html`. Karena versi terbaru
> menambah akses ke Google Drive (untuk unggah foto), Google akan
> menampilkan lagi layar izin ("Authorize access") saat Deploy -- klik
> **Allow** seperti langkah 1.5 di bawah.

```
admin.html (GitHub Pages)
      |  isi form, klik Simpan
      v
Apps Script Web App (nempel di Google Sheet)
      |  cek kata sandi, tulis baris
      v
Google Sheet  <-- (sama persis dengan yang dipakai PANDUAN-SHEET.md)
      |
GitHub Actions menariknya (jadwal / tombol manual, lihat PANDUAN-SHEET.md)
      v
data/katalog.js diperbarui -> GitHub Pages terbit ulang
```

**Perubahan lewat form admin TIDAK langsung muncul di katalog publik.**
Sama seperti mengedit Sheet manual: harus menunggu GitHub Actions menariknya
(jadwal, atau tombol *Run workflow* untuk yang tidak mau menunggu).

## 1. Pasang Apps Script di Google Sheet

1. Buka Google Sheet-nya, lalu menu **Extensions > Apps Script**.
2. Akan terbuka editor kode dengan berkas `Code.gs` kosong berisi
   `function myFunction() {}`. Hapus semuanya.
3. Buka `scripts/apps-script/Code.gs` di repositori ini, salin semua isinya,
   tempel ke editor Apps Script tadi.
4. Cari baris `var KATA_SANDI = "GANTI_KATA_SANDI_ADMIN";` di dekat atas.
   **Ganti** `GANTI_KATA_SANDI_ADMIN` dengan PIN pilihan sendiri (bebas,
   tidak harus rumit -- ini cuma penyaring supaya bukan sembarang orang yang
   tahu alamat Web App-nya bisa menulis data, bukan kata sandi akun Google).
5. Simpan (ikon disket, atau Ctrl/Cmd+S).

## 2. Deploy sebagai Web App

1. Klik tombol biru **Deploy** (kanan atas) -> **New deployment**.
2. Kalau belum ada pilihan jenis, klik ikon gerigi di sebelah "Select type"
   -> pilih **Web app**.
3. Isi:
   - Description: bebas, misalnya "Form admin katalog"
   - Execute as: **Me** (akun yang punya Sheet ini)
   - Who has access: **Anyone**
4. Klik **Deploy**.
5. Google akan minta izin ("Authorize access") karena skripnya mengakses
   Sheet ini. Klik akun Google yang dipakai -> kalau muncul layar "Google
   hasn't verified this app", klik **Advanced** -> **Go to (nama proyek)
   (unsafe)** -> **Allow**. Ini normal untuk skrip buatan sendiri yang belum
   didaftarkan ke Google, bukan tanda ada yang salah.
6. Setelah selesai, akan muncul **Web app URL** berbentuk:
   `https://script.google.com/macros/s/xxxxxxxxxxxxx/exec`
   **Salin alamat ini.**

### Coba dulu sebelum dipakai

Tempel alamat tadi + `?tab=UMKM` di tab peramban baru, contoh:
`https://script.google.com/macros/s/xxxxx/exec?tab=UMKM`

Kalau berhasil, muncul teks JSON berisi data UMKM yang sekarang
(`{"data":[...]}`). Kalau muncul halaman error Google, ulangi langkah
deploy dan pastikan "Who has access" memang **Anyone**.

## 3. Pakai halaman admin

1. Buka `admin.html` di situs (misalnya
   `https://<akun>.github.io/katalog-umkm-sadomas/admin.html`). Yang tampil
   pertama kali adalah layar **Masuk**.
2. Tempel Web app URL dari langkah sebelumnya, isi kata sandi yang tadi
   diisi di `KATA_SANDI`. Centang "Ingat kata sandi di peramban ini" kalau
   memakai perangkat pribadi yang tidak dipakai orang lain (jangan
   dicentang di komputer/HP bersama).
3. Klik **Masuk**. Kalau kata sandinya cocok, bagian Data dan form
   tambah/ubah baru muncul. Kalau salah, tetap di layar Masuk dengan pesan
   "Kata sandi salah."
4. Pilih **Jenis data** (UMKM / Produk / Wisata / Ulasan / Promo per-UMKM /
   Kode akses toko), klik **Muat Daftar** untuk melihat data yang sudah ada.
5. **Tambah data baru**: klik **+ Tambah Baru**, isi form, klik **Simpan**.
6. **Ubah data**: klik **Ubah** pada salah satu baris di daftar, ubah
   isiannya, klik **Simpan**.
7. **Hapus data**: klik **Hapus** pada salah satu baris di daftar (akan ada
   konfirmasi sebelum benar-benar terhapus).
8. Setelah selesai, buka tab **Actions** di GitHub, jalankan workflow
   **"Tarik data dari Google Sheet"** lewat tombol **Run workflow** supaya
   perubahannya langsung tampil di situs -- jangan menunggu jadwal kalau
   memang ingin cepat.

Halaman ini menangani tab `UMKM`, `PRODUK`, `WISATA`, `ULASAN`, `PROMO`, dan
`AKSES_UMKM` -- tab-tab yang isinya banyak baris berulang. Tab `DESA`,
`TESTIMONI`, dan `KATEGORI` isinya cuma sedikit baris/pengaturan, tetap
diedit langsung di Sheet seperti dijelaskan di `PANDUAN-SHEET.md`.

## 4. Statistik kunjungan & klik-WhatsApp

Bagian **Statistik** di bawah Data/Form (muncul juga setelah berhasil
Masuk) menunjukkan grafik kunjungan halaman toko & klik tombol WhatsApp,
per toko dan 14 hari terakhir. Klik **Muat Statistik** untuk memuatnya --
data ini dicatat langsung dari situs publik (tidak lewat GitHub Actions),
jadi selalu bisa dimuat ulang tanpa menunggu sinkron.

**Supaya statistik ini benar-benar tercatat**, isi konstanta
`URL_STATISTIK` di `assets/app.js` DAN `assets/toko-saya.js` dengan Web
App URL yang sama dipakai di atas (dua-duanya harus sama). Selama masih
`"GANTI_URL_APPS_SCRIPT"`, situs publik tidak mencatat apa-apa (tidak
error, cuma diam saja).

## 5. Kode akses toko & halaman "Toko Saya"

Tiap pemilik UMKM bisa lihat statistik tokonya sendiri dan mengatur
promo yang tampil di halaman profil tokonya, lewat `toko-saya.html` --
TANPA perlu kata sandi admin. Caranya:

1. Di admin.html, pilih Jenis data **Kode akses toko**, klik **+ Tambah
   Baru**.
2. Isi **Slug UMKM** (harus sama persis dengan slug tokonya) dan **Kode
   akses** bebas pilihan sendiri (tidak harus rumit, cukup mudah diingat
   pemilik tokonya).
3. Simpan, lalu kabari pemilik usahanya: alamat
   `https://<akun>.github.io/katalog-umkm-sadomas/toko-saya.html`, nama
   tokonya, dan kode aksesnya -- lewat WhatsApp atau langsung, bukan grup
   umum.

Pemilik toko masuk dengan memilih nama tokonya + kode akses. Promo yang
disimpan lewat halaman itu tampil di situs publik sekitar 30-60 menit
kemudian (menunggu sinkron terjadwal, sama seperti perubahan lewat
admin.html), bukan langsung seketika.

## 6. Mengunggah foto lewat form admin

Kolom **Foto utama**, **Foto lokasi**, dan foto galeri (di UMKM, Produk,
Wisata) punya dua cara diisi, berdampingan:

1. **Unggah langsung** -- klik **Choose File**, pilih foto dari HP/komputer.
   Foto dikecilkan otomatis di peramban (maksimum sisi 1600px, dimampatkan
   ke JPEG) lalu dikirim ke Apps Script, yang menyimpannya ke sebuah folder
   Google Drive bernama **"Katalog UMKM Sadomas - Foto"** (dibuat otomatis
   di Drive akun yang dipakai men-deploy Apps Script, saat unggahan
   pertama). Kolom teksnya otomatis terisi URL Drive hasil unggahan, dan
   muncul pratinjau kecil di bawahnya.
2. **Ketik manual** -- seperti sebelumnya, ketik nama berkas yang sudah ada
   di folder `assets/img/` repositori GitHub (untuk foto lama/bawaan).

Kedua cara boleh dicampur bebas antar baris data -- sebagian foto lama tetap
berupa nama berkas, foto baru berupa URL Drive, keduanya tampil sama-sama
benar di katalog publik.

**Foto yang diunggah TIDAK ikut alur sinkron GitHub Actions** -- begitu
tersimpan ke Drive, URL-nya langsung valid. Yang tetap menunggu sinkron
30-60 menit hanyalah munculnya URL itu di katalog publik (sama seperti
kolom data lain yang diubah lewat admin.html).

Catatan keandalan: `drive.google.com/uc?export=view` adalah cara resmi
Google untuk menyajikan isi berkas Drive yang dibagikan publik, tapi bukan
CDN khusus gambar -- untuk katalog skala desa dengan pengunjung wajar ini
lebih dari cukup. Kalau suatu saat foto sering gagal tampil karena lalu
lintas yang sangat tinggi, pindahkan foto itu manual ke `assets/img/` lewat
GitHub dan ganti isian kolomnya jadi nama berkas.

## Soal keamanan -- baca ini

`admin.html` **bisa dibuka siapa saja yang tahu alamatnya** -- GitHub Pages
tidak punya sistem login. Halaman ini ditautkan lewat ikon gembok di pojok
kanan atas situs untuk kemudahan pengurus, tapi itu bukan pengaman
sungguhan (siapa pun boleh mengeklik ikon itu, bukan cuma pengurus). Layar
**Masuk** di depannya juga bukan login sungguhan (tidak ada akun per orang)
-- tetap satu kata sandi yang sama dipakai bersama semua pengurus.

Yang **benar-benar** mencegah orang asing menulis data adalah pengecekan
kata sandi di `Code.gs` (dijalankan di server Google, bukan di halaman ini).
Layar Masuk memeriksa kata sandi ke server itu juga (aksi `cekSandi`)
sebelum menampilkan bagian Data/Form -- jadi kalau kata sandinya sudah
diganti (lihat bagian "kalau bocor" di bawah), sesi yang kebetulan masih
tersimpan di peramban lama otomatis ditolak lagi, tidak diam-diam tetap
terbuka. Tanpa kata sandi yang benar, permintaan tambah/ubah/hapus akan
ditolak. Membaca data (tombol Muat Daftar) tidak perlu kata sandi -- datanya
sama dengan yang sudah publik di halaman katalog.

Tombol **Keluar** (muncul setelah berhasil masuk) mengunci lagi halamannya
dan menghapus kata sandi yang sempat diingat di peramban itu -- pakai ini
kalau memakai HP/komputer bersama.

**`toko-saya.html` memakai model yang berbeda**, bukan kata sandi admin:
tiap toko punya `kode` akses sendiri (tab `AKSES_UMKM`), dicek ulang ke
server tiap kali dipakai (tidak pernah diingat di peramban). Ini juga
bukan "login" sungguhan per orang -- satu kode dipakai bersama untuk satu
toko, sama seperti kata sandi admin dipakai bersama semua pengurus. Tab
`AKSES_UMKM` sendiri, berbeda dari tab lain, TIDAK bisa dibaca tanpa kata
sandi admin (lihat `TAB_RAHASIA` di `Code.gs`) -- supaya kode tiap toko
tidak ikut "publik" seperti data katalog lainnya.

Dua aksi lain (`catatStatistik` untuk mencatat kunjungan/klik-WA, dan
`kirimUlasan` untuk ulasan pembeli) sengaja TIDAK butuh kata sandi maupun
kode apa pun -- keduanya dipanggil otomatis dari situs publik untuk SEMUA
pengunjung. Validasinya diperketat di `Code.gs` (slug harus toko/produk
yang benar-benar ada, rating harus 1-5, dst.) supaya tidak jadi jalan
belakang menulis data bebas.

Karena itu:

- **Jangan sebarkan alamat `admin.html` maupun kata sandinya** ke luar
  pengurus yang berwenang.
- Kalau kata sandi bocor atau dicurigai, ganti secepatnya:
  1. Buka Apps Script, ubah nilai `KATA_SANDI` di `Code.gs`, simpan.
  2. **Deploy > Manage deployments** -> klik ikon pensil pada deployment
     yang aktif -> Version: **New version** -> **Deploy**.
     (Ini memperbarui Web App yang sudah jalan supaya memakai kata sandi
     baru, **tanpa** mengubah alamat URL-nya -- jadi kata sandi lama
     langsung tidak berlaku lagi.)
  3. Beri tahu kata sandi baru ke pengurus yang berhak lewat jalur yang
     aman (bukan grup WhatsApp umum).

## Kalau ada dua orang mengubah bersamaan

Nomor baris yang dipakai form ini untuk menemukan data (supaya bisa
ubah/hapus tanpa keliru baris) bisa bergeser kalau ada baris lain yang
dihapus di saat bersamaan oleh orang lain. Kalau muncul pesan "Baris tidak
ditemukan -- mungkin sudah diubah/dihapus orang lain": klik **Muat Daftar**
lagi supaya daftarnya segar, lalu ulangi.

## Kalau ada galat

- **"Isi alamat Web App dan kata sandi dulu"** -- kedua kolom di layar Masuk
  wajib diisi sebelum klik **Masuk**.
- **"Kata sandi salah"** -- cocokkan lagi dengan `KATA_SANDI` di `Code.gs`,
  ingat huruf besar/kecil ikut diperhatikan.
- **"Sesi tersimpan tidak berlaku lagi"** -- muncul otomatis saat membuka
  halaman kalau kata sandi yang diingat di peramban sudah tidak cocok lagi
  (biasanya karena `KATA_SANDI` baru saja diganti). Masuk ulang dengan kata
  sandi yang baru.
- **"Tab '...' tidak dikenal"** -- nama tab di Sheet berubah/typo. Nama tab
  harus persis `UMKM`, `PRODUK`, `WISATA`, `ULASAN`, `PROMO`, `AKSES_UMKM`.
- **Bagian Statistik selalu kosong / "Belum ada data kunjungan tercatat"**
  -- kemungkinan `URL_STATISTIK` di `assets/app.js` masih
  `"GANTI_URL_APPS_SCRIPT"` (situs publik belum pernah mencatat apa-apa),
  atau memang belum ada pengunjung sejak diaktifkan.
- **Di `toko-saya.html`, "Slug atau kode akses salah"** -- cocokkan lagi
  dengan baris di tab `AKSES_UMKM`; ingat besar/kecil huruf ikut
  diperhatikan.
- **Di `toko-saya.html`/form ulasan produk, "Fitur ini belum aktif"** --
  `URL_STATISTIK` di `assets/toko-saya.js`/`assets/app.js` masih belum
  diisi alamat Web App yang benar.
- Error CORS di console peramban (`blocked by CORS policy`) -- coba deploy
  ulang Web App-nya (langkah 2), pastikan "Who has access" masih **Anyone**.
- **"Gagal mengunggah: ..." di bawah kolom foto** -- kalau pesannya
  menyebut "Kata sandi salah", isi dulu kata sandi admin di bagian
  Pengaturan/Masuk (unggah foto butuh sandi, sama seperti simpan data
  lain). Kalau menyebut jenis berkas tidak didukung, pilih berkas
  JPG/PNG/WEBP. Kalau ini muncul pertama kali setelah deploy ulang
  `Code.gs`, kemungkinan Google belum diberi izin akses Drive -- ulangi
  **Deploy > Manage deployments** dan pastikan izin ("Authorize access")
  sudah di-**Allow**.
- Kolom `wa`/`kontak` tetap sebaiknya diperiksa sesekali langsung di Sheet --
  `Code.gs` sudah memaksa format sel jadi Teks Biasa sebelum menulis nomor,
  tapi kalau ada keraguan, buka selnya dan pastikan tidak berubah jadi
  notasi ilmiah (contoh `6.28123E+11`).
