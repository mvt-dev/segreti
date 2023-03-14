import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Secrets, Secret, Signup } from './pages'
import { Notification } from './components'
import { useNotificationStore } from './stores'
import './styles/main.scss'

function App() {
  const { show, type, message } = useNotificationStore()

  return (
    <BrowserRouter>
      <Notification show={show} type={type} message={message} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/secret/:id" element={<Secret />} />
        <Route path="*" element={<Secrets />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
