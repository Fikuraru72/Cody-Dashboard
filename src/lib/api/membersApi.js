import api from './axiosInstance'

export const getAllMembers = async () => {
  try {
    const response = await api.get('/v1/admin/member/all');
    return response.data.data;
  } catch (error) {
    console.error('Error getting all members:', error);
    throw error;
  }
}