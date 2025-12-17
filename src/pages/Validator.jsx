import React, { useState } from 'react'
import GlassPanel from '../components/common/GlassPanel'
import StatusPill from '../components/common/StatusPill'
import { validatorQueue } from '../data/mock'

const Validator = () => {
  const [queue, setQueue] = useState(validatorQueue)

  const handleDecision = (id, status) => {
    setQueue((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status, score: status === "Ma'qullandi" ? item.score : 0 } : item,
      ),
    )
  }

  const pending = queue.filter((item) => item.status === 'Kutilmoqda')

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Validator</p>
          <h1 className="text-3xl font-semibold text-white">Tasdiqlash jarayoni</h1>
        </div>
        <div className="ml-auto rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
          Navbat: {pending.length} ta topshiriq
        </div>
      </div>

      <GlassPanel>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Navbat</p>
            <p className="text-lg font-semibold text-white">Kutilayotganlar</p>
          </div>
          <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-100">
            Real vaqt rejimi
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          {queue.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-cyan-500/10"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">
                    Foydalanuvchi: {item.user} | Sana: {item.date}
                  </p>
                  <p className="text-xs text-slate-400">Dalil: {item.evidence}</p>
                </div>
                <StatusPill status={item.status} />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleDecision(item.id, "Ma'qullandi")}
                  className="rounded-lg bg-emerald-500/20 px-3 py-2 text-xs font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:bg-emerald-500/30"
                >
                  Ma'qullash
                </button>
                <button
                  onClick={() => handleDecision(item.id, 'Rad etildi')}
                  className="rounded-lg bg-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-100 transition hover:-translate-y-0.5 hover:bg-rose-500/30"
                >
                  Rad etish
                </button>
                <button className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/15">
                  Faylni ko'rish
                </button>
                <span className="ml-auto rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                  Taklif balli: {item.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassPanel>
    </div>
  )
}

export default Validator

