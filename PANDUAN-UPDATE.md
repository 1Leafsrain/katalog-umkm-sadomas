# Panduan memperbarui katalog

Ditujukan untuk pengelola situs dari Desa Sadomas. Tidak perlu bisa memrogram.
Semua perubahan isi dilakukan di satu berkas: **`data/katalog.js`**.

> Ada juga cara memperbarui isi lewat Google Sheet tanpa akun GitHub sama
> sekali -- lihat `PANDUAN-SHEET.md`. Kalau desa sudah memakai cara itu
> (variabel `SHEET_ID` sudah diisi di repositori), `data/katalog.js` dibuat
> otomatis dan **jangan diedit langsung** -- panduan di berkas ini jadi tidak
> berlaku, pakai `PANDUAN-SHEET.md` saja.

## Membuka berkas untuk diedit

1. Buka repositori di github.com, masuk dengan akun desa.
2. Klik folder `data`, lalu klik `katalog.js`.
3. Klik ikon pensil (**Edit this file**) di kanan atas.
4. Ubah isinya, lalu gulir ke bawah dan klik **Commit changes**.
5. Tunggu satu menit, buka situsnya, muat ulang halaman.

Semua yang diubah tercatat riwayatnya. Kalau ada yang keliru, buka tab
**History** pada berkas itu, buka versi sebelumnya, lalu salin kembali.

## Aturan menulis yang tidak boleh dilanggar

- Setiap isian dibungkus tanda kutip ganda: `nama: "Gabin Tape Original",`
- Antar-isian dipisah koma
- Jangan menghapus kurung kurawal `{ }` atau kurung siku `[ ]`
- Jangan memakai tanda kutip ganda di dalam teks. Kalau perlu tanda kutip,
  pakai tanda kutip miring: `"opak "merah" khas desa"` salah,
  `"opak 'merah' khas desa"` benar
- Nomor WhatsApp ditulis dengan awalan **62**, tanpa spasi dan tanpa tanda plus.
  `081234567890` menjadi `"6281234567890"`

Kalau situs mendadak kosong setelah diedit, hampir selalu penyebabnya salah satu
dari lima hal di atas — biasanya koma yang hilang atau kutip yang tidak
berpasangan.

## Menambah produk baru

Salin satu blok produk yang sudah ada, tempel di bawahnya, lalu ubah isinya.
Satu blok dimulai dari `{` dan berakhir di `},`

```js
  {
    slug: "gabin-tape-keju",           // huruf kecil, pakai tanda -, tidak boleh sama dengan produk lain
    nama: "Gabin Tape Keju",
    umkm: "gabin-tape-wizura",         // harus sama persis dengan slug UMKM pemiliknya
    kategori: "kuliner",               // pilih dari daftar KATEGORI di bagian atas berkas
    harga: "Rp20.000 – Rp24.000",      // tulis kisaran, bukan harga pasti
    satuan: "per kotak isi 10 buah",
    foto: "gabin-tape-keju.jpg",       // nama berkas di assets/img/, kosongkan bila belum ada
    penilaian: 0,                      // biarkan 0 sampai ada penilaian nyata
    galeri: [],                        // foto tambahan, contoh: ["keju-2.jpg", "keju-3.jpg"]
    ulasan: [],                        // ulasan pembeli sungguhan, lihat bagian di bawah
    unggulan: false,                   // true bila mau tampil di beranda
    deskripsi: "Varian keju dengan tape yang sama.",
    rincian: [
      ["Bahan utama", "Tape singkong, keju, gabin"],
      ["Isi kemasan", "10 buah per kotak"],
      ["Daya tahan", "3 hari suhu ruang"],
      ["Minimal pesan", "1 kotak"],
    ],
  },
```

## Menambah UMKM baru

Sama caranya, tapi di bagian `const UMKM`. Yang wajib diisi: `slug`, `nama`,
`kategori`, `pemilik`, `wa`, dan `deskripsi`. Setelah UMKM ditambahkan, produknya
menyusul di bagian `const PRODUK` dengan `umkm:` diisi slug UMKM tadi.

Jumlah UMKM dan jumlah produk di beranda dihitung sendiri oleh situs. Tidak
perlu mengubah angkanya secara manual.

## Menambah tempat wisata baru

