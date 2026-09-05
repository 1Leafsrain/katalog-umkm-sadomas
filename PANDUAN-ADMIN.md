# Form admin (tambah / ubah / hapus data lewat halaman web)

Cara ini menambah **halaman form** di atas Google Sheet yang sudah disiapkan
lewat `PANDUAN-SHEET.md` -- supaya pengurus tidak perlu buka spreadsheet
mentah untuk tambah/ubah/hapus UMKM, produk, wisata, atau ulasan. Formnya
dihost statis di GitHub Pages seperti halaman lain, tapi saat disimpan,
datanya dikirim ke **Google Apps Script Web App** yang menulis langsung ke
Sheet yang sama dipakai `PANDUAN-SHEET.md`.

**Wajib sudah menyelesaikan `PANDUAN-SHEET.md` dulu** (Sheet dengan 7 tab
sudah ada, sudah dibagikan "Anyone with the link"). Panduan ini menambah satu
lapisan di atasnya, bukan pengganti.

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
   `https://<akun>.github.io/katalog-umkm-sadomas/admin.html`).
2. Di bagian **Pengaturan**: tempel Web app URL dari langkah sebelumnya, isi
   kata sandi yang tadi diisi di `KATA_SANDI`. Centang "Ingat kata sandi di
   peramban ini" kalau memakai perangkat pribadi yang tidak dipakai orang
   lain (jangan dicentang di komputer/HP bersama).
3. Klik **Simpan Pengaturan**.
4. Pilih **Jenis data** (UMKM / Produk / Wisata / Ulasan), klik
   **Muat Daftar** untuk melihat data yang sudah ada.
5. **Tambah data baru**: klik **+ Tambah Baru**, isi form, klik **Simpan**.
6. **Ubah data**: klik **Ubah** pada salah satu baris di daftar, ubah
   isiannya, klik **Simpan**.
7. **Hapus data**: klik **Hapus** pada salah satu baris di daftar (akan ada
   konfirmasi sebelum benar-benar terhapus).
8. Setelah selesai, buka tab **Actions** di GitHub, jalankan workflow
   **"Tarik data dari Google Sheet"** lewat tombol **Run workflow** supaya
   perubahannya langsung tampil di situs -- jangan menunggu jadwal kalau
   memang ingin cepat.

Halaman ini hanya menangani tab `UMKM`, `PRODUK`, `WISATA`, dan `ULASAN` --
empat tab yang isinya banyak baris berulang. Tab `DESA`, `TESTIMONI`, dan
`KATEGORI` isinya cuma sedikit baris/pengaturan, tetap diedit langsung di
Sheet seperti dijelaskan di `PANDUAN-SHEET.md`.

## Soal keamanan -- baca ini

`admin.html` **bisa dibuka siapa saja yang tahu alamatnya** -- GitHub Pages
tidak punya sistem login. Halaman ini sengaja tidak ditautkan di menu situs
supaya tidak gampang ditemukan, tapi itu bukan pengaman sungguhan.

Yang **benar-benar** mencegah orang asing menulis data adalah pengecekan
kata sandi di `Code.gs` (dijalankan di server Google, bukan di halaman ini).
Tanpa kata sandi yang benar, permintaan tambah/ubah/hapus akan ditolak.
Membaca data (tombol Muat Daftar) tidak perlu kata sandi -- datanya sama
dengan yang sudah publik di halaman katalog.

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

- **"Alamat Web App belum diisi"** -- isi dulu di bagian Pengaturan.
- **"Kata sandi salah"** -- cocokkan lagi dengan `KATA_SANDI` di `Code.gs`,
  ingat huruf besar/kecil ikut diperhatikan.
- **"Tab '...' tidak dikenal"** -- nama tab di Sheet berubah/typo. Nama tab
  harus persis `UMKM`, `PRODUK`, `WISATA`, `ULASAN`.
- Error CORS di console peramban (`blocked by CORS policy`) -- coba deploy
  ulang Web App-nya (langkah 2), pastikan "Who has access" masih **Anyone**.
- Kolom `wa`/`kontak` tetap sebaiknya diperiksa sesekali langsung di Sheet --
  `Code.gs` sudah memaksa format sel jadi Teks Biasa sebelum menulis nomor,
  tapi kalau ada keraguan, buka selnya dan pastikan tidak berubah jadi
  notasi ilmiah (contoh `6.28123E+11`).
