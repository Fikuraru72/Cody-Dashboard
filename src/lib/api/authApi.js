import api from './axiosInstance';


export const login = async (credentials) => {
  try {
    console.log('Requesting to:', api.defaults.baseURL);
    const response = await api.post('/v1/user/auth/signin', credentials);

    // Ambil token dari response.data.data
    const { access_token, refresh_token } = response.data.data;

    // Simpan token ke localStorage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    console.log('Access Token from response:', access_token);
    console.log('Refresh Token from response:', refresh_token);
    console.log('Access Token from localStorage:', localStorage.getItem('access_token'));
    console.log('Refresh Token from localStorage:', localStorage.getItem('refresh_token'));

    // Tambahkan access token ke header default axios
    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  await api.post('/v1/user/auth/signout', { refresh_token: refreshToken });

  // Hapus token dari localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');

  // Redirect ke login
  window.location.href = '/login';
};
