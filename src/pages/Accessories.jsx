import React, { useState, useEffect } from 'react';
import { Flowbite, Button } from 'flowbite-react';
import { FaPencilAlt, FaTrashAlt, FaEye } from 'react-icons/fa';
import AddAccessoriesModal from '../lib/components/modals/AddAccessoriesModal';
import DetailAccModals from '../lib/components/modals/DetailAccModals';
import EditAccModal from '../lib/components/modals/EditAccModal';
import { getAllAccessories, updateAccessory, deleteAccessory } from '../lib/api/accessoriesApi';

const Accessories = () => {
  const [accessories, setAccessories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [newAccessory, setNewAccessory] = useState({
    name: '',
    type: '',
    price: 0,
    picture_url: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllAccessories();
      setAccessories(data);
    } catch (error) {
      setError('Failed to fetch accessories. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAccessory = async (accessoryData) => {
    try {
      fetchAccessories(); // Memperbarui daftar
      setShowAddModal(true);
      setNewAccessory({ name: "", type: "", price: 0, picture_url: "" });
    } catch (error) {
      setError("Failed to add accessory. Please try again.");
      console.error(error);
    }
  };
  

  const handleEditAccessory = (accessory) => {
    setSelectedAccessory(accessory);
    setShowEditModal(true);
  };

  const handleSaveAccessory = async (updatedAccessory) => {
    try {
      const updatedData = {
        name: updatedAccessory.name,
        image: updatedAccessory.image,  // Pastikan ini adalah URL gambar yang valid
        price: updatedAccessory.price,  // Pastikan ini adalah angka harga
        type: updatedAccessory.type,    // Misalnya "torso" atau "hat"
        createdAt: updatedAccessory.createdAt,  // Jika diperlukan
      };
  
      // Log updatedData untuk memeriksa datanya
      console.log(updatedData);
      
      await updateAccessory(updatedAccessory.uuid, updatedAccessory);
      fetchAccessories(); // Memperbarui daftar aksesori
      setShowEditModal(false); // Menutup modal edit
      setSelectedAccessory(null); // Reset data aksesori yang dipilih
    } catch (error) {
      setError('Failed to update accessory. Please try again.');
      console.error(error);
    }
  };
  

  const handleDeleteAccessory = async (uuid) => {
    try {
      await deleteAccessory(uuid);
      fetchAccessories();
    } catch (error) {
      setError('Failed to delete accessory. Please try again.');
      console.error(error);
    }
  };

  const filteredData = accessories.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === '' || item.type === categoryFilter)
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Flowbite>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 p-4">
        <div className="flex justify-between items-center pb-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex">
            <select
              className="p-2 border border-gray-300 rounded"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="head">Head</option>
              <option value="torso">Torso</option>
            </select>
            <Button className="mx-4 bg-blue-500 text-white rounded-lg" onClick={() => setShowAddModal(true)}>
              Add
            </Button>
          </div>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-16 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.uuid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-16 py-4">
                    <img src={item.picture_url} alt="Product" className="w-12 h-12 rounded-full" />
                  </td>
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.type}</td>
                  <td className="px-6 py-4">${item.price}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <FaPencilAlt onClick={() => {setSelectedAccessory(item), handleEditAccessory(item)}} className="cursor-pointer text-blue-500" />
                    <FaTrashAlt onClick={() => {setSelectedAccessory(item), handleDeleteAccessory(item.uuid)}} className="cursor-pointer text-red-500" />
                    <FaEye
                      onClick={() => {
                        setShowDetailModal(true); // First, open the modal
                        setSelectedAccessory(item); // Then, set the selected accessory
                      }}
                      className="cursor-pointer text-gray-500"
                    />

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-between items-center py-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <AddAccessoriesModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        newAccessory={newAccessory}
        setNewAccessory={setNewAccessory}
        handleAddAccessory={handleAddAccessory} 
      />

      {selectedAccessory && (
        <DetailAccModals
          show={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);  // Menutup modal dan reset selectedAccessory
            setSelectedAccessory(null);  // Reset selectedAccessory
          }}
          accessory={selectedAccessory}
        />
      )}

      {selectedAccessory && (
        <EditAccModal
          show={showEditModal}
          onClose={() => {
            setShowEditModal(false),
            setSelectedAccessory(null);
          }}
          accessory={selectedAccessory}
          onSave={handleSaveAccessory}
        />
      )}
    </Flowbite>
  );
};

export default Accessories;
