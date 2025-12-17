import React from 'react'

const tone = {
  "Ma'qullandi": 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30',
  "Rad etildi": 'bg-rose-500/15 text-rose-200 border-rose-400/30',
  Kutilmoqda: 'bg-amber-500/15 text-amber-100 border-amber-400/30',
}

const StatusPill = ({ status }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tone[status] || 'bg-white/10 text-white border-white/20'}`}
  >
    {status}
  </span>
)

export default StatusPill

