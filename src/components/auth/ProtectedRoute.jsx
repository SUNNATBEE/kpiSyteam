import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  // Boshlang'ich holat - loading (null)
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
          // Faqat authenticated === true bo'lsa, authenticated deb hisoblaymiz
          setIsAuthenticated(data.authenticated === true)
        } else {
          // 401 yoki boshqa xatolik - authenticated emas
          setIsAuthenticated(false)
        }
      } catch (err) {
        // Network xatolik - authenticated emas deb hisoblaymiz
        console.warn('Auth check error:', err)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
  }, [])

  // Loading holat
  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="text-white">Yuklanmoqda...</div>
      </div>
    )
  }

  // Agar authenticated bo'lmasa, login'ga redirect
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Authenticated bo'lsa, children'ni ko'rsatish
  return children
}

export default ProtectedRoute

