
import { useEffect, useState } from "react";
import indonesiaMap from "../assets/indonesia-map.svg";

const posisiPulau = [
  { name: "Sumatra", left: "17%", top: "36%" },
  { name: "Kalimantan", left: "43%", top: "49%" },
  { name: "Sulawesi", left: "63%", top: "39%" },
  { name: "Jawa", left: "31%", top: "76%" },
  { name: "Papua", left: "85%", top: "62%" },
];

function StatisticsMap() {
  const [regions, setRegions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/statistik-pulau")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil statistik");
        }
        return response.json();
      })
      .then((result) => {
        setRegions(result);
        setTotal(result.reduce((sum, item) => sum + item.jumlah, 0));
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="statistics-section">
      <div className="statistics-header">
        <div className="statistics-number">
          <span className="number-value">
            {loading ? "..." : total.toLocaleString("id-ID")}
          </span>
          <div className="number-label">
            <strong>Orang</strong>
            <span>Terdata sebagai penerima bansos</span>
          </div>
        </div>

        <p className="statistics-note">
          Data penerima bantuan sosial
          <br />
          <span>
            {loading ? "Memuat data..." : error || "Berdasarkan data KPM"}
          </span>
        </p>
      </div>

      <div className="statistics-map">
        <img
          src={indonesiaMap}
          alt="Peta wilayah Indonesia"
          className="indonesia-map-image"
        />

        {posisiPulau.map((posisi) => {
          const region = regions.find(
            (item) => item.pulau === posisi.name
          );

          return (
            <div
              className="map-marker"
              key={posisi.name}
              style={{ left: posisi.left, top: posisi.top }}
              title={posisi.name}
            >
              <span className="marker-region">{posisi.name}</span>
              <strong>
                {loading ? "..." : region ? region.jumlah.toLocaleString("id-ID") : 0}
              </strong>
            </div>
          );
        })}
      </div>

      <p className="statistics-source">
        Sumber: Database penerima manfaat (KPM)
      </p>
    </section>
  );
}

export default StatisticsMap;
