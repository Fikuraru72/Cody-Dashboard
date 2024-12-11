import React from 'react'

import { GoBell } from "react-icons/go"


export const Header = () => {
  return (
    <div className='flex justify-between items-center mt-5 mb-0'>
        <div>
            <h5 className='text-3xl font-bold'>Welcome Back !</h5>
            {/* <h4 className='text-xl font-semibold'>Admin</h4> */}
        </div>
        {/* <div className='flex items-center space-x-5'>
            <div className='flex items-center space-x-5'>
                <div className='hidden md:flex'>
                    <input type="text" placeholder='Search....' className='bg-indigo-100/30 px-4 py-2 rounded-lg focus:outline-0 focus:ring-2 focus:ring-indigo-600'/>
                </div>
            </div>
            <button className='relative text-2xl text-gray-600'>
                <GoBell size={28}/>
                <span className='absolute top-0 right-0 -mt-1 -mr-3 flex justify-center items-center bg-indigo-600 text-white font-semibold text-[10px] w-5 h-4 rounded-full border-2 border-white' >
                    9
                </span>
            </button>
            <img className='w-8 g-8 rounded-full border-4 border-indigo-400' src="" alt="" />
        </div> */}
    </div>
  )
}

export default Header;
