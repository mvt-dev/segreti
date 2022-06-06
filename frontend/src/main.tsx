import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Secrets, Secret } from './pages'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/secret/:id" element={<Secret />} />
        <Route path="*" element={<Secrets />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
