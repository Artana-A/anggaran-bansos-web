# Anggaran & Bansos

### Transparansi Informasi, Akses untuk Semua.

**Anggaran & Bansos** merupakan platform informasi publik berbasis website yang berfokus pada transparansi pengelolaan anggaran dan penyaluran bantuan sosial. Platform ini dirancang untuk membantu masyarakat memperoleh informasi mengenai penggunaan anggaran, realisasi kegiatan, serta status penyaluran bantuan sosial secara lebih mudah dan terstruktur.

---

## Tentang Proyek

Keterbukaan informasi publik merupakan salah satu aspek penting dalam membangun kepercayaan masyarakat terhadap pengelolaan anggaran dan penyaluran bantuan sosial. Namun, informasi tersebut masih dapat sulit ditemukan karena tersebar di berbagai sumber dan belum selalu disajikan dalam format yang mudah dipahami.

Melalui Anggaran & Bansos, informasi publik disajikan dalam satu platform yang terstruktur dan mudah diakses. Dengan demikian, masyarakat dapat memperoleh gambaran mengenai penggunaan anggaran serta informasi penyaluran bantuan sosial secara lebih transparan.

## Tujuan

- Meningkatkan akses masyarakat terhadap informasi anggaran dan realisasinya.
- Memudahkan masyarakat memperoleh informasi mengenai program bantuan sosial.
- Menyajikan data publik secara terstruktur dan informatif.
- Mendukung keterbukaan informasi serta akuntabilitas kepada masyarakat.

## Fitur Utama

| Fitur | Deskripsi |
|---|---|
| **Dashboard Anggaran** | Ringkasan total anggaran dan realisasi untuk memberikan gambaran penggunaan dana. |
| **Realisasi Anggaran** | Informasi kegiatan, alokasi anggaran, realisasi, dan perkembangan pelaksanaan proyek. |
| **Cek Status Bansos** | Informasi program bantuan sosial dan status penyalurannya. |
| **Statistik Penerima** | Visualisasi persebaran penerima bantuan berdasarkan wilayah. |

## Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| **React.js** | Membangun antarmuka pengguna (*frontend*). |
| **Vite** | Mendukung proses pengembangan dan build aplikasi frontend. |
| **Node.js** | Menjalankan lingkungan backend. |
| **Express.js** | Mengelola API dan komunikasi antara frontend dengan database. |
| **Supabase (PostgreSQL)** | Menyimpan dan mengelola data aplikasi. |
| **Git & GitHub** | Mengelola versi dan kolaborasi pengembangan proyek. |

## Gambaran Pengembangan

Platform ini dikembangkan dengan mengintegrasikan frontend, backend, dan database agar informasi dapat ditampilkan secara terstruktur. Data dari database diakses melalui API backend, kemudian ditampilkan pada antarmuka website.

## Installation & Setup

Ikuti langkah-langkah berikut untuk menjalankan project secara lokal.

### 1. Clone Repository

Buka terminal, lalu jalankan perintah berikut:

```bash
git clone https://github.com/Artana-A/anggaran-bansos-web.git
```

Masuk ke direktori project:

```bash
cd anggaran-bansos-web
```

### 2. Install Dependencies

Install seluruh dependencies yang dibutuhkan oleh frontend dan backend.

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Buat file `.env` di dalam folder backend, kemudian isi konfigurasi Supabase sesuai kredensial project masing-masing.

### 4. Run Application

Jalankan backend terlebih dahulu melalui terminal:

```bash
cd backend
npm run dev
```

Selanjutnya, buka terminal baru untuk menjalankan frontend:

```bash
cd anggaran-bansos-web/frontend
npm run dev
```

### 5. Access Application

Buka alamat lokal yang ditampilkan oleh Vite pada terminal, biasanya:

```text
http://localhost:5173
```

Pastikan backend dan frontend berjalan selama aplikasi digunakan.

## Status Proyek

<code>Development</code>

Proyek masih dalam tahap pengembangan dan penyempurnaan fitur. Data yang digunakan saat ini merupakan data simulasi (*dummy data*) untuk kebutuhan pengujian dan demonstrasi sistem.

---

<p align="center">
  <strong>Anggaran & Bansos</strong>
  <br/>
  <em>Open Information. Better Accountability.</em>
</p>
