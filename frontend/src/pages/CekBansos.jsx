
import { useState } from "react";
import data from '../data/bansos.json'
import StepperStatus from '../components/StepperStatus'
import '../App.css'

function CekBansos() {
  if (!data) {
    return (
      <main className="cek">
        <h1>STATUS BANSOS</h1>
        <p>Belum ada data.</p>
      </main>
    )
  }

  return (
    <main className="cek">
      <h1>STATUS BANSOS</h1>

      <div className="cek-header">
        <div>
          <div className="program">{data.program}</div>
          <div className="nomor">{data.nomor}</div>
        </div>
        <span className="badge-status">{data.status}</span>
      </div>

      <StepperStatus langkah={data.langkah} aktif={data.langkahAktif} />

      <div className="info">
        <div className="baris-info">
          <span>Tanggal Approval</span>
          <span className="nilai kuning">{data.tanggalApproval}</span>
        </div>
        <div className="baris-info">
          <span>Estimasi diterima</span>
          <span className="nilai lime">{data.estimasiDiterima}</span>
        </div>
      </div>

      <p className="deskripsi">{data.deskripsi}</p>

      <h2>Kriteria Penerima {data.program}</h2>
      {data.kriteria.map((teks, i) => (
        <p key={i} className="deskripsi">{teks}</p>
      ))}
    </main>
  )
}

export default CekBansos;
