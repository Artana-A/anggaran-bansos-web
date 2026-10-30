
import { useEffect, useState } from "react";
import "../App.css";

function CekBansos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/penyaluran")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <main className="cek">Memuat data...</main>;
  }

  if (error) {
    return <main className="cek">Error: {error}</main>;
  }

  return (
    <main className="cek">
      <h1>STATUS BANSOS</h1>

      {data.length === 0 ? (
        <p>Belum ada data.</p>
      ) : (
        data.map((item) => (
          <div className="cek-header" key={item.id}>
            <div>
              <div className="program">
                {item.program_bansos?.nama}
              </div>
              <div className="nomor">
                {item.program_bansos?.kode}
              </div>
              <div className="nomor">
                Nominal: Rp{item.nominal.toLocaleString("id-ID")}
              </div>
            </div>

            <span className="badge-status">{item.status}</span>
          </div>
        ))
      )}
    </main>
  );
}

export default CekBansos;
