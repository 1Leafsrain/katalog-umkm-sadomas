/* ============================================================
   DATA KATALOG UMKM DESA SADOMAS
   ------------------------------------------------------------
   HANYA BERKAS INI yang perlu diubah untuk memperbarui isi situs.
   Jangan ubah berkas di folder assets/ kecuali paham HTML/CSS.

   Aturan menulis:
   - Setiap isian dibungkus tanda kutip "seperti ini"
   - Antar-isian dipisah koma
   - Jangan hapus tanda kurung { } atau [ ]
   - Nomor WhatsApp memakai format 62, bukan 08
     Contoh: 081234567890  ->  "6281234567890"
   - Isian bertanda GANTI: wajib diganti sebelum situs dipakai
   ============================================================ */

const DESA = {
  nama: "Sadomas",
  kecamatan: "Rajagaluh",
  kabupaten: "Majalengka",
  tagline: "Portal UMKM Desa",
  sapaan: "Selamat datang di Sadomas",
  judulHero: "Karya warga Sadomas, dari dapur dan kebun sendiri",
  paragrafHero:
    "Gabin tape, opak, keripik melinjo, sampai bibit palawija dan buah musiman " +
    "dari kaki Gunung Ciremai. Semua dijual langsung oleh warga Desa Sadomas, " +
    "Kecamatan Rajagaluh, Kabupaten Majalengka. Pilih produknya, lalu pesan " +
    "lewat WhatsApp ke pemiliknya.",
  alamat: "Jl. Syeh Maulana Mangsur No. 01, Desa Sadomas, Rajagaluh, Majalengka",
  waDesa: "GANTI_NOMOR_WA_DESA", // contoh: "6281234567890"
  email: "kkmsadomas@gmail.com",
  maps: "", // tempel tautan Google Maps balai desa, boleh dikosongkan
  instagram: "", // contoh: "https://instagram.com/namaakun"
  facebook: "",

  // Foto besar. Kosongkan bila belum ada; kotak bermotif akan tampil.
  fotoHero: "",   // contoh: "desa.jpg"  (simpan di assets/img/)
  fotoProfil: "", // contoh: "profil.jpg"

  // Bagian "Tentang Desa" di beranda
  judulProfil: "Desa bertani di kaki Gunung Ciremai",
  paragrafProfil:
    "Desa Sadomas berada di Kecamatan Rajagaluh, Kabupaten Majalengka. " +
    "Sebagian besar warganya bertani: padi, bibit palawija, picung, durian, " +
    "dan mangga. Sebagian lagi menjalankan usaha rumahan seperti gabin tape, " +
    "opak, dan keripik melinjo. Katalog ini dibuat agar produk warga bisa " +
    "ditemukan tanpa perantara, dan pembeli dari luar desa bisa langsung " +
    "menghubungi pemiliknya.",

  // Teks kaki halaman
  deskripsiKaki:
    "Katalog resmi produk UMKM Desa Sadomas. Dikelola Pemerintah Desa " +
    "bersama Karang Taruna, disusun dalam program KKM UMC 2026.",

  // Spanduk ajakan di bagian bawah halaman
  ajakan: {
    judul: "Punya usaha di Desa Sadomas?",
    teks:
      "Warga Desa Sadomas yang punya usaha rumahan bisa didaftarkan ke " +
      "katalog ini tanpa biaya. Hubungi sekretariat desa atau pengurus " +
      "Karang Taruna untuk pendataan.",
  },
  // Angka profil desa. Jumlah UMKM & produk dihitung otomatis dari data di bawah.
  jiwa: "1.863",
  wilayah: "5 RW / 7 RT",
  catatanAngka: "Data monografi desa, perlu diperbarui bila ada pendataan baru.",
};

/* ------------------------------------------------------------
   TESTIMONI di beranda.
   Isi hanya bila sudah benar-benar mewawancarai orangnya dan
   mendapat izin. Kosongkan teks (teks: "") bila belum ada —
   bagian ini otomatis tidak ditampilkan.
   ------------------------------------------------------------ */
const TESTIMONI = {
  teks: "GANTI: kutipan asli dari pelaku UMKM atau perangkat desa.",
  nama: "GANTI: nama narasumber",
  peran: "GANTI: jabatan atau nama usahanya",
  foto: "", // nama berkas di assets/img/
};

/* Kategori. "id" dipakai di data UMKM & produk, "nama" yang tampil di layar. */
const KATEGORI = [
  { id: "kuliner", nama: "Kuliner & Oleh-oleh" },
  { id: "pertanian", nama: "Pertanian & Bibit" },
  { id: "perikanan", nama: "Perikanan & Ternak" },
  { id: "kerajinan", nama: "Kerajinan" },
];

/* ------------------------------------------------------------
   DAFTAR UMKM
   slug      = alamat halaman, huruf kecil tanpa spasi (pakai tanda -)
   foto      = nama berkas di folder assets/img/. Kosongkan bila belum ada.
   penilaian = bintang 1-5. BIARKAN 0 selama belum ada penilaian nyata;
               bintang hanya muncul kalau isinya lebih dari 0.
   ------------------------------------------------------------ */
const UMKM = [
  {
    slug: "gabin-tape-wizura",
    nama: "Gabin Tape Wizura",
    kategori: "kuliner",
    pemilik: "GANTI: nama pemilik",
    berdiri: "GANTI: tahun berdiri",
    pekerja: "GANTI: jumlah pekerja",
    wa: "GANTI_NOMOR_WA",
    alamat: "GANTI: blok / RT / RW",
    foto: "",
    penilaian: 0,
    jamBuka: "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    pengiriman: "GANTI: contoh Ambil di tempat, kirim dalam kota",
    fotoLokasi: "",
    deskripsi:
      "Gabin tape khas Sadomas: tape singkong dibalut biskuit gabin lalu digoreng " +
      "tipis sampai renyah. Diproduksi harian di dapur rumah, dijual dalam kemasan " +
      "kotak untuk oleh-oleh maupun eceran.",
  },
  {
    slug: "opak-merah-sadomas",
    nama: "Opak Merah Sadomas",
    kategori: "kuliner",
    pemilik: "GANTI: nama pemilik",
    berdiri: "GANTI: tahun berdiri",
    pekerja: "GANTI: jumlah pekerja",
    wa: "GANTI_NOMOR_WA",
    alamat: "GANTI: blok / RT / RW",
    foto: "",
    penilaian: 0,
    jamBuka: "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    pengiriman: "GANTI: contoh Ambil di tempat, kirim dalam kota",
    fotoLokasi: "",
    deskripsi:
      "Opak beras ketan yang dijemur di halaman rumah dan dibakar di atas bara. " +
      "Warna merahnya dari bumbu, bukan pewarna. Dijual mentah maupun siap makan.",
  },
  {
    slug: "keripik-melinjo",
    nama: "Keripik Melinjo Sadomas",
    kategori: "kuliner",
    pemilik: "GANTI: nama pemilik",
    berdiri: "GANTI: tahun berdiri",
    pekerja: "GANTI: jumlah pekerja",
    wa: "GANTI_NOMOR_WA",
    alamat: "GANTI: blok / RT / RW",
    foto: "",
    penilaian: 0,
    jamBuka: "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    pengiriman: "GANTI: contoh Ambil di tempat, kirim dalam kota",
    fotoLokasi: "",
    deskripsi:
      "Emping melinjo tipis dari buah melinjo kebun sendiri. Tersedia mentah untuk " +
      "digoreng di rumah dan matang siap santap dengan pilihan rasa asin atau pedas.",
  },
  {
    slug: "bibit-palawija",
    nama: "Kebun Bibit Palawija",
    kategori: "pertanian",
    pemilik: "GANTI: nama pemilik",
    berdiri: "GANTI: tahun berdiri",
    pekerja: "GANTI: jumlah pekerja",
    wa: "GANTI_NOMOR_WA",
    alamat: "GANTI: blok / RT / RW",
    foto: "",
    penilaian: 0,
    jamBuka: "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    pengiriman: "GANTI: contoh Ambil di tempat, kirim dalam kota",
    fotoLokasi: "",
    deskripsi:
      "Pembibitan palawija milik warga: jagung, kacang tanah, dan sayuran dataran " +
      "menengah. Melayani pembelian per tray untuk petani maupun pekarangan rumah.",
  },
  {
    slug: "buah-musiman-sadomas",
    nama: "Buah Musiman Sadomas",
    kategori: "pertanian",
    pemilik: "GANTI: nama pemilik",
    berdiri: "GANTI: tahun berdiri",
    pekerja: "GANTI: jumlah pekerja",
    wa: "GANTI_NOMOR_WA",
    alamat: "GANTI: blok / RT / RW",
    foto: "",
    penilaian: 0,
    jamBuka: "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    pengiriman: "GANTI: contoh Ambil di tempat, kirim dalam kota",
    fotoLokasi: "",
    deskripsi:
      "Mangga, durian, dan picung hasil kebun warga. Karena mengikuti musim, " +
      "ketersediaan berubah tiap bulan. Tanyakan dulu lewat WhatsApp sebelum memesan.",
  },
  {
    slug: "donat-dan-brownies",
    nama: "Donat & Brownies Sadomas",
    kategori: "kuliner",
    pemilik: "GANTI: nama pemilik",
    berdiri: "GANTI: tahun berdiri",
    pekerja: "GANTI: jumlah pekerja",
    wa: "GANTI_NOMOR_WA",
    alamat: "GANTI: blok / RT / RW",
    foto: "",
    penilaian: 0,
    jamBuka: "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    pengiriman: "GANTI: contoh Ambil di tempat, kirim dalam kota",
    fotoLokasi: "",
    deskripsi:
      "Donat empuk dan brownies kukus buatan rumahan, dibuat segar setiap hari. " +
      "Cocok untuk oleh-oleh maupun camilan keluarga.",
  },
  {
    slug: "kerupuk-kulit-sapi-sadomas",
    nama: "Kerupuk Kulit Sapi Sadomas",
    kategori: "kuliner",
    pemilik: "GANTI: nama pemilik",
    berdiri: "GANTI: tahun berdiri",
    pekerja: "GANTI: jumlah pekerja",
    wa: "GANTI_NOMOR_WA",
    alamat: "GANTI: blok / RT / RW",
    foto: "",
    penilaian: 0,
    jamBuka: "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    pengiriman: "GANTI: contoh Ambil di tempat, kirim dalam kota",
    fotoLokasi: "",
    deskripsi:
      "Kerupuk dari kulit sapi pilihan, direbus lalu dijemur sebelum digoreng " +
      "renyah. Diproduksi rumahan, dijual mentah maupun siap makan.",
  },
  {
    slug: "kebun-sayuran-sadomas",
    nama: "Kebun Sayuran Sadomas",
    kategori: "pertanian",
    pemilik: "GANTI: nama pemilik",
    berdiri: "GANTI: tahun berdiri",
    pekerja: "GANTI: jumlah pekerja",
    wa: "GANTI_NOMOR_WA",
    alamat: "GANTI: blok / RT / RW",
    foto: "",
    penilaian: 0,
    jamBuka: "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    pengiriman: "GANTI: contoh Ambil di tempat, kirim dalam kota",
    fotoLokasi: "",
    deskripsi:
      "Sayuran segar hasil kebun warga: kol, sawi, cabai, dan tomat, dipanen " +
      "dari lahan dataran menengah di kaki Gunung Ciremai sesuai pesanan.",
  },
  {
    slug: "jajanan-pasar-bu-yeti",
    nama: "Jajanan Pasar Bu Yeti",
    kategori: "kuliner",
    pemilik: "Ibu Yeti",
    berdiri: "Sekitar 1 tahun",
    pekerja: "1 orang (dikerjakan sendiri)",
    wa: "6289627934242",
    alamat: "RT 04 / RW 02, Desa Sadomas",
    foto: "jajanan-bu-yeti-1.jpg",
    penilaian: 0,
    jamBuka:
      "Setiap hari kecuali libur, digoreng dini hari, tersedia di warung " +
      "sekitar mulai pagi untuk sarapan",
    pengiriman:
      "Dititipkan ke warung sekitar setiap pagi, atau ambil langsung di " +
      "rumah (termasuk pemesan dari luar kota)",
    fotoLokasi: "",
    deskripsi:
      "Jajanan pasar rumahan: molen, pastel, dan onde-onde, digoreng dan " +
      "dijual lepas tanpa kemasan seperti gorengan pada umumnya. Adonan " +
      "dibuat sendiri tiap malam sehabis Isya, digoreng dini hari, lalu " +
      "dititipkan ke warung-warung sekitar untuk sarapan pagi. Sudah " +
      "dikenal di daerah sekitar meski belum punya media sosial, dengan " +
      "beberapa pemesan dari luar kota dan banyak pesanan dari Rajagaluh " +
      "-- harga di sana biasanya sedikit lebih tinggi (sekitar Rp2.000) " +
      "karena dititipkan lewat pengecer. Sebelumnya " +
      "berjualan mochi, lalu beralih karena tepung ketan sering sulit " +
      "didapat -- onde-onde karena itu tidak selalu dibuat setiap hari. " +
      "Di bagian belakang rumah, Bu Yeti juga berjualan sayuran.",
  },
];

/* ------------------------------------------------------------
   DAFTAR WISATA
   slug      = alamat halaman, huruf kecil tanpa spasi (pakai tanda -)
   jenis     = contoh: Air Terjun, Bukit, Kolam Pemandian
   kontak    = nomor WhatsApp yang bisa dihubungi untuk bertanya soal
               lokasi ini. Boleh dikosongkan agar memakai WA desa.
   foto      = nama berkas di folder assets/img/. Kosongkan bila belum ada.
   penilaian = bintang 1-5. BIARKAN 0 selama belum ada penilaian nyata.
   galeri    = foto suasana lokasi (paling banyak 4). Boleh dikosongkan.
   ------------------------------------------------------------ */
const WISATA = [
  {
    slug: "wisata-cipendeuy",
    nama: "Wisata Cipendeuy",
    jenis: "GANTI: contoh Air Terjun / Bukit / Kolam Pemandian",
    alamat: "GANTI: blok / RT / RW, Desa Sadomas",
    jamBuka: "GANTI: contoh Setiap hari, 07.00-17.00 WIB",
    tiket: "GANTI: contoh Rp5.000 per orang",
    kontak: "GANTI_NOMOR_WA",
    foto: "",
    fotoLokasi: "",
    penilaian: 0,
    keteranganGaleri: "",
    galeri: [],
    deskripsi:
      "GANTI: ceritakan daya tarik Wisata Cipendeuy — pemandangan, aktivitas " +
      "yang bisa dilakukan pengunjung, dan kondisi jalan menuju lokasi.",
  },
];

