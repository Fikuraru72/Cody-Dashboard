import React from 'react'
import { Modal, Button } from 'flowbite-react'

export const DetailAccModals = ({ show, onClose, accessory }) => {
  return (
    <Modal show={show} onClose={onClose} size="sm" className="bg-black bg-opacity-40 backdrop-blur-sm">
  {/* Header */}
  <div className="p-4 border-b dark:border-gray-700">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
      Accessories Details
    </h3>
  </div>
  <Modal.Body>
    <div className="flex flex-col items-center space-y-4">
      {/* Gambar dan Informasi */}
      <div className="flex items-center space-x-4">
        {/* Gambar */}
        <img className="w-24 h-24 rounded-full shadow-lg" src={accessory.picture_url} alt="Accessory" />
        {/* Informasi */}
        
      </div>
      {/* Detail Tambahan */}
      <div className="w-full text-left space-y-2">
        <div className="flex flex-col space-y-1">
            <p className="text-base font-semibold text-gray-900 dark:text-white">{accessory.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{accessory.category}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Category</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{accessory.type}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Price</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{accessory.price}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Created At</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{accessory.created_at}</p>
          </div>
      </div>
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button className="w-full bg-blue-500 text-white rounded-md py-2" onClick={onClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

  )
}

export default DetailAccModals