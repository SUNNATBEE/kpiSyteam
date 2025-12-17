import React from 'react'
import { NavLink } from 'react-router-dom'
import { userProfile } from '../../data/mock'

const navItems = [
  { to: '/', label: 'Bosh panel' },
  { to: '/submissions', label: 'Yuklangan ishlar' },
  { to: '/validator', label: 'Tasdiqlash' },
  { to: '/reports', label: 'Hisobotlar' },
]

const Sidebar = ({ open = false, onClose = () => {} }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed z-40 h-full w-[280px] sm:w-72 border-r border-white/5 bg-slate-950/90 backdrop-blur transition-transform duration-300 lg:relative lg:z-10 lg:min-h-screen lg:w-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="sticky top-0 flex h-full flex-col gap-4 sm:gap-8 px-3 sm:px-6 py-4 sm:py-8 lg:h-screen">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-xl sm:text-2xl font-bold text-white shadow-[0_0_25px_-8px] shadow-cyan-500/70">
              K
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-lg font-semibold tracking-tight truncate">KPI Aloqa</p>
              <p className="text-[10px] sm:text-xs text-slate-400">Natijalar paneli</p>
            </div>
            <button
              className="ml-auto rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] sm:text-xs text-slate-200 lg:hidden"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-slate-300">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 sm:px-4 py-2 sm:py-3 transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/15 text-white shadow-[0_0_25px_-10px] shadow-cyan-400/60'
                      : 'hover:bg-white/5 hover:text-white hover:translate-y-[-2px]',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-3 sm:p-4 shadow-lg shadow-cyan-500/10 transition-transform duration-200 hover:translate-y-[-2px]">
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-slate-400">Jami ball</p>
            <p className="mt-2 text-2xl sm:text-3xl font-semibold text-white">{userProfile.score} / 100</p>
            <div className="mt-2 flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-xs">
              <span className="rounded-full bg-emerald-500/15 px-2 py-1 text-emerald-300">+{userProfile.delta}%</span>
              <span className="text-slate-400">oylik o'sish</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

