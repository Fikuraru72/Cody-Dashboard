import api from './axiosInstance';


export const membersList = async () => {
    try {
        const response = await api.get('/v1/admin/user/');
        return response.data;
    } catch (error) {
        console.error('Error fetching members:', error);
        return [];
    }
}
