import { Flowbite } from 'flowbite-react'
import React, { useState } from 'react'
import { FaPencilAlt, FaTrashAlt, FaEye } from 'react-icons/fa'
import DetailModal from './modals/DetailModal'
import EditModals from './modals/EditModals'

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', gender: 'Male', create: '2023-01-01' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', gender: 'Female', create: '2023-01-02' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', gender: 'Female', create: '2023-01-03' },
  { id: 4, name: 'Bob Brown', email: 'bob@example.com', gender: 'Male', create: '2023-01-04' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', gender: 'Male', create: '2023-01-05' },
  { id: 6, name: 'Diana Evans', email: 'diana@example.com', gender: 'Female', create: '2023-01-06' },
  { id: 7, name: 'Eve Foster', email: 'eve@example.com', gender: 'Female', create: '2023-01-07' },
  { id: 8, name: 'Frank Green', email: 'frank@example.com', gender: 'Male', create: '2023-01-08' },
  { id: 9, name: 'Grace Hill', email: 'grace@example.com', gender: 'Female', create: '2023-01-09' },
  { id: 10, name: 'Hank Irving', email: 'hank@example.com', gender: 'Male', create: '2023-01-10' },
  { id: 11, name: 'Ivy Johnson', email: 'ivy@example.com', gender: 'Female', create: '2023-01-11' },
  { id: 12, name: 'Jack King', email: 'jack@example.com', gender: 'Male', create: '2023-01-12' },
  // Tambahkan data dummy lainnya jika diperlukan
]

export const Table = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const itemsPerPage = 8

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const handleSaveUser = (updatedUser) => {
    // Update data
    setSelectedUser(null)
    setShowEditModal(false)
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
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Gender
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(item => (
              <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.gender}</td>
                <td className="px-6 py-4">{item.create}</td>
                <td className="flex justify-between px-6 py-4">
                  <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline" onClick={() => handleEditUser(item)}>
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
            className="px-4 py-2 ml-4 bg-blue-500 rounded text-white"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 ml-4 bg-blue-500 rounded text-white"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {selectedUser && (
        <DetailModal
          show={showModal}
          onClose={() => setShowModal(false)}
          user={selectedUser}
        />
      )}

      {selectedUser && (
        <EditModals
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}

    </Flowbite>
  )
}

export default Table