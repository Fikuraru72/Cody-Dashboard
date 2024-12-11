import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './lib/components/Layout'
import Home from './pages/Home'
import Members from './pages/Members'
import Accessories from './pages/Accessories'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="members" element={<Members />} />
          <Route path="accessories" element={<Accessories />} /> {/* Pastikan ini sesuai */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App