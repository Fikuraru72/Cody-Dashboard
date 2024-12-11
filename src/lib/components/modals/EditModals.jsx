import React, { useState } from 'react';
import { Modal, Button, TextInput, Label } from 'flowbite-react';

export const EditModals = ({ show, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    create: user.create,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
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
          {/* Gambar di atas */}
          <div className="flex justify-center">
            <img
              className="w-20 h-20 rounded-full shadow-lg"
              src={`https://i.pravatar.cc/150?u=${user.email}`}
              alt="User avatar"
            />
          </div>

          {/* Form Input */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-4">
              <Label htmlFor="name" value="Name" className="w-1/3 text-sm" />
              <TextInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
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
              <Label htmlFor="create" value="Created At" className="w-1/3 text-sm" />
              <TextInput
                id="create"
                name="create"
                type="date"
                value={formData.create}
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
