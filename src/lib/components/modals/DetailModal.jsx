import { Modal, Button } from "flowbite-react";
import React from "react";

export const DetailModal = ({ show, onClose, user }) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      size="md"
      className="bg-black bg-opacity-40 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="p-4 border-b dark:border-gray-700 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          User Details
        </h3>
      </div>

      {/* Body */}
      <Modal.Body>
        <div className="space-y-4 p-4">
          {/* Foto User */}
          <div className="flex justify-center">
            <img
              className="w-24 h-24 rounded-full shadow-lg"
              src={user.profile_picture_url || `https://i.pravatar.cc/150?u=${user.email}`}
              alt="User avatar"
            />
          </div>

          {/* Detail Informasi User */}
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {user.first_name || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {user.last_name || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {user.gender || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Born Date</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {user.born_date ? new Date(user.born_date).toLocaleDateString() : "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {user.email || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</p>
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                {user.role || "-"}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>

      {/* Footer */}
      <Modal.Footer>
        <Button className="w-full bg-blue-500 text-white rounded-md py-2" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailModal;
