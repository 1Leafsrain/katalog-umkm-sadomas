# Form admin (tambah / ubah / hapus data lewat halaman web)

Cara ini menambah **halaman form** (`admin.html`) supaya pengurus tidak
perlu buka spreadsheet mentah atau kode GitHub untuk tambah/ubah/hapus
UMKM, produk, wisata, ulasan, atau promo. **Google Sheet TIDAK
DIPERLUKAN sama sekali** -- datanya tersimpan di GitHub dan di
penyimpanan privat milik Apps Script sendiri, tergantung jenisnya:

| Jenis data | Tersimpan di | Ditulis oleh | Kredensial |
| --- | --- | --- | --- |
| UMKM, Produk, Wisata (+ foto) | GitHub (`data/db/*.json` + `assets/img/`) | Peramban admin langsung | Token GitHub pribadi admin |
| Ulasan Pembeli, Promo per-UMKM | GitHub (`data/db/ulasan.json`/`promo.json`) | **Apps Script** (relay, token di server) | Login admin (Firebase Authentication) |
| Kode Akses Toko, Statistik | Privat di Apps Script sendiri (`PropertiesService`) | Apps Script langsung | Login admin (Firebase Authentication) |

**Kenapa dipecah begini?** UMKM/Produk/Wisata cuma pernah ditulis admin
(yang memang sudah pegang rahasia asli), jadi token GitHub saja cukup
jadi gerbangnya -- tidak perlu server apa pun. Ulasan pembeli ditulis
pengunjung ANONIM dan promo ditulis pemilik toko lewat kode akses --
keduanya **wajib divalidasi di server** sebelum data tersimpan/
tersingkap, sesuatu yang tidak bisa dilakukan aman kalau kredensial
tertanam di halaman publik (siapa pun bisa mengambilnya lewat DevTools
peramban). Karena itu Apps Script tetap diperlukan sebagai satu-satunya
"server sungguhan" yang tersedia di sini -- tapi ia tidak lagi ditempel
ke Google Sheet mana pun (jadi **Standalone Script**), dan menulis
Ulasan/Promo langsung ke GitHub (pakai token yang disimpan DI SERVER,
tidak pernah tersingkap ke peramban), sementara Kode Akses & Statistik
disimpan di penyimpanan privatnya sendiri (`PropertiesService`) --
tidak pernah lewat berkas publik, karena repo GitHub ini bisa dibaca
siapa saja.

Akibat baiknya: **tidak perlu membuat Google Sheet sama sekali** untuk
pemasangan baru, dan hampir semua perubahan (UMKM/Produk/Wisata,
Ulasan, Promo) tampil di katalog publik **hampir seketika** -- cuma
Kode Akses & Statistik yang memang tidak pernah masuk katalog publik.

```
UMKM / Produk / Wisata (+ foto)      Ulasan / Promo             Kode Akses / Statistik
      |  isi form admin.html              |  isi form admin.html      |  isi form admin.html
      v                                    v                          v
GitHub Contents API              Apps Script Web App          Apps Script Web App
(token pribadi admin)             (Standalone Script)          (Standalone Script)
      |  commit langsung ke              |  cek login admin           |  cek login admin
      |  data/db/*.json/                 |  token GitHub SERVER       |  simpan ke
      |  assets/img/                     v                            |  PropertiesService
      v                          data/db/ulasan.json/                 v
GitHub Pages terbit ulang        promo.json (GitHub)           (privat, tidak pernah
(hampir seketika)                       |                       jadi berkas publik)
                                  GitHub Pages terbit ulang
                                  (hampir seketika)
```

> **Sudah pernah pasang versi sebelumnya (data lewat Google Sheet)?**
> Panduan ini menjelaskan susunan yang BARU (tanpa Sheet sama sekali).
> Langkah migrasinya ada di bagian "Pindah dari versi lama" di paling
> bawah berkas ini.

## Bagian A -- Menyiapkan penyimpanan GitHub (UMKM/Produk/Wisata)

### A1. Buat token akses GitHub (untuk admin.js, dipakai peramban)

1. Masuk ke akun GitHub yang memegang repositori ini, buka
   `https://github.com/settings/personal-access-tokens/new`.
2. **Token name**: bebas, misalnya "Admin Katalog UMKM".
3. **Expiration**: pilih durasi (disarankan 1 tahun, bukan "No expiration")
   -- supaya ada dorongan diperbarui berkala. Catat tanggal habisnya.
