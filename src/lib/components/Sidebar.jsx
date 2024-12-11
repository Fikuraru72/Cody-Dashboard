import React from 'react'
import {Link} from 'react-router-dom'

// icons
import {LuBox, LuUser, LuMessageSquare, LuCalendar} from 'react-icons/lu'
import {FaSuitcase} from 'react-icons/fa' 
import {TbUsers} from 'react-icons/tb'
import { AiFillProduct } from "react-icons/ai";

export const Sidebar = () => {
    const [activeLink, setActiveLink] = React.useState(0)
    const handleActiveLink = (index) => {
        setActiveLink(index)
    }
    const SIDEBAR_LINKS =[
        {id:1, path:'/', name:'Dashboard', icon:LuBox},
        {id:2, path:'/members', name:'Members', icon:TbUsers},
        {id:3, path:'/accessories', name:'Accecories', icon:AiFillProduct},
        // {id:4, path:'/project', name:'Project', icon:FaSuitcase},
        // {id:5, path:'/clients', name:'Clients', icon:LuUser},
        // {id:6, path:'/work', name:'Work Plan', icon:LuCalendar},
    ]
  return (
    <div className='w-40 md:-56 fixed left-0 top-0 z-10 h-screen border-r pt-8 px-4 bg-white'>
        {/* Logo */}
        <div className='mb-8'>
            <img src="" alt="logo" className="w-28 hidden md:flex" />
            <img src="" alt="logo" className="w-8 flex md:hidden" />
        </div>

        {/* Sidebar Links */}
        <ul className='mt-6 space-y-6'>
            {SIDEBAR_LINKS.map((link, index) => (
                <li 
                    key={index}
                    className={`Font-medium rounded-md py-2 px-5 hover:bg-gray-100 hover:text-indigo-500 ${activeLink === index ? "bg-indigo-100 text-indigo-500": ""}`}>
                        <Link 
                            to={link.path} 
                            className="flex items-center md:space-x-5"
                            onClick={() => handleActiveLink(index)}
                            >

                                <span>{link.icon()}</span>
                                <span className='text-sm text-grey-500 hidden md:flex'>{link.name}</span>
                        </Link>    
                </li>
            ))
            }
        </ul>

        {/* Navigation */}
        <div className='w-full items-center absolute bottom-5 left-0 px-4 py-2 cursor-pointer text-center'>
            {/* <p className='flex items-center space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full'>
                <span>?</span> <span className='md:hidden '>Need Help?</span>
            </p> */}
            <h5 className='space-x-2 text-xs text-white py-2 px-5 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full'>
               Log Out 
            </h5>
        </div>
    </div>
  )
}

export default Sidebar;