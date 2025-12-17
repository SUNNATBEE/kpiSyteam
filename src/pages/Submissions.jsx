import React, { useMemo, useState } from 'react'
import GlassPanel from '../components/common/GlassPanel'
import StatusPill from '../components/common/StatusPill'
import { criteriaTypes, submissionHistory, periods } from '../data/mock'
import { submitEvidence } from '../services/api'

const Submissions = () => {
  const [history, setHistory] = useState(submissionHistory)
  const [filter, setFilter] = useState('Barchasi')
  const [isSending, setIsSending] = useState(false)
  const [form, setForm] = useState({
    criteriaItem: criteriaTypes[0].items[0].id,
    date: new Date().toISOString().slice(0, 10),
    description: '',
    file: null,
    period: periods[0].id,
  })

  const criteriaOptions = useMemo(
    () =>
      criteriaTypes.flatMap((type) =>
        type.items.map((item) => ({
          id: item.id,
          label: `${item.id} | ${item.title}`,
        })),
      ),
    [],
  )

  const filteredHistory =
    filter === 'Barchasi' ? history : history.filter((item) => item.status === filter)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSending(true)
    const payload = new FormData()
    payload.append('c_item', form.criteriaItem)
    payload.append('date', form.date)
    payload.append('description', form.description)
    payload.append('period', form.period)
    if (form.file) payload.append('file', form.file)

    try {
      await submitEvidence(payload)
      setHistory((prev) => [
        {
          id: Date.now(),
          title: criteriaOptions.find((c) => c.id === form.criteriaItem)?.label || 'Yangi topshiriq',
          status: 'Kutilmoqda',
          score: 0,
          date: form.date,
          period: periods.find((p) => p.id === Number(form.period))?.name || '',
        },
        ...prev,
      ])
      setForm((state) => ({ ...state, description: '', file: null }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Submissiya</p>
          <h1 className="text-3xl font-semibold text-white">Dalillarni yuklash va kuzatish</h1>
        </div>
        <div className="ml-auto flex gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
          <span className="text-emerald-300">-</span> avtomatik period tanlash
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
        <GlassPanel>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Yangi topshiriq</p>
              <p className="text-lg font-semibold text-white">Dalil faylini yuklang</p>
            </div>
            <div className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
              Fayl: .pdf, .docx, .jpg
            </div>
          </div>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-slate-300">Kriteriya bandi</span>
                <select
                  value={form.criteriaItem}
                  onChange={(e) => setForm({ ...form, criteriaItem: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none ring-cyan-500/40 focus:ring"
                  required
                >
                  {criteriaOptions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-slate-300">Bajarilgan sana</span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none ring-cyan-500/40 focus:ring"
                  required
                />
              </label>
            </div>

            <label className="space-y-1 text-sm">
              <span className="text-slate-300">Izoh</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Kiritilgan dalil haqida qisqacha ma'lumot"
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none ring-cyan-500/40 focus:ring"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1 text-sm">
                <span className="text-slate-300">Period</span>
                <select
                  value={form.period}
                  onChange={(e) => setForm({ ...form, period: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-white outline-none ring-cyan-500/40 focus:ring"
                >
                  {periods.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-1 text-sm">
                <span className="text-slate-300">Dalil fayli</span>
                <input
                  type="file"
                  onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
                  className="block w-full rounded-xl border border-dashed border-white/20 bg-slate-900/60 px-3 py-2 text-sm text-slate-200 file:mr-3 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:px-3 file:py-2 file:text-cyan-50"
                />
              </label>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-slate-400">
                Yuklashdan song validatorga yuboriladi. Faol period avtomatik aniqlanadi.
              </p>
              <button
                type="submit"
                disabled={isSending}
                className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_35px_-18px_rgba(34,211,238,0.75)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSending ? 'Yuborilmoqda...' : 'Yuklash'}
              </button>
            </div>
          </form>
        </GlassPanel>

        <GlassPanel className="bg-gradient-to-br from-slate-900/80 to-slate-800/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Filter</p>
              <p className="text-lg font-semibold text-white">Holat boyicha saralash</p>
            </div>
            <div className="flex gap-2">
              {['Barchasi', 'Kutilmoqda', "Ma'qullandi", 'Rad etildi'].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                    filter === item
                      ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 space-y-3">
            {filteredHistory.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-white/5 bg-white/5 p-4 shadow-inner shadow-cyan-500/10"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-white">{row.title}</p>
                    <p className="text-xs text-slate-400">
                      Sana: {row.date} | {row.period}
                    </p>
                  </div>
                  <StatusPill status={row.status} />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>
    </div>
  )
}

export default Submissions

