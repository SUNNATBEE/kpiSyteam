import React, { useMemo } from 'react'
import GlassPanel from '../components/common/GlassPanel'
import StatCard from '../components/common/StatCard'
import ProgressBar from '../components/common/ProgressBar'
import { criteriaTypes, userProfile, periods } from '../data/mock'

const Dashboard = () => {
  const totals = useMemo(() => {
    const current = criteriaTypes.reduce(
      (acc, type) => {
        acc.score += type.score
        acc.max += type.maxScore
        return acc
      },
      { score: 0, max: 0 },
    )
    return { ...current, percent: Math.round((current.score / current.max) * 100) }
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">KPI monitoring</p>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
            {userProfile.name}
          </h1>
          <p className="mt-2 text-slate-300">
            Davr boyicha ballaringizni korib boring, topshiriqlar va tasdiqlash holatini shu yerda
            kuzatib boring.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400" />
            Joriy period: {periods[0].name}
          </div>
        </div>
        <GlassPanel className="bg-gradient-to-br from-slate-900/90 to-slate-800/80">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-300">Umumiy ball</p>
              <p className="mt-3 text-4xl font-semibold text-white">
                {totals.score} <span className="text-lg text-slate-400">/ {totals.max}</span>
              </p>
              <p className="mt-2 text-sm text-slate-300">O'sish: +{userProfile.delta}%</p>
            </div>
            <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-br from-cyan-500/40 to-fuchsia-500/40 shadow-[0_0_30px_-10px] shadow-fuchsia-500/60">
              <div className="absolute inset-[6px] rounded-xl border border-white/10" />
              <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur flex items-center justify-center text-xl font-semibold text-white">
                {totals.percent}%
              </div>
            </div>
          </div>
          <div className="mt-4">
            <ProgressBar value={totals.score} max={totals.max} />
            <p className="mt-2 text-xs text-slate-400">Maksimal ballga nisbatan</p>
          </div>
        </GlassPanel>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Tasdiqlangan"
          value="15"
          hint="Oxirgi 30 kunda"
          accent="emerald"
        />
        <StatCard label="Kutilmoqda" value="4" hint="Validator navbatida" accent="amber" />
        <StatCard label="Rad etilgan" value="2" hint="Izohlarni korib chiqing" accent="fuchsia" />
        <StatCard label="Reja bajarilishi" value="92%" hint="Yillik KPI" accent="cyan" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <GlassPanel>
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Kriteriyalar</p>
              <p className="text-lg font-semibold text-white">Ball taqsimoti</p>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
              Jami {criteriaTypes.length} tur
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {criteriaTypes.map((type) => (
              <div
                key={type.id}
                className="rounded-xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-cyan-500/10"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{type.name}</p>
                    <p className="text-xs text-slate-400">
                      {type.score} / {type.maxScore} ball
                    </p>
                  </div>
                  <span className="rounded-full bg-cyan-500/15 px-2 py-1 text-xs text-cyan-100">
                    {Math.round((type.score / type.maxScore) * 100)}%
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {type.items.map((item) => (
                    <div key={item.id} className="rounded-lg bg-white/5 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <p className="text-sm text-white">{item.title}</p>
                          <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">
                            {item.score} / {item.max}
                          </p>
                          <p className="text-xs text-slate-400">Ball</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <ProgressBar value={item.score} max={item.max} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel className="bg-gradient-to-br from-slate-900/70 to-slate-800/70">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Periodlar</p>
          <p className="text-lg font-semibold text-white">Faol davrlar</p>
          <div className="mt-4 space-y-3">
            {periods.map((period, idx) => (
              <div
                key={period.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{period.name}</p>
                  <p className="text-xs text-slate-400">{period.range}</p>
                </div>
                <span className="rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 px-2 py-1 text-xs text-cyan-50">
                  {idx === 0 ? 'Faol' : 'Reja'}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}

export default Dashboard

