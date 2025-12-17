import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    // Backend'dan authentication holatini tekshirish
    const checkAuth = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE || '/api'
        const res = await fetch(`${API_BASE}/check-auth/`, {
          method: 'GET',
          credentials: 'include',
          mode: 'cors',
        })
        
        if (res.ok) {
          const data = await res.json()
          setIsAuthenticated(data.authenticated === true)
        } else if (res.status === 401) {
          // 401 - login qilmagan, bu normal holat
          setIsAuthenticated(false)
        } else {
          setIsAuthenticated(false)
        }
      } catch (err) {
        // Network xatolik - authenticated emas deb hisoblaymiz
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  if (isAuthenticated === null) {
    // Loading holat
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="text-white">Yuklanmoqda...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

