import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useNavigate
} from 'react-router-dom'
import { Secrets, Secret, Signup, Signin } from './pages'
import { Notification } from './components'
import { useNotificationStore, useAuthStore } from './stores'
import { StoreStatus } from './types'
import './styles/main.scss'

function Private({ redirect }: { redirect: string }) {
  const { isAuthenticated, status } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && status !== StoreStatus.IDLE) {
      navigate(redirect, { replace: true })
    }
  }, [isAuthenticated, status])

  return isAuthenticated ? <Outlet /> : null
}

function App() {
  const { show, type, message } = useNotificationStore()

  return (
    <BrowserRouter>
      <Notification show={show} type={type} message={message} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<Private redirect="/signin" />}>
          <Route path="/secret" element={<Secrets />} />
          <Route path="/secret/:id" element={<Secret />} />
        </Route>
        <Route path="*" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
