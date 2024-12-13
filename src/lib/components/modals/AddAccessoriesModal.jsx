import React, { useState } from "react";
import { Modal, Button, TextInput, Label, Spinner } from "flowbite-react";
import { createAccessory, uploadImage } from "../../api/accessoriesApi";

export const AddAccessoriesModal = ({
  show,
  onClose,
  newAccessory,
  setNewAccessory,
  handleAddAccessory,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      if (!newAccessory.name || !newAccessory.type || !newAccessory.price) {
        setError("All fields are required.");
        setIsLoading(false);
        return;
      }

      let imageUrl = newAccessory.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      if (!imageUrl) {
        setError("Image must be uploaded.");
        setIsLoading(false);
        return;
      }

      const accessoryData = {
        name: newAccessory.name,
        picture_url: imageUrl,
        price: isNaN(parseInt(newAccessory.price, 10)) ? 0 : parseInt(newAccessory.price, 10),
        type: newAccessory.type,
      };

      await createAccessory(accessoryData);
      handleAddAccessory(accessoryData);

      // Ambil ulang data aksesori terbaru
      // fetchAccessories();

      // Reset form setelah berhasil menyimpan
      setNewAccessory({
        name: "",
        type: "",
        price: "",
        image: "",})
        
      // onClose();
    } catch (err) {
      console.error("Error detail:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add accessory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onClose={onClose} size="md" className="bg-black bg-opacity-40 backdrop-blur-sm">
      <Modal.Header className="text-xl p-4 font-semibold text-gray-700">Add New Accessory</Modal.Header>
      <Modal.Body className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" value="Name" className="text-sm font-medium text-gray-600" />
          <TextInput
            id="name"
            placeholder="Enter accessory name"
            value={newAccessory.name}
            onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type" value="Type" className="text-sm font-medium text-gray-600" />
          <select
            id="type"
            value={newAccessory.type}
            onChange={(e) => setNewAccessory({ ...newAccessory, type: e.target.value })}
            className="block w-full text-sm text-gray-500"
          >
            <option value="">Select type</option>
            <option value="torso">Torso</option>
            <option value="head">Head</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="price" value="Price" className="text-sm font-medium text-gray-600" />
          <TextInput
            id="price"
            type="number"
            placeholder="Enter accessory price"
            value={newAccessory.price}
            onChange={(e) => setNewAccessory({ ...newAccessory, price: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image" value="Image" className="text-sm font-medium text-gray-600" />
          <input type="file" id="image" className="block w-full text-sm text-gray-500" onChange={handleImageChange} />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </Modal.Body>
      <Modal.Footer className="flex space-x-2">
        <Button onClick={handleSubmit} disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          {isLoading ? <Spinner size="sm" /> : "Add Accessory"}
        </Button>
        <Button color="gray" onClick={onClose} className="px-4 py-2 rounded-lg">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAccessoriesModal;