4. **Repository access**: pilih **Only select repositories**, lalu pilih
   repositori situs ini SAJA (misalnya `katalog-umkm-sadomas`). JANGAN
   pilih "All repositories".
5. **Permissions**: klik **Repository permissions**, cari **Contents**,
   ubah jadi **Read and write**. Biarkan izin lain tetap **No access**.
6. Klik **Generate token**. Token cuma ditampilkan SEKALI -- salin dan
   simpan dulu (misalnya di pengelola kata sandi), karena tidak bisa
   dilihat lagi setelah halaman ini ditutup (kalau lupa, buat token baru
   dan hapus yang lama).

Token ini setara "kata sandi" khusus untuk data UMKM/Produk/Wisata --
dipakai LANGSUNG DARI PERAMBAN admin, berbeda dan terpisah dari token
GitHub milik Apps Script di Bagian B3 (itu dipakai server, tidak pernah
disentuh peramban). Karena dibatasi hanya ke satu repositori dan hanya
izin Contents, kalau bocor dampaknya jauh lebih kecil daripada token
akses-penuh ke semua repo.

### A2. Pastikan data/db/*.json ada

Repositori ini seharusnya sudah punya `data/db/umkm.json`,
`produk.json`, `wisata.json`, `ulasan.json`, `promo.json` (dibuat lewat
`scripts/katalog-ke-db.mjs` dari isi `data/katalog.js` yang ada, kalau
belum pernah dijalankan). Kalau mau dimulai dari kosong, cukup pastikan
kelima berkas ini ada dan setidaknya berisi `[]`.

### A3. Isi Pemilik GitHub, Repositori, dan Token di admin.html

Buka `admin.html`, isi tiga kolom di bagian "Untuk UMKM / Produk / Wisata
(GitHub)": Pemilik GitHub (nama akun/organisasi GitHub, contoh
`1leafsrain`), Repositori (nama repo, contoh `katalog-umkm-sadomas`),
dan Token GitHub dari langkah A1.

## Bagian B -- Menyiapkan Apps Script (Ulasan/Promo/Kode Akses/Statistik)

**Google Sheet TIDAK diperlukan untuk bagian ini.** Apps Script dibuat
sebagai proyek berdiri sendiri (Standalone Script), bukan ditempel ke
spreadsheet mana pun. Login admin sendiri lewat **Firebase
Authentication** (gratis, paket Spark, tidak perlu kartu kredit untuk
bagian ini) -- bukan lagi kata sandi tertulis di source code.

### B0. Siapkan Firebase Authentication (login admin)

1. Buka `https://console.firebase.google.com`, masuk dengan akun
   Google yang sama, klik **Add project** (boleh matikan Google
   Analytics, tidak diperlukan di sini). Ini gratis.
2. Di sidebar kiri, buka **Build > Authentication**, klik **Get
   started**.
3. Di tab **Sign-in method**, aktifkan provider **Email/Password**.
4. **Penting**: JANGAN aktifkan cara apa pun yang membiarkan orang
   mendaftar sendiri di situs -- akun admin cuma dibuat lewat langkah
   5 di bawah (lewat Firebase Console), bukan lewat form di situs
   publik.
5. Buka tab **Users**, klik **Add user**. Isi email dan kata sandi
   untuk admin (boleh bikin lebih dari satu akun kalau pengurusnya
   lebih dari satu orang). Kata sandi inilah yang nanti dipakai masuk
   ke `admin.html`.
