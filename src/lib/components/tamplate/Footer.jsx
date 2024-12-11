import { Flowbite } from 'flowbite-react'
import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

export const Footer = () => {
  return (
    <Flowbite>
      <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-5">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="flex justify-between items-center">
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Cody</a>. All Rights Reserved.</span>
            
          </div>
        </div>
      </footer>
    </Flowbite>
  )
}

export default Footer