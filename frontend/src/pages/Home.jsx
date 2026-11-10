
import { useEffect, useState } from 'react'
import DonutPersen from '../components/DonutPersen'
import TabelProyek from '../components/TabelProyek'
import '../App.css'

const rupiah = (angka) => 'Rp ' + Number(angka).toLocaleString('id-ID')

function Home() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/anggaran')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data anggaran')
        }
        return response.json()
      })
      .then((result) => setData(result))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <main className="home">Memuat data...</main>
  if (error) return <main className="home">Error: {error}</main>

  const persen = data.totalAnggaran > 0
    ? Math.round((data.totalRealisasi / data.totalAnggaran) * 100)
    : 0

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

export default Home
