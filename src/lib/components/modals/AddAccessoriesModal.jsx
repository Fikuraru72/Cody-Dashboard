import React from 'react'
import { Modal, Button, TextInput, Label } from 'flowbite-react'

export const AddAccessoriesModal = ({ show, onClose, newAccessory, setNewAccessory, handleAddAccessory }) => {
  return (
    <Modal show={show} onClose={onClose} size="md" className="bg-black bg-opacity-40 backdrop-blur-sm" >
        {/* Header */}
        <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add Accessories
            </h3>
        </div>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={newAccessory.name}
              onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })}
              placeholder="Name"
              required
            />
          </div>
          <div>
            <Label htmlFor="category" value="Category" />
            <TextInput
              id="category"
              name="category"
              value={newAccessory.category}
              onChange={(e) => setNewAccessory({ ...newAccessory, category: e.target.value })}
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
              value={newAccessory.created}
              onChange={(e) => setNewAccessory({ ...newAccessory, created: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="image" value="Image URL" />
            <TextInput
              id="image"
              name="image"
              value={newAccessory.image}
              onChange={(e) => setNewAccessory({ ...newAccessory, image: e.target.value })}
              placeholder="Image URL"
              required
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className='bg-blue-500 text-white' onClick={handleAddAccessory}>
          Add
        </Button>
        <Button className='bg-red-500 text-white' color="gray" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddAccessoriesModal