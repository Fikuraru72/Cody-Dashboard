import { data } from 'react-router-dom';
import api from './axiosInstance';


export const membersList = async () => {
    try {
        const response = await api.get('/v1/admin/user/');
        // console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}

export const updateMember = async (member) => {
    try {
      const response = await api.post(`/v1/admin/user/update`, member, data, { 
        headers: { 'Content-Type': 'application/json' } 
    });
      return response.data;
    } catch (error) {
      console.error('Error updating member:', error.response?.data || error.message);
      throw error;
    }
  };
  
export const uploadUserImage = async (image) => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await api.post('/v1/admin/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded:', response.data.data);
      return response.data.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  export const deleteUser = async (uuid) => {
    try { 
      if (!uuid) {
        throw new Error('UUID tidak diberikan.');
      }
      const data = { uuid };
      // console.log('Data yang dikirimkan:', data); 
      const response = await api.post('/v1/admin/user/delete', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting accessory:', error);
      throw error;
    }
  };
  