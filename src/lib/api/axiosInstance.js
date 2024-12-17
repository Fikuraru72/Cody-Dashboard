
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('Refresh token not found.');

    const response = await api.post('/v1/user/auth/refresh', { refresh_token: refreshToken });
    const newAccessToken = response.data.data.access_token;

    localStorage.setItem('access_token', newAccessToken);
    console.log('New Access Token:', newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error.response?.data || error.message);
    return null;
  }
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default api;