
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

  const handleSearch = async (formData) => {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/search-bansos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Data penerima tidak ditemukan.");
      }

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

          {data.pengajuan.map((item) => {
            const aktif = urutan[item.status_tahap] || 1;

            return (
              <section key={item.id} className="status-bansos">
                <div className="cek-header">
                  <div>
                    <div className="program">
                      {item.program_bansos?.nama}
                    </div>
                    <div className="nomor">
                      {item.nomor_pengajuan}
                    </div>
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
                      {formatTanggal(item.tanggal_persetujuan)}
                    </span>
                  </div>

                  <div className="baris-info">
                    <span>Estimasi diterima</span>
                    <span className="nilai lime">
                      {formatTanggal(item.estimasi_penerimaan)}
                    </span>
                  </div>
                </div>

                <h2>
                  Kriteria Penerima {item.program_bansos?.nama}
                </h2>

                <p className="deskripsi">
                  {item.program_bansos?.kriteria}
                </p>
              </section>
            );
          })}

          <button
            className="search-back-button"
            onClick={() => {
              setData(null);
              setError("");
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
