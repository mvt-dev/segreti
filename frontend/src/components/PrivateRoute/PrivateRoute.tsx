import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores'
import { StoreStatus } from '../../types'

interface PrivateRouteProps {
  redirect: string
}

export function PrivateRoute({ redirect }: PrivateRouteProps) {
  const { isAuthenticated, status } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated && status !== StoreStatus.IDLE) {
      navigate(redirect, { replace: true })
    }
  }, [isAuthenticated, status])

  return isAuthenticated ? <Outlet /> : null
}

export default PrivateRoute
