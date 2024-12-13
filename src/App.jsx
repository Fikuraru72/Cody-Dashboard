import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './lib/components/Tamplate/Layout'
import Home from './pages/Home'
import Members from './pages/Members'
import Accessories from './pages/Accessories'
import Login from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman default adalah Login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout */}
        <Route path="/dashboard" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="members" element={<Members />} />
          <Route path="accessories" element={<Accessories />} />
        </Route>

        {/* Redirect untuk path yang tidak ditemukan */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
