import React, { useState } from 'react'

import { Flowbite, Button } from 'flowbite-react'
import { FaPencilAlt, FaTrashAlt, FaEye } from 'react-icons/fa'
import AddAccessoriesModal from '../lib/components/modals/AddAccessoriesModal'
import DetailAccModals from '../lib/components/modals/DetailAccModals'
import EditAccModal from '../lib/components/modals/EditAccModal'


const data = [
  { id: 1, name: 'Accessory 1', category: 'Hat', created: '2023-01-01', image: 'https://via.placeholder.com/50?text=Hat+1' },
  { id: 2, name: 'Accessory 2', category: 'Torso', created: '2023-01-02', image: 'https://via.placeholder.com/50?text=Torso+1' },
  { id: 3, name: 'Accessory 3', category: 'Hat', created: '2023-01-03', image: 'https://via.placeholder.com/50?text=Hat+2' },
  { id: 4, name: 'Accessory 4', category: 'Torso', created: '2023-01-04', image: 'https://via.placeholder.com/50?text=Torso+2' },
  { id: 5, name: 'Accessory 5', category: 'Hat', created: '2023-01-05', image: 'https://via.placeholder.com/50?text=Hat+3' },
  { id: 6, name: 'Accessory 6', category: 'Torso', created: '2023-01-06', image: 'https://via.placeholder.com/50?text=Torso+3' },
  { id: 7, name: 'Accessory 7', category: 'Hat', created: '2023-01-07', image: 'https://via.placeholder.com/50?text=Hat+4' },
  { id: 8, name: 'Accessory 8', category: 'Torso', created: '2023-01-08', image: 'https://via.placeholder.com/50?text=Torso+4' },
  { id: 9, name: 'Accessory 9', category: 'Hat', created: '2023-01-09', image: 'https://via.placeholder.com/50?text=Hat+5' },
  { id: 10, name: 'Accessory 10', category: 'Torso', created: '2023-01-10', image: 'https://via.placeholder.com/50?text=Torso+5' },
  // Tambahkan data dummy lainnya jika diperlukan
]

export const Accessories = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedAccessory, setSelectedAccessory] = useState(null)
  const [newAccessory, setNewAccessory] = useState({
    name: '',
    category: '',
    created: '',
    image: ''
  })
  const itemsPerPage = 5

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || item.category === categoryFilter)
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handleAddAccessory = () => {
    data.push({ id: data.length + 1, ...newAccessory })
    setShowAddModal(false)
    setNewAccessory({ name: '', category: '', created: '', image: '' })
  }

  const handleViewDetails = (accessory) => {
    setSelectedAccessory(accessory)
    setShowDetailModal(true)
  }

  const handleEditAccessory = (accessory) => {
    setSelectedAccessory(accessory)
    setShowEditModal(true)
  }

  const handleSaveAccessory = (updatedAccessory) => {
    // Update accessory data here
    const index = data.findIndex(item => item.id === updatedAccessory.id)
    if (index !== -1) {
      data[index] = updatedAccessory
    }
    setShowEditModal(false)
    setSelectedAccessory(null)
  }

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
                <option value="Hat">Hat</option>
                <option value="Torso">Torso</option>
            </select>
            <Button className='mx-4 bg-blue-500 text-white rounded-lg' onClick={() => setShowAddModal(true)}>Add</Button>
          </div>
          
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Created
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-16 py-4">
                  <img src={item.image} alt="Product" className="w-12 h-12 rounded-full" />
                </td>
                <td className="px-6 py-4">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  {item.category}
                </td>
                <td className="px-6 py-4">
                  {item.created}
                </td>
                <td className="px-6 py-4 flex justify-between">
                    <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline"  onClick={() => handleEditAccessory(item)}>
                        <FaPencilAlt />
                    </a>
                    <a href="#" className="text-red-600 dark:text-red-500 hover:underline">
                        <FaTrashAlt />
                    </a>
                    <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleViewDetails(item)}>
                        <FaEye />
                    </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center py-4">
          <button
            className="px-4 py-2 ml-5 text-white bg-blue-500 rounded"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 ml-5 text-white bg-blue-500 rounded"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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
  )
}

export default Accessories