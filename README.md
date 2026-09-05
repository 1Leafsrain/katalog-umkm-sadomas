# Katalog UMKM Desa Sadomas

Situs statis (HTML, CSS, JavaScript biasa) untuk menampilkan profil dan produk
UMKM Desa Sadomas, Kecamatan Rajagaluh, Kabupaten Majalengka. Tidak memakai
basis data, tidak memakai kerangka kerja, dan tidak perlu proses *build* —
berkas apa adanya langsung bisa dilayani GitHub Pages.

## Isi folder

```
index.html         beranda
katalog.html       daftar produk + pencarian + saringan kategori
umkm.html          profil satu UMKM        (dibuka lewat ?u=slug)
produk.html        rincian satu produk     (dibuka lewat ?p=slug)
wisata.html        daftar tempat wisata desa
destinasi.html     rincian satu tempat wisata (dibuka lewat ?w=slug)
404.html           halaman untuk alamat salah
.nojekyll          mematikan pemrosesan Jekyll di GitHub Pages
data/katalog.js    SATU-SATUNYA berkas yang perlu diubah untuk memperbarui isi
assets/style.css   gaya tampilan
assets/app.js      penyusun halaman + seluruh ikon (SVG di dalam berkas)
assets/fonts/      huruf Plus Jakarta Sans, disimpan sendiri
assets/img/        tempat menyimpan foto produk
admin.html         form tambah/ubah/hapus data (opsional, lihat PANDUAN-ADMIN.md)
scripts/           alat bantu Node.js untuk mode Google Sheet (opsional)
scripts/apps-script/ kode Google Apps Script untuk form admin (opsional)
.github/workflows/ workflow GitHub Actions untuk mode Google Sheet (opsional)
```

## Tiga cara memperbarui isi

1. **Edit `data/katalog.js` langsung di GitHub** -- lihat `PANDUAN-UPDATE.md`.
   Cocok kalau yang mengelola sudah biasa dengan GitHub.
2. **Edit lewat Google Sheet** -- lihat `PANDUAN-SHEET.md`. Cocok kalau
   pengelola cukup pegang Google Sheets, tidak perlu akun GitHub sama
   sekali. Sebuah GitHub Actions menariknya secara berkala dan
   men-commit-kan `data/katalog.js` secara otomatis; situsnya sendiri
   tetap 100% statis, pengunjung tidak pernah menghubungi Google.
3. **Edit lewat form admin (`admin.html`)** -- lihat `PANDUAN-ADMIN.md`.
   Dibangun di atas cara nomor 2: halaman form statis yang menulis ke Sheet
   yang sama lewat Google Apps Script, jadi pengurus tidak perlu buka
   spreadsheet mentah untuk tambah/ubah/hapus UMKM, produk, wisata, atau
   ulasan.

Kalau mode Sheet sudah dipakai (variabel `SHEET_ID` sudah diisi),
`data/katalog.js` berubah jadi berkas hasil otomatis -- jangan diedit
langsung lagi, ikuti cara nomor 2 atau 3.

## Tidak ada satu pun panggilan ke server luar

Halaman ini tidak memuat Tailwind CDN, Google Fonts, pustaka ikon, maupun
skrip pihak ketiga. Semuanya ada di dalam repositori:

- **Gaya** ditulis langsung di `assets/style.css`. Ukuran, jarak, dan warnanya
  disalin dari berkas desain (kelas `px-20` menjadi `80px`, `rounded-2xl`
  menjadi `16px`, dan seterusnya) sehingga tampilannya sama tanpa memuat
  Tailwind. Padanan lengkapnya ditulis di bagian atas berkas CSS.
- **Ikon** digambar sebagai SVG di dalam `assets/app.js`.
- **Huruf** Plus Jakarta Sans disimpan di `assets/fonts/` sebagai satu berkas
  woff2 variabel berukuran 27 KB, lengkap dengan lisensinya (SIL OFL 1.1).

Akibatnya situs tetap terbuka penuh walau jaringan sedang buruk, dan tidak ada
bagian yang mendadak rusak kalau layanan pihak ketiga berubah atau diblokir.

## Memasang ke GitHub Pages

1. Buat akun GitHub **memakai email desa**, bukan email pribadi mahasiswa.
   Setelah KKM selesai, akun ini yang memegang situsnya.
2. Buat repositori baru, misalnya `katalog-umkm-sadomas`, pilih **Public**.
   Repositori privat tidak bisa memakai GitHub Pages di paket gratis.
3. Unggah seluruh isi folder ini ke repositori (tombol **Add file → Upload
   files**, seret semua berkas dan folder sekaligus, lalu **Commit changes**).
   Pastikan `index.html` berada di akar repositori, bukan di dalam subfolder.
