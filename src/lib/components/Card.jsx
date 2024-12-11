import React from 'react'
import { Flowbite } from 'flowbite-react'
import { FaUser } from 'react-icons/fa'

export const Card = ({ value, text }) => {
  return (
    <Flowbite>
      <div className="flex flex-col md:flex-row justify-center items-center h-full md:flex-none">
        <div className="block w-96 h-max p-6 bg-gradient-to-r from-indigo-500 to-purple-600 border border-gray-200 rounded-lg shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl mb-4 md:mb-0 md:mr-4">
          <div className="flex items-center mb-4">
            <FaUser className="text-white text-3xl mr-4" />
            <h5 className="text-3xl font-bold tracking-tight text-white">{value}</h5>
          </div>
          <h4 className="font-normal text-white">{text}</h4>
        </div>
      </div>
    </Flowbite>
  )
}

export default Card;
