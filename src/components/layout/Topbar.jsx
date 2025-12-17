import React from 'react'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../../data/mock'
import { logoutUser } from '../../services/api'

const Topbar = ({ onMenu = () => {} }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
      // Cookie'larni tozalash
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
      })
      // Login sahifasiga o'tish
      window.location.href = '/login'
    } catch (err) {
      console.error('Logout xatolik:', err)
      // Xatolik bo'lsa ham login sahifasiga o'tish
      window.location.href = '/login'
    }
  }

  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2 sm:py-4 lg:px-10">
        <div className="flex items-center gap-1.5 sm:gap-3 rounded-full bg-white/5 px-2 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-sm text-slate-300 shadow-inner shadow-cyan-500/10">
          <span className="text-[9px] sm:text-xs uppercase tracking-[0.15em] text-cyan-300">ONLAYN</span>
          <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <span className="hidden sm:block">KPI monitoring tizimi faol</span>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <button
            className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm font-semibold text-slate-100 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-cyan-400/20 lg:hidden"
            onClick={onMenu}
          >
            ≡
          </button>
          <button
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-100 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-cyan-400/20 sm:flex"
            onClick={() => navigate('/submissions')}
          >
            <span className="text-cyan-300">+</span> <span className="hidden md:inline">Yangi topshiriq</span>
          </button>
          <button
            className="group relative rounded-xl border border-white/10 bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm font-semibold text-slate-100 shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:border-fuchsia-400/60 hover:shadow-fuchsia-400/30"
            onClick={() => navigate('/reports')}
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/5 to-cyan-400/0 blur-sm transition group-hover:via-fuchsia-500/15" />
            <span className="hidden sm:inline">Hisobot olish</span>
            <span className="sm:hidden">📊</span>
          </button>
          <div className="group relative flex items-center gap-1.5 sm:gap-3 rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-sm shadow-inner shadow-cyan-500/10">
            <div className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 shadow-lg shadow-cyan-500/30 animate-float">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="text-xs sm:text-sm font-semibold text-white truncate max-w-[100px]">{userProfile.name}</p>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate max-w-[100px]">{userProfile.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="ml-1 sm:ml-2 rounded-lg border border-white/10 bg-white/5 px-2 sm:px-3 py-1 sm:py-1.5 text-[9px] sm:text-xs font-semibold text-slate-300 transition hover:bg-rose-500/20 hover:border-rose-400/40 hover:text-rose-200"
              title="Chiqish"
            >
              <span className="hidden sm:inline">Chiqish</span>
              <span className="sm:hidden">✕</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar

