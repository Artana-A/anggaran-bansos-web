function StepperStatus({ langkah, aktif }) {
  return (
    <div className="stepper">
      {langkah.map((item, i) => {
        const no = i + 1
        const kelas = no < aktif ? 'selesai' : no === aktif ? 'aktif' : 'belum'

        return (
          <div key={no} className={`step ${kelas}`}>
            <div className="ikon-kotak" />
            <div className="bulat-wrap">
              <span className="bulat">{no}</span>
            </div>
            <p>{item.keterangan}</p>
          </div>
        )
      })}
    </div>
  )
}

export default StepperStatus