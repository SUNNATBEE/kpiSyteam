import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-10 top-16 h-64 w-64 rounded-full bg-cyan-500/20 blur-[110px]" />
        <div className="absolute right-10 top-32 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />
        <div className="absolute bottom-10 left-20 h-52 w-52 rounded-full bg-indigo-500/20 blur-[90px]" />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-[260px_1fr]">
        <Sidebar open={isSidebarOpen} onClose={closeSidebar} />
        <div className="relative z-10 flex flex-col">
          <Topbar onMenu={() => setIsSidebarOpen(true)} />
          <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 pb-10 pt-24 sm:px-6 lg:px-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout

