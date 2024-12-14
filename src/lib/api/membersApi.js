import api from './axiosInstance'

export const getAllMembers = async () => {
    try {
      const response = await api.get('/v1//admin/analytics/amount-resume');
        return response.data.data; // Kembalikan data yang sesuai
    } catch (error) {
        console.error('Error fetching accessories:', error);
      return [];
    }
  };