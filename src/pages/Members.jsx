import React, { useState, useEffect } from 'react';
import { Flowbite } from 'flowbite-react';
import { FaPencilAlt, FaTrashAlt, FaEye } from 'react-icons/fa';
import DetailModal from '../lib/components/modals/DetailModal';
import EditModals from '../lib/components/modals/EditModals';
import { membersList } from '../lib/api/membersApi';

export const Members = () => {
  // State untuk mengelola data dan UI
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [members, setMembers] = useState([]); // Inisialisasi sebagai array kosong
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Konstanta untuk pagination
  const itemsPerPage = 7;

  // Effect untuk mengambil data saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk mengambil data anggota
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await membersList();
      // Validasi data yang diterima
      if (response && Array.isArray(response.data)) {
        console.log(response.data);
        setMembers(response.data);
      } else {
        setMembers([]);
        setError('Data yang diterima tidak valid');
      }
    } catch (error) {
      setError('Gagal mengambil data. Silakan coba lagi nanti.');
      console.error(error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter data berdasarkan kata kunci pencarian
  const filteredData = Array.isArray(members)
    ? members.filter((item) =>
        item &&
        item.first_name &&
        `${item.first_name} ${item.last_name}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  // Logika pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Handler untuk menampilkan detail pengguna
  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // Handler untuk mengedit pengguna
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Handler untuk menyimpan perubahan pengguna
  const handleSaveUser = (updatedUser) => {
    const updatedMembers = members.map((member) =>
      member.uuid === updatedUser.uuid ? updatedUser : member
    );
    setMembers(updatedMembers);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  // Handler untuk menghapus pengguna
  const handleDeleteUser = (userId) => {
    const updatedMembers = members.filter((member) => member.uuid !== userId);
    setMembers(updatedMembers);
  };

  return (
    <Flowbite>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 p-4">
        {/* Bagian pencarian */}
        <div className="flex justify-between items-center pb-4">
          <input
            type="text"
            placeholder="Cari"
            className="p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabel data anggota */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Jenis Kelamin
              </th>
              <th scope="col" className="px-6 py-3">
                Dibuat Pada
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Memuat...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : currentData.length > 0 ? (
              currentData.map((item) => (
                <tr key={item.uuid} className="bg-white border-b">
                  <td className="px-6 py-4">
                    {`${item.first_name} ${item.last_name}`}
                  </td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.gender}</td>
                  <td className="px-6 py-4">{item.created_at}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => handleEditUser(item)}
                      className="text-blue-500"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(item.uuid)}
                      className="text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="text-green-500"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  Tidak ada data tersedia
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Navigasi halaman */}
        <div className="flex justify-between items-center py-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </button>
          <span>
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Selanjutnya
          </button>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedUser && (
        <DetailModal
          show={showModal}
          onClose={() => setShowModal(false)}
          user={selectedUser}
        />
      )}

      {/* Modal Edit */}
      {selectedUser && (
        <EditModals
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}
    </Flowbite>
  );
};

export default Members;
