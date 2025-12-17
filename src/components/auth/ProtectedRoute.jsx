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
          headers: {
            'Accept': 'application/json',
          },
        })
        
        if (res.ok) {
          try {
            const data = await res.json()
            // Faqat authenticated === true bo'lsa, authenticated deb hisoblaymiz
            const authenticated = data.authenticated === true
            setIsAuthenticated(authenticated)
            
            // Debug uchun (faqat development'da)
            if (import.meta.env.DEV && !authenticated) {
              console.log('Auth check: User not authenticated', data)
            }
          } catch (jsonErr) {
            // JSON parse xatolik - authenticated emas
            console.warn('Auth check: Invalid JSON response', jsonErr)
            setIsAuthenticated(false)
          }
        } else {
          // 401 yoki boshqa xatolik - authenticated emas
          if (res.status === 401 || res.status === 403) {
            setIsAuthenticated(false)
          } else {
            // Boshqa xatoliklar - xatolikni log qilamiz va authenticated emas deb hisoblaymiz
            console.warn('Auth check: Unexpected status', res.status)
            setIsAuthenticated(false)
          }
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

