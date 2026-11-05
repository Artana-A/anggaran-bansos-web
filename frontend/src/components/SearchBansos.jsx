import { useState } from "react";

function SearchBansos({ onSearch, dusunOptions = ["Dusun 1", "Dusun 2", "Dusun 3"] }) {
  const [formData, setFormData] = useState({
    nomorKK: "",
    inisialKepala: "",
    dusun: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "nomorKK" ? value.replace(/\D/g, "").slice(0, 16) : value,
    }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.nomorKK.length !== 16) {
      setError("Nomor KK harus terdiri dari 16 digit.");
      return;
    }

    if (!formData.inisialKepala.trim() || !formData.dusun) {
      setError("Lengkapi semua data terlebih dahulu.");
      return;
    }

    // Data dikirim ke parent untuk diteruskan ke backend.
    // Hash nomor KK dan pencocokan database dilakukan di backend.
    if (onSearch) {
        onSearch({
            nomorKK: formData.nomorKK,
            inisialKepala: formData.inisialKepala.trim().toUpperCase(),
            dusun: formData.dusun,
        });
    }
  };

  return (
    <section className="search-bansos">
      <div className="search-bansos-heading">
        <h2>Cek Status Bantuan Sosial</h2>
        <p>
          Masukkan data keluarga untuk mengetahui informasi status penerimaan
          dan penyaluran bantuan sosial.
        </p>
      </div>

      <form className="search-bansos-form" onSubmit={handleSubmit}>
        <h3>Data Penerima</h3>
        <p className="search-bansos-description">
          Pastikan data yang dimasukkan sesuai dengan Kartu Keluarga.
        </p>

        <div className="search-bansos-field">
          <label htmlFor="nomorKK">Nomor Kartu Keluarga (KK)</label>
          <input
            id="nomorKK"
            name="nomorKK"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Masukkan 16 digit nomor KK"
            value={formData.nomorKK}
            onChange={handleChange}
            maxLength={16}
            required
          />
          <small>Nomor KK terdiri dari 16 digit angka.</small>
        </div>

        <div className="search-bansos-field">
          <label htmlFor="inisialKepala">Inisial Kepala Keluarga</label>
          <input
            id="inisialKepala"
            name="inisialKepala"
            type="text"
            placeholder="Contoh: A.P."
            value={formData.inisialKepala}
            onChange={handleChange}
            maxLength={20}
            required
          />
        </div>

        <div className="search-bansos-field">
          <label htmlFor="dusun">Dusun</label>
          <select
            id="dusun"
            name="dusun"
            value={formData.dusun}
            onChange={handleChange}
            required
          >
            <option value="">Pilih dusun</option>
            {dusunOptions.map((dusun) => (
              <option key={dusun} value={dusun}>
                {dusun}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="search-bansos-error">{error}</p>}

        <button className="search-bansos-submit" type="submit">
          Cari Status Bansos
        </button>
      </form>

      <div className="search-bansos-security">
        <span className="search-bansos-security-icon" aria-hidden="true">✓</span>
        <div>
          <strong>Keamanan Data</strong>
          <p>
            Data digunakan hanya untuk pencarian status bantuan sosial.
            Nomor KK perlu diproses menggunakan hashing di backend.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SearchBansos;
