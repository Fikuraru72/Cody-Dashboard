import api from './axiosInstance';


// Fungsi API dengan pengecekan respons data
export const getAllAccessories = async () => {
  try {
    const response = await api.get('/v1/admin/costume?no_cache=true');
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // Kembalikan data yang sesuai
    } else {
      throw new Error('Data yang diterima tidak sesuai.');
    }
  } catch (error) {
    console.error('Error fetching accessories:', error);
    return [];
  }
};

export const createAccessory = async (accessory) => {
  // console.log('Creating accessory:', accessory);

  try {
    // Validasi data accessory
    // if (!accessory.name || !accessory.type || !accessory.price || !accessory.picture_url) {
    //   throw new Error('Data accessory tidak lengkap. Pastikan name, type, price, dan picture_url tersedia.');
    // }

    // Payload sesuai format API
    const payload = {
      name: accessory.name,
      picture_url: accessory.picture_url,
      price: accessory.price,
      type: accessory.type,
    };

    // console.log('Payload:', JSON.stringify(payload));


    // Kirim request ke API
    const response = await api.post('/v1/admin/costume/new', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Accessory created successfully:', response.data);
    return response.data;

  } catch (error) {
    console.error('Error creating accessory:', error.response?.data || error.message);
    throw error;
  }
};


export const updateAccessory = async (accessory) => {

  try {
    if (!accessory.uuid || !accessory.name || !accessory.type || !accessory.price) {
      throw new Error('Data untuk pembaruan tidak lengkap.');
    }
    // console.log('Updating accessory:', accessory);
    const payload = {
      uuid: accessory.uuid,
      created_at: accessory.created_at,
      update_at: accessory.update_at || Date.now(),
      delete_at: accessory.delete_at || null,
      name: accessory.name,
      picture_url: accessory.image,
      price: parseInt(accessory.price, 10), // Convert price to integer
      type: accessory.type
    };

    console.log(payload);

    const response = await api.post('/v1/admin/costume/update', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error updating accessory:', error);
    throw error;
  }
};

export const deleteAccessory = async (uuid) => {
  try {
    if (!uuid) {
      throw new Error('UUID tidak diberikan.');
    }
    const data = { uuid };
    console.log('Data yang dikirimkan:', data); 
    const response = await api.post('/v1/admin/costume/delete', data, {
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

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append('image', image);
    const response = await api.post('/v1/admin/costume/upload', formData, {
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
