
import { useState } from "react";
import StepperStatus from "../components/StepperStatus";
import SearchBansos from "../components/SearchBansos";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (formData) => {
    setLoading(true);
    setError("");
    setData(null);
    setSearched(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/pengajuan-bansos/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Data penerima tidak ditemukan.");
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const urutan = {
    pengajuan: 1,
    verifikasi: 2,
    persetujuan: 3,
    penyaluran: 4,
  };

  const aktif = urutan[data?.status_tahap] || 1;

  return (
    <main className="cek">
      {!data && (
        <>
          <SearchBansos onSearch={handleSearch} />

          {loading && <p className="search-message">Mencari data...</p>}
          {error && <p className="search-error">{error}</p>}
        </>
      )}

      {data && (
        <>
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

          <button
            className="search-back-button"
            onClick={() => {
              setData(null);
              setError("");
              setSearched(false);
            }}
          >
            Cari Data Lain
          </button>
        </>
      )}
    </main>
  );
}

export default CekBansos;
