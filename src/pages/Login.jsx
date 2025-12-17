import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/api'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await loginUser(form.username, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message || "Foydalanuvchi nomi yoki parol noto'g'ri")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[110px]" />
      </div>
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_70px_-40px_rgba(34,211,238,0.7)] backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-2xl font-bold text-white">
            K
          </div>
          <div>
            <p className="text-lg font-semibold text-white">KPI Aloqa</p>
            <p className="text-xs text-slate-400">Hisobga kirish</p>
          </div>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="space-y-1 text-sm">
            <span className="text-slate-300">Login</span>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3 text-sm text-white outline-none ring-cyan-500/40 focus:ring"
              placeholder="foydalanuvchi nomi"
              required
            />
          </label>
          <label className="space-y-1 text-sm">
            <span className="text-slate-300">Parol</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-3 text-sm text-white outline-none ring-cyan-500/40 focus:ring"
              placeholder="********"
              required
            />
          </label>

          {error && (
            <div className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-[0_15px_40px_-25px_rgba(34,211,238,0.9)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Kutilmoqda...' : 'Kirish'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

