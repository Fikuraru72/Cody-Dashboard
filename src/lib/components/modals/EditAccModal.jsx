import React, { useState } from 'react'
import { Modal, Button, TextInput, Label } from 'flowbite-react'

export const EditAccModal = ({ show, onClose, accessory, onSave }) => {
  const [formData, setFormData] = useState({
    name: accessory.name,
    category: accessory.category,
    created: accessory.created,
    image: accessory.image,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSave = () => {
    onSave({ ...formData, id: accessory.id })
    onClose()
  }

  return (
    <Modal show={show} onClose={onClose} size="sm" className="bg-black bg-opacity-40 backdrop-blur-sm" >
      <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Accessories
            </h3>
      </div>
      <Modal.Body>
        <div className="space-y-4">
        <div className="flex justify-center items-center">
              <img className="w-40 h-w-40 rounded-full" src={formData.image} alt="Accessory" />
            </div>
          <div className="flex items-center ">
            <div className="flex-1 min-w-0">
              <Label htmlFor="name" value="Name" />
              <TextInput
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="category" value="Category" />
            <TextInput
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
          </div>
          <div>
            <Label htmlFor="created" value="Created At" />
            <TextInput
              id="created"
              name="created"
              type="date"
              value={formData.created}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="image" value="Image URL" />
            <TextInput
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              required
            />
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

export default EditAccModal