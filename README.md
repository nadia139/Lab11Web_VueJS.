# Nama : Nadia Aulina Safari
# Nim: 312410258



# Praktikum 13
Ketika pengguna belum login dan mencoba mengakses halaman yang membutuhkan autentikasi (seperti halaman Kelola Artikel atau About Me), sistem akan menolak akses.

Hasil yang terjadi:
1. Muncul alert "Akses Ditolak! Anda harus login terlebih dahulu."
2. Pengguna secara otomatis diarahkan (redirect) ke halaman Login
3. Halaman yang diproteksi tidak dapat diakses


<img width="1730" height="896" alt="Screenshot 2026-06-08 223900" src="https://github.com/user-attachments/assets/4c97f84c-9a30-45af-bcc3-65dc4d076600" />






Halaman login yang muncul setelah pengguna klik menu "Login" atau ketika diarahkan dari Navigation Guards karena mencoba mengakses halaman terproteksi.


<img width="1624" height="952" alt="image" src="https://github.com/user-attachments/assets/ec54af90-afa9-41ff-b0be-bbb296ecba05" />




Setelah pengguna memasukkan email dan password yang valid, sistem akan menampilkan alert "Login berhasil!" sebagai konfirmasi bahwa autentikasi sukses.

Proses yang terjadi:
1. Frontend mengirim data login ke backend API
2. Backend memverifikasi kredensial di database
3. Jika valid, backend mengembalikan response `status: 200`
4. Frontend menampilkan alert "Login berhasil!"
5. Data session disimpan ke localStorage
6. Pengguna diarahkan ke halaman Kelola Artikel


<img width="1691" height="817" alt="image" src="https://github.com/user-attachments/assets/c468353f-c343-4e26-b785-f58f565a2201" />






Setelah pengguna berhasil login, menu "Login" secara otomatis berubah menjadi "Logout (admin)" yang menampilkan nama pengguna yang sedang aktif.


<img width="343" height="89" alt="image" src="https://github.com/user-attachments/assets/6015dc97-fbb1-4d9b-b402-8f30c3190ac3" />



# Praktikum 14
Dibuat file app/Filters/ApiAuthFilter.php yang bertugas memeriksa setiap request masuk apakah membawa token valid pada HTTP Header Authorization. Jika tidak ada token atau token kosong, server akan menolak request dengan response error HTTP 401 Unauthorized.
Filter apiauth diterapkan khusus pada route yang melakukan manipulasi data (POST, PUT, DELETE) di app/Config/Routes.php, sehingga hanya request dengan token valid yang bisa mengubah data artikel melalui API.Implementasi Axios Interceptors (Frontend VueJS)
Langkah 2.1 - Menambahkan Interceptor Global di assets/js/app.js
Ditambahkan konfigurasi Axios Interceptors sebelum inisialisasi aplikasi VueJS. Interceptor request berfungsi mengambil token dari localStorage dan menyuntikkannya ke HTTP Header Authorization: Bearer <token> secara otomatis pada setiap request keluar. Interceptor response berfungsi menangkap error 401 secara global dan memaksa pengguna logout jika token tidak valid.



Akses API Tanpa Token (Postman) Request POST ke endpoint /post tanpa menyertakan token di Header menghasilkan response 401 Unauthorized.


<img width="1105" height="705" alt="image" src="https://github.com/user-attachments/assets/8a048869-8a80-4521-8185-bc9b43ecaaaa" />








Manipulasi Data Berhasil
Operasi Edit artikel berhasil dijalankan dengan response "Data berhasil diupdate", membuktikan bahwa token dikirim dengan benar di latar belakang.

<img width="1911" height="1005" alt="image" src="https://github.com/user-attachments/assets/48a6c74f-86a0-4a4d-b1d8-88aca731809e" />



<img width="1079" height="495" alt="image" src="https://github.com/user-attachments/assets/c8206f1c-6ff1-4cec-bab5-4479fd964fae" />









Axios Interceptors Menyuntikkan Token Otomatis
Setelah login dan melakukan manipulasi data artikel melalui browser, tab Network pada DevTools membuktikan bahwa parameter Authorization: Bearer <token> telah berhasil disuntikkan secara otomatis oleh Axios Interceptors ke setiap request.

Authorization: Bearer <img width="711" height="337" alt="Screenshot 2026-06-09 132926" src="https://github.com/user-attachments/assets/8ab39bcc-7144-4104-9184-88809dfa1662" />




Vue Router Navigation Guards bekerja di sisi klien (browser) hanya melindungi navigasi antar halaman agar pengguna yang belum login tidak bisa mengakses halaman tertentu. Perlindungan ini bisa dilewati dengan memanipulasi localStorage atau mengakses URL API langsung melalui tools seperti Postman.
CodeIgniter Filters bekerja di sisi server memeriksa setiap request yang masuk ke server sebelum diproses controller. Perlindungan ini tidak bisa dilewati dari sisi klien karena validasi dilakukan sepenuhnya di backend. Kombinasi keduanya menghasilkan sistem keamanan berlapis yang melindungi aplikasi baik dari sisi tampilan maupun dari sisi data.
