import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-center text-white px-4">
      <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 shadow-[0_30px_70px_-40px_rgba(99,102,241,0.6)]">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Sahifa topilmadi</h1>
        <p className="mt-2 text-sm text-slate-300">
          Manzil notog'ri bo'lishi yoki sahifa o'chirilgan bo'lishi mumkin.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_35px_-20px_rgba(34,211,238,0.9)]"
        >
          Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )
}

export default NotFound

