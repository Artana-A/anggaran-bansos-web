import { useState } from 'react'

const rupiah = (angka) => 'Rp ' + angka.toLocaleString('id-ID')
const PER_HALAMAN = 5

function TabelProyek({ data }) {
  const [halaman, setHalaman] = useState(1)
  const totalHalaman = Math.ceil(data.length / PER_HALAMAN)
  const mulai = (halaman - 1) * PER_HALAMAN
  const tampil = data.slice(mulai, mulai + PER_HALAMAN)

  return (
    <div>
      <table className="tabel">
        <thead>
          <tr>
            <th>Proyek</th>
            <th>Bidang</th>
            <th>Anggaran</th>
            <th>Realisasi</th>
          </tr>
        </thead>
        <tbody>
          {tampil.map((p) => (
            <tr key={p.id}>
              <td>{p.nama}</td>
              <td>{p.bidang}</td>
              <td>{rupiah(p.anggaran)}</td>
              <td>{rupiah(p.realisasi)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalHalaman }, (_, i) => (
          <button
            key={i}
            className={halaman === i + 1 ? 'aktif' : ''}
            onClick={() => setHalaman(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setHalaman(halaman + 1)}
          disabled={halaman === totalHalaman}
        >
          NEXT
        </button>
      </div>
    </div>
  )
}

export default TabelProyek