/* ------------------------------------------------------------
   DAFTAR PRODUK
   umkm      = slug UMKM pemiliknya (harus sama persis)
   harga     = tulis kisaran, bukan harga pasti. Contoh: "Rp15.000 - Rp20.000"
   satuan    = per apa harganya. Contoh: "per kotak isi 10"
   penilaian = bintang 1-5. BIARKAN 0 sampai ada penilaian nyata.
   galeri    = foto tambahan selain foto utama, muncul sebagai deretan
               kotak kecil di bawah foto besar. Contoh: ["gabin-2.jpg"]
   ulasan    = ulasan pembeli sungguhan. Bagian ulasan hanya muncul
               kalau daftar ini terisi. Bentuknya:
               { nama: "", asal: "", penilaian: 5, teks: "" }
               JANGAN diisi ulasan karangan — gampang ketahuan dan
               merugikan nama desa.
   ------------------------------------------------------------ */
const PRODUK = [
  {
    slug: "gabin-tape-original",
    nama: "Gabin Tape Original",
    umkm: "gabin-tape-wizura",
    kategori: "kuliner",
    harga: "Rp15.000 – Rp18.000",
    satuan: "per kotak isi 10 buah",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: true,
    deskripsi:
      "Rasa asli tanpa tambahan perisa. Tape terasa manis asam, gabinnya renyah. " +
      "Paling awet dimakan dalam tiga hari setelah digoreng.",
    rincian: [
      ["Bahan utama", "Tape singkong dan biskuit gabin"],
      ["Isi kemasan", "10 buah per kotak"],
      ["Daya tahan", "3 hari suhu ruang"],
      ["Minimal pesan", "1 kotak"],
    ],
  },
  {
    slug: "gabin-tape-ubi-ungu",
    nama: "Gabin Tape Ubi Ungu",
    umkm: "gabin-tape-wizura",
    kategori: "kuliner",
    harga: "Rp18.000 – Rp22.000",
    satuan: "per kotak isi 10 buah",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: true,
    deskripsi:
      "Varian baru dengan campuran ubi ungu. Warnanya ungu alami dari ubi, " +
      "rasanya lebih lembut dan tidak seasam varian original.",
    rincian: [
      ["Bahan utama", "Tape singkong, ubi ungu, gabin"],
      ["Isi kemasan", "10 buah per kotak"],
      ["Daya tahan", "3 hari suhu ruang"],
      ["Minimal pesan", "1 kotak"],
    ],
  },
  {
    slug: "gabin-tape-cokelat",
    nama: "Gabin Tape Cokelat",
    umkm: "gabin-tape-wizura",
    kategori: "kuliner",
    harga: "Rp18.000 – Rp22.000",
    satuan: "per kotak isi 10 buah",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: true,
    deskripsi:
      "Lelehan cokelat di dalam tape. Varian paling disukai anak-anak dan " +
      "pembeli yang belum terbiasa dengan rasa tape.",
    rincian: [
      ["Bahan utama", "Tape singkong, cokelat, gabin"],
      ["Isi kemasan", "10 buah per kotak"],
      ["Daya tahan", "3 hari suhu ruang"],
      ["Minimal pesan", "1 kotak"],
    ],
  },
  {
    slug: "opak-mentah",
    nama: "Opak Beras Ketan Mentah",
    umkm: "opak-merah-sadomas",
    kategori: "kuliner",
    harga: "Rp10.000 – Rp13.000",
    satuan: "per ikat isi 20 lembar",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Opak yang sudah dijemur kering, tinggal dibakar atau digoreng di rumah. " +
      "Tahan lama selama disimpan di tempat kering.",
    rincian: [
      ["Bahan utama", "Beras ketan dan kelapa"],
      ["Isi", "20 lembar per ikat"],
      ["Daya tahan", "1 bulan di wadah tertutup"],
      ["Minimal pesan", "2 ikat"],
    ],
  },
  {
    slug: "opak-bakar-siap-makan",
    nama: "Opak Bakar Siap Makan",
    umkm: "opak-merah-sadomas",
    kategori: "kuliner",
    harga: "Rp15.000 – Rp18.000",
    satuan: "per bungkus 250 gram",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Sudah dibakar di atas bara sampai mengembang. Dibungkus plastik tebal " +
      "supaya tidak melempem saat dibawa jauh.",
    rincian: [
      ["Bahan utama", "Beras ketan dan kelapa"],
      ["Berat", "250 gram per bungkus"],
      ["Daya tahan", "2 minggu"],
      ["Minimal pesan", "1 bungkus"],
    ],
  },
  {
    slug: "emping-melinjo-mentah",
    nama: "Emping Melinjo Mentah",
    umkm: "keripik-melinjo",
    kategori: "kuliner",
    harga: "Rp45.000 – Rp55.000",
    satuan: "per kilogram",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: true,
    deskripsi:
      "Emping tipis hasil tumbukan tangan. Belum digoreng, jadi bisa disimpan " +
      "lama dan digoreng saat dibutuhkan.",
    rincian: [
      ["Bahan utama", "Buah melinjo tua"],
      ["Berat", "1 kilogram"],
      ["Daya tahan", "3 bulan di wadah kedap"],
      ["Minimal pesan", "1 kilogram"],
    ],
  },
  {
    slug: "keripik-melinjo-pedas",
    nama: "Keripik Melinjo Pedas",
    umkm: "keripik-melinjo",
    kategori: "kuliner",
    harga: "Rp12.000 – Rp15.000",
    satuan: "per bungkus 100 gram",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Sudah digoreng dan dibumbui cabai kering. Tingkat pedasnya bisa diminta " +
      "sedang atau pedas saat memesan.",
    rincian: [
      ["Bahan utama", "Melinjo, cabai kering, garam"],
      ["Berat", "100 gram per bungkus"],
      ["Daya tahan", "1 bulan"],
      ["Minimal pesan", "3 bungkus"],
    ],
  },
  {
    slug: "bibit-jagung",
    nama: "Bibit Jagung Siap Tanam",
    umkm: "bibit-palawija",
    kategori: "pertanian",
    harga: "Rp25.000 – Rp35.000",
    satuan: "per tray isi 50 lubang",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Bibit umur dua minggu, sudah berdaun tiga sampai empat helai. Siap " +
      "dipindah ke lahan. Pemesanan sebaiknya seminggu sebelum tanam.",
    rincian: [
      ["Umur bibit", "14 hari"],
      ["Isi", "50 lubang per tray"],
      ["Pesan minimal", "2 tray"],
      ["Catatan", "Perlu dipesan seminggu sebelumnya"],
    ],
  },
  {
    slug: "bibit-sayuran",
    nama: "Bibit Sayuran Pekarangan",
    umkm: "bibit-palawija",
    kategori: "pertanian",
    harga: "Rp2.000 – Rp3.000",
    satuan: "per polibag",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Cabai, terong, dan tomat dalam polibag kecil untuk ditanam di pekarangan " +
      "rumah. Cocok untuk program pekarangan pangan warga.",
    rincian: [
      ["Jenis", "Cabai, terong, tomat"],
      ["Wadah", "Polibag 10 cm"],
      ["Pesan minimal", "10 polibag"],
      ["Catatan", "Jenis menyesuaikan ketersediaan"],
    ],
  },
  {
    slug: "mangga-musiman",
    nama: "Mangga Kebun Warga",
    umkm: "buah-musiman-sadomas",
    kategori: "pertanian",
    harga: "Rp15.000 – Rp25.000",
    satuan: "per kilogram",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Mangga hasil kebun warga, dipetik saat pesanan masuk. Ketersediaan " +
      "mengikuti musim panen, biasanya pertengahan sampai akhir tahun.",
    rincian: [
      ["Musim panen", "Menyesuaikan tahun berjalan"],
      ["Berat", "Per kilogram"],
      ["Pesan minimal", "3 kilogram"],
      ["Catatan", "Tanyakan ketersediaan dulu"],
    ],
  },
  {
    slug: "durian-lokal",
    nama: "Durian Lokal Sadomas",
    umkm: "buah-musiman-sadomas",
    kategori: "pertanian",
    harga: "GANTI: kisaran harga",
    satuan: "per buah",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Durian kebun warga yang jatuh matang pohon. Jumlahnya terbatas dan " +
      "hanya ada pada musim tertentu.",
    rincian: [
      ["Musim panen", "GANTI: bulan panen"],
      ["Ukuran", "GANTI: kisaran berat"],
      ["Pesan minimal", "1 buah"],
      ["Catatan", "Tanyakan ketersediaan dulu"],
    ],
  },
  {
    slug: "donat-gula-sadomas",
    nama: "Donat Gula",
    umkm: "donat-dan-brownies",
    kategori: "kuliner",
    harga: "GANTI: kisaran harga",
    satuan: "per boks isi 6 buah",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Donat empuk dengan taburan gula halus, digoreng dan dikemas segar " +
      "setiap hari.",
    rincian: [
      ["Bahan utama", "Tepung terigu, ragi, gula halus"],
      ["Isi kemasan", "6 buah per boks"],
      ["Daya tahan", "GANTI: berapa hari"],
      ["Minimal pesan", "1 boks"],
    ],
  },
  {
    slug: "brownies-kukus-sadomas",
    nama: "Brownies Kukus",
    umkm: "donat-dan-brownies",
    kategori: "kuliner",
    harga: "GANTI: kisaran harga",
    satuan: "per loyang",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Brownies kukus cokelat legit, dikukus tanpa oven sehingga teksturnya " +
      "lembap dan padat.",
    rincian: [
      ["Bahan utama", "Cokelat, tepung terigu, telur"],
      ["Ukuran", "1 loyang"],
      ["Daya tahan", "GANTI: berapa hari"],
      ["Minimal pesan", "1 loyang"],
    ],
  },
  {
    slug: "kerupuk-kulit-sapi-mentah",
    nama: "Kerupuk Kulit Sapi Mentah",
    umkm: "kerupuk-kulit-sapi-sadomas",
    kategori: "kuliner",
    harga: "GANTI: kisaran harga",
    satuan: "per kilogram",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Kerupuk kulit sapi yang sudah direbus dan dijemur kering, siap digoreng " +
      "sendiri di rumah.",
    rincian: [
      ["Bahan utama", "Kulit sapi pilihan"],
      ["Berat", "1 kilogram"],
      ["Daya tahan", "GANTI: berapa lama"],
      ["Minimal pesan", "GANTI: jumlah minimal"],
    ],
  },
  {
    slug: "kerupuk-kulit-sapi-goreng",
    nama: "Kerupuk Kulit Sapi Siap Makan",
    umkm: "kerupuk-kulit-sapi-sadomas",
    kategori: "kuliner",
    harga: "GANTI: kisaran harga",
    satuan: "per bungkus",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Sudah digoreng renyah dan dikemas rapat, tinggal buka dan santap.",
    rincian: [
      ["Bahan utama", "Kulit sapi pilihan"],
      ["Berat", "GANTI: berat per bungkus"],
      ["Daya tahan", "GANTI: berapa lama"],
      ["Minimal pesan", "1 bungkus"],
    ],
  },
  {
    slug: "sayur-campur-sadomas",
    nama: "Paket Sayur Campur",
    umkm: "kebun-sayuran-sadomas",
    kategori: "pertanian",
    harga: "GANTI: kisaran harga",
    satuan: "per kilogram",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Campuran sayuran segar hasil kebun sendiri, dipanen sesuai pesanan " +
      "agar tetap segar sampai ke pembeli.",
    rincian: [
      ["Jenis", "Kol, sawi, cabai, tomat"],
      ["Berat", "Per kilogram"],
      ["Pesan minimal", "GANTI: jumlah minimal"],
      ["Catatan", "Jenis menyesuaikan hasil panen"],
    ],
  },
  {
    slug: "cabai-rawit-sadomas",
    nama: "Cabai Rawit Segar",
    umkm: "kebun-sayuran-sadomas",
    kategori: "pertanian",
    harga: "GANTI: kisaran harga",
    satuan: "per kilogram",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Cabai rawit hasil kebun warga, dipetik segar sesuai pesanan.",
    rincian: [
      ["Jenis", "Cabai rawit"],
      ["Berat", "Per kilogram"],
      ["Pesan minimal", "GANTI: jumlah minimal"],
      ["Catatan", "Harga mengikuti harga pasar saat panen"],
    ],
  },
  {
    slug: "molen-bu-yeti",
    nama: "Molen",
    umkm: "jajanan-pasar-bu-yeti",
    kategori: "kuliner",
    harga: "Rp1.000",
    satuan: "per buah",
    foto: "jajanan-bu-yeti-1.jpg",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: true,
    deskripsi:
      "Molen pisang digoreng renyah, dijual lepas tanpa kemasan seperti " +
      "gorengan pada umumnya. Digoreng dini hari, dititipkan ke warung " +
      "untuk sarapan pagi.",
    rincian: [
      ["Bahan utama", "Pisang dan adonan tepung buatan sendiri"],
      ["Kemasan", "Tanpa kemasan, dijual lepas"],
      ["Minimal pesan", "GANTI: jumlah minimal"],
    ],
  },
  {
    slug: "pastel-bu-yeti",
    nama: "Pastel",
    umkm: "jajanan-pasar-bu-yeti",
    kategori: "kuliner",
    harga: "Rp1.000",
    satuan: "per buah",
    foto: "jajanan-bu-yeti-1.jpg",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: true,
    deskripsi:
      "Pastel isi bihun jagung, digoreng renyah, dijual lepas tanpa " +
      "kemasan seperti gorengan pada umumnya.",
    rincian: [
      ["Isi", "Bihun jagung"],
      ["Kemasan", "Tanpa kemasan, dijual lepas"],
      ["Minimal pesan", "GANTI: jumlah minimal"],
    ],
  },
  {
    slug: "onde-onde-bu-yeti",
    nama: "Onde-onde",
    umkm: "jajanan-pasar-bu-yeti",
    kategori: "kuliner",
    harga: "Rp1.000",
    satuan: "per buah",
    foto: "",
    penilaian: 0,
    galeri: [],
    ulasan: [],
    unggulan: false,
    deskripsi:
      "Onde-onde buatan rumahan. Tepung ketan sering sulit didapat, jadi " +
      "tidak selalu dibuat setiap hari -- tanyakan dulu ketersediaannya " +
      "lewat WhatsApp.",
    rincian: [
      ["Catatan", "Tidak dibuat setiap hari, tergantung ketersediaan tepung ketan"],
      ["Kemasan", "Tanpa kemasan, dijual lepas"],
      ["Minimal pesan", "GANTI: jumlah minimal"],
    ],
  },
];
