import React from 'react'
import { Modal, Button } from 'flowbite-react'

export const DetailAccModals = ({ show, onClose, accessory }) => {
  return (
    <Modal show={show} onClose={onClose} size="md" className="bg-black bg-opacity-40 backdrop-blur-sm" >
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Accessories Details
            </h3>
        </div>
      <Modal.Body>
        <div className="space-y-4 p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img className="w-12 h-12 rounded-full" src={accessory.image} alt="Accessory" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                {accessory.name}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {accessory.category}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{accessory.category}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{accessory.created}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='bg-blue-500 text-white' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DetailAccModals