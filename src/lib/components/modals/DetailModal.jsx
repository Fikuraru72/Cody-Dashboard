import { Modal, Button } from "flowbite-react";
import React from "react";

export const DetailModal = ({ show, onClose, user }) => {
  return (
    <Modal show={show} onClose={onClose} size="sm" className="bg-black bg-opacity-40 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Details</h3>
      </div>

      <Modal.Body>
        <div className="space-y-4 p-4 text-center">
          {/* Foto di atas */}
          <div className="flex justify-center">
            <img
              className="w-24 h-24 rounded-full shadow-lg"
              src={`https://i.pravatar.cc/150?u=${user.email}`}
              alt="User avatar"
            />
          </div>
          {/* Informasi User */}
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
          {/* Detail Tambahan */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Gender</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.gender}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Created At</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.create}</p>
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
  );
};

export default DetailModal;
