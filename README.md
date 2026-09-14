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
robots.txt         izin crawler + alamat sitemap, untuk Google
sitemap.xml        daftar alamat situs untuk Google, DIBUAT OTOMATIS -- jangan edit langsung
manifest.json      nama, warna, dan ikon untuk mode "instal ke HP" (PWA)
sw.js              service worker -- membuat situs bisa dibuka tanpa internet
data/katalog.js    dibaca situs publik -- disusun otomatis dari data/db/*.json (+ Google Sheet kalau dipakai)
data/db/           UMKM/Produk/Wisata/Ulasan/Promo, diedit lewat admin.html atau GitHub langsung
assets/style.css   gaya tampilan
assets/app.js      penyusun halaman + seluruh ikon (SVG di dalam berkas)
assets/fonts/      huruf Plus Jakarta Sans, disimpan sendiri
assets/icons/      ikon PWA (dibuat dari lambang daun yang sama dengan favicon)
assets/img/        tempat menyimpan foto produk
admin.html         form tambah/ubah/hapus data (opsional, lihat PANDUAN-ADMIN.md)
toko-saya.html     statistik & promo mandiri per-UMKM lewat kode akses (opsional)
scripts/           alat bantu Node.js (mode Google Sheet opsional, + pembuat sitemap.xml)
scripts/apps-script/ kode Google Apps Script (Standalone Script, TANPA Google Sheet -- lihat PANDUAN-ADMIN.md)
.github/workflows/ workflow GitHub Actions (Sheet opsional; pembuat sitemap selalu aktif)
```

## Cara memperbarui isi

`data/katalog.js` (yang dibaca situs publik) disusun otomatis oleh
GitHub Actions -- jangan diedit langsung begitu sumbernya sudah dipakai:

- **UMKM, Produk, Wisata (+ foto), Ulasan Pembeli, Promo per-UMKM** --
  tersimpan sebagai `data/db/*.json` (+ `assets/img/` untuk foto) di
  repositori GitHub ini. Diedit lewat **form admin (`admin.html`)**,
  lihat `PANDUAN-ADMIN.md` -- atau langsung edit JSON-nya di GitHub
  kalau sudah terbiasa. Perubahan tampil di katalog publik hampir
  seketika (ikut GitHub Pages terbit ulang).
- **Kode Akses Toko, Statistik** -- tersimpan privat di dalam proyek
  Apps Script sendiri (`PropertiesService`), TIDAK PERNAH masuk
  `data/katalog.js` maupun berkas publik apa pun. Diedit/dilihat lewat
  `admin.html` (Kode Akses) atau `toko-saya.html` (Statistik per-toko).
- **`DESA`, `TESTIMONI`, `KATEGORI`** (isinya sedikit, jarang berubah) --
  boleh tetap diedit langsung di `data/katalog.js` lewat GitHub (lihat
  `PANDUAN-UPDATE.md`), ATAU lewat Google Sheet murni opsional
  (`PANDUAN-SHEET.md`) kalau desa lebih suka begitu.

**Google Sheet TIDAK diperlukan sama sekali** untuk memakai situs ini
sepenuhnya, termasuk fitur admin/statistik/ulasan/promo -- satu-satunya
kegunaannya (opsional) adalah mengedit 3 baris terakhir di atas lewat
spreadsheet. Lihat `PANDUAN-ADMIN.md` bagian "Kenapa dipecah begini"
untuk alasan lengkap pembagian penyimpanan ini.

## Hampir tidak ada panggilan ke server luar

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

**Satu pengecualian yang disengaja**: `assets/app.js` (fungsi
`catatStatistik`/`panggilStatistikPublik`) memanggil Google Apps Script
(Standalone Script, TIDAK ditempel ke Google Sheet mana pun -- lihat
`PANDUAN-ADMIN.md`) untuk tiga hal -- mencatat kunjungan halaman toko,
mencatat klik tombol WhatsApp, dan mengirim ulasan pembeli. Ini
satu-satunya cara menghitung statistik dari SEMUA pengunjung (bukan
cuma dari satu perangkat lewat localStorage), dan satu-satunya cara
pembeli mengirim ulasannya sendiri. Panggilan ini selalu anonim dan
gagal-diam -- kalau gagal/lambat/diblokir, situs tetap tampil normal,
cuma statistiknya yang tidak tercatat. Lihat `PANDUAN-ADMIN.md` untuk
detailnya.

`admin.html` sendiri (opsional, dipakai pengurus) memang selalu bicara ke
server luar untuk menyimpan data -- tapi ke tempat berbeda tergantung
tabnya. UMKM/Produk/Wisata (termasuk unggah foto ke `assets/img/`) lewat
**GitHub Contents API langsung** (pakai token akses pribadi admin, tanpa
Apps Script sama sekali); Ulasan/Promo lewat Apps Script yang merelai ke
GitHub (token tersendiri, disimpan di server); Kode Akses/Statistik
tersimpan privat di Apps Script sendiri, tidak pernah jadi berkas publik.
Lihat `PANDUAN-ADMIN.md` bagian "Kenapa dipecah begini" untuk alasan
pembagiannya, dan bagian "Mengunggah foto lewat form admin" untuk detail
unggah foto.

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

## Supaya mudah ditemukan di Google

Situs ini satu berkas HTML dipakai bergantian untuk banyak UMKM/produk/wisata
lewat parameter URL (`umkm.html?u=slug`, dst). Supaya Google tetap melihat
judul dan deskripsi yang beda untuk tiap isinya, `assets/app.js` mengatur
`<title>`, meta description, tautan canonical, Open Graph, dan data
terstruktur (schema.org) lewat JavaScript setiap kali salah satu halaman itu
dibuka — bukan ditulis statis di berkas HTML, karena judulnya memang baru
diketahui saat itu.

**`sitemap.xml`** dibuat otomatis dari `data/katalog.js` (lihat
`scripts/buat-sitemap.mjs`) — setiap UMKM, produk, dan wisata baru otomatis
dapat baris sendiri, tidak perlu didaftar manual. Diperbarui otomatis lewat
`.github/workflows/perbarui-sitemap.yml` setiap `data/katalog.js` berubah
(baik lewat edit manual maupun lewat mode Sheet).

**`robots.txt`** mengizinkan semua crawler dan menunjuk ke sitemap itu.

Langkah manusia yang masih perlu dilakukan sekali:

1. Daftarkan situsnya di [Google Search Console](https://search.google.com/search-console),
   verifikasi kepemilikan, lalu kirim `sitemap.xml` lewat menu **Sitemaps**.
2. Setelah ada perubahan besar (UMKM baru, dst), boleh percepat dengan
   **URL Inspection → Request Indexing** di Search Console untuk halaman yang
   penting — tapi ini tidak menjamin langsung tayang, Google tetap butuh
   waktu untuk merayapi dan menilai halamannya.

**Kalau alamat situs pindah** (ganti akun/repositori GitHub, atau pakai
domain sendiri lewat `CNAME`), `BASE_URL` di `scripts/buat-sitemap.mjs` dan
alamat `Sitemap:` di `robots.txt` harus ikut diubah manual — keduanya
sengaja ditulis lengkap (bukan otomatis menerka alamat) karena dibuat oleh
skrip Node yang berjalan di luar peramban, tidak tahu situsnya sedang
dibuka lewat alamat apa.

**Batasannya:** judul/deskripsi per-item yang diatur lewat JavaScript itu
terbaca oleh Google (Google menjalankan JavaScript saat mengindeks), tapi
**tidak** terbaca oleh pratinjau tautan yang tidak menjalankan JavaScript
sama sekali, seperti WhatsApp atau Facebook — keduanya cuma akan menampilkan
judul/deskripsi generik yang tertulis statis di berkas HTML. Membuatnya
ikut menampilkan info per-item butuh perubahan arsitektur yang lebih besar
(halaman statis per item), di luar cakupan perbaikan ini.

## Bisa "diinstal" ke HP dan dibuka tanpa internet (PWA)

Situs ini adalah PWA (*Progressive Web App*) sederhana:

- Di HP, tombol menu peramban punya pilihan **"Tambahkan ke layar Utama" /
  "Install app"** — situs lalu punya ikon sendiri seperti aplikasi biasa,
  terpisah dari peramban.
- Halaman yang **sudah pernah dibuka** tetap bisa diakses saat tidak ada
  internet.

Diatur lewat tiga berkas: `manifest.json` (nama, ikon, warna tema),
`sw.js` (service worker), dan `assets/icons/`. Didaftarkan otomatis oleh
`assets/app.js` di setiap halaman.

**Cara kerja mode offline-nya sengaja dibedakan per jenis berkas:**

- **Halaman & `data/katalog.js`** — begitu online, situs SELALU mengambil
  versi terbaru lebih dulu (baru disimpan untuk cadangan offline). Jadi
  tidak perlu langkah "sinkron" manual — setiap dibuka dalam keadaan
  online, otomatis dapat data terbaru; baru kalau memang tidak ada
  internet, versi tersimpan terakhir yang dipakai.
- **CSS, JS, font, foto** — dipakai dulu yang tersimpan (supaya cepat),
  sambil diam-diam diperbarui di latar belakang.

**Kalau menambah halaman HTML baru** (bukan sekadar UMKM/produk/wisata
baru di `data/katalog.js`, tapi berkas `.html` baru), tambahkan namanya ke
daftar `BERKAS_INTI` di `sw.js` dan naikkan `CACHE_VERSI` supaya peramban
tahu perlu mengambil ulang. Menambah UMKM/produk/wisata baru **tidak**
perlu mengubah `sw.js` sama sekali — otomatis ikut ter-cache karena
`data/katalog.js` sendiri sudah masuk daftar inti.

**Cara mengecek:** buka situs di Chrome, tekan F12 → tab **Application** →
**Service Workers** (harus tertulis "activated and is running") dan
**Manifest** (harus tampil nama & ikonnya, tanpa tanda error merah). Untuk
mengetes mode offline: buka satu halaman, centang **Offline** di tab yang
sama, lalu muat ulang.

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
