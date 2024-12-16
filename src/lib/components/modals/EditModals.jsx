import React, { useState, useEffect } from 'react';
import { Modal, Button, TextInput, Label } from 'flowbite-react';
import { updateMember } from '../../api/membersApi'; // Pastikan path ini sesuai

export const EditModals = ({ show, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    gender: user.gender || '',
    born_date: user.born_date || '',
  });

    useEffect(() => {
      if (user) {
        setFormData({
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          email: user.email || '',
          gender: user.gender || '',
          born_date: user.born_date || '',
        });
      }
    }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Konversi data ke dalam format raw
      const rawData = {
        uuid: user.uuid,
        created_at: user.created_at,
        updated_at: new Date().toISOString(),
        deleted_at: null,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        facial_picture_url: user.facial_picture_url,
        profile_picture_url: user.profile_picture_url,
        born_date: new Date(formData.born_date).toISOString(),
        gender: formData.gender,
        points_amount: user.points_amount,
        is_verified: user.is_verified,
        role: user.role,
      };

      // Panggil API
      await updateMember(rawData);

      // Callback untuk onSave (opsional)
      onSave(rawData);
      onClose();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    console.log(user),
    <Modal
      show={show}
      onClose={onClose}
      size="sm"
      className="bg-black bg-opacity-40 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Edit User
        </h3>
      </div>

      <Modal.Body>
        <div className="space-y-6 p-4 text-center">
          <div className="flex justify-center">
            <img
              className="w-20 h-20 rounded-full shadow-lg"
              src={user.profile_picture_url}
              alt="User avatar"
            />
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-4">
              <Label htmlFor="first_name" value="First Name" className="w-1/3 text-sm" />
              <TextInput
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Label htmlFor="last_name" value="Last Name" className="w-1/3 text-sm" />
              <TextInput
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Label htmlFor="email" value="Email" className="w-1/3 text-sm" />
              <TextInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Label htmlFor="gender" value="Gender" className="w-1/3 text-sm" />
              <TextInput
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Gender"
                required
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Label htmlFor="born_date" value="Born Date" className="w-1/3 text-sm" />
              <TextInput
                id="born_date"
                name="born_date"
                type="date"
                value={formData.born_date}
                onChange={handleChange}
                required
                className="flex-1"
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer className="flex justify-between">
        <Button className="bg-blue-500 text-white w-1/2 mr-2" onClick={handleSave}>
          Save
        </Button>
        <Button className="bg-red-500 text-white w-1/2 ml-2" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModals;
