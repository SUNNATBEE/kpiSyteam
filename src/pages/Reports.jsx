import React from 'react'
import GlassPanel from '../components/common/GlassPanel'
import { periods } from '../data/mock'
import { downloadReport } from '../services/api'

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Hisobotlar</p>
          <h1 className="text-3xl font-semibold text-white">PDF eksport va arxiv</h1>
        </div>
        <div className="ml-auto rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
          PDF Reportlab (backend) orqali generatsiya qilinadi
        </div>
      </div>

      <GlassPanel>
        <div className="grid gap-4 sm:grid-cols-2">
          {periods.map((period) => (
            <div
              key={period.id}
              className="rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-slate-800/60 p-4 shadow-inner shadow-cyan-500/10"
            >
              <p className="text-sm font-semibold text-white">{period.name}</p>
              <p className="text-xs text-slate-400">{period.range}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-100">
                  Tayyor
                </span>
                <button
                  onClick={() => downloadReport(period.id)}
                  className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-[0_10px_30px_-18px_rgba(34,211,238,0.7)] transition hover:-translate-y-0.5"
                >
                  PDF yuklab olish
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}

export default Reports

