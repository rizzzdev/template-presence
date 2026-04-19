# Presence

Sistem pencatatan presensi dan pelanggaran siswa berbasis web. Dirancang untuk mempermudah proses monitoring kehadiran dan kedisiplinan di lingkungan sekolah secara real-time.

---

## Fitur Utama

- **Presensi Otomatis** — input NIS siswa via scan barcode atau ketik manual, deteksi otomatis status terlambat jika melewati batas jam 07:30 WIB
- **Presensi Manual** — pencatatan kehadiran Sakit dan Ijin per kelas oleh guru piket
- **Rekap Presensi Harian** — ringkasan kehadiran seluruh kelas per hari, dapat diekspor
- **Catat Pelanggaran** — pencatatan pelanggaran siswa berdasarkan kode jenis pelanggaran dan poin
- **Rekap Pelanggaran Harian** — riwayat pelanggaran per siswa, kelas, dan jenis pelanggaran
- **Jadwal Piket Guru** — manajemen jadwal guru piket harian dan mingguan
- **Manajemen Data Guru** — CRUD data guru beserta akun login
- **Manajemen Data Murid** — CRUD data siswa beserta status dan poin pelanggaran
- **Manajemen Session** — pantau dan revoke sesi login aktif secara real-time
- **About Developer** — halaman profil tim pengembang

---

## Tech Stack

### Frontend
| Teknologi | Keterangan |
|-----------|------------|
| [Next.js](https://nextjs.org) | Framework React untuk UI, routing, dan SSR |
| [Jotai](https://jotai.org) | Global state management yang ringan dan atomic |

### Backend
| Teknologi | Keterangan |
|-----------|------------|
| [Express.js](https://expressjs.com) | Framework Node.js untuk REST API |
| [PostgreSQL](https://www.postgresql.org) | Database relasional utama |
| [Neon](https://neon.tech) | Layanan PostgreSQL serverless berbasis cloud |

---

## Struktur Database

```
classes          — data kelas
students         — data siswa (NIS, nama, status, kelas)
teachers         — data guru (nama, gelar, hari piket)
auths            — akun login (email, password, role)
sessions         — sesi login aktif (token, IP, user agent)
attendances      — data presensi harian per siswa
attendance_daily_recaps — rekap presensi harian per kelas
violation_types  — master jenis pelanggaran (kode, deskripsi, poin)
violations       — data pelanggaran per siswa
violation_daily_recaps  — rekap pelanggaran harian per kelas
```

---

## Struktur Project

```
presence/
├── frontend/                  # Next.js app
│   ├── app/                   # App Router (Next.js 14+)
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── dashboard/
│   │   ├── presensi/
│   │   │   ├── otomatis/
│   │   │   └── manual/
│   │   ├── rekap-presensi/
│   │   ├── pelanggaran/
│   │   │   ├── catat/
│   │   │   └── rekap/
│   │   ├── jadwal-piket/
│   │   ├── admin/
│   │   │   ├── guru/
│   │   │   ├── murid/
│   │   │   └── session/
│   │   └── about/
│   ├── components/            # Komponen UI yang dapat digunakan ulang
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   └── BottomNav.tsx
│   │   ├── ui/
│   │   └── charts/
│   ├── store/                 # Jotai atoms (global state)
│   │   ├── authAtom.ts
│   │   ├── sessionAtom.ts
│   │   └── uiAtom.ts
│   ├── lib/                   # Utilitas & API client
│   │   ├── api.ts
│   │   └── utils.ts
│   └── public/
│
├── backend/                   # Express.js app
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── attendance.ts
│   │   │   ├── violation.ts
│   │   │   ├── teacher.ts
│   │   │   ├── student.ts
│   │   │   └── session.ts
│   │   ├── controllers/
│   │   ├── middleware/
│   │   │   ├── auth.ts        # JWT verification
│   │   │   └── role.ts        # Role-based access (admin/user)
│   │   ├── db/
│   │   │   └── index.ts       # Koneksi Neon PostgreSQL
│   │   └── index.ts           # Entry point
│   └── prisma/
│       └── schema.prisma      # Prisma schema
│
└── README.md
```

---

## Cara Menjalankan

### Prasyarat

- Node.js >= 18
- npm atau yarn
- Akun [Neon](https://neon.tech) (untuk database PostgreSQL)

### 1. Clone repository

```bash
git clone https://github.com/username/presence.git
cd presence
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env`:

```env
DATABASE_URL=postgresql://user:password@host/presence?sslmode=require
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Jalankan migrasi database:

```bash
npx prisma migrate dev
npx prisma generate
```

Jalankan server:

```bash
npm run dev
```

Backend berjalan di `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Buat file `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Jalankan aplikasi:

```bash
npm run dev
```

Frontend berjalan di `http://localhost:3000`

---

## Autentikasi & Otorisasi

Sistem menggunakan **JWT (JSON Web Token)** untuk autentikasi. Terdapat dua role:

| Role | Akses |
|------|-------|
| `ADMIN` | Seluruh fitur termasuk manajemen guru, murid, dan session |
| `USER` | Presensi, rekap, pelanggaran, jadwal piket |

Token disimpan di Jotai atom dan di-persist ke `localStorage` pada sisi frontend.

---

## API Endpoints

### Auth
```
POST   /api/auth/login          Login dan mendapatkan token
POST   /api/auth/logout         Logout dan hapus session
GET    /api/auth/me             Data user yang sedang login
```

### Presensi
```
POST   /api/attendance          Catat presensi (otomatis)
PUT    /api/attendance          Update presensi (manual: sakit/ijin)
GET    /api/attendance/recap    Rekap presensi harian
```

### Pelanggaran
```
GET    /api/violations          Daftar pelanggaran
POST   /api/violations          Catat pelanggaran baru
GET    /api/violations/recap    Rekap pelanggaran harian
GET    /api/violation-types     Daftar jenis pelanggaran
```

### Manajemen (Admin only)
```
GET    /api/teachers            Daftar guru
POST   /api/teachers            Tambah guru
PUT    /api/teachers/:id        Update data guru
DELETE /api/teachers/:id        Hapus guru

GET    /api/students            Daftar murid
POST   /api/students            Tambah murid
PUT    /api/students/:id        Update data murid
DELETE /api/students/:id        Hapus murid

GET    /api/sessions            Daftar session aktif
DELETE /api/sessions/:id        Revoke session tertentu
DELETE /api/sessions            Revoke semua session
```

---

## Tim Pengembang

| Nama | Role |
|------|------|
| Nama Pengembang 1 | Project Lead & Backend Developer |
| Nama Pengembang 2 | Frontend Developer |
| Nama Pengembang 3 | UI/UX Designer |
| Nama Pengembang 4 | Database Administrator |

---

## Lisensi

Project ini dibuat untuk keperluan akademik di **SMA Negeri 1 Semarang** — Tahun Ajaran 2025/2026.