Ada di bagian `const WISATA`, di bawah daftar UMKM. Caranya sama: salin satu
blok yang sudah ada (misalnya blok "Wisata Cipendeuy"), tempel di bawahnya,
lalu ubah isinya.

```js
  {
    slug: "wisata-nama-lokasi",         // huruf kecil, pakai tanda -
    nama: "Wisata Nama Lokasi",
    jenis: "Air Terjun",                // contoh: Air Terjun, Bukit, Kolam Pemandian
    alamat: "Blok Cipendeuy, RT 02/RW 03",
    jamBuka: "Setiap hari, 07.00-17.00 WIB",
    tiket: "Rp5.000 per orang",
    kontak: "6281234567890",            // kosongkan "" untuk memakai WA desa
    foto: "",
    fotoLokasi: "",
    penilaian: 0,
    keteranganGaleri: "",
    galeri: [],
    deskripsi: "Ceritakan daya tarik lokasi ini, aktivitas yang bisa dilakukan, dan kondisi jalan menuju ke sana.",
  },
```

Setelah ditambahkan, lokasinya otomatis muncul di halaman **Wisata Desa**
(`wisata.html`) dan sebagai kartu di beranda.

## Menambah foto

1. Kecilkan dulu fotonya. Foto langsung dari kamera HP berukuran 3–8 MB dan
   membuat situs lambat dibuka di jaringan desa. Sasaran: **di bawah 200 KB**,
   lebar sekitar 1000 piksel. Bisa memakai fitur *resize* di galeri HP atau
   situs pengecil gambar.
2. Beri nama huruf kecil tanpa spasi, misalnya `gabin-tape-keju.jpg`.
3. Di GitHub, buka folder `assets/img`, klik **Add file → Upload files**,
   unggah, lalu **Commit changes**.
4. Tuliskan nama berkasnya di isian `foto:` pada produk yang sesuai.

Selama `foto` masih kosong, kartu produk menampilkan kotak bermotif bertuliskan
"Foto belum diunggah". Situs tetap jalan normal.

## Mengubah teks beranda dan kontak desa

Ada di bagian `const DESA` paling atas: judul beranda, paragraf pembuka, alamat
sekretariat, nomor WhatsApp desa, email, dan tautan Google Maps serta Instagram.
Isian yang dikosongkan otomatis tidak ditampilkan.

## Menyembunyikan produk yang sedang tidak tersedia

Untuk produk musiman seperti durian atau mangga, jangan dihapus. Ubah saja
`satuan` atau `deskripsi`-nya, misalnya menambahkan "Sedang tidak musim,
tanyakan dulu ketersediaannya." Kalau memang mau disembunyikan sementara,
beri tanda `//` di awal setiap baris blok produk itu, atau salin blok itu ke
catatan lain lalu hapus dari berkas.

## Bintang dan ulasan pembeli

Dua bagian ini sengaja dibiarkan kosong.

**Bintang** hanya muncul kalau `penilaian` diisi angka 1 sampai 5. Selama masih
`0`, tidak ada bintang yang tampil. Isi hanya kalau desa memang punya cara
menilai — misalnya rekap penilaian dari pembeli yang dikumpulkan Karang Taruna.

**Ulasan** muncul di halaman produk hanya kalau daftarnya terisi:

```js
    ulasan: [
      {
        nama: "Ibu Rohmah",
        asal: "Rajagaluh, 12 September 2026",
        penilaian: 5,
        teks: "Gabinnya renyah, tapenya tidak terlalu asam. Anak-anak suka.",
      },
    ],
```

Jangan mengisi ulasan karangan. Nama dan kalimat yang dibuat-buat gampang
ketahuan, dan yang menanggung malunya nama desa, bukan yang mengetik. Minta izin
dulu ke pembelinya sebelum namanya dipasang.

## Testimoni di beranda

Ada di bagian `const TESTIMONI` dekat bagian atas berkas. Aturannya sama:
kutipan asli dari orang sungguhan, dan minta izin dulu. Kalau belum ada, kosongkan
`teks: ""` — bagian testimoni otomatis tidak ditampilkan dan beranda tetap rapi.

## Siapa yang boleh mengubah apa

Sebaiknya tiga orang memegang akses: satu dari perangkat desa dan dua dari
Karang Taruna. Tambahkan mereka lewat **Settings → Collaborators** di
repositori. Kata sandi akun desa dipegang perangkat desa, bukan perorangan.
