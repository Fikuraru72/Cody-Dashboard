import React from 'react'

import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'


export const Layout = () => {
  return (
    <div>
        <div className='flex'>
            <Sidebar />
            <div className='w-full mx-20 md:ml-56'>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </div>
    </div>
  )
}

export default Layout;
