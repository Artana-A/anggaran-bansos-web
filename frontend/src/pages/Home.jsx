import DonutPersen from '../components/DonutPersen'
import TabelProyek from '../components/TabelProyek'
import data from '../data/anggaran.json'
import '../App.css'

const rupiah = (angka) => 'Rp ' + angka.toLocaleString('id-ID')

function Home() {
  const persen = Math.round((data.totalRealisasi / data.totalAnggaran) * 100)

  return (
    <main className="home">
      <DonutPersen persen={persen} />

      <div className="baris-total">
        <span>Total Anggaran (APBDes)</span>
        <span className="badge merah">{rupiah(data.totalAnggaran)}</span>
      </div>
      <div className="baris-total">
        <span>Total Realisasi</span>
        <span className="badge kuning">{rupiah(data.totalRealisasi)}</span>
      </div>

      <h2 className="judul-proyek">Proyek Bantuan Sosial Utama</h2>
      <h3>Daftar Proyek Sederhana</h3>

      <TabelProyek data={data.proyek} />
    </main>
  )
}

export default Home;
