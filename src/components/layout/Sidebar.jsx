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
        className={`fixed z-40 h-full w-72 border-r border-white/5 bg-slate-950/90 backdrop-blur transition-transform duration-300 lg:relative lg:z-10 lg:min-h-screen lg:w-auto lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="sticky top-0 flex h-full flex-col gap-8 px-6 py-8 lg:h-screen">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-bold text-white shadow-[0_0_25px_-8px] shadow-cyan-500/70">
              K
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">KPI Aloqa</p>
              <p className="text-xs text-slate-400">Natijalar paneli</p>
            </div>
            <button
              className="ml-auto rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 lg:hidden"
              onClick={onClose}
            >
              yopish
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-2 text-sm font-medium text-slate-300">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-4 py-3 transition-colors duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/15 text-white shadow-[0_0_25px_-10px] shadow-cyan-400/60'
                      : 'hover:bg-white/5 hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-4 shadow-lg shadow-cyan-500/10">
            <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Jami ball</p>
            <p className="mt-2 text-3xl font-semibold text-white">{userProfile.score} / 100</p>
            <div className="mt-2 flex items-center gap-2 text-xs">
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

