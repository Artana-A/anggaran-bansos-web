
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const supabase = require("./supabase");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint utama
app.get("/", (req, res) => {
  res.json({
    message: "API Anggaran dan Bansos berhasil berjalan!"
  });
});

// Endpoint tes koneksi Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("test_koneksi")
      .select("*");

    if (error) throw error;

    res.json({
      message: "Koneksi Supabase berhasil!",
      data
    });
  } catch (error) {
    res.status(500).json({
      message: "Koneksi Supabase gagal",
      error: error.message
    });
  }
});

// Endpoint penyaluran bansos
app.get("/api/penyaluran", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("penyaluran")
      .select(`
        id,
        tahun,
        nominal,
        tanggal_disalurkan,
        saluran,
        status,
        program_bansos (
          kode,
          nama
        )
      `);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data penyaluran",
      error: error.message
    });
  }
});

// Endpoint progress pengajuan bansos
app.get("/api/pengajuan-bansos", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("pengajuan_bansos")
      .select(`
        id,
        nomor_pengajuan,
        tahun,
        status_tahap,
        tanggal_pengajuan,
        tanggal_verifikasi,
        tanggal_persetujuan,
        estimasi_penerimaan,
        tanggal_penyaluran,
        kpm (
          kode_kpm,
          inisial_kepala
        ),
        program_bansos (
          kode,
          nama,
          kriteria
        )
      `);

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data progress pengajuan",
      error: error.message
    });
  }
});

// Endpoint anggaran
app.get("/api/anggaran", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("kegiatan")
      .select(`
        id,
        tahun,
        nama,
        anggaran,
        realisasi,
        status,
        progres_persen,
        lokasi,
        bidang (
          nama
        )
      `);

    if (error) throw error;

    const totalAnggaran = data.reduce(
      (total, item) => total + Number(item.anggaran || 0),
      0
    );

    const totalRealisasi = data.reduce(
      (total, item) => total + Number(item.realisasi || 0),
      0
    );

    const proyek = data.map((item) => ({
      id: item.id,
      nama: item.nama,
      bidang: item.bidang?.nama || "-",
      anggaran: Number(item.anggaran || 0),
      realisasi: Number(item.realisasi || 0),
      status: item.status,
      progres: item.progres_persen,
      lokasi: item.lokasi
    }));

    res.json({
      totalAnggaran,
      totalRealisasi,
      proyek
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data anggaran",
      error: error.message
    });
  }
});


// Endpoint statistik penerima berdasarkan pulau
app.get("/api/statistik-pulau", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("kpm")
      .select("pulau");

    if (error) throw error;

    const statistik = {};

    data.forEach((item) => {
      if (item.pulau) {
        statistik[item.pulau] = (statistik[item.pulau] || 0) + 1;
      }
    });

    const hasil = Object.entries(statistik).map(([pulau, jumlah]) => ({
      pulau,
      jumlah
    }));

    res.json(hasil);

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil statistik pulau",
      error: error.message
    });
  }
});


// Menjalankan server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
