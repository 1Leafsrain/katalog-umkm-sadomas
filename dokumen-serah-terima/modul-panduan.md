<style>
  /* Gaya khusus dokumen ini -- menimpa format-akademik.css (yang
     dipakai dokumentasi-pelatihan.md & berita-acara-serah-terima.md)
     karena letaknya belakangan dalam urutan CSS, bukan format baru
     yang dipasang lewat pengaturan VS Code. Sengaja tidak dijadikan
     format akademik (Times New Roman/rata kiri-kanan/BAB) -- dokumen
     ini gaya panduan pengguna biasa. */
  body{
    font-family:'Plus Jakarta Sans','Segoe UI',Arial,sans-serif !important;
    font-size:11pt; line-height:1.6; color:#22303c; text-align:left;
  }
  p{ text-indent:0 !important; text-align:left !important; margin:0 0 10pt 0; }
  h1,h2,h3{ text-align:left; text-indent:0; page-break-before:auto; letter-spacing:0; text-transform:none; }
  h1{ font-size:16pt; font-weight:800; color:#1e6091; margin:22pt 0 10pt; border-bottom:2pt solid #cfe3ee; padding-bottom:5pt; }
  h2{ font-size:12.5pt; font-weight:700; color:#1e6091; margin:16pt 0 6pt; }
  ol,ul{ margin:0 0 10pt 20pt; text-align:left; }
  li{ margin-bottom:5pt; }
  code{ font-family:'Courier New',monospace; font-size:.92em; background:#eef2f5; padding:0 3pt; border-radius:2pt; }
  table{ border-collapse:collapse; width:100%; margin:6pt 0 14pt; font-size:10pt; }
  th,td{ border:0.75pt solid #d3dde3; padding:6pt 8pt; text-align:left; vertical-align:top; }
  th{ background:#eaf1f6; color:#1e4d66; font-weight:700; }

  .sampul-panduan{ text-align:center; padding-top:10pt; page-break-after:always; }
  .garis-hijau{ height:6pt; background:#1c4331; margin:0 -1cm; }
  .p-kicker{ font-size:11pt; font-weight:800; color:#5b6b78; letter-spacing:.06em; margin:26pt 0 6pt; }
  .p-judul{ font-size:34pt; font-weight:800; color:#1c4331; margin:0 0 8pt; }
  .p-sub{ font-size:12pt; font-weight:700; color:#5b6b78; margin:0 0 26pt; }
  .p-logo{ width:220px; height:200px; margin:0 auto 26pt; border:1.5pt dashed #b9c3ca; border-radius:6pt;
    display:flex; align-items:center; justify-content:center; color:#8a97a1; font-size:11pt; font-weight:700; }
  .p-meta{ font-size:11pt; margin:0 0 4pt; }
  .p-meta b{ color:#22303c; }
  .p-url{ font-size:10.5pt; margin-top:14pt; }
  .p-url code{ color:#1c4331; }

  .kotak{ border-radius:6pt; padding:10pt 14pt; margin:10pt 0 14pt; font-size:10.5pt; border-width:1.4pt; border-style:solid; }
  .kotak b{ display:block; margin-bottom:4pt; font-size:10.5pt; }
  .kotak p{ margin:0 0 4pt; }
  .tip{ background:#eafaf6; border-color:#0e7c6b; }
  .tip b{ color:#0e7c6b; }
  .bahaya{ background:#fdecea; border-color:#c0392b; }
  .bahaya b{ color:#c0392b; }
  .penting{ background:#fef6e7; border-color:#d68910; }
  .penting b{ color:#d68910; }

  .gambar-panduan{ margin:14pt 0 16pt; text-align:center; page-break-inside:avoid; }
  .gambar-panduan img{ max-width:100%; border:1pt solid #d3dde3; border-radius:8pt; }
  .gambar-panduan.sempit img{ max-width:70%; }
  .keterangan-gambar{ font-size:9.5pt; color:#5b6b78; text-align:center; margin:6pt 0 0; font-style:italic; }

  .lembar-isian{ border:1.4pt solid #1c4331; border-radius:6pt; padding:12pt 16pt; margin:10pt 0 16pt; page-break-inside:avoid; }
  .lembar-isian h3{ margin-top:0; }
  .lembar-isian table{ margin:4pt 0; }
  .lembar-isian .catatan-isian{ font-size:10pt; color:#5b6b78; margin:8pt 0 0; }
</style>

<div class="sampul-panduan">
<div class="garis-hijau"></div>
<div class="p-kicker">BUKU PANDUAN PENGGUNAAN</div>
<div class="p-judul">KATALOG UMKM</div>
<div class="p-sub">WEBSITE ETALASE PRODUK UMKM DESA SADOMAS</div>
<div class="p-logo">LOGO KKM<br>DESA SADOMAS</div>
<p class="p-meta"><b>Kuliah Kerja Mahasiswa &mdash; Universitas Muhammadiyah Cirebon</b></p>
<p class="p-meta">Desa Sadomas, Kecamatan Rajagaluh, Kabupaten Majalengka</p>
<p class="p-meta">Tahun 2026</p>
<p class="p-url">Alamat situs: <code>https://1leafsrain.github.io/katalog-umkm-sadomas/</code></p>
<div class="garis-hijau"></div>
</div>

# 1. Tentang Katalog UMKM Sadomas

Katalog UMKM Sadomas adalah sebuah situs etalase: ia memajang profil pelaku usaha desa beserta produk yang dijualnya, agar dapat ditemukan orang dari luar desa. Selama ini produk UMKM Sadomas dipasarkan dari mulut ke mulut, sehingga jangkauannya berhenti di batas desa. Situs ini memindahkan etalase itu ke internet, tanpa mengubah cara warga berjualan.

Yang perlu dipahami sejak awal: situs ini **tidak memproses pesanan**. Ia mempertemukan, lalu menyingkir. Pembeli yang tertarik menekan satu tombol, dan percakapannya pindah ke WhatsApp pemilik usaha. Harga, ongkos kirim, dan kesepakatan tetap diurus langsung oleh penjual dan pembeli seperti biasa.

## Tiga bagian yang dikelola

| Bagian | Yang dikelola |
| --- | --- |
| UMKM | Profil usaha: nama, pemilik, nomor WhatsApp, alamat, jam buka, dan foto. |
| Produk | Barang atau jasa tiap UMKM, lengkap dengan harga dan fotonya. |
| Wisata Desa | Destinasi wisata Sadomas yang ditampilkan pada halaman tersendiri. |

<div class="kotak tip"><b>Satu data usaha dipakai di banyak tempat</b>
<p>Nama, nomor WhatsApp, dan foto sebuah UMKM cukup diisi satu kali di menu UMKM. Data itulah yang dipakai ulang oleh halaman produk, tombol pesan, dan halaman Toko Saya milik usaha tersebut.</p>
<p>Karena itu, memperbaiki nomor WhatsApp yang salah cukup dilakukan di satu tempat, dan seluruh halaman ikut benar.</p></div>

# 2. Alamat dan Cara Membuka

Situs ini dibuka lewat peramban biasa, seperti Chrome di Android atau Safari di iPhone. Tidak ada aplikasi yang wajib dipasang, dan pengunjung tidak perlu mendaftar akun.

<figure class="gambar-panduan"><img src="gambar/01-beranda.png" alt="Tampilan beranda situs Katalog UMKM Sadomas"><figcaption class="keterangan-gambar">Tampilan beranda situs. Ikon gembok di pojok kanan atas (sebelah ikon cari) adalah jalan pintas menuju halaman admin.</figcaption></figure>

| Siapa | Alamat yang dibuka | Perlu apa |
| --- | --- | --- |
| Pengunjung dan pembeli | `https://1leafsrain.github.io/katalog-umkm-sadomas/` | Tidak perlu apa-apa |
| Pengurus desa dan Karang Taruna | `admin.html` pada situs yang sama, atau tekan ikon gembok di pojok kanan atas tiap halaman | Kata sandi admin dan Alamat Web App (lihat Bagian 7) |
| Pemilik UMKM mitra | `toko-saya.html` pada situs yang sama | Kode akses toko masing-masing |

<div class="kotak penting"><b>Halaman admin bisa ditemukan siapa saja, kata sandinya yang menjaga</b>
<p>Berbeda dari yang mungkin terdengar di tempat lain, alamat halaman admin TIDAK dirahasiakan &mdash; ada ikon gembok yang menautkannya di kepala setiap halaman situs. Yang benar-benar mencegah orang asing mengubah data hanyalah kata sandi admin, diperiksa oleh Apps Script setiap kali ada yang mencoba masuk atau menyimpan perubahan (lihat Bagian 8 dan bagian keamanan di <code>PANDUAN-ADMIN.md</code>).</p></div>

## Memasang situs ke layar utama telepon

Situs dapat ditaruh di layar utama telepon sehingga terlihat dan terbuka seperti aplikasi, tanpa melalui Play Store.

| Perangkat | Langkahnya |
| --- | --- |
| Android (Chrome) | Tekan menu titik tiga di pojok kanan atas, pilih **Tambahkan ke Layar Utama**, lalu **Instal**. |
| iPhone (Safari) | Tekan ikon **Bagikan**, lalu pilih **Tambah ke Layar Utama**. |

<div class="kotak tip"><b>Tetap terbuka saat sinyal hilang</b>
<p>Setelah dipasang, situs masih bisa dibuka meski telepon sedang tanpa internet. Yang tampil adalah data terakhir yang sempat tersimpan di telepon itu, jadi perubahan terbaru baru terlihat setelah tersambung kembali.</p></div>

# 3. Halaman untuk Warga dan Pembeli

## Mencari dan memesan produk

1. Buka situs, lalu pilih menu **Katalog**.
2. Ketik nama produk atau nama usaha pada kotak pencarian, atau pilih kategori yang tersedia: Kuliner, Pertanian, Perikanan, atau Kerajinan.
3. Buka halaman produk yang dituju, lalu tekan tombol **Pesan via WhatsApp**. Pesan tersusun otomatis dan tinggal dikirim kepada pemilik usaha.

<figure class="gambar-panduan"><img src="gambar/02-katalog.png" alt="Halaman Katalog Produk dengan kotak pencarian dan pilihan kategori"><figcaption class="keterangan-gambar">Halaman Katalog: pencarian dan filter kategori ada di bagian atas.</figcaption></figure>

Sejak tombol itu ditekan, situs tidak ikut campur lagi. Tidak ada keranjang belanja, tidak ada pembayaran, dan tidak ada komisi yang dipotong.

<figure class="gambar-panduan"><img src="gambar/03-halaman-produk.png" alt="Halaman detail produk dengan tombol Pesan via WhatsApp"><figcaption class="keterangan-gambar">Halaman detail produk: harga, rincian, tombol Pesan via WhatsApp, dan (di bawahnya) ulasan pembeli.</figcaption></figure>

## Ulasan pembeli

Pembeli dapat meninggalkan ulasan langsung pada halaman produk. Ulasan tampil apa adanya, dan hanya pengurus desa yang dapat menghapusnya bila isinya tidak pantas. Ulasan yang sekadar buruk sebaiknya dibiarkan &mdash; etalase yang semua ulasannya bagus justru tidak dipercaya pembeli.

# 4. Mengelola Data lewat Halaman Admin

Seluruh isi katalog diubah dari satu tempat: halaman admin. Halaman ini yang dipegang pengurus desa atau Karang Taruna.

## Masuk ke halaman admin

1. Buka halaman `admin.html` pada situs (atau tekan ikon gembok di pojok kanan atas).
2. Isikan **Alamat Web App** dan **Kata Sandi Admin** (keduanya dicatat pada Bagian 7).
3. Tekan **Masuk**.

<figure class="gambar-panduan sempit"><img src="gambar/04-admin-masuk.png" alt="Layar Masuk halaman admin"><figcaption class="keterangan-gambar">Layar Masuk. Alamat Web App diisi sekali, lalu bisa dicentang "Ingat" di perangkat pribadi.</figcaption></figure>

<div class="kotak bahaya"><b>Alamat dan kata sandi admin tidak boleh disebar</b>
<p>Siapa pun yang mengetahui keduanya dapat mengubah dan menghapus seluruh data katalog. Simpan di tempat yang hanya diketahui pengurus berwenang, dan ganti kata sandinya bila ada pengurus yang berhenti (lihat Bagian 8).</p></div>

## Menambah, mengubah, dan menghapus data

1. Pilih **Jenis Data** yang hendak diubah pada menu pilihan.
2. Untuk data baru, tekan **+ Tambah Baru**. Untuk memperbaiki data lama, tekan **Ubah** pada barisnya.
3. Lengkapi isian bertanda bintang, lalu tekan **Simpan**.

## Mengunggah foto produk/UMKM

Kolom foto (Foto utama, Foto lokasi, dan foto galeri) punya dua cara diisi, berdampingan: tekan **Choose File** untuk mengunggah langsung dari HP/komputer, atau ketik nama berkas yang sudah ada di `assets/img/` untuk foto lama. Foto yang diunggah otomatis dikecilkan, tersimpan ke Google Drive, dan kolomnya terisi sendiri &mdash; tidak perlu mengetik nama berkas apa pun.

<figure class="gambar-panduan"><img src="gambar/05-admin-unggah-foto.png" alt="Widget unggah foto pada form admin, menampilkan pratinjau setelah berhasil"><figcaption class="keterangan-gambar">Setelah memilih berkas: kolom terisi otomatis, disertai pesan "Foto berhasil diunggah" dan pratinjau kecil.</figcaption></figure>

<div class="kotak tip"><b>Foto langsung tersimpan, tapi tetap menunggu sinkron untuk tampil</b>
<p>Begitu diunggah, foto sudah tersimpan permanen di Drive. Yang tetap menunggu 30-60 menit adalah munculnya foto itu di katalog publik &mdash; sama seperti kolom data lain yang diubah lewat admin.html (lihat kotak di bawah).</p></div>

## Jenis data yang bisa diubah

| Jenis data | Isinya |
| --- | --- |
| UMKM | Nama usaha, pemilik, nomor WhatsApp, alamat, jam buka, foto. |
| Produk | Barang atau jasa tiap UMKM beserta harga dan fotonya. |
| Wisata | Destinasi wisata desa untuk halaman Wisata. |
| Ulasan Pembeli | Ulasan yang masuk; dapat dihapus bila tidak pantas. |
| Promo per UMKM | Promosi yang biasanya diatur sendiri oleh pemilik toko (Bagian 5). |
| Kode Akses Toko | Kode rahasia tiap UMKM untuk masuk ke halaman Toko Saya. |

<div class="kotak penting"><b>Perubahan tidak langsung terlihat</b>
<p>Data yang baru disimpan belum tampil seketika di situs. Sinkronisasi otomatis berjalan setiap 30 sampai 60 menit, dan barulah perubahan itu terbit.</p>
<p>Bila perubahan perlu segera tampil &mdash; misalnya harga yang salah ketik &mdash; pengurus pemegang akun GitHub dapat mempercepatnya dengan cara pada Bagian 9.</p></div>

# 5. Toko Saya untuk Pemilik UMKM

Selain halaman admin milik desa, setiap pemilik UMKM punya halaman kecil miliknya sendiri. Di sana ia bisa melihat tokonya dilihat berapa orang, dan memasang promo tanpa perlu meminta tolong pengurus desa.

## Kode akses

Setiap UMKM memperoleh kode yang berbeda. Kode dibuat pengurus desa lewat menu **Kode Akses Toko** di halaman admin, lalu dikirimkan kepada pemilik usaha melalui WhatsApp. Kode ini bukan kata sandi admin, dan tidak memberi akses ke data UMKM lain.

## Melihat statistik dan memasang promo

1. Buka halaman `toko-saya.html`, pilih nama usaha, masukkan kode akses, lalu tekan **Masuk**.
2. Halaman menampilkan jumlah kunjungan dan jumlah klik tombol WhatsApp, disertai grafik 14 hari terakhir.
3. Untuk memasang promo, isi kolom promo, nyalakan pilihan **Tampilkan promo ini**, lalu tekan **Simpan Promo**. Promo terbit dalam 30 sampai 60 menit.

<figure class="gambar-panduan"><img src="gambar/06-toko-saya.png" alt="Halaman Toko Saya menampilkan statistik kunjungan, grafik, dan form promo"><figcaption class="keterangan-gambar">Halaman Toko Saya: statistik toko (kiri-atas jadi total, grafik di bawahnya) dan form Promo Toko.</figcaption></figure>

<div class="kotak tip"><b>Angka kunjungan adalah alat, bukan nilai rapor</b>
<p>Jumlah klik WhatsApp lebih berarti daripada jumlah kunjungan. Kunjungan banyak tetapi klik sedikit biasanya berarti fotonya kurang jelas atau harganya belum dicantumkan &mdash; keduanya bisa diperbaiki lewat halaman admin.</p></div>

# 6. Aplikasi Android

Isi situs juga tersedia sebagai aplikasi Android berupa berkas `.apk`, yang dipasang tanpa melalui Play Store.

1. Salin berkas `.apk` ke telepon Android lewat WhatsApp, Bluetooth, atau kabel data.
2. Buka berkas itu. Bila muncul peringatan &ldquo;Sumber tidak dikenal&rdquo;, nyalakan izin pemasangan pada menu Pengaturan yang muncul, lalu ulangi.
3. Tekan **Instal**, tunggu selesai, lalu buka dari layar utama.

Aplikasi ini menampilkan isi yang sama persis dengan situs. Data yang diperbarui lewat halaman admin ikut berubah di aplikasi dengan sendirinya, jadi aplikasi tidak perlu dipasang ulang setiap ada perubahan data.

# 7. Akun dan Alamat yang Dipegang Desa

Situs ini berdiri di atas tiga akun. Selama masa KKM ketiganya dipegang mahasiswa; setelah serah terima, ketiganya menjadi tanggung jawab desa. Kehilangan salah satunya berakibat berbeda, dan itu sebabnya ketiganya perlu dikenali.

| Akun | Fungsinya | Bila hilang |
| --- | --- | --- |
| GitHub | Menyimpan dan menerbitkan kode situs (GitHub Pages). | Situs tetap hidup, tetapi tidak bisa diperbaiki atau disinkronkan manual. |
| Google Sheet | Menyimpan seluruh data katalog dalam bentuk tabel. | Seluruh data katalog hilang bila tidak ada cadangan (Bagian 10). |
| Google Apps Script | Menghubungkan halaman admin dan Toko Saya dengan Google Sheet. | Halaman admin tidak bisa menyimpan perubahan apa pun. |

## Alamat penting

Catat dan simpan alamat berikut. Tiga baris pertama boleh diketahui umum dan sudah pasti (tidak berubah); dua baris terakhir bersifat rahasia, hanya diisi pengurus berwenang, dan sengaja dikosongkan di sini &mdash; lihat kotak "Lembar isian" di bawah.

| Keperluan | Alamat |
| --- | --- |
| Situs katalog (untuk umum) | `https://1leafsrain.github.io/katalog-umkm-sadomas/` |
| Repositori kode di GitHub | `https://github.com/1leafsrain/katalog-umkm-sadomas` |
| Halaman admin & Toko Saya | `admin.html` dan `toko-saya.html` pada alamat situs di atas (bukan rahasia, lihat kotak di Bagian 2) |
| Kata sandi admin | *(lihat Lembar Isian di bawah)* |
| Alamat Web App Apps Script | *(lihat Lembar Isian di bawah)* |

<div class="lembar-isian">
<h3>Lembar Isian &mdash; dilengkapi saat serah terima</h3>
<p>Bagian ini SENGAJA kosong di berkas digitalnya. Isi dengan tulisan tangan pada salinan cetak, atau ketik di salinan pribadi yang TIDAK ikut disimpan di GitHub (repositori ini bersifat publik) &mdash; supaya kata sandi dan alamat Web App tidak pernah tersimpan di tempat yang bisa dibaca umum.</p>

| Yang diisi | Isian |
| --- | --- |
| Kata sandi admin (`KATA_SANDI` di Code.gs) | ...................................................... |
| Alamat Web App Apps Script | ...................................................... |
| Nama & no. WA pemegang akun GitHub | ...................................................... |
| Nama & no. WA pemegang akun Google (Sheet + Apps Script) | ...................................................... |
| Nama & no. WA Kepala Desa | ...................................................... |
| Nama & no. WA Ketua Karang Taruna | ...................................................... |
| Nama & no. WA penanggung jawab teknis harian | ...................................................... |
| Tanggal serah terima | ...................................................... |
| Jumlah UMKM mitra (untuk stiker QR, lihat dokumen Stiker Kode QR) | ...................................................... |

<p class="catatan-isian">Simpan lembar yang sudah terisi di tempat aman (map dokumen KKM di kantor desa) &mdash; bukan difoto ke grup WhatsApp umum.</p>
</div>

# 8. Mengganti Kata Sandi Admin

Kata sandi admin sebaiknya diganti segera setelah serah terima, dan setiap kali ada pengurus yang berhenti.

1. Buka Google Sheet, pilih menu **Extensions &rsaquo; Apps Script**.
2. Ubah nilai pada variabel `KATA_SANDI` menjadi kata sandi baru.
3. Pilih **Deploy &rsaquo; Manage deployments**, tekan ikon pensil, ubah **Version** menjadi **New version**, lalu tekan **Deploy**.
4. Sampaikan kata sandi baru kepada pengurus berwenang lewat jalur pribadi, bukan lewat grup WhatsApp.

<div class="kotak bahaya"><b>Jangan memilih New deployment</b>
<p>Pada langkah ketiga, pilihan yang benar adalah <em>New version</em>. Bila yang dipilih <em>New deployment</em>, Apps Script membuat alamat Web App yang baru, dan halaman admin yang lama tidak dapat menyambung lagi sampai alamatnya diperbarui.</p></div>

# 9. Mempercepat Tampilnya Perubahan

Sinkronisasi berjalan sendiri setiap 30 sampai 60 menit. Bila tidak bisa menunggu, pemegang akun GitHub dapat menjalankannya sekarang juga.

1. Buka `https://github.com/1leafsrain/katalog-umkm-sadomas`, lalu masuk memakai akun GitHub pengelola situs.
2. Pilih tab **Actions**.
3. Pada daftar di sebelah kiri, pilih alur kerja bernama **&ldquo;Tarik data dari Google Sheet&rdquo;** &mdash; bukan yang lain, karena ada dua alur kerja di situs ini dan yang satunya hanya untuk peta situs (sitemap).
4. Tekan tombol **Run workflow**, lalu tekan **Run workflow** sekali lagi pada kotak yang muncul.
5. Tunggu sampai muncul tanda centang hijau, biasanya satu sampai tiga menit, lalu muat ulang halaman situs.

Bila yang muncul tanda silang merah, berarti sinkronisasi gagal dan data lama masih yang tampil. Jalankan sekali lagi; bila tetap gagal, hubungi penyusun modul ini.

# 10. Mencadangkan Data

Seluruh data katalog tinggal di satu berkas Google Sheet. Selama berkas itu aman, situs selalu bisa dibangun kembali; bila berkas itu hilang tanpa cadangan, tidak ada yang bisa dipulihkan. Cadangkan sekurang-kurangnya sebulan sekali.

1. Buka Google Sheet, pilih **File &rsaquo; Buat salinan** untuk menyimpan salinan di Google Drive desa.
2. Pilih juga **File &rsaquo; Unduh &rsaquo; Microsoft Excel (.xlsx)**, lalu simpan di komputer desa dengan nama yang memuat tanggalnya, misalnya `katalog-umkm-2026-09-15.xlsx`.
3. Catat tanggal pencadangan terakhir pada buku pemeliharaan di Bagian 13.

<div class="kotak tip"><b>Dua salinan di dua tempat berbeda</b>
<p>Salinan yang hanya ada di Google Drive akun yang sama tidak menolong bila akunnya yang bermasalah. Simpan satu salinan di luar akun itu &mdash; komputer kantor desa atau cakram lepas sudah cukup.</p></div>

# 11. Mengadopsi Situs ke Akun Milik Desa

Selama KKM berlangsung, kode situs tersimpan di akun GitHub mahasiswa. Agar desa benar-benar berdaulat atas situsnya, repositori itu sebaiknya dipindahkan ke akun GitHub milik desa. Selama belum dipindahkan, situs tetap berjalan, tetapi desa bergantung pada akun orang lain untuk setiap perbaikan.

## Menyiapkan akun GitHub desa

1. Buat akun GitHub baru di `https://github.com/signup` memakai alamat surel resmi desa, bukan surel pribadi pengurus.
2. Pakai nama pengguna yang mudah dikenali, misalnya nama desa.
3. Nyalakan verifikasi dua langkah, lalu catat surel dan kata sandinya di arsip desa.

## Cara pertama: memindahkan kepemilikan (dianjurkan)

Cara ini memindahkan repositori beserta seluruh riwayat dan pengaturannya. Dikerjakan oleh pemilik akun lama.

1. Buka `https://github.com/1leafsrain/katalog-umkm-sadomas`, lalu pilih tab **Settings**.
2. Gulir sampai bagian paling bawah, **Danger Zone**, lalu pilih **Transfer**.
3. Ketik nama repositori sebagai penegasan, lalu isikan nama pengguna akun GitHub desa.
4. Akun desa akan menerima undangan lewat surel dan harus menerimanya agar pemindahan selesai.
5. Setelah pindah, buka **Settings &rsaquo; Pages** pada akun desa, pastikan sumbernya masih menunjuk cabang yang sama, lalu simpan.

## Cara kedua: menyalin sendiri (fork)

Dipakai bila akun lama sudah tidak dapat dihubungi. Riwayat perubahan ikut tersalin, tetapi pengaturan variabel tidak.

1. Masuk dengan akun GitHub desa, buka `https://github.com/1leafsrain/katalog-umkm-sadomas`, lalu tekan **Fork**.
2. Pada salinan milik desa, buka **Settings &rsaquo; Pages**, pilih cabang sumbernya, lalu **Save**.
3. Buka **Settings &rsaquo; Secrets and variables &rsaquo; Actions**, buka tab **Variables**, lalu buat ulang variabel bernama `SHEET_ID` (isinya ID Google Sheet, tertulis di alamat Sheet itu sendiri, di antara &ldquo;/d/&rdquo; dan &ldquo;/edit&rdquo;) &mdash; salinan hasil <em>fork</em> tidak membawa variabel dari repositori asal.
4. Buka tab **Actions** dan nyalakan alur kerjanya, karena pada salinan baru alur kerja mula-mula dinonaktifkan.

<div class="kotak penting"><b>Alamat situs ikut berubah</b>
<p>Setelah pindah akun, alamat situs menjadi <code>https://&lt;nama-akun-desa&gt;.github.io/katalog-umkm-sadomas/</code>. Alamat lama akan dialihkan otomatis pada pemindahan kepemilikan, tetapi tidak pada <em>fork</em>.</p>
<p>Karena itu, tunda pencetakan stiker kode QR dalam jumlah besar sampai alamat tetapnya ditentukan. Bila desa kelak memakai nama domain sendiri, alamat itu dapat dipasang lewat <strong>Settings &rsaquo; Pages &rsaquo; Custom domain</strong> tanpa mengubah isi katalog.</p></div>

Data katalog tidak ikut berpindah dalam proses ini, sebab data tinggal di Google Sheet, bukan di GitHub. Yang perlu dipindahkan terpisah adalah kepemilikan berkas Google Sheet dan proyek Apps Script: buka berkasnya, tekan **Bagikan**, tambahkan surel desa, lalu jadikan ia **Pemilik**.

# 12. Bila Ada Masalah

| Yang terjadi | Sebabnya dan apa yang dilakukan |
| --- | --- |
| Data baru belum tampil di situs | Sinkronisasi belum berjalan. Tunggu sampai 60 menit, atau percepat dengan cara pada Bagian 9. |
| Tombol Pesan via WhatsApp tidak muncul | Nomor WhatsApp UMKM itu belum diisi. Lengkapi lewat halaman admin. |
| Produk tidak muncul di katalog | Kolom harga produk masih kosong. Isi harganya, lalu simpan. |
| Halaman admin menolak kata sandi | Kata sandi sudah pernah diganti. Hubungi pemegang akun Google Apps Script (Bagian 8). |
| Pemilik toko lupa kode aksesnya | Buka menu Kode Akses Toko di halaman admin, lalu kirim ulang kodenya lewat WhatsApp. |
| Halaman admin terbuka tetapi gagal menyimpan | Alamat Web App salah atau penerapan Apps Script berubah. Periksa alamatnya, lihat Bagian 8. |
| Foto produk gagal tampil | Kalau kolomnya diisi lewat tombol **Choose File** (unggah), foto seharusnya langsung tampil di pratinjau form &mdash; kalau gagal, lihat baris "Gagal mengunggah foto" di bawah. Kalau kolomnya diisi manual dengan MENGETIK nama berkas, penyebabnya hampir selalu nama berkas yang diketik tidak sama persis dengan nama berkas yang sudah ada di folder `assets/img/` di GitHub (huruf besar/kecil ikut dihitung beda). |
| Gagal mengunggah foto (pesan "Gagal mengunggah: ...") | Kalau pesannya "Kata sandi salah", isi dulu kata sandi admin di bagian Masuk. Kalau menyebut jenis berkas tidak didukung, pilih berkas JPG/PNG/WEBP. Kalau baru pertama kali terjadi setelah `Code.gs` dipasang ulang, kemungkinan izin akses Google Drive belum di-*Allow* saat Deploy &mdash; ulangi langkah Deploy (lihat `PANDUAN-ADMIN.md`). |

# 13. Pemeliharaan Rutin

Situs ini tidak menuntut perawatan teknis. Yang membuatnya tetap berguna hanyalah satu hal: datanya diperbarui. Katalog yang isinya usang lebih merugikan daripada tidak ada katalog sama sekali, sebab pembeli yang menghubungi nomor mati tidak akan mencoba kedua kalinya.

| No. | Yang diperiksa setiap bulan | Bulan/Tahun | Paraf |
| --- | --- | --- | --- |
| 1 | Data UMKM dan produk diperiksa serta diperbarui | | |
| 2 | Nomor WhatsApp yang sudah tidak aktif diperbaiki | | |
| 3 | Ulasan yang tidak pantas dihapus | | |
| 4 | Cadangan Google Sheet dibuat (Bagian 10) | | |
| 5 | Promo yang sudah lewat masanya dimatikan | | |
| 6 | Produk yang sudah tidak dijual dihapus | | |

<div class="kotak tip"><b>Yang perlu ditetapkan bersama desa</b>
<p>Siapa yang memegang akun GitHub dan akun Google desa, siapa yang berwenang menambah dan menghapus data, dan siapa yang menggantikan mereka bila berhenti.</p>
<p>Menunjuk satu penanggung jawab teknis tetap, dengan satu orang cadangan yang juga tahu kata sandinya, adalah satu-satunya hal yang menentukan situs ini masih hidup setahun lagi atau tidak.</p></div>
