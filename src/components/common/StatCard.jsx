import React from 'react'
import GlassPanel from './GlassPanel'

const StatCard = ({ label, value, hint, accent = 'cyan' }) => {
  const accentMap = {
    cyan: 'from-cyan-400/70 to-blue-500/60 shadow-cyan-400/40',
    fuchsia: 'from-fuchsia-400/70 to-purple-500/60 shadow-fuchsia-400/40',
    emerald: 'from-emerald-400/70 to-lime-500/60 shadow-emerald-400/40',
    amber: 'from-amber-400/70 to-orange-500/60 shadow-amber-400/40',
  }

  return (
    <GlassPanel className="h-full">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-4xl font-semibold text-white leading-none">{value}</p>
        <div
          className={`h-9 w-9 rounded-xl bg-gradient-to-br ${accentMap[accent]} opacity-90 shadow-[0_0_20px_-6px]`}
        />
      </div>
      {hint && <p className="mt-3 text-sm text-slate-400">{hint}</p>}
    </GlassPanel>
  )
}

export default StatCard

