
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate("/")}>
            <img
            src={logo}
            alt="Logo Bansoskita"
            className="navbar-logo"
            />
            <div className="navbar-brand-text">
                <span>BANSOSKITA</span>
                <span>TRANSPARANSI ANGGARAN NASIONAL</span>
            </div>
        </div>


      <div className="navbar-menu">
        <button
          className="nav-link active"
          onClick={() => navigate("/home")}
        >
          Home
        </button>

        <button
          className="nav-link"
          onClick={() => navigate("/cek-bansos")}
        >
          <span className="search-icon" aria-hidden="true" />
          Search
        </button>

        <button
          className="nav-link"
          onClick={() => {
            document
              .getElementById("about-us")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          About us
        </button>

        <button
          className="call-button"
          onClick={() => {
            window.location.href = "mailto:info@bansoskita.id";
          }}
        >
          Call Us
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
