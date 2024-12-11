import React, { useState, useEffect } from 'react';
import { Flowbite, Button } from 'flowbite-react';
import { FaPencilAlt, FaTrashAlt, FaEye } from 'react-icons/fa';
import AddAccessoriesModal from '../lib/components/modals/AddAccessoriesModal';
import DetailAccModals from '../lib/components/modals/DetailAccModals';
import EditAccModal from '../lib/components/modals/EditAccModal';
import { getAllAccessories, createAccessory, updateAccessory, deleteAccessory } from '../lib/api/accessoriesApi';

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

  const itemsPerPage = 5;

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      const data = await getAllAccessories();
      setAccessories(data);
    } catch (error) {
      console.error('Failed to fetch accessories:', error);
    }
  };

  const handleAddAccessory = async () => {
    try {
      await createAccessory(newAccessory);
      fetchAccessories();
      setShowAddModal(false);
      setNewAccessory({ name: '', type: '', price: 0, picture_url: '' });
    } catch (error) {
      console.error('Failed to add accessory:', error);
    }
  };

  const handleEditAccessory = (accessory) => {
    setSelectedAccessory(accessory);
    setShowEditModal(true);
  };

  const handleSaveAccessory = async (updatedAccessory) => {
    try {
      await updateAccessory(updatedAccessory.uuid, updatedAccessory);
      fetchAccessories();
      setShowEditModal(false);
      setSelectedAccessory(null);
    } catch (error) {
      console.error('Failed to update accessory:', error);
    }
  };

  const handleDeleteAccessory = async (uuid) => {
    try {
      await deleteAccessory(uuid);
      fetchAccessories();
    } catch (error) {
      console.error('Failed to delete accessory:', error);
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
              <option value="hat">Hat</option>
              <option value="torso">Torso</option>
            </select>
            <Button className="mx-4 bg-blue-500 text-white rounded-lg" onClick={() => setShowAddModal(true)}>
              Add
            </Button>
          </div>
        </div>
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
                  <FaPencilAlt onClick={() => handleEditAccessory(item)} className="cursor-pointer text-blue-500" />
                  <FaTrashAlt onClick={() => handleDeleteAccessory(item.uuid)} className="cursor-pointer text-red-500" />
                  <FaEye onClick={() => setShowDetailModal(true) && setSelectedAccessory(item)} className="cursor-pointer text-gray-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
          onClose={() => setShowDetailModal(false)}
          accessory={selectedAccessory}
        />
      )}

      {selectedAccessory && (
        <EditAccModal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          accessory={selectedAccessory}
          onSave={handleSaveAccessory}
        />
      )}
    </Flowbite>
  );
};

export default Accessories;
