function DonutPersen({ persen }) {
  return (
    <div className="donut" style={{ '--persen': persen }}>
      <div className="donut-isi">{persen}%</div>
    </div>
  )
}

export default DonutPersen