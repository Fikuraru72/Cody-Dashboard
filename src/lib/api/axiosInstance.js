import axios from 'axios';

// Membuat instance axios
const api = axios.create({
  baseURL: '/api',  // Menggunakan proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      // Kirim permintaan untuk memperbarui token
      const response = await api.post('/v1/auth/refresh', { refresh_token: refreshToken });
      const newAccessToken = response.data.access_token;
      // Simpan token akses yang baru ke localStorage
      localStorage.setItem('access_token', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error('Gagal mendapatkan refresh token:', error);
      // Jika refresh gagal, Anda dapat mengarahkan pengguna ke halaman login atau menangani kesalahan lain
      return null;
    }
  };
  
  
  // Interceptor untuk menambahkan token ke setiap permintaan
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('Token tidak ditemukan.');
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
  // Interceptor untuk menangani kesalahan 401 dan mencoba refresh token
  api.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Jika error adalah 401 dan belum mencoba refresh token
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        // Coba untuk mendapatkan refresh token dan perbarui permintaan
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          // Jika refresh token berhasil, perbarui header Authorization dengan token baru
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // Ulangi permintaan yang gagal
          return api(originalRequest);
        } else {
          // Jika refresh token gagal, arahkan pengguna ke login atau tangani sesuai kebutuhan
          window.location.href = '/login'; // Contoh arahkan ke halaman login
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api;