6. Klik ikon gerigi (Project settings) di sidebar kiri atas, gulir ke
   **Your apps**, klik ikon `</>` ("Web") untuk mendaftarkan situs ini
   (beri nama bebas, TIDAK perlu centang "Also set up Firebase
   Hosting" -- situs ini tetap di GitHub Pages).
7. Akan muncul potongan kode berisi `firebaseConfig = { apiKey: "...",
   authDomain: "...", projectId: "...", ... }`. **Catat tiga nilai
   ini** (`apiKey`, `authDomain`, `projectId`), dipakai di langkah
   berikutnya.

### B1. Buat Standalone Script

1. Buka `https://script.google.com`, masuk dengan akun Google yang akan
   memegang situs ini.
2. Klik **New project**.
3. Akan terbuka editor kode dengan berkas `Code.gs` kosong berisi
   `function myFunction() {}`. Hapus semuanya.
4. Buka `scripts/apps-script/Code.gs` di repositori ini, salin semua isinya,
   tempel ke editor Apps Script tadi.
5. (Opsional tapi disarankan) klik nama proyek di kiri atas ("Untitled
   project"), ganti jadi nama yang jelas, misalnya "Katalog UMKM Sadomas".
6. Cari baris `var ADMIN_EMAILS = "GANTI_EMAIL_ADMIN@contoh.com";` di
   dekat atas. **Ganti** dengan email admin dari langkah B0.5 (lebih
   dari satu email, pisahkan dengan koma, contoh:
   `"admin1@gmail.com,admin2@gmail.com"`). Cuma email di daftar ini
   yang bisa jadi admin, walau orang lain berhasil bikin akun Firebase
   lain entah bagaimana.
7. Cari baris `var FIREBASE_API_KEY = "GANTI_FIREBASE_API_KEY";` di
   bawahnya. **Ganti** dengan `apiKey` dari langkah B0.7 (nilai ini
   BUKAN rahasia, aman terlihat di source kode mana pun).
8. Cari baris `var GITHUB_PEMILIK = "GANTI_PEMILIK_GITHUB";` dan
   `var GITHUB_REPO = "GANTI_NAMA_REPO";` sedikit di bawahnya. **Ganti**
   keduanya dengan nilai yang SAMA dipakai di Bagian A3 (Pemilik GitHub
   dan Repositori).
9. Simpan (ikon disket, atau Ctrl/Cmd+S).
10. Di repositori ini, buka `assets/admin.js`, cari
    `const firebaseConfig = { apiKey: "GANTI_FIREBASE_API_KEY",
    authDomain: "GANTI_PROJECT_ID.firebaseapp.com", projectId:
    "GANTI_PROJECT_ID" };` dekat atas. **Ganti** ketiganya dengan nilai
    dari langkah B0.7, lalu simpan (commit) perubahan ini.

### B2. Isi token GitHub milik SERVER (Script Properties)

Berbeda dari token di Bagian A1 (dipakai peramban admin), Apps Script
butuh token GitHub SENDIRI untuk menulis `data/db/ulasan.json`/
`promo.json` -- disimpan di tempat yang tidak pernah tersingkap lewat
kode ataupun peramban siapa pun:

1. Ulangi langkah A1 untuk membuat SATU token fine-grained BARU (boleh
   nama berbeda, misalnya "Apps Script Katalog UMKM"), scope sama
   (repositori ini saja, **Contents: Read and write**).
2. Di editor Apps Script, klik ikon gerigi **Project Settings** di kiri.
3. Gulir ke **Script Properties**, klik **Add script property**.
4. **Property**: `GITHUB_TOKEN`. **Value**: tempel token dari langkah 1.
   Klik **Save script properties**.

Token ini TIDAK PERNAH ditulis di `Code.gs` maupun terlihat peramban
mana pun -- cuma bisa dibaca kode yang jalan di proyek Apps Script ini
sendiri.

### B3. Deploy sebagai Web App

1. Klik tombol biru **Deploy** (kanan atas) -> **New deployment**.
2. Kalau belum ada pilihan jenis, klik ikon gerigi di sebelah "Select type"
   -> pilih **Web app**.
3. Isi:
   - Description: bebas, misalnya "Form admin katalog"
   - Execute as: **Me** (akun yang membuat proyek ini)
   - Who has access: **Anyone**
4. Klik **Deploy**.
5. Google akan minta izin ("Authorize access") karena skripnya mengakses
   internet (membaca/menulis `data/db/*.json` di GitHub, dan memvalidasi
   slug UMKM/Produk). Klik akun Google yang dipakai -> kalau muncul layar
   "Google hasn't verified this app", klik **Advanced** -> **Go to (nama
   proyek) (unsafe)** -> **Allow**. Ini normal untuk skrip buatan sendiri
   yang belum didaftarkan ke Google, bukan tanda ada yang salah.
6. Setelah selesai, akan muncul **Web app URL** berbentuk:
   `https://script.google.com/macros/s/xxxxxxxxxxxxx/exec`
   **Salin alamat ini.**

### Coba dulu sebelum dipakai

Buka Web App URL tadi langsung di tab peramban baru (tanpa tambahan
apa pun di belakangnya). Kalau berhasil, muncul teks
`{"ok":true,"pesan":"Web App aktif dan bisa diakses."}`. Kalau muncul
halaman error Google, ulangi langkah deploy dan pastikan "Who has
access" memang **Anyone**.

## Pakai halaman admin

1. Buka `admin.html` di situs (atau tekan ikon gembok di pojok kanan atas
   tiap halaman). Yang tampil pertama kali adalah layar **Masuk**.
2. Isi salah satu atau kedua kredensial, sesuai data yang mau diubah:
   Pemilik GitHub + Repositori + Token (Bagian A), dan/atau Alamat Web
   App + Email + Kata Sandi (akun Firebase dari Bagian B0.5). Boleh isi
   satu dulu, lengkapi yang lain kapan pun -- tidak wajib keduanya
   sekaligus.
3. Klik **Masuk**. Kredensial yang diisi akan diperiksa (token ke
   GitHub, login ke Firebase lalu diverifikasi ulang ke Apps Script);
   yang tidak diisi dilewati begitu saja. Sesi login Firebase diingat
   otomatis oleh peramban sampai Anda menekan **Keluar** -- tidak ada
   kotak centang "ingat sandi" lagi untuk bagian ini.
4. Pilih **Jenis data** pada menu -- di bawahnya ada keterangan singkat
   tab itu disimpan di GitHub atau lewat Apps Script, supaya jelas
   kredensial mana yang dipakai.
5. **Tambah data baru**: klik **+ Tambah Baru**, isi form, klik **Simpan**.
6. **Ubah data**: klik **Ubah** pada salah satu baris di daftar, ubah
   isiannya, klik **Simpan**.
7. **Hapus data**: klik **Hapus** pada salah satu baris di daftar (akan ada
   konfirmasi sebelum benar-benar terhapus).
8. Semua perubahan (UMKM/Produk/Wisata lewat GitHub langsung, Ulasan/
   Promo lewat Apps Script yang merelai ke GitHub) tampil di katalog
   publik **hampir seketika** -- GitHub Pages terbit ulang otomatis
   setiap ada commit baru, tidak ada lagi jadwal 30-60 menit untuk
   ditunggu.

Tab `DESA`, `TESTIMONI`, dan `KATEGORI` isinya cuma sedikit baris/
pengaturan, tetap diedit langsung di `data/katalog.js` lewat GitHub
(`PANDUAN-UPDATE.md`) -- atau lewat Google Sheet kalau desa memang
lebih suka begitu, itu satu-satunya bagian yang masih opsional lewat
Sheet (lihat `PANDUAN-SHEET.md`).

## Statistik kunjungan & klik-WhatsApp

Bagian **Statistik** di bawah Data/Form (muncul juga setelah berhasil
Masuk lewat kredensial Apps Script) menunjukkan grafik kunjungan halaman
toko & klik tombol WhatsApp, per toko dan 14 hari terakhir. Klik **Muat
Statistik** untuk memuatnya -- disimpan sebagai angka berjalan (total +
rekap 14 hari) di `PropertiesService` Apps Script, jadi selalu bisa
dimuat ulang seketika tanpa perlu menyisir data mentah.

**Supaya statistik ini benar-benar tercatat**, isi konstanta
`URL_STATISTIK` di `assets/app.js` DAN `assets/toko-saya.js` dengan Web
App URL yang sama dipakai di atas (dua-duanya harus sama). Selama masih
`"GANTI_URL_APPS_SCRIPT"`, situs publik tidak mencatat apa-apa (tidak
error, cuma diam saja).

## Kode akses toko & halaman "Toko Saya"

Tiap pemilik UMKM bisa lihat statistik tokonya sendiri dan mengatur
promo yang tampil di halaman profil tokonya, lewat `toko-saya.html` --
TANPA perlu kata sandi admin ataupun token GitHub. Caranya:

1. Di admin.html (kredensial Apps Script), pilih Jenis data **Kode akses
   toko**, klik **+ Tambah Baru** (toko baru) atau **Ubah** pada baris
   toko yang sudah ada (mengganti kode toko itu -- misalnya kalau
   pemilik lupa kodenya atau minta diganti).
2. Isi **Slug UMKM** (harus sama persis dengan slug tokonya di GitHub).
   Untuk **Kode akses**, tekan tombol **Buat Otomatis** supaya terisi
   kode acak 8 karakter yang aman (dibuat di peramban, bukan ditebak-
   tebak) -- atau ketik sendiri kalau memang mau kode yang mudah
   diingat pemilik tokonya. Hindari pola yang gampang ditebak seperti
   nama toko + angka pendek.
3. Simpan, lalu kabari pemilik usahanya: alamat
   `https://<akun>.github.io/katalog-umkm-sadomas/toko-saya.html`, nama
   tokonya, dan kode aksesnya -- lewat WhatsApp atau langsung, bukan grup
   umum.

Pemilik toko masuk dengan memilih nama tokonya + kode akses. Promo yang
disimpan lewat halaman itu tampil di situs publik hampir seketika (ikut
GitHub Pages terbit ulang, sama seperti data lain sekarang) -- Kode
Akses-nya sendiri TIDAK pernah menyentuh GitHub sama sekali (tetap
privat di Apps Script, tersimpan apa adanya supaya admin bisa
melihat/mengirim ulang kode yang sudah ada kalau pemilik tokonya lupa).

**Kenapa halaman ini boleh dibuka siapa saja tanpa login halaman**:
sama seperti `admin.html`, GitHub Pages tidak punya mekanisme login
per-halaman -- gerbang yang sesungguhnya ada di pengecekan kode/sandi
pada SETIAP panggilan ke Apps Script, bukan pada bisa/tidaknya halaman
dibuka. Untuk mencegah tebak-tebakan kode/sandi otomatis, Apps Script
mengunci sementara (15 menit) satu toko atau login admin setelah 8x
percobaan gagal berturut-turut -- kalau muncul pesan "Terlalu banyak
percobaan gagal", itu bukan tanda situsnya rusak, cukup tunggu atau
pastikan kode/sandinya benar sebelum mencoba lagi.

## Mengunggah foto lewat form admin

Kolom **Foto utama**, **Foto lokasi**, dan foto galeri (di UMKM, Produk,
Wisata) punya dua cara diisi, berdampingan:

1. **Unggah langsung** -- klik **Choose File**, pilih foto dari
   HP/komputer. Foto dikecilkan otomatis di peramban (maksimum sisi
   1600px, dimampatkan ke JPEG), lalu dikirim lewat GitHub Contents API
   (pakai Token GitHub dari Bagian A) langsung ke folder `assets/img/`
   repositori ini, dengan nama unik berawalan waktu unggah. Kolom
   teksnya otomatis terisi nama berkas itu, dan muncul pratinjau kecil
   di bawahnya.
2. **Ketik manual** -- ketik nama berkas yang sudah ada di folder
   `assets/img/` (untuk foto lama/bawaan, atau yang diunggah manual
   lewat GitHub).

Karena butuh Token GitHub, unggah foto HANYA bisa dipakai kalau
kredensial GitHub (Bagian A3) sudah diisi -- kalau belum, tombol
**Choose File** akan menampilkan pesan jelas memintanya diisi dulu.

**Foto yang diunggah adalah COMMIT GitHub sungguhan**, sama seperti
menambah berkas manual lewat GitHub -- muncul di riwayat (History) repo,
dan tampil di katalog publik hampir seketika.

## Soal keamanan -- baca ini

`admin.html` **bisa dibuka siapa saja yang tahu alamatnya** -- GitHub
Pages tidak punya sistem login. Halaman ini ditautkan lewat ikon gembok
di pojok kanan atas situs untuk kemudahan pengurus, tapi itu bukan
pengaman sungguhan (siapa pun boleh mengeklik ikon itu, bukan cuma
pengurus). Layar **Masuk** di depannya juga bukan login sungguhan (tidak
ada akun per orang) -- kredensialnya dipakai bersama semua pengurus yang
berwenang.

**Dua kredensial, dua gerbang berbeda:**

- **Token GitHub** (UMKM/Produk/Wisata + foto, Bagian A) -- diperiksa
  oleh GitHub sendiri setiap panggilan (bukan oleh kode di repositori
  ini). Token yang salah/kedaluwarsa/dicabut langsung ditolak GitHub
  dengan status 401/403, admin.js menampilkannya sebagai pesan galat.
  Karena dibatasi fine-grained ke satu repositori + izin Contents saja,
  token yang bocor tidak bisa dipakai membuka repositori lain atau
  mengubah pengaturan repo ini (Settings, Actions, dst.).
- **Login admin** (Ulasan/Promo/Kode Akses/Statistik, Bagian B) --
  email+sandi diperiksa oleh Firebase Authentication (bukan `Code.gs`),
  lalu token hasil login itu diverifikasi ULANG oleh `Code.gs` ke
  Google (endpoint Identity Toolkit) plus dicocokkan ke `ADMIN_EMAILS`
  sebelum menampilkan bagian itu -- dua lapis, bukan cuma percaya token
  dari peramban begitu saja. Kalau email dihapus dari `ADMIN_EMAILS`
  atau akunnya dihapus di Firebase Console, sesi lama yang kebetulan
  masih tersimpan di peramban otomatis ditolak lagi.

Ada JUGA token GitHub KETIGA (Bagian B2) yang dipegang Apps Script
sendiri, bukan admin.js -- token itu TIDAK PERNAH terlihat siapa pun
di peramban, jadi bukan bagian dari "dua kredensial" yang admin pegang.

Tanpa kredensial yang benar, permintaan tambah/ubah/hapus (di kedua
gerbang) akan ditolak. Membaca data (tombol Muat Daftar) untuk tab
publik (UMKM/Produk/Wisata di GitHub, Ulasan lewat Apps Script) tidak
perlu kredensial apa pun -- datanya sama dengan yang sudah publik di
halaman katalog. Promo & Kode Akses dikecualikan untuk moderasi admin
(`bacaPromoAdmin`/`daftarKodeAkses` WAJIB kata sandi) -- Kode Akses
khususnya TIDAK PERNAH bisa dibaca lewat cara lain apa pun (tidak ada
di GitHub sama sekali) supaya kode tiap toko tidak pernah "publik".

Tombol **Keluar** (muncul setelah berhasil masuk) mengunci lagi halamannya
dan menghapus kedua kredensial yang sempat diingat di peramban itu --
pakai ini kalau memakai HP/komputer bersama.

**`toko-saya.html` memakai model yang berbeda lagi**, bukan kata sandi
admin maupun token GitHub: tiap toko punya `kode` akses sendiri
(disimpan di `PropertiesService` Apps Script), dicek ulang ke server
tiap kali dipakai (tidak pernah diingat di peramban). Ini juga bukan
"login" sungguhan per orang -- satu kode dipakai bersama untuk satu
toko, sama seperti kredensial admin dipakai bersama semua pengurus.

Dua aksi lain (`catatStatistik` untuk mencatat kunjungan/klik-WA, dan
`kirimUlasan` untuk ulasan pembeli) sengaja TIDAK butuh kredensial APA
PUN -- keduanya dipanggil otomatis dari situs publik untuk SEMUA
pengunjung. Validasinya diperketat di `Code.gs`: slug UMKM/produk dicek
BENAR-BENAR ADA dengan membaca `data/db/*.json` langsung dari GitHub
(berkas publik, tidak perlu token), rating harus 1-5, dst. -- supaya
tidak jadi jalan belakang menulis data bebas. `kirimUlasan` yang lolos
validasi tetap ditulis Apps Script (pakai token server di Bagian B2),
BUKAN oleh pengunjung langsung ke GitHub.

Karena itu:

- **Jangan sebarkan alamat `admin.html`, Token GitHub, maupun email +
  kata sandi login admin** ke luar pengurus yang berwenang.
- Kalau Token GitHub (Bagian A, milik admin) bocor atau dicurigai: buka
  `https://github.com/settings/tokens?type=beta`, cari tokennya, klik
  **Delete**, lalu buat token baru (Bagian A1) dan bagikan ulang ke
  pengurus yang berhak.
- Kalau token GitHub milik SERVER (Bagian B2) bocor atau dicurigai:
  sama seperti di atas (Delete + buat baru), lalu perbarui nilainya di
  **Project Settings > Script Properties** Apps Script (tidak perlu
  deploy ulang -- Script Properties dibaca langsung tiap panggilan).
- Kalau kata sandi login admin bocor atau dicurigai, ganti secepatnya
  lewat Firebase Console (bukan lewat `Code.gs` lagi):
  1. Buka `https://console.firebase.google.com`, project situs ini ->
     **Authentication > Users**.
  2. Klik titik tiga pada akun admin yang bersangkutan -> **Reset
     password** (kirim tautan reset ke emailnya) atau hapus akunnya lalu
     buat yang baru (Bagian B0.5) kalau memang mau ganti total.
  3. Sesi lama di peramban mana pun otomatis tertolak begitu token-nya
     kedaluwarsa (paling lama ~1 jam) atau begitu dicoba dipakai lagi
     dan Firebase sudah tidak mengenalinya.
  4. Kalau yang bocor itu justru akses ke situs (bukan sandinya, akun
     itu sendiri tidak semestinya jadi admin lagi): hapus emailnya dari
     `ADMIN_EMAILS` di `Code.gs`, simpan, **Deploy > Manage deployments**
     -> ikon pensil pada deployment aktif -> Version **New version** ->
     **Deploy** (memperbarui Web App yang sudah jalan tanpa mengubah
     alamat URL-nya).

## Kalau ada dua orang mengubah bersamaan

**Untuk UMKM/Produk/Wisata (GitHub, ditulis peramban admin langsung)**:
kalau dua admin menyimpan nyaris bersamaan, yang kedua akan ditolak
GitHub dengan pesan "Data sudah berubah sejak dimuat -- muat ulang
daftarnya lalu coba lagi." Klik **Muat Daftar** lagi supaya datanya
segar, lalu ulangi perubahan. Ini berlaku untuk SELURUH tab itu (bukan
cuma baris yang sama) -- karena satu tab tersimpan sebagai satu berkas
GitHub.

**Untuk Ulasan/Promo (GitHub, ditulis Apps Script)**: Apps Script
mencoba ulang otomatis sampai 3 kali kalau kena konflik seperti di atas
-- pengunjung/admin tidak perlu melakukan apa-apa, biasanya langsung
berhasil di percobaan berikutnya dalam hitungan detik. Cuma kalau
tabrakannya luar biasa sering (sangat tidak mungkin untuk katalog
sekelas desa), permintaan akan gagal dengan pesan galat biasa.

**Untuk Kode Akses & Statistik (PropertiesService)**: dilindungi
`LockService` (permintaan yang datang nyaris bersamaan antre singkat,
bukan saling menimpa) -- tidak ada yang perlu dilakukan pengguna.

## Kalau ada galat

- **"Isi Pemilik GitHub, Repositori, dan Token GitHub di bagian
  Pengaturan dulu."** -- muncul kalau membuka tab UMKM/Produk/Wisata
  tapi belum mengisi kredensial GitHub. Lengkapi Bagian A3 lalu masuk
  ulang.
- **"Data sudah berubah sejak dimuat..."** -- lihat "Kalau ada dua
  orang mengubah bersamaan" di atas.
- **Token GitHub ditolak (401/403) saat Masuk** -- token salah ketik,
  sudah kedaluwarsa, sudah dicabut (revoked), atau Pemilik/Repositori
  yang diisi tidak cocok dengan repo yang diizinkan token itu. Buat
  token baru (Bagian A1) kalau perlu.
- **"Email atau kata sandi salah"** (bagian Apps Script) -- itu pesan
  dari Firebase, bukan dari `Code.gs` -- cocokkan lagi email/sandinya,
  atau reset lewat Firebase Console (Authentication > Users) kalau
  lupa.
- **"Akun ini bukan admin yang terdaftar"** -- login Firebase-nya
  berhasil (email/sandi benar), tapi email itu belum ada di
  `ADMIN_EMAILS` di `Code.gs`. Tambahkan emailnya (pisah koma kalau
  lebih dari satu), simpan, lalu deploy ulang (lihat "kalau bocor" di
  atas).
- **"Sesi login tidak valid atau sudah kedaluwarsa"** -- token Firebase
  cuma berlaku ~1 jam; biasanya cukup masuk ulang. Kalau terus muncul
  padahal baru saja masuk, cek `FIREBASE_API_KEY`/`ADMIN_EMAILS` di
  `Code.gs` sudah diisi (bukan `GANTI_...` lagi) dan `firebaseConfig`
  di `assets/admin.js` sudah cocok dengan project Firebase yang benar.
- **"Sesi tersimpan tidak semuanya berlaku lagi -- ..."** -- muncul
  otomatis saat membuka halaman kalau salah satu (atau kedua) kredensial
  yang diingat di peramban sudah tidak cocok lagi. Pesan menyebutkan sisi
  mana (Apps Script/GitHub) yang bermasalah. Masuk ulang dengan
  kredensial yang benar untuk sisi itu.
- **Bagian Statistik selalu kosong / "Belum ada data kunjungan tercatat"**
  -- kemungkinan `URL_STATISTIK` di `assets/app.js` masih
  `"GANTI_URL_APPS_SCRIPT"` (situs publik belum pernah mencatat apa-apa),
  atau memang belum ada pengunjung sejak diaktifkan.
- **Di `toko-saya.html`, "Slug atau kode akses salah"** -- cocokkan lagi
  kode aksesnya lewat menu Kode Akses Toko di admin.html; ingat
  besar/kecil huruf ikut diperhatikan.
- **"Terlalu banyak percobaan gagal. Coba lagi dalam N menit."** --
  bukan bug. Muncul di `toko-saya.html` atau `admin.html` setelah 8x
  berturut-turut salah memasukkan kode/sandi (untuk satu toko atau satu
  login admin) -- pembatas ini mencegah orang menebak-nebak kode/sandi
  otomatis. Tunggu sampai waktunya habis, atau pastikan kode/sandinya
  memang benar sebelum mencoba lagi.
- **Di `toko-saya.html`/form ulasan produk, "Fitur ini belum aktif"** --
  `URL_STATISTIK` di `assets/toko-saya.js`/`assets/app.js` masih belum
  diisi alamat Web App yang benar.
- **Ulasan pembeli/statistik ditolak diam-diam padahal slug-nya benar**
  -- Apps Script gagal membaca `data/db/umkm.json`/`produk.json` dari
  GitHub. Cocokkan `GITHUB_PEMILIK`/`GITHUB_REPO` di `Code.gs` (Bagian
  B1 langkah 7) dengan repo yang sebenarnya, dan pastikan repo itu
  publik (bukan private -- ini dibaca tanpa token).
- **"GITHUB_TOKEN belum diisi..."** saat menyimpan Ulasan/Promo lewat
  admin.html, atau ulasan pembeli gagal masuk -- lengkapi Bagian B2
  (Script Properties), bukan Bagian A3 (itu token yang berbeda).
- Error CORS di console peramban (`blocked by CORS policy`) -- untuk
  sisi Apps Script, coba deploy ulang Web App-nya (Bagian B3), pastikan
  "Who has access" masih **Anyone**. GitHub Contents API sendiri sudah
  mendukung CORS secara resmi, jadi error CORS di sisi GitHub biasanya
  menandakan masalah lain (lihat pesan galatnya).
- **"Gagal mengunggah: ..." di bawah kolom foto** -- kalau menyebut
  kredensial GitHub belum diisi, lengkapi Bagian A3. Kalau menyebut
  berkas gagal (401/403), berlaku aturan yang sama seperti "Token GitHub
  ditolak" di atas.

## Pindah dari versi lama (data lewat Google Sheet)

Kalau situs ini sebelumnya sudah dipakai dengan versi lama (Apps
Script ditempel ke Google Sheet, sebagian/semua data lewat tab Sheet):

1. Jalankan `node scripts/katalog-ke-db.mjs` -- ini membaca
   `data/katalog.js` yang SEDANG TAMPIL di situs dan menulis
   `data/db/umkm.json`/`produk.json`/`wisata.json`/`promo.json`/
   `ulasan.json` darinya, supaya data yang sudah ada tidak hilang.
2. Commit & push kelima berkas itu ke GitHub.
3. Ikuti Bagian A di atas (buat token, isi kredensial di admin.html).
4. Buat Standalone Script baru (Bagian B1-B3) -- JANGAN pakai lagi Apps
   Script lama yang ditempel ke Sheet, karena bentuk `Code.gs` sudah
   beda total (tidak ada lagi konsep tab Sheet sama sekali).
5. Kode Akses Toko yang sudah ada di tab `AKSES_UMKM` Sheet lama perlu
   diketik ulang manual satu-satu lewat menu "Kode akses toko" di
   admin.html (Standalone Script baru) -- tidak ada migrasi otomatis
   untuk ini karena memang rahasia, tidak tersimpan di `data/katalog.js`.
6. Sheet lama boleh dihapus/diabaikan sepenuhnya setelah ini -- tidak
   ada lagi yang membacanya.
