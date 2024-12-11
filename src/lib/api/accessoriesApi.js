import axios from 'axios';

const API_BASE_URL = 'http://103.181.183.222:5555/api/v1/admin/costume';

// get
export const getAllAccessories = async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  };
  
//   Detail
  export const createAccessory = async (accessory) => {
    const response = await axios.post(API_BASE_URL, accessory);
    return response.data;
  };
  
//   Edit
  export const updateAccessory = async (uuid, accessory) => {
    const response = await axios.put(`${API_BASE_URL}/${uuid}`, accessory);
    return response.data;
  };
  
//   Delete
  export const deleteAccessory = async (uuid) => {
    const response = await axios.delete(`${API_BASE_URL}/${uuid}`);
    return response.data;
  };
