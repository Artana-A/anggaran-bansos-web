
import { useEffect, useState } from "react";
import StepperStatus from "../components/StepperStatus";
import "../App.css";

const langkah = [
  { id: "pengajuan", keterangan: "Pengajuan diterima" },
  { id: "verifikasi", keterangan: "Verifikasi data" },
  { id: "persetujuan", keterangan: "Persetujuan" },
  { id: "penyaluran", keterangan: "Dana disalurkan" },
];

function formatTanggal(tanggal) {
  if (!tanggal) return "-";

  return new Date(tanggal + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CekBansos() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/pengajuan-bansos")
      .then((response) => {
        if (!response.ok) throw new Error("Gagal mengambil data");
        return response.json();
      })
      .then((result) => setData(result[0] || null))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <main className="cek">Memuat data...</main>;
  if (error) return <main className="cek">Error: {error}</main>;

  if (!data) {
    return <main className="cek"><h1>STATUS BANSOS</h1><p>Belum ada data.</p></main>;
  }

  const urutan = {
    pengajuan: 1,
    verifikasi: 2,
    persetujuan: 3,
    penyaluran: 4,
  };

  const aktif = urutan[data.status_tahap] || 1;

  return (
    <main className="cek">
      <h1>STATUS BANSOS</h1>

      <div className="cek-header">
        <div>
          <div className="program">{data.program_bansos?.nama}</div>
          <div className="nomor">{data.nomor_pengajuan}</div>
        </div>
        <span className="badge-status">
          {langkah[aktif - 1].keterangan}
        </span>
      </div>

      <StepperStatus langkah={langkah} aktif={aktif} />

      <div className="info">
        <div className="baris-info">
          <span>Tanggal Approval</span>
          <span className="nilai kuning">
            {formatTanggal(data.tanggal_persetujuan)}
          </span>
        </div>
        <div className="baris-info">
          <span>Estimasi diterima</span>
          <span className="nilai lime">
            {formatTanggal(data.estimasi_penerimaan)}
          </span>
        </div>
      </div>

      <h2>Kriteria Penerima {data.program_bansos?.nama}</h2>
      <p className="deskripsi">{data.program_bansos?.kriteria}</p>
    </main>
  );
}

export default CekBansos;
