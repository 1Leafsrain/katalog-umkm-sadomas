/* ============================================================
   DATA KATALOG UMKM DESA SADOMAS
   ------------------------------------------------------------
   BERKAS INI DIBUAT OTOMATIS oleh GitHub Actions, disusun dari
   data/db/*.json (UMKM/PRODUK/WISATA/ULASAN/PROMO -- lihat
   PANDUAN-ADMIN.md) dan, kalau mode Sheet dipakai, dari Google
   Sheet untuk DESA/TESTIMONI/KATEGORI (lihat PANDUAN-SHEET.md).

   JANGAN DIEDIT LANGSUNG DI SINI -- perubahan akan tertimpa pada
   jalan berikutnya. Untuk mengubah isi katalog, edit lewat
   admin.html (UMKM/Produk/Wisata/Ulasan/Promo/Kode Akses), atau
   Google Sheet untuk DESA/TESTIMONI/KATEGORI kalau mode itu
   dipakai.

   Riwayat perubahan bisa dilihat lewat tombol History pada
   berkas ini di GitHub.
   ============================================================ */

const DESA = {
  "nama": "Sadomas",
  "kecamatan": "Rajagaluh",
  "kabupaten": "Majalengka",
  "tagline": "Portal UMKM Desa",
  "sapaan": "Selamat datang di Sadomas",
  "judulHero": "Karya warga Sadomas, dari dapur dan kebun sendiri",
  "paragrafHero": "Gabin tape, opak, keripik melinjo, sampai bibit palawija dan buah musiman dari kaki Gunung Ciremai. Semua dijual langsung oleh warga Desa Sadomas, Kecamatan Rajagaluh, Kabupaten Majalengka. Pilih produknya, lalu pesan lewat WhatsApp ke pemiliknya.",
  "alamat": "Jl. Syeh Maulana Mangsur No. 01, Desa Sadomas, Rajagaluh, Majalengka",
  "waDesa": "GANTI_NOMOR_WA_DESA",
  "email": "kkmsadomas@gmail.com",
  "maps": "",
  "instagram": "",
  "facebook": "",
  "fotoHero": "desa-sadomas.jpg",
  "fotoProfil": "balai-desa-sadomas.jpg",
  "judulProfil": "Desa bertani di kaki Gunung Ciremai",
  "paragrafProfil": "Desa Sadomas berada di Kecamatan Rajagaluh, Kabupaten Majalengka. Sebagian besar warganya bertani: padi, bibit palawija, picung, durian, dan mangga. Sebagian lagi menjalankan usaha rumahan seperti gabin tape, opak, dan keripik melinjo. Katalog ini dibuat agar produk warga bisa ditemukan tanpa perantara, dan pembeli dari luar desa bisa langsung menghubungi pemiliknya.",
  "deskripsiKaki": "Katalog resmi produk UMKM Desa Sadomas. Dikelola Pemerintah Desa bersama Karang Taruna, disusun dalam program KKM UMC 2026.",
  "ajakan": {
    "judul": "Punya usaha di Desa Sadomas?",
    "teks": "Warga Desa Sadomas yang punya usaha rumahan bisa didaftarkan ke katalog ini tanpa biaya. Hubungi sekretariat desa atau pengurus Karang Taruna untuk pendataan."
  },
  "jiwa": "1.863",
  "wilayah": "5 RW / 7 RT",
  "catatanAngka": "Data monografi desa, perlu diperbarui bila ada pendataan baru."
};

const TESTIMONI = {
  "teks": "GANTI: kutipan asli dari pelaku UMKM atau perangkat desa.",
  "nama": "GANTI: nama narasumber",
  "peran": "GANTI: jabatan atau nama usahanya",
  "foto": ""
};

const KATEGORI = [
  {
    "id": "kuliner",
    "nama": "Kuliner & Oleh-oleh"
  },
  {
    "id": "pertanian",
    "nama": "Pertanian & Bibit"
  },
  {
    "id": "perikanan",
    "nama": "Perikanan & Ternak"
  },
  {
    "id": "kerajinan",
    "nama": "Kerajinan"
  }
];

const UMKM = [
  {
    "slug": "gabin-tape-wizura",
    "nama": "Gabin Tape Wizura",
    "kategori": "kuliner",
    "pemilik": "GANTI: nama pemilik",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Gabin tape khas Sadomas: tape singkong dibalut biskuit gabin lalu digoreng tipis sampai renyah. Diproduksi harian di dapur rumah, dijual dalam kemasan kotak untuk oleh-oleh maupun eceran.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "opak-merah-sadomas",
    "nama": "Opak Merah Sadomas",
    "kategori": "kuliner",
    "pemilik": "GANTI: nama pemilik",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "opak-ilustrasi.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Opak beras ketan yang dijemur di halaman rumah dan dibakar di atas bara. Warna merahnya dari bumbu, bukan pewarna. Dijual mentah maupun siap makan.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "keripik-melinjo",
    "nama": "Keripik Melinjo Sadomas",
    "kategori": "kuliner",
    "pemilik": "GANTI: nama pemilik",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "emping-melinjo.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Emping melinjo tipis dari buah melinjo kebun sendiri. Tersedia mentah untuk digoreng di rumah dan matang siap santap dengan pilihan rasa asin atau pedas.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "bibit-palawija",
    "nama": "Kebun Bibit Palawija",
    "kategori": "pertanian",
    "pemilik": "GANTI: nama pemilik",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "bibit-jagung.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Pembibitan palawija milik warga: jagung, kacang tanah, dan sayuran dataran menengah. Melayani pembelian per tray untuk petani maupun pekarangan rumah.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "buah-musiman-sadomas",
    "nama": "Buah Musiman Sadomas",
    "kategori": "pertanian",
    "pemilik": "GANTI: nama pemilik",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "mangga-kebun.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Mangga, durian, dan picung hasil kebun warga. Karena mengikuti musim, ketersediaan berubah tiap bulan. Tanyakan dulu lewat WhatsApp sebelum memesan.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "donat-dan-brownies",
    "nama": "Donat & Brownies Sadomas",
    "kategori": "kuliner",
    "pemilik": "GANTI: nama pemilik",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "donat.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Donat empuk dan brownies kukus buatan rumahan, dibuat segar setiap hari. Cocok untuk oleh-oleh maupun camilan keluarga.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "kerupuk-kulit-sapi-sadomas",
    "nama": "Kerupuk Kulit Sapi Sadomas",
    "kategori": "kuliner",
    "pemilik": "Rena Reno Ratu",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "kerupuk-kulit-2.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Kerupuk dari kulit sapi pilihan, direbus lalu dijemur sebelum digoreng renyah. Diproduksi rumahan dengan merek 'RR Ratu', bersertifikat Halal dan terdaftar P-IRT. Tersedia beberapa ukuran kemasan, dari bungkus kecil sampai 1,5 kilogram.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "kebun-sayuran-sadomas",
    "nama": "Kebun Sayuran Sadomas",
    "kategori": "pertanian",
    "pemilik": "GANTI: nama pemilik",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "sayuran-kebun.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Sayuran segar hasil kebun warga: kol, sawi, cabai, dan tomat, dipanen dari lahan dataran menengah di kaki Gunung Ciremai sesuai pesanan.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "jajanan-pasar-bu-yeti",
    "nama": "Jajanan Pasar Bu Yeti",
    "kategori": "kuliner",
    "pemilik": "Ibu Yeti",
    "wa": "6289627934242",
    "alamat": "RT 04 / RW 02, Desa Sadomas",
    "foto": "molen-bu-yeti.jpg",
    "penilaian": 0,
    "jamBuka": "Setiap hari kecuali libur, digoreng dini hari, tersedia di warung sekitar mulai pagi untuk sarapan",
    "pengiriman": "Dititipkan ke warung sekitar setiap pagi, atau ambil langsung di rumah (termasuk pemesan dari luar kota)",
    "fotoLokasi": "",
    "deskripsi": "Jajanan pasar rumahan: molen, pastel, risol sayur, dan onde-onde, digoreng dan dijual lepas tanpa kemasan seperti gorengan pada umumnya. Adonan dibuat sendiri tiap malam sehabis Isya, digoreng dini hari, lalu dititipkan ke warung-warung sekitar untuk sarapan pagi. Sudah dikenal di daerah sekitar meski belum punya media sosial, dengan beberapa pemesan dari luar kota dan banyak pesanan dari Rajagaluh -- harga di sana biasanya sedikit lebih tinggi (sekitar Rp2.000) karena dititipkan lewat pengecer. Sebelumnya berjualan mochi, lalu beralih karena tepung ketan sering sulit didapat -- onde-onde karena itu tidak selalu dibuat setiap hari. Di bagian belakang rumah, Bu Yeti juga berjualan sayuran.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "abu-meubel",
    "nama": "ABU Meubel",
    "kategori": "kerajinan",
    "pemilik": "Abu",
    "wa": "6285324442415",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "abu-meubel-3.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Kerja sesuai pesanan, antar ke lokasi",
    "fotoLokasi": "",
    "deskripsi": "Usaha mebel dan kayu custom: bufet/backdrop TV, kitchen set, lemari, meja-kursi, sampai pintu kayu jati -- dikerjakan sesuai pesanan dan ukuran ruangan pemesan.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "mie-ayam-bakso-neng-andin",
    "nama": "Mie Ayam Bakso Neng Andin",
    "kategori": "kuliner",
    "pemilik": "GANTI: nama pemilik",
    "wa": "6282320027464",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "bakso-andin-1.jpg",
    "penilaian": 0,
    "jamBuka": "Setiap hari, 08.00-20.00 WIB",
    "pengiriman": "GANTI: contoh Makan di tempat, bisa dibungkus",
    "fotoLokasi": "",
    "deskripsi": "Warung mie ayam dan bakso: bakso biasa, bakso super, mie ayam, dan mie yamso (mie yamin bakso) dalam tiga ukuran, lengkap dengan aneka minuman.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  },
  {
    "slug": "es-teh-ningrat",
    "nama": "Es Teh Ningrat",
    "kategori": "kuliner",
    "pemilik": "GANTI: nama pemilik",
    "wa": "GANTI_NOMOR_WA",
    "alamat": "GANTI: blok / RT / RW",
    "foto": "es-teh-ningrat-jumbo.jpg",
    "penilaian": 0,
    "jamBuka": "GANTI: contoh Setiap hari, 08.00-17.00 WIB",
    "pengiriman": "GANTI: contoh Ambil di tempat, kirim dalam kota",
    "fotoLokasi": "",
    "deskripsi": "Minuman es teh kekinian dengan berbagai rasa buah, ditambah pilihan milkshake seperti matcha, taro ube, thai tea, avocado, dan royal chocolate.",
    "promo": {
      "teks": "",
      "aktif": false
    }
  }
];

const PRODUK = [
  {
    "slug": "gabin-tape-original",
    "nama": "Gabin Tape Original",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp15.000 – Rp18.000",
    "satuan": "per kotak isi 10 buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": true,
    "deskripsi": "Rasa asli tanpa tambahan perisa. Tape terasa manis asam, gabinnya renyah. Paling awet dimakan dalam tiga hari setelah digoreng.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong dan biskuit gabin"
      ],
      [
        "Isi kemasan",
        "10 buah per kotak"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 kotak"
      ]
    ]
  },
  {
    "slug": "gabin-tape-ubi-ungu",
    "nama": "Gabin Tape Ubi Ungu",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp18.000 – Rp22.000",
    "satuan": "per kotak isi 10 buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": true,
    "deskripsi": "Varian baru dengan campuran ubi ungu. Warnanya ungu alami dari ubi, rasanya lebih lembut dan tidak seasam varian original.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong, ubi ungu, gabin"
      ],
      [
        "Isi kemasan",
        "10 buah per kotak"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 kotak"
      ]
    ]
  },
  {
    "slug": "gabin-tape-cokelat",
    "nama": "Gabin Tape Cokelat",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp18.000 – Rp22.000",
    "satuan": "per kotak isi 10 buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": true,
    "deskripsi": "Lelehan cokelat di dalam tape. Varian paling disukai anak-anak dan pembeli yang belum terbiasa dengan rasa tape.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong, cokelat, gabin"
      ],
      [
        "Isi kemasan",
        "10 buah per kotak"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 kotak"
      ]
    ]
  },
  {
    "slug": "gabin-tape-original-kecil",
    "nama": "Gabin Tape Original Kecil",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp1.000",
    "satuan": "per buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Rasa asli tanpa tambahan perisa, ukuran kecil, dijual satuan. Tape terasa manis asam, gabinnya renyah.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong dan biskuit gabin"
      ],
      [
        "Ukuran",
        "Kecil"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 buah"
      ]
    ]
  },
  {
    "slug": "gabin-tape-original-besar",
    "nama": "Gabin Tape Original Besar",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp2.000",
    "satuan": "per buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Rasa asli tanpa tambahan perisa, ukuran besar, dijual satuan. Tape terasa manis asam, gabinnya renyah.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong dan biskuit gabin"
      ],
      [
        "Ukuran",
        "Besar"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 buah"
      ]
    ]
  },
  {
    "slug": "gabin-tape-ubi-ungu-kecil",
    "nama": "Gabin Tape Ubi Ungu Kecil",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp1.000",
    "satuan": "per buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Varian ubi ungu, ukuran kecil, dijual satuan. Warnanya ungu alami dari ubi, rasanya lebih lembut dan tidak seasam varian original.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong, ubi ungu, gabin"
      ],
      [
        "Ukuran",
        "Kecil"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 buah"
      ]
    ]
  },
  {
    "slug": "gabin-tape-ubi-ungu-besar",
    "nama": "Gabin Tape Ubi Ungu Besar",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp2.000",
    "satuan": "per buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Varian ubi ungu, ukuran besar, dijual satuan. Warnanya ungu alami dari ubi, rasanya lebih lembut dan tidak seasam varian original.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong, ubi ungu, gabin"
      ],
      [
        "Ukuran",
        "Besar"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 buah"
      ]
    ]
  },
  {
    "slug": "gabin-tape-cokelat-kecil",
    "nama": "Gabin Tape Cokelat Kecil",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp1.000",
    "satuan": "per buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Lelehan cokelat di dalam tape, ukuran kecil, dijual satuan. Varian paling disukai anak-anak dan pembeli yang belum terbiasa dengan rasa tape.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong, cokelat, gabin"
      ],
      [
        "Ukuran",
        "Kecil"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 buah"
      ]
    ]
  },
  {
    "slug": "gabin-tape-cokelat-besar",
    "nama": "Gabin Tape Cokelat Besar",
    "umkm": "gabin-tape-wizura",
    "kategori": "kuliner",
    "harga": "Rp2.000",
    "satuan": "per buah",
    "foto": "gabin-tapai.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Lelehan cokelat di dalam tape, ukuran besar, dijual satuan. Varian paling disukai anak-anak dan pembeli yang belum terbiasa dengan rasa tape.",
    "rincian": [
      [
        "Bahan utama",
        "Tape singkong, cokelat, gabin"
      ],
      [
        "Ukuran",
        "Besar"
      ],
      [
        "Daya tahan",
        "3 hari suhu ruang"
      ],
      [
        "Minimal pesan",
        "1 buah"
      ]
    ]
  },
  {
    "slug": "opak-mentah",
    "nama": "Opak Beras Ketan Mentah",
    "umkm": "opak-merah-sadomas",
    "kategori": "kuliner",
    "harga": "Rp10.000 – Rp13.000",
    "satuan": "per ikat isi 20 lembar",
    "foto": "opak-ilustrasi.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Opak yang sudah dijemur kering, tinggal dibakar atau digoreng di rumah. Tahan lama selama disimpan di tempat kering.",
    "rincian": [
      [
        "Bahan utama",
        "Beras ketan dan kelapa"
      ],
      [
        "Isi",
        "20 lembar per ikat"
      ],
      [
        "Daya tahan",
        "1 bulan di wadah tertutup"
      ],
      [
        "Minimal pesan",
        "2 ikat"
      ]
    ]
  },
  {
    "slug": "opak-bakar-siap-makan",
    "nama": "Opak Bakar Siap Makan",
    "umkm": "opak-merah-sadomas",
    "kategori": "kuliner",
    "harga": "Rp15.000 – Rp18.000",
    "satuan": "per bungkus 250 gram",
    "foto": "opak-ilustrasi.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Sudah dibakar di atas bara sampai mengembang. Dibungkus plastik tebal supaya tidak melempem saat dibawa jauh.",
    "rincian": [
      [
        "Bahan utama",
        "Beras ketan dan kelapa"
      ],
      [
        "Berat",
        "250 gram per bungkus"
      ],
      [
        "Daya tahan",
        "2 minggu"
      ],
      [
        "Minimal pesan",
        "1 bungkus"
      ]
    ]
  },
  {
    "slug": "emping-melinjo-mentah",
    "nama": "Emping Melinjo Mentah",
    "umkm": "keripik-melinjo",
    "kategori": "kuliner",
    "harga": "Rp45.000 – Rp55.000",
    "satuan": "per kilogram",
    "foto": "emping-melinjo.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": true,
    "deskripsi": "Emping tipis hasil tumbukan tangan. Belum digoreng, jadi bisa disimpan lama dan digoreng saat dibutuhkan.",
    "rincian": [
      [
        "Bahan utama",
        "Buah melinjo tua"
      ],
      [
        "Berat",
        "1 kilogram"
      ],
      [
        "Daya tahan",
        "3 bulan di wadah kedap"
      ],
      [
        "Minimal pesan",
        "1 kilogram"
      ]
    ]
  },
  {
    "slug": "keripik-melinjo-pedas",
    "nama": "Keripik Melinjo Pedas",
    "umkm": "keripik-melinjo",
    "kategori": "kuliner",
    "harga": "Rp12.000 – Rp15.000",
    "satuan": "per bungkus 100 gram",
    "foto": "emping-melinjo.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Sudah digoreng dan dibumbui cabai kering. Tingkat pedasnya bisa diminta sedang atau pedas saat memesan.",
    "rincian": [
      [
        "Bahan utama",
        "Melinjo, cabai kering, garam"
      ],
      [
        "Berat",
        "100 gram per bungkus"
      ],
      [
        "Daya tahan",
        "1 bulan"
      ],
      [
        "Minimal pesan",
        "3 bungkus"
      ]
    ]
  },
  {
    "slug": "bibit-jagung",
    "nama": "Bibit Jagung Siap Tanam",
    "umkm": "bibit-palawija",
    "kategori": "pertanian",
    "harga": "Rp25.000 – Rp35.000",
    "satuan": "per tray isi 50 lubang",
    "foto": "bibit-jagung.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Bibit umur dua minggu, sudah berdaun tiga sampai empat helai. Siap dipindah ke lahan. Pemesanan sebaiknya seminggu sebelum tanam.",
    "rincian": [
      [
        "Umur bibit",
        "14 hari"
      ],
      [
        "Isi",
        "50 lubang per tray"
      ],
      [
        "Pesan minimal",
        "2 tray"
      ],
      [
        "Catatan",
        "Perlu dipesan seminggu sebelumnya"
      ]
    ]
  },
  {
    "slug": "bibit-sayuran",
    "nama": "Bibit Sayuran Pekarangan",
    "umkm": "bibit-palawija",
    "kategori": "pertanian",
    "harga": "Rp2.000 – Rp3.000",
    "satuan": "per polibag",
    "foto": "sayuran-kebun.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Cabai, terong, dan tomat dalam polibag kecil untuk ditanam di pekarangan rumah. Cocok untuk program pekarangan pangan warga.",
    "rincian": [
      [
        "Jenis",
        "Cabai, terong, tomat"
      ],
      [
        "Wadah",
        "Polibag 10 cm"
      ],
      [
        "Pesan minimal",
        "10 polibag"
      ],
      [
        "Catatan",
        "Jenis menyesuaikan ketersediaan"
      ]
    ]
  },
  {
    "slug": "mangga-musiman",
    "nama": "Mangga Kebun Warga",
    "umkm": "buah-musiman-sadomas",
    "kategori": "pertanian",
    "harga": "Rp15.000 – Rp25.000",
    "satuan": "per kilogram",
    "foto": "mangga-kebun.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Mangga hasil kebun warga, dipetik saat pesanan masuk. Ketersediaan mengikuti musim panen, biasanya pertengahan sampai akhir tahun.",
    "rincian": [
      [
        "Musim panen",
        "Menyesuaikan tahun berjalan"
      ],
      [
        "Berat",
        "Per kilogram"
      ],
      [
        "Pesan minimal",
        "3 kilogram"
      ],
      [
        "Catatan",
        "Tanyakan ketersediaan dulu"
      ]
    ]
  },
  {
    "slug": "durian-lokal",
    "nama": "Durian Lokal Sadomas",
    "umkm": "buah-musiman-sadomas",
    "kategori": "pertanian",
    "harga": "GANTI: kisaran harga",
    "satuan": "per buah",
    "foto": "",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Durian kebun warga yang jatuh matang pohon. Jumlahnya terbatas dan hanya ada pada musim tertentu.",
    "rincian": [
      [
        "Musim panen",
        "GANTI: bulan panen"
      ],
      [
        "Ukuran",
        "GANTI: kisaran berat"
      ],
      [
        "Pesan minimal",
        "1 buah"
      ],
      [
        "Catatan",
        "Tanyakan ketersediaan dulu"
      ]
    ]
  },
  {
    "slug": "donat-gula-sadomas",
    "nama": "Donat Gula",
    "umkm": "donat-dan-brownies",
    "kategori": "kuliner",
    "harga": "GANTI: kisaran harga",
    "satuan": "per boks isi 6 buah",
    "foto": "donat.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Donat empuk dengan taburan gula halus, digoreng dan dikemas segar setiap hari.",
    "rincian": [
      [
        "Bahan utama",
        "Tepung terigu, ragi, gula halus"
      ],
      [
        "Isi kemasan",
        "6 buah per boks"
      ],
      [
        "Daya tahan",
        "GANTI: berapa hari"
      ],
      [
        "Minimal pesan",
        "1 boks"
      ]
    ]
  },
  {
    "slug": "brownies-kukus-sadomas",
    "nama": "Brownies Kukus",
    "umkm": "donat-dan-brownies",
    "kategori": "kuliner",
    "harga": "GANTI: kisaran harga",
    "satuan": "per loyang",
    "foto": "",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Brownies kukus cokelat legit, dikukus tanpa oven sehingga teksturnya lembap dan padat.",
    "rincian": [
      [
        "Bahan utama",
        "Cokelat, tepung terigu, telur"
      ],
      [
        "Ukuran",
        "1 loyang"
      ],
      [
        "Daya tahan",
        "GANTI: berapa hari"
      ],
      [
        "Minimal pesan",
        "1 loyang"
      ]
    ]
  },
  {
    "slug": "kerupuk-kulit-sapi-pack-panjang",
    "nama": "Kerupuk Kulit Sapi Pack Panjang",
    "umkm": "kerupuk-kulit-sapi-sadomas",
    "kategori": "kuliner",
    "harga": "Rp12.500",
    "satuan": "per pack",
    "foto": "kerupuk-kulit-1.jpg",
    "penilaian": 0,
    "galeri": [
      "kerupuk-kulit-3.jpg"
    ],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Sudah digoreng renyah, dikemas dalam pack panjang. Merek 'RR Ratu', bersertifikat Halal dan terdaftar P-IRT 2013210010707-28.",
    "rincian": [
      [
        "Bahan utama",
        "Kulit sapi pilihan"
      ],
      [
        "Merek",
        "RR Ratu"
      ],
      [
        "Sertifikat",
        "Halal Indonesia, P-IRT 2013210010707-28"
      ],
      [
        "Minimal pesan",
        "1 pack"
      ]
    ]
  },
  {
    "slug": "kerupuk-kulit-sapi-pack",
    "nama": "Kerupuk Kulit Sapi Pack",
    "umkm": "kerupuk-kulit-sapi-sadomas",
    "kategori": "kuliner",
    "harga": "Rp16.000",
    "satuan": "per pack",
    "foto": "kerupuk-kulit-1.jpg",
    "penilaian": 0,
    "galeri": [
      "kerupuk-kulit-3.jpg"
    ],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Sudah digoreng renyah, dikemas dalam pack. Merek 'RR Ratu', bersertifikat Halal dan terdaftar P-IRT 2013210010707-28. Harga grosir Rp12.500/pack untuk pembelian minimal 10 pcs.",
    "rincian": [
      [
        "Bahan utama",
        "Kulit sapi pilihan"
      ],
      [
        "Merek",
        "RR Ratu"
      ],
      [
        "Sertifikat",
        "Halal Indonesia, P-IRT 2013210010707-28"
      ],
      [
        "Harga grosir",
        "Rp12.500/pack untuk pembelian minimal 10 pcs"
      ]
    ]
  },
  {
    "slug": "kerupuk-kulit-sapi-500gr",
    "nama": "Kerupuk Kulit Sapi 500 Gram",
    "umkm": "kerupuk-kulit-sapi-sadomas",
    "kategori": "kuliner",
    "harga": "Rp55.000",
    "satuan": "per 500 gram",
    "foto": "kerupuk-kulit-500gram.jpeg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Sudah digoreng renyah, dikemas dalam ukuran 500 gram. Merek 'RR Ratu', bersertifikat Halal dan terdaftar P-IRT 2013210010707-28.",
    "rincian": [
      [
        "Bahan utama",
        "Kulit sapi pilihan"
      ],
      [
        "Merek",
        "RR Ratu"
      ],
      [
        "Sertifikat",
        "Halal Indonesia, P-IRT 2013210010707-28"
      ],
      [
        "Berat",
        "500 gram"
      ]
    ]
  },
  {
    "slug": "kerupuk-kulit-sapi-1-5kg",
    "nama": "Kerupuk Kulit Sapi 1,5 Kilogram",
    "umkm": "kerupuk-kulit-sapi-sadomas",
    "kategori": "kuliner",
    "harga": "Rp170.000",
    "satuan": "per 1,5 kilogram",
    "foto": "kerupuk-kulit-1-5kg.jpeg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Sudah digoreng renyah, dikemas dalam ukuran 1,5 kilogram, cocok untuk stok lebih banyak. Merek 'RR Ratu', bersertifikat Halal dan terdaftar P-IRT 2013210010707-28.",
    "rincian": [
      [
        "Bahan utama",
        "Kulit sapi pilihan"
      ],
      [
        "Merek",
        "RR Ratu"
      ],
      [
        "Sertifikat",
        "Halal Indonesia, P-IRT 2013210010707-28"
      ],
      [
        "Berat",
        "1,5 kilogram"
      ]
    ]
  },
  {
    "slug": "kerupuk-kulit-sapi-goreng",
    "nama": "Kerupuk Kulit Sapi Siap Makan",
    "umkm": "kerupuk-kulit-sapi-sadomas",
    "kategori": "kuliner",
    "harga": "Rp2.000",
    "satuan": "per bungkus kecil",
    "foto": "kerupuk-kulit-1.jpg",
    "penilaian": 0,
    "galeri": [
      "kerupuk-kulit-3.jpg"
    ],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Sudah digoreng renyah dan dikemas rapat, tinggal buka dan santap. Merek 'RR Ratu', bersertifikat Halal dan terdaftar P-IRT 2013210010707-28.",
    "rincian": [
      [
        "Bahan utama",
        "Kulit sapi pilihan"
      ],
      [
        "Merek",
        "RR Ratu"
      ],
      [
        "Sertifikat",
        "Halal Indonesia, P-IRT 2013210010707-28"
      ],
      [
        "Minimal pesan",
        "1 bungkus"
      ]
    ]
  },
  {
    "slug": "sayur-campur-sadomas",
    "nama": "Paket Sayur Campur",
    "umkm": "kebun-sayuran-sadomas",
    "kategori": "pertanian",
    "harga": "GANTI: kisaran harga",
    "satuan": "per kilogram",
    "foto": "sayuran-kebun.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Campuran sayuran segar hasil kebun sendiri, dipanen sesuai pesanan agar tetap segar sampai ke pembeli.",
    "rincian": [
      [
        "Jenis",
        "Kol, sawi, cabai, tomat"
      ],
      [
        "Berat",
        "Per kilogram"
      ],
      [
        "Pesan minimal",
        "GANTI: jumlah minimal"
      ],
      [
        "Catatan",
        "Jenis menyesuaikan hasil panen"
      ]
    ]
  },
  {
    "slug": "cabai-rawit-sadomas",
    "nama": "Cabai Rawit Segar",
    "umkm": "kebun-sayuran-sadomas",
    "kategori": "pertanian",
    "harga": "GANTI: kisaran harga",
    "satuan": "per kilogram",
    "foto": "sayuran-kebun.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Cabai rawit hasil kebun warga, dipetik segar sesuai pesanan.",
    "rincian": [
      [
        "Jenis",
        "Cabai rawit"
      ],
      [
        "Berat",
        "Per kilogram"
      ],
      [
        "Pesan minimal",
        "GANTI: jumlah minimal"
      ],
      [
        "Catatan",
        "Harga mengikuti harga pasar saat panen"
      ]
    ]
  },
  {
    "slug": "molen-bu-yeti",
    "nama": "Molen",
    "umkm": "jajanan-pasar-bu-yeti",
    "kategori": "kuliner",
    "harga": "Rp1.000",
    "satuan": "per buah",
    "foto": "molen-bu-yeti.jpg",
    "penilaian": 0,
    "galeri": [
      "molen.jpg"
    ],
    "ulasan": [],
    "unggulan": true,
    "deskripsi": "Molen pisang digoreng renyah, dijual lepas tanpa kemasan seperti gorengan pada umumnya. Digoreng dini hari, dititipkan ke warung untuk sarapan pagi.",
    "rincian": [
      [
        "Bahan utama",
        "Pisang dan adonan tepung buatan sendiri"
      ],
      [
        "Kemasan",
        "Tanpa kemasan, dijual lepas"
      ],
      [
        "Minimal pesan",
        "GANTI: jumlah minimal"
      ]
    ]
  },
  {
    "slug": "pastel-bu-yeti",
    "nama": "Pastel",
    "umkm": "jajanan-pasar-bu-yeti",
    "kategori": "kuliner",
    "harga": "Rp1.000",
    "satuan": "per buah",
    "foto": "pastel-bu-yeti.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": true,
    "deskripsi": "Pastel isi bihun jagung, digoreng renyah, dijual lepas tanpa kemasan seperti gorengan pada umumnya.",
    "rincian": [
      [
        "Isi",
        "Bihun jagung"
      ],
      [
        "Kemasan",
        "Tanpa kemasan, dijual lepas"
      ],
      [
        "Minimal pesan",
        "GANTI: jumlah minimal"
      ]
    ]
  },
  {
    "slug": "onde-onde-bu-yeti",
    "nama": "Onde-onde",
    "umkm": "jajanan-pasar-bu-yeti",
    "kategori": "kuliner",
    "harga": "Rp1.000",
    "satuan": "per buah",
    "foto": "onde-onde-bu-yeti.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Onde-onde buatan rumahan. Tepung ketan sering sulit didapat, jadi tidak selalu dibuat setiap hari -- tanyakan dulu ketersediaannya lewat WhatsApp.",
    "rincian": [
      [
        "Catatan",
        "Tidak dibuat setiap hari, tergantung ketersediaan tepung ketan"
      ],
      [
        "Kemasan",
        "Tanpa kemasan, dijual lepas"
      ],
      [
        "Minimal pesan",
        "GANTI: jumlah minimal"
      ]
    ]
  },
  {
    "slug": "risol-sayur-bu-yeti",
    "nama": "Risol Sayur",
    "umkm": "jajanan-pasar-bu-yeti",
    "kategori": "kuliner",
    "harga": "Rp1.000",
    "satuan": "per buah",
    "foto": "risol-bu-yeti.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Risol isi sayuran, dibalut tepung roti dan digoreng garing.",
    "rincian": [
      [
        "Isi",
        "Sayuran"
      ],
      [
        "Kemasan",
        "Tanpa kemasan, dijual lepas"
      ],
      [
        "Minimal pesan",
        "GANTI: jumlah minimal"
      ]
    ]
  },
  {
    "slug": "bufet-tv-abu-meubel",
    "nama": "Bufet / Backdrop TV Custom",
    "umkm": "abu-meubel",
    "kategori": "kerajinan",
    "harga": "Nego via WA",
    "satuan": "per unit, tergantung ukuran & bahan",
    "foto": "abu-meubel-1.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Backdrop/bufet TV custom lengkap dengan rak, lampu LED, dan aksen panel sesuai desain dan ukuran ruangan pemesan.",
    "rincian": [
      [
        "Jenis pekerjaan",
        "Pesanan custom, bukan barang jadi"
      ],
      [
        "Bahan",
        "GANTI: jenis kayu/material yang dipakai"
      ],
      [
        "Waktu pengerjaan",
        "GANTI: perkiraan lama pengerjaan"
      ]
    ]
  },
  {
    "slug": "kitchen-set-abu-meubel",
    "nama": "Kitchen Set Custom",
    "umkm": "abu-meubel",
    "kategori": "kerajinan",
    "harga": "Nego via WA",
    "satuan": "per meter lari, tergantung ukuran & bahan",
    "foto": "abu-meubel-2.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Kitchen set custom sesuai denah dapur pemesan, termasuk kabinet atas-bawah dan meja kerja.",
    "rincian": [
      [
        "Jenis pekerjaan",
        "Pesanan custom, bukan barang jadi"
      ],
      [
        "Bahan",
        "GANTI: jenis material yang dipakai"
      ],
      [
        "Waktu pengerjaan",
        "GANTI: perkiraan lama pengerjaan"
      ]
    ]
  },
  {
    "slug": "pintu-kayu-abu-meubel",
    "nama": "Pintu Kayu Jati Custom",
    "umkm": "abu-meubel",
    "kategori": "kerajinan",
    "harga": "Nego via WA",
    "satuan": "per daun pintu",
    "foto": "abu-meubel-4.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Pintu kayu jati solid, dibuat sesuai ukuran dan motif ukiran pesanan.",
    "rincian": [
      [
        "Bahan utama",
        "Kayu jati"
      ],
      [
        "Ukuran",
        "GANTI: menyesuaikan pesanan"
      ],
      [
        "Waktu pengerjaan",
        "GANTI: perkiraan lama pengerjaan"
      ]
    ]
  },
  {
    "slug": "lemari-abu-meubel",
    "nama": "Lemari & Rak Custom",
    "umkm": "abu-meubel",
    "kategori": "kerajinan",
    "harga": "Nego via WA",
    "satuan": "per unit, tergantung ukuran & bahan",
    "foto": "abu-meubel-5.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Lemari dan rak penyimpanan custom, disesuaikan dengan kebutuhan dan ukuran ruangan.",
    "rincian": [
      [
        "Jenis pekerjaan",
        "Pesanan custom, bukan barang jadi"
      ],
      [
        "Bahan",
        "GANTI: jenis material yang dipakai"
      ],
      [
        "Waktu pengerjaan",
        "GANTI: perkiraan lama pengerjaan"
      ]
    ]
  },
  {
    "slug": "meja-kasir-abu-meubel",
    "nama": "Meja & Bangku Kasir Toko",
    "umkm": "abu-meubel",
    "kategori": "kerajinan",
    "harga": "Nego via WA",
    "satuan": "per unit, tergantung ukuran & bahan",
    "foto": "abu-meubel-6.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Meja dan bangku kasir dengan laci penyimpanan, cocok untuk toko atau warung.",
    "rincian": [
      [
        "Jenis pekerjaan",
        "Pesanan custom, bukan barang jadi"
      ],
      [
        "Bahan",
        "GANTI: jenis material yang dipakai"
      ],
      [
        "Waktu pengerjaan",
        "GANTI: perkiraan lama pengerjaan"
      ]
    ]
  },
  {
    "slug": "meja-tv-abu-meubel",
    "nama": "Meja TV Minimalis",
    "umkm": "abu-meubel",
    "kategori": "kerajinan",
    "harga": "Nego via WA",
    "satuan": "per unit",
    "foto": "abu-meubel-7.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Meja/rak TV minimalis dengan rak terbuka, finishing putih duco.",
    "rincian": [
      [
        "Jenis pekerjaan",
        "Bisa custom ukuran"
      ],
      [
        "Bahan",
        "GANTI: jenis material yang dipakai"
      ],
      [
        "Waktu pengerjaan",
        "GANTI: perkiraan lama pengerjaan"
      ]
    ]
  },
  {
    "slug": "bakso-biasa-andin",
    "nama": "Bakso Biasa",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp11.000",
    "satuan": "per mangkuk",
    "foto": "bakso-andin-2.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": true,
    "deskripsi": "Bakso kuah dengan bakso urat dan mi, porsi biasa.",
    "rincian": [
      [
        "Isi",
        "Bakso, mi, tahu"
      ]
    ]
  },
  {
    "slug": "bakso-super-andin",
    "nama": "Bakso Super",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp15.000",
    "satuan": "per mangkuk",
    "foto": "bakso-andin-3.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Bakso kuah porsi super, isi bakso dan daging lebih banyak.",
    "rincian": [
      [
        "Isi",
        "Bakso, potongan daging, mi, tahu"
      ]
    ]
  },
  {
    "slug": "mie-ayam-andin",
    "nama": "Mie Ayam",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp11.000",
    "satuan": "per mangkuk",
    "foto": "bakso-andin-4.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Mie ayam dengan topping ayam cincang dan sayuran, disajikan dengan kuah terpisah.",
    "rincian": [
      [
        "Isi",
        "Mi, ayam cincang, sayuran, kuah kaldu"
      ]
    ]
  },
  {
    "slug": "mie-yamso-biasa-andin",
    "nama": "Mie Yamso Biasa",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp13.000",
    "satuan": "per porsi",
    "foto": "bakso-andin-5.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Mie yamin bakso porsi biasa, disajikan dengan sayuran dan kerupuk.",
    "rincian": [
      [
        "Isi",
        "Mi yamin, bakso, sayuran, kerupuk"
      ]
    ]
  },
  {
    "slug": "mie-yamso-sedang-andin",
    "nama": "Mie Yamso Sedang",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp15.000",
    "satuan": "per porsi",
    "foto": "bakso-andin-5.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Mie yamin bakso porsi sedang.",
    "rincian": [
      [
        "Isi",
        "Mi yamin, bakso, sayuran, kerupuk"
      ]
    ]
  },
  {
    "slug": "mie-yamso-super-andin",
    "nama": "Mie Yamso Super",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp25.000",
    "satuan": "per porsi",
    "foto": "bakso-andin-5.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Mie yamin bakso porsi super, isi paling banyak.",
    "rincian": [
      [
        "Isi",
        "Mi yamin, bakso, sayuran, kerupuk"
      ]
    ]
  },
  {
    "slug": "es-teh-manis-andin",
    "nama": "Es Teh Manis",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp4.000",
    "satuan": "per gelas",
    "foto": "es-teh-andin.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Es teh manis.",
    "rincian": []
  },
  {
    "slug": "teh-botol-andin",
    "nama": "Teh Botol",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp5.000",
    "satuan": "per botol",
    "foto": "es-teh-andin.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Teh botol kemasan.",
    "rincian": []
  },
  {
    "slug": "es-jeruk-andin",
    "nama": "Es Jeruk",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp5.000",
    "satuan": "per gelas",
    "foto": "",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Es jeruk peras.",
    "rincian": []
  },
  {
    "slug": "air-mineral-andin",
    "nama": "Air Mineral",
    "umkm": "mie-ayam-bakso-neng-andin",
    "kategori": "kuliner",
    "harga": "Rp4.000",
    "satuan": "per botol",
    "foto": "air-mineral-andin.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Air mineral kemasan.",
    "rincian": []
  },
  {
    "slug": "es-teh-jumbo-ningrat",
    "nama": "Es Teh Jumbo Original",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp3.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-jumbo.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": true,
    "deskripsi": "Es teh original ukuran jumbo, resep asli Solo.",
    "rincian": [
      [
        "Varian",
        "Original, asli Solo"
      ]
    ]
  },
  {
    "slug": "es-teh-kampul-ningrat",
    "nama": "Es Teh Kampul",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp4.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-kampul.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Es teh dengan campuran jeruk kampul segar.",
    "rincian": [
      [
        "Varian",
        "Rasa jeruk kampul"
      ]
    ]
  },
  {
    "slug": "es-teh-lychee-ningrat",
    "nama": "Es Teh Lychee",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp5.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-lychee.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Es teh dengan potongan buah leci.",
    "rincian": [
      [
        "Varian",
        "Rasa lychee"
      ]
    ]
  },
  {
    "slug": "es-teh-apple-ningrat",
    "nama": "Es Teh Apple",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp5.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-apple.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Es teh dengan potongan buah apel.",
    "rincian": [
      [
        "Varian",
        "Rasa apple"
      ]
    ]
  },
  {
    "slug": "es-teh-strawberry-ningrat",
    "nama": "Es Teh Strawberry",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp5.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-strawberry.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Es teh dengan potongan buah stroberi.",
    "rincian": [
      [
        "Varian",
        "Rasa strawberry"
      ]
    ]
  },
  {
    "slug": "es-teh-anggur-ningrat",
    "nama": "Es Teh Anggur",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp5.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-anggur.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Es teh dengan potongan buah anggur.",
    "rincian": [
      [
        "Varian",
        "Rasa anggur"
      ]
    ]
  },
  {
    "slug": "milkshake-taro-ningrat",
    "nama": "Taro Ube Milkshake",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp9.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-taro.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Milkshake rasa taro/ubi ungu.",
    "rincian": [
      [
        "Varian",
        "Taro ube"
      ]
    ]
  },
  {
    "slug": "milkshake-matcha-ningrat",
    "nama": "Matcha Milkshake",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp9.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-matcha.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Milkshake rasa matcha.",
    "rincian": [
      [
        "Varian",
        "Matcha"
      ]
    ]
  },
  {
    "slug": "milkshake-thaitea-ningrat",
    "nama": "Thai Tea Milkshake",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp9.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-thaitea.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Milkshake rasa thai tea.",
    "rincian": [
      [
        "Varian",
        "Thai tea"
      ]
    ]
  },
  {
    "slug": "milkshake-royalchoco-ningrat",
    "nama": "Royal Chocolate Milkshake",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp9.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-royalchoco.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Milkshake cokelat.",
    "rincian": [
      [
        "Varian",
        "Royal chocolate"
      ]
    ]
  },
  {
    "slug": "milkshake-avocado-ningrat",
    "nama": "Avocado Milkshake",
    "umkm": "es-teh-ningrat",
    "kategori": "kuliner",
    "harga": "Rp9.000",
    "satuan": "per cup",
    "foto": "es-teh-ningrat-avocado.jpg",
    "penilaian": 0,
    "galeri": [],
    "ulasan": [],
    "unggulan": false,
    "deskripsi": "Milkshake alpukat.",
    "rincian": [
      [
        "Varian",
        "Avocado"
      ]
    ]
  }
];

const WISATA = [
  {
    "slug": "wisata-cipendeuy",
    "nama": "Wisata Cipendeuy",
    "jenis": "GANTI: contoh Air Terjun / Bukit / Kolam Pemandian",
    "alamat": "GANTI: blok / RT / RW, Desa Sadomas",
    "jamBuka": "GANTI: contoh Setiap hari, 07.00-17.00 WIB",
    "tiket": "GANTI: contoh Rp5.000 per orang",
    "kontak": "GANTI_NOMOR_WA",
    "foto": "wisata-air-terjun.jpg",
    "fotoLokasi": "",
    "penilaian": 0,
    "keteranganGaleri": "",
    "galeri": [],
    "deskripsi": "GANTI: ceritakan daya tarik Wisata Cipendeuy — pemandangan, aktivitas yang bisa dilakukan pengunjung, dan kondisi jalan menuju lokasi."
  }
];
