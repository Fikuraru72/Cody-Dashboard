import React, { useState } from 'react'
import { Modal, Button, TextInput, Label } from 'flowbite-react'

export const EditModals = ({ show, onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    create: user.create,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    onSave(formData)
    onClose()
  }

  return (
    <Modal show={show} onClose={onClose} size="md" className="bg-black bg-opacity-40 backdrop-blur-sm" >
      <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit User
            </h3>
      </div>
      <Modal.Body>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img className="w-12 h-12 rounded-full" src={`https://i.pravatar.cc/150?u=${user.email}`} alt="User avatar" />
            </div>
            <div className="flex-1 min-w-0">
              <TextInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <TextInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender" value="Gender" />
              <TextInput
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Gender"
                required
              />
            </div>
            <div>
              <Label htmlFor="create" value="Created At" />
              <TextInput
                id="create"
                name="create"
                type="date"
                value={formData.create}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='bg-blue-500 text-white' onClick={handleSave}>
          Save
        </Button>
        <Button className='bg-red-500 text-white' onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditModals