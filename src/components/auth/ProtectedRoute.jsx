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
        
        // Bir necha marta urinib ko'ramiz (cookie saqlanishi uchun vaqt kerak bo'lishi mumkin)
        let authenticated = false
        
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
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
                if (data.authenticated === true) {
                  authenticated = true
                  break
                }
              } catch (jsonErr) {
                // JSON parse xatolik - authenticated emas
                console.warn('Auth check: Invalid JSON response', jsonErr)
              }
            } else {
              // 401 yoki 403 - authenticated emas
              if (res.status === 401 || res.status === 403) {
                // Bu normal, authenticated emas
                break
              }
            }
          } catch (fetchErr) {
            console.warn('Auth check fetch error:', fetchErr)
            if (attempt === 0) {
              // Birinchi urinishda xatolik bo'lsa, biroz kutamiz
              await new Promise(resolve => setTimeout(resolve, 300))
            }
          }
        }
        
        setIsAuthenticated(authenticated)
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

