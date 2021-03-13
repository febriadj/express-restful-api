# Express.js Restful API
Membuat arsitektur Restful API dengan request methods get, post, put, patch, delete menggunakan node.js, express.js dan database mysql.

# Routes
Berikut adalah semua rute API yang tersedia. <br>

| Endpoint         | HTTP   | Description                    |
| ---------------- | ------ | ------------------------------ |
| `/employee`      | GET    | Menampilkan Semua Karyawan     |
| `/employee`      | POST   | Menambahkan Karyawan           |
| `/employee/{id}` | PUT    | Mengubah Data Karywan          |
| `/employee/{id}` | PATCH  | Mengubah Beberapa Data Karyawa |
| `/employee/{id}` | DELETE | Menghapus Karyawan             |

- - -

| Endpoint           | HTTP  | Description                  |
| ------------------ | ----- | ---------------------------- |
| `/employee/{name}` | GET   | Menampilkan Details Karyawan |

- - -

| Endpoint                            | HTTP   | Description                                     |
| ----------------------------------- | ------ | ----------------------------------------------- |
| `/employee/position/{job_position}` | GET    | Menampilkan Karyawan Dengan Posisi Yang Terkait |

# Running Program
```
npm start
```
```
npm run start:dev
```