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
        setError("Semua field wajib diisi.");
        setIsLoading(false);
        return;
      }
  
      let imageUrl = newAccessory.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
  
      if (!imageUrl) {
        setError("Gambar harus diunggah.");
        setIsLoading(false);
        return;
      }
  
      const accessoryData = {
        name: newAccessory.name,
        picture_url: imageUrl,
        price: isNaN(parseInt(newAccessory.price, 10)) ? 0 : parseInt(newAccessory.price, 10),
        type: newAccessory.type,
      };
  
      console.log("Data yang dikirimkan:", accessoryData);
  
      await createAccessory(accessoryData);
      handleAddAccessory(accessoryData);
      onClose();
    } catch (err) {
      console.error("Error detail:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add accessory. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header>Add New Accessory</Modal.Header>
      <Modal.Body>
        <div>
          <Label htmlFor="name" value="Name" />
          <TextInput
            id="name"
            placeholder="Enter accessory name"
            value={newAccessory.name}
            onChange={(e) =>
              setNewAccessory({ ...newAccessory, name: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="type" value="Type" />
          <TextInput
            id="type"
            placeholder="Enter accessory type"
            value={newAccessory.type}
            onChange={(e) =>
              setNewAccessory({ ...newAccessory, type: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="price" value="Price" />
          <TextInput
            id="price"
            type="number"
            placeholder="Enter accessory price"
            value={newAccessory.price}
            onChange={(e) =>
              setNewAccessory({ ...newAccessory, price: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="image" value="Image" />
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Spinner size="sm" /> : "Add Accessory"}
        </Button>
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAccessoriesModal;