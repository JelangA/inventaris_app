const dataInfentarisBarang = [
	{
		id: 1,
		no_inventaris: "001",
		jenis_sarana: "Alat",
		nama_barang: "Meja",
		spesiifikasi: "10x10x10 cm",
		jumlah_tipe: "Unit",
		jml_layak_pakai: "10",
		jml_tidak_layak_pakai: "3",
		sumber: "block-grant",
		pengadaan: "2021",
	},
	{
		id: 2,
		no_inventaris: "002",
		jenis_sarana: "Alat",
		nama_barang: "Kursi",
		spesiifikasi: "10x10x10 cm",
		jumlah_tipe: "Unit",
		jml_layak_pakai: "10",
		jml_tidak_layak_pakai: "3",
		sumber: "sekolah",
		pengadaan: "2021",
	},
	{
		id: 3,
		no_inventaris: "003",
		jenis_sarana: "Alat",
		nama_barang: "Lemari",
		spesiifikasi: "10x10x10 cm",
		jumlah_tipe: "Unit",
		jml_layak_pakai: "10",
		jml_tidak_layak_pakai: "3",
		sumber: "block-grant",
		pengadaan: "2021",
	},
	{
		id: 4,
		no_inventaris: "004",
		jenis_sarana: "Alat",
		nama_barang: "Papan Tulis",
		spesiifikasi: "10x10x10 cm",
		jumlah_tipe: "Unit",
		jml_layak_pakai: "10",
		jml_tidak_layak_pakai: "3",
		sumber: "sekolah",
		pengadaan: "2021",
	},
	{
		id: 5,
		no_inventaris: "005",
		jenis_sarana: "Alat",
		nama_barang: "Proyektor",
		spesiifikasi: "10x10x10 cm",
		jumlah_tipe: "Unit",
		jml_layak_pakai: "10",
		jml_tidak_layak_pakai: "3",
		sumber: "sekolah",
		pengadaan: "2021",
	},
];

const dataBarang = [
	{
		id: 1,
		jenis_sarana: "Elektronik",
		jml_layak_pakai: 8,
		jml_tidak_layak_pakai: 2,
		satuan: "Qty",
		lokasi: 1,
		nama_barang: "Laptop",
		no_inventaris: 1,
		pengadaan: 2023,
		spesifikasi: "Intel i5, RAM 8GB, SSD 256GB",
		sumber: "Pengadaan Pemerintah",
	},
	{
		id: 2,
		jenis_sarana: "Perabotan",
		jml_layak_pakai: 15,
		jml_tidak_layak_pakai: 0,
		satuan: "Qty",
		lokasi: 2,
		nama_barang: "Meja Kerja",
		no_inventaris: 2,
		pengadaan: 2021,
		spesifikasi: "Kayu Jati, Ukuran 120x60 cm",
		sumber: "Pengadaan Sekolah",
	},
	{
		id: 3,
		jenis_sarana: "Elektronik",
		jml_layak_pakai: 5,
		jml_tidak_layak_pakai: 0,
		satuan: "Qty",
		lokasi: 3,
		nama_barang: "Proyektor",
		no_inventaris: 3,
		pengadaan: 2022,
		spesifikasi: "Resolusi Full HD, 3000 lumens",
		sumber: "Hibah",
	},
	{
		id: 4,
		jenis_sarana: "Kendaraan",
		jml_layak_pakai: 5,
		jml_tidak_layak_pakai: 2,
		satuan: "Qty",
		lokasi: 4,
		nama_barang: "Sepeda Motor",
		no_inventaris: 4,
		pengadaan: 2020,
		spesifikasi: "Mesin 150cc, Bensin",
		sumber: "Pengadaan Swasta",
	},
];

const dataRuangan = [
	{
		id: 1,
		nama_ruangan: "Ruang 1",
		luas_ruangan: "10x10x10 cm",
		foto_ruangan: "ruang1.jpg",
		inventaris_sapras: "test",
	},
	{
		id: 2,
		nama_ruangan: "Ruang 2",
		luas_ruangan: "10x10x10 cm",
		foto_ruangan: "ruang2.jpg",
		inventaris_sapras: "test",
	},
	{
		id: 3,
		nama_ruangan: "Ruang 3",
		luas_ruangan: "10x10x10 cm",
		foto_ruangan: "ruang3.jpg",
		inventaris_sapras: "test",
	},
	{
		id: 4,
		nama_ruangan: "Ruang 4",
		luas_ruangan: "10x10x10 cm",
		foto_ruangan: "ruang4.jpg",
		inventaris_sapras: "test",
	},
];

const dataLemari = [
	{
		id: 1,
		no_lemari: 1,
		id_jurusan: 0,
	},
	{
		id: 2,
		no_lemari: 2,
		id_jurusan: 0,
	},
	{
		id: 3,
		no_lemari: 3,
		id_jurusan: 0,
	},
	{
		id: 4,
		no_lemari: 4,
		id_jurusan: 0,
	},
	{
		id: 5,
		no_lemari: 1,
		id_jurusan: 1,
	},
	{
		id: 6,
		no_lemari: 1,
		id_jurusan: 1,
	},
	{
		id: 7,
		no_lemari: 3,
		id_jurusan: 1,
	},
	{
		id: 8,
		no_lemari: 4,
		id_jurusan: 1,
	},
	{
		id: 9,
		no_lemari: 1,
		id_jurusan: 2,
	},
	{
		id: 10,
		no_lemari: 2,
		id_jurusan: 2,
	},
	{
		id: 11,
		no_lemari: 3,
		id_jurusan: 2,
	},
	{
		id: 12,
		no_lemari: 4,
		id_jurusan: 2,
	}
]

const log_pengadaan = [
	{
		id: 1,
		no_inventaris: "001",
		jumlah_stok: "13",
		jumlah_masuk: "5",
	},
	{
		id: 2,
		no_inventaris: "002",
		jumlah_stok: "13",
		jumlah_masuk: "5",
	},
	{
		id: 3,
		no_inventaris: "003",
		jumlah_stok: "13",
		jumlah_masuk: "5",
	},
	{
		id: 4,
		no_inventaris: "004",
		jumlah_stok: "13",
		jumlah_masuk: "5",
	},
	{
		id: 5,
		no_inventaris: "005",
		jumlah_stok: "13",
		jumlah_masuk: "5",
	},
];

const ruanganData = [
	{
		id: "1",
		name: "Ruang 101",
		luas: "50m²",
		foto: "foto-ruang-101.jpg",
	},
	{
		id: "2",
		name: "Ruang 102",
		luas: "60m²",
		foto: "foto-ruang-102.jpg",
	},
	{
		id: "3",
		name: "Ruang 103",
		luas: "70m²",
		foto: "foto-ruang-103.jpg",
	},
	{
		id: "4",
		name: "Ruang 104",
		luas: "80m²",
		foto: "foto-ruang-104.jpg",
	},
	{
		id: "5",
		name: "Ruang 105",
		luas: "90m²",
		foto: "foto-ruang-105.jpg",
	},
];

export {dataBarang, dataLemari};