4. Buka **Settings → Pages**. Pada bagian *Build and deployment*:
   - Source: **Deploy from a branch**
   - Branch: **main**, folder: **/ (root)** → **Save**
5. Tunggu satu sampai dua menit. Alamat situs muncul di halaman yang sama:
   `https://<nama-akun>.github.io/katalog-umkm-sadomas/`

Setiap kali berkas diubah dan disimpan, GitHub Pages menerbitkan ulang otomatis
dalam waktu sekitar satu menit. Kalau perubahan belum kelihatan, muat ulang
dengan Ctrl+F5 (atau tutup dan buka lagi tab di HP).

## Empat hal yang sering membuat situs GitHub Pages gagal tampil

1. **Nama berkas beda huruf besar-kecil.** Server GitHub membedakan `Gabin.JPG`
   dan `gabin.jpg`, sedangkan Windows tidak. Foto yang tampil di laptop bisa
   hilang di situs. Aman: pakai huruf kecil semua, tanpa spasi, tanpa tanda baca
   — contoh `gabin-tape-original.jpg`.
2. **Alamat berkas diawali garis miring.** Situs ini berada di dalam subfolder
   `/katalog-umkm-sadomas/`, jadi `/assets/style.css` akan meleset. Semua tautan
   di berkas ini sudah ditulis relatif (`assets/style.css`) — jangan diubah jadi
   diawali `/`.
3. **`.nojekyll` terhapus.** Berkas kosong ini mencegah GitHub memproses situs
   sebagai Jekyll. Tanpa berkas itu, folder atau berkas yang diawali garis bawah
   akan diabaikan.
4. **Repositori dibuat privat.** Halaman Pages akan menolak menerbitkan.

## Mencoba di komputer sendiri

Klik ganda `index.html` sudah cukup untuk melihat tampilan, karena data dimuat
sebagai berkas JavaScript biasa (bukan lewat `fetch`, yang diblokir peramban
saat membuka berkas langsung dari cakram).

Kalau ingin persis seperti di server:

```bash
cd folder-situs
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## Memakai nama domain sendiri

Kalau nanti desa mendapat domain `sadomas.desa.id`:

1. Buat berkas bernama `CNAME` (tanpa ekstensi) berisi satu baris:
   `sadomas.desa.id`
2. Di pengaturan DNS domain, arahkan rekaman `CNAME` ke
   `<nama-akun>.github.io`
3. Kembali ke **Settings → Pages**, isi *Custom domain*, lalu centang
   **Enforce HTTPS** setelah sertifikat terbit (biasanya belasan menit).

Perlu diingat, domain `.desa.id` hanya bisa didaftarkan oleh perangkat desa
(Sekdes, Kasi, atau Kaur) dengan SK Kepala Desa, surat permohonan, dan surat
kuasa. Sambil menunggu, alamat `github.io` tetap bisa dipakai dan disebarkan.

## Yang wajib diperiksa sebelum situs disebarkan

Cari kata **GANTI** di dalam `data/katalog.js` — semuanya harus diganti. Selama
nomor WhatsApp masih bertulisan GANTI, tombol pesan sengaja dimatikan dan
bertulisan "Nomor WhatsApp belum diisi", supaya tidak ada pesan pembeli yang
nyasar ke nomor orang lain.

Daftar periksa singkat:

- [ ] Semua kata GANTI di `data/katalog.js` sudah diganti (termasuk blok
      TESTIMONI di beranda — kalau belum ada narasumber, kosongkan `teks: ""`
      supaya bagian itu tidak tampil)
- [ ] Nomor WhatsApp memakai awalan 62, bukan 08
- [ ] Nama, harga, dan kisaran harga sudah dikonfirmasi ke pemilik usaha
- [ ] Foto produk sudah diunggah ke `assets/img/` dan dituliskan di data
- [ ] Sudah dicoba dibuka di HP, bukan hanya di laptop
- [ ] Pemilik UMKM sudah setuju nama, foto, dan nomornya ditampilkan di internet
- [ ] Bintang penilaian dan ulasan pembeli hanya diisi kalau benar-benar ada
      orangnya. Keduanya memang sengaja kosong bawaan: bintang tidak muncul
      selama `penilaian: 0`, dan bagian ulasan tidak muncul selama daftarnya
      kosong

Catatan isi: data UMKM dan produk yang ada sekarang adalah **contoh** untuk
memperlihatkan bentuk situsnya. Angka penduduk dan pembagian wilayah diambil
dari catatan monografi desa dan perlu dicocokkan ulang dengan data resmi
sebelum dipublikasikan.

## Cara memperbarui isi

Lihat bagian "Tiga cara memperbarui isi" di atas, lalu buka
`PANDUAN-UPDATE.md`, `PANDUAN-SHEET.md`, atau `PANDUAN-ADMIN.md` sesuai cara
yang dipakai.
