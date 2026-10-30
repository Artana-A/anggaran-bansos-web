
import indonesiaMap from "../assets/indonesia-map.svg";

const regions = [
  { name: "Sumatra", value: "42.850", left: "17%", top: "36%" },
  { name: "Kalimantan", value: "31.240", left: "43%", top: "49%" },
  { name: "Sulawesi", value: "28.640", left: "63%", top: "39%" },
  { name: "Jawa", value: "52.180", left: "31%", top: "76%" },
  { name: "Papua", value: "19.420", left: "85%", top: "62%" },
];

function StatisticsMap() {
  return (
    <section className="statistics-section">
      <div className="statistics-header">
        <div className="statistics-number">
          <span className="number-value">123.456</span>
          <div className="number-label">
            <strong>Orang</strong>
            <span>Telah menerima bantuan</span>
          </div>
        </div>

        <p className="statistics-note">
          Data penerima bantuan sosial
          <br />
          <span>Angka ilustrasi untuk demonstrasi</span>
        </p>
      </div>

      <div className="statistics-map">
        <img
          src={indonesiaMap}
          alt="Peta wilayah Indonesia"
          className="indonesia-map-image"
        />

        {regions.map((region) => (
          <div
            className="map-marker"
            key={region.name}
            style={{ left: region.left, top: region.top }}
            title={region.name}
          >
            <span className="marker-region">{region.name}</span>
            <strong>{region.value}</strong>
          </div>
        ))}
      </div>

      <p className="statistics-source">
        Data ilustrasi — sesuaikan dengan sumber resmi dan periode data.
      </p>
    </section>
  );
}

export default StatisticsMap;
