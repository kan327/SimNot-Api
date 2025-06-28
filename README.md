# 📝 SimNot API

SimNot adalah RESTful API sederhana untuk manajemen **pengguna** dan **catatan pribadi** menggunakan **Express** dan **MySQL**.

## 🚀 Fitur Utama

* Autentikasi dan manajemen pengguna
* CRUD (Create, Read, Update, Delete) catatan
* Respons JSON standar
* Dukungan query filter untuk `email`, `user_id`, dan `title`

---

## 📦 Instalasi

```bash
git clone https://github.com/kan327/SimNot-Api.git
cd SimNot-Api
npm install
```

### 🔐 Konfigurasi `.env`

Buat file `.env` dan sesuaikan:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=simnot_db
DB_PORT=3306
```

---

## ▶️ Menjalankan Aplikasi

```bash
node index.js
```

---

## 📚 Endpoint API

### 🔸 Root

```
GET /
```

Respons metadata aplikasi:

```json
{
  "status": true,
  "message": "🚀 Welcome to My SimNot API!",
  "data": {
    "appName": "📝 SimNot",
    "version": "1.0.0",
    ...
  }
}
```

---

## 👤 Endpoint Users

### 🔹 GET `/api/users`

Ambil seluruh pengguna atau filter berdasarkan `email`:

```bash
GET /api/users?email=someone@example.com
```

### 🔹 GET `/api/users/:id`

Ambil data pengguna berdasarkan `user_id`.

### 🔹 POST `/api/users`

Membuat pengguna baru.

```json
{
  "email": "email@example.com",
  "password": "yourpassword",
  "user_name": "User Name"
}
```

### 🔹 PUT `/api/users/:id`

Perbarui data pengguna.

```json
{
  "email": "new@example.com",
  "password": "newpass",
  "user_name": "Updated Name"
}
```

---

## 🗒️ Endpoint Catatan

### 🔹 GET `/api/catatan`

Ambil semua catatan, bisa difilter dengan:

* `user_id`
* `title`

Contoh:

```bash
GET /api/catatan?user_id=1&title=meeting
```

### 🔹 GET `/api/catatan/:id`

Ambil detail catatan berdasarkan `catatan_id`.

### 🔹 POST `/api/catatan`

Buat catatan baru.

```json
{
  "judul": "Judul Catatan",
  "isi": "Isi catatan di sini...",
  "user_id": 1
}
```

### 🔹 PUT `/api/catatan/:id`

Perbarui catatan.

```json
{
  "judul": "Judul Baru",
  "isi": "Isi yang diperbarui"
}
```

### 🔹 DELETE `/api/catatan/:id`

Hapus catatan berdasarkan ID.

---

## 🔁 Format Respons Standar

```json
{
  "status": true,
  "message": "Pesan status",
  "data": { },
  "errorData": { }
}
```

---

## 🧑‍💻 Pengembang

* **Nama**: Kan327
* **GitHub**: [kan327](https://github.com/kan327)
* **Website**: [kan327.github.io](https://kan327.github.io)

---

## 📄 Lisensi

MIT License