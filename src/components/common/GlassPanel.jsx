import React from 'react'

const GlassPanel = ({ children, className = '' }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-white/5 p-6 shadow-[0_20px_60px_-30px_rgba(34,211,238,0.35)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/30 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-white/5 opacity-70" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default GlassPanel

