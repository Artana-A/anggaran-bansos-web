
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const islandGroups = [
  {
    name: "Sumatra",
    number: "01",
    region: "INDONESIA BARAT",
    description:
      "Jelajahi informasi bantuan sosial, program pemerintah, dan transparansi anggaran untuk masyarakat di kawasan Sumatra.",

  },
  {
    name: "Jawa",
    number: "02",
    region: "INDONESIA TENGAH",
    description:
      "Temukan informasi bantuan sosial serta pantau penggunaan dan realisasi anggaran di kawasan Jawa.",

  },
  {
    name: "Kalimantan",
    number: "03",
    region: "INDONESIA TENGAH",
    description:
      "Kenali informasi program bantuan sosial dan anggaran pembangunan untuk wilayah Kalimantan.",

  },
  {
    name: "Sulawesi",
    number: "04",
    region: "INDONESIA TENGAH",
    description:
      "Akses informasi transparansi anggaran dan program bantuan sosial di kawasan Sulawesi.",

  },
  {
    name: "Bali & Nusa Tenggara",
    number: "05",
    region: "INDONESIA SELATAN",
    description:
      "Jelajahi informasi bantuan sosial dan realisasi anggaran untuk Bali dan Nusa Tenggara.",

  },
  {
    name: "Maluku & Papua",
    number: "06",
    region: "INDONESIA TIMUR",
    description:
      "Temukan informasi program bantuan sosial dan transparansi anggaran di kawasan timur Indonesia.",

  },
];

function IslandInfo() {
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  function scrollCarousel(direction) {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
      left: direction * carouselRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  return (
    <section className="island-section">
      
<div className="island-heading">
  <div>
    <p className="island-eyebrow">JELAJAHI INDONESIA</p>
    <h2>Informasi Berdasarkan Wilayah</h2>
    <p className="island-subtitle">
      Kenali informasi bantuan sosial dan anggaran
      berdasarkan kawasan kepulauan Indonesia.
    </p>
  </div>
</div>

<div className="island-carousel-wrapper">
  <button
    className="island-side-arrow island-arrow-left"
    onClick={() => scrollCarousel(-1)}
    aria-label="Wilayah sebelumnya"
  >
    ←
  </button>

  <div className="island-carousel" ref={carouselRef}>
    {islandGroups.map((island) => (
      <article className="island-card" key={island.name}>
        <div className="island-card-number">{island.number}</div>

        <div className="island-card-content">
          <p className="island-region">{island.region}</p>
          <h3>{island.name}</h3>
          <p className="island-description">{island.description}</p>

          <button
            className="island-link"
            onClick={() => navigate("/cek-bansos")}
          >
            Cek bantuan sosial <span>→</span>
          </button>
        </div>
      </article>
    ))}
  </div>

  <button
    className="island-side-arrow island-arrow-right"
    onClick={() => scrollCarousel(1)}
    aria-label="Wilayah berikutnya"
  >
    →
  </button>
</div>


<div className="island-bottom-action">
  <button
    className="island-bottom-button"
    onClick={() => navigate("/cek-bansos")}
  >
    Cek Bantuan Sosial
    <span aria-hidden="true">→</span>
  </button>
</div>


    </section>
  );
}

export default IslandInfo;
