import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/Landing";
import Home from "./pages/Home";
import CekBansos from "./pages/CekBansos";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />

        <div className="page-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cek-bansos" element={<CekBansos />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;