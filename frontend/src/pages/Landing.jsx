import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatisticsMap from "../components/StatisticsMap";
import IslandInfo from "../components/IslandInfo";

const slides = [
  {
    eyebrow: "TRANSPARANSI UNTUK SEMUA",
    title: "Anggaran Terbuka, Masyarakat Berdaya",
    description:
      "Pantau informasi anggaran dan cari tahu status bantuan sosial dengan lebih mudah dan transparan.",
    background: "hero-slide-one",
  },
  {
    eyebrow: "INFORMASI YANG TERPERCAYA",
    title: "Ketahui Ke Mana Anggaran Dialokasikan",
    description:
      "Akses informasi anggaran dan realisasi proyek desa dalam satu platform yang mudah dipahami.",
    background: "hero-slide-two",
  },
  {
    eyebrow: "BANTUAN SOSIAL LEBIH TRANSPARAN",
    title: "Informasi Bansos dalam Genggaman",
    description:
      "Temukan informasi bantuan sosial dan pahami kriteria penerima dengan lebih mudah.",
    background: "hero-slide-three",
  },
];

function Landing() {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = slides[activeSlide];

  function showPrevious() {
    setActiveSlide(
      (current) => (current - 1 + slides.length) % slides.length
    );
  }

  function showNext() {
    setActiveSlide((current) => (current + 1) % slides.length);
  }

  return (
    <main className="landing-page">
      <section className={`hero-carousel ${currentSlide.background}`}>
        <div className="hero-overlay">
          <div className="hero-content" key={activeSlide}>
            <p className="hero-eyebrow">{currentSlide.eyebrow}</p>

            <h1>{currentSlide.title}</h1>

            <p className="hero-description">
              {currentSlide.description}
            </p>

            <button
              className="hero-signup"
              onClick={() => navigate("/home")}
            >
              Sign Up <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="carousel-controls">
            <button
              className="carousel-arrow"
              onClick={showPrevious}
              aria-label="Slide sebelumnya"
            >
              ←
            </button>

            <div className="carousel-dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.background}
                  className={`carousel-dot ${
                    activeSlide === index ? "selected" : ""
                  }`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Tampilkan slide ${index + 1}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                />
              ))}
            </div>

            <button
              className="carousel-arrow"
              onClick={showNext}
              aria-label="Slide berikutnya"
            >
              →
            </button>
          </div>
        </div>
        <StatisticsMap />
        <IslandInfo />
      </section>
    </main>
  );
}

export default Landing;
