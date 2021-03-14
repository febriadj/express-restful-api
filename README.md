# Express.js Restful API
Membuat arsitektur Restful API dengan request methods get, post, put, patch, delete menggunakan node.js, express.js dan database mysql.

# Routes
Berikut adalah semua rute API yang tersedia. <br><br>

| Endpoint       | HTTP   | Description                    |
| -------------- | ------ | ------------------------------ |
| /employee      | GET    | Menampilkan Semua Karyawan     |
| /employee      | POST   | Menambahkan Karyawan           |

<br>

| Endpoint        | HTTP   | Description                     |
| --------------- | ------ | ------------------------------- |
| /employee/{nik} | GET    | Menampilkan Details Karyawan    |
| /employee/{nik} | PUT    | Mengubah Data Karywan           |
| /employee/{nik} | PATCH  | Mengubah Beberapa Data Karyawan |
| /employee/{nik} | DELETE | Menghapus Karyawan              |

<br>

| Endpoint                          | HTTP   | Description                                     |
| --------------------------------- | ------ | ----------------------------------------------- |
| /employee/position/{job_position} | GET    | Menampilkan Karyawan Dengan Posisi Yang Terkait |

# Running Program
```
npm start
```
```
npm run start:dev
```