import React from 'react'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../../data/mock'

const Topbar = ({ onMenu = () => {} }) => {
  const navigate = useNavigate()

  return (
    <header className="fixed left-0 right-0 top-0 z-20 border-b border-white/5 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 shadow-inner shadow-cyan-500/10">
          <span className="text-xs uppercase tracking-[0.15em] text-cyan-300">ONLAYN</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400" />
          <span className="hidden sm:block">KPI monitoring tizimi faol</span>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-cyan-400/20 lg:hidden"
            onClick={onMenu}
          >
            ≡ Menyu
          </button>
          <button
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 shadow-lg shadow-cyan-500/15 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-cyan-400/20 sm:flex"
            onClick={() => navigate('/submissions')}
          >
            <span className="text-cyan-300">+</span> Yangi topshiriq
          </button>
          <button
            className="group relative rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:border-fuchsia-400/60 hover:shadow-fuchsia-400/30"
            onClick={() => navigate('/reports')}
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500/0 via-fuchsia-500/5 to-cyan-400/0 blur-sm transition group-hover:via-fuchsia-500/15" />
            Hisobot olish
          </button>
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm shadow-inner shadow-cyan-500/10">
            <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-cyan-500/40 to-blue-500/40 shadow-lg shadow-cyan-500/30">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-white">{userProfile.name}</p>
              <p className="text-xs text-slate-400">{userProfile.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar

