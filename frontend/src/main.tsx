import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Secrets, Secret, Signup, Signin } from '@/pages'
import { Notification, PrivateRoute, MasterPassword } from '@/components'
import { useNotificationStore, useAuthStore } from '@/stores'
import './styles/main.scss'

function App() {
  const { init } = useAuthStore()
  const { show, type, message } = useNotificationStore()

  useEffect(() => {
    init()
  }, [])

  return (
    <BrowserRouter>
      <Notification show={show} type={type} message={message} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<PrivateRoute redirect="/signin" />}>
          <Route path="/secret" element={<Secrets />} />
          <Route path="/secret/:id" element={<Secret />} />
        </Route>
        <Route path="*" element={<Navigate to="/secret" replace />} />
      </Routes>
      <MasterPassword />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
