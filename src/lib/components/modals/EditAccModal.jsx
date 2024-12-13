import React, { useState } from 'react';
import { Modal, Button, TextInput, Label } from 'flowbite-react';

export const EditAccModal = ({ show, onClose, accessory, onSave }) => {
  const [formData, setFormData] = useState({
    uuid: accessory.uuid,
    created_at: accessory.created_at,
    updated_at: Date.now(), 
    delate_at: null,
    name: accessory.name,
    type: accessory.type, // Mengganti category menjadi type
    price: accessory.price, // Mengganti created menjadi price
    image: accessory.image, // Menyimpan URL gambar saat ini
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // Jika ada perubahan gambar, gunakan gambar baru, jika tidak, gunakan gambar lama
    const updatedData = { 
      ...formData, 
      uuid: accessory.uuid,
      picture_url: formData.image || accessory.picture_url // Gunakan gambar baru jika ada, jika tidak, gunakan URL lama
    };
    
    onSave(updatedData); // Mengirimkan data yang sudah diperbarui
    console.log("Data yang dikirimkan:", updatedData);
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file); // Mengubah file gambar menjadi base64
    }
  };

  return (
    <Modal show={show} onClose={onClose} size="sm" className="bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Edit Accessories
        </h3>
      </div>
      <Modal.Body>
        <div className="space-y-4">
          <div className="flex justify-center items-center">
            <img className="shadow-md w-40 h-40 rounded-full" src={accessory.picture_url} alt="Accessory" />
          </div>
          <div className="flex items-center">
            <div className="flex-1 min-w-0">
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={accessory.name}
                required
              />
            </div>
          </div>

          {/* Ganti input kategori dengan dropdown type */}
          <div>
            <Label htmlFor="type" value="Type" />
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="hat">Hat</option>
              <option value="torso">Torso</option>
            </select>
          </div>

          {/* Mengganti input created menjadi price */}
          <div>
            <Label htmlFor="price" value="Price" />
            <TextInput
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="bg-blue-500 text-white" onClick={handleSave}>
          Save
        </Button>
        <Button className="bg-red-500 text-white" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditAccModal;
