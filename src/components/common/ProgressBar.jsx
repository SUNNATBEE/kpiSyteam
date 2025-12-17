import React from 'react'

const ProgressBar = ({ value, max }) => {
  const percent = Math.min(Math.round((value / max) * 100), 100)
  return (
    <div className="h-2 w-full rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 shadow-[0_0_18px_-6px] shadow-cyan-400"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